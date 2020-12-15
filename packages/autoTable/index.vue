<script>
import tableMixin from './tableMixin.js'
import BasePagination from '../pagination/src/BasePagination.vue'
export default {
  name: 'AutoTable',
  components: { BasePagination },
  mixins: [tableMixin],
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      currentPage: 1,
      // pageSize: 10,
      total: 0,
      listLoading: false,
      params: {
        page: 0,
        size: 10
      },
      // 点击查询或者调用handleSearchClick时传入的查询参数(未转换成apiParams前的参数)
      searchParams: {},
      // 请求接口参数-数据传的的formatSearchParams返回的参数
      apiParams: {},
      // 表头
      columnInfoList: [],
      // 列表数据
      list: [],
      collapse: false
    }
  },
  watch: {
    'data.columnInfoList': {
      handler () {
        this.getColumnInfoList()
      },
      deep: true
    },
    // 接口更改时 初始化
    'data.fetch': {
      handler () {
        this.init()
      },
      deep: true
    }
  },

  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.tabfetch = this.data.fetch
      this.setSearchParams(this.params)
      this.formatListData = this.data.formatListData
      this.getColumnInfoList()
      if (this.data.disableInitGetTable) return
      this.handleSearchClick()
    },
    getColumnInfoList () {
      this.columnInfoList = Array.isArray(this.data.columnInfoList) ? this.data.columnInfoList : []
    },
    // 搜索
    handleSearchClick (params) {
      // 设置请求方法
      this.tabfetch = this.data.fetch
      // 先初始化页数
      this.defaultPages()
      // 存储原始查询参数
      this.searchParams = params
      this.setSearchParams(params)
      this.tableList()
    },
    defaultPages () {
      this.currentPage = 1
      // this.pageSize = 10
      this.params = {
        size: 10,
        page: 0
      }
    },
    // 重置
    handleResetClick (params) {
      this.defaultPages()
      this.apiParams = params || {}
      this.setSearchParams(this.apiParams)
      this.tableList()
    }
  },
  render (h) {
    // VNode 构造函数
    const VNode = h().constructor

    // 是否Vnode实例
    const isVNode = obj => obj instanceof VNode

    // 表格element v-loading
    const directives = [
      // { name: 'loading', value: this.listLoading, modifiers: { body: true }}
      { name: 'loading', value: this.listLoading, modifiers: { } }
    ]

    const { header, aside } = this.$slots

    const { disableTable } = this.data

    return (
      <div class='c-table'>
        <el-container>
          {header}
          <el-container>
            {aside}
            {!disableTable && <el-main class='p16'>
              <el-table
                ref='cTable'
                {...{ directives }}
                data={this.list}
                stripe
                empty-text='暂无数据'
                tooltip-effect='dark'
                style='text-align: center;width:100%;'
                header-cell-style={{ background: '#f0f2f5' }}
                {...{ attrs: this.$attrs }}
                {...{ on: this.$listeners }}
              >
                {this.columnInfoList.map(item => {
                  if (isVNode(item)) {
                    return item
                  }
                  return (<el-table-column
                    style='text-align: center;'
                    show-overflow-tooltip
                    {...{ attrs: item }}
                  />)
                }

                )}
              </el-table>
              <base-pagination
                pageSize={this.params.size}
                total={this.total}
                currentPage={this.currentPage}
                on-size-change={this.sizeChange}
                on-current-change={this.currentChange}
                {...{ on: { 'update:currentPage': val => { this.currentPage = val } } }}
                {...{ attrs: this.$attrs }}
                {...{ on: this.$listeners }}
              />
            </el-main>}
          </el-container>
        </el-container>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.c-table {

}
/deep/ .el-table th.is-leaf {
  font-weight: 400;
}
/deep/ .el-main {
  padding:0 !important;
}
/deep/ .el-table {
  padding:0 !important;
}
.ctable-container {
  display:flex;
}
.ctable-body {
  flex:1;
}
.p16 {
 padding:16px !important;
}
</style>
