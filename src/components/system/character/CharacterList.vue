<template>
  <div class="character-list">
    <div class="content">
      <el-table :data="characterList" style="width: 100%">
        <el-table-column label="角色名称" align="center">
          <template scope="scope">
            <div v-show="!scope.row.add">{{scope.row.roleName}}</div>
            <div v-show="scope.row.add" class="btn-add">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tianjia"></use>
              </svg>
              <span @click="handleAdd(scope.row)">添加</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template scope="scope">
            <div>{{scope.row.createTime | formatDate}}</div>
          </template>
        </el-table-column>
        <el-table-column label="最后更新时间" align="center">
          <template scope="scope">
            <div>{{scope.row.updateTime | formatDate}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="350" label="操作">
          <template scope="scope">
            <span v-show="!scope.row.add" class="btn-edit" @click="$router.push('/main/system/characterList/permissionSetting?roleName=' +
                  scope.row.roleName + '&optRoleId=' + scope.row.optRoleId)">权限设定</span>
            <span v-show="!scope.row.add" class="btn-edit" @click="$router.push('/main/system/characterList/paradigmSetting?roleName=' +
                  scope.row.roleName + '&optRoleId=' + scope.row.optRoleId)">范式设定</span>
            <span v-show="!scope.row.add" class="btn-edit" @click="handleEdit(scope.row)">修改名称</span>
            <span v-show="!scope.row.add" class="btn-delete" @click="handleDelete(scope.row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <v-pagination :total="character.total|toNumber" @getListResult="getUserList"></v-pagination>
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
      tableData: [],
      pageNo: 1,
      pageSize: 10
    }
  },
  created() {
    this.$store.dispatch('characterList/getCharacterList', { userId: this.$store.state.global.loginInfo.userId, pageNo: this.pageNo, pageSize: this.pageSize });
  },
  computed: {
    ...mapGetters('characterList', [
      'characterList',
      'deleteCharacterSuccess',
      'CharacterListTotal',
      'character'
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
    handleAdd() {
      this.$router.push('/main/system/characterList/add')
    },
    handleEdit(row) {
      this.$router.push('/main/system/characterList/add?optRoleId=' + row.optRoleId + '&roleName=' + row.roleName)
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
    getUserList(option) {
      this.pageNo = option.pageNo;
      this.$store.dispatch('characterList/getCharacterList', { userId: this.$store.state.global.loginInfo.userId, ...option });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.character-list {
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
        width: 65px;
        display: inline-block;
      }
      .btn-add {
        text-align: left;
        cursor: pointer;
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
