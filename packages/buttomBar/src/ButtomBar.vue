<template>
 <article class="nhc-wrapper-bar">
   <section >
     <slot></slot>
   </section>
 </article>
</template>

<script>
export default {
  name: 'nhcButtomBar',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {},
  filters: {}
}
</script>

<style lang='scss' scoped>
.nhc-wrapper-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 3px rgba(0,0,0,.2);
  width: 100%;
  height: 52px;
  line-height: 52px;
  z-index: 99;
  background: #ffffff;
  text-align: right;
  padding: 0 24px;
}
</style>
