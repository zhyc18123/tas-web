<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">转班确认</div>
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
          <td class="bgColor">学科：</td>
          <td></td>
          <td class="bgColor">教室：</td>
          <td></td>
          <td class="bgColor">教师：</td>
          <td></td>
        </tr>
        <tr>
          <td class="bgColor">以上讲次：</td>
          <td></td>
          <td class="bgColor">启报讲次：</td>
          <td></td>
          <td class="bgColor">截止讲次：</td>
          <td></td>
        </tr>
        </tbody>
      </table>

      <div class="am-u-sm-12 am-text-left am-margin-top-sm red">
        <label class="bold-font">
          转班差额:
        </label>
        <label class="am-radio-inline">
          111
        </label>
        </label>
      </div>
    </div>

    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="submit" class="am-btn am-btn-primary" @click="confirm">确定</button>
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

  .red{
    color: red;
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

    props: [''],
    created: function () {
      /* if (this.courseOrderId) {
       this.loadTableData(this.courseOrderId)
       }*/
    },
    watch: {
      /*courseOrderId: function (val) {
       this.loadTableData(val)
       }*/
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods: {
      /*check:function(){

       if(this.formData.payAmount <= 0 || this.formData.payAmount > ( this.courseOrder.payableAmount - this.courseOrder.paidAmount )){
       this.formData.payAmount = this.courseOrder.payableAmount - this.courseOrder.paidAmount
       }*/


      loadTableData: function () {
        var _this = this
        /*if (courseOrderId != null) {
         io.post(io.apiAdminCourseOrderDetail, {courseOrderId: courseOrderId},
         function (ret) {
         if (ret.success) {
         _this.tableData = ret.data;
         _this.formData.payAmount = (ret.data.courseOrder.payableAmount) - (ret.data.courseOrder.paidAmount)
         _this.formData.payWay = 0
         _this.formData.courseOrderId = ret.data.courseOrder.courseOrderId
         _this.courseOrder = ret.data.courseOrder
         } else {
         _this.$alert(ret.desc)
         }
         })
         }*/
      },
      confirm: function () {

        var _this = this
        _this.$emit('turnClass')
      }
    }
  }


</script>
