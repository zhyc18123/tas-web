<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">订单列表</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form ">

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" class="am-input-lg" name="orderId" v-model="query.orderId" placeholder="请输入订单编号"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success am-btn-lg"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success" @click="$router.push('/main/tradingService/order/add')" v-if="hasPermission('add')"><span  class="am-icon-plus"></span>新增订单</button>
              </div>
            </div>

          </div>

          <div class="am-u-sm-12 am-scrollable-horizontal">
            <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
              <thead>
              <tr>
                <th>操作</th>
                <th>订单编号</th>
                <th>创建时间</th>
                <th>更新时间</th>
                <th>支付状态</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="item in tableData" :key="item.orderId">
                <td>
                  <div class="tpl-table-black-operation">
                    <a href="javascript:;" @click="$router.push('/main/tradingService/order/edit/'+item.categoryId)" v-if="hasPermission('edit')">
                      <i class="am-icon-edit"></i> 编辑
                    </a>
                    <a href="javascript:;" @click="deleteOrder(item)" v-if="hasPermission('delete')">
                      <i class="am-icon-remove"></i>删除
                    </a>
                  </div>
                </td>
                <td>{{item.sn}}</td>
                <td>{{item.createTime}}</td>
                <td>{{item.updateTime}}</td>
                <td>{{item.status}}</td>
              </tr>


              <!-- more data -->
              </tbody>
            </table>
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
        query:{
          orderId:'',
        },
        searchConfig:{}
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
      deleteCategory:function (item) {
        const _this = this ;
        _this.$confirm('你确定要删除？' ,
          function(){
            io.post(io.apiAdminDeleteOrder,{orderId:item.orderId},function(ret){
              if(ret.success){
                _this.$toast('OK')
                _this.loadTableData()
              }else{
                _this.$alert(ret.desc)
              }
            })
          });
      },
      search:function(){
        this.loadTableData()
      },
      loadTableData:function(pageNo){
        var _this = this

        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminOrderList,$.extend({
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
      }
    }
  }
</script>
