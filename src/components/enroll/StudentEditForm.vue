<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <fieldset>
      <div class="am-form-group">
        <label class="am-u-sm-3 am-form-label">
          <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>学生姓名
        </label>
        <div class="am-u-sm-9 input-field">
          <input type="text"  class="am-form-field" placeholder="请输入学生姓名" required v-model="formData.name" >
        </div>
      </div>

      <div class="am-form-group">
        <label class="am-u-sm-3 am-form-label">
          <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>性别
        </label>
        <div class="am-u-sm-3 am-u-end input-field">
          <select2 required   v-model="formData.sex">
            <option value="0">请选择</option>
            <option value="1">男</option>
            <option value="2">女</option>
          </select2>
        </div>
      </div>

      <div class="am-form-group">
        <label class="am-u-sm-3 am-form-label">
          出生日期
        </label>
        <div class="am-u-sm-3 am-u-end  input-field">
          <date-picker v-model="formData.birthday" >
            <input type="text" class="am-form-field" placeholder="请选择出生日期" data-am-datepicker readonly  >
          </date-picker>
        </div>
      </div>


      <div class="am-form-group">
        <label class="am-u-sm-3 am-form-label">
          <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>学生手机
        </label>
        <div class="am-u-sm-9 input-field">
          <input type="text" placeholder="请输入手机号"  required  v-model="formData.phoneNo" pattern="^1((3|4|5|7|8){1}\d{1}|70)\d{8}$" >
        </div>
      </div>


      <div class="am-form-group">
        <label class="am-u-sm-3 am-form-label">
          <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>就读学校
        </label>
        <div class="am-u-sm-6 input-field">
          <input ref="schoolInput" type="text" placeholder="就读学校"  required  v-model="formData.school"  readonly>
        </div>
        <div class="am-u-sm-3">
          <button type="button" class="am-btn am-btn-default" @click="$refs.selectStudentSchool.show()">选择</button>
        </div>
      </div>


      <div class="am-form-group">
        <label class="am-u-sm-3 am-form-label">
          <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>就读年级
        </label>
        <div class="am-u-sm-3 am-u-end tpl-table-list-select">
          <select2 required v-model="formData.gradeId"  :options="grades">
            <option value="">请选择</option>
          </select2>
        </div>
      </div>

      <div class="am-form-group">
        <label class="am-u-sm-3 am-form-label">
          推荐人
        </label>
        <div class="am-u-sm-6 input-field">
          <input type="text" placeholder="推荐人"    v-model="formData.referrerName"  readonly>
        </div>
        <div class="am-u-sm-3">
          <button type="button" class="am-btn am-btn-default" @click="$refs.selectStudent.show()">选择</button>
        </div>
      </div>

      <div class="am-form-group">
        <label class="am-u-sm-3 am-form-label">
          地址
        </label>
        <div class="am-u-sm-3 input-field">
          <select2  v-model="formData.province" :options="provinces" @input="formData.city='';formData.district=''">
            <option value="">请选择省份</option>
          </select2>
        </div>
        <div class="am-u-sm-3 input-field">
          <select2 :required="!!formData.province" v-model="formData.city" :options="cities" @input="formData.district=''">
            <option  value="">请选择城市</option>
          </select2>
        </div>
        <div class="am-u-sm-3 input-field">
          <select2 :required="!!formData.province"  v-model="formData.district" :options="districts">
            <option value="">请选区(县)</option>
          </select2>
        </div>
      </div>
      <div class="am-form-group">
        <div class="am-u-sm-9 am-u-sm-push-3 input-field">
          <input :required="!!formData.province" type="text"  class="am-form-field" placeholder="请输入详细地址"  v-model="formData.address">
        </div>
      </div>

      <div class="am-form-group">
        <label class="am-u-sm-3 am-form-label">
          备注
        </label>
        <div class="am-u-sm-9">
          <textarea v-model="formData.remark" rows="3" maxlength="200"></textarea>
        </div>
      </div>


      <div class="am-form-group">
        <label class="am-u-sm-3 am-form-label">
          <span class="am-text-danger am-margin-right-xs am-text-xs"></span>监护人：
        </label>
      </div>


      <div class="am-form-group" v-for="(item, index) in guardianList">
        <label class="am-u-sm-1 am-form-label">
          关系
        </label>
        <div class="am-u-sm-2 input-field">
          <select2  v-model="guardianList[index].relationship" >
            <option value="">请选择</option>
            <option value="父亲">父亲</option>
            <option value="母亲">母亲</option>
            <option value="爷爷">爷爷</option>
            <option value="奶奶">奶奶</option>
            <option value="其他">其他</option>
          </select2>
        </div>


        <label class="am-u-sm-2 am-form-label">
          监护人姓名
        </label>
        <div class="am-u-sm-2 input-field">
          <input  :required="!!guardianList[index].relationship" type="text" class="am-form-field"  placeholder="请输入姓名" v-model="guardianList[index].name" >
        </div>
        <label class="am-u-sm-2 am-form-label">
          联系电话
        </label>
        <div class="am-u-sm-2  input-field">
          <input :required="!!guardianList[index].relationship" type="text" class="am-form-field"  placeholder="请输入联系电话" v-model="guardianList[index].phoneNo" pattern="^1((3|4|5|7|8){1}\d{1}|70)\d{8}$" >
        </div>
        <div class="am-u-sm-1 input-field">
          <a href="javascript:;" @click="addGuardian"> <i class="am-icon-plus"></i></a>
          <a href="javascript:;" @click="delGuardian(index)"><i class="am-icon-remove"></i></a>
        </div>
      </div>


      <div class="am-form-group">
        <div class="am-u-sm-9 am-u-sm-push-3">
          <button type="submit" class="am-btn am-btn-primary">提交</button>
        </div>
      </div>
    </fieldset>
    <select-student-school ref="selectStudentSchool" @select="selectStudentSchool"/>
    <select-student ref="selectStudent" @select="selectReferrer"/>
  </form>
