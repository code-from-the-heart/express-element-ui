

## NhcTooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

### 设计原则
* 基于el-tooltip的基础上二次封装自动判断文字超出宽度时显示省略号,并带文字提示，没有超出宽度时，不带文字提示

### 基本用法

根据父元素的宽度自动适应显示提示文字

:::demo 跟el-tooltip不同的方法是elcontent内容会给展示到slot中,而slot中的内容不会展示
```html
<template>
    <div>
      <div style='width:80px;margin-bottom:16px;'>
        <nhc-tooltip class="item" effect="dark" content="Top 提示文字" placement="top" />
      </div>

      <div style='width:80px;'>
         <nhc-tooltip class="item" effect="dark" content="按钮不会显示" placement="top" >
          <el-button>按钮不会显示</el-button>
        </nhc-tooltip>
      </div>
    </div>
</template>

<script>

export default {
}
</script>
```
:::

### 可点击

根据父元素的宽度自动适应显示提示文字

:::demo 跟el-tooltip不同的方法是elcontent内容会给展示到slot中,而slot中的内容不会展示
```html
<template>
    <div>
      <div style='width:80px;margin-bottom:16px;'>
        <nhc-tooltip class="item" effect="dark" content="Top 提示文字" placement="top" :open-click='true' @click="handleClick('Top 提示文字')" :disabled='true'/>
      </div>
    </div>
</template>

<script>

export default {
  methods: {
    handleClick (str) {
      alert(`点击了${str}`)
    }
  }
}
</script>
```
:::






### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| content     | 提示文字内容           | string | — | — |
| placement | Tooltip 的出现位置 | string | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top |
| openClick | 是否可以点击 | boolean | — | false |



<!-- ### Slot

| Name | Description |
|------|--------|
| — | 描述 |
| title | 标题的内容 | -->

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| click | openClick true状态下时回调 | — |