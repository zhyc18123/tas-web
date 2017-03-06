<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">班级信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>班级名
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text"  class="am-form-field" placeholder="输入班级名" required v-model="formData.className" >
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>课程名
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.courseTemplateId" :options="courseTemplates" >
                  <option value="">请选择</option>
                </select2>
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>年级
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.gradeId" :options="grades" >
                  <option value="">请选择</option>
                </select2>
              </div>

            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>科目
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.subjectId" :options="subjects" >
                  <option value="">请选择</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>所在区域组
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.areaTeamId" :options="areaTeams" >
                  <option value="">请选择</option>
                </select2>

              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                所在业务组
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2  v-model="formData.busTeamId" :options="busTeams" >
                  <option value="">请选择</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>班主任
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.teacherId" :options="teachers" >
                  <option value="">请选择</option>
                </select2>
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>教师
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <label v-for="item in $root.config.teachers" :key="item.teacherId" class="am-checkbox-inline">
                  <input type="checkbox" :value="item.teacherId" name="teacherIds" required v-model="formData.teacherIds">{{item.teacherName}}
                </label>
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>教室
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.roomId" :options="rooms" >
                  <option value="">请选择</option>
                </select2>
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>期名
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.periodId" :options="periods" >
                  <option value="">请选择</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <div class="am-u-sm-9 am-u-sm-push-3">

                <button type="submit" class="am-btn am-btn-primary">提交</button>
              </div>
            </div>
            </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import io from '../../lib/io'
import util from '../../lib/util'
    export default{
        data(){
            return{
                id:'form-'+(new Date().getTime()),
                formData:{
                  areaTeamId:'',
                  busTeamId:'',
                  teacherIds:[]
                }
            }
        },
        created:function(){
         var courseClassId  = this.$params('classId')
         if(courseClassId){
          var _this = this
          io.post(io.apiAdminSaveOrUpdateClass,{ courseClassId : courseClassId },
            function(ret){
              if(ret.success){
                ret.data.teacherIds = ret.data.teacherIds ? ret.data.teacherIds.split(',') : []
                _this.formData = ret.data
              }
            },
            function(){
              _this.$alert('请求服务器失败')
          })
         }

        },
        computed:{
          areaTeams : function(){
            var options =  ( this.$root.config.areaTeams || [] )
            .map(function(item){
              return {value:item.areaTeamId,text:item.name}
            })
            return options
          },
          busTeams : function(){
            var options =  ( ( this.formData.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.formData.areaTeamId] || [] )  : [] )
            .map(function(item){
              return {value:item.busTeamId,text:item.name}
            })
            return options
          },
          grades:function(){
            return this.$root.config.grades.map(function(item){
              return {value:item.gradeId,text:item.gradeName}
            })
          },
          subjects:function(){
            return this.$root.config.subjects.map(function(item){
              return {value:item.subjectId,text:item.subjectName}
            })
          },
          teachers:function(){
            return this.$root.config.teachers.map(function(item){
              return {value:item.teacherId,text:item.teacherName}
            })
          },
          courseTemplates:function(){
            return this.$root.config.courseTemplates.map(function(item){
              return {value:item.courseTemplateId,text:item.courseName}
            })
          },
          rooms:function(){
            return this.$root.config.rooms.map(function(item){
              return {value:item.roomId,text:item.roomName}
            })
          },
          periods:function(){
            return this.$root.config.periods.map(function(item){
              return {value:item.periodId,text:item.periodNo}
            })
          },
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
            data.teacherIds = data.teacherIds.join(',')
            io.post(io.apiAdminSaveOrUpdateClass,data,
            function(ret){
              complete.call()
              if(ret.success){
                _this.$toast('OK')
                _this.$router.back()
              }else{
                _this.$alert(ret.desc)
              }

            },
            function(){
              complete.call()
              _this.$alert('请求服务器失败')
            })
          }
        }
    }
</script>
