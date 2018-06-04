<template>
  <div class="paradigm-setting">
    <div class="">
      <v-character-title icon="icon-xinxi" :name="roleName + '范式设定'">
      </v-character-title>
      <v-class-category @getSubjectId="getSubjectId"></v-class-category>
      <div class="content">
        <el-table :data="tableData" ref="multipleTable" @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="orderNo" label="功能ID" align="center">
          </el-table-column>
          <el-table-column prop="subjectSppName" label="名称" align="center">
          </el-table-column>
        </el-table>
        <el-button @click="handleSave" class="btn-save" type="basis">保存</el-button>
        <el-button @click="$router.go(-1)" class="btn-cancel" type="basis">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import VClassCategory from '../../common/ClassCategory.vue'
// import VCharacterTitle from '../../common/CharacterTitle.vue'
import io from '../../../lib/io'
export default {
  name: 'paradigm-setting',
  components: {
    // VClassCategory,
    // VCharacterTitle
  },
  data() {
    return {
      tableData: [],
      subjectId: '10',
      SppConfigItem: [],
      checkedList: [],
    }
  },
  created() {
    this.roleName = this.$route.query.roleName ? this.$route.query.roleName + ' - ' : ''
    this.optRoleId = this.$route.query.optRoleId || ''
    this.getOptRoleSppList()
  },
  watch: {
    subjectId() {
      this.getOptRoleSppList()
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.SppConfigItem = val;
    },
    handleSave() {
      io.post(io.saveOptRoleSpp, {
        subjectId: this.subjectId,
        optRoleId: this.optRoleId,
        subjectSpps: JSON.stringify(this.SppConfigItem) || '',
      }, () => {
        this.$message('保存成功！')
        this.getOptRoleSppList()
      })
    },
    getOptRoleSppList() {
      let _this = this
      io.post(io.optRoleSppList, {
        subjectId: this.subjectId,
        optRoleId: this.optRoleId,
      }, (data) => {
        _this.checkedList = []
        _this.tableData = data
        setTimeout(function() {
          _this.tableData.map((val, index) => {
            if (val.checked === '1') {
              _this.$refs.multipleTable.toggleRowSelection(_this.tableData[index])
            }
          })
        }, 10)
      })
    },
    getSubjectId(obj) {
      this.subjectId = obj.subjectId
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.paradigm-setting {
  height: 200px;
  background: white;
  .class-category {
    float: left;
    margin-top: 20px;
  }
  .content {
    position: relative;
    text-align: center;
    margin-left: 152px;
    padding: 20px;
    height: 369px;
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
    .btn-save,
    .btn-cancel {
      padding: 10px 33px;
      font-size: 16px;
      margin-top: 96px;
    }
    .btn-cancel {
      margin-left: 26px;
      color: #fff;
      background-color: #0acabf;
      border-color: #0acabf;
    }
    .btn-cancel:hover {
      color: #fff;
      background-color: #13dcd1;
      border-color: #13dcd1;
    }
  }
}
</style>
