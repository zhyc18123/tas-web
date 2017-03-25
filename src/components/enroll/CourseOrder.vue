<template>
  <div class="father">
    <div>
      <div class="ds-comment-header">
        <span class="ds-highlight">操作</span>
      </div>

      <div class="am-u-sm-12 am-scrollable-horizontal">
        <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
          <thead class="bg-color">
          <tr>
            <th>班级名称</th>
            <th>年级</th>
            <th>开课日期</th>
            <th>上课时间</th>
            <th>讲数</th>
            <th>起始讲数</th>
            <th>结束讲数</th>
            <th>学费</th>
            <th>优惠后金额</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in tableData.regDetailVos" :key="">
            <td>{{item.courseClass.className}}</td>
            <td>{{item.courseClass.gradeName}}</td>
            <td>{{item.courseClass.startCourseTime | formatDate}}</td>
            <td></td>
            <td>{{item.courseClass.lectureAmount}}</td>
            <td>{{item.studentReg.startAmount}}</td>
            <td>{{item.studentReg.endAmount}}</td>
            <td>{{item.studentReg.coursePay}}</td>
            <td>{{0}}</td>
          </tr>
          </tbody>
        </table>

      </div>
      <!--<div class="am-g am-g-fixed">
        <div class="am-u-sm-6">
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              选择优惠 ：
            </label>
            <div class="am-u-sm-3 am-u-end input-field">
              <select2>
                <option value="">请选择</option>
                <option value="1">新生优惠98折</option>
                <option value="2">旧生立减90</option>
              </select2>
            </div>
          </div>
        </div>
        <div class="am-u-sm-6">
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              优惠原因 ：
            </label>
            <div class="am-u-sm-3 am-u-end input-field">
              <select2>
                <option value="">请选择</option>
                <option value="1">新生优惠</option>
                <option value="2">旧生优惠</option>
                <option value="3">无原因</option>
              </select2>
            </div>
          </div>
        </div>
      </div>-->
      <div class="am-u-sm-12">
        <div class="am-form-group">
          <div class="am-form-group font-class">
                        <span class="am-form-label">
                            原价总计 ： <span v-if="courseOrder.totalAmount != null">{{courseOrder.payableAmount}}</span>元
                        </span>
            <span class="am-form-label">
                            优惠总计 ：{{0}}元
                        </span>
            <span class="am-form-label">
                            应缴金额 ：<span v-if="courseOrder.payableAmount != null">{{courseOrder.payableAmount-courseOrder.paidAmount}}</span>元
                        </span>
          </div>
        </div>
      </div>


      <div class="am-g  text-left">
        <div class="am-u-sm-2">
          支付方式 ：
        </div>
        <div class="am-u-sm-10 am-margin-top-xs radio">
          <label class="am-radio-inline">
            <input type="radio" value="0" name="payWay" v-model="formData.payWay" checked="checked"> 现金
          </label>
          <label class="am-checkbox-inline">
            <input type="radio" value="1" name="payWay" v-model="formData.payWay"> 刷卡
          </label>
          <label class="am-checkbox-inline">
            <input type="radio" value="2" name="payWay" v-model="formData.payWay"> 转账
          </label>
          <label class="am-checkbox-inline">
            <input type="radio" value="3" name="payWay" v-model="formData.payWay"> 账户
          </label>
        </div>
      </div>

      <div class="am-g doc-am-g payWay-magrgin">
        <div class="am-u-sm-6 am-u-md-5 am-u-lg-4">
          <div class="am-form-group">
            <label class="am-form-label">
              实缴金额 ：
            </label>
            <label class="input-field">
              <input type="text" v-model="formData.paidAmount"
                     value="courseOrder.payableAmount-courseOrder.paidAmount"/>
            </label>
          </div>
        </div>
        <div class="am-u-sm-6 am-u-md-7 am-u-lg-8 text-left">
          <label class="am-form-label">
            如分多次缴费，请修改实缴金额；
          </label>
        </div>
      </div>

      <!--<div class="am-g text-left" id="isShow">
        <div class="am-u-sm-2">现金缴费 ：</div>
        <div class="am-u-sm-3 am-u-end">
          <label class="am-radio-inline">
            <input type="text" class="cashPay">
          </label>
        </div>
      </div>-->

      <div class="am-g button-line button-margin">
        <div class="am-u-sm-3 am-u-sm-centered">
          <button type="submit" class="am-btn am-btn-primary am-radius" @click="confirmPay(courseOrder.courseOrderId)">
            确定
          </button>
          <a href="javascript: void(0)" data-am-modal-close>
            <button type="submit" class="am-btn am-btn-primary am-radius">取消</button>
          </a>

        </div>
      </div>

    </div>


  </div>

</template>

<style>
  .ds-comment-header {
    background-color: #eee;
    text-align: left;
    font-size: 30px;
    margin-bottom: 10px;
  }

  .font-class {
    text-align: left;
    margin: 10px 0px;
    font-weight: bold;
  }

  .text-left {
    text-align: left;
  }

  .bg-color {
    background-color: #eee;
  }

  .button-margin {
    margin: 5% 5%;
  }

  .payWay-magrgin{
    margin-top: 2%;
  }


</style>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData: [],
        formData: {
          payWay: '',
          paidAmount: '',
          courseOrderId: ''
        },
        courseOrder: []
      }
    },

    props: ['courseOrderId'],
    created: function () {
      if (this.courseOrderId) {
        this.loadTableData(this.courseOrderId)
      }
    },
    watch: {
      courseOrderId: function (val) {
        this.loadTableData(val)
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods: {
      loadTableData: function (courseOrderId) {
        var _this = this
        if (courseOrderId != null) {
          io.post(io.apiAdminCourseOrderDetail, {courseOrderId: courseOrderId},
            function (ret) {
              if (ret.success) {
//                alert(JSON.stringify(ret.data));
                _this.tableData = ret.data;
                _this.formData.paidAmount = (ret.data.courseOrder.payableAmount) - (ret.data.courseOrder.paidAmount)
                _this.formData.payWay = 0
                _this.courseOrder = ret.data.courseOrder
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      confirmPay: function (courseOrderId) {
        var _this = this
        _this.formData.courseOrderId = courseOrderId
        io.post(io.apiAdminChangeCourseOrder, $.extend({}, _this.formData), function (ret) {
          if (ret.success) {
            //关闭当前弹窗页面

            _this.$alert("缴费成功")
          } else {
            _this.$alert("缴费失败")
          }

        })
      }
    }
  }


</script>
