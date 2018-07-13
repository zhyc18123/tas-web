<template>
<div>
    <div v-if="!showView">
  <upload @success="pdfSuccess"></upload>
        <el-button type="primary" @click="showView=true">预览</el-button>
    </div>
    <div v-else>
        <pdfshower :pdfurl="pdfUrl" :scale="1.5" ></pdfshower>
        <el-button type="primary" @click="showView=false">取消</el-button>
    </div>
</div>
</template>
<script>
import Upload from '../common/Upload'
import pdfshower from 'vue-pdf-shower';
export default {
  name:'pdf',
  data () {
      return {
          showView:false,
          pdfUrl:''
      }
  },
  components: {
      Upload,
      pdfshower
  },
  methods: {
      pdfSuccess(url, size, duration, originName){
this.pdfUrl=url+'?attname='+originName
      }
  }
}
</script>
<style>
.pdf{
    height: 1000px;
    width: 100%;
}
</style>


