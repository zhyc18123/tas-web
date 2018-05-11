<template>
  <div class="topic-character">
    <v-class-category @getSubjectId="getSubjectId"></v-class-category>
    <div class="content">
      <span class="direction-icon"></span>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="类别名称" align="center">
          <template scope="scope">
            <div v-show="!scope.row.add && !scope.row.isEdit">{{scope.row.name}}</div>
            <div v-show="scope.row.add" class="btn-add">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tianjia"></use>
              </svg>
              <span @click="handleAdd(scope.row)">添加</span>
            </div>
            <div v-if="scope.row.addRow" class="btn-add">
              <el-input v-model="newName" placeholder="请输入类别名称"></el-input>
            </div>
            <div v-if="scope.row.isEdit" class="btn-add">
              <el-input v-model="scope.row.name"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="映射题型" align="center">
          <template scope="scope">
            <div v-show="!scope.row.add && !scope.row.isEdit">{{scope.row.sysSubjectName}}</div>
            <div v-if="scope.row.addRow" class="btn-add">
              <el-select v-model="newSysSubjectType" placeholder="映射题型">
                <el-option v-for="(item,i) in sysTopic" :key="i" :label="item.name" :value="item.sysSubjectType">
                </el-option>
              </el-select>
            </div>
            <div v-if="scope.row.isEdit" class="btn-add">
              <el-select v-model="scope.row.sysSubjectType" placeholder="映射题型">
                <el-option v-for="(item,i) in sysTopic" :key="i" :label="item.name" :value="item.sysSubjectType">
                </el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            <span v-show="!scope.row.add && !scope.row.addRow && !scope.row.isEdit" class="btn-edit" @click="handleEdit(scope.row)">编辑</span>
            <span v-show="false&&!scope.row.add && !scope.row.addRow && !scope.row.isEdit" class="btn-delete" @click="handleDelete(scope.row)">删除</span>
            <el-button v-show="scope.row.addRow" class="btn-delete" @click="handleSave()">保存</el-button>
            <el-button v-show="scope.row.addRow" class="btn-delete" @click="handleCancel(scope.row)">取消</el-button>
            <el-button v-show="scope.row.isEdit" class="btn-delete" @click="handleSave(scope.row)">保存</el-button>
            <el-button v-show="scope.row.isEdit" class="btn-delete" @click="scope.row.isEdit = false;getQuestionTypeOfSubjectList()">取消</el-button>
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
  name: 'topic-character',
  components: {
    ElButton,
    VClassCategory
  },
  data() {
    return {
      tableData: [],
      teachSubjectIds: [],
      subjectId: '10',
      sysTopic: [{
        sysSubjectType: 0,
        name: '选择题'
      }, {
        sysSubjectType: 1,
        name: '填空题'
      }, {
        sysSubjectType: 2,
        name: '综合题'
      }],
      isEdit: false,
      isAdd: false,
      newName: '',
      newSysSubjectType: '',
      nexOrderNo: 0,
    }
  },
  created() {
    this.getQuestionTypeOfSubjectList()
  },
  watch: {
    subjectId() {
      this.getQuestionTypeOfSubjectList()
    }
  },
  methods: {
    getQuestionTypeOfSubjectList() {
      io.post(io.questionTypeOfSubjectList, { subjectId: this.subjectId }, (data) => {
        this.nexOrderNo = data.length + 1
        data.map((val) => {
          val.isEdit = false
          val.sysSubjectType = parseInt(val.sysSubjectType)
          val.sysSubjectName = this.sysTopic[parseInt(val.sysSubjectType)].name
        })
        data.push({
          add: true
        })
        this.tableData = data
        this.newName = ''
        this.newSysSubjectType = ''
      })
    },
    handleAdd() {
      if (!this.isAdd) {
        this.tableData.splice(this.tableData.length - 1, 0, { addRow: true }, )
        this.isAdd = true
      }
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
        io.post(io.deleteSubjectQuestionType, { subjectQuestionTypeId: row.questionTypeId }, () => {
          this.$message('删除成功！');
          this.getQuestionTypeOfSubjectList();
        })
      }).catch(() => {
        this.$message('已取消删除');
      });

    },
    handleSave(row) {
      var data, name, sysSubjectType;
      console.log('row',row)
      if (this.isEdit) {
        data = {
          name: row.name,
          orderNo: row.orderNo,
          subjectId: this.subjectId,
          subjectQuestionTypeId: row.questionTypeId,
          sysSubjectType: row.sysSubjectType
        }
        name = row.name
        sysSubjectType = row.sysSubjectType
      } else if (this.isAdd) {
        data = {
          name: this.newName,
          orderNo: this.nexOrderNo,
          subjectId: this.subjectId,
          sysSubjectType: this.newSysSubjectType
        }
        name = this.newName
        sysSubjectType = this.sysSubjectType
      }

      if (!name) {
        this.$msgbox.alert('名称不能为空')
        return
      }
      if(data.name.length>50){
        this.$msgbox.alert('类别名称不能超过50字')
        return;
      }
      if (data.sysSubjectType==='') {
        this.$msgbox.alert('请选择映射题型')
        return
      }
      io.post(io.saveSubjectQuestionType, data, (data) => {
        this.$message('保存成功！')
        this.handleCancel()
        this.isEdit = false
        this.getQuestionTypeOfSubjectList()
      })
    },
    handleCancel(row) {
      this.tableData.splice(this.tableData.length - 2, 1)
      this.isAdd = false
    },
    getSubjectId(obj) {
      this.subjectId = obj.subjectId
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.topic-character {
  margin-top: 15px;
  height: 200px;
  background: white;
  .class-category {
    float: left;
    border-right: none;
  }
  .content {
    position: relative;
    text-align: center;
    margin-left: 152px;
    padding: 20px;
    border: 1px solid #bbdde7;
    min-height: 469px;
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
      left: 380px;
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
        border-color: transparent transparent rgb(255, 255, 255);
      }
    }
  }
}
</style>

<style lang="less">
.topic-character {
  input {
    min-width: 300px;
  }
}
</style>
