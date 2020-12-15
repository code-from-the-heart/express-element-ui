<template>
  <div class="sm-wrapper nhc-search-wrapper">
    <el-form
      v-if="searchList.length"
      ref="formFields"
      :model="searchObj"
      label-width="auto"
      size="small"
      class="m-form-wrapper"
      label-position="left"
      @submit.native.prevent
    >
      <el-row :gutter="10" type="flex">

        <!-- 查询条件item-start -->
        <template v-for="(query, keys) in searchList">
          <!-- 这里用v-if 而不是v-show 是因为 form组件中若设置label-width为auto，
          若用v-show，组件被添加删除处理宽度的时候将auto强制转换成了int 产生了NaN的值。最终组件没法创建和删除从而报错-->
          <el-col
            v-if="showAll || showFormItem(query, keys)"
            :key="`q${keys}`"
            :span="getSpans(query.attrs)"
          >
            <el-form-item :label="`${query.label}：`" :prop="query.name" class="align-left">
              <template v-if="query.slot">
                <slot :name="query.slot" />
              </template>
              <template v-else>
                <field-item
                  :value.sync="searchObj[query.name]"
                  :query="query"
                  v-bind="query.attrs"
                  v-on="query.events"
                  @keyup.enter="handleSearchClick"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>

        <!-- 查询按钮 -->
        <el-col
          class="btn__row"
          :class="[btnAlign]"
          :span="btnSpan"
        >
          <slot name="searchBtnFont" />
          <el-button size="small" type="primary" :icon="iconSearch" @click="handleSearchClick">查 询</el-button>
          <el-button size="small" type="primary" :icon="iconRefresh" plain @click="_resetFields">重 置</el-button>
          <template v-if="showMore">
            <slot name="searchBtnEnd" />
            <el-button
              v-show="showAll"
              type="text"
              class="sm-btn-txt"
              icon="el-icon-arrow-up"
              @click="triggerAll"
            >收起</el-button>
            <el-button
              v-show="!showAll"
              type="text"
              class="sm-btn-txt"
              icon="el-icon-arrow-down"
              @click="triggerAll"
            >展开</el-button>
          </template>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>

/*
 * 更改：之前是判断浏览器窗口变化：
 * 存在问题：
 *  1.当search-form宽度不变，浏览器窗口变化时search-form变四列
 *  解决：不使用浏览器窗口宽度计算,已更改成判断form宽度计算，去掉el的响应式设计，改成自动计算span. (done)
 *
 *  2.四列布局下，前两列是时间，后两列是input时，v-for会把时间当成一列，4个formItem 实际超出24布局 导致同行下有两列下移，
 *   解决：formItem 前四行计算时，不能用序号，需根据formItem实际的占位数判断 (done)
 *
 *  3.有时会因外部因素导致formContanter 尺寸变化，导致最开始出现计算宽度错误（如菜单栏异步加载接口慢于nhc-search时，nhc-search先计算了宽度，当接口回来菜单栏展开压缩到nhc-search宽度的bug）
 *  解决：弃用window.onresize 方法 使用ResizeObserver方法监听元素自身变化（done）
 *
 *  4.当组件被keepalive缓存时，跳转到其他页面，该组件没有销毁，导致报找不到nhc-search-wrapper')[0].firstElementChild的错误
 *  解决：当组件被缓存时，离开组件清除监听form元素宽度变化，反回缓存组件再次激活监听元素宽度(done)
 */

import FieldItem from './FieldItem.vue'
import BaseSelect from './Select'
// searchMenu 宽度界限值 大于则显示4列
const MAX_WIDTH = 1546

