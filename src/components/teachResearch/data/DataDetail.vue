<template>
  <el-row class="data-detail">
<line-head-form class="head" title="新增素材"/>
<el-form class="o-form" label-position="right" label-width="120px" :model="form">
  <el-form-item label="素材名称:">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="科目:">
      <el-radio label="英语" v-model="form.operatStatus"></el-radio>
      <el-radio label="语文" v-model="form.operatStatus"></el-radio>
      <el-radio label="数学" v-model="form.operatStatus"></el-radio>
  </el-form-item>
  <el-form-item label="年级:">
    <el-form :model="form" class="t-form gray">
      <el-form-item label="小学：">
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="一年级"></el-checkbox>
    <el-checkbox label="二年级"></el-checkbox>
    <el-checkbox label="三年级"></el-checkbox>
    <el-checkbox label="四年级"></el-checkbox>
    <el-checkbox label="五年级"></el-checkbox>
  </el-checkbox-group>
      </el-form-item>
      <el-form-item label="初中：">
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="初一"></el-checkbox>
    <el-checkbox label="初二"></el-checkbox>
    <el-checkbox label="初三"></el-checkbox>
  </el-checkbox-group>
      </el-form-item>
      <el-form-item label="高中：">
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="高一"></el-checkbox>
    <el-checkbox label="高二"></el-checkbox>
    <el-checkbox label="高三"></el-checkbox>
  </el-checkbox-group>
      </el-form-item>
    </el-form>
  </el-form-item>
  <el-form-item label="层级:">
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="能力提高"></el-checkbox>
    <el-checkbox label="层级一"></el-checkbox>
    <el-checkbox label="层级二"></el-checkbox>
    <el-checkbox label="层级三"></el-checkbox>
    <el-checkbox label="层级四"></el-checkbox>
  </el-checkbox-group>
  </el-form-item>
  <el-form-item label="资料说明:">
    <el-input type="textarea" :rows="6" v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="资料说明:">
      <upload />
  </el-form-item>
  <el-form-item label="权限设置:">
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="全选"></el-checkbox>
    <el-checkbox label="可预览"></el-checkbox>
    <el-checkbox label="可下载"></el-checkbox>
  </el-checkbox-group>
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
import Upload from '../../common/Upload'
export default {
  components: {
      LineHeadForm,
      Upload
  },
  data () {
      return {
          form:{
              name:'',
              operatStatus:'',
              effictTime:''
          },
          checkList:[]
      }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.data-detail
    .gray
        table-form()
        padding-top 15px
        padding-right 20px
        padding-bottom 10px
        .el-form-item
            margin-bottom 0
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
<style lang="stylus">
.data-detail .gray
    .el-form-item__label,.el-form-item__content
        line-height 30px
        font-size 14px
        font-weight normal 
        
</style>


