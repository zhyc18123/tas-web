<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12 m-fee-add" >
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
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>收款主体
              </label>
              <div class="am-u-sm-3 am-u-end input-field">

                <choose v-model="formData.receiverMainAccountId">
                  <select required data-placeholder="收款主体" style="min-width:300px;" class="chosen-select">
                    <option value=""></option>
                    <option v-for="item in mainAccounts" :value="item.mainAccountId">{{  {'a':'【公共结算】','areaTeam':'【区域】','busTeam':'【业务组】','teacher':'【老师】',}[item.tag] }}{{item.name}}</option>
                  </select>
                </choose>

              </div>
            </div>


            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>金额
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="number"  class="am-form-field" placeholder="" required min="0" step="0.01" v-model="formData.amount">
              </div>
            </div>

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
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>成本类型
              </label>
              <div class="am-u-sm-3  input-field am-u-end">
                <el-cascader
                  :options="feeCategories"
                  v-model="feeCategory"
                  @change="handleChange">
                </el-cascader>
              </div>
            </div>

            <div v-show="needShareTime" class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span> 该费用发生时间段
              </label>
                <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
                  <div class="am-form-group">
                    <date-picker v-model="formData.shareStart">
                      <input type="text" class="am-form-field" placeholder="开始日期" data-am-datepicker readonly>
                    </date-picker>
                  </div>
                </div>

                <div class="am-u-sm-12 am-u-md-6 am-u-lg-3" style="float: left">
                  <div class="am-form-group">
                    <date-picker v-model="formData.shareEnd">
                      <input type="text" class="am-form-field" placeholder="结束日期" data-am-datepicker readonly>
                    </date-picker>
                  </div>
                </div>
            </div>

            <div v-show="needMultMainBody" class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>该笔费用所关联的业务组
              </label>
              <div class="am-u-sm-9  input-field am-u-end">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox v-for="item in associationMainAccounts" :label="item.mainAccountId">{{item.name}}</el-checkbox>
                </el-checkbox-group>
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
              expensesTypes:[],
              formData:{
                mainAccountId : this.$params('mainAccountId'),
                feeCategoryId : '',
                tags : [],
                shareStart: '',
                shareEnd: '',
                shareMainAccountIds: '',
                shareMainAccountNames: '',
              },
              feeCategory: [],
              checkList: [],
              mainAccounts :[],
              associationMainAccounts :[],
              courseTypes :[],
              products:[],
              needShareTime: false,
              needMultMainBody: false,
              feeCategories:[]
            }
        },
        created:function(){
          var feeId = this.$params('feeId');
          if (feeId) {
            var _this = this
            io.post(io.apiAdminSettlementFeeDetail, {feeId: feeId},
              function (ret) {
                if (ret.success) {
                  _this.formData = ret.data
                  _this.needShareTime = ret.data.needShareTime === '1'
                  _this.needMultMainBody = ret.data.needMultMainBody === '1'
                  if(_this.formData.shareStart && _this.formData.shareEnd) {
                    _this.formData.shareStart = moment(parseInt(_this.formData.shareStart)).format('YYYY-MM-DD')
                    _this.formData.shareEnd = moment(parseInt(_this.formData.shareEnd)).format('YYYY-MM-DD')
                  }
                  if (_this.formData.shareMainAccountIds) {
                    _this.checkList = _this.formData.shareMainAccountIds.split(',')
                  }
                  if (_this.formData.parentFeeCategoryId) {
                    _this.feeCategory = [_this.formData.parentFeeCategoryId, _this.formData.feeCategoryId]
                  } else {
                    _this.feeCategory = [_this.formData.feeCategoryId]
                  }
                }
              },
              function () {
                _this.$alert('请求服务器失败')
              })
          }
          this.loadMainAccountList()
          this.getOwnMainCount()
          this.loadProductData()
          this.loadFeeCategoryData()
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
          handleChange(value) {
              var _this = this
            this.feeCategories.map((val) => {
              if(val.children) {
                  val.children.map((i) =>{
                    if(i.value === value[value.length-1]) {
                      _this.needShareTime = i.needShareTime === '1'
                      _this.needMultMainBody = i.needMultMainBody === '1'
                    }
                  })
              } else {
                if(val.value === value[value.length-1]) {
                  _this.needShareTime = val.needShareTime === '1'
                  _this.needMultMainBody = val.needMultMainBody === '1'
                }
              }
            })
          },
          save:function(complete){
            if(!this.formData.receiverMainAccountId){
              complete.call()
              this.$alert('录入收款主体')
              return
            }

            if(this.feeCategory.length === 0){
              complete.call()
              this.$alert('请选择成本类型')
              return
            } else {
                this.formData.feeCategoryId = this.feeCategory[this.feeCategory.length -1]
            }

            if(this.needShareTime) {
              if(!this.formData.shareStart || !this.formData.shareEnd) {
                complete.call()
                this.$alert('请选择时间段')
                return
              }
            } else{
              this.formData.shareStart = ''
              this.formData.shareEnd = ''
            }

            if(this.needMultMainBody) {
              if(this.checkList.length === 0) {
                complete.call()
                this.$alert('请选择业务组')
                return
              } else {
              	var array = []
                this.formData.shareMainAccountIds = this.checkList.join(',')
                this.checkList.map((val) => {
                	this.associationMainAccounts.map((i) => {
                		if(i.mainAccountId === val) {
                      array.push(i.name)
                    }
                  })
                })
                this.formData.shareMainAccountNames = array.join(',')
              }
            } else{
              this.formData.shareMainAccountIds = ''
              this.formData.shareMainAccountNames = ''
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
          loadCourseTypeData:function(){
            var _this = this
            io.post(io.apiAdminChangeCourseTypeList,{},
              function(ret){
                if(ret.success){
                  _this.courseTypes = ret.data
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
                _this.products = ret.data
              } else {
                _this.$alert(ret.desc)
              }
            })
          },
          loadFeeCategoryData: function () {
            var _this = this
            io.post(io.apiAdminSettlementFeeCategoryTreeMap, {}, function (ret) {
              if (ret.success) {
                _this.feeCategories = ret.data
              } else {
                _this.$alert(ret.desc)
              }
            })
          },
          loadMainAccountList:function(){
            var _this = this
            io.post(io.apiAdminSettlementAllMainAccountListWithoutStudent,{},function(ret){
              if(ret.success){
                _this.mainAccounts = ret.data;
              }else{
                _this.$alert(ret.desc)
              }
            })
          },
          getOwnMainCount:function(){
            var _this = this
            io.post(io.ownMainCount,{},function(ret){
              if(ret.success){
                _this.associationMainAccounts = ret.data;
              }else{
                _this.$alert(ret.desc)
              }
            })
          }
        }
    }
</script>

<style lang="less">
  .m-fee-add {
    .am-form-success label {
      color: #666;
    }
    .el-checkbox-group {
      .el-checkbox:first-child {
        margin-left: 15px;
      }
    }
  }
</style>
