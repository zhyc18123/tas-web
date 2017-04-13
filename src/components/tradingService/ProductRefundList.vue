<template>
  <div class="am-u-sm-12 am-scrollable-horizontal">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">商品产品退费管理</div>
      </div>
      <div class="widget-body am-fr">
        <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
          <thead>
          <tr>
            <th>序号</th>
            <th>用户姓名</th>
            <th>商品名称</th>
            <th>商品数量</th>
            <th>退费金额</th>
            <th>退费原因</th>
            <th>审批意见</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="(item,index) in tableData" :key="item.serviceProductRefundId">
            <td>{{index+1}}</td>
            <td>{{item.userName}}</td>
            <td>{{item.productName}}</td>
            <td>{{item.quantity}}</td>
            <td>{{item.price}}</td>
            <td>{{item.reason}}</td>
            <td>{{item.returnResult}}</td>
            <td>{{item.status==0?'处理中':(item.status==1?'已处理':'已拒绝')}}</td>
            <td>
              <div class="tpl-table-black-operation">
                <a href="javascript:;" @click="edit(item.serviceProductRefundId)" v-if="item.status==0">
                  <i class="am-icon-edit"></i> 审批
                </a>
                <span v-else="item.status==0">{{item.status==1?'已处理':'已拒绝'}}</span>
               <!-- <a href="javascript:;" @click="del(item.serviceProductRefundId)">
                  <i class="am-icon-remove"></i> 删除
                </a>-->
              </div>
            </td>
          </tr>
          </tbody>
        </table>

        <window ref="productRefund" title="退费审批">
          <change-product-refund :serviceProductRefundId="serviceProductRefundId" @changeProductRefund="$refs.productRefund.close()"></change-product-refund>
        </window>

        <div class="am-u-lg-12 am-cf">
          <div class="am-fr">
            <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                        @paging="loadTableData"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import Pagination from '../base/Pagination'
  import ProductRefundEditForm from './ProductRefundEditForm'
  export default{
    data: function () {
      return {
        tableData:[],
        pageSize:10,
        pageNo:1,
        total:0,
        serviceProductRefundId:''
      }
    },
    components: {
      Pagination,
      'change-product-refund': ProductRefundEditForm
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo)
      var _this = this
      this.$root.$on('productRefund:new',function () {
        _this.pageNo = 1
        _this.loadTableData(_this.pageNo)
      })
    },
    methods: {
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminProductRefundList,{
          pageNo:_this.pageNo,
          pageSize:_this.pageSize
        },function (ret) {
          if (ret.success){
            _this.tableData = ret.data.list
            _this.total = ret.data.total
          }
        })

      },
      edit: function (serviceProductRefundId) {
        var _this = this
        _this.serviceProductRefundId = serviceProductRefundId
        this.$refs.productRefund.show({
          width:1000,
          height:600
        })
      },
      del: function () {
        var _this = this
        _this.$confirm('删除后无法恢复，你确定要删除吗？',function () {
          //请求数据处理

          _this.$root.$emit('productRefund:new')
        })
      }

    },

  }

</script>


