<template>
  <div>
    <div class="am-u-sm-12">
      <el-table
        :data="tableData"
        border
        stripe
        style="min-width: 100%">
        <el-table-column
          label="选择"
          min-width="50">
          <template scope="scope">
              <input type="radio" :value="scope.row.classLectureId" name="destClassLectureId" v-model="formData.destClassLectureId" :disabled="scope.row.attendanceStatus == 1 " />
          </template>
        </el-table-column>
        <el-table-column
          prop="lectureNo"
          label="讲次"
          min-width="100">
        </el-table-column>
        <el-table-column
          label="上课时间"
          min-width="100">
          <template scope="scope">
            {{scope.row.classTime | formatTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="是否考勤"
          min-width="100">
          <template scope="scope">
            {{scope.row.attendanceStatus  == 0 ? '否' : '是'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="totalAmount"
          label="总人数"
          min-width="100">
        </el-table-column>
      </el-table>
    </div>
    <div class="am-u-sm-12 am-margin-top-sm">

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
          <td class="bgColor">调班理由：</td>
          <td colspan="5" class="am-text-left" ><input type="text" class="am-input-sm" max="100" required v-model="formData.remark" /></td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="button" class="am-btn am-btn-primary" @click="back">上一步</button>
      <button type="button" class="am-btn am-btn-primary" @click="confirm()">确定</button>
    </div>
  </div>

</template>

<style>

  .bgColor {
    background-color: #eee;
    text-align: center;
  }
</style>

<script>
  import io from '../../lib/io'
  import math from '../../lib/math'


  export default{
    data: function () {
      return {
        originClass :{} ,
        selectClass :{} ,
        formData: {
          fromAttendClassRecordId:'',
          remark : '',
          destClassLectureId : ''
        },
        tableData:[]
      }
    },
    props: ['args','regId'],
    created: function () {
      this.selectClass  = this.args['step-two'].selectClass
      this.originClass = this.args['step-one'].originClass
      this.formData.fromAttendClassRecordId = this.originClass.fromAttendClassRecordId
      this.loadAttendanceRecordList()
    },
    methods: {
      loadAttendanceRecordList : function(){
        var _this = this
        io.post(io.apiAdminAttendanceAttendanceRecordList, {
          classId : _this.selectClass.classId
        }, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      confirm: function () {

        if(!this.formData.destClassLectureId){
          this.$alert('请选择目标讲次')
          return
        }

        if( !this.formData.remark ){
          this.$alert('请填写调班理由')
          return
        }

        if( this.formData.remark.length > 40  ){
          this.$alert('调班理由超过40个字')
          return
        }

        var _this = this
        _this.$showLoading()
        io.post(io.apiAdminSaveShiftClass, $.extend({},_this.formData),
          function (ret) {
            _this.$hiddenLoading()
            if (ret.success) {
              _this.$emit("completed")
              _this.$alert("调班成功")
            } else {
              _this.$alert(ret.desc)
            }
          })
      },
      back: function () {
        this.$emit('goStep', 'step-two',this.args)
      }
    }
  }


</script>
