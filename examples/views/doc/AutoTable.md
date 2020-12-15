
## AutoTable 自动分页表格

整合翻页/分页/跳页时自动请求接口表格

### 设计原则
* 减少重复处理翻页/分页/跳页时的逻辑，由AutoTable处理,提高开发效率

```
  // 传入AutoTable data
  data: {
    // 请求接口
    fetch: api,
    /**
      * 格式化接口返回参数 
      * return {list,total} list:列表数据 total:分页总数
      */
    formatListData (data) {
      const { rows, total } = data
      return { list: rows, total }
    },
    // 列表展示：接受el-table-column jsx组件 或 el-table-column 列表参数对象
    columnInfoList: [
      <el-table-column
        type='index'
        label='序号'
        width='50'
      />,
      {
        label: '数据库名称',
        prop: 'name',
        formatter: (row, column, cellValue, index) => {
          return cellValue + '增加的文字'
        }
        minWidth: '150'
      }
  }
```
### 基本用法

自动请求接口

:::demo  data传入fetch、formatListData、 columnInfoList 点击查询翻页等，列表会处理好分页等请求数据的逻辑
```html
<template>
  <auto-table ref="autoTable" :data="data" @cell-click="cellClick" />
</template>

<script>
const getTestApi = (params) => new Promise(function (resolve, reject) {
  console.log('接口参数', params)
  setTimeout(() => {
    resolve({
      rows: [
        { name: '张三', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 },
        { name: '李四', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 },
        { name: '王五', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 },
        { name: '赵六', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 }
      ],
      total: 100
    })
  }, 500)
})
export default {
  data () {
    return {
      data: {
        fetch: getTestApi,
        // 搜索请求参数
        formatSearchParams: (params) => {
          console.log('paramsCallBack', params)
          const { systemManager, eq_status, name, otherParams } = params || {}
          return {
            name: name || '',
            systemManager: systemManager || '',
            eq_status: eq_status || '',
            otherParams: otherParams || ''
          }
        },
        /**
         * 返回接口数据
         * @params {object} 请求数据对象
         * @return {object} {total,list:[]}
         */
        formatListData (data) {
          const { rows, total } = data
          return { list: rows, total }
        },
        // 关联数据源列表 表头 或者 vNode
        columnInfoList: [
          <el-table-column
            type='index'
            label='序号'
            width='50'
          />,
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
          }, {
            label: '创建时间',
            prop: 'createTime'
          },
          <el-table-column
            style='text-align: center;'
            label={'操作'}
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
    getData (row) {
      console.log('getData', row)
      this.$refs.searchTable.getTable()
    },
    resetClick () {
      this.$refs.searchTable.handleResetClick()
    },
    cellClick (row) {
      console.log('cellClick', row)
    },
    search () {
      this.$refs.searchTable.handleSearchClick({ otherParams: 'otherParams' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
    width: 400px!important;
}
</style>

```
:::


### 区域 slot

可设置指定位置slot

