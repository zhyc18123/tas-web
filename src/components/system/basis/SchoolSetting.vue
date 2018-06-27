 <template>
  <div class="school-setting">
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
              <span v-if="config.school_add" @click="handleAdd(scope.row)">添加</span>
            </div>
            <div v-if="scope.row.addRow" class="btn-add">
              <el-input v-model="newName" placeholder="请输入来源名称"></el-input>
            </div>
            <div v-if="scope.row.isEdit" class="btn-add">
              <el-input v-model="scope.row.name"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            <span v-if="config.school_edit" v-show="!scope.row.add && !scope.row.addRow && !scope.row.isEdit" class="btn-edit" @click="handleEdit(scope)">编辑</span>
            <span v-if="config.school_del" v-show="!scope.row.add && !scope.row.addRow && !scope.row.isEdit" class="btn-delete" @click="handleDelete(scope.row)">删除</span>
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
import { mapState, mapActions,mapGetters } from 'vuex'
export default {
  name: 'school-setting',
  components: {
    VClassCategory
  },
  data() {
    return {
    tableData: [],
      isEdit: false,
      isAdd: false,
      newName: '',
      nexOrderNo: 0,
    }
  },
  computed: {
    ...mapState(['school']),
    ...mapGetters(['config'])
  },
watch: {
  'school.schoolObj'(val){
    console.log("school")
    let data=JSON.parse(JSON.stringify(val.list)) 
        this.nexOrderNo = data.length + 1
        data.map((val) => {
          val.isEdit = false
        })
        data.push({
          add: true
        })
        this.tableData = data
  }
},
  created() {
    this.getSchools()
  },
  methods: {
    ...mapActions(['findBaseSchoolPage']),
    getSchools(){
    this.findBaseSchoolPage({pageIndex:1,pageSize:10000000})
    },
    handleAdd() {
      this.tableData.splice(this.tableData.length - 1, 0, { addRow: true }, )
      this.isAdd = true
    },
    handleEdit(scope) {
      if (this.isAdd) {
        this.handleCancel()
      }
      scope.row.isEdit = true
      this.isEdit = true
      this.tableData=[...this.tableData]
    },
    handleDelete(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        let {data}=await io.post6(io.delSchool,{id:row.id})
        if(data.success){
          this.$message('删除成功！')
          this.getSchools()
        }
      }).catch(() => {
        this.$message('已取消删除');
      });

    },
    async handleSave(row) {
      let datas
      let url
      if (row) {
        datas = {
          schoolName: row.name,
          id:row.id
        }
        if (!row.name) {
          this.$msgbox.alert('名称不能为空')
          return
        }
        url=io.updateSchool
      } else {
        datas = {
          schoolName: this.newName,
        }
        if (!this.newName) {
          this.$msgbox.alert('名称不能为空')
          return
        }
        url=io.addSchool
      }
      if(datas.schoolName.length>40){
        this.$msgbox.alert('名称长度不能超过40字')
        return
      }
      let {data} = await io.post6(url,datas)
      if(data.success){
        this.$message('保存成功！')
        this.handleCancel()
        this.getSchools()
        this.newName = '';
      }
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
.school-setting {
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
.school-setting {
  input {
    min-width: 300px;
  }
}
</style>
