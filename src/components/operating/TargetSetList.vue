<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">目标设置</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                prop="name"
                label="主体"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="操作"
                width="300">
                <template scope="scope">
                  <el-button size="small" @click.native="$router.push('/main/operating/targetSet/inputMainIncome?areaTeamId=' +
                   scope.row.areaTeamId + '&areaTeamName=' + scope.row.name)">录入主体收入目标</el-button>
                  <el-button size="small" @click.native="$router.push('/main/operating/targetSet/inputProductIncome?areaTeamId=' +
                   scope.row.areaTeamId + '&areaTeamName=' + scope.row.name)">录入产品线收入目标</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import io from '../../lib/io'
  export default{
    data:function(){
      return {
        tableData:[],
        pageSize: 40,
        pageNo: 1,
        query: {},
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      this.loadTableData();
    },
    methods:{
      loadTableData:function(){
        var _this = this
        io.post(io.apiAdminAreaTeamList,$.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query),function(ret){
          if(ret.success){
            _this.tableData = ret.data.list
          }else{
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>
