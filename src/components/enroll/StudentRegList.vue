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
        <th><input type="checkbox" name="selectItem" :data-class-id="item.classId"
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
            <a href="javascript:;" @click="cancel(item.classId)">
              <i class="am-icon-edit"></i> 撤销
            </a>
            <a href="javascript:;" @click="pay(item.classId ,item.startAmount,item.endAmount)">
              <i class="am-icon-edit"></i> 缴费
            </a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <window ref="order" title="缴费">
      <course-order :courseOrderId="courseOrderId" @paySuccess="$refs.order.close()"></course-order>
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
        var regClassInfoList = []

        $selectItem.each(function () {
          if ($(this).prop('checked')) {
            regClassInfoList.push({
              classId : $(this).data('class-id'),
              startAmount : $(this).data('start-amount'),
              endAmount : $(this).data('end-amount') ,
            })
          }
        })
        if (regClassInfoList.length == 0) {
          this.$alert('至少选择一个班')
        } else {
          this.createOrder(regClassInfoList)
        }
      },
      createOrder: function (regClassInfoList ) {
        var studentId = this.$params('studentId')
        var _this = this
        //创建订单和注册信息
        io.post(io.apiAdminCreateOfflineOrder, { studentRegInfoJsonStr : JSON.stringify( {
          studentId : studentId ,
          regClassInfoList : regClassInfoList
        }) } , function (ret) {
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

            var classIds  = regClassInfoList.map(function(item){
              return item.classId
            })

            for(var i = 0 ; i < classIds.length;i++ ){
              _this.cancel(classIds[i])
            }

          } else {
            //失败也要通知
            _this.$alert(ret.desc || '处理失败')
          }
        })
      },
      pay: function (classId,startAmount, endAmount) {
        this.createOrder([{classId,startAmount,endAmount}])
      },
      cancel: function (classId) {
        for(var i = 0 ; i < this.$root.courseShoppingCart.length ; i++ ){
          if(this.$root.courseShoppingCart[i].classId  == classId ){
            this.$root.courseShoppingCart.splice(i , 1 )
          }

        }
      }
    }
  }


</script>
