<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">成本录入</div>
        </div>
        <div class="widget-body  am-fr">


          <div class="am-u-sm-12 am-scrollable-horizontal">
            <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
              <thead>
              <tr>
                <th>主体</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="item in tableData" :key="item.ownerId">
                <td>{{item.name}}</td>
                <td>
                  <div class="tpl-table-black-operation">
                    <a href="javascript:;" @click="$router.push('/main/settlement/fee/list/'+item.ownerId)" v-if="hasPermission('feture')">
                      <i class="am-icon-edit"></i> 录入&查看
                    </a>
                  </div>
                </td>
              </tr>
              <!-- more data -->
              </tbody>
            </table>
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
            io.post(io.apiAdminSettlementAccountMainBodyList,{},function(ret){
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
