<template>
  <div style="margin-bottom: 37px ;">
    <h2 class="title">报名缴费</h2>

    <div class="am-padding-sm panel" v-for="item in orderDetail.regDetailVos">
      <div class="am-g am-g-collapse">
        <div class="am-u-sm-9">{{item.studentReg.className}}</div>
        <div class="am-u-sm-3 price">{{item.studentReg.totalAmount}}￥</div>
      </div>
      <div class="am-g am-g-collapse">
        <div class="am-u-sm-12"><i class="am-icon-calendar"></i>
          <small class="date">{{item.courseClass.startCourseTime | formatDate('YYYY年MM月DD日') }}-{{item.courseClass.endCourseTime | formatDate('YYYY年MM月DD日') }}</small>
        </div>
      </div>

    </div>
    <div class="am-padding-sm panel">
      <div class="am-g am-g-collapse">
        <label class="am-u-sm-9">缴费状态</label>
        <div class="am-u-sm-3">{{orderDetail.courseOrder.chargingStatus == 0 ? '未缴费':( orderDetail.courseOrder.chargingStatus == 1) ? '欠费':'已缴费' }}</div>
      </div>
      <div class="am-g am-g-collapse">
        <label class="am-u-sm-9">已缴金额</label>
        <div class="am-u-sm-3 price">{{orderDetail.courseOrder.paidAmount}}￥</div>
      </div>
      <div class="am-g am-g-collapse" v-if="orderDetail">
        <label class="am-u-sm-9">应缴金额</label>
        <div class="am-u-sm-3 price">{{ orderDetail.courseOrder.payableAmount - orderDetail.courseOrder.paidAmount }}￥</div>
      </div>
    </div>

    <div class="am-padding-sm panel" v-if="orderDetail.courseOrder.chargingStatus != 2">
      <div class="am-g am-g-collapse" v-if="inWeixin">
        <label class="am-u-sm-10" for="wxPay">微信支付</label>
        <div class="am-u-sm-2"><input id="wxPay" name="payMethod" v-model="payMethod" value="wx_pub" type="radio"
                                      class="regular-radio"> <label for="wxPay"></label></div>
      </div>
      <div class="am-g am-g-collapse" v-if="!inWeixin">
        <label class="am-u-sm-10" for="aliPay">支付宝</label>
        <div class="am-u-sm-2"><input id="aliPay" name="payMethod" v-model="payMethod" value="alipay_wap" type="radio"
                                      class="regular-radio"> <label for="aliPay"></label></div>
      </div>
    </div>


    <button type="button" class="am-btn am-btn-primary am-btn-block confirm" @click="confirm" v-if="orderDetail.courseOrder.chargingStatus != 2">确认支付</button>


  </div>
</template>
<style>
  .title {
    height: 46px;
    line-height: 46px;
    text-align: center;
    background: #e4e4e4;
    margin: 0;
  }

  .panel {

    background: #fff;
    margin-bottom: 10px;
  }

  .date {
    color: #999999;
    padding-left: 4px;

  }

  .price {
    color: red;
  }

  .confirm {
    position: fixed;
    bottom: 0;
  }

  .regular-radio {
    display: none;
  }

  .regular-radio + label {
    -webkit-appearance: none;
    background-color: #fafafa;
    border: 1px solid #cacece;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 9px;
    border-radius: 50px;
    display: inline-block;
    position: relative;
  }

  .regular-radio:checked + label:after {
    content: ' ';
    width: 12px;
    height: 12px;
    border-radius: 50px;
    position: absolute;
    top: 3px;
    background: #99a1a7;
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.3);
    text-shadow: 0px;
    left: 3px;
    font-size: 32px;
  }

  .regular-radio:checked + label {
    background-color: #e9ecee;
    color: #99a1a7;
    border: 1px solid #adb8c0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05), inset 15px 10px -12px rgba(255, 255, 255, 0.1), inset 0px 0px 10px rgba(0, 0, 0, 0.1);
  }

  .regular-radio + label:active, .regular-radio:checked + label:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
  }

  .big-radio + label {
    padding: 16px;
  }

  .big-radio:checked + label:after {
    width: 24px;
    height: 24px;
    left: 4px;
    top: 4px;
  }

</style>
<script>

  import io from '../../../lib/io'
  import conf from '../../../lib/conf'

  export default{
    data(){
      return {
        payMethod: '',
        courseOrderId :'',
        orderDetail : { courseOrder : {} , regDetailVos :[]}

      }
    },
    computed: {
      inWeixin: function () {
        var ua = navigator.userAgent.toLowerCase()

        if (ua.match(/MicroMessenger/i) == "micromessenger") {

          return true;
        } else {

          return false;
        }
      },
      openId:function(){
          return this.getQueryString('openId')
      }

    },
    created:function(){
        var courseOrderId  = this.$params('courseOrderId')
        if(courseOrderId){
            this.courseOrderId = courseOrderId
            this.loadCourseOrderDetail();
        }

        if(this.inWeixin && !this.openId ){
            document.location.href = 'http://wx.yuyou100.com/wechat/oauth2?redirectUrl='+ encodeURIComponent(location.href)
        }
    },
    methods: {

      getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return r[2]
        return null
      },

      loadCourseOrderDetail:function(){
          var _this  = this
          io.post(io.apiAdminCourseOrderDetail,{ courseOrderId : this.courseOrderId },
            function(ret){
              if(ret.success){
                _this.orderDetail = ret.data
              }else{
                _this.$alert( ret.desc || '请求服务器失败')
              }
            },
            function(){
              _this.$alert('请求服务器失败')
            })

      },
      confirm:function(){
        var extra = null ;
        var channel  = this.payMethod
        var amount  = this.orderDetail.courseOrder.payableAmount - this.orderDetail.courseOrder.paidAmount ;
        var busId = this.orderDetail.courseOrder.courseOrderId
        if(channel == 'alipay_wap'){
          extra = {
            success_url : conf.basePath + "/m/index.html#/pay/success",
            cancel_url : 'http://demo.cc.zy.com/yyfn/web/pay_result.html?cancel'
          }
        }else if(channel == 'wx_pub' ){
          extra = {
            open_id : this.openId
          }
        }else{
            alert('选择支付方式')
            return
        }

        io.post(io.apiPayPreparePay,{
          busId : busId ,
          channel : channel ,
          amount : amount ,
          subject : '报名缴费',
          body : '报名缴费',
          extra : extra ? JSON.stringify(extra) : '',
          busType : 'courseOrder'
        },function(ret){
          if(ret.success){
            pingpp.createPayment( ret.data , function(result, err) {
              if(result == 'success'){
                document.location.href = conf.basePath + "/m/index.html#/pay/success"
              }else{
              }
            });
          }else{
            alert('准备支付失败')
          }
        })
      }

    }

  }
</script>
