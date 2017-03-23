<template>
  <div class="father">
    <div>
      <div class="ds-comment-header">
        <span class="ds-highlight">订单详情</span>
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
            <td>{{item.courseClass.startCourseTime}}</td>
            <td>{{item.courseClass.lectureAmount}}</td>
            <td>{{item.courseClass.lectureAmount}}</td>
            <td>{{item.studentReg.startAmount}}</td>
            <td>{{item.studentReg.endAmount}}</td>
            <td>{{item.courseClass.studyingFee}}</td>
            <td></td>
          </tr>
          </tbody>
        </table>

      </div>
      <div class="am-g am-g-fixed">
        <div class="am-u-sm-6">
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              选择优惠 ：
            </label>
            <div class="am-u-sm-3 am-u-end input-field">
              <span></span>
            </div>
          </div>
        </div>
        <div class="am-u-sm-6">
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              优惠原因 ：
            </label>
            <div class="am-u-sm-3 am-u-end input-field">
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="am-u-sm-12">
        <div class="am-form-group">
          <div class="am-form-group font-class">
            <span class="am-form-label">
                原价总计 ： <span v-if="courseOrder.totalAmount != null" class="red">{{courseOrder.totalAmount}}</span>元
            </span>
            <span class="am-form-label">
                优惠总计 ：<!--<span class="red">{{courseOrder.totalAmount-courseOrder.payableAmount}}-->0</span>元
            </span>
            <span class="am-form-label">
                应缴金额 ：<span v-if="courseOrder.payableAmount != null" class="red">{{courseOrder.payableAmount}}</span>元
            </span>
          </div>
        </div>
      </div>

      <div class="am-u-sm-12">
        <div class="am-form-group">
          <div class="am-form-group font-class">
            <span class="am-form-label">
              实缴金额 ：<span class="red">{{courseOrder.payableAmount}}</span>元
            </span>
            <span class="am-form-label">
              欠费金额 ：<span class="red">{{courseOrder.payableAmount-courseOrder.paidAmount}}</span>元
            </span>
          </div>
        </div>
      </div>

      <div class="am-g  text-left">
        <div class="am-u-sm-2">
          支付方式 ：
          <span class="red" v-if="courseOrder.payWay==0">现金</span>
          <span class="red" v-if="courseOrder.payWay==1">刷卡</span>
          <span class="red" v-if="courseOrder.payWay==2">转账</span>
          <span class="red" v-if="courseOrder.payWay==3">账户</span>
        </div>
      </div>


    </div>
    <div class="am-g button-margin">
      <div class="am-u-sm-3 am-u-sm-centered">
        <a href="javascript: void(0)" data-am-modal-close>
          <button type="submit" class="am-btn am-btn-primary am-radius">关闭</button>
        </a>
      </div>
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
    margin-top: 5%;
  }

  .red {
    color: red;
  }

</style>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData: [],
        formData: [],
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
                _this.courseOrder = ret.data.courseOrder
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      }
    }
  }


</script>
