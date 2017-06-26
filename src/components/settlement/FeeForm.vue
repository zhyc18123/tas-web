<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">成本录入</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>备注
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text"  class="am-form-field" placeholder="请输入备注" required v-model="formData.remark">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>金额
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="number"  class="am-form-field" placeholder="请输入金额" required min="0" step="0.01" v-model="formData.amount">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>收款主体
              </label>
              <div class="am-u-sm-3 am-u-end input-field">

                <choose v-model="formData.receiverMainAccountId">
                  <select required data-placeholder="收款主体" style="min-width:300px;" class="chosen-select">
                    <option value=""></option>
                    <option v-for="item in mainAccounts" :value="item.mainAccountId">{{item.name}}</option>
                  </select>
                </choose>

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
import Choose from "../base/Choose";
    export default{
      components: {Choose}, data(){
            return{
                expensesTypes:[],
                formData:{
                  mainAccountId : this.$params('mainAccountId')
                },
                mainAccounts :[]
            }
        },
        created:function(){
          var feeId = this.$params('feeId');
          if (feeId) {
            var _this = this
            io.post(io.apiAdminSettlementFeelDetail, {feeId: feeId},
              function (ret) {
                if (ret.success) {
                  _this.formData = ret.data
                }
              },
              function () {
                _this.$alert('请求服务器失败')
              })
          }
          this.loadMainAccountList()
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
            if(!this.formData.receiverMainAccountId){
              complete.call()
              this.$alert('录入收款主体')
              return
            }

            var _this = this
            io.post(io.apiAdminSettlementSaveFee,_this.formData,
            function(ret){
              complete.call()
              if(ret.success){
                _this.$toast('OK')
                _this.$router.push('/main/settlement/fee/list/' + _this.formData.mainAccountId)
              }else{
                _this.$alert(ret.desc)
              }

            },
            function(){
              complete.call()
              _this.$alert('请求服务器失败')
            })
          },
          loadMainAccountList:function(){
            var _this = this
            io.post(io.apiAdminSettlementAllMainAccountList,{},function(ret){
              if(ret.success){
                _this.mainAccounts = ret.data;
              }else{
                _this.$alert(ret.desc)
              }
            })
          }
        }
    }
</script>
