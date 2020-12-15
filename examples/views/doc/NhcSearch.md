
## NhcSearch 查询菜单

数据驱动配置查询菜单

### 基本用法

动态设置每个el-form表单提交组件及数据,多用于常用的列表查询，节省重复编写查询组件

:::demo 
```html
<template>
  <article>
      <nhc-search ref="searchForm" :search-list="searchConfig" @search="handleSearch" @reset="handleResetClick"></nhc-search>
  </article>
</template>

<script>

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
        }
      ],
      form: {
        page: 0,
        size: 20
      },
      total: 20
    }
  },
  methods: {
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
    handleSearch (params) {
      this.form = Object.assign({}, this.form, params)
      console.log(this.form)
    },
    handleResetClick (params) {
      this.form = Object.assign({}, this.form, params)
      console.log(this.form)
    },
  },
}
</script>
```
:::




### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| search-list | 传入的菜单配置 具体查看下面说明 | Array | — | — |

### search-list
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 表单label  | string | — | — |
| name | form表单prop  | string | — | — |
| attrs | 对应组件的v-bind 参数 | object | — | — |
| component | 对应element组件(如el-input，则传input) | string | — | — |
| value | 组件默认值 | string|number | — | — |
| options | 组件为select时用到 | object | — | — |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| search | 查询 | params |
| reset | 重置 | params |
