<template>
  <el-row class="course-detail">
    <course-step :active="1"/>
    <div class="add-type">
        <el-button @click="addTypeFun">引用已有课程</el-button>
    </div>
    <el-form v-show="!addType" class="o-form" label-position="right" label-width="120px" :model="form">
      <el-form-item label="课程名称:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
          <div slot="label" class="tow-four">
              年<span>级:</span>
          </div>
            <el-select v-model="form.region" placeholder="">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
      </el-form-item>
      <el-form-item>
          <div slot="label" class="tow-four">
              科<span>目:</span>
          </div>
        
            <el-select v-model="form.region" placeholder="">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
      </el-form-item>
      <el-form-item>
          <div slot="label" class="tow-four">
              层<span>级:</span>
          </div>
        
            <el-select v-model="form.region" placeholder="">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
      </el-form-item>
      <el-form-item>
          <div slot="label" class="tow-four">
              讲<span>数:</span>
          </div>
        
            <el-select v-model="form.region" placeholder="">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
      </el-form-item>
      <el-form-item>
          <div slot="label" class="tow-four">
              学<span>期:</span>
          </div>
        
            <el-select v-model="form.region" placeholder="">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
      </el-form-item>
      <el-form-item label="教材版本:">
        
            <el-select v-model="form.region" placeholder="">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
      </el-form-item>
      <el-form-item>
          <div slot="label" class="tow-four">
              年<span>份:</span>
          </div>
        
            <el-select v-model="form.region" placeholder="">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
      </el-form-item>
      <el-form-item label="课程简介:">
        <el-input type="textarea" :rows="6" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="">
          <upload btnText="上传介绍（视频）">
          </upload>
      </el-form-item>
      <el-form-item class="opt-btn">
          <el-button class="height-btn" @click="sure">确定</el-button>
          <el-button class="light-btn">取消</el-button>
      </el-form-item>
    </el-form>
<!-- <div v-show="addType" class="has-course">
    <el-form :inline="true" :model="sForm" class="t-form">
      <el-form-item label="">
        <el-select v-model="form.region" placeholder="年级">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="form.region" placeholder="学期">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="form.region" placeholder="科目">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.user" placeholder="请输入课程名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table class="line-table" :data="tableData" header-align="center">
      <el-table-column label="" align="center" width="60">
          <template scope="scope">
    <el-radio label="111" v-model="checkItem" class="table-radio"></el-radio>
          </template>
      </el-table-column>
      <el-table-column prop="className" label="课程名称" align="center"></el-table-column>
      <el-table-column prop="grade" label="课程层级" align="center"></el-table-column>
      <el-table-column prop="term" label="科目" align="center"> </el-table-column>
      <el-table-column prop="campus" label="讲数" align="center"> </el-table-column>
      <el-table-column prop="curriculumTime" label="年级" align="center"> </el-table-column>
      <el-table-column prop="curriculumTime" label="学期" align="center"> </el-table-column>
    </el-table>
    <v-pagination ref="pagin" class="pag" :total="result.total|toNumber" @getListResult="getListResult" :currentPage="sForm.pageNo"></v-pagination>
  <div class="opt-btn has-course-btn">
      <el-button class="height-btn">下一步</el-button>
  </div>
</div> -->
    <div calss="add-has">
      <el-dialog title="引用已有课程" :visible.sync="dialogTableVisible" class="add-has">
      <div class="has-course">
          <el-form :inline="true" :model="sForm" class="t-form">
            <el-form-item label="">
              <el-select v-model="form.region" placeholder="年级">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="form.region" placeholder="学期">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="form.region" placeholder="科目">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="form.user" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
          <div class="search-table">
            <el-table class="line-table" :data="tableData" header-align="center" >
              <el-table-column label="" align="center" width="60">
                <template scope="scope">
                  <el-radio label="111" v-model="checkItem" class="table-radio"></el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="className" label="课程名称" align="center"></el-table-column>
              <el-table-column prop="grade" label="课程层级" align="center"></el-table-column>
              <el-table-column prop="term" label="科目" align="center"> </el-table-column>
              <el-table-column prop="campus" label="讲数" align="center"> </el-table-column>
              <el-table-column prop="curriculumTime" label="年级" align="center"> </el-table-column>
              <el-table-column prop="curriculumTime" label="学期" align="center"> </el-table-column>
            </el-table>
            <v-pagination ref="pagin" class="pag" :total="result.total|toNumber" @getListResult="getListResult" :currentPage="sForm.pageNo"></v-pagination>
            <div class="opt-btn has-course-btn">
              <el-button class="height-btn" @click="saveExisting">确定</el-button>
            </div>
          </div>
          
      </div>
      </el-dialog>
    </div>
    
  </el-row>