</template>


<script>
  import io from '../../lib/io'
  import conf from '../../lib/conf'
  import util from '../../lib/util'
  import SelectStudentSchool from '../sysmanager/SelectStudentSchool'
  import SelectStudent from './SelectStudent'

  export default{
    data(){
      return{
        guardianList:[{}],
        formData:{
          sex:'',
          school:'',
          referrerName:'',
          areaTeamId:'',
          province : '',
          city : '',
          district :''
        },
        studentSchoolList:[],
        location:[],
        cityMap:{},
        districtMap:{},

      }
    },
    props:['studentId'],
    components:{'select-student-school' :SelectStudentSchool,'select-student':SelectStudent },
    computed:{
      grades:function(){
        return this.$root.config.grades.map(function(item){
          return {value:item.gradeId,text:item.gradeName}
        })
      },
      provinces:function(){
        return this.location.map(function(item){
          return {value:item.n,text:item.n}
        })
      },
      cities:function(){
        var cities  = this.formData.province && this.cityMap[this.formData.province]
        if( !cities ){
          return []
        }
        return cities.map(function(item){
          return {value:item.n,text:item.n}
        })
      },
      districts:function(){
        var districts = this.formData.city && this.districtMap[ this.formData.province + this.formData.city]
        if(!districts){
          return []
        }
        return districts.map(function(item){
          return {value:item.n,text:item.n}
        })
      }
    },
    created:function(){
      var studentId  = this.studentId
      if(studentId){
        var _this = this
        io.post(io.apiAdminStudentDetail,{ studentId : studentId },
          function(ret){
            if(ret.success){
              ret.data.student.birthday = util.formatDate(ret.data.student.birthday)

              if(ret.data.student.location ){
                let locations = ret.data.student.location.split(' ')
                ret.data.student.province =  locations[0]
                ret.data.student.city =  locations[1]
                ret.data.student.district =  locations[2]
              }else{
                ret.data.student.province =  ''
                ret.data.student.city =  ''
                ret.data.student.district =  ''
              }

              _this.formData = ret.data.student
              console.log(_this.formData )
              _this.guardianList =  ret.data.guardianList && ret.data.guardianList.length == 0  ?  [{}] : ret.data.guardianList
            }
          },
          function(){
            _this.$alert('请求服务器失败')
          })
      }
      this.loadLocation()
    },
    mounted:function(){
      var _this = this ;

      $('#' + this.id ).validator({
        validate:function(validity){

        },
        onValid: function(validity) {
          $(validity.field).closest('.input-field').find('.am-alert').hide();
        },
        onInValid: function(validity) {
          var $field = $(validity.field);
          var $group = $field.closest('.input-field');
          var $alert = $group.find('.am-alert');
          // 使用自定义的提示信息 或 插件内置的提示信息
          var msg = $field.data('validationMessage') || this.getValidationMessage(validity);

          if (!$alert.length) {
            $alert = $('<div class="am-alert am-alert-danger"></div>').hide().
            appendTo($group);
          }

          $alert.html(msg).show();
        },
        submit:function(e){
          e.preventDefault();
          var $submitBtn = $('button[type=submit]',e.target);
          $submitBtn.attr("disabled" ,"disabled" )
          _this.$showLoading()
          var formValidity = this.isFormValid();
          var complete = function(){
            _this.$hiddenLoading()
            $submitBtn.removeAttr("disabled" ,"disabled" )
          }
          if(formValidity){
            _this.save(complete);
          }else{
            complete.call()
          }
        }
      });
    },

    methods:{
      save:function(complete){
        var _this = this
        var data = _this.formData
        data.guardianJsonStr = JSON.stringify(this.guardianList)
        if(_this.formData.province){
          data.location  = _this.formData.province + ' ' + _this.formData.city + ' ' + _this.formData.district
        }

        io.post(io.studentSaveOrUpdate,data ,
          function(ret){
            complete.call()
            if(ret.success){
              _this.$toast('OK')
              _this.$emit('saveCompleted',ret.data)
            }else{
              _this.$alert(ret.desc)
            }

          },
          function(){
            complete.call()
            _this.$alert('请求服务器失败')
          })
      },
      addGuardian : function(){
        this.guardianList.push({})
      },
      delGuardian : function(index){
        if(this.guardianList.length <= 1){
          return
        }
        this.guardianList.splice(index,1)
      },
      selectStudentSchool:function (studentSchool) {
        this.formData.school =  studentSchool.schoolName
        $(this.$refs.schoolInput).removeClass('am-field-error').closest('.input-field').find('.am-alert').hide();
      },
      selectReferrer:function(student){
        this.formData.referrerId = student.studentId
        this.formData.referrerName = student.name
      },
      loadLocation:function(){
        var _this = this
        $.getJSON(conf.basePath + '/static/location/data.json',function(ret){
          _this.location  = ret
          for(var i =0 ; i < ret.length ; i++ ){
            _this.cityMap[ret[i].n] = ret[i].s
            for(var ii = 0 ; ii < ret[i].s.length ;ii++ ){
              _this.districtMap[ ret[i].n + ret[i].s[ii].n ] = ret[i].s[ii].s
            }
          }
        })
      }
    }
  }
</script>
