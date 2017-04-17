<template>
  <div class="am-form-group">
    <label class="am-u-sm-3 am-form-label">
      <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>状态
    </label>
    <div class="am-u-sm-3 am-u-end input-field">
      <select2 v-model="tableData.status">
        <option value="0">下单中</option>
        <option value="1">已付款</option>
        <option value="2">发货中</option>
        <option value="3">交易成功</option>
        <option value="4">退费</option>
      </select2>
    </div>
    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="button" class="am-btn am-btn-primary" @click="change()">修改</button>
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
        tableData:[],
      }
    },
    props:['orderItemId'],
    created:function () {
//      this.loadTableData(this.orderItemId)
    },
    watch:{
      orderItemId:function (val) {
        this.loadTableData(val)
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods:{
      loadTableData:function (orderItemId) {
        var _this = this
        io.post(io.apiAdminSellOrderDetail,{
          orderItemId:orderItemId
        },function (ret) {
          if (ret.success){
            _this.tableData = ret.data
          }else {
            _this.$alert(ret.desc)
          }
        })
      },
      change:function () {
        var _this = this
        io.post(io.apiAdminchangeSellOrderItem,{
          orderItemId:_this.orderItemId,
          itemStatus:_this.tableData.status
        },function (ret) {
          if (ret.success){
            _this.$toast("ok")
          }else {
            _this.$alert(ret.desc)
          }
          _this.$emit('changeStatus')
        })
      }
    }
  }
</script>
