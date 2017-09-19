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
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>年份
              </label>
              <div class="am-u-sm-6 am-u-end input-field">
                <date-picker v-model="year" >
                  <input type="text" placeholder="请选择年份" data-am-datepicker="{format: 'yyyy ', viewMode: 'years', minViewMode: 'years'}"  required >
                </date-picker>
              </div>
            </div>
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
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>暑假
                （{{formData.summerStartDate}} ~{{formData.summerEndDate}}）
              </label>
              <div class="am-u-sm-6 input-field">
                <input type="number"  class="am-form-field" placeholder="输入暑假成本" min="0" step="1" required v-model="formData.summerCost">
              </div>
              <div class="am-u-sm-3 input-field am-u-end">
                元/小时
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>寒假
                （{{formData.winterStartDate}} ~{{formData.winterEndDate}}）
              </label>
              <div class="am-u-sm-6 input-field">
                <input type="number"  class="am-form-field" placeholder="输入暑假成本" min="0" step="1" required v-model="formData.winterCost">
              </div>
              <div class="am-u-sm-3 input-field am-u-end">
                元/小时
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>周末（周六周日）
              </label>
              <div class="am-u-sm-6 input-field">
                <input type="number"  class="am-form-field" placeholder="输入周末成本" min="0" step="1" required v-model="formData.weekendCost">
              </div>
              <div class="am-u-sm-3 input-field am-u-end">
                元/小时
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>非周末（周一至周五）
              </label>
              <div class="am-u-sm-6 input-field">
                <input type="number"  class="am-form-field" placeholder="输入非周末成本" min="0" step="1" required v-model="formData.workingCost">
              </div>
              <div class="am-u-sm-3 input-field am-u-end">
                元/小时
              </div>
            </div>
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
import moment from 'moment'
    export default{
        data(){
            return{
                year : moment().years(),
                formData:{
                  status : '1',
                  seatAmount : '1',
                  year : '2018',
                  roomId : '',
                  roomName : '',
                  campusId : '',
                  isMultimedia : '1',
                  summerStartDate : '',
                  summerEndDate : '',
                  winterStartDate : '',
                  winterEndDate : '',
                  summerCost : '',
                  winterCost : '',
                  workingCost : '',
                  weekendCost : '',
                  summerWinterDateId : '',
                }
            }
        },
        created:function(){
          this.formData.campusId  = this.$route.query.campusId
          this.formData.roomId  = this.$route.query.roomId
          if(this.formData.campusId && !this.formData.roomId) {
            this.findSummerWinter()
          }
          if(this.formData.roomId){
          var _this = this
          io.post(io.apiAdminTradingRoomDetail,{ roomId : this.formData.roomId },
            function(ret){
              if(ret.success){
                _this.formData = ret.data
                _this.findSummerWinter()
              }
            },
            function(){
              _this.$alert('请求服务器失败')
          })
         }


        },
      watch: {
        year() {
          this.findSummerWinter()
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
          findSummerWinter() {
            var _this = this
            io.post(io.findSummerWinterByCampusId,{
//                todo campusId: _this.formData.campusId,
                campusId: '592165907283836928',
                year: _this.year,
                roomId: _this.formData.roomId,
              },
              function(ret){
                if(ret.success){
                  if(!ret.data.summerWinterDateId) {
                    _this.$confirm('该课室所属区域于'+_this.year+'年没有设置寒暑假时间',
                      function () {
                        _this.$router.push('/main/sys/vacation/setting')
                      });
                  } else {
                    ret.data.summerStartDate = moment(Number(ret.data.summerStartDate)).format('YYYY-MM-DD')
                    ret.data.summerEndDate = moment(Number(ret.data.summerEndDate)).format('YYYY-MM-DD')
                    ret.data.winterStartDate = moment(Number(ret.data.winterStartDate)).format('YYYY-MM-DD')
                    ret.data.winterEndDate = moment(Number(ret.data.winterEndDate)).format('YYYY-MM-DD')
                    _this.formData = Object.assign({}, _this.formData, ret.data)
                  }
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
