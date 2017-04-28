<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
      <div class="am-u-sm-12 am-scrollable-horizontal">
        <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
          <thead class="bg-color">
          <tr>
            <th>班级名称</th>
            <th>年级</th>
            <th>开课日期</th>
            <th>上课时间</th>
            <th>讲数</th>
            <th>起始讲数</th>
            <th>结束讲数</th>
            <th>学费</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in tableData.regDetailVos" :key="">
            <td>{{item.courseClass.className}}</td>
            <td>{{item.courseClass.gradeName}}</td>
            <td>{{item.courseClass.startCourseTime | formatDate}}</td>
            <td></td>
            <td>{{item.courseClass.lectureAmount}}</td>
            <td>{{item.studentReg.startAmount}}</td>
            <td>{{item.studentReg.endAmount}}</td>
            <td>{{item.studentReg.totalAmount}}</td>
          </tr>
          </tbody>
        </table>
      </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm">
      总计金额：{{courseOrder.totalAmount}}￥
    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm">
      已缴金额：{{courseOrder.paidAmount}}￥
    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm" v-if="courseOrder.chargingStatus != 2 ">
      欠费金额：{{courseOrder.payableAmount-courseOrder.paidAmount}}￥
    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm" v-if="courseOrder.chargingStatus != 2 ">
      缴费金额：<input type="text" class="am-input-sm"  v-model="formData.payAmount" style="display:inline;width:80px;" @change="check"/>￥
    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm" v-if="courseOrder.chargingStatus != 2 ">
      支付方式：
      <label class="am-radio-inline">
        <input type="radio" value="0" name="payWay" v-model="formData.payWay" > 现金
      </label>
      <label class="am-checkbox-inline">
        <input type="radio" value="1" name="payWay" v-model="formData.payWay"> 刷卡
      </label>
      <label class="am-checkbox-inline">
        <input type="radio" value="2" name="payWay" v-model="formData.payWay"> 转账
      </label>
      <label class="am-checkbox-inline">
        <input type="radio" value="3" name="payWay" v-model="formData.payWay"> 账户余额
      </label>
      <label class="am-checkbox-inline">
        <input type="radio" value="4" name="payWay" v-model="formData.payWay"> 微信／支付宝
      </label>
    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm" v-if="formData.payWay == 4 " >
      <img :src="payQRCodeUrl" />
    </div>

    <div class="am-u-sm-12 am-text-center am-margin-top-lg" v-if="courseOrder.chargingStatus != 2 ">
      <button type="button" class="am-btn am-btn-primary" @click="confirmPay">确定缴费</button>
    </div>

  </form>

</template>


<script>
  import io from '../../lib/io'
  import conf from '../../lib/conf'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData: [],
        formData: {
          payWay: '',
          payAmount: '',
          courseOrderId: ''
        },
        courseOrder: { },
        payQRCodeUrl : ''

      }
    },

    props: ['courseOrderId'],
    created: function () {
      if (this.courseOrderId) {
        this.loadCourseOrderDetail(this.courseOrderId)
      }
    },
    watch: {
      courseOrderId: function (val) {
        this.loadCourseOrderDetail(val)
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods: {
      check:function(){

        if(this.formData.payAmount <= 0 || this.formData.payAmount > ( this.courseOrder.payableAmount - this.courseOrder.paidAmount )){
          this.formData.payAmount = this.courseOrder.payableAmount - this.courseOrder.paidAmount
        }

      },
      loadCourseOrderDetail: function (courseOrderId) {
        var _this = this
        if (courseOrderId != null) {
          io.post(io.apiAdminCourseOrderDetail, {courseOrderId: courseOrderId},
            function (ret) {
              if (ret.success) {
                _this.tableData = ret.data;
                _this.formData.payAmount = (ret.data.courseOrder.payableAmount) - (ret.data.courseOrder.paidAmount)
                _this.formData.payWay = 0
                _this.formData.courseOrderId = ret.data.courseOrder.courseOrderId
                _this.courseOrder = ret.data.courseOrder
                _this.payQRCodeUrl = io.apiQrcodeEncode + "?content=" + encodeURIComponent(conf.basePath + '/m/index.html#/pay/course/order/' +ret.data.courseOrder.courseOrderId)
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      confirmPay: function () {
        if(this.formData.payWay == 4 ){
            this.$emit('paySuccess')
            return ;
        }
        var _this = this
        _this.$showLoading()
        io.post(io.apiAdminPayCourseOrder, $.extend({}, _this.formData), function (ret) {
          _this.$hiddenLoading()
          if (ret.success) {
            //关闭当前弹窗页面
            _this.$alert("缴费成功")
            _this.$root.$emit('order:new')
            _this.$root.$emit('class:new')
            _this.$emit('paySuccess')
          } else {
            _this.$alert( ret.desc || "缴费失败")
          }

        })
      }


    }
  }


</script>
