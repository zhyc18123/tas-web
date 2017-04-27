<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">老师信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>姓名
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text"  class="am-form-field" placeholder="请输入姓名" required v-model="formData.teacherName">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>性别
              </label>
              <div class="am-u-sm-9 input-field">
                <label class="am-radio-inline">
                  <input type="radio"  value="1" name="sex" required v-model="formData.sex" >  男
                </label>
                <label class="am-radio-inline">
                  <input type="radio" value="2" name="sex" v-model="formData.sex"> 女
                </label>
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>身份证号码
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text"  class="am-form-field" placeholder="请输入身份证号码" required pattern="^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$" v-model="formData.idNo">
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>电话号码
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入手机号码"  data-validation-message="请输入正确的手机号码" pattern="^1((3|5|8){1}\d{1}|70)\d{8}$" required v-model="formData.phoneNo"/>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>任教年级
              </label>
              <div class="am-u-sm-9 am-margin-top-xs input-field">
                <label v-for="item in $root.config.grades" :key="item.gradeId" class="am-checkbox-inline">
                  <input type="checkbox" :value="item.gradeId" name="gradeIds" required v-model="formData.gradeIds">{{item.gradeName}}
                </label>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>任教科目
              </label>
              <div class="am-u-sm-9 am-margin-top-xs input-field">
                <label v-for="item in $root.config.subjects" :key="item.subjectId" class="am-checkbox-inline">
                  <input type="checkbox" :value="item.subjectId" name="subjectIds" required v-model="formData.subjectIds">{{item.subjectName}}
                </label>
              </div>
            </div>



            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>所在区域
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.areaTeamId" :options="areaTeams" >
                  <option value="">请选择</option>
                </select2>

              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>所在业务组
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.busTeamId" :options="busTeams" >
                  <option value="">请选择</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>入职日期
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <date-picker v-model="formData.joinTime" >
                  <input type="text" placeholder="请选择入职日期" data-am-datepicker  required >
                </date-picker>
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>在职状态
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.status">
                  <option value="1">在职</option>
                  <option value="0">离职</option>
                </select2>
              </div>
            </div>


            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                头像
              </label>
              <div class="am-u-sm-9 am-form-file input-field">
                <file-upload extensions="jpg,png" @uploaded="uploadAvatar">
                  <img class="am-margin-top am-radius" :src="formData.avatarUrl" style="width:168px;height:168px">
                </file-upload>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>老师标签
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入老师标签,多个标签空格分开"   required v-model="formData.tags"/>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>老师签名
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入签名"  maxlength="100" required v-model="formData.signature"/>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                介绍
              </label>
              <div class="am-u-sm-9 input-field">
                <editor v-model="formData.simpleIntro"></editor>
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
        name:'teacher-form',
        data(){
            return{
                formData:{
                  areaTeamId:'',
                  busTeamId:'',
                  gradeIds:[],
                  subjectIds:[],
                  status:1,
                  avatarUrl:'http://static.yuyou100.com/t_avatar.gif'
                }
            }
        },
        created:function(){
         var teacherId  = this.$params('teacherId')
         if(teacherId){
          var _this = this
          io.post(io.apiAdminTeacherDetail,{ teacherId : teacherId },
            function(ret){
              if(ret.success){
                ret.data.gradeIds = ret.data.teachGradeIds ? ret.data.teachGradeIds.split(',') : []
                ret.data.subjectIds = ret.data.teachSubjectIds ? ret.data.teachSubjectIds.split(','):[]
                ret.data.joinTime = util.formatDate ( ret.data.joinTime )
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
            data.teachGradeIds = data.gradeIds.join(',')
            data.teachSubjectIds = data.subjectIds.join(',')
            io.post(io.apiAdminSaveOrUpdateTeacher,data,
            function(ret){
              complete.call()
              if(ret.success){
                _this.$toast('OK')
                _this.$router.push('/main/sys/teacher/list')
              }else{
                _this.$alert(ret.desc)
              }

            },
            function(){
              complete.call()
              _this.$alert('请求服务器失败')
            })
          },
          uploadAvatar:function(info){
            this.formData.avatarUrl = info.url
          }
        }
    }
</script>
