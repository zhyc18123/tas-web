<template>
  <div class="am-form-group">
    <label class="am-u-sm-3 am-form-label">
      <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>状态
    </label>
    <div class="am-u-sm-3 am-u-end input-field">
      <select2 requried v-model="tableData.itemStatus">
        <option value="">选择状态</option>
        <option value="1">已付款</option>
        <option value="2">发货中/商家开始工作/使用资源</option>
      </select2>
    </div>
    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="button" class="am-btn am-btn-primary" @click="change">修改</button>
      <a href="javascript:void(0)" data-am-modal-close>
        <button class="am-btn am-btn-primary">取消</button>
      </a>
    </div>
  </div>

</template>

<script>
  import io from  '../../lib/io'
  export default{
    data:function () {
      return{
        tableData:{},
      }
    },
    props:['orderItemId'],
    created:function () {
//      this.loadTableData(this.orderItemId)
    },
    watch:{
      /*orderItemId:function (val) {
        this.orderItemId = val
      }*/
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods:{
      loadTableData:function (orderItemId) {
        /*var _this = this
        io.post(io.apiAdminOrderItemDetail,{
          orderItemId:orderItemId
        },function (ret) {
          if (ret.success){
            _this.tableData = ret.data
          }else {
            _this.$alert(ret.desc)
          }
        })*/
      },
      change:function () {
        var _this = this
        io.post(io.apiAdminchangeSellOrderItemStatus,$.extend({
          orderItemId:_this.orderItemId
        },_this.tableData),function (ret) {
          if (ret.success){
            _this.$toast("ok")
            _this.$root.$emit('sellerOrderList:new')
          }else {
            _this.$alert(ret.desc)
          }
          _this.$emit('changeStatus')
        })
      }
    }
  }
</script>
