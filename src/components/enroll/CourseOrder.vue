<template>
  <window ref="win" title="订单详情">
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
          <tr v-for="item in regDetails">
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

    <div class="am-u-sm-12 am-scrollable-horizontal">
      <table width="100%" class="am-table am-table-bordered am-table-compact">

        <colgroup>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
        </colgroup>
        <tbody>
        <tr v-if="courseOrder.chargingStatus == 0 ">
          <td class="bgColor">优惠申请</td>
          <td colspan="5">
            <label v-for="item in discounts">
              <input type="radio" :value="item.discountId" name="discount" v-model="formData.discountId"> {{item.name}}
            </label>
          </td>
        </tr>
        <tr>
          <td class="bgColor">总计金额</td>
          <td><span class="am-text-danger">￥{{courseOrder.totalAmount}}</span></td>
          <td class="bgColor">优惠金额</td>
          <td><span class="am-text-danger">￥{{ ( courseOrder.totalAmount - courseOrder.payableAmount) | formatNumber(2)}}</span></td>
          <td class="bgColor">应缴金额</td>
          <td><span class="am-text-danger">￥{{courseOrder.payableAmount}}</span></td>
        </tr>
        <tr>
          <td class="bgColor">已缴金额</td>
          <td><span class="am-text-danger">￥{{courseOrder.paidAmount}}</span></td>
          <td class="bgColor">欠费金额</td>
          <td><span class="am-text-danger">￥{{ ( courseOrder.payableAmount-courseOrder.paidAmount ) | formatNumber(2) }}</span></td>
          <td colspan="2"></td>
        </tr>
        <tr v-if="courseOrder.chargingStatus == 0 ">
          <td class="bgColor">特殊优惠</td>
          <td><input type="number" step="0" class="am-input-sm"  v-model="formData.discountAmount"  @change="checkDiscountAmount"/></td>
          <td class="bgColor">优惠原因</td>
          <td><input type="text" class="am-input-sm"  v-model="formData.discountReason"  /></td>
          <td colspan="2"></td>
        </tr>
        <tr v-if="courseOrder.chargingStatus != 2 ">
          <td class="bgColor">缴费金额</td>
          <td><input type="number" step="0.01" min="1" class="am-input-sm"  v-model="formData.payAmount" @change="check"/></td>
          <td colspan="4"></td>
        </tr>
        <tr>
          <td class="bgColor">优惠详情</td>
          <td colspan="5" v-html="discountDetail"></td>
        </tr>
        <tr v-if="courseOrder.chargingStatus != 2 ">
          <td class="bgColor">支付方式</td>
          <td colspan="5">
            <label class="am-radio-inline">
              <input type="radio" value="0" name="payWay" v-model="formData.payWay" > 现金
            </label>
            <label class="am-checkbox-inline">
              <input type="radio" value="1" name="payWay" v-model="formData.payWay"> pos机
            </label>
            <!--<label class="am-checkbox-inline">-->
              <!--<input type="radio" value="2" name="payWay" v-model="formData.payWay"> 转账-->
            <!--</label>-->
            <label class="am-checkbox-inline">
              <input type="radio" value="3" name="payWay" v-model="formData.payWay"> 账户余额
            </label>
            <!--<label class="am-checkbox-inline">
              <input type="radio" value="4" name="payWay" v-model="formData.payWay"> 微信／支付宝
            </label>-->
          </td>
        </tr>

        <tr v-if="courseOrder.chargingStatus != 2 ">
          <td class="bgColor">收费校区</td>
          <td colspan="5">
            <input required type="text" placeholder="校区" class="am-input-sm" style="display:inline;width:300px;"  v-model="formData.chargeCampusName"  readonly @click="$refs.selectCampus.show()">
            <button type="button" class="am-btn am-btn-default am-btn-sm" @click="$refs.selectCampus.show()">选择</button>
          </td>

        </tr>

        <tr  v-if="courseOrder.chargingStatus != 2 ">
          <td class="bgColor">咨询师</td>
          <td colspan="5">
            <input required type="text" placeholder="咨询师" class="am-input-sm" style="display:inline;width:300px;"  v-model="formData.counselorName"  readonly @click="setupSenior()">
            <button type="button" class="am-btn am-btn-default am-btn-sm"  @click="setupSenior()">选择</button>
          </td>
        </tr>

        </tbody>
      </table>
    </div>


    <div class="am-u-sm-12 am-text-center am-margin-top-lg" v-if="courseOrder.chargingStatus != 2 ">
      <button type="button" class="am-btn am-btn-primary" @click="confirmPay">确定缴费</button>
    </div>

    <select-campus ref="selectCampus" @ok="selectCampusCallback" ></select-campus>
    <select-senior ref="selectSenior" @ok="updateSenior"></select-senior>
  </form>
  </window>

</template>

<style scoped>


  .bgColor {
    background-color: #eee;
    text-align: center;
  }
</style>


<script>
  import io from '../../lib/io'
  import conf from '../../lib/conf'
  import util from '../../lib/util'
  import storage from '../../lib/storage'

  import Pagination from '../base/Pagination'
  import SelectCampus from '../teachingresource/SelectCampus'
  import SelectSenior from '../course/SelectSenior'

  export default{
    data: function () {

      let chargeCampus  = storage.getChargeCampus();
      return {
        regDetails : [],
        discounts:[],
        formData: {
          payWay: 1,
          discountId:'',
          payAmount: '',
          courseOrderId: '',
          discountAmount:0,
          chargeCampusId: chargeCampus?chargeCampus.campusId : '' ,
          chargeCampusName: chargeCampus?chargeCampus.campusName : '',
          counselorName:storage.getLogin().realName,
          counselorId:storage.getLogin().userId
        },
        courseOrder: { },
        payQRCodeUrl : '',
        discountDetail:'无',
        courseOrderId:'',
        areaTeamId:''

      }
    },
    components: {
      'select-campus':SelectCampus,
      'select-senior':SelectSenior
    },
    watch: {
      'formData.discountAmount':function(val){
        this.formData.payAmount = util.formatNumber((this.courseOrder.payableAmount -  val) - (this.courseOrder.paidAmount),2 )
      },
      'formData.discountId':function(val){
        if(val){
          this.recalculateCourseOrderDiscount()
        }
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods: {

      setupSenior:function () {

        this.$refs.selectSenior.query.areaTeamId = this.areaTeamId
        this.$refs.selectSenior.show()
      },
      updateSenior: function (teacher) {
        var _this = this
        _this.formData.counselorName=teacher.teacherName
        _this.formData.counselorId=teacher.teacherId

      },
      check:function(){

        if(this.formData.payAmount <= 0 || this.formData.payAmount > ( this.courseOrder.payableAmount - this.courseOrder.paidAmount )){
          this.formData.payAmount = this.courseOrder.payableAmount - this.courseOrder.paidAmount
        }

      },
      checkDiscountAmount:function(){
          if(this.formData.discountAmount < 0 || this.formData.discountAmount > parseFloat( this.courseOrder.totalAmount) ){
            this.formData.discountAmount = 0
          }
      },
      loadCourseOrderDetail: function (courseOrderId) {
        var _this = this
        if (courseOrderId) {
          io.post(io.apiAdminCourseOrderDetail, {courseOrderId: courseOrderId},
            function (ret) {
              if (ret.success) {
                _this.regDetails = ret.data.regDetailVos
                _this.formData.payWay = 1
                _this.formData.discountId = ''
                _this.formData.courseOrderId = ret.data.courseOrder.courseOrderId
                _this.beforeRenderOrder(ret.data.courseOrder,ret.data.regDetailVos)
                _this.loadDiscountOfPolicy(ret.data.regDetailVos[0].courseClass.areaTeamId)
                _this.areaTeamId=ret.data.regDetailVos[0].courseClass.areaTeamId;
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      recalculateCourseOrderDiscount: function () {
        var _this = this
        var st = setTimeout(function(){
          _this.$showLoading()
        },1000)
        io.post(io.apiAdminRecalculateCourseOrderDiscount, {courseOrderId: _this.formData.courseOrderId ,discountId : _this.formData.discountId},
          function (ret) {
            clearTimeout(st)
            _this.$hiddenLoading()
            if (ret.success) {
              _this.beforeRenderOrder(ret.data,_this.regDetails)
            } else {
              _this.formData.discountId = ''
              _this.$alert('重新计算优惠失败')
            }
          })
      },
      loadDiscountOfPolicy:function(areaTeamId){
        var _this  = this
        io.post(io.apiAdminDiscountListOfPolicy, {areaTeamId},
          function (ret) {
            if (ret.success) {
              ret.data.push({
                discountId: -1,
                name : '无'
              })
              _this.discounts = ret.data
            } else {
              _this.$alert(ret.desc || '加载政策优惠失败')
            }
          })
      },
      beforeRenderOrder:function(courseOrder,regDetails ){
        this.courseOrder = courseOrder
        this.formData.payAmount = util.formatNumber((courseOrder.payableAmount) - ( courseOrder.paidAmount),2 )
        if(courseOrder.discountDetail ){
          let discountDetail  = JSON.parse(courseOrder.discountDetail)
          let discountDetailArr = []
          for(var reg of regDetails){
            let  d = discountDetail[reg.courseClass.classId]
            if(d){
              discountDetailArr.push( reg.courseClass.className +'|'+reg.studentReg.srcTotalAmount+ ':' + d.discountRemarkList.join('+').replace(/\|\d*/g,''))
            }
          }
          this.discountDetail = discountDetailArr.join('<br/>')
        }else{
          this.discountDetail = '无'
        }
      },
      showQRCode:function(){
          var url = conf.basePath + '/m/index.html#/pay/course/order/' + this.requestPayId
          console.log('二维码地址:' + url )
          this.$dialog('请用微信或支付宝扫二维码','<div style="min-height: 300px;"><img src="'+io.apiQrcodeEncode + "?content=" + encodeURIComponent(url)+'" /></div>')
      },
      showBarCode:function(){
        this.$dialog('请用pos机扫码','<div style="min-height: 150px;"><img src="'+io.apiBarcodeEncode + "?content=" + this.requestPayId +'" /></div>')
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
              _this.requestPayId = ret.data
              if(_this.formData.payWay == 4 ){
                _this.showQRCode()
                _this.queryPayResult()
              }else if(_this.formData.payWay == 1 ){
                _this.showBarCode()
                _this.queryPayResult()
              }else{
                _this.$alert("缴费成功")
              }
              _this.$refs.win.close()
              _this.$root.$emit('order:new')
              _this.$emit('completed')

            } else {
              _this.$alert( ret.desc || "缴费失败")
            }

          })
        })

      },
      queryPayResult:function(){
        var _this  = this
        function checkWorker(){

          if(!_this.requestPayId){
            return
          }

          $.ajax({
            url: io.apiAdminQueryPayResult,
            type: 'POST',
            data: {requestPayId : _this.requestPayId , accessToken : io.getHeaders().accessToken  },
            dataType: 'text',
            timeout : 30000,
            success: function (data) {
              if(data == 'Y'){
                _this.$root.$emit('order:pay:success')
                _this.$closeDialog()
                _this.$alert('支付成功')
              }else{
                checkWorker()
              }
            },
            error: function (xhr, status, error) {
              checkWorker()
            }
          })
        }
        checkWorker()
      },
      show:function(){
        this.$refs.win.show(
          {width:1000}
        )
        this.loadCourseOrderDetail(this.courseOrderId)
        this.formData.discountAmount = 0
      }


    },
    beforeDestroy:function(){
      delete this.requestPayId
    }

  }


</script>
