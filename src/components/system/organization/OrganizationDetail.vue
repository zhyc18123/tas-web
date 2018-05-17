<template>
  <el-row class="organization-detail">
<line-head-form class="head" title="新建合作机构"/>
<el-form class="o-form" label-position="right" label-width="120px" :model="form">
  <el-form-item label="机构:">
      <file-upload/>
  </el-form-item>
  <el-form-item label="机构名称:">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="机构简称:">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="机构简介:">
    <el-input type="textarea" :rows="6" v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="合作状态:">
      <el-radio label="试用期" v-model="form.operatStatus"></el-radio>
      <el-radio label="合约期" v-model="form.operatStatus"></el-radio>
      <el-radio label="终止" v-model="form.operatStatus"></el-radio>
  </el-form-item>
  <el-form-item label="账号有效期:">
    <el-date-picker
      v-model="form.effictTime"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="可免费新增账号:">
      <el-col :span="6">
    <el-input v-model="form.name"></el-input>
      </el-col> <em class="free-num">个</em> 
  </el-form-item>
  <el-form-item label="合作类型:">
          <el-tooltip class="item" effect="light" content="指机构本身拥有业务 课程" placement="bottom-start">
      <el-button class="personal">
          
      <el-radio label="个性化" v-model="form.operatStatus">
      </el-radio>
      </el-button>
    </el-tooltip>
      <el-radio label="标准" v-model="form.operatStatus">标准</el-radio>
  </el-form-item>
  <el-form-item class="opt-btn">
      <el-button class="height-btn">确定</el-button>
      <el-button class="light-btn">取消</el-button>
  </el-form-item>
</el-form>
  </el-row>
</template>
<script>
import LineHeadForm from '../../common/LineHeadForm'
import FileUpload from '../../common/FileUpload'
export default {
  components: {
      LineHeadForm,
      FileUpload
  },
  data () {
      return {
          form:{
              name:'',
              operatStatus:'',
              effictTime:''
          }
      }
  }
}
</script>
<style lang="stylus" scoped>
.organization-detail
    .o-form
        padding 0 200px
        margin auto
        margin-top 50px
    .head
      margin-top 10px
    .free-num
        margin-left 10px
        font-style normal
    .personal
        border 0
        color #606266
        &:hover
            background transparent
    .opt-btn
        text-align center
</style>

