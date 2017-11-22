<template>
  <window ref="win" title="退费申请">
    <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id" onsubmit="return false ">
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
            <td>{{studentRegDetail.courseClass.periodName}}</td>
            <td class="bgColor">业务组：</td>
            <td>{{studentRegDetail.courseClass.busTeamName}}</td>
            <td class="bgColor">班级名称：</td>
            <td>{{studentRegDetail.courseClass.className}}</td>
          </tr>
          <tr>
            <td class="bgColor">班级编号：</td>
            <td>{{studentRegDetail.courseClass.classNo}}</td>
            <td class="bgColor">任课老师：</td>
            <td>{{studentRegDetail.courseClass.teacherNames}}</td>
            <td class="bgColor">教室：</td>
            <td>{{studentRegDetail.courseClass.roomName}}</td>
          </tr>
          <tr>
            <td class="bgColor">开课日期：</td>
            <td>{{studentRegDetail.courseClass.startCourseTime | formatDate}}</td>
            <td class="bgColor">报读总讲次：</td>
            <td >{{studentRegDetail.studentReg.regLectureAmount}}</td>
            <td colspan="2"></td>

          </tr>
          <tr>
            <td class="bgColor">原价：</td>
            <td>{{studentRegDetail.studentReg.srcTotalAmount}}</td>
            <td class="bgColor">金额：</td>
            <td>{{studentRegDetail.studentReg.totalAmount}}</td>
            <td class="bgColor">已交金额：</td>
            <td>{{studentRegDetail.studentReg.payAmount}}</td>
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
            <td class="bgColor">从哪一讲退</td>
            <td colspan="7">
              <template v-for="(item,index) in availableRefundLectures">
                <label  class="am-checkbox-inline">
                  <input type="radio" :value="item.lectureNo" name="refundLectureFromNo" v-model="formData.refundLectureFrom"> 第{{item.lectureNo}}讲<span class="am-text-danger">({{ { '0':'出勤', '1':'缺勤', '2':'迟到', '3':'请假' }[item.attendanceStatus] || '未考勤' }})</span>
                </label>
                <br v-if="( index + 1 ) % 6 == 0" >
              </template>

            </td>
          </tr>

          <tr>
            <td class="bgColor">应退金额</td>
            <td colspan="7">
              <span class="am-text-danger">￥{{remaining | formatNumber(2)}}</span>
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

          <tr>
            <td class="bgColor">确认退款金额</td>
            <td>
              <input type="number"  class="am-input-sm" :readonly="availableRefundLectures[0] && formData.refundLectureFrom == availableRefundLectures[0].lectureNo"  v-model="formData.finalRefundAmount" min="0" @change="checkFinalRefundAmount">
            </td>
            <td colspan="6">
            </td>
          </tr>

          <tr>
            <td class="bgColor">退费原因</td>
            <td colspan="7">
              <input type="text"  class="am-input-sm refundWidth"   v-model="formData.description">
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
  </window>

</template>
<style scoped>
  .bold-font {
    font-weight: bold;
  }

  .bgColor {
    background-color: #eee;
    text-align: center;
  }
  .refundWidth {
    width: 50%;
  }
</style>

<script>
  import io from '../../lib/io'
  import math from '../../lib/math'

  export default{
    data: function () {
      return {
        formData: {
          refundWay: 4,
          bankName: '',
          bankCity: '',
          cardUser: '',
          cardNo: '',
          description:'',
          finalRefundAmount : 0,
          refundLectureFrom:''
        },
        studentRegDetail:{studentReg:{},courseClass:{}},
        remaining: 0,
        availableRefundLectures: [],
        regId:''
      }
    },
    watch: {
      'formData.refundLectureFrom': function () {
        this.calRemaining()
      }
    },
    methods: {
      reset:function(){
        this.formData.refundWay =  4
        this.formData.bankName = ''
        this.formData.bankCity = ''
        this.formData.cardUser = ''
        this.formData.cardNo ='',
        this.formData.refundLectureFrom = '' ,
        this.formData.description = '与原校时间冲突'
      },
      loadClassMessageData: function () {
        var _this = this
        io.post(io.apiAdminStudentRegDetail, {regId: _this.regId},
          function (ret) {
            if (ret.success) {
              ret.data.studentReg.startAmount = parseInt(ret.data.studentReg.startAmount)
              ret.data.studentReg.endAmount = parseInt(ret.data.studentReg.endAmount)
              ret.data.studentReg.regLectureAmount = (ret.data.studentReg.endAmount - ret.data.studentReg.startAmount) + 1
              ret.data.courseClass.lectureAmount = parseInt(ret.data.courseClass.lectureAmount)
              _this.studentRegDetail = ret.data
              _this.formData.regId = _this.regId
            } else {
              _this.$alert(ret.desc)
            }
          })
      },
      loadAttend: function () {
        var _this = this
        io.post(io.apiAdminQueryAttendOfStudent, {regId: this.regId},
          function (ret) {
            if (ret.success) {
              _this.availableRefundLectures = ret.data
            } else {
              _this.$alert(ret.desc)
            }
          })
      },
      calRemaining: function () {
        this.remaining = !this.formData.refundLectureFrom ? 0 : math.mul( this.studentRegDetail.studentReg.endAmount - this.formData.refundLectureFrom + 1  , math.div(this.studentRegDetail.studentReg.totalAmount, this.studentRegDetail.studentReg.regLectureAmount)) || '0'
        this.formData.finalRefundAmount = parseInt(this.remaining)
      },
      checkFinalRefundAmount:function(){
        if(this.formData.finalRefundAmount <=0 || this.formData.finalRefundAmount > this.remaining  ){
          this.formData.finalRefundAmount = parseInt(this.remaining)
        }
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
            this.$alert('请确认转账账号是16或19位')
            return
          }

        }

        if(_this.formData.refundLectureFrom.length == 0 ){
          this.$alert('请选择退费讲次')
          return
        }

        _this.$showLoading()
        io.post(io.apiAdminSaveOrupdateStudentRefund,_this.$data.formData,
          function (ret) {
            _this.$hiddenLoading()
            if (ret.success) {
              _this.$refs.win.close()
              _this.$emit('completed')
              if(_this.formData.refundWay == 3 ){
                _this.$root.$emit('mainAccount:change')
                _this.$alert('已经退费成功')
              }else{
                _this.$alert('已接受退款申请')
              }
            } else {
              _this.$alert(ret.desc || '申请失败')
            }
          })

      },
      show:function(){
        this.$refs.win.show({
          width: 1000
        })
        this.reset()
        this.loadClassMessageData()
        this.loadAttend()
      }
    }
  }


</script>
