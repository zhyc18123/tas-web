<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">原班信息</div>
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

      <div class="am-u-sm-12 am-text-left am-margin-top-sm">
        <label class="bold-font">
          以上讲次:
        </label>
        <label class="am-radio-inline">
          <input type="text"/>
        </label>
        <label class="bold-font">
          剩余金额：
        </label>
        <label class="am-radio-inline">
          111
        </label>
      </div>

      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">
        转班原因
      </div>

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

    <window ref="order" title="转班-第二步">
      <choose-class  @paySuccess="$refs.order.close()"></choose-class>
    </window>

    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="submit" class="am-btn am-btn-primary" @click="confirmPay">下一步</button>
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
      }
    },
    components:{
      'choose-class':ChooseClass
    },

    props: ['regId'],
    created: function () {
      if (this.regId) {
        this.loadTableData(this.regId)
      }
    },
    watch: {
      regId: function (val) {
       this.loadTableData(val)
       }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods: {
      /*check:function(){

       if(this.formData.payAmount <= 0 || this.formData.payAmount > ( this.courseOrder.payableAmount - this.courseOrder.paidAmount )){
       this.formData.payAmount = this.courseOrder.payableAmount - this.courseOrder.paidAmount
       }*/


      loadTableData: function (regId) {
        var _this = this
        if (regId != null) {
          io.post(io.apiAdminShowOldClassDetail, {regId: regId},
            function (ret) {
              if (ret.success) {
                _this.tableData = ret.data;
                _this.$alert(ret.data)
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      confirmPay: function () {

        var _this = this
//        _this.$emit('paySuccess')
//        _this.$refs.order.show({
//          width:1000,
//          height:600
//        })
        /* io.post(io.apiAdminPayCourseOrder, $.extend({}, _this.formData), function (ret) {
         if (ret.success) {
         //关闭当前弹窗页面
         _this.$alert("缴费成功")
         _this.$emit('paySuccess')
         } else {
         _this.$alert("缴费失败")
         }

         })
         }*/
      },
      cancel:function () {
        var _this = this
        _this.$emit('paySuccess')
      }
    }
  }


</script>
