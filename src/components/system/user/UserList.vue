<template>
  <div class="user-list">
    <div class="content">
      <el-table :data="userList" style="width: 100%">
        <el-table-column label="姓名" fixed width="100" align="center">
          <template scope="scope">
            <div v-show="!scope.row.add">{{scope.row.name}}</div>
            <div v-show="scope.row.add" class="btn-add">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tianjia"></use>
              </svg>
              <span @click="handleAdd(scope.row)">添加帐号</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="username" fixed width="100" label="登录帐号">
        </el-table-column>
        <el-table-column label="帐号状态" width="150" align="center">
          <template scope="scope">
            <div v-if="scope.row.status === '0'">禁用</div>
            <div v-if="scope.row.status === '1'">正常</div>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="级别" width="150" align="center">
          <template scope="scope">
            <div v-if="scope.row.level === '0'">初级教研员</div>
            <div v-if="scope.row.level === '1'">中级教研员</div>
            <div v-if="scope.row.level === '2'">高级教研员</div>
            <div v-if="scope.row.level === '3'">资深教研员</div>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" width="200" label="角色" align="center">
        </el-table-column>
        <el-table-column prop="idNo" width="200" label="身份证号码" align="center">
        </el-table-column>
        <el-table-column prop="phoneNo" width="150" label="电话号码" align="center">
        </el-table-column>
        <el-table-column prop="teachGradeNames" label="任教年级" width="150" align="center">
        </el-table-column>
        <el-table-column prop="teachSubjectNames" label="任教科目" width="150" align="center">
        </el-table-column>
        <el-table-column label="任职性质" width="150" align="center">
          <template scope="scope">
            <div v-if="scope.row.jobNature === '0'">普通</div>
            <div v-if="scope.row.jobNature === '1'">指导</div>
          </template>
        </el-table-column>
        <el-table-column label="在职状态" width="150" align="center">
          <template scope="scope">
            <div v-if="scope.row.jobStatus === '0'">离职</div>
            <div v-if="scope.row.jobStatus === '1'">在职</div>
          </template>
        </el-table-column>
        <el-table-column width="150" label="开通时间" align="center">
          <template scope="scope">
            <div>{{scope.row.createTime | formatDate}}</div>
          </template>
        </el-table-column>
        <el-table-column width="150" label="最后登录时间" align="center">
          <template scope="scope">
            <div>{{scope.row.updateTime | formatDate}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" width="160" label="操作">
          <template scope="scope">
            <span v-show="!scope.row.add" class="btn-edit" @click="handleEdit(scope.row)">修改</span>
            <span v-show="!scope.row.add" class="btn-delete" @click="handleDelete(scope.row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <v-pagination :total="userListTotal" @getListResult="getUserList"></v-pagination>
    </div>
  </div>
</template>

<script>
import VClassCategory from '../../common/ClassCategory.vue'
import VPagination from '../../common/Pagination.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'user-list',
  components: {
    VClassCategory,
    VPagination
  },
  created() {
    this.$store.dispatch('userList/getUserList', {
      pageNo: 1,
      pageSize: 10
    });
  },
  data() {
    return {
      //        module:this.$store.state.questionBank,
    }
  },
  computed: {
    ...mapGetters('userList', [
      'userList',
      'deleteUserSuccess',
      'userListTotal',
    ]),
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
    handleAdd() {
      this.$router.push('/main/system/userList/userAdd')
    },
    handleEdit(row) {
      this.$router.push('/main/system/userList/userAdd?userId=' + row.userId)
    },
    handleDelete(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('userList/deleteUser', { userId: row.userId })
      }).catch(() => {
        this.$message('已取消删除');
      });

    },
    getUserList(opt) {
      this.$store.dispatch('userList/getUserList', opt);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.user-list {
  margin-top: 20px;
  height: 200px;
  background: white;
  .class-category {
    float: left;
  }
  .content {
    position: relative;
    text-align: center;
    .el-table {
      .btn-edit,
      .btn-delete {
        cursor: pointer;
        color: #0084bb;
        width: 55px;
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
