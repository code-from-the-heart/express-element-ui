<template>
 <section class="card-header">
    <div class="header-left">
      <span class="header-title">NHC-COMMON-UI</span>
    </div>
    <!-- <div class="header-right">to do</div> -->
 </section>
</template>

<script>

export default {
  name: 'sys-header',
  components: {
  },
  computed: {
  },
  data () {
    return {
    }
  },
  methods: {

  },
  watch: {},
  filters: {},
  created () {},
  mounted () {}
}
</script>
<style lang='scss' scoped>

.sys-title {
    margin-left: 27px;
    font-size: 22px;
    color: #0486FE;
 }
 .header-title {
   color: #0486FE;
   font-size: 18px;
   margin-left: 7px;
   font-weight: BOLD
 }
.card-header {
  position: relative;
  width: 100%;
  height: 60px;
  padding: 10px 0;
  display: flex;
  border-bottom: 1px solid #D9D9D9;
  box-shadow: -2px 5px 11px 1px rgba(50, 95, 155, 0.1);
    .header-left {
      width: 60%;
      display: flex;
      align-items: center;
      padding-left: 20px;
    }
    .header-right {
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 16px;
      padding-right: 90px;
    }
}
</style>
