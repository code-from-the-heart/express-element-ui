<template>
    <div class="el-aside index-menu">
      <el-menu
      :show-timeout="200"
      :unique-opened="false"
      :collapse="isCollapse"
      class="menu-tree"
      mode="vertical">
      <el-menu-item :index="String(index)" v-for="(item,index) in munuList" :key="index" @click="handleMenuClick(item)">
         <!-- <i class="el-icon-menu"></i> -->
         <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
    </div>
</template>>

<script>
import { menuConfig } from './contant.js'

export default {
  name: 'sysMenu',
  props: {},
  computed: {
    munuList () {
      return [...this.menuConfig.values()]
    }
  },
  components: {
  },
  data () {
    return {
      menuConfig: menuConfig,
      isCollapse: false
    }
  },
  methods: {
    toggleSideBar () {
      // this.$store.dispatch('toggleSideBar')
    },
    // 课题录入
    handleMenuClick ({ path }) {
      this.$router.push({
        path
      })
    }
  },
  watch: {},
  filters: {},
  created () {
  },
  mounted () {}
}
</script>

<style lang='scss' scoped>
.hamburger-container {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
  background: transparent;
}
.web-card-aside {
  min-height:calc(100vh - 60px);
  height: 100%;
}
.menu-tree{
  & /deep/ .el-submenu__title .svg-icon {
    margin-right: 8px;
  }
  background-color: white;
  /deep/ &.el-menu{
    border-right: none;
  }
  /deep/ .el-submenu {
    line-height: 40px;
    &.is-opened{
      .el-menu{
        background-color: #F2F2F2;
      }
    }
    .el-submenu__title{
      &:hover, &:focus{
        background-color:#0e1a31;
      }
      i{
        color:#909399;
      }
    }
  }
  /deep/ .el-submenu__title, /deep/ .el-submenu .el-menu-item{
    color: #fff;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
  /deep/ .el-menu-item{
    width: 240px;
    min-width: 200px;
    font-size: 16px;
    text-align: left;
    &:hover{
      color:#409EFF;
      background-color: #F2F2F2;
      a{
        color:#409EFF;
      }
    }

    &.is-active{
      position: relative;
      &::before{
        position: absolute;
        top: 3px;
        left: 0;
        display: block;
        content: '';
        width: 9px;
        height: 34px;
      }
      // background: linear-gradient(to right, rgba(17, 208, 226, .3) , transparent);

      a{
        color:#0486FE;
      }
    }

    a{
      color:#0486FE;
    }
  }
}
.menu-tree:not(.el-menu--collapse) {
  width: 240px;
  box-sizing: border-box;
  min-height: calc(100vh - 60px);
}
.hideSide /deep/ .el-menu-item {
    width: initial;
    min-width: initial;
}
.index-menu {
  position: relative;
}
</style>
