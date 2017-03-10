<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">学生信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>学生姓名
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text"  class="am-form-field" placeholder="输入学生名" required v-model="formData.name" >
              </div>
            </div>

            <!--<div class="am-form-group">-->
              <!--<label class="am-u-sm-3 am-form-label">-->
                <!--<span class="am-text-danger am-margin-right-xs am-text-xs">*</span>出生日期-->
              <!--</label>-->
              <!--<div class="am-u-sm-9 input-field">-->
                <!--<input type="date"  class="am-form-field" placeholder="输入出生日期" required v-model="formData.courseName" >-->
              <!--</div>-->
            <!--</div>-->


            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>性别
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required  v-model="formData.sex">
                  <option value="0">请选择</option>
                  <option value="1">男</option>
                  <option value="2">女</option>
                </select2>
              </div>
            </div>


            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>就读年级
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required  v-model="formData.gradeName">
                  <option value="0">请选择</option>
                  <option value="一年级">一年级</option>
                  <option value="二年级">二年级</option>
                  <option value="三年级">三年级</option>
                  <option value="四年级">四年级</option>
                  <option value="五年级">五年级</option>
                  <option value="六年级">六年级</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>就读学校
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <input type="text" placeholder="输入就读学校"  required min="1" step="1"  v-model="formData.address" >
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>学生手机
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <input type="number" placeholder="输入时长"  required min="1" step="1"  v-model="formData.phoneNo" >
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>就读年级
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <input type="number" placeholder="输入就读年级"  required min="1" step="1"  v-model="formData.gradeId" >
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
        courseTypeData:[],
        formData:{
          sex:''
        }
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
        io.post(io.studentSaveOrUpdate,data,
          function(ret){
            complete.call()
            if(ret.success){
              _this.$toast('OK')
              _this.$router.push('/main/enroll/student/list')
            }else{
              _this.$alert(ret.desc)
            }

          },
          function(){
            complete.call()
            _this.$alert('请求服务器失败')
          })
      },
      loadCourseTypeData:function(){
        var _this = this
        io.post(io.studentSaveOrUpdate,{},
          function(ret){
            if(ret.success){
                alert(123);
              _this.courseTypeData = ret.data.map(function(item){
                return {value:item.courseTypeId,text:item.name }
              })
            }else{
              _this.$alert(ret.desc)
            }

          },
          function(){
            _this.$alert('请求服务器失败')
          })
      }
    }
  }
</script>