export default {
  name: 'NhcSearch',
  components: {
    FieldItem,
    BaseSelect
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 查询条件列表
    searchList: {
      type: Array,
      default: _ => ([])
    },
    value: {
      type: Object,
      default: _ => {
        return {}
      }
    },
    iconSearch: {
      type: String,
      default: ''
    },
    iconRefresh: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      resizeObserver: null,
      searchObj: {},
      defualtValueMap: Object.freeze(new Map()),
      showAll: false,
      clientWidth: 0,
      btnAlign: 'align-right'
    }
  },
  computed: {
    // 每行列数
    colSize () {
      // 考虑到可能有滚动条，将小于1900的屏幕定位小屏幕
      // 兼容固定屏幕宽度时，窗口拉伸大于1900 时间组件占位两个格兼容处理
      return this.clientWidth < MAX_WIDTH ? 3 : 4
    },
    // 搜索项占位总数
    spanSize () {
      let size = 0
      this.searchList.forEach(item => {
        let addSize = 1
        // 小屏幕的日期范围选择占双倍空间，确保时间显示完整
        if (
          item.attrs &&
          (item.attrs.type === 'datetimerange' || item.attrs.type === 'daterange')
        ) {
          // 如果一行中剩余位置放不下时间选择器，直接换行，空余一个占位
          if (this.colSize - (size % this.colSize) === 1) {
            size += 1
          }
          addSize = 2
        }
        size += addSize
      })
      return size
    },
    // 是否显示更多
    showMore () {
      return this.spanSize >= this.colSize
    },
    // 计算按钮位置
    btnSpan () {
      const snum = this.spanSize % 3
      const lnum = this.spanSize % 4
      const length = this.searchList.length
      const isSm = this.clientWidth < MAX_WIDTH
      let span = isSm ? 8 : 6

      // 展开所有搜索项
      if (this.showAll) {
        if (this.spanSize % this.colSize === 0) {
          span = 24
        } else {
          span = isSm ? 24 - 8 * snum : 24 - 6 * lnum
        }
      }
      return span
    }
  },
  watch: {
    searchList: {
      handler (newVal, oldVla) {
        let frontColSize = 0
        newVal.forEach(item => {
          if (item.attrs && (item.attrs.type === 'datetimerange' || item.attrs.type === 'daterange')) {
            frontColSize += 2
          } else {
            frontColSize++
          }
          item.colSize = frontColSize
        })
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    this.init()
  },
  // 返回到有缓存组件时需激活
  activated () {
    this.handleFromEleWidth()
  },
  // 离开缓存时清除监听form元素宽度变化
  deactivated () {
    this.resizeObserver.disconnect()
  },
  destroyed () {
    this.resizeObserver.disconnect()
  },
  methods: {
    init () {
      this.formFields()
      this.handleFromEleWidth()
    },
    // 监听form宽度变化
    handleFromEleWidth () {
      this.clientWidth = this.getElWidth()
      this.setBtnAlign()
      // 第一次初始化时和缓存激活会同时调此方法造成监听两次元素宽度，第一次的resizeObserver.observe没被销毁，需销毁
      if (this.resizeObserver) { this.resizeObserver.disconnect() }
      // 监听form元素自身宽度变化
      this.resizeObserver = new ResizeObserver(entries => {
        this.resize()
      })
      this.resizeObserver.observe(document.getElementsByClassName('nhc-search-wrapper')[0])
    },
    getElWidth () {
      return document.getElementsByClassName('nhc-search-wrapper')[0].firstElementChild.clientWidth
    },
    formFields () {
      const tempSearchObj = {}
      this.searchList.forEach(t => {
        if (typeof t.value === 'undefined') {
          tempSearchObj[t.name] = ''
        } else {
          tempSearchObj[t.name] = t.value
          this.defualtValueMap.set(t.name, t.value)
        }
      })
      this.searchObj = Object.assign({}, this.searchObj, tempSearchObj)
    },
    getSpans (attr) {
      const isSm = this.clientWidth < MAX_WIDTH
      // 时间范围选择器占双倍位置，确保时间显示完整
      if (attr && (attr.type === 'datetimerange' || attr.type === 'daterange' || attr.type === 'monthrange')) {
        return isSm ? 16 : 12
      }
      return isSm ? 8 : 6
    },
    triggerAll () {
      this.showAll = !this.showAll
      this.setBtnAlign()
    },
    // 查询
    handleSearchClick () {
      const params = this.filterParams(this.searchObj)
      this.$emit('search', params)
    },
    // 过滤查询条件
    filterParams (data) {
      const params = {}
      for (const key in data) {
        params[key] = data[key] === '' ? null : data[key]
      }
      return params
    },
    // 重置
    _resetFields () {
      /**
       * 该组件存在未知bug,暂用Object.keys重置方法,停用resetFields()方法
       * 只检测了 array, string 类型的重置
       */
      Object.keys(this.searchObj).forEach(key => {
        if (typeof this.defualtValueMap.get(key) !== 'undefined') {
          this.searchObj[key] = this.defualtValueMap.get(key)
        } else {
          if (this.isArray(this.searchObj[key])) {
            this.searchObj[key] = []
          } else {
            this.searchObj[key] = ''
          }
        }
      })
      this.$emit('reset')
    },
    isArray (obj) {
      return (
        Object.prototype.toString
          .call(obj)
          .replace(/^\[object (.+)\]$/, '$1')
          .toLowerCase() === 'array'
      )
    },
    setBtnAlign () {
      this.$nextTick(() => {
        const btnEl = document.querySelector('.btn__row')
        const btnElPosition = btnEl.offsetLeft + btnEl.offsetWidth
        this.btnAlign = this.clientWidth <= btnElPosition ? 'align-right' : 'align-left'
      })
    },
    // 未展开时 时间组件占两位，要做处理
    showFormItem (item, keys) {
      return item.colSize <= this.colSize - 1
    },
    resize () {
      this.clientWidth = this.getElWidth()
      this.setBtnAlign()
    }
  }
}
</script>

<style lang="scss" scoped>
.sm-wrapper {
  padding: 10px 0;
}
.align-left {
  text-align: left;
}
.align-right {
  text-align: right;
}
.m-form-wrapper {
  padding: 0 !important;
  & /deep/ {
    .el-row {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
   }
  .sm-btn-txt {
    padding-right: 0 !important;
   }
  .el-range-editor--small .el-range-input{
    font-size: 14px !important;
    }
  }
  .btn__row {
    white-space: nowrap;
  }
}
</style>
