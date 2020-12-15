<template>
 <article>
   <section class="nhc-page-module">
     <nhc-sys-error btnName="返回首页" :ckFn="gotoHome"></nhc-sys-error>
   </section>
 </article>
</template>

<script>
export default {
  name: '404Test',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    gotoHome () {
      console.log('go home')
    }
  },
  filters: {}
}
</script>

<style lang='scss' scoped>

</style>
