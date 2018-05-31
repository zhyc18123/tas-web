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
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.name" placeholder="请输入素材名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
      <el-form-item class="new-item">
        <el-button type="primary" class="new-btn" @click="addData">新建素材</el-button>
      </el-form-item>
    </el-form>
    <el-table class="line-table" :data="data.dataObj.list" header-align="center">
      <el-table-column prop="name" label="素材名称" align="center"></el-table-column>
      <el-table-column prop="subjectName" label="科目" align="center"></el-table-column>
      <el-table-column prop="sectionNames" label="年级" align="center"> </el-table-column>
      <!--<el-table-column prop="campus"  label="知识点" align="center"> </el-table-column>-->
      <el-table-column prop="leverName" label="班型" align="center"> </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <router-link :to="{path:'/main/teach-research/data/'+scope.row.id}">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bianji"></use>
            </svg>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <v-pagination ref="pagin" class="pag" :total="data.dataObj.total|toNumber" @getListResult="getDataList" :currentPage="form.pageIndex"></v-pagination>
  </div>
</template>
<script>
import VPagination from '../../common/Pagination'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    VPagination
  },
  data() {
    return {
      form: {
        name: '',
        subjectId: null,
        sectionId: null,
        baseLevelId: null,
        pageIndex: 1,
        pageSize: 10
      },
    }
  },
  computed: {
    ...mapState(['data', 'condition']),
  },
  watch: {
    'form.subjectId'(val) {
      this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, subjectId: this.form.subjectId })
    }
  },
  created() {
    this.getDataList()
    this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000, subjectId: this.form.subjectId })
    this.findSubjectsData({ sectionId: this.form.sectionId })
    this.findBaseLevelPage({ pageIndex: 1, pageSize: 1000000 })
  },
  methods: {
    ...mapActions(['findBaseMaterial', 'findBaseSectionPage', 'findSubjectsData', 'findBaseLevelPage']),
    addData() {
      this.$router.push({ path: '/main/teach-research/data/new' })
    },
    search() {
      this.$refs.pagin.changePage(1)
      this.getDataList()
    },
    getDataList(opt) {
      this.findBaseMaterial({ ...this.form, ...opt })
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
.line-table
  .icon
    cursor pointer
    font-size 22px
    color #999
    &:hover
      color #333
</style>