:::demo 通过 `v-slot` 可设置列表顶部和左侧 设置查询按钮左右边（慎用：会影响适应时按钮超出边界）
```html
<template>
  <search-table ref="searchTable" :data="data" @cell-click="cellClick">
    <!-- <template v-slot:searchBtnFont>
      <el-button>搜索按钮前面</el-button>
    </template> -->

    <template v-slot:searchBtnEnd>
      <el-button>搜索按钮后面</el-button>
    </template>

    <template v-slot:searchBottom>
      <el-button>搜索底部</el-button>
    </template>

    <template v-slot:header>
      <!-- <el-header>Header</el-header> -->
      <el-aside width="260px" style='background:#EFF7FF;' class='flex'>
        Aside
      </el-aside>
    </template>

    <template v-slot:aside>
      <el-header style='background:rgb(231, 244, 234);' class='flex'>Header</el-header>
      <!-- <el-aside width="200px">Aside</el-aside> -->
    </template>

  </search-table>
</template>

<script>
const getTestApi = (params) => new Promise(function (resolve, reject) {
  console.log('接口参数', params)
  setTimeout(() => {
    resolve({
      rows: [
        { name: '张三', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 },
        { name: '李四', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 },
        { name: '王五', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 },
        { name: '赵六', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 }
      ],
      total: 100
    })
  }, 500)
})
export default {
  data () {
    return {
      data: {
        fetch: getTestApi,
        // disableInitGetTable: true, // 初始化不需要请求接口
        // 系统管理-搜索菜单参数
        searchMenu: [
                    {
            label: '资源名称',
            keyup: true,
            name: 'like_tableName',
            attrs: {
              placeholder: '请输入资源名称进行搜索',
              clearable: true
            }
          },
          {
            label: '资源描述',
            keyup: true,
            name: 'like_tableDesc',
            attrs: {
              placeholder: '请输入资源名称进行搜索',
              clearable: true
            }
          },
          {
            component: 'select',
            label: '同步方式',
            name: 'eq_syncType',
            options: [
              { label: '不限', value: '' },
              { label: '全量同步', value: '0' },
              { label: '增量同步', value: '1' }
            ]
          },
          {
            component: 'date-picker',
            label: '创建时间',
            name: 'gt_createTime',
            attrs: {
              type: 'datetimerange',
              rangeSeparator: '~',
              startPlaceholder: '开始日期',
              endPlaceholder: '结束日期'
            }
          },
          {
            component: 'date-picker',
            label: '更新时间',
            name: 'gt_syncTime',
            attrs: {
              type: 'datetimerange',
              rangeSeparator: '~',
              startPlaceholder: '开始日期',
              endPlaceholder: '结束日期'
            }
          }
        ],
        // 系统管理-格式化搜索请求参数
        formatSearchParams: (params) => {
          console.log('paramsCallBack', params)
          const { systemManager, eq_status, name, otherParams } = params || {}
          return {
            // page: params.page + 1,
            name: name || '',
            systemManager: systemManager || '',
            eq_status: eq_status || '',
            otherParams: otherParams || ''
          }
        },
        /**
         * 系统管理-关联数据源 返回接口数据
         * @params {object} 请求数据对象
         * @return {object} {total,list:[]}
         */
        formatListData (data) {
          const { rows, total } = data
          return { list: rows, total }
        },
        // 关联数据源列表 表头 或者 vNode
        columnInfoList: [
          <el-table-column
            type='index'
            label='序号'
            width='50'
          />,
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
          }, {
            label: '创建时间',
            prop: 'createTime'
          },
          <el-table-column
            style='text-align: center;'
            label={'操作'}
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
    getData (row) {
      console.log('getData', row)
      this.$refs.searchTable.getTable()
    },
    resetClick () {
      this.$refs.searchTable.handleResetClick()
    },
    cellClick (row) {
      console.log('cellClick', row)
    },
    search () {
      this.$refs.searchTable.handleSearchClick({ otherParams: 'otherParams' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
    width: 400px!important;
}
</style>

```
:::

:::demo 切换 v-slot:header 里的 el-aside 为 el-header 则会通栏 
```html
<template>
  <search-table ref="searchTable" :data="data" @cell-click="cellClick">
    <template v-slot:header>
       <el-header style='background:#EFF7FF;' class='flex'>Header</el-header>
    </template>

    <template v-slot:aside>
     <el-aside width="260px" style='background:rgb(231, 244, 234);' class='flex'>
        Aside
      </el-aside>
    </template>

  </search-table>
</template>

<script>
const getTestApi = (params) => new Promise(function (resolve, reject) {
  console.log('接口参数', params)
  setTimeout(() => {
    resolve({
      rows: [
        { name: '张三', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 },
        { name: '李四', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 },
        { name: '王五', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 },
        { name: '赵六', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 }
      ],
      total: 100
    })
  }, 500)
})
export default {
  data () {
    return {
      data: {
        fetch: getTestApi,
        // disableInitGetTable: true, // 初始化不需要请求接口
        // 系统管理-搜索菜单参数
        searchMenu: [
                    {
            label: '资源名称',
            keyup: true,
            name: 'like_tableName',
            attrs: {
              placeholder: '请输入资源名称进行搜索',
              clearable: true
              // maxlength: 50,
              // showWordLimit: true
            }
          },
          {
            label: '资源描述',
            keyup: true,
            name: 'like_tableDesc',
            attrs: {
              placeholder: '请输入资源名称进行搜索',
              clearable: true
            }
          },
          {
            component: 'select',
            label: '调度周期',
            name: 'eq_scheduleCycle',
            options: [
            ],
            url: 'dl.database.table.scheduleCycleType'
          },
          {
            component: 'select',
            label: '同步方式',
            name: 'eq_syncType',
            options: [
              { label: '不限', value: '' },
              { label: '全量同步', value: '0' },
              { label: '增量同步', value: '1' }
            ]
          },
          {
            component: 'date-picker',
            label: '创建时间',
            name: 'gt_createTime',
            attrs: {
              type: 'datetimerange',
              rangeSeparator: '~',
              startPlaceholder: '开始日期',
              endPlaceholder: '结束日期'
            }
          },
          {
            component: 'date-picker',
            label: '更新时间',
            name: 'gt_syncTime',
            attrs: {
              type: 'datetimerange',
              rangeSeparator: '~',
              startPlaceholder: '开始日期',
              endPlaceholder: '结束日期'
            }
          }
        ],
        // 系统管理-格式化搜索请求参数
        formatSearchParams: (params) => {
          console.log('paramsCallBack', params)
          const { systemManager, eq_status, name, otherParams } = params || {}
          return {
            // page: params.page + 1,
            name: name || '',
            systemManager: systemManager || '',
            eq_status: eq_status || '',
            otherParams: otherParams || ''
          }
        },
        /**
         * 系统管理-关联数据源 返回接口数据
         * @params {object} 请求数据对象
         * @return {object} {total,list:[]}
         */
        formatListData (data) {
          const { rows, total } = data
          return { list: rows, total }
        },
        // 关联数据源列表 表头 或者 vNode
        columnInfoList: [
          <el-table-column
            type='index'
            label='序号'
            width='50'
          />,
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
          }, {
            label: '创建时间',
            prop: 'createTime'
          },
          <el-table-column
            style='text-align: center;'
            label={'操作'}
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
    getData (row) {
      console.log('getData', row)
      this.$refs.searchTable.getTable()
    },
    resetClick () {
      this.$refs.searchTable.handleResetClick()
    },
    cellClick (row) {
      console.log('cellClick', row)
    },
    search () {
      this.$refs.searchTable.handleSearchClick({ otherParams: 'otherParams' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
    width: 400px!important;
}
</style>

```
:::

