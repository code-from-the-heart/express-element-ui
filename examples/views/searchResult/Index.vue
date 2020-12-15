<template>
 <article>
   <section class="search nhc-page-module">
     <nhc-search ref="searchForm" :search-list="searchConfig" @search="handleSearch" @reset="handleResetClick"></nhc-search>
   </section>
   <section class="nhc-table-list nhc-page-module">
      <nhc-table
      @select="handleSelect"
      :table-data="list"
      :table-config="tableConfig"
      :col-configs="colConfigs"
      :table-loading="loading">
      <el-table-column slot="opts" label="操作" minWidth="250" fixed="right">
        <template  slot-scope="{ row }">
          <el-button type="text" size="small" class="nhc-table__btn" @click="handleEdit(row)" :disabled="!(row.createStatus === 0 || row.createStatus === 1)">编辑</el-button>
          <el-button type="text" size="small" class="nhc-table__btn" @click="handleGoDetail(row)">查看</el-button>
          <el-button type="text" size="small" class="nhc-table__btn" @click="handleRest(row)" :disabled="!(row.createStatus === 1)">重置密码</el-button>
          <el-button type="text" size="small" class="nhc-table__btn" @click="handleDelete(row)" :loading="row.loading" :disabled="!(row.createStatus === 1 || row.createStatus === 2)">删除</el-button>
        </template>
      </el-table-column>
     </nhc-table>

     <nhc-pagination
      :current-page="form.page + 1"
      :page-size="form.size"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange">
      </nhc-pagination>
   </section>
   <!-- 底部悬浮按钮 -->
   <nhc-buttom-bar>
     <el-button type="primary" size="small">提交</el-button>
     <el-button  size="small">返回</el-button>
   </nhc-buttom-bar>
 </article>
</template>

<script>
// 创建状态
const datalakeStatusText = {
  props: {
    colConfig: Object,
    default: _ => ({})
  },
  template: `
    <el-table-column :label="colConfig.label" show-overflow-tooltip v-bind="colConfig">
      <span slot-scope="{ row }" :style="setStatusColor(row['createStatus'])">
        {{setStatusStr(row['createStatus'])}}
      </span>
    </el-table-column>
  `,
  methods: {
    setStatusColor (val) {
      const statusMap = new Map([
        [0, 'color:#1AD0E1;'], // 开通中
        [1, 'color:#48BD0F;'], // 已开通
        [2, 'color:#FF7374;'], // 失败
        ['default', 'color:#606266;']
      ])
      return statusMap.get(val) || statusMap.get('default')
    },
    setStatusStr (val) {
      const mp = new Map([
        [0, '开通中'],
        [1, '已开通'],
        [2, '开通失败'],
        ['default', '--']
      ])
      return mp.get(val) || mp.get('default')
    }
  }
}
// 接入地址
const accessUrlText = {
  props: {
    colConfig: Object,
    default: _ => ({})
  },
  template: `
  <el-table-column :label="colConfig.label" show-overflow-tooltip v-bind="colConfig">
      <span style="color: #1877f1;cursor: pointer;" slot-scope="{ row }" @click="gotoChildSys(row)">
        {{ row['accessUrl'] }}
      </span>
    </el-table-column>`,
  methods: {
    gotoChildSys ({ accessUrl }) {
      window.open(accessUrl, '_blank')
    }
  }
}

