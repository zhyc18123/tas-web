<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">班级信息</div>
      <table width="100%" class="am-table am-table-bordered am-table-compact ">
        <tbody>
        <tr>
          <td class="bgColor">期数：</td>
          <td>{{formData.periodName}}</td>
          <td class="bgColor">业务组：</td>
          <td>{{formData.busTeamName}}</td>
          <td class="bgColor">班级名称：</td>
          <td>{{formData.className}}</td>
        </tr>
        <tr>
          <td class="bgColor">班级编号：</td>
          <td>{{formData.classId}}</td>
          <td class="bgColor">任课老师：</td>
          <td>{{formData.teacherNames}}</td>
          <td class="bgColor">教室：</td>
          <td>{{formData.roomName}}</td>
        </tr>
        <tr>
          <td class="bgColor">开课日期：</td>
          <td>{{formData.startCourseTime | formatDate}}</td>
          <td class="bgColor">报读总讲次：</td>
          <td>{{formData.lectureAmount}}</td>
          <td class="bgColor">已交金额：</td>
          <td>{{formData.payAmount}}</td>
        </tr>
        </tbody>
      </table>

      <div class="am-u-sm-12 am-text-left am-margin-top-sm">
        <label class="bold-font">
          当前剩余讲次：第<span>{{formData.completedLectureAmount + 1}}</span>讲次~第<span>{{formData.endAmount}}</span>讲次
        </label>
        <div class="bold-font am-text-left am-margin-top-sm ">
          申请讲次：第
          <label>
          <select2 v-model="formData.startAmount">
            <option v-for="no in formData.lectureNos" :value="no">{{no}}</option>
          </select2>
        </label>
          讲~第
          <span>{{formData.endAmount}}</span>
          讲
          <label class="bold-font red">应退学费金额：￥
            <span>{{formData.remaining}}</span>
        </label>
        </div>
      </div>

      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">转班原因</div>
      <div class="am-u-sm-12 am-text-left am-margin-top-sm">
        <label class="am-radio-inline">
          <input type="radio" value="不开班" name="reason" v-model="formData.description"> 不开班
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="搬家或家庭原因" name="reason" v-model="formData.description"> 搬家或家庭原因
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="与原校时间冲突" name="reason" v-model="formData.description"> 与原校时间冲突
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="学生不愿上" name="reason" v-model="formData.description"> 学生不愿上
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="其他" name="reason" v-model="formData.description"> 其他
        </label>
      </div>
    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">退费方式</div>
    <div class="am-u-sm-12 am-text-left am-margin-top-sm">
      <label class="am-checkbox-inline">
        <input type="radio" value="2" name="refundWay" v-model="formData.refundWay"> 现金
      </label>
      <label class="am-checkbox-inline">
        <input type="radio" value="3" name="refundWay" v-model="formData.refundWay"> 账户余额
      </label>
      <label class="am-checkbox-inline">
        <input type="radio" value="4" name="refundWay" v-model="formData.refundWay"> 银行卡转账
      </label>
    </div>

    <template v-if="formData.refundWay == 4 ">
      <div class="am-u-sm-12 am-g am-g-collapse am-text-left am-margin-top-sm">
        <div class="am-u-sm-1 am-margin-top-xs am-text-right">转账银行</div>
        <div class="am-u-sm-2"><input type="text" v-model="formData.bankName"></div>
        <div class="am-u-sm-1 am-margin-top-xs am-text-right">开户城市</div>
        <div class="am-u-sm-2"><input type="text" v-model="formData.bankCity"></div>
        <div class="am-u-sm-1 am-margin-top-xs am-text-right">姓名</div>
        <div class="am-u-sm-2"><input type="text" v-model="formData.cardUser"></div>
        <div class="am-u-sm-1 am-margin-top-xs am-text-right">转账账号</div>
        <div class="am-u-sm-2 am-u-end"><input type="text" v-model="formData.cardNo"></div>
      </div>
    </template>


    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="button" class="am-btn am-btn-primary" @click="confirmToRefund">确定</button>
      <a href="javascript:void(0)" data-am-modal-close>
        <button class="am-btn am-btn-primary">取消</button>
      </a>
    </div>

  </form>

</template>
<style>
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
          startAmount: 0,
          remaining: 0,
          lectureNos: [],
          completedLectureAmount: 0
        },
      }
    },
    props: ['regId'],
    created: function () {
      if (this.regId) {
        this.loadClassMessageData(this.regId)
      }
    },
    watch: {
      regId: function (val) {
        this.loadClassMessageData(val)
      },
      'formData.startAmount': function () {
        this.calRemaining()
      }

    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods: {
      loadClassMessageData: function (regId) {
        var _this = this
        if (regId) {
          io.post(io.apiAdminShowClassMessage, {regId: regId},
            function (ret) {
              if (ret.success) {
                _this.formData = $.extend({}, _this.formData, ret.data)
                _this.formData.regId = regId
                _this.formData.description = '与原校时间冲突'
                _this.formData.regLectureAmount = (_this.formData.endAmount - _this.formData.startAmount) + 1
                var lectureNos = []
                for (var no = _this.formData.startAmount; no <= _this.formData.endAmount; no++) {
                  lectureNos.push(no)
                }
                _this.formData.lectureNos = lectureNos
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      calRemaining: function () {
        this.formData.remaining = math.round(math.mul((this.formData.endAmount - this.formData.startAmount + 1), math.div(this.formData.totalAmount, this.formData.regLectureAmount)), 2)
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
        _this.$showLoading()
        io.post(io.apiAdminSaveOrupdateStudentRefund, $.extend({}, _this.formData),
          function (ret) {
            _this.$hiddenLoading()
            if (ret.success) {
              _this.$alert('已接受退款申请')
              _this.$root.$emit('class:new')
            } else {
              _this.$alert(ret.desc || '申请失败')
            }
          })
        _this.$emit('arrangementSuccess')
      }
    }
  }


</script>
