<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">商家名称：</div>
        <div class="am-u-sm-10">{{tableData.merchantName}}</div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">手机号码：</div>
        <div class="am-u-sm-10">{{tableData.phoneNo}}</div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">注册时间：</div>
        <div class="am-u-sm-10">{{tableData.createTime | formatTime}}</div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">服务类型：</div>
        <div class="am-u-sm-10">{{tableData.name}}</div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">服务区域：</div>
        <div class="am-u-sm-10">{{tableData.serviceArea}}</div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">服务描述：</div>
        <div class="am-u-sm-10">
          <p>{{tableData.introduce}}</p>
        </div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">审核结果：</div>
        <div class="am-u-sm-10">
          <input type="radio" value="1" v-model="tableData.status">审核通过&nbsp;&nbsp;&nbsp;
          <input type="radio" value="2" v-model="tableData.status">驳回
        </div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">备 &nbsp; 注：</div>
        <div class="am-u-sm-10">
          <textarea v-model="tableData.remark"></textarea>
        </div>
      </div>

      <div class="am-u-sm-12 am-text-center am-margin-top-lg">
        <button type="button" class="am-btn am-btn-primary" @click="confirmToRefund">确定</button>
        <a href="javascript:void(0)" data-am-modal-close>
          <button class="am-btn am-btn-primary">取消</button>
        </a>
      </div>
    </div>


  </form>

</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData:[],
      }
    },
    props: ['merchantId'],
    created: function () {
//      this.loadTableData(this.merchantId)
    },
    watch:{
      merchantId:function (val) {
        this.loadTableData(val)
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods: {
      loadTableData: function (merchantId) {
        var _this = this
        if(merchantId) {
          io.post(io.apiAdminServiceMerchantDetail, {
            merchantId: merchantId
          }, function (ret) {
            if (ret.success) {
              _this.tableData = ret.data
            } else {
              _this.$alert(ret.desc)
            }
          })
        }

      },
      confirmToRefund: function () {
        var _this = this
        _this.tableData.createTime=''
        _this.tableData.updateTime=''
        io.post(io.apiAdminCahngeServiceMerchant,$.extend({},_this.tableData),function (ret) {
          if (ret.success){
            _this.$alert('审批成功')
            _this.$root.$emit('sellerRegister:new')
          }else {
            _this.$alert('审批失败')
          }
        })
        _this.$emit('changeSellerRegister')
      }
    }
  }


</script>
