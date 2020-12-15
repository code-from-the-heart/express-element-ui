<template>
  <div>
    <nhc-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :before-upload="beforeHandler"
      ref="upload"
      :auto-upload="false"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </nhc-upload>
    <el-button @click="submitHandler">submit</el-button>
  </div>
</template>
<script>
export default {
  name: 'uploadTest',
  data () {
    return {
      fileList: [],
      test: 'juan'
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log('remove---', file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    beforeHandler (file) {
      // console.info("aaaaa---", file, this.test);
    //   return new Promise((resolve, reject) => {
    //     reject();
    //   });
    },
    submitHandler () {
      // console.info('submit---',  this.$refs.upload)
      this.$refs.upload.submit({ a: 111 })
    }
  }
}
</script>