### 常用事件

:::demo 通过 `v-slot:header`
```html
<template>
  <search-table ref="searchTable" :data="data" @cell-click="cellClick">
    <template v-slot:header>
         <el-header>
            <el-button @click="getData">getTable 记录当前查询参数</el-button>
            <el-button @click="resetClick">ResetClick 初始化查询参数（可接受额外参数）</el-button>
            <el-button @click="search">search: 初始化页数,记录当前查询参数（可接受额外参数）</el-button>
         </el-header>
    </template>
  </search-table>
</template>

<script>
const getTestApi = (params) => new Promise(function (resolve, reject) {
  console.log('接口参数', params)
  setTimeout(() => {
    resolve({
      rows: [
        { name: '张三', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 },
        { name: '李四', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 },
        { name: '王五', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 },
        { name: '赵六', type: 'mongodb', description: '中国广东', createTime: '2018-10-10', format: 500 }
      ],
      total: 100
    })
  }, 500)
})
export default {
  data () {
    return {
      data: {
        fetch: getTestApi,
        // disableInitGetTable: true, // 初始化不需要请求接口
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
          console.log('paramsCallBack', params)
          const { systemManager, eq_status, name, otherParams } = params || {}
          return {
            // page: params.page + 1,
            name: name || '',
            systemManager: systemManager || '',
            eq_status: eq_status || '',
            otherParams: otherParams || ''
          }
        },
        /**
         * 系统管理-关联数据源 返回接口数据
         * @params {object} 请求数据对象
         * @return {object} {total,list:[]}
         */
        formatListData (data) {
          const { rows, total } = data
          return { list: rows, total }
        },
        // 关联数据源列表 表头 或者 vNode
        columnInfoList: [
          <el-table-column
            type='index'
            label='序号'
            width='50'
          />,
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
          }, {
            label: '创建时间',
            prop: 'createTime'
          },
          <el-table-column
            style='text-align: center;'
            label={'操作'}
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
    getData (row) {
      console.log('getData', row)
      this.$refs.searchTable.getTable()
    },
    resetClick () {
      this.$refs.searchTable.handleResetClick()
    },
    cellClick (row) {
      console.log('cellClick', row)
    },
    search () {
      this.$refs.searchTable.handleSearchClick({ otherParams: 'otherParams' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
    width: 400px!important;
}
</style>

```
:::




### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data | 传入的数据 具体查看下面说明 | object | — | — |


### data
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| fetch | 列表请求接口 | promise | — | — |
| searchMenu | 查询菜单 (等同NhcSearch组件searchList参数) | Array | — | — |
| formatSearchParams | 格式化返回的请求参数(用于请求接口时真用用到的参数) return object | function | — | — |
| formatListData | 格式化接口返回数据  需return { list:（el-table data）, total:(分页器总数) } | function | — | — |
| columnInfoList | table列表设置 el-table-column 参数 或者 el-table-column jsx vnode | Array | — | — |
| disableInitGetTable | 是否初始化时不自动请求列表接口 | Boolean | true | false |



### Slot

| Name | Description |
|------|--------|
| — | 描述 |
| header | 列表顶部 |
| aside | 列表左侧 |

<!-- ### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — | -->

### Methods
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| getTable | 查询（会记录之前查询参数）  | — |
