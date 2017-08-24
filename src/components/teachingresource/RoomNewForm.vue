<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">教室信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>教室名
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text"  class="am-form-field" placeholder="输入教室名" required v-model="formData.roomName">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>座位数
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="number"  class="am-form-field" placeholder="输入座位数" min="0" step="1" required v-model="formData.seatAmount">
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>是否多媒体教室
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.isMultimedia">
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>成本（元/年）
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="number"  class="am-form-field" placeholder="输入年成本" min="0" step="1" required v-model="formData.yearCost">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>成本（元/月）
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="number"  class="am-form-field" placeholder="输入月成本" min="0" step="1" required v-model="formData.monthCost">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>成本（元/周）
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="number"  class="am-form-field" placeholder="输入周成本" min="0" step="1" required v-model="formData.weekCost">
              </div>
            </div>




            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>暑假（7.1 ~8.31）(元/小时)
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="number"  class="am-form-field" placeholder="输入暑假成本" min="0" step="1" required v-model="formData.summerCost">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>寒假（1.15 ~2.15）（元/小时）
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="number"  class="am-form-field" placeholder="输入寒假成本" min="0" step="1" required v-model="formData.winterCost">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>工作日高峰期(周一~周五，8:00~18:00)（元/小时）
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="number"  class="am-form-field" placeholder="输入工作日高峰期成本" min="0" step="1" required v-model="formData.workingPeakCost">
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>非工作日高峰期（元/小时）
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="number"  class="am-form-field" placeholder="输入非工作日高峰期成本" min="0" step="1" required v-model="formData.workingNoPeakCost">
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>周末高峰期（周六~周日，8:00~18:00）（元/小时）
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="number"  class="am-form-field" placeholder="输入周末高峰期成本" min="0" step="1" required v-model="formData.weekendPeakCost">
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>周末非高峰期（元/小时）
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="number"  class="am-form-field" placeholder="输入周末非高峰期成本" min="0" step="1" required v-model="formData.weekendNoPeakCost">
              </div>
            </div>



<!--            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>起始日期
              </label>
              <div class="am-u-sm-3 am-u-end  input-field">
                <date-picker v-model="formData.startDate" >
                  <input type="text" class="am-form-field" placeholder="请选择起始日期" data-am-datepicker readonly >
                </date-picker>
              </div>

            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>结束日期
              </label>
              <div class="am-u-sm-3 am-u-end  input-field">
                <date-picker v-model="formData.endDate" >
                  <input type="text" class="am-form-field" placeholder="请选择结束日期" data-am-datepicker readonly >
                </date-picker>
              </div>
            </div>-->

      <!--      <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>可用日期起
              </label>

              <date-picker class="am-u-sm-7 am-u-end  input-field" v-model="query.startDate">
                <input type="text" placeholder="" data-am-datepicker readonly required>
              </date-picker>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>可用日期止
              </label>
              <date-picker class="am-u-sm-7 am-u-end  input-field" v-model="query.endDate">
                <input type="text" placeholder="" data-am-datepicker readonly required>
              </date-picker>
            </div>-->


            <!--
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>每小时租金
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="number"  class="am-form-field" placeholder="输入租金" min="0" step="1" required v-model="formData.rent">
              </div>
            </div>
            -->

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                状态
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select required  v-model="formData.status" >
                  <option value="">请选择</option>
                  <option value="0">未启用</option>
                  <option value="1">正常</option>
                </select>
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
    export default{
        data(){
            var campusId  = this.$route.query.campusId
            return{
                formData:{
                  status : '1',
                  campusId : campusId
                }
            }
        },
        created:function(){
         var roomId  = this.$params('roomId')
         if(roomId){
          var _this = this
          io.post(io.apiAdminTradingRoomDetail,{ roomId : roomId },
            function(ret){
              if(ret.success){
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

        methods:{
          save:function(complete){
            var _this = this
            io.post(io.apiAdminTradingSaveOrUpdateRoom,_this.formData,
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
          },
          uploadAvatar:function(info){
            this.formData.avatarUrl = info.url
          }
        }
    }
</script>
