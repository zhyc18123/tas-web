<template>
  <div class="am-g">
    <div class="am-u-sm-12">
      <el-table
        :data="$root.courseShoppingCart"
        border
        stripe
        @selection-change="handleSelectionChange"
        style="min-width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="className"
          label="班级名称"
          min-width="200">
        </el-table-column>
        <el-table-column
          fixed
          prop="periodName"
          label="期数"
          min-width="100">
        </el-table-column>
        <el-table-column
          fixed
          label="已报/学位数"
          min-width="100">
          <template scope="scope">
            {{scope.row.regAmount}}/{{scope.row.lectureAmount}}
        </template>
        </el-table-column>
        <el-table-column
          prop="startAmount"
          label="开始讲数"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="endAmount"
          label="结束讲数"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="lectureAmount"
          label="讲数"
          min-width="100">
        </el-table-column>

        <el-table-column
          prop="gradeName"
          label="年级"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="studyingFee"
          label="学费"
          min-width="100">
        </el-table-column>

        <el-table-column
          prop="teacherNames"
          label="老师"
          min-width="100">
        </el-table-column>

        <el-table-column
          label="开课日期"
          min-width="200">
          <template scope="scope">
            {{scope.row.startCourseTime | formatDate }}

        </template>
        </el-table-column>
        <el-table-column
          prop="studyingTime"
          label="上课时间"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="campusName"
          label="校区"
          min-width="200">

        </el-table-column>
        <el-table-column
          prop="roomName"
          label="教室"
          min-width="100">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template scope="scope">
            <el-button size="small" @click.native="cancel(scope.row.classId)">撤销</el-button>
            <el-button size="small" @click.native="pay(scope.row.classId ,scope.row.startAmount,scope.row.endAmount)">缴费</el-button>
          </template>
        </el-table-column>
      </el-table>




    </div>
    <div class="am-u-sm-12 am-margin-top-sm">
      <button type="button" class="am-btn am-btn-success am-radius" @click="batchPay">批量缴费</button>
    </div>
    <window ref="order" title="缴费">
      <course-order :courseOrderId="courseOrderId" @paySuccess="$refs.order.close()"></course-order>
    </window>
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
        studentId: '',
        selection:[]
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

        if(this.selection.length == 0 ){
          this.$alert('至少选择一个班')
        }else{
          this.createOrder(this.selection.map(function(item){
              return {
                classId: item.classId ,
                startAmount: item.startAmount,
                endAmount: item.endAmount ,
              }
          }))
        }

      },
      createOrder: function (regClassInfoList) {
        var studentId = this.$params('studentId')
        var _this = this
        //创建订单和注册信息
        io.post(io.apiAdminCreateOfflineOrder, {
          studentRegInfoJsonStr: JSON.stringify({
            studentId: studentId,
            regClassInfoList: regClassInfoList
          })
        }, function (ret) {
          if (ret.success) {

            //获取订单id
            var courseOrderId = ret.data.courseOrderId
            _this.courseOrderId = courseOrderId
            //_this 指的是vue实例
            //this 指的是jquery 实例
            //窗口调整大小
            _this.$refs.order.show({
              width: 1000,
              height: 600,
            })

            //通过实践通知订单组件重新加载数据
            _this.$root.$emit('order:new')
            _this.$root.$emit('class:new')

            var classIds = regClassInfoList.map(function (item) {
              return item.classId
            })

            for (var i = 0; i < classIds.length; i++) {
              _this.cancel(classIds[i])
            }

          } else {
            //失败也要通知
            _this.$alert(ret.desc || '处理失败')
          }
        })
      },
      pay: function (classId, startAmount, endAmount) {
        this.createOrder([{classId, startAmount, endAmount}])
      },
      cancel: function (classId) {
        for (var i = 0; i < this.$root.courseShoppingCart.length; i++) {
          if (this.$root.courseShoppingCart[i].classId == classId) {
            this.$root.courseShoppingCart.splice(i, 1)
          }

        }
      },
      handleSelectionChange:function(selection){
          this.selection = selection
      }
    }
  }


</script>
