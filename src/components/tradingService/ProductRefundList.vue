<template>
  <div class="am-u-sm-12 am-scrollable-horizontal">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">商品产品退费管理</div>
      </div>

      <div class="am-u-sm-12 am-form">
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
          <div class="am-form-group tpl-table-list-select">
            <div class="am-form-group">
              <select2 v-model="formData.type">
                <option value="">所有</option>
                <option value="0">商品退费</option>
                <option value="1">服务退费</option>
                <option value="2">租赁退费</option>
              </select2>
            </div>
          </div>
        </div>

        <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
          <div class="am-form-group">
            <input type="text" class="am-input-lg" name="name" v-model="formData.userName" placeholder="请输入买家姓名"/>
          </div>
        </div>

        <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">

          <div class="am-form-group">
            <button type="button" class="am-btn am-btn-default am-btn-success am-btn-lg"
                    @click="search"><span class="am-icon-search"></span>查询
            </button>
          </div>
        </div>

      </div>

      <div class="widget-body am-fr">
        <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
          <thead>
          <tr>
            <th>序号</th>
            <th>买家姓名</th>
            <th>退货商品名称</th>
            <th>类型</th>
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
            <td>{{item.type==0?'商品':(item.type==1?'服务':'租赁')}}</td>
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
              </div>
            </td>
          </tr>
          </tbody>
        </table>

        <div class="am-g" v-if="tableData==''">
          <div class="am-u-sm-12 am-lg-text-center">暂无数据</div>
        </div>

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
        formData:{
          type:''
        },
        pageSize:5,
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
      this.search(this.pageNo)
      var _this = this
      this.$root.$on('productRefund:new',function () {
        _this.pageNo = 1
        _this.search(_this.pageNo)
      })
    },
    methods: {
      search:function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminProductRefundList,$.extend({
          pageNo:_this.pageNo,
          pageSize:_this.pageSize,
        },_this.formData),function (ret) {
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


