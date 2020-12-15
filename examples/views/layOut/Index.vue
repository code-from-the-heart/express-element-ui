<template>
 <div class="loyout-wrapper">
   <side-header></side-header>
   <div class="main-container">
     <side-menu></side-menu>
     <app-main></app-main>
   </div>
 </div>
</template>

<script>

import sideMenu from '@/views/layOut/SideMenu/Index.vue'
import sideHeader from '@/views/layOut/SysHeader/Index.vue'
import appMain from '@/views/layOut/AppMain/Index.vue'

export default {
  name: 'layOutIndex',
  props: {},
  components: {
    sideMenu,
    sideHeader,
    appMain
  },
  data () {
    return {}
  },
  watch: {},
  filters: {},
  created () {},
  mounted () {
  }
}
</script>

<style lang='scss' scoped>

.main-container {
  position: relative;
  width: 100%;
  display: flex;
  overflow: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  background-color: #F2F2F2;
  height: calc(100vh - 60px);
  background-position: 0 0;
  background-repeat: no-repeat;
}
.loyout-wrapper {
  min-width: 1024px;
  width: 100%;
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

</style>
