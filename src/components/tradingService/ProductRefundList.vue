<template>
  <div class="am-u-sm-12 am-scrollable-horizontal">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-cf">商品产品退费管理</div>
      </div>
      <div class="widget-body  am-fr">
        <div class="am-u-sm-12 am-form">
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-lg-offset-6">
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
            <div class="am-input-group am-input-group-lg tpl-form-border-form cl-p">
              <input type="text" class="am-input-lg am-form-feild" name="name" v-model="formData.userName"
                     placeholder="请输入买家姓名"/>
              <span class="am-input-group-btn">
                  <button class="am-btn am-btn-default am-btn-success tpl-table-list-field am-icon-search"
                          type="button" @click="search"></button>
                </span>
            </div>
          </div>
        </div>

        <div class="am-u-sm-12">
          <el-table :data="tableData" border stripe style="min-width: 100%">
            <el-table-column fixed type="index" label="序号" min-width="100"></el-table-column>
            <el-table-column prop="userName" label="买家姓名" min-width="100"></el-table-column>
            <el-table-column prop="productName" label="退货商品名称" min-width="100"></el-table-column>
            <el-table-column label="类型" min-width="100">
              <template scope="scope">{{scope.row.type == 0?'商品':(scope.row.type==1?'服务':'租赁')}}</template>
            </el-table-column>
            <el-table-column prop="quantity" label="商品数量" min-width="100"></el-table-column>
            <el-table-column prop="rentSpan" label="租赁时长" min-width="100"></el-table-column>
            <el-table-column label="租赁时间" min-width="100">
              <template scope="scope">
                {{scope.row.startDate}}~{{scope.row.endDate}} {{scope.row.startTime}}-{{scope.row.endTime}}
              </template>
            </el-table-column>
            <el-table-column prop="price" label="退费金额" min-width="100"></el-table-column>
            <el-table-column prop="reason" label="退费原因" min-width="100"></el-table-column>
            <el-table-column prop="returnResult" label="审批意见" min-width="100"></el-table-column>
            <el-table-column label="状态" min-width="100">
              <template scope="scope">{{scope.row.status==0?'处理中':(scope.row.status==1?'已处理':'已拒绝')}}</template>
            </el-table-column>
            <el-table-column label="更新时间" min-width="120">
              <template scope="scope" >{{scope.row.updateTime | formatTime}}</template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template scope="scope">
                <el-button size="small" :disabled="scope.row.status!=0" @click.native="edit(scope.row.serviceProductRefundId)">审批</el-button>
              </template>
            </el-table-column>
          </el-table>

          <window ref="productRefund" title="退费审批">
            <change-product-refund :serviceProductRefundId="serviceProductRefundId"
                                   @changeProductRefund="$refs.productRefund.close()"></change-product-refund>
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
  </div>
</template>

<script>
  import io from '../../lib/io'
  import Pagination from '../base/Pagination'
  import ProductRefundEditForm from './ProductRefundEditForm'
  export default{
    data: function () {
      return {
        tableData: [],
        formData: {
          type: ''
        },
        pageSize: 5,
        pageNo: 1,
        total: 0,
        serviceProductRefundId: ''
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
      this.$root.$on('productRefund:new', function () {
        _this.pageNo = 1
        _this.search(_this.pageNo)
      })
    },
    methods: {
      search: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminProductRefundList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
        }, _this.formData), function (ret) {
          if (ret.success) {
            _this.tableData = ret.data.list
            _this.total = ret.data.total
          }
        })
      },
      edit: function (serviceProductRefundId) {
        var _this = this
        _this.serviceProductRefundId = serviceProductRefundId
        this.$refs.productRefund.show({
          width: 1000,
          height: 600
        })
      },
      del: function () {
        var _this = this
        _this.$confirm('删除后无法恢复，你确定要删除吗？', function () {
          //请求数据处理

          _this.$root.$emit('productRefund:new')
        })
      }

    },

  }

</script>


