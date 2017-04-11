<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">班级信息</div>
      <table width="100%" class="am-table am-table-bordered am-table-compact ">
        <tbody>
        <tr>
          <td class="bgColor">期数：</td>
          <td>{{tableData.periodName}}</td>
          <td class="bgColor">业务组：</td>
          <td>{{tableData.busTeamName}}</td>
          <td class="bgColor">班级名称：</td>
          <td>{{tableData.className}}</td>
        </tr>
        <tr>
          <td class="bgColor">班级编号：</td>
          <td>{{tableData.classId}}</td>
          <td class="bgColor">任课老师：</td>
          <td>{{tableData.teacherNames}}</td>
          <td class="bgColor">教室：</td>
          <td>{{tableData.roomName}}</td>
        </tr>
        <tr>
          <td class="bgColor">开课日期：</td>
          <td>{{tableData.startCourseTime | formatDate}}</td>
          <td class="bgColor">报读总讲次：</td>
          <td>{{tableData.lectureAmount}}</td>
          <td class="bgColor">已交金额：</td>
          <td>{{tableData.payAmount}}</td>
        </tr>
        </tbody>
      </table>

      <!--<div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">考勤情况</div>
      <div class="am-u-sm-12 am-text-left am-margin-top-sm">
      </div>-->

      <div class="am-u-sm-12 am-text-left am-margin-top-sm">
        <label class="bold-font">
          当前剩余讲次：第
          <label>
            <select2>
              <option v-for="n in tableData.sum">{{n}}</option>
            </select2>
          </label>
          讲次~第
          <span>{{tableData.endAmount}}</span>
          讲次
        </label>
        <div class="bold-font am-text-left am-margin-top-sm ">
          申请讲次：第
          <label>
            <select2 v-model="formData.startAmount">
              <option v-for="a in tableData.sum">{{a}}</option>
            </select2>
        </label>
          讲~第
          <span>{{tableData.endAmount}}</span>
          讲
          <label class="bold-font red">应退学费金额：￥
            <span>{{remaining>=0?remaining:tableData.payAmount}}</span>
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
      <label class="am-radio-inline">
        <input type="radio" value="0" name="refundWay" v-model="formData.refundWay" > 支付宝
      </label>
      <label class="am-checkbox-inline">
        <input type="radio" value="1" name="refundWay" v-model="formData.refundWay"> 微信
      </label>
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

    <div class="am-u-sm-12 am-text-left am-margin-top-sm">
      <label class="am-radio-inline">
        转账银行<input type="text" v-model="formData.bankName">
      </label>
      <label class="am-checkbox-inline">
        银行开户城市<input type="text" v-model="formData.bankCity">
      </label>
      <label class="am-checkbox-inline">
        姓名<input type="text" v-model="formData.cardUser">
      </label>
      <label class="am-checkbox-inline">
        转账账号<input type="text" v-model="formData.cardNo">
      </label>
    </div>

    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="button" class="am-btn am-btn-primary" @click="confirmToRefund">确定</button>
      <a href="javascript:void(0)" data-am-modal-close><button class="am-btn am-btn-primary">取消</button></a>
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

  import Pagination from '../base/Pagination'
  import ChooseClass from  './TurnClassStepTwo'

  export default{
    data: function () {
      return {
        tableData: [],
        formData:{
          refundWay:2,
          bankName:'',
          bankCity:'',
          cardUser:'',
          cardNo:'',
          startAmount:1
        },
      }
    },
    components:{
      'choose-class':ChooseClass
    },
    props: ['regId'],
    created: function () {
        if(this.regId) {
            this.loadClassMessageData(this.regId)
        }
    },
    watch: {
      regId:function (val) {
        this.loadClassMessageData(val)
      },
      bankCity:function (city) {
        this.formData.bankCity = city
      },
      bankName:function (name) {
        this.formData.bankName = name
      },
      cardUser:function (use) {
        this.formData.cardUser = use
      },
      cardNo:function (cardNo) {
        this.formData.cardNo = cardNo
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    computed:{
      remaining:function () {
        this.formData.amount = (this.tableData.endAmount-this.formData.startAmount+1) * this.tableData.per
        return (this.tableData.endAmount-this.formData.startAmount+1) * this.tableData.per
      }
    },
    methods: {
      loadClassMessageData: function (regId) {
        var _this = this
        if (regId ) {
          io.post(io.apiAdminShowClassMessage, {regId: regId},
            function (ret) {
              if (ret.success) {
                _this.tableData = ret.data
                _this.formData.regId = regId
                _this.formData.description = '与原校时间冲突'
                _this.formData.classId = ret.data.classId
                _this.tableData.sum = parseInt(ret.data.endAmount)
                _this.tableData.counts = (ret.data.endAmount - ret.data.startAmount) + 1
                _this.tableData.per = (ret.data.totalAmount / _this.tableData.counts)
                _this.remaining = (_this.tableData.endAmount-_this.formData.startAmount+1) * _this.tableData.per
                _this.formData.endAmount = ret.data.endAmount
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      confirmToRefund: function () {
        var _this = this
        io.post(io.apiAdminSaveOrupdateStudentRefund,$.extend({

          },_this.formData),
          function (ret) {
            if (ret.success){
              _this.$alert('已接受退款申请')
              _this.$root.$emit('class:new')
            }else {
              _this.$alert('申请失败')
            }
        })
        _this.$emit('arrangementSuccess')
      }
    }
  }


</script>
