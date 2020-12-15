<template>
  <el-upload
    v-bind="$attrs"
    v-on="$listeners"
    :before-upload="beforeHandler"
    :before-remove="beforeRemove"
    ref="baseUpload"
  >
    <slot></slot>
    <template v-slot:tip>
      <slot name="tip"></slot>
    </template>
    <template v-slot:trigger>
      <slot name="trigger"></slot>
    </template>
  </el-upload>
</template>
<script>
export default {
  name: 'nhcUpload',
  props: {},
  data () {
    return {
      flag: true
    }
  },
  methods: {
    beforeHandler (file) {
      //   console.info("base upload----", file);
      const { name } = file
      const nameArr = name.split('.')
      const len = nameArr.length
      const subffix = len > 1 ? nameArr[len - 1] : ''
      // 禁止可执行文件类型上传
      if (
        !subffix ||
        [
          'exe',
          'sh',
          'bat',
          'jar',
          'air',
          'apk',
          'app',
          'bin',
          'cmd',
          'com',
          'dex',
          'dmg',
          'gadget',
          'js',
          'scr',
          'tpz',
          'vbs',
          'wsf'
        ].includes(subffix)
      ) {
        this.$message.error('暂不支持该文件格式上传')
        this.flag = false
        return false
      }
      this.flag = true
      if (this.$attrs['before-upload']) {
        return this.$attrs['before-upload'].apply(this, arguments)
      }

      // let t = this.$attrs["before-upload"].apply(this, arguments);
      // //   console.info("t----", typeof t, t);
      // //   t.then && t.then(null, error => {});
      // return t;
    },
    beforeRemove () {
      if (this.flag && this.$attrs['before-remove']) {
        return this.$attrs['before-remove'].apply(this, arguments)
      }
    },
    clearFiles () {
      this.$refs.baseUpload.clearFiles()
    },
    submit () {
      this.$refs.baseUpload.submit()
    },
    abort (file) {
      // console.info('abort---', file)
      this.$refs.baseUpload.abort(file)
    }
  }
}
</script>
