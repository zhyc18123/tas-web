<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">管理租赁</div>
        </div>

        <div class="am-u-sm-3">
          <div class="am-u-sm-4">
            <a href="javascript:;" @click="$router.push('/main/serviceManager/goods/list')">商品</a>
          </div>
          <div class="am-u-sm-4">
            <a href="javascript:;" @click="$router.push('/main/serviceManager/lease/list')">租赁</a>
          </div>
          <div class="am-u-sm-4">
            <a href="javascript:;" @click="$router.push('/main/serviceManager/demand/list')">需求</a>
          </div>
          <!--   <div class="am-u-sm-2">
               <a href="javascript:;" @click="$router.push('/main/seller/soldProductOrder/list')">客户商品订单</a>
             </div>
             <div class="am-u-sm-2">
               <a href="javascript:;" @click="$router.push('/main/seller/soldServiceOrder/list')">客户服务订单</a>
             </div>
             <div class="am-u-sm-2">
               <a href="javascript:;" @click="$router.push('/main/seller/leaseRecord/list')">客户租赁订单</a>
             </div>-->
        </div>

        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form">

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">
              <div class="am-form-group">
                <label class="am-u-sm-4 am-padding-top-xs ">
                  用户名:
                </label>
                <div class="am-u-sm-8 am-u-end  input-field">
                  <input type="text" name="className" v-model="query.sellerName" placeholder=""/>
                </div>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">
              <div class="am-form-group">
                <label class="am-u-sm-4 am-padding-top-xs ">
                  手机号:
                </label>
                <div class="am-u-sm-8 am-u-end  input-field">
                  <input type="text" name="className" v-model="query.sellerPhoneNo" placeholder=""/>
                </div>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">
              <div class="am-form-group">
                <label class="am-u-sm-5 am-padding-top-xs ">
                  发布时间:
                </label>
                <date-picker class="am-u-sm-7 am-u-end  input-field" v-model="query.beginTime">
                  <input type="text" placeholder="" data-am-datepicker readonly required>
                </date-picker>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">
              <div class="am-form-group">
                <label class="am-u-sm-4 am-padding-top-xs ">
                  到
                </label>
                <date-picker class="am-u-sm-7 am-u-end  input-field" v-model="query.endTime">
                  <input type="text" placeholder="" data-am-datepicker readonly required>
                </date-picker>
              </div>
            </div>


            <div class="am-u-sm-12 am-u-md-12 am-u-lg-2 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search"><span class="am-icon-search"></span>查询
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="am-u-sm-12">
          <el-table :data="tableData" border stripe style="min-width: 100%">
            <el-table-column prop="roomName" label="名称" min-width="100"></el-table-column>

            <el-table-column label="日期" min-width="100">
              <template scope="scope">{{scope.row.start | formatDate}} 至 {{scope.row.end |formatDate}}</template>
            </el-table-column>
            <el-table-column label="按天" min-width="50">
              <template scope="scope">{{scope.row.weekNum==0?'日':scope.row.weekNum==1?'一':scope.row.weekNum==2?'二':scope.row.weekNum==3?'三':scope.row.weekNum==4?'四':scope.row.weekNum==5?'五':scope.row.weekNum==6?'六':'-'}}</template>
            </el-table-column>
            <el-table-column label="时间段" min-width="100">
              <template scope="scope">{{scope.row.startTime }} 至 {{scope.row.endTime }}</template>
            </el-table-column>
            <el-table-column label="天数" min-width="100">
              <template scope="scope">{{scope.row.dateNum}}</template>
            </el-table-column>
            <el-table-column label="小时数" min-width="100">
              <template scope="scope">{{scope.row.hourNum}}</template>
            </el-table-column>
            <el-table-column label="总价" min-width="100">
              <template scope="scope">{{scope.row.totalPrice}}</template>
            </el-table-column>
            <el-table-column label="用户名" min-width="100">
              <template scope="scope">{{scope.row.sellerName}}</template>
            </el-table-column>


            <el-table-column label="手机号" min-width="100">
              <template scope="scope">{{scope.row.sellerPhoneNo}}</template>
            </el-table-column>

            <el-table-column label="发布时间" min-width="100">
              <template scope="scope">{{scope.row.updateTime | formatTime}}</template>
            </el-table-column>



            <el-table-column label="操作" width="120">
              <template scope="scope">
                <el-dropdown>
                  <span class="el-dropdown-link">操作菜单<i class="el-icon-caret-bottom el-icon--right"></i></span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="hasPermission('edit')"
                                      @click.native="$router.push('/main/tradingService/category/edit/'+scope.row.categoryId)">
                      编辑
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="offLease(scope.row.leaseId)">下架</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>

        </div>

        <div class="am-u-lg-12 am-cf">
          <div class="am-fr">
            <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                        @paging="loadTableData"/>
          </div>
        </div>
        <window ref="productRefund" title="商品退费申请">
          <order-item-refund :orderItemId="orderItemId"
                             @refundApply="$refs.productRefund.close()"></order-item-refund>
        </window>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>

<style>
  .left-margin {
    margin-left: 10%;
  }
</style>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'
  import OrderItemRefundForm from '../buyer/OrderItemRefundForm'

  export default{
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 3,
        pageNo: 1,
        query: {
          areaTeamId: '',
          name: '',
        },
        searchConfig: {},
        orderItemId: ''
      }
    },
    components: {
      Pagination,
      'order-item-refund': OrderItemRefundForm
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo);
      var _this = this
      this.$root.$on('orderList:new', function () {
        _this.loadTableData(this.pageNo)
      })
    },
    methods: {
      offLease: function (leaseId) {
        var _this = this;
        _this.$confirm("确认下架吗",
          function () {
            io.post(io.apiAdminOffLease, {leaseId: leaseId}, function (ret) {
              if (ret.success) {
                _this.$toast("下架成功")
                _this.loadTableData()
              } else {
                _this.$alert(ret.desc)
              }
            })
          });
      },

      search: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminLeaseList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
          status:1,
        }, _this.query), function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      productRefund: function (orderItemId) {
        var _this = this
        _this.orderItemId = orderItemId
        _this.$refs.productRefund.show({
          width: 1000,
          height: 600
        })
      },
      /*     buyerConfirm: function (orderItemId) {
       var _this = this
       _this.orderItemId = orderItemId
       io.post(io.apiAdminchangeSellOrderItemStatus, {
       orderItemId: _this.orderItemId,
       itemStatus: 3
       }, function (ret) {
       if (ret.success) {
       _this.$toast("ok")
       _this.$root.$emit('orderList:new')
       } else {
       _this.$alert(ret.desc)
       }
       })
       }*/
    }
  }
</script>
