<template>
  <div class="character-list">
    
    <div class="content">
      <el-form :inline="true" :model="form" class="t-form gray t-class-list">
          <el-form-item class="new-item">
              <el-button v-if="config.opt_role_add" type="primary" class="new-btn" @click="handleAdd">新增角色</el-button>
          </el-form-item>
      </el-form>
      <el-table :data="characterList" style="width: 100%" class="line-table">
        <el-table-column label="角色名称" align="center" prop="roleName">

        </el-table-column>
        <el-table-column label="角色所属" align="center">
          <template scope="scope">
            <span>{{scope.row.systemType===0?"系统":'机构/个人'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template scope="scope">
            <div>{{scope.row.createTime | formatDate}}</div>
          </template>
        </el-table-column>
        <el-table-column label="最后更新时间" align="center">
          <template scope="scope">
            <div>{{scope.row.updateTime | formatTime}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="250" label="操作">
          <template scope="scope">
            <span v-if="config.auth_setting" v-show="!scope.row.add" class="btn-handle" @click="$router.push('/main/system/characterList/permissionSetting?roleName=' +
                  scope.row.roleName + '&optRoleId=' + scope.row.id)">权限设定</span> 
            <span v-if="config.opt_role_edit" class="btn-handle" @click="handleEdit(scope.row)">修改名称</span>
            <!-- <span v-show="!scope.row.add" class="btn-edit" @click="$router.push('/main/system/characterList/permissionSetting?roleName=' +
                  scope.row.roleName + '&optRoleId=' + scope.row.optRoleId)">权限设定</span>
            <span v-show="!scope.row.add" class="btn-edit" @click="$router.push('/main/system/characterList/paradigmSetting?roleName=' +
                  scope.row.roleName + '&optRoleId=' + scope.row.optRoleId)">范式设定</span>
            <span v-show="!scope.row.add" class="btn-edit" @click="handleEdit(scope.row)">修改名称</span>
            <span v-show="!scope.row.add" class="btn-delete" @click="handleDelete(scope.row)">删除</span> -->
          </template>
        </el-table-column>
      </el-table>
      <v-pagination :total="total" @getListResult="getUserList" :pageSize="pageSize" ref="page"></v-pagination>
    </div>
  </div>
</template>

<script>
// import VClassCategory from '../../common/ClassCategory.vue'
import VPagination from '../../common/Pagination.vue'
import io from '../../../lib/io'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'character-list',
  components: {
    // VClassCategory,
    VPagination
  },
  data() {
    return {
      
      total: 0,
      characterList: [],
      pageNo: 1,
      pageSize: 10,
      roleName:'',
      form:{}
    }
  },
  created() {
    this.getUserList()
  },
  computed: {
    ...mapGetters(['config'])
    // ...mapGetters('characterList', [
    //   'characterList',
    //   'deleteCharacterSuccess',
    //   'CharacterListTotal',
    //   'character'
    // ]),
  },
  watch: {
    // deleteUserSuccess(newValue) {
    //   if (newValue) {
    //     this.$message('删除成功！')
    //   }
    // }
  },
  methods: {
    handleAdd() {
      this.$router.push('/main/system/characterList/add')
    },
    handleEdit(row) {
      console.log(row)
      this.$router.push('/main/system/characterList/add?id=' + row.id + "&roleName="+ row.roleName+"&systemType="+row.systemType)
    },
    handleDelete(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        io.post(io.delOptRole, {
          optRoleId: row.optRoleId
        }, () => {
          this.$message('删除成功！')
          this.$store.dispatch('characterList/getCharacterList', { userId: this.$store.state.global.loginInfo.userId, pageNo: this.pageNo, pageSize: this.pageSize });
        })
      }).catch(() => {
        this.$message('已取消删除');
      });
    },
    // 查询列表
    getUserList(pageInfo) {
      let pageNo = (pageInfo?pageInfo.pageIndex:false) || this.pageNo || 1
      let param = {
        pageIndex:pageNo,
        pageSize:this.pageSize,
        roleName:this.roleName
      }
      io.post(io.findAuthRolePag,param,(ret)=>{
        this.total = ret.total
        this.characterList = ret.list
        console.log(ret)
      })
      // this.$store.dispatch('characterList/getCharacterList', { userId: this.$store.state.global.loginInfo.userId, ...option });
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
    min-height 36px
    .el-form-item
      .search-btn
        background-color #009ada
    .el-form-item.new-item
      top 10px
.character-list {
  margin-top: 20px;
  // height: 200px;
  background: white;
  .class-category {
    float: left;
  }
  .content {
    position: relative;
    text-align: center;
    padding-bottom 50px
    .el-table {
      .btn-handle{
        cursor: pointer;
        color:#0084bb;
        padding:0 5px;
      }
      // .btn-edit,
      // .btn-delete {
      //   cursor: pointer;
      //   color: #0084bb;
      //   width: 65px;
      //   display: inline-block;
      // }
      // .btn-add {
      //   text-align: left;
      //   cursor: pointer;
      //   span {
      //     color: #0066d9;
      //     text-decoration: underline;
      //     font-size: 12px;
      //   }
      //   svg {
      //     fill: #00b1d1;
      //     font-size: 16px;
      //     vertical-align: -0.25em;
      //   }
      // }
    }
  }
}
</style>
