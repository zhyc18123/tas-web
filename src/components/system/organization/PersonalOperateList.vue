<template>
  <div class="organization">
    <el-form :inline="true" :model="form" class="t-form gray">
      <el-form-item label="">
        <el-select v-model="form.status" placeholder="合作状态">
          <el-option label="请选择合作状态" value=""></el-option>
          <el-option label="试用期" :value="0"></el-option>
          <el-option label="合约期" :value="1"></el-option>
          <el-option label="终止" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.phoneOrName" placeholder="请输入姓名/手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="search-btn"  @click="search()">查询</el-button>
      </el-form-item>
      <el-form-item class="new-item">
        <el-button v-if="config.personal_add" type="primary" class="new-btn" @click="$router.push('/main/system/personal/list/add')">新建个人合作</el-button>
      </el-form-item>
    </el-form>
    <el-table class="line-table" :data="system.organPerson.list"  style="width: 100%" header-align="center">
        <!-- <el-table-column prop="perNum" label="编号" align="center" >
          <template slot-scope="scope">
            <span v-if="scope.row.perNum">{{scope.row.perNum}}</span>
            <span v-else>-</span>
          </template>
          
        </el-table-column> -->
        <el-table-column prop="perName" label="姓名"  align="center"></el-table-column>
        <el-table-column prop="perPhone"  label="手机号" align="center"> </el-table-column>
        <el-table-column prop="statusStr"  label="合作状态" align="center"> 
        </el-table-column>
        <el-table-column prop="curriculumTime"  label="账号有效期" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.userTimeStart | formatDate }}--{{scope.row.userTimeEnd | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center"> 
          <template slot-scope="scope">
            <router-link v-if="config.personal_edit" :to="'/main/system/personal/list/edit?id='+scope.row.id">
              <!-- <svg class="icon" aria-hidden="true" >
                  <use xlink:href="#icon-xiugaiziliao"></use>
              </svg> -->
              <span class="btn-edit">修改</span>
            </router-link>
          </template>
        </el-table-column>
    </el-table>
    <v-pagination ref="page" class="pag" :total="system.organPerson.total || total" @getListResult="getListResult" :pageSize="pageSize"></v-pagination>
  </div>
</template>
<script>
import VPagination from '../../common/Pagination'
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
  components: {
    VPagination
  },
  data () {
    return {
      total:1,
      pageSize:10,
      pageNo:1,
      form:{
        phoneOrName:'',
        status:'',
      },
      tableData:[
          {
              className:"2018春季物理提高班",
              grade:"初二",
              term:"春季",
              campus:"岗顶校区",
              curriculumTime:"2017-02-12",
              tier:"提高班",
              schoolTime:"8:45 - 9:45",
              week:'周一'
          }
      ],
    }
  },
  created(){
    this.getListResult()
  },
  computed:{
    ...mapState(['system']),
    ...mapGetters(['config'])
  },
  methods: {
    ...mapActions(["findAuthOrganPerson"]),
    search(){
      this.$refs.page.changePage(1)
      this.getListResult({pageIndex:1})
    },
    getListResult(pageInfo){
      if(pageInfo){
        this.pageNo = pageInfo.pageIndex
      }
      let pageIndex = (pageInfo?pageInfo.pageIndex:false) || this.pageNo || 1
      let param = Object.assign({pageIndex:pageIndex,pageSize:this.pageSize}, this.form)
      this.findAuthOrganPerson(param)

    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.organization
  padding-bottom 50px
.t-form
  table-form()
  margin-top 20px
  margin-bottom 30px
  .el-form-item
    // .search-btn
    //   background-color #00b1d1
    //   &:hover{
    //     background-color #0DB9D8
    //     border-color #0DB9D8
    //   }
.line-table
  .icon
    cursor pointer
    font-size 22px
    color #999
    &:hover
       color #01d1bb
  .btn-edit{
    cursor: pointer;
    color: #0084bb;
    padding: 0 5px;
    display: inline-block;
  }
</style>


