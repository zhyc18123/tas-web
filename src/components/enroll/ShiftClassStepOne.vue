<template>

    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-u-sm-12 am-text-left am-margin-top-sm bold-font">原班信息</div>
      <table width="100%" class="am-table am-table-bordered am-table-compact ">
        <colgroup>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
          <col width="100"/>
        </colgroup>
        <tbody>
        <tr>
          <td class="bgColor">期数：</td>
          <td>{{originClass.courseClass.periodName}}</td>
          <td class="bgColor">业务组：</td>
          <td>{{originClass.courseClass.busTeamName}}</td>
          <td class="bgColor">班级名称：</td>
          <td>{{originClass.courseClass.className}}</td>
        </tr>
        <tr>
          <td class="bgColor">班级编号：</td>
          <td>{{originClass.courseClass.classNo}}</td>
          <td class="bgColor">任课老师：</td>
          <td>{{originClass.courseClass.teacherNames}}</td>
          <td class="bgColor">教室：</td>
          <td>{{originClass.courseClass.roomName}}</td>
        </tr>
        <tr>
          <td class="bgColor">报读总讲次：</td>
          <td>{{originClass.regLectureAmount}}</td>
          <td class="bgColor">开课日期：</td>
          <td>{{originClass.courseClass.startCourseTime | formatDate}}</td>
          <td class="bgColor">开课日期：</td>
          <td>{{originClass.courseClass.endCourseTime | formatDate}}</td>
        </tr>
        <tr>
          <td class="bgColor">选择调课讲次：</td>
          <td  colspan="5" class="am-text-left">

            <template v-for="(item,index) in attendRecords">
              <label  class="am-checkbox-inline">
                <input type="radio" :value="item.attendClassRecordId" name="fromAttendClassRecordId" v-model="originClass.fromAttendClassRecordId" :disabled="item.shiftStatus == 1 || (item.attendanceStatus&&item.attendanceStatus==0)">第{{item.lectureNo}}讲<span class="am-text-danger">({{ { '0':'出勤', '1':'缺勤', '2':'迟到', '3':'请假' }[item.attendanceStatus] || '未考勤' }})</span>
              </label>
              <br v-if="( index + 1 ) % 6 == 0" >
            </template>

          </td>
        </tr>
        </tbody>
      </table>

      <div class="am-u-sm-12 am-text-center am-margin-top-lg">
        <button type="button" class="am-btn am-btn-primary" @click="nextStep">下一步</button>
        <a href="javascript: void(0)" data-am-modal-close>
          <button type="button" class="am-btn am-btn-primary">取消</button>
        </a>
      </div>

    </div>



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
  import math from '../../lib/math'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        originClass:{
          courseClass: {},
          srcStudentReg : {},
          fromAttendClassRecordId:''
        },
        attendRecords:[]
      }
    },
    props: ['regId', 'args'],
    watch: {
      regId: function (val) {
        if(val){
          this.originClass.fromAttendClassRecordId = this.args.defaultAttendClassRecordId
          this.loadTableData(val)
          this.loadAttend(val)
        }
      }
    },
    methods: {

      loadTableData: function (regId) {
        if (regId) {
          var _this = this
          io.post(io.apiAdminStudentRegDetail, {regId: regId},
            function (ret) {
              if (ret.success) {
                _this.originClass.courseClass = ret.data.courseClass
                _this.originClass.srcStudentReg = ret.data.studentReg
                _this.originClass.regLectureAmount = ( ret.data.studentReg.endAmount - ret.data.studentReg.startAmount) + 1
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      loadAttend: function (regId) {
        var _this = this
        io.post(io.apiAdminQueryAttendOfStudent, {regId},
          function (ret) {
            if (ret.success) {
              _this.attendRecords = ret.data
            } else {
              _this.$alert(ret.desc)
            }
          })
      },
      nextStep: function () {
        if( !this.originClass.fromAttendClassRecordId ){
          this.$alert('请选择调课讲次')
          return
        }
        this.$emit('goStep', 'step-two', { originClass : this.originClass } )
      }
    }
  }


</script>
