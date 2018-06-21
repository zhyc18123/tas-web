<template>
  <div class="user-list">
    <div class="content">
      <el-form :inline="true" :model="form" class="t-form gray t-class-list">
          <el-form-item label="">
                <el-select v-model="form.status" placeholder="账号状态">
                    <el-option v-for="item in accountStatus" :label="item.label" :value="item.value" :key="item.value"></el-option>
                </el-select>
            </el-form-item>
          <el-form-item>
              <el-input v-model="form.keyword" placeholder="请输入用户姓名/账号"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="handleSearch" class="search-btn">查询</el-button>
          </el-form-item>
          <el-form-item class="new-item">
              <el-button type="primary" class="new-btn" @click="handleAdd">新增账号</el-button>
          </el-form-item>
      </el-form>
      <el-table :data="userList" style="width: 100%" class="line-table">
        <el-table-column prop="username" label="用户姓名"   align="center" width="160">
        </el-table-column>
        <el-table-column prop="account"  label="帐号" align="center" width="160">
        </el-table-column>
        <el-table-column label="帐号状态"  align="center" width="100" >
          <template slot-scope="scope">
            <div v-if="scope.row.status === 0">已失效</div>
            <div v-if="scope.row.status === 1">正常</div>
          </template>
        </el-table-column>
        <el-table-column prop="orgName" label="账号所属" width="180" align="center">
        </el-table-column>
        <el-table-column prop="level" label="账号到期时间" width="180" align="center">
          <template slot-scope="scope">
           <div>{{scope.row.endTime | formatTime}}</div>
          </template>
        </el-table-column>
        <el-table-column min-width="180" label="创建时间" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.createTime | formatTime}}</div>
          </template>
        </el-table-column>
        <el-table-column min-width="180" label="最后编辑时间" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.updateTime | formatTime}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center"  width="230" label="操作">
          <template slot-scope="scope">
            <span  class="btn-delete" @click="handleEdit(scope.row)">修改</span>
            <span  class="btn-delete" @click="handleDetails(scope.row)">详情</span>
          </template>
        </el-table-column>
      </el-table>
      <v-pagination :total="userListTotal" @getListResult="getUserList" :page-size="pageSize" ref="page"></v-pagination>
    </div>
  </div>
</template>

<script>
import io from '../../../lib/io'
import md5 from 'js-md5'
import storage from '../../../lib/storage/index'

// import VClassCategory from '../../common/ClassCategory.vue'
import VPagination from '../../common/Pagination.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'user-list',
  components: {
    // VClassCategory,
    VPagination
  },

  data() {
    return {
      accountStatus:[
        {label:"请选择账号状态",value:''},
        {label:"已失效",value:0},
        {label:"正常",value:1},
      ],
      userListTotal:1,
      pageNo:1,
      pageSize:10,
      userList:[],
      loginInfo:storage.getCurrentUserInfo(),
      form:{
        status:'',
        keyword:''
      }
    }
  },
  created() {
    this.getUserList()
  },
  computed: {

  },
  watch: {
    deleteUserSuccess(newValue) {
      if (newValue) {
        this.$message('删除成功！')
      }
    }
  },
  methods: {
    // ...mapActions('userList',[
    //   'getUserList',
    // ]),
    getUserList(pageInfo){
      let pageIndex = (pageInfo?pageInfo.pageIndex:false) || this.pageNo || 1
      let param = {
        pageIndex:pageIndex,
        pageSize:this.pageSize,
        status:this.form.status,
        keyword:this.form.keyword,
      }
      console.log('logininfo',this.loginInfo)
      if(this.loginInfo.isSystem){
          io.post(io.findSysAuthUserPage,param,(ret)=>{
            this.userListTotal = ret.total
            this.userList = ret.list
            console.log(ret)
          })
      }else{
          io.post(io.findAuthUserPage,param,(ret)=>{
            this.userListTotal = ret.total
            this.userList = ret.list
            console.log(ret)
          })
      }
      
    },
    handleAdd() {
      this.$router.push('/main/system/userList/userAdd')
    },
    handleReset(){

    },
    handleEdit(row) {
      console.log(row)
      this.$router.push('/main/system/userList/userAdd?userId=' + row.id)
    },
    handleModification(row) {
      
    },
    handleSearch(){
      this.$refs.page.changePage(1)
      this.getUserList({pageIndex:1})
    },
    handleDetails(row){
      this.$router.push('/main/system/userList/userDetail?userId=' + row.id)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.t-form
    table-form()
    margin-top 20px
    margin-bottom 30px
    .el-form-item
      .search-btn
        background-color #009ada
    
.user-list {
  margin-top: 20px;
  background: white;
  .content {
    position: relative;
    padding-bottom 50px
    // text-align: center;
    .el-table {
      .btn-edit,
      .btn-delete {
        cursor: pointer;
        color: #0084bb;
        padding: 0 5px;
        display: inline-block;
      }
      .btn-add {
        text-align: left;
        cursor: pointer;
        width: 150px;
        span {
          color: #0066d9;
          text-decoration: underline;
          font-size: 12px;
        }
        svg {
          fill: #00b1d1;
          font-size: 16px;
          vertical-align: -0.25em;
        }
      }
    }
  }
}
</style>
