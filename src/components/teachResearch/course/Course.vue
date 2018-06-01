<template>
  <div class="course" @keydown="search">
    <el-form :inline="true" :model="form" class="t-form gray">
      <el-form-item label="">
        <el-select v-model="form.dataSubject" placeholder="科目">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(subject,index) in condition.subjectList" :label="subject.name" :value="subject.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="form.baseSectionId" placeholder="年级">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(grade,index) in condition.gradeObj.list" :label="grade.name" :value="grade.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="form.baseTrimesterId" placeholder="学期">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(term,index) in condition.termObj.list" :label="term.name" :value="term.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
      <el-form-item class="new-item">
        <el-button type="primary" class="new-btn" @click="addCourse">新建课程</el-button>
      </el-form-item>
    </el-form>
    <el-table class="line-table" empty-text="暂无课程，请先添加课程" :data="result.list" header-align="center">
      <el-table-column prop="name" label="课程名称" align="center"></el-table-column>
      <el-table-column prop="baseLevelName" label="课程层级" align="center"></el-table-column>
      <el-table-column prop="dataSubjectName" label="科目" align="center"> </el-table-column>
      <el-table-column prop="chapterNum" label="讲数" align="center"> </el-table-column>
      <el-table-column prop="baseSectionName" label="年级" align="center"> </el-table-column>
      <el-table-column prop="baseTrimesterName" label="学期" align="center"> </el-table-column>
      <el-table-column label="发布状态" align="center"> 
        <template scope="scope">
          {{scope.row.status===0?'未发布':'已发布'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="t-btn" width="200">
        <template scope="scope">
          <a :disabled="true" title="编辑讲次" href="javascript:;" @click="editLecture(scope)">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bianji"></use>
            </svg>
          </a>
          <router-link title="修改课程信息" :to="{path:'/main/teach-research/course/'+scope.row.id}">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiugai"></use>
            </svg>
          </router-link>
          <a v-show="scope.row.status===1" title="取消发布" @click="publishLesson(scope.row.id,0)">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xuqiaofahu"></use>
            </svg>
          </a>
          <a v-show="scope.row.status===0" title="发布" @click="publishLesson(scope.row.id,1)"   >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fabu1"></use>
            </svg>
          </a>
        </template>
      </el-table-column>
    </el-table>
    <v-pagination ref="pagin" class="pag" :total="result.total|toNumber" @getListResult="getCourseList" :currentPage="form.pageIndex"></v-pagination>
  </div>
</template>
<script>
import VPagination from '../../common/Pagination'
import { mapState, mapActions } from 'vuex'
import io from 'lib/io'
export default {
  components: {
    VPagination
  },
  data() {
    return {
      form: {
        name: '',
        baseTrimesterId: null,
        dataSubject: null,
        baseSectionId: null,
        pageIndex: 1,
        pageSize: 10
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
        }
      ],
    }
  },
  computed: {
    ...mapState(['condition','course']),
    ...mapState({result:state=>state.course.courseObj})
  },
  watch: {
    'form.dataSubject'(val) {
    this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000,subjectId:this.form.dataSubject })
    }
  },
  created() {
    this.getCourseList()
    this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000,subjectId:this.form.dataSubject })
    this.findBaseTermPage({ pageIndex: 1, pageSize: 1000000 })
    this.findSubjectsData({ sectionId: this.baseSectionId })

  },
  methods: {
    ...mapActions(['findBaseSectionPage', 'findSubjectsData', 'findBaseTermPage','findLessonPage']),
    editLecture(scope){
      if(scope.row.status===0){
      this.$router.push({path:'/main/teach-research/course/edit-lecture/'+scope.row.id})
      }else{
        this.$message('已发布的课程，不可以编辑讲次！')
      }
    },
    search() {
      this.$refs.pagin.changePage(1)
      this.getCourseList()
    },
    addCourse() {
      this.$router.push({ path: '/main/teach-research/course/add' })
    },
    getCourseList(opt) {
      this.findLessonPage({...this.form,...opt})
    },
  async publishLesson(id,status){
    let tipText=''
    if(status===0){
      tipText='取消发布课程，该课程将无法被引用，是否确定？'
    }else{
      tipText='发布课程后，无法修改，是否确定？'
    }
      this.$confirm(tipText).then(async ()=>{
      let {data} =await io.post6(io.publishLesson,{id,status})
      if(data.success){
        this.$message('修改成功')
        this.getCourseList()
      }
      })
  }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.course
  padding-bottom 50px
.t-form
  table-form()
  margin-top 20px
  margin-bottom 30px
.line-table
  .icon
    cursor pointer
    font-size 22px
    color #999
    &:hover
      color #333
</style>



      