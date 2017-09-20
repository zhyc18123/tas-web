<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">班级信息</div>
      <table width="100%" class="am-table am-table-bordered am-table-compact ">
        <colgroup>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
        </colgroup>
        <tbody>
        <tr>
          <td class="bgColor">期数：</td>
          <td>{{classInfo.periodName}}</td>
          <td class="bgColor">业务组：</td>
          <td>{{classInfo.busTeamName}}</td>
          <td class="bgColor">班级名称：</td>
          <td>{{classInfo.className}}</td>
        </tr>
        <tr>
          <td class="bgColor">班级编号：</td>
          <td>{{classInfo.classId}}</td>
          <td class="bgColor">任课老师：</td>
          <td>{{classInfo.teacherNames}}</td>
          <td class="bgColor">教室：</td>
          <td>{{classInfo.roomName}}</td>
        </tr>
        <tr>
          <td class="bgColor">开课日期：</td>
          <td>{{classInfo.startCourseTime | formatDate}}</td>
          <td class="bgColor">报读总讲次：</td>
          <td>{{classInfo.lectureAmount}}</td>
          <td class="bgColor">已交金额：</td>
          <td>{{classInfo.payAmount}}</td>
        </tr>
        </tbody>
      </table>

      <table width="100%" class="am-table am-table-bordered am-table-compact am-text-nowrap">

        <colgroup>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
        </colgroup>
        <tbody>

        <tr>
          <td class="bgColor">申请退费讲次</td>
          <td colspan="7">
            <template v-for="(item,index) in availableRefundLectures">
              <label  class="am-checkbox-inline">
                <input type="checkbox" :value="item.lectureNo" name="refundLectureNo" v-model="formData.refundLecture"> 第{{item.lectureNo}}讲<span class="am-text-danger">({{ { '0':'出勤', '1':'缺勤', '2':'迟到', '3':'请假' }[item.attendanceStatus] || '未考勤' }})</span>
              </label>
              <br v-if="( index + 1 ) % 6 == 0" >
            </template>

          </td>
        </tr>

        <tr>
          <td class="bgColor">退费金额</td>
          <td colspan="7">
            <span class="am-text-danger">{{remaining | formatNumber(2)}}</span>￥
          </td>
        </tr>

        <tr>
          <td class="bgColor">退费方式</td>
          <td colspan="7">
            <label class="am-checkbox-inline">
              <input type="radio" value="2" name="refundWay" v-model="formData.refundWay"> 现金
            </label>
            <label class="am-checkbox-inline">
              <input type="radio" value="3" name="refundWay" v-model="formData.refundWay"> 账户余额
            </label>
            <label class="am-checkbox-inline">
              <input type="radio" value="4" name="refundWay" v-model="formData.refundWay"> 银行卡转账
            </label>
          </td>
        </tr>

        <template v-if="formData.refundWay == 4 ">
        <tr>
          <td class="bgColor">转账银行</td>
          <td colspan="2"><input type="text" class="am-input-sm" v-model="formData.bankName"></td>
          <td class="bgColor">开户城市</td>
          <td colspan="2"><input type="text" class="am-input-sm" v-model="formData.bankCity"></td>
        </tr>

        <tr>
          <td class="bgColor">姓名</td>
          <td colspan="2"><input type="text" class="am-input-sm" v-model="formData.cardUser"></td>
          <td class="bgColor">转账账号</td>
          <td colspan="2"><input type="text" class="am-input-sm" v-model="formData.cardNo"></td>
        </tr>
        </template>

        </tbody>
      </table>
    </div>
    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="button" class="am-btn am-btn-primary" @click="confirmToRefund">确定</button>
      <a href="javascript:void(0)" data-am-modal-close>
        <button class="am-btn am-btn-primary">取消</button>
      </a>
    </div>

  </form>

</template>
<style scoped>
  .bold-font {
    font-weight: bold;
  }

  .bgColor {
    background-color: #eee;
    text-align: center;
  }
</style>

<script>
  import io from '../../lib/io'
  import math from '../../lib/math'

  export default{
    data: function () {
      return {
        formData: {
          refundWay: 2,
          bankName: '',
          bankCity: '',
          cardUser: '',
          cardNo: '',
          description:'',
          refundLecture:[]
        },
        classInfo:{
          totalAmount:0,
          regLectureAmount:0
        },
        remaining: 0,
        availableRefundLectures: [],
      }
    },
    props: ['regId'],
    watch: {
      regId: function (val) {
        if(!val){
          return
        }
        this.reset()
        this.loadClassMessageData(val)
        this.loadAttend(val)
      },
      'formData.refundLecture': function () {
        this.calRemaining()
      }

    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods: {
      reset:function(){
        this.formData.refundWay =  2
        this.formData.bankName = ''
        this.formData.bankCity = ''
        this.formData.cardUser = ''
        this.formData.cardNo ='',
        this.formData.refundLecture = [] ,
        this.formData.description = '与原校时间冲突'
      },
      loadClassMessageData: function (regId) {
        var _this = this
        io.post(io.apiAdminShowClassMessage, {regId: regId},
          function (ret) {
            if (ret.success) {
              ret.data.startAmount = parseInt(ret.data.startAmount)
              ret.data.endAmount = parseInt(ret.data.endAmount)
              ret.data.lectureAmount = parseInt(ret.data.lectureAmount)
              ret.data.regLectureAmount = (ret.data.endAmount - ret.data.startAmount) + 1
              ret.data.startAmount =  Math.max(ret.data.startAmount,ret.data.completedLectureAmount + 1)
              _this.classInfo = ret.data
              _this.formData.regId = regId

            } else {
              _this.$alert(ret.desc)
            }
          })
      },
      loadAttend: function (regId) {
        var _this = this
        io.post(io.apiAdminQueryAttendOfStudent, {regId: regId},
          function (ret) {
            if (ret.success) {
              _this.availableRefundLectures = ret.data
            } else {
              _this.$alert(ret.desc)
            }
          })
      },
      calRemaining: function () {
        this.remaining = math.mul(this.formData.refundLecture.length , math.div(this.classInfo.totalAmount, this.classInfo.regLectureAmount)) || '0'
      },
      confirmToRefund: function () {
        var _this = this
        if (this.formData.refundWay == 4 ) {
          if(!this.formData.bankName){
            this.$alert('请填开户银行')
            return
          }
          if(!this.formData.bankCity){
            this.$alert('请填开户城市')
            return
          }

          if(!this.formData.cardUser){
            this.$alert('请填姓名')
            return
          }

          if(!this.formData.cardNo){
            this.$alert('请填转账账号')
            return
          }

          if(!/^\d{16}|\d{19}$/.test( this.formData.cardNo )){
            this.$alert('请确认转账账号是16或19')
            return
          }

        }

        if(_this.formData.refundLecture.length == 0 ){
          this.$alert('请选择退费讲次')
          return
        }
        var data = JSON.parse(JSON.stringify(_this.$data.formData))
        data.refundLecture = data.refundLecture.join(',')
        _this.$showLoading()
        io.post(io.apiAdminSaveOrupdateStudentRefund,data,
          function (ret) {
            _this.$hiddenLoading()
            if (ret.success) {
              _this.$alert('已接受退款申请')
              _this.$root.$emit('class:new')
              _this.$emit('arrangementSuccess')
            } else {
              _this.$alert(ret.desc || '申请失败')
            }
          })

      }
    }
  }


</script>
