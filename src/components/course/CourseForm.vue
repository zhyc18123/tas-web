<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">课程信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>课程名称
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text"  class="am-form-field" placeholder="请输入课程名称" required v-model="formData.courseName" >
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>课程类型
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.courseTypeId" :options="courseTypeData" >
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
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>产品
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required  v-model="formData.productId" :options="products" >
                  <option value="请选择">请选择</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>季节
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required  v-model="formData.season"  >
                  <option value="">请选择</option>
                  <option value="春季班">春季班</option>
                  <option value="暑期班">暑期班</option>
                  <option value="秋季班">秋季班</option>
                  <option value="寒假班">寒假班</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>层级
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required  v-model="formData.level"  >
                  <option value="">请选择</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>讲数
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <input type="number" placeholder="输入讲数"  required min="1" step="1"  v-model="formData.lectureAmount" >
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>每一讲时长(分钟)
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <input type="number" placeholder="输入时长"  required min="1" step="1"  v-model="formData.lectureDuration" >
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>学位数
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <input type="number" placeholder="输入学位数"  required min="1" step="1" v-model="formData.quota" >
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>学费
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <input type="number" placeholder="输入学费"  required min="0" step="0.01"  v-model="formData.studyingFee" >
              </div>
            </div>

            <div class="am-form-group am-u-sm-12">
              <div class="am-tabs" data-am-tabs>
                <ul class="am-tabs-nav am-nav am-nav-tabs">
                  <li class="am-active"><a href="#tab1">课程简介</a></li>
                  <li><a href="#tab2">课程大纲</a></li>
                </ul>
                <div class="am-tabs-bd">
                  <div class="am-tab-panel am-fade am-in am-active" id="tab1">
                    <editor v-model="formData.courseDescription"></editor>
                  </div>
                  <div class="am-tab-panel am-fade" id="tab2">
                    <editor v-model="formData.courseOutline"></editor>
                  </div>
                </div>
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
                  areaTeamId:'',
                  busTeamId:'',
                  lectureAmount : 15,
                  lectureDuration : 45,
                  quota:0,
                  studyingFee : 0,
                  level : 5,
                  courseOutline : this.generateCourseOutlineTemplate(15)
                },
                products:[]
            }
        },
        watch:{
          'formData.lectureAmount':function (val) {
            if(!this.addMode){
              this.formData.courseOutline = this.generateCourseOutlineTemplate(val)
            }
          }
        },
        created:function(){
         var courseTemplateId  = this.$params('courseId');
         if(courseTemplateId){
          var _this = this
          io.post(io.apiAdminTemplateDetailDetail,{ courseTemplateId : courseTemplateId },
            function(ret){
              if(ret.success){
                _this.formData = ret.data
              }
            },
            function(){
              _this.$alert('请求服务器失败')
          })
         }

          this.loadProductData()
          this.loadCourseTypeData()


        },
        computed:{
          addMode:function(){
            return !!this.$params('courseId')
          },
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
              //
              if( !_this.formData.courseDescription){
                _this.$alert('请输入课程描述')
                return ''
              }
              if( !_this.formData.courseOutline){
                _this.$alert('请输入课程大纲')
                return ''
              }

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
            io.post(io.apiAdminSaveOrUpdateTemplateDetail,data,
            function(ret){
              complete.call()
              if(ret.success){
                _this.$toast('OK')
                _this.$router.push('/main/course/course/list')
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
            io.post(io.apiAdminChangeCourseTypeList,{},
              function(ret){
                if(ret.success){
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
          },
          loadProductData: function () {
            var _this = this
            io.post(io.apiAdminBaseProductList, {}, function (ret) {
              if (ret.success) {
                _this.products = ret.data.map(function (item) {
                  return {value: item.productId, text: item.name}
                })
              } else {
                _this.$alert(ret.desc)
              }
            })
          },
          generateCourseOutlineTemplate:function (lectureAmount) {
            var html = ''
            for(var i = 0 ;i < lectureAmount ; i++ ){
                html += '<p>第'+(i+1)+'讲：</p>'
            }
            return html

          }
        }
    }
</script>
