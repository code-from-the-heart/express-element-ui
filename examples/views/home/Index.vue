<template>
 <article class="home-wrapper">
   <section class="home-wrapper--nav">
     <section class="section">
       <p>svg demo</p>
       <nhc-svg-icon className="svg-demo-class" icon-name="brain-logo"></nhc-svg-icon>
     </section>

     <section class="section">
       <span @click="dialogVisible = true" class="demo">点击弹窗，测试移动指令</span>
     </section>

   </section>
   <!-- 弹窗 -->
   <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      v-dialogDrag
      width="40%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
 </article>
</template>

<script>

export default {
  name: 'home',
  components: {},
  props: {},
  data () {
    return {
      dialogVisible: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    handleClick (item) {
      this.$router.push({
        path: item.src
      })
    }
  },
  filters: {}
}
</script>

<style lang='scss' scoped>
.home-wrapper {
  .svg-demo-class {
   width: auto;
   height: auto;
 }
.section {
  margin: 20px auto;
  padding: 30px 0;
  background-color: #f0f0f0;
  .demo {
    cursor: pointer;
  }
 }
 & .section:first-child {
   margin-top: 0;
 }
}

</style>
