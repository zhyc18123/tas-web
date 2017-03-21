<template>
  <div>
    <!--<div class="am-form-group">
      <div class="am-u-sm-9 input-field">
        <label class="am-radio-inline">
          <input type="radio"  value="1" name="sex" required v-model="formData.sex" >  男
        </label>
        <label class="am-radio-inline">
          <input type="radio" value="2" name="sex" v-model="formData.sex"> 女
        </label>
        <label class="am-radio-inline">
          <input type="radio" value="3" name="sex" v-model="formData.sex"> 其他
        </label>
      </div>
      </div>-->
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
        <thead>
        <tr>
          <th>序号</th>
          <th>班级名称</th>
          <th>状态</th>
          <th>期数</th>
          <th>班级编号</th>
          <th>校区</th>
          <th>学科</th>
          <th>老师</th>
          <th>教室</th>
          <th>原价</th>
          <th>优惠金额</th>
          <th>实缴金额</th>
          <th>欠款金额</th>
          <th>退款金额</th>
          <th>班级以上讲次</th>
          <th>班级以上讲次</th>
          <th>开课时间</th>
          <th>上课时间</th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="" :key="">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return{
        studentId:'',
        tableData:[{}]
      }
    },
    created:function () {
      this.loadDataTable();
    },
    methods: {
      loadDataTable: function () {
        var _this = this
        var studentId = this.$params('studentId')
        //创建订单和注册信息
       /* io.get(io.apiAdminStudentReadClassList, {
          studentId: studentId,
        }, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data

          }
        })*/
      }
    }
  }

</script>
