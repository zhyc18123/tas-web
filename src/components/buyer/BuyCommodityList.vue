<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">我购买的商品</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form">

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group tpl-table-list-select">
                <div class="am-form-group">
                  <select2 v-model="query.createTime">
                    <option value="0">最近一个星期</option>
                    <option value="1">最近一个月</option>
                    <option value="2">最近三个月</option>
                    <option value="3">最近一年</option>
                  </select2>
                </div>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group tpl-table-list-select">
                <div class="am-form-group">
                  <select2 v-model="query.status">
                    <option value="">所有</option>
                    <option value="0">未支付</option>
                    <option value="1">已支付</option>
                    <option value="2">取消的订单</option>
                    <option value="3">退款中的订单</option>
                  </select2>
                </div>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" class="am-input-lg" name="name" v-model="query.title" placeholder="订单商品名称"/>
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

          <div class="am-u-sm-12 am-scrollable-horizontal">
            <div class="am-panel am-panel-default">
              <div class="am-panel-hd">面板标题</div>
              <div class="am-panel-bd">
                面板内容
              </div>
            </div>
          </div>
          <div class="am-u-lg-12 am-cf">

            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                          @paging="loadTableData"/>
            </div>
          </div>
          <window ref="productRefund" title="商品退费申请">
            <product-refund :orderItemId="orderItemId" @refundSuccess="$refs.productRefund.close()"></product-refund>
          </window>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'
  import ProductOrderItemDetail from './ProductOrderItemDetail'

  export default{
    data: function () {
      return {
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        query: {
          areaTeamId: '',
          name: '',
        },
        searchConfig: {}
      }
    },
    components: {
      Pagination,
      'product-refund': ProductOrderItemDetail
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo);
    },
    computed: {
      areaTeams: function () {
        var options = ( this.$root.config.areaTeams || [] )
          .map(function (item) {
            return {value: item.areaTeamId, text: item.name}
          })
        return options
      },
    },
    methods: {
      search: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        /*io.post(url,$.extend({
         pageNo:_this.pageNo,
         pageSize:_this.pageSize
         },_this.query),function(ret){
         if(ret.success){
         _this.total = ret.data.total
         _this.tableData = ret.data.list
         }else{
         _this.$alert(ret.desc)
         }
         })*/
      },
      productRefund: function (orderItemId) {
        var _this = this
        _this.orderItemId = orderItemId
        _this.$refs.productRefund.show({
          width: 1000,
          height: 600
        })
      }
    }
  }
</script>
