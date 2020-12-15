
<template>
  <section class="app-main">
    <!-- <tags-view /> -->
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view  class="page-main__view"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>
<script>

export default {
  name: 'app-main',
  computed: {
    cachedViews () {
      return []
    },
    key () {
      // 不需要缓存
      return this.$route.fullPath + new Date().getTime()
    }
  }
}
</script>
<style scoped lang="scss">
.app-main {
  // width:870px;
  margin: 16px;
  padding: 24px;
  min-height: calc(100vh - 92px);
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  // padding-top: 12px;
  background-color: white;
  & > .page-content {
    margin: 0px 10px 15px 10px;
  }
}
.page-main__view {
  // min-height: calc(100% - 60px);
  min-height: 100%;
}
</style>