export default {
  name: 'nhcTableDemo',
  components: {},
  props: {},
  data () {
    return {
      searchConfig: [
        {
          label: '委办局',
          name: 'deptName',
          attrs: {
            filterable: true,
            placeholder: '请输入关键词进行搜索',
            clearable: true
          },
          options: [
            { label: '广州', value: 0 },
            { label: '深圳', value: 1 },
            { label: '上海', value: 2 },
            { label: '北京', value: 3 },
            { label: '广州市天河区棠下', value: 4 }
          ],
          component: 'select',
          value: 0
        },
        {
          label: '负责人',
          name: 'principal',
          attrs: {
            type: 'text',
            placeholder: ' 请输入关键词进行搜索',
            clearable: true
          },
          component: 'input',
          value: 'nhc'
        },
        {
          label: '部门名称',
          name: 'depName',
          attrs: {
            type: 'text',
            placeholder: ' 请输入关键词进行搜索',
            clearable: true
          },
          component: 'input'
        },
        {
          label: '部门编码',
          name: 'depCode',
          attrs: {
            type: 'text',
            placeholder: ' 请输入关键词进行搜索',
            clearable: true
          },
          component: 'input'
        },
        {
          label: '日期',
          name: 'createTime',
          attrs: {
            align: 'right',
            type: 'date',
            placeholder: '请选择日期',
            clearable: true
          },
          component: 'date-picker',
          value: '2020-04-05'
        },
        {
          label: '格式化日期',
          name: 'createTime1',
          attrs: {
            align: 'right',
            type: 'date',
            placeholder: '请选择日期',
            clearable: true,
            format: 'yyyy 年 MM 月 dd 日',
            'value-format': 'yyyy-MM-dd'
          },
          component: 'date-picker',
          value: ''
        },
        {
          label: '快捷键日期',
          name: 'createTime2',
          attrs: {
            align: 'right',
            type: 'daterange',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            clearable: true,
            format: 'yyyy-MM-dd',
            'value-format': 'yyyy-MM-dd',
            'picker-options': this.pickerOptions()
          },
          component: 'date-picker',
          value: ''
        },
        {
          label: '日期范围',
          name: 'createTimeDaterange',
          attrs: {
            align: 'right',
            type: 'daterange',
            placeholder: '请选择日期',
            clearable: true
          },
          component: 'date-picker'
        },
        {
          label: '年级',
          name: 'radioName',
          attrs: {
            align: 'right'
          },
          component: 'radio'
        }
      ],
      form: {
        page: 0,
        size: 20
      },
      total: 20,
      list: [{
        deptName: '政法委',
        principalName: '纳海川',
        principalPhone: '12345678911',
        managerAccount: 'acc',
        accessUrl: 'https://www.baidu.com/',
        createTime: '2020-05-21',
        createStatus: 0
      }],
      loading: false
    }
  },
  computed: {
    tableConfig () {
      return {
        'cell-class-name': 'nhc-table-wrapper'
      }
    },
    colConfigs () {
      return [
        { label: '序号', type: 'selection', minWidth: 50 },
        { label: '序号', type: 'index', minWidth: 50 },
        { label: '委办局', prop: 'deptName', minWidth: 200 },
        { label: '负责人', prop: 'principalName', minWidth: 80 },
        { label: '联系电话', prop: 'principalPhone', minWidth: 110 },
        { label: '管理账号', prop: 'managerAccount', minWidth: 90 },
        { label: '访问地址', prop: 'accessUrl', minWidth: 260, component: accessUrlText },
        { label: '接入时间', prop: 'createTime', minWidth: 160 },
        { label: '状态', prop: 'createStatus', minWidth: 80, component: datalakeStatusText },
        { slot: 'opts' }
      ]
    }
  },
  watch: {},
  created () {},
  mounted () {
  },
  methods: {
    init () {
    },
    handleSelect (selection, row) {
      console.log(selection)
    },
    pickerOptions () {
      return {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    },
    handleEdit () {
      console.log('编辑')
    },
    handleGoDetail () {
      console.log('详情')
    },
    handleRest () {
      console.log('重置')
    },
    handleDelete () {
      console.log('删除')
    },
    handleSearch (params) {
      this.form = Object.assign({}, this.form, params)
      console.log(this.form)
    },
    handleResetClick (params) {
      // this.form = Object.assign({}, this.form, params)
      console.log(this.form)
    },
    // 每页条数
    handleSizeChange (val) {
      this.form.size = val
      this.form.page = 0
      this.init()
    },
    // 页码
    handleCurrentChange (val) {
      this.form.page = val - 1
      this.init()
    }
  },
  filters: {}
}
</script>

<style lang='scss' scoped>
.search {
  width: 100%;
  margin: 0 auto;
}
.nhc-table-wrapper {
  margin-top: 20px;
}
</style>
