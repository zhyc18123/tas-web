<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">期次信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group am-form-select">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>期次
              </label>
              <div class="am-u-sm-3 input-field am-u-end">
                <input type="number" class="am-form-field" min="1" step="1" placeholder="请输期次" required v-model="formData.periodNo">
              </div>
            </div>
            <div class="am-form-group am-form-select">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>段数
              </label>
              <div class="am-u-sm-3 input-field am-u-end">
                <input type="number" class="am-form-field" min="1" step="1" placeholder="请输段数" required v-model="formData.segments">
              </div>
            </div>

            <div class="am-form-group" v-for="(item,index) in segmentList">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>段次{{index + 1}}
              </label>
              <div class="am-u-sm-3 input-field">
                <date-picker v-model="item.startDate" >
                  <input type="text" class="am-form-field" placeholder="开始日期" data-am-datepicker readonly  required >
                </date-picker>
              </div>
              <div class="am-u-sm-1 input-field am-text-center">
                ~
              </div>
              <div class="am-u-sm-3 am-u-end input-field">
                <date-picker v-model="item.endDate" >
                  <input type="text" class="am-form-field" placeholder="结束日期" data-am-datepicker readonly  required >
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
import util from '../../lib/util'
    export default{
        data(){
            return{
                formData:{
                  segments: 1

                },
                segmentList:[{}]
            }
        },
        watch:{
          'formData.segments':function(val){
            var sl = [] ;
            for(var i = 0 ; i < val ; i++ ){
                sl.push({
                  startDate : this.formData && this.formData.segmentList && this.formData.segmentList[i] && this.formData.segmentList[i].startDate || '',
                  endDate : this.formData && this.formData.segmentList && this.formData.segmentList[i] && this.formData.segmentList[i].endDate || ''
                })
            }
            this.segmentList = sl
          }
        },
        created:function(){
         var periodId  = this.$params('periodId')
         if(periodId){
          var _this = this
          io.post(io.apiAdminPeriodDetail,{ periodId : periodId },
            function(ret){
              if(ret.success){
                _this.formData = ret.data
                for(var i = 0 ; i < ret.data.segmentList.length ;i++ ){
                  ret.data.segmentList[i].startDate = util.formatDate(ret.data.segmentList[i].startDate)
                  ret.data.segmentList[i].endDate = util.formatDate(ret.data.segmentList[i].endDate)
                }
                ret.data.segmentList
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
                _this.$root.$emit('reloadConfig')
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
            _this.formData.segmentList = JSON.stringify(this.segmentList)
            io.post(io.apiAdminSaveOrUpdatePeriod,_this.formData,
            function(ret){
              complete.call()
              if(ret.success){
                _this.$toast('OK')
                _this.$router.push('/main/sys/period/list')
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
