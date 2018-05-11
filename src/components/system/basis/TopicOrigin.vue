 <template>
  <div class="topic-origin">
    <div class="content">
      <span class="direction-icon"></span>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="来源名称" align="center">
          <template scope="scope">
            <div v-show="!scope.row.add && !scope.row.isEdit">{{scope.row.name}}</div>
            <div v-show="scope.row.add" class="btn-add">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tianjia"></use>
              </svg>
              <span @click="handleAdd(scope.row)">添加</span>
            </div>
            <div v-if="scope.row.addRow" class="btn-add">
              <el-input v-model="newName" placeholder="请输入来源名称"></el-input>
            </div>
            <div v-if="scope.row.isEdit" class="btn-add">
              <el-input v-model="scope.row.name"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="适用科目" align="center">
          <template scope="scope">
            <div v-show="!scope.row.add && !scope.row.isEdit">{{scope.row.subjectNames}}</div>
            <div v-if="scope.row.addRow" class="btn-add">
              <el-select v-model="newSubjectsNames" multiple placeholder="适用科目">
                <el-option v-for="(item,i) in subjects" :key="i" :label="item.subjectName" :value="item.subjectName">
                </el-option>
              </el-select>
            </div>
            <div v-if="scope.row.isEdit" class="btn-add">
              <el-select v-model="scope.row.subjectNamesArray" multiple placeholder="适用科目">
                <el-option v-for="(item,i) in subjects" :key="i" :label="item.subjectName" :value="item.subjectName">
                </el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            <span v-show="!scope.row.add && !scope.row.addRow && !scope.row.isEdit" class="btn-edit" @click="handleEdit(scope.row)">编辑</span>
            <span v-show="!scope.row.add && !scope.row.addRow && !scope.row.isEdit" class="btn-delete" @click="handleDelete(scope.row)">删除</span>
            <el-button v-show="scope.row.addRow" class="btn-delete" @click="handleSave()">保存</el-button>
            <el-button v-show="scope.row.addRow" class="btn-delete" @click="handleCancel(scope.row)">取消</el-button>
            <el-button v-show="scope.row.isEdit" class="btn-delete" @click="handleSave(scope.row)">保存</el-button>
            <el-button v-show="scope.row.isEdit" class="btn-delete" @click="scope.row.isEdit = false;getQuestionList()">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

 <script>
import VClassCategory from '../../common/ClassCategory.vue'
import io from '../../../lib/io'
import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
export default {
  name: 'topic-origin',
  components: {
    ElButton,
    VClassCategory
  },
  data() {
    return {
      tableData: [],
      teachSubjectIds: [],
      subjects: [],
      isEdit: false,
      isAdd: false,
      newName: '',
      newSubjectsNames: '',
      nexOrderNo: 0,
    }
  },
  created() {
    this.getOrganizationBaseConfig()
    this.getQuestionList()
  },
  methods: {
    getOrganizationBaseConfig() {
      io.post(io.organizationBaseConfig, {}, (data) => {
        this.subjects = data.subjects
      })
    },
    getQuestionList() {
      io.post(io.questionOriginList, { subjectName: '' }, (data) => {
        this.nexOrderNo = data.length + 1
        data.map((val) => {
          val.isEdit = false
          val.subjectNamesArray = val.subjectNames.split(',')
        })
        data.push({
          add: true
        })
        this.tableData = data
      })
    },
    handleAdd() {
      this.tableData.splice(this.tableData.length - 1, 0, { addRow: true }, )
      this.isAdd = true
    },
    handleEdit(row) {
      if (this.isAdd) {
        this.handleCancel()
      }
      row.isEdit = true
      this.isEdit = true
    },
    handleDelete(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        io.post(io.deleteQuestionOrigin, {
          questionOriginId: row.questionOriginId
        }, () => {
          this.$message('删除成功！')
          this.getQuestionList()
        })
      }).catch(() => {
        this.$message('已取消删除');
      });

    },
    handleSave(row) {
      let data
      if (row) {
        data = {
          name: row.name,
          orderNo: row.orderNo,
          questionOriginId: row.questionOriginId,
          subjectNames: row.subjectNamesArray.join(',')
        }
        if (!row.name) {
          this.$msgbox.alert('名称不能为空')
          return
        }
        if (row.subjectNamesArray.length === 0) {
          this.$msgbox.alert('请至少选择一种科目')
          return
        }
      } else {
        data = {
          name: this.newName,
          orderNo: this.nexOrderNo,
          subjectNames: this.newSubjectsNames.join(',')
        }
        if (!this.newName) {
          this.$msgbox.alert('名称不能为空')
          return
        }
        if (this.newSubjectsNames.length === 0) {
          this.$msgbox.alert('请至少选择一种科目')
          return
        }
      }
      io.post(io.saveQuestionOriginName, data, (data) => {
        this.$message('保存成功！')
        this.handleCancel()
        this.getQuestionList()
        this.newName = '';
        this.nexOrderNo = '';
        this.newSubjectsNames = '';
      })
    },
    handleCancel(row) {
      this.tableData.splice(this.tableData.length - 2, 1)
      this.isAdd = false;
    }
  },
}
</script>

 <!-- Add "scoped" attribute to limit CSS to this component only -->
 <style lang="less" scoped>
.topic-origin {
  margin-top: 15px;
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
        padding: 10px 0;
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
    .direction-icon {
      position: absolute;
      top: -10px;
      z-index: 3;
      left: 65px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 6px 10px 6px;
      border-color: transparent transparent #bbdde7 transparent;
      &::before {
        position: absolute;
        content: "";
        top: 1px;
        left: -9px;
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 0px 9px 17px;
        border-color: transparent transparent #dff1f6;
      }
    }
  }
}
</style>

 <style lang="less">
.topic-origin {
  input {
    min-width: 300px;
  }
}
</style>
