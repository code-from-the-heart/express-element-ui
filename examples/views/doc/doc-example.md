
## 测试列表

用于页面中展示重要的提示信息。

### 基本用法

页面中的非浮层元素，不会自动消失。

:::demo 测试列表
```html
<template>
 <article class='doc-example'>
   <section class="search nhc-page-module">
     <nhc-search ref="searchForm" :search-list="searchConfig" @search="handleSearch" @reset="handleResetClick"></nhc-search>
   </section>
   <section class="nhc-table-list nhc-page-module">
      <nhc-table
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
```
:::

## Alert 警告

用于页面中展示重要的提示信息。

### 基本用法

页面中的非浮层元素，不会自动消失。


:::demo Alert 组件提供四种主题，由`type`属性指定，默认值为`info`。
```html
<template>
  <el-alert
    title="成功提示的文案"
    type="success">
  </el-alert>
  <el-alert
    title="消息提示的文案"
    type="info">
  </el-alert>
  <el-alert
    title="警告提示的文案"
    type="warning">
  </el-alert>
  <el-alert
    title="错误提示的文案"
    type="error">
  </el-alert>
</template>
```
:::

### 主题

Alert 组件提供了两个不同的主题：`light`和`dark`。

:::demo 通过设置`effect`属性来改变主题，默认为`light`。
```html
<template>
  <el-alert
    title="成功提示的文案"
    type="success"
    effect="dark">
  </el-alert>
  <el-alert
    title="消息提示的文案"
    type="info"
    effect="dark">
  </el-alert>
  <el-alert
    title="警告提示的文案"
    type="warning"
    effect="dark">
  </el-alert>
  <el-alert
    title="错误提示的文案"
    type="error"
    effect="dark">
  </el-alert>
</template>
```
:::



### 自定义关闭按钮

自定义关闭按钮为文字或其他符号。

:::demo 在 Alert 组件中，你可以设置是否可关闭，关闭按钮的文本以及关闭时的回调函数。`closable`属性决定是否可关闭，接受`boolean`，默认为`true`。你可以设置`close-text`属性来代替右侧的关闭图标，注意：`close-text`必须为文本。设置`close`事件来设置关闭时的回调。
```html
<template>
  <el-alert
    title="不可关闭的 alert"
    type="success"
    :closable="false">
  </el-alert>
  <el-alert
    title="自定义 close-text"
    type="info"
    close-text="知道了">
  </el-alert>
  <el-alert
    title="设置了回调的 alert"
    type="warning"
    @close="hello">
  </el-alert>
</template>

<script>
  export default {
    methods: {
      hello() {
        alert('Hello World!');
      }
    }
  }
</script>
```
:::

### 带有 icon

表示某种状态时提升可读性。

:::demo 通过设置`show-icon`属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。
```html
<template>
  <el-alert
    title="成功提示的文案"
    type="success"
    show-icon>
  </el-alert>
  <el-alert
    title="消息提示的文案"
    type="info"
    show-icon>
  </el-alert>
  <el-alert
    title="警告提示的文案"
    type="warning"
    show-icon>
  </el-alert>
  <el-alert
    title="错误提示的文案"
    type="error"
    show-icon>
  </el-alert>
</template>
```
:::

### 文字居中

使用 `center` 属性让文字水平居中。

:::demo
```html
<template>
  <el-alert
    title="成功提示的文案"
    type="success"
    center
    show-icon>
  </el-alert>
  <el-alert
    title="消息提示的文案"
    type="info"
    center
    show-icon>
  </el-alert>
  <el-alert
    title="警告提示的文案"
    type="warning"
    center
    show-icon>
  </el-alert>
  <el-alert
    title="错误提示的文案"
    type="error"
    center
    show-icon>
  </el-alert>
</template>
```
:::

### 带有辅助性文字介绍

包含标题和内容，解释更详细的警告。

:::demo 除了必填的`title`属性外，你可以设置`description`属性来帮助你更好地介绍，我们称之为辅助性文字。辅助性文字只能存放单行文本，会自动换行显示。
```html
<template>
  <el-alert
    title="带辅助性文字介绍"
    type="success"
    description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……">
  </el-alert>
</template>
```
:::

### 带有 icon 和辅助性文字介绍

:::demo 最后，这是一个同时具有 icon 和辅助性文字的样例。
```html
<template>
  <el-alert
    title="成功提示的文案"
    type="success"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </el-alert>
  <el-alert
    title="消息提示的文案"
    type="info"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </el-alert>
  <el-alert
    title="警告提示的文案"
    type="warning"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </el-alert>
  <el-alert
    title="错误提示的文案"
    type="error"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </el-alert>
</template>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title     | 标题           | string | — | — |
| type | 主题 | string | success/warning/info/error | info |
| description | 辅助性文字。也可通过默认 slot 传入 | string | — | — |
| closable | 是否可关闭 | boolean | — | true |
| center | 文字是否居中 | boolean | — | true |
| close-text | 关闭按钮自定义文本 | string | — | — |
| show-icon | 是否显示图标 | boolean | — | false |
| effect | 选择提供的主题 | string | light/dark | light |

### Slot

| Name | Description |
|------|--------|
| — | 描述 |
| title | 标题的内容 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |
