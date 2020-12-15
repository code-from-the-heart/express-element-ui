<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang='scss'>

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/** doc 样式 */
.app-main .content > table {
  width:100%;
}
.app-main .content > table th,
.app-main .content > table td{
  border-bottom: 1px solid #dcdfe6;
  padding: 15px;
  max-width: 250px;
  text-align:left;
}

.app-main .content{
  h2 a,
  h3 a,
  h4 a,
  h5 a  {
    float: left;
    margin-left: -20px;
    opacity: 0;
    color: #409EFF;
    cursor: pointer;
  }
}

.app-main .content{
  h2:hover,
  h3:hover,
  h4:hover,
  h5:hover{
    a {
      opacity: 0.5;
    }
  }

 pre {
    line-height: 1.8;
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
    font-size: 12px;
    padding: 18px 24px;
    background-color: #fafafa;
    border: solid 1px #eaeefb;
    margin-bottom: 25px;
    border-radius: 4px;
    -webkit-font-smoothing: auto;
  }
}
/** doc 样式 end*/

</style>
