<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">班级信息</div>
      <table width="100%" class="am-table am-table-bordered am-table-compact ">
        <tbody>
        <tr>
          <td class="bgColor">期数：</td>
          <td></td>
          <td class="bgColor">业务组：</td>
          <td></td>
          <td class="bgColor">班级名称：</td>
          <td></td>
        </tr>
        <tr>
          <td class="bgColor">班级编号：</td>
          <td></td>
          <td class="bgColor">任课老师：</td>
          <td></td>
          <td class="bgColor">教室：</td>
          <td></td>
        </tr>
        <tr>
          <td class="bgColor">开课日期：</td>
          <td></td>
          <td class="bgColor">报读总讲次：</td>
          <td></td>
          <td class="bgColor">已交金额：</td>
          <td></td>
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
          <input type="radio" value="0" name="reason"> 不开班
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="1" name="reason"> 搬家或家庭原因
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="2" name="reason"> 与原校时间冲突
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="3" name="reason"> 学生不愿上
        </label>
        <label class="am-checkbox-inline">
          <input type="radio" value="4" name="reason"> 其他
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
      <button type="submit" class="am-btn am-btn-primary" >确定</button>
      <button type="submit" class="am-btn am-btn-primary" >取消</button>
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
      }
    },
    components:{
      'choose-class':ChooseClass
    },

    props: [''],
    created: function () {
    },
    watch: {
    },
    mounted: function () {
      $(window).smoothScroll();
    },
    methods: {
      loadTableData: function () {
        var _this = this;
      },
      confirmPay: function () {
        var _this = this;
        _this.$emit('paySuccess')
        _this.$refs.order.show({
          width:1000,
          height:600,
        })
      },
      cancel:function () {
        var _this = this;
        _this.$emit('paySuccess')
      }
    }
  }


</script>
