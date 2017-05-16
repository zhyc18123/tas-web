<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">班级信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>


      <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
        <fieldset>

          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>所属课程
            </label>
            <div class="am-u-sm-6 input-field">
              <input type="text" placeholder="所属课程"  required  v-model="courseTemplateData.courseName"  readonly @click="$refs.selectCourse.show()">
            </div>
            <div class="am-u-sm-3 input-field">
              <button type="button" class="am-btn am-btn-default" @click="$refs.selectCourse.show()">选择</button>
            </div>
          </div>

          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>所在区域
            </label>
            <div class="am-u-sm-3 am-u-end input-field">
              <select2 required disabled v-model="formData.areaTeamId" :options="areaTeamsData">
                <option value="">请选择</option>
              </select2>
            </div>
          </div>
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>所在业务组
            </label>
            <div class="am-u-sm-3 am-u-end input-field">
              <select2 required v-model="formData.busTeamId" :options="busTeamsData">
                <option value="">请选择</option>
              </select2>
            </div>
          </div>
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>期数
            </label>
            <div class="am-u-sm-3 am-u-end input-field">
              <select2 required v-model="formData.periodId" :options="periods">
                <option value="">请选择</option>
              </select2>
            </div>
          </div>

          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>段次
            </label>
            <div class="am-u-sm-3 am-u-end input-field">
              <select2 required v-model="formData.segmentNo" :options="segments">
                <option value="">请选择</option>
              </select2>
            </div>
          </div>

          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>班级名
            </label>
            <div class="am-u-sm-9 input-field">
              <input  type="text" class="am-form-field" placeholder="输入班级名" required v-model="formData.className">
            </div>
          </div>

          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              校区
            </label>
            <div class="am-u-sm-6 input-field">
              <input type="text" placeholder="校区"  v-model="formData.campusName"  readonly @click="$refs.selectCampus.show()">
            </div>
            <div class="am-u-sm-3 input-field">
              <button type="button" class="am-btn am-btn-default" @click="$refs.selectCampus.show()">选择</button>
            </div>
          </div>

          <!--<div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>序号
            </label>
            <div class="am-u-sm-9 input-field">
              <input type="text" class="am-form-field" placeholder="输入序号" required v-model="formData.no">
            </div>
          </div>-->
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>学位数
            </label>
            <div class="am-u-sm-9 input-field">
              <input type="text" class="am-form-field" placeholder="输入学位数" required v-model="formData.quota">
            </div>
          </div>
          <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>学费
            </label>
            <div class="am-u-sm-9 input-field">
              <input type="number" class="am-form-field" placeholder="输入学费" min="0" step="0.01" required v-model="formData.studyingFee">
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
    <select-course ref="selectCourse" @ok="fillData2Class"></select-course>
    <select-campus ref="selectCampus" :areaTeamId="formData.areaTeamId" @ok="selectCampusCallback" ></select-campus>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import util from '../../lib/util'
  import SelectCourse from './SelectCourse'
  import SelectCampus from '../teachingresource/SelectCampus'

  export default{
    data(){
      return {
        formData: {
          areaTeamId: '',
          busTeamId: '',
          periodId: '',
          quota: '',
          studyingFee: '',
          campusName: ''
        },
        courseTemplateData: {},
        disable:false
      }
    },
    components: {
      'select-course':SelectCourse,
      'select-campus':SelectCampus
    },
    watch:{
      'formData.courseTemplateId':function(){
        this.formData.campusId = ''
        this.formData.campusName = ''
      }
    },
    created: function () {
      var courseClassId = this.$params('classId');
      if (courseClassId) {
        var _this = this;
        io.post(io.apiAdminCourseClassDetail, {courseClassId: courseClassId},
          function (ret) {
            if (ret.success) {
              _this.formData = ret.data.courseClass;
              _this.courseTemplateData = ret.data.courseTemplate;
            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })
      }
    },
    computed:{
      areaTeamsData: function () {
        var options = ( this.$root.config.areaTeams || [] )
          .map(function (item) {
            return {value: item.areaTeamId, text: item.name}
          })
        return options
      },
      busTeamsData: function () {
        var options = ( ( this.formData.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.formData.areaTeamId] || [] ) : [] )
          .map(function (item) {
            return {value: item.busTeamId, text: item.name}
          })
        return options
      },
      periods: function () {
        return this.$root.config.periods.map(function (item) {
          return {value: item.periodId, text: item.periodName}
        })
      },
      segments: function () {
        if(!this.formData.periodId){
          return []
        }
        var segments = 0 ;
        for(var i = 0 ;i < this.$root.config.periods.length ;i++ ){
          if(this.$root.config.periods[i].periodId == this.formData.periodId ){
            segments = this.$root.config.periods[i].segments
            break
          }
        }
        var ret = [] ;
        for(var i = 1 ;i <= segments ;i++  ){
          ret.push({value: i , text: i })
        }
        return ret
      }
    },
    mounted: function () {
      var _this = this;
      $('#' + this.id).validator({
        validate: function (validity) {

        },
        onValid: function (validity) {
          $(validity.field).closest('.input-field').find('.am-alert').hide();
        },
        onInValid: function (validity) {
          var $field = $(validity.field);
          var $group = $field.closest('.input-field');
          var $alert = $group.find('.am-alert');
          // 使用自定义的提示信息 或 插件内置的提示信息
          var msg = $field.data('validationMessage') || this.getValidationMessage(validity);

          if (!$alert.length) {
            $alert = $('<div class="am-alert am-alert-danger"></div>').hide().appendTo($group);
          }

          $alert.html(msg).show();
        },
        submit: function (e) {
          e.preventDefault();//因为点击事件往上冒泡到form e.preventDefault可以改变这种行为 或者button类型不要submit类型 ，OK懂了么en
          if( !_this.formData.courseDescription){
            _this.$alert('请输入课程描述')
            return ''
          }
          if( !_this.formData.courseOutline){
            _this.$alert('请输入课程大纲')
            return ''
          }
          var $submitBtn = $('button[type=submit]', e.target);
          $submitBtn.attr("disabled", "disabled")
          _this.$showLoading()
          var formValidity = this.isFormValid();
          var complete = function () {
            _this.$hiddenLoading()
            $submitBtn.removeAttr("disabled", "disabled")
          }
          if (formValidity) {
            _this.save(complete);
          } else {
            complete.call()
          }
        }
      });
    },
    methods: {
      save: function (complete) {
        var _this = this
        var data = _this.formData;
        io.post(io.apiAdminSaveOrUpdateClass, data,
          function (ret) {
            complete.call()
            if (ret.success) {
              _this.$toast('OK')
              _this.$router.push('/main/course/class/list')
            } else {
              _this.$alert(ret.desc)
            }

          },
          function () {
            complete.call()
            _this.$alert('请求服务器失败')
          })
      },
      fillData2Class: function (item) {
        this.formData.courseDescription = item.courseDescription
        this.formData.courseOutline = item.courseOutline
        this.formData.studyingFee = item.studyingFee
        this.formData.areaTeamId = item.areaTeamId
        this.formData.busTeamId = item.busTeamId
        this.formData.quota = item.quota
        this.formData.className = item.courseName;
        this.courseTemplateData.courseName = item.courseName;
        this.formData.courseTemplateId=item.courseTemplateId
      },
      selectCampusCallback:function(campus){
        this.formData.campusId = campus.campusId
        this.formData.campusName = campus.campusName
      }
    },
  }
</script>

