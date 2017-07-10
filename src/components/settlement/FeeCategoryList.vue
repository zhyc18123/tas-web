<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">成本类型</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">
            <div class="am-form-group">
              <div class="am-btn-toolbar">
                <div class="am-btn-group am-btn-group-xs">
                  <button type="button" class="am-btn am-btn-default am-btn-success"
                          @click="$router.push('/main/settlement/feeCategory/add')" v-if="hasPermission('add')"><span
                    class="am-icon-plus"></span>新增
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                prop="name"
                label="名称"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="是否内置"
                min-width="100">
                <template scope="scope">
                  {{scope.row.isBuildIn == 0 ? '否' : '是' }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="操作"
                width="150">
                <template scope="scope">
                  <el-button size="small" :disabled="scope.row.isBuildIn == 1" @click.native="$router.push('/main/settlement/feeCategory/edit/'+scope.row.feeCategoryId)" v-if="hasPermission('edit')">编辑</el-button>
                  <el-button size="small" :disabled="scope.row.isBuildIn == 1" @click.native="del(scope.row.feeCategoryId)" v-if="hasPermission('del')">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="am-u-lg-12 am-cf">

            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData" />
            </div>
          </div>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data:function(){
      return {
        tableData:[],
        total:0,
        pageSize:10,
        pageNo:1,
        query:{}
      }
    },
    components: {
      Pagination
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      this.loadTableData(this.pageNo);
    },
    methods:{
      loadTableData:function(pageNo){
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminSettlementFeeCategoryList,$.extend({
          pageNo:_this.pageNo,
          pageSize:_this.pageSize
        },_this.query),function(ret){
          if(ret.success){
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      del:function(feeCategoryId){
        var _this  = this
        io.post(io.apiAdminSettlementDeleteFeeCategory,{
            feeCategoryId : feeCategoryId
        },function(ret){
          if(ret.success){
            _this.loadTableData()
            _this.$alert('删除成功')
          }else{
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>
