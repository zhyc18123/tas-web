 <template>
  <div class="class-setting">
    <div class="content">
      <span class="direction-icon"></span>
      <el-table :data="tableData.list" style="width: 100%">
        <el-table-column label="班型名称" align="center">
          <template scope="scope">
            <div v-show="!scope.row.add && !scope.row.isEdit">{{scope.row.name}}</div>
            <div v-show="scope.row.add" class="btn-add">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tianjia"></use>
              </svg>
              <span v-if="config.level_add" @click="handleAdd(scope.row)">添加</span>
            </div>
            <div v-if="scope.row.addRow" class="btn-add">
              <el-input v-model="newName" placeholder="请输入班型名称"></el-input>
            </div>
            <div v-if="scope.row.isEdit" class="btn-add">
              <el-input v-model="scope.row.name"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            <span v-if="config.level_edit" v-show="!scope.row.add && !scope.row.addRow && !scope.row.isEdit" class="btn-edit" @click="handleEdit(scope)">编辑</span>
            <span v-if="config.level_del&&scope.row.isStandard!==1" v-show="!scope.row.add && !scope.row.addRow && !scope.row.isEdit" class="btn-delete" @click="handleDelete(scope.row)">删除</span>
            <el-button v-show="scope.row.addRow" class="btn-delete" @click="handleSave()">保存</el-button>
            <el-button v-show="scope.row.addRow" class="btn-delete" @click="handleCancel(scope.row)">取消</el-button>
            <el-button v-show="scope.row.isEdit" class="btn-delete" @click="handleSave(scope.row)">保存</el-button>
            <el-button v-show="scope.row.isEdit" class="btn-delete" @click="scope.row.isEdit = false;getClass()">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    <v-pagination ref="pagin" class="pag" :total="tableData.total|toNumber" @getListResult="getClass" :currentPage="form.pageIndex"></v-pagination>
    </div>
  </div>
</template>

 <script>
import VClassCategory from '../../common/ClassCategory.vue'
import VPagination from "../../common/Pagination"
import io from '../../../lib/io'
import { mapState, mapActions,mapGetters } from 'vuex'
export default {
  name: 'school-setting',
  components: {
    VClassCategory,
    VPagination
  },
  data() {
    return {
    tableData: [],
      isEdit: false,
      isAdd: false,
      newName: '',
      nexOrderNo: 0,
      form:{
          pageIndex:1,
          pageSize:10
      }
    }
  },
  computed: {
    ...mapState(['school','condition']),
    ...mapGetters(['config'])
  },
watch: {
  'condition.levelObj'(val){
    let data=JSON.parse(JSON.stringify(val)) 
        this.nexOrderNo = data.list.length + 1
        data.list&&data.list.map((val) => {
          val.isEdit = false
        })
        data.list.push({
          add: true
        })
        this.tableData = data
  }
},
  created() {
    this.getClass()
  },
  methods: {
    ...mapActions(['findBaseLevelPage']),
    getClass(opt){
    this.findBaseLevelPage({...this.form,...opt})
    },
    handleAdd() {
      this.tableData.list&&this.tableData.list.splice(this.tableData.list.length - 1, 0, { addRow: true }, )
      this.isAdd = true
    },
    handleEdit(scope) {
      if (this.isAdd) {
        this.handleCancel()
      }
      scope.row.isEdit = true
      this.isEdit = true
      this.tableData.list=[...this.tableData.list]
    },
    handleDelete(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        let {data}=await io.post6(io.delLevel,{id:row.id})
        if(data.success){
          this.$message({
            type:'success',
            message:'删除成功！'})
          this.getClass()
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
          name: row.name,
          id:row.id
        }
        if (!row.name) {
          this.$msgbox.alert('名称不能为空')
          return
        }
        url=io.updateLevel
      } else {
        datas = {
          name: this.newName,
        }
        if (!this.newName) {
          this.$msgbox.alert('名称不能为空')
          return
        }
        url=io.addLevel
      }
      if(datas.name.length>40){
        this.$msgbox.alert('名称长度不能超过40字')
        return
      }
      let {data} = await io.post6(url,datas)
      if(data.success){
        this.$message({type:"success",message:'保存成功！'})
        this.handleCancel()
        this.getClass()
        this.newName = '';
      }
    },
    handleCancel(row) {
      this.tableData.list&&this.tableData.list.splice(this.tableData.list.length - 2, 1)
      this.isAdd = false;
    }
  },
}
</script>

 <!-- Add "scoped" attribute to limit CSS to this component only -->
 <style lang="less" scoped>
.class-setting {
  margin-top: 15px;
  // height: 200px;
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
        padding: 9px 0;
        border-color:#0084bb;
      }
      .el-button{
        margin-right:10px;
      }
      .el-button+.el-button{
        margin-left:0px;
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
