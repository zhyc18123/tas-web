<template>
  <window ref="win" title="余额转让">
    <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id" onsubmit="return false ">
      <div class="am-u-sm-12 am-scrollable-horizontal">
        <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
          <thead class="bg-color">
          <tr>
            <th>学生姓名</th>
            <th>学生学号</th>
            <th>电话</th>
            <th>账户余额</th>
            <th>年级</th>
            <th>就读学校</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><span>{{studentDetail.name}}</span></td>
            <td><span>{{studentDetail.studentNo}}</span></td>
            <td><span>{{studentDetail.phoneNo}}</span></td>
            <td><span>{{balanceAmount}}</span></td>
            <td><span>{{studentDetail.gradeName}}</span></td>
            <td><span>{{studentDetail.school}}</span></td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="am-u-sm-12 am-scrollable-horizontal">
        <table width="100%" class="am-table am-table-bordered am-table-compact">
          <tbody>
          <tr>
            <td class="bgColor">可转金额</td>
            <td><span class="am-text-danger">￥{{balanceAmount}}</span></td>
            <td class="bgColor"><span class="red">*&nbsp;&nbsp;</span>转让金额</td>
            <td><input type="number" class="am-input-sm"  v-model="formData.amount"/></td>
          </tr>
          <tr>
            <td class="bgColor"><span class="red">*&nbsp;&nbsp;</span>受理校区</td>
            <td>
              <input required type="text" placeholder="校区" class="am-input-sm" v-model="formData.chargeCampusName"  readonly @click="$refs.selectCampus.show()">
            </td>
            <td style="border: none"><button type="button" class="am-btn am-btn-default am-btn-sm" @click="$refs.selectCampus.show()">选择</button>
            </td>
          </tr>
          <tr>
            <td class="bgColor"><span class="red">*&nbsp;&nbsp;</span>转让学生</td>
            <td>
              <input required type="text" placeholder="名称/学号/电话" class="am-input-sm" v-model="formData.studentName"  readonly @click="$refs.selectStudent.show()">
            </td>
            <td style="border: none"><button type="button" class="am-btn am-btn-default am-btn-sm" @click="$refs.selectStudent.show()">选择</button>
            </td>
          </tr>
          <tr>
            <td class="bgColor"><span class="red">*&nbsp;&nbsp;</span>转让原因备注</td>
            <td><input type="text" min="1" class="am-input-sm"  v-model="formData.reasonRemark"/></td>
            <td colspan="4"></td>
          </tr>

          </tbody>
        </table>
      </div>


      <div class="am-u-sm-12 am-text-center am-margin-top-lg">
        <button type="button" class="am-btn am-btn-primary" @click="handleSave">保存</button>
        <button type="button" class="am-btn am-btn-primary" @click="handleCancel">取消</button>
      </div>

      <select-campus ref="selectCampus" @ok="selectCampusCallback" ></select-campus>
      <select-student ref="selectStudent" @ok="selectStudentCallback" ></select-student>
    </form>
  </window>

</template>

<style scoped>

  .am-table>tbody>tr>td, .am-table>tbody>tr>th{
    text-align: left;
  }
  .bgColor {
    background-color: #eee;
    text-align: center!important;
  }
  .red {
    color: #dd514c;
    vertical-align: middle;
  }
</style>


<script>
  import io from '../../lib/io'
  import conf from '../../lib/conf'
  import util from '../../lib/util'
  import storage from '../../lib/storage'
  import SelectCampus from '../teachingresource/SelectCampus'
  import SelectStudent from '../base/SelectStudent.vue'
  export default{
    data: function () {

      let chargeCampus  = storage.getChargeCampus();
      return {
        studentDetail: {},
        formData: {
          applierMainAccountId: '',
          destMainAccountId: '',
          studentName: '',
          acceptCampusId: chargeCampus?chargeCampus.campusId : '' ,
          chargeCampusName: chargeCampus?chargeCampus.campusName : '',
          amount: '',
          reasonRemark: '',
        },
        studentId:'',
        balanceAmount:'',
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    components: {SelectCampus, SelectStudent},
    methods: {
      selectCampusCallback:function(campus){
        this.formData.acceptCampusId = campus.campusId
        this.formData.chargeCampusName = campus.campusName
        storage.setChargeCampus(campus)
      },
      selectStudentCallback:function(student){
        this.formData.destMainAccountId = student.studentId
        this.formData.studentName = student.name + '/' + student.studentNo + '/' + student.phoneNo
      },
      loadStudentDetail: function (studentId) {
        var _this = this
        if (studentId) {
          io.post(io.apiAdminStudentDetail, {studentId: studentId},
            function (ret) {
              if (ret.success) {
                _this.formData.applierMainAccountId = ret.data.student.studentId
                _this.studentDetail = ret.data.student
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      show:function(){
        this.$refs.win.show(
          {width:1000}
        )
        this.loadStudentDetail(this.studentId)
      },
      handleSave() {
        var _this = this
        if(_this.check()) {
          io.post(io.transferForStudent, this.formData,
            function (ret) {
              if (ret.success) {
                _this.$root.$emit('mainAccount:change')
                _this.$toast('转让成功')
                _this.handleCancel()
              } else {
                _this.$alert(ret.desc)
              }
            })
        }
      },
      handleCancel() {
        this.$refs.win.close()
      },
      check() {
        if(!this.formData.acceptCampusId) {
          this.$alert('请选择受理校区')
          return false
        } else if (!this.formData.destMainAccountId) {
          this.$alert('请选择转让学生')
          return false
        }else if (!this.formData.reasonRemark) {
          this.$alert('请输入提现原因备注')
          return false
        }else if (!this.formData.amount) {
          this.$alert('请输入转让金额')
          return false
        }else if (Number(this.formData.amount) > this.balanceAmount) {
          this.$alert('转让金额不能大于可转金额')
          return false
        }
        return true
      }
    },

  }


</script>
