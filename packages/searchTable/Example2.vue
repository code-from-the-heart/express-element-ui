<template>
  <div>
    <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>

    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <search-table ref="searchTable" :data="data" @cell-click="cellClick">
        <template v-slot:searchBottom>
          <!-- <p>搜索底部</p> -->
        </template>

        <template v-slot:header>
          <!-- <el-header>Header</el-header> -->
          <el-aside width="200px">Aside</el-aside>
        </template>

        <template v-slot:aside>
          <el-header>Header</el-header>
          <!-- <el-aside width="200px">Aside</el-aside> -->
        </template>

      </search-table>
    </el-dialog>
  </div>

</template>

<script>
import SearchTable from './SearchTable'
const getTestApi = (params) => new Promise(function(resolve, reject) {
  setTimeout(() => {
    resolve({

      rows: [
        { name: 'chris', type: 'mongodb', description: '纳海川底层人员', createTime: '2018-10-10', format: 500 },
        { name: 'chris', type: 'mongodb', description: '纳海川底层人员', createTime: '2018-10-10', format: 500 },
        { name: 'chris', type: 'mongodb', description: '纳海川底层人员', createTime: '2018-10-10', format: 500 },
        { name: 'chris', type: 'mongodb', description: '纳海川底层人员', createTime: '2018-10-10', format: 500 },
        { name: 'chris', type: 'mongodb', description: '纳海川底层人员', createTime: '2018-10-10', format: 500 },
        { name: 'chris', type: 'mongodb', description: '纳海川底层人员', createTime: '2018-10-10', format: 500 }
      ],
      total: 100
    })
  }, 500)
})
export default {
  components: {
    SearchTable
  },
  data() {
    return {
      dialogTableVisible: false,
      data: {
        fetch: getTestApi,
        // 系统管理-搜索菜单参数
        searchMenu: [
          {
            label: '名称',
            keyup: true,
            name: 'name',
            attrs: {
              placeholder: '请输入名称进行搜索',
              maxlength: 50,
              showWordLimit: true }
          },
          {
            component: 'select',
            label: '系统排序',
            name: 'systemManager',
            options: [
              { label: '系统名称升序', value: 'systemNameASC' },
              { label: '系统名称降序', value: 'systemNameDESC' }
            ]
          },
          {
            component: 'select',
            label: '在用状态',
            name: 'eq_status',
            options: [
              { label: '不限', value: '' },
              { label: '正常', value: '1' },
              { label: '停用', value: '2' }
            ]
          }
        ],
        // 系统管理-格式化搜索请求参数
        formatSearchParams: (params) => {
          // console.log('paramsCallBack', params)
          const { systemManager, eq_status, name } = params || {}
          return {
            // page: params.page + 1,
            name: name || '',
            systemManager: systemManager || '',
            eq_status: eq_status || ''
          }
        },
        /**
         * 系统管理-关联数据源 返回接口数据
         * @params {object} 请求数据对象
         * @return {object} {total,list:[]}
         */
        formatListData(data) {
          const { rows, total } = data
          return { list: rows, total }
        },
        // 关联数据源列表 表头 或者 vNode
        columnInfoList: [
          {
            label: '数据库名称',
            prop: 'name',
            formatter: (row, column, cellValue, index) => {
              return cellValue + '增加的文字'
            }
            // minWidth: '150'
          },
          <el-table-column
            style='text-align: center;'
            label={'特殊处理'}
            // width='150'
            {...{
              scopedSlots: {
                default: (scope) => {
                  return (<div>
                    <el-button
                      type={'text'}
                      size={'small'}
                      nativeOnClick={
                        () => {
                          this.dataSourceDialog = true
                          this.dataSourceId = scope.row.datasourceId
                        }
                      }>
                      ${scope.row.format}
                    </el-button>
                  </div>)
                }
              }
            }}
          />,
          {
            label: '数据库类型',
            prop: 'type'
            // width: '150'
          },
          {
            label: '数据库描述',
            prop: 'description'
            // width: '150'
          }, {
            label: '创建时间',
            prop: 'createTime'
            // width: '150'
          },
          <el-table-column
            style='text-align: center;'
            label={'操作'}
            // width='150'
            {...{
              scopedSlots: {
                default: (scope) => {
                  return (<div>
                    <el-button
                      type={'text'}
                      size={'small'}
                      nativeOnClick={
                        () => {
                          this.getData(scope.row)
                        }
                      }>
                      查看详情
                    </el-button>
                  </div>)
                }
              }
            }}
          />
        ]
      }
    }
  },
  methods: {
    getData(row) {
      console.log('getData', row)
      this.$refs.searchTable.getTable()
    },
    cellClick(row) {
      console.log('cellClick', row)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
