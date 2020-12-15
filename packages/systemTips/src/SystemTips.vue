<template>
 <article class="empty-wrapper">
   <section class="empty-wrapper--img">
     <img :src="imgSrc.img" v-if="imgSrc.img"/>
   </section>
   <slot></slot>
 </article>
</template>

<script>

export default {
  name: 'nhcSysTips',
  components: {},
  props: {
    tipsType: {
      type: String,
      default: 'sys-error'
    }
  },
  data () {
    return {
      imgSrc: {
        img: require(`@P/assets/img/systemTips/${this.tipsType || 'sys-error'}.png`)
      }
    }
  },
  computed: {
  },
  watch: {},
  created () {},
  mounted () {
  },
  methods: {},
  filters: {}
}
</script>

<style lang='scss' scoped>
.empty-wrapper {
   width: 100;
   opacity: 0;
   animation: fadeIn 1s ease-in forwards;
   &--img {
     margin-bottom: 20px;
     text-align: center;
     & img {
       width: 35%;
     }
   }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    width: 40%;
  }

  to {
    opacity: 1;
    width: 100%;
  }
}
</style>
