<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">寒暑假设置</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>请选择年份
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <date-picker v-model="formData.year" >
                  <input type="text" placeholder="请选择年份" data-am-datepicker="{format: 'yyyy ', viewMode: 'years', minViewMode: 'years'}"  required >
                </date-picker>
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>请选择区域
              </label>
              <div class="am-u-sm-6 am-u-end input-field">
                <select2  required v-model="formData.areaTeamId" :options="areaTeams">
                  <option value="">请选择区域</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>暑假
              </label>
              <div class="am-u-sm-3 input-field">
                <date-picker v-model="formData.summerStartDate" >
                  <input type="text" placeholder="开始时间" data-am-datepicker readonly required >
                </date-picker>
              </div>
              <div class="am-u-sm-3 input-field am-u-end">
                <date-picker v-model="formData.summerEndDate" >
                  <input type="text" placeholder="结束时间" data-am-datepicker readonly required >
                </date-picker>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>寒假
              </label>
              <div class="am-u-sm-3 input-field">
                <date-picker v-model="formData.winterStartDate" >
                  <input type="text" placeholder="开始时间" data-am-datepicker readonly required >
                </date-picker>
              </div>
              <div class="am-u-sm-3 input-field am-u-end">
                <date-picker v-model="formData.winterEndDate" >
                  <input type="text" placeholder="结束时间" data-am-datepicker readonly required >
                </date-picker>
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
  import moment from 'moment'
  export default{
    data(){
      return{
        formData:{
          summerWinterDateId : "",
          areaTeamId : "",
          areaTeamName : "",
          year : "",
          summerStartDate : "",
          summerEndDate : "",
          winterStartDate : "",
          winterEndDate : "",
        }
      }
    },
    created:function(){
      this.formData.summerWinterDateId = this.$route.query.summerWinterDateId
      if(this.formData.summerWinterDateId){
        var _this = this
        io.post(io.findSummerWinterById,{
            summerWinterDateId : this.formData.summerWinterDateId,
          },
          function(ret){
            if(ret.success){
            ret.data.summerStartDate = moment(Number(ret.data.summerStartDate)).format('YYYY-MM-DD')
            ret.data.summerEndDate = moment(Number(ret.data.summerEndDate)).format('YYYY-MM-DD')
            ret.data.winterStartDate = moment(Number(ret.data.winterStartDate)).format('YYYY-MM-DD')
            ret.data.winterEndDate = moment(Number(ret.data.winterEndDate)).format('YYYY-MM-DD')
              _this.formData = ret.data
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
    computed: {
      areaTeams: function () {
        var options = ( this.$root.config.areaTeams || [] )
          .map(function (item) {
            return {value: item.areaTeamId, text: item.name}
          })
        return options
      },
    },

    methods:{
      save:function(complete){
        var _this = this
        io.post(io.saveOrUpdateSummerWinter,_this.formData,
          function(ret){
            complete.call()
            if(ret.success){
              _this.$toast('OK')
              _this.$router.push('/main/sys/vacation/setting')
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
      },
      selectCampusCallback:function(campus){
        this.formData.campusId = campus.campusId
        this.formData.campusName = campus.campusName
      }
    }
  }
</script>
