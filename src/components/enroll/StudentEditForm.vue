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
          <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>出生日期
        </label>
        <div class="am-u-sm-3 am-u-end  input-field">
          <date-picker v-model="formData.birthday" >
            <input type="text" class="am-form-field" placeholder="请选择出生日期" data-am-datepicker  required >
          </date-picker>
        </div>
      </div>


      <div class="am-form-group">
        <label class="am-u-sm-3 am-form-label">
          <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>学生手机
        </label>
        <div class="am-u-sm-9 input-field">
          <input type="text" placeholder="请输入手机号"  required  v-model="formData.phoneNo" pattern="^1((3|5|8){1}\d{1}|70)\d{8}$" >
        </div>
      </div>


      <div class="am-form-group">
        <label class="am-u-sm-3 am-form-label">
          <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>就读学校
        </label>
        <div class="am-u-sm-9 input-field">
          <input type="text" placeholder="请输入就读学校"  required  v-model="formData.school" >
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
          <span class="am-text-danger am-margin-right-xs am-text-xs"></span>监护人：
        </label>
      </div>


      <div class="am-form-group" v-for="(item, index) in guardianList">
        <label class="am-u-sm-1 am-form-label">
          <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>关系
        </label>
        <div class="am-u-sm-2 input-field">
          <select2 required v-model="guardianList[index].relationship" >
            <option value="0">请选择</option>
            <option value="父亲">父亲</option>
            <option value="母亲">母亲</option>
            <option value="爷爷">爷爷</option>
            <option value="奶奶">奶奶</option>
            <option value="其他">其他</option>
          </select2>
        </div>


        <label class="am-u-sm-2 am-form-label">
          <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>监护人姓名
        </label>
        <div class="am-u-sm-2 input-field">
          <input type="text" class="am-form-field" required placeholder="请输入姓名" v-model="guardianList[index].name" >
        </div>
        <label class="am-u-sm-2 am-form-label">
          <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>联系电话
        </label>
        <div class="am-u-sm-2  input-field">
          <input type="text" class="am-form-field" required placeholder="请输入联系电话" v-model="guardianList[index].phoneNo" pattern="^1((3|5|8){1}\d{1}|70)\d{8}$" >
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
  </form>
</template>


<script>
  import io from '../../lib/io'
  import util from '../../lib/util'
  export default{
    data(){
      return{
        guardianList:[{}],
        formData:{
          sex:''
        }
      }
    },
    props:['studentId'],
    computed:{
      grades:function(){
        return this.$root.config.grades.map(function(item){
          return {value:item.gradeId,text:item.gradeName}
        })
      }
    },
    created:function(){
      var studentId  = this.studentId
      if(studentId){
        var _this = this
        io.get(io.apiAdminStudentDetail,{ studentId : studentId },
          function(ret){
            if(ret.success){
              ret.data.student.birthday = util.formatDate(ret.data.student.birthday)
              _this.formData = ret.data.student
              _this.guardianList = ret.data.guardianList
            }
          },
          function(){
            _this.$alert('请求服务器失败')
          })
      }
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
      }
    }
  }
</script>
