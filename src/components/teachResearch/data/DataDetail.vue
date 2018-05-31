<template>
  <el-row class="data-detail">
<line-head-form class="head" title="新增素材"/>
<el-form class="o-form" label-position="right" label-width="120px" :model="form">
  <el-form-item label="素材名称:">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
            <el-form-item prop="dataSubject">
                <div slot="label" class="tow-four">
                    科
                    <span>目:</span>
                </div>

                <el-select v-model="form.dataSubject" placeholder="">
                    <el-option v-for="(subject,index) in condition.subjectList" :label="subject.name" :value="subject.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="baseSectionId">
                <div slot="label" class="tow-four">
                    年
                    <span>级:</span>
                </div>
                <el-select v-model="form.baseSectionId" placeholder="">
                    <el-option v-for="(grade,index) in condition.gradeObj.list" :label="grade.name" :value="grade.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="baseLevelId">
                <div slot="label" class="tow-four">
                    班
                    <span>型:</span>
                </div>

                <el-select v-model="form.baseLevelId" placeholder="">
                    <el-option v-for="(level,index) in condition.levelObj.list" :label="level.name" :value="level.id"></el-option>
                </el-select>
            </el-form-item>
  <el-form-item label="资料说明:">
    <el-input type="textarea" :rows="6" v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="">
      <upload btnText="上传素材">
          <p class="surport">(支持PPT、Word、Excel、PDF、压缩包)</p>
      </upload>
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
import { mapState, mapActions } from 'vuex'
export default {
  components: {
      LineHeadForm,
      Upload
  },
  data () {
      return {
          form:{
                id:this.$route.params.id,
                name: '',
                baseSectionId: '',
                dataSubject: '',
                baseLevelId: '',
          },
          checkList:[]
      }
  },
    computed: {
        ...mapState(['condition','data']),
    },
    created () {
        this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000 })
        this.findSubjectsData({ sectionId: this.form.baseSectionId })
        this.findBaseLevelPage({ pageIndex: 1, pageSize: 1000000 })
    },

    methods: {
        ...mapActions(['findBaseSectionPage', 'findSubjectsData', 'findBaseLevelPage',]),
    }
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.data-detail
    .el-select
        width 100%
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
    .surport
        color #ff7800
        padding-left 40px
</style>
<style lang="stylus">
.data-detail .gray
    .el-form-item__label,.el-form-item__content
        line-height 30px
        font-size 14px
        font-weight normal 
        
</style>


