<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id" onsubmit="return false ">
      <div class="am-u-sm-12 am-scrollable-horizontal">
        <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
          <thead class="bg-color">
          <tr>
            <th>班级名称</th>
            <th>年级</th>
            <th>开课日期</th>
            <th>上课时间</th>
            <th>讲数</th>
            <th>起止讲数</th>
            <th>学费</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in tableData.regDetailVos" :key="">
            <td>{{item.courseClass.className}}</td>
            <td>{{item.courseClass.gradeName}}</td>
            <td>{{item.courseClass.startCourseTime | formatDate}}</td>
            <td>{{item.courseClass.classDateTip}} {{item.courseClass.studyingTime}}</td>
            <td>{{item.courseClass.lectureAmount}}</td>
            <td>{{item.studentReg.startAmount}}-{{item.studentReg.endAmount}}</td>
            <td>{{item.studentReg.totalAmount}}</td>
          </tr>
          </tbody>
        </table>
      </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm">
      总计金额：<span class="am-text-danger">{{courseOrder.totalAmount}}</span>￥ 优惠金额：<span class="am-text-danger">{{ ( courseOrder.totalAmount - courseOrder.payableAmount) | formatNumber(2)}}</span>￥ 应缴金额：<span class="am-text-danger">{{courseOrder.payableAmount}}</span>￥
    </div>
    <div class="am-u-sm-12 am-text-left am-margin-top-sm">
      已缴金额：<span class="am-text-danger">{{courseOrder.paidAmount}}</span>￥ 欠费金额：<span class="am-text-danger">{{ ( courseOrder.payableAmount-courseOrder.paidAmount ) | formatNumber(2) }}</span>￥
    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm" v-if="courseOrder.chargingStatus == 0 ">
      优惠金额：
      <input type="number" step="0" class="am-input-sm"  v-model="formData.discountAmount" style="display:inline;width:100px;" @change="checkDiscountAmount"/>
      优惠原因：
      <input type="text" class="am-input-sm"  v-model="formData.discountReason" style="display:inline;width:200px;" />
    </div>



    <div class="am-u-sm-12 am-text-left am-margin-top-sm" v-if="courseOrder.chargingStatus != 2 ">
      缴费金额：<input type="number" step="0.01" min="1" class="am-input-sm"  v-model="formData.payAmount" style="display:inline;width:100px;" @change="check"/>￥
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

    <div class="am-u-sm-12 am-text-left am-margin-top-sm" v-if="courseOrder.chargingStatus != 2 ">
      收费校区：
        <input required type="text" placeholder="校区" class="am-input-sm" style="display:inline;width:300px;"  v-model="formData.chargeCampusName"  readonly @click="$refs.selectCampus.show()">
        <button type="button" class="am-btn am-btn-default am-btn-sm" @click="$refs.selectCampus.show()">选择</button>
    </div>


    <div class="am-u-sm-12 am-text-center am-margin-top-lg" v-if="courseOrder.chargingStatus != 2 ">
      <button type="button" class="am-btn am-btn-primary" @click="confirmPay">确定缴费</button>
    </div>

    <select-campus ref="selectCampus" @ok="selectCampusCallback" ></select-campus>

  </form>

</template>


<script>
  import io from '../../lib/io'
  import conf from '../../lib/conf'
  import util from '../../lib/util'
  import storage from '../../lib/storage'

  import Pagination from '../base/Pagination'
  import SelectCampus from '../teachingresource/SelectCampus'

  export default{
    data: function () {

      let chargeCampus  = storage.getChargeCampus();
      return {
        tableData: [],
        formData: {
          payWay: '',
          payAmount: '',
          courseOrderId: '',
          discountAmount:0,
          chargeCampusId: chargeCampus?chargeCampus.campusId : '' ,
          chargeCampusName: chargeCampus?chargeCampus.campusName : '',
        },
        courseOrder: { },
        payQRCodeUrl : ''

      }
    },
    components: {
      'select-campus':SelectCampus
    },
    props: ['courseOrderId'],
    created: function () {
      if (this.courseOrderId) {
        this.loadCourseOrderDetail(this.courseOrderId)
        this.formData.discountAmount = 0
      }
    },
    watch: {
      courseOrderId: function (val) {
        this.loadCourseOrderDetail(val)
        this.formData.discountAmount = 0
      },
      'formData.discountAmount':function(val){
        this.courseOrder.payableAmount = this.courseOrder.totalAmount -  val
        this.formData.payAmount = util.formatNumber((this.courseOrder.payableAmount) - (this.courseOrder.paidAmount),2 )
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
      checkDiscountAmount:function(){
          if(this.formData.discountAmount < 0 || this.formData.discountAmount > parseInt( this.courseOrder.totalAmount) ){
            this.formData.discountAmount = 0
          }
      },
      loadCourseOrderDetail: function (courseOrderId) {
        var _this = this
        if (courseOrderId) {
          io.post(io.apiAdminCourseOrderDetail, {courseOrderId: courseOrderId},
            function (ret) {
              if (ret.success) {
                _this.tableData = ret.data;
                _this.formData.payAmount = util.formatNumber((ret.data.courseOrder.payableAmount) - (ret.data.courseOrder.paidAmount),2 )
                _this.formData.payWay = 0
                _this.formData.courseOrderId = ret.data.courseOrder.courseOrderId
                _this.courseOrder = ret.data.courseOrder
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      showQRCode:function(){
          this.$dialog('请用微信或支付宝扫二维码','<img src="'+io.apiQrcodeEncode + "?content=" + encodeURIComponent(conf.basePath + '/m/index.html#/pay/course/order/' +this.courseOrder.courseOrderId)+'" />')
      },
      selectCampusCallback:function(campus){
        this.formData.chargeCampusId = campus.campusId
        this.formData.chargeCampusName = campus.campusName
        storage.setChargeCampus(campus)
      },
      confirmPay: function () {

        if(this.courseOrder.chargingStatus == 0 && this.formData.discountAmount > 0 ){
            if(!this.formData.discountReason){
              this.$alert('请输入优惠原因')
              return
            }

            if(this.formData.discountReason.length > 140 ){
              this.$alert('输入优惠原因过长(140字以内)')
              return
            }
        }

        if( !this.formData.chargeCampusId ){
          this.$alert('请选择收费校区')
          return
        }

        var _this = this
        _this.$confirm("确定缴费" , function(){
          _this.$showLoading()
          io.post(io.apiAdminConfirmPayOrder, $.extend({}, _this.formData), function (ret) {
            _this.$hiddenLoading()
            if (ret.success) {

              if(_this.formData.payWay == 4 ){
                _this.showQRCode()
              }else{
                _this.$alert("缴费成功")
              }

              _this.$root.$emit('order:new')
              _this.$root.$emit('class:new')
              _this.$emit('paySuccess')

            } else {
              _this.$alert( ret.desc || "缴费失败")
            }

          })
        })

      }


    }
  }


</script>
