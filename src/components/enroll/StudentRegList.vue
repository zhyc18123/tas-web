<template>
  <div class="am-u-sm-12 am-scrollable-horizontal">
    <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
      <thead>
      <tr>
        <th><input type="checkbox" name="selectAll"></th>
        <th>班级名称</th>
        <th>开始讲数</th>
        <th>结束讲数</th>
        <th>讲数</th>
        <th>期数</th>
        <th>年级</th>
        <th>学费</th>
        <th>已报/学位数</th>
        <th>老师</th>
        <th>教室</th>
        <th>开课日期</th>
        <th>上课时间</th>
        <th>校区</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="(item, index) in $root.courseShoppingCart" :key="">
        <th><input type="checkbox" name="selectItem" :data-class-id="item.classId" :data-index="index"
                   :data-start-amount="item.startAmount" :data-end-amount="item.endAmount"></th>
        <td>{{item.className}}</td>
        <td>{{item.startAmount}}</td>
        <td>{{item.endAmount}}</td>
        <td>{{item.lectureAmount}}</td>
        <td>{{item.periodName}}</td>
        <td>{{item.gradeName}}</td>
        <td>{{item.studyingFee}}</td>
        <td>0/{{item.lectureAmount}}</td>
        <td>{{item.teacherNames}}</td>
        <td>{{item.roomName}}</td>
        <td>{{item.startCourseTime | formatDate }}</td>
        <td>{{0}}-{{0}}</td>
        <td>{{item.campusName}}</td>
        <td>
          <div class="tpl-table-black-operation">
            <a href="javascript:;" @click="cancel(index)">
              <i class="am-icon-edit"></i> 撤销
            </a>
            <a href="javascript:;" @click="pay(item.classId,index)">
              <i class="am-icon-edit"></i> 缴费
            </a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <window ref="order">
      <course-order :courseOrderId="courseOrderId"></course-order>
    </window>

    <button type="button" class="am-btn am-btn-success am-radius" @click="batchPay">批量缴费</button>

  </div>


</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'
  import CourseOrder from './CourseOrder'

  export default{
    data: function () {
      return {
        courseOrderId: '',
        studentId: ''
      }
    },
    components: {
      'course-order': CourseOrder
    },
    mounted: function () {
      $(this.$el).on("change", 'input[name=selectAll]', function () {
        var $selectItem = $('input[name=selectItem]', this.$el)
        var isSelect = $(this).prop('checked') == true
        $selectItem.each(function () {
          $(this).prop('checked', isSelect)
        })
      })

    },
    destroyed: function () {
      this.$root.courseShoppingCart = []

    },
    methods: {

      batchPay: function () {

        var $selectItem = $('input[name=selectItem]', this.$el)
        var classIds = []
        var indexs = []
        var startAmounts = []
        var endAoumnts = []
        $selectItem.each(function () {
          if ($(this).prop('checked')) {
            classIds.push($(this).data('class-id'))
            indexs.push($(this).data('index'))
            startAmounts.push($(this).data('start-amount'))
            endAoumnts.push($(this).data('end-amount'))
          }
        })
        if (classIds.length == 0) {
          this.$alert('至少选择一个班')
        } else {
          this.createOrder(classIds, indexs, startAmounts, endAoumnts)
        }
      },
      createOrder: function (classIds, indexs, startAmounts, endAmounts) {
        var studentId = this.$params('studentId')
        //创建信息
        io.get(io.apiAdminSaveOrUpdateStudentReg, {
            studentId: studentId,
            classIds: classIds,
            startAmounts: startAmounts,
            endAmounts: endAmounts
          },
          function (ret) {
            if (ret.success) {
              $refs.order.show()
              //如果缴费成功，移除代缴费里面的相应课程
              if (false) {
                for (var i = 0; i <= indexs.length; i++) {
                  this.cancel(indexs[i]);
                }
              }
            }
          })
      },
      pay: function (classId, index, startAmount, endAmount) {
        this.createOrder([classId], [index], [startAmount], [endAmount])
      },
      cancel: function (index) {
        this.$root.courseShoppingCart.splice(index, 1)
      }
    }
  }


</script>
