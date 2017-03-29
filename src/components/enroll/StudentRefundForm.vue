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

      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">考勤情况</div>
      <div class="am-u-sm-12 am-text-left am-margin-top-sm">
      </div>

      <div class="am-u-sm-12 am-text-left am-margin-top-sm">
        <label class="bold-font">
          当前剩余讲次：第<span>{{}}</span>讲次~第<span>{{}}</span>讲次，申请讲次：第<label class="am-radio-inline"><input type="text"></label>讲~第<label class="am-radio-inline"><input type="text"></label>讲
        </label>
        <label class="bold-font red">应退学费金额：</label>
        <label class="am-radio-inline red">{{}}</label>
      </div>

      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">转班原因</div>
      <div class="am-u-sm-12 am-text-left am-margin-top-sm">
        <label class="am-radio-inline">
          <input type="radio" value="0" name="reason" v-model="formData.reason"> 不开班
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="1" name="reason" v-model="formData.reason"> 搬家或家庭原因
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="2" name="reason" v-model="formData.reason"> 与原校时间冲突
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="3" name="reason" v-model="formData.reason"> 学生不愿上
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="4" name="reason" v-model="formData.reason"> 其他
        </label>
      </div>
    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">退费方式</div>
    <div class="am-u-sm-12 am-text-left am-margin-top-sm">
      <label class="am-radio-inline">
        <input type="radio" value="0" name="reason"> 转账
      </label>
      <label class="am-checkbox-inline">
        <input type="radio" value="1" name="reason"> 现金
      </label>
    </div>

    <div class="am-u-sm-12 am-text-left am-margin-top-sm">
      <label class="am-radio-inline">
        转账银行<input type="text" name="bank">
      </label>
      <label class="am-checkbox-inline">
        银行开户城市<input type="text" name="city">
      </label>
      <label class="am-checkbox-inline">
        姓名<input type="text" name="name">
      </label>
      <label class="am-checkbox-inline">
        转账账号<input type="text" name="cardNo">
      </label>
    </div>

    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="submit" class="am-btn am-btn-primary" @click="confirm">确定</button>
      <button type="submit" class="am-btn am-btn-primary" @click="cancel">取消</button>
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
  import ChooseClass from  './ChooseClass'

  export default{
    data: function () {
      return {
        tableData: [],
        formData:{
        },
      }
    },
    components:{
      'choose-class':ChooseClass
    },
    props: ['regId'],
    created: function () {
        if(this.regId) {
            alert(this.regId);
            this.loadClassMessageData(this.regId);
        }
    },
    watch: {
      regId:function (val) {
        this.loadClassMessageData(val);
      }
    },
    mounted: function () {
      $(window).smoothScroll();
    },
    methods: {
      loadClassMessageData: function (regId) {
        var _this = this
        if (regId != null) {
          io.post(io.apiAdminShowClassMessage, {regId: regId},
            function (ret) {
              if (ret.success) {
                _this.tableData = ret.data,
                  _this.formData.regId = ret.data.regId
                _this.formData.classId = ret.data.classId
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      confirm: function () {

          var _this = this;
        _this.$emit('arrangementSuccess')
      },
      cancel:function () {
          var _this = this;
        _this.$emit('arrangementSuccess')
      }
    }
  }


</script>
