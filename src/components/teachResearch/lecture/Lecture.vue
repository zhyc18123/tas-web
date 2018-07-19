<template>
  <div class="lecture">
    <el-form :inline="true" :model="form" class="t-form gray">
      <el-form-item label="">
        <el-select v-model="form.subjectId" placeholder="科目">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(subject,index) in condition.subjectList" :label="subject.name" :value="subject.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="form.sectionId" placeholder="年级">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(grade,index) in condition.gradeObj.list" :label="grade.name" :value="grade.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
                <el-select v-model="form.baseLevelId" placeholder="班型">
          <el-option label="全部" value=""></el-option>
                    <el-option v-for="(level,index) in condition.levelObj.list" :label="level.name" :value="level.id"></el-option>
                </el-select>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.name" placeholder="请输入讲次名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" class="search-btn">查询</el-button>
      </el-form-item>
      <el-form-item class="new-item">
        <el-button v-if="config.chapter_add" type="primary" class="new-btn" @click="addLecture">新建讲次</el-button>
      </el-form-item>
    </el-form>
            <el-table class="line-table" :data="chapter.chapterObj.list" header-align="center">
                <el-table-column prop="name" label="讲次名称" align="center" ></el-table-column>
                <el-table-column prop="subjectName" label="科目"  align="center"></el-table-column>
                <el-table-column prop="sectionNames"  label="年级" align="center"> </el-table-column>
                <!--<el-table-column prop="campus"  label="知识点" align="center"> </el-table-column>-->
                <el-table-column prop="leverName"  label="班型" align="center"> </el-table-column>
                <el-table-column label="操作" align="center"> 
                  <template scope="scope">
                    <router-link v-if="config.lecture_chapter_edit" :to="{path:'/main/teach-research/lecture/'+scope.row.id}">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-bianji"></use>
                            </svg>
                    </router-link>
                  </template>
                </el-table-column>
            </el-table>
    <v-pagination ref="pagin" class="pag" :total="chapter.chapterObj.total|toNumber" @getListResult="getChapterList" :currentPage="form.pageIndex"></v-pagination>
  </div>
</template>
<script>
import VPagination from '../../common/Pagination'
import {mapActions,mapState,mapGetters} from 'vuex'
export default {
  components: {
    VPagination
  },
  data () {
    return {
      form:{
        name:'',
        subjectId:null,
        sectionId:null,
        baseLevelId:null,
        pageIndex:1,
        pageSize:10
      },
    }
  },
  computed: {
    ...mapState(['chapter','condition']),
    ...mapGetters(['config'])
  },
  watch: {
    'form.subjectId'(val) {
    this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000,subjectId:this.form.subjectId })
    }
  },
  activated () {
    this.getChapterList()
  },
  created () {
    this.getChapterList()
        this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, subjectId: this.form.subjectId })
        this.findSubjectsData({ sectionId: this.form.sectionId })
        this.findBaseLevelPage({ pageIndex: 1, pageSize: 1000000 })
  },
  methods: {
    ...mapActions(['findBaseChapterPage','findBaseSectionPage', 'findSubjectsData',  'findBaseLevelPage']),
    addLecture(){
      this.$router.push({path:'/main/teach-research/lecture/new'})
    },
    search() {
      this.$refs.pagin.changePage(1)
      this.getChapterList()
    },
    getChapterList(opt){
      this.findBaseChapterPage({...this.form,...opt})
      this.form.pageIndex=opt&&opt.pageIndex||this.form.pageIndex
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.t-form
  table-form()
  margin-top 20px
  margin-bottom 30px
.lecture
  padding-bottom 50px
.line-table
  .icon
    cursor pointer
    font-size 22px
    color #999
    &:hover
       color #01d1bb
</style>


