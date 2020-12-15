<template>
  <div class="text-tooltip">
    <el-tooltip
      class="item"
      v-bind="$attrs"
      :placement="placement"
      :disabled="isShowTooltip"
    >
      <p class="over-flow" :class="className" @mouseover="onMouseOver(refName)">
        <span :ref="refName" :class="[openClick?'click':'']" @click="handleClick">{{ $attrs.content||'-' }}</span>
      </p>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'NhcTooltip',
  props: {
    placement: {
      type: String,
      default: 'top'
    },
    openClick: {
      type: Boolean,
      default: false
    },
    // 外层框的样式，在传入的这个类名中设置文字显示的宽度
    className: {
      type: String,
      default: () => {
        return ''
      }
    },
    // 为页面文字标识（如在同一页面中调用多次组件，此参数不可重复）
    refName: {
      type: String,
      default: () => {
        return 'tooltipOver'
      }
    }
  },
  data () {
    return {
      isShowTooltip: true
    }
  },
  methods: {
    onMouseOver (str) {
      const parentWidth = this.$refs[str] && this.$refs[str].parentNode.offsetWidth
      const contentWidth = this.$refs[str] && this.$refs[str].offsetWidth
      // 判断是否开启tooltip功能
      if (contentWidth > parentWidth) {
        this.isShowTooltip = false
      } else {
        this.isShowTooltip = true
      }
    },
    handleClick () {
      this.openClick && this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.over-flow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.click {
  color:#0486FE;
  cursor:pointer;
}
.wid190 {
    width: 100%;
}
p{
    margin: 0;
}
</style>