</template>
<script>
import CourseStep from '../../common/CourseStep'
import Upload from '../../common/Upload'
import VPagination from '../../common/Pagination'
export default {
  components: {
      CourseStep,
      Upload,
      VPagination
  },
  data () {
      return {
          form:{
              name:'',
              operatStatus:'',
              effictTime:'',
              regin:''
          },
          sForm:{
            pageIndex:1,
            pageSize:10
          },
          addType:false,
          dialogTableVisible:false,
          checkItem:'',
          checkList:[],
      result: {
        total: 99
      },
      tableData: [
        {
          className: "2018春季物理提高班",
          grade: "初二",
          term: "春季",
          campus: "岗顶校区",
          curriculumTime: "2017-02-12",
          tier: "提高班",
          schoolTime: "8:45 - 9:45",
          week: '周一'
        },
        {
          className: "2018春季物理提高班",
          grade: "初二",
          term: "春季",
          campus: "岗顶校区",
          curriculumTime: "2017-02-12",
          tier: "提高班",
          schoolTime: "8:45 - 9:45",
          week: '周一'
        },{
          className: "2018春季物理提高班",
          grade: "初二",
          term: "春季",
          campus: "岗顶校区",
          curriculumTime: "2017-02-12",
          tier: "提高班",
          schoolTime: "8:45 - 9:45",
          week: '周一'
        },{
          className: "2018春季物理提高班",
          grade: "初二",
          term: "春季",
          campus: "岗顶校区",
          curriculumTime: "2017-02-12",
          tier: "提高班",
          schoolTime: "8:45 - 9:45",
          week: '周一'
        },{
          className: "2018春季物理提高班",
          grade: "初二",
          term: "春季",
          campus: "岗顶校区",
          curriculumTime: "2017-02-12",
          tier: "提高班",
          schoolTime: "8:45 - 9:45",
              week: '周一'}
        // },{
        //   className: "2018春季物理提高班",
        //   grade: "初二",
        //   term: "春季",
        //   campus: "岗顶校区",
        //   curriculumTime: "2017-02-12",
        //   tier: "提高班",
        //   schoolTime: "8:45 - 9:45",
        //   week: '周一'
        // },{
        //   className: "2018春季物理提高班",
        //   grade: "初二",
        //   term: "春季",
        //   campus: "岗顶校区",
        //   curriculumTime: "2017-02-12",
        //   tier: "提高班",
        //   schoolTime: "8:45 - 9:45",
        //   week: '周一'
        // },{
        //   className: "2018春季物理提高班",
        //   grade: "初二",
        //   term: "春季",
        //   campus: "岗顶校区",
        //   curriculumTime: "2017-02-12",
        //   tier: "提高班",
        //   schoolTime: "8:45 - 9:45",
        //   week: '周一'
        // }
      ],
      }
  },
  methods: {
      getListResult(){

      },
      onSubmit(){

      },
      addTypeFun(){
        // this.addType = true
        this.dialogTableVisible = true
      },
      sure(){
          this.$router.push({path:'/main/teach-research/course/edit-lecture/11'})
      },
      saveExisting(){
        this.dialogTableVisible = false
      }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.course-detail
    .has-course-btn
        margin-top 50px
    .add-type
        height 45px
        line-height 45px
        // margin 15px 50px 0
        margin-top 30px
        text-align right 
        .el-button
            background #1ebd99
            color #ffffff
            font-size 14px
            border 1px solid #1ebd99
            border-radius 15px
            height 30px
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
        .el-select
            width 100%
            
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
.has-course
    // padding 20px 50px 
    .t-form
      padding 22px 20px 0 20px
      background #f7f7f7
      .el-select
        width 120px
    .search-table
      padding 20px 20px 0 20px

</style>
<style lang="stylus">
.data-detail .gray
    .el-form-item__label,.el-form-item__content
        line-height 30px
        font-size 14px
        font-weight normal 
.table-radio
    .el-radio__label
        display none
.add-has
    .el-dialog
        width 60%
        min-width 740px


</style>


