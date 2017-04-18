<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">成本录入</div>
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
                width="120">
                <template scope="scope">
                  <el-button size="small" @click.native="$router.push('/main/settlement/fee/list/'+scope.row.mainAccountId)">录入&查看</el-button>
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
import ElButton from "../../../node_modules/element-ui/packages/button/src/button";

    export default{
      components: {ElButton}, data:function(){
          return {
            tableData:[]
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
            io.post(io.apiAdminSettlementMainAccountList,{},function(ret){
              if(ret.success){
                _this.tableData = ret.data
              }else{
                _this.$alert(ret.desc)
              }
            })
          }
        }
    }
</script>
