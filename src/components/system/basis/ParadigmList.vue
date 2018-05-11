<template>
  <div class="paradigm-list">
    <v-class-category @getSubjectId="getSubjectId"></v-class-category>
    <div class="content">
      <span class="direction-icon"></span>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" align="center">
          <template scope="scope">
            <div v-show="!scope.row.add">{{scope.row.orderNo}}</div>
            <div v-show="scope.row.add" class="btn-add">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tianjia"></use>
              </svg>
              <span @click="handleAdd(scope.row)">添加</span>
            </div>
            <div v-if="scope.row.addRow">
              {{nexOrderNo}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template scope="scope">
            <div v-show="!scope.row.add && !scope.row.isEdit">{{scope.row.subjectSppName}}</div>
            <div v-if="scope.row.addRow" class="btn-add">
              <el-input @keyup.native.enter="handleSave" placeholder="请输入范式名称" v-model="newName"></el-input>
            </div>
            <div v-if="scope.row.isEdit" class="btn-add">
              <el-input @keyup.native.enter="handleSave" v-model="scope.row.subjectSppName"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            <span v-show="!scope.row.add && !scope.row.addRow && !scope.row.isEdit" class="btn-edit" @click="handleEdit(scope.row)">编辑</span>
            <span v-show="!scope.row.add && !scope.row.addRow && !scope.row.isEdit" class="btn-delete" @click="handleDelete(scope.row)">删除</span>
            <span v-show="!scope.row.add && !scope.row.addRow && !scope.row.isEdit" class="btn-edit" @click="moveSpp(scope.row,scope.$index,'up')">上移</span>
            <span v-show="!scope.row.add && !scope.row.addRow && !scope.row.isEdit" class="btn-edit" @click="moveSpp(scope.row,scope.$index,'down')">下移</span>

            <el-button v-show="scope.row.addRow" class="btn-delete" @click="handleSave()">保存</el-button>
            <el-button v-show="scope.row.addRow" class="btn-delete" @click="handleCancel(scope.row)">取消</el-button>
            <el-button v-show="scope.row.isEdit" class="btn-delete" @click="handleSave(scope.row)">保存</el-button>
            <el-button v-show="scope.row.isEdit" class="btn-delete" @click="scope.row.isEdit = false;getSppConfigOfSubject();">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import VClassCategory from '../../common/ClassCategory.vue'
import io from '../../../lib/io'
export default {
  name: 'paradigm-list',
  components: {
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
    this.getSppConfigOfSubject()
  },
  watch: {
    subjectId() {
      this.getSppConfigOfSubject()
    }
  },
  methods: {
    getSppConfigOfSubject() {
      io.post(io.sppOfSubject, { subjectId: this.subjectId }, (data) => {
        this.nexOrderNo = data.length + 1
        data.map((val) => {
          val.isEdit = false
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
    moveSpp(row,index,type){
      let toSppId;
      if(type==='up'){
        if(index===0){
        this.$message('第一个不能上移！');
        return;
        }else{
          toSppId=this.tableData[index-1].subjectSppId;
        }
      }else{
        console.log(index,this.tableData)
        if(index===this.tableData.length-2){
        this.$message('最后一个不能下移！');
        return;
        }else{
          toSppId=this.tableData[index+1].subjectSppId
        }
      };
      io.post(io.moveSubjectSpp, {
        subjectSppId:row.subjectSppId,
        toSubjectSppId:toSppId
      }, (data) => {
        this.$message('移动成功！');
        this.getSppConfigOfSubject();
      })
    },
    handleDelete(row) {

      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      io.post(io.deleteSubjectSpp, {
        subjectId:row.subjectId,
        subjectSppId:row.subjectSppId
      }, (data) => {
        this.$message('删除成功！');
        this.getSppConfigOfSubject();
      })
      }).catch(() => {
        this.$message('已取消删除');
      });
      
    },
    handleSave(row) {
      // let data,
      //   copyTableData = []
      // this.tableData.map((val) => {
      //   if (val.name) {
      //     copyTableData.push({
      //       name: val.name,
      //       orderNo: val.orderNo
      //     })
      //   }
      // })
      // if (this.isAdd) {
      //   copyTableData.push({
      //     name: this.newName,
      //     orderNo: this.nexOrderNo
      //   })
      // }
      console.log(this.newName)
      let data = {
        subjectId: this.subjectId,
        subjectSppId:row&&row.subjectSppId||'',
        subjectSppName: row&&row.subjectSppName||this.newName
      }
      io.post(io.saveOrUpdateSubjectSpp, data, (data) => {
        this.$message('保存成功！')
        this.handleCancel()
        this.isEdit = false
        this.getSppConfigOfSubject()
      })
    },
    handleCancel(row) {
      this.tableData.splice(this.tableData.length - 2, 1)
      this.isAdd = false;
      console.log("dfs")
      this.getSppConfigOfSubject();
    },
    getSubjectId(obj) {
      this.subjectId = obj.subjectId
      this.isAdd = false;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.paradigm-list {
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
      left: 730px;
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
.paradigm-list {
  input {
    min-width: 300px;
  }
}
</style>
