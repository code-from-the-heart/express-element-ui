
## NhcPagination 分页器

统一配置分页配置

### 基本用法

继承el-pagination的参数和方法 默认配置好单页情况下不显示

:::demo  data传入fetch、formatListData、 columnInfoList 点击查询翻页等，列表会处理好分页等请求数据的逻辑
```html
<template>
 <article>
    <nhc-pagination
    :current-page="form.page + 1"
    :page-size="form.size"
    :total="total"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange">
    </nhc-pagination>
   </section>
 </article>
</template>

<script>
export default {
  data () {
    return {
      form: {
        page: 0,
        size: 20
      },
      total: 20,
    }
  },
  methods: {
    // 每页条数
    handleSizeChange (val) {
      this.form.size = val
      this.form.page = 0
    },
    // 页码
    handleCurrentChange (val) {
      this.form.page = val - 1
    }
  }
}
</script>
```
:::




### Attributes

参考element-ui el-pagination文档



