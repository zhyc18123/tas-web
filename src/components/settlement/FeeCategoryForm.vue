<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12 m-feeCategory-add">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">成本类型信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group tpl-table-list-select">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>可选父分类
              </label>
              <el-select class="am-u-sm-3 input-field" style="float: left;" v-model="formData.parentFeeCategoryId" placeholder="请选择">
                <el-option
                  v-for="item in feeCategories"
                  :key="item"
                  :label="item.name"
                  :value="item.feeCategoryId">
                </el-option>
              </el-select>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>名称
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入名称" v-model="formData.name" required>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>备注
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入备注" v-model="formData.remark" required>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>是否选择时间段
              </label>
              <div class="am-u-sm-9 input-field">
                <el-radio class="radio" v-model="formData.needShareTime" label="1">是</el-radio>
                <el-radio class="radio" v-model="formData.needShareTime" label="0">否</el-radio>
              </div>
            </div>

            <div class="am-form-group tpl-table-list-select">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>对应收入类型
              </label>
              <el-select class="am-u-sm-3 input-field" style="float: left;" v-model="formData.incomeCategoryId" placeholder="请选择">
                <el-option
                  v-for="item in incomeCategoryList"
                  :key="item"
                  :label="item.name"
                  :value="item.incomeCategoryId">
                </el-option>
              </el-select>
            </div>

            <div class="am-form-group">
              <div class="am-u-sm-9 am-u-sm-push-3">
                <button type="submit" class="am-btn am-btn-primary am-radius">保存</button>
                <button type="button" class="am-btn am-btn-primary am-radius" @click="$router.go(-1)">取消</button>
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
      return {
        formData: {
          needShareTime: '',
          incomeCategoryId: '',
          parentFeeCategoryId: ''
        },
        editable:true,
        incomeCategoryList: [],
        feeCategories: []
      }
    },

    created: function () {
      var feeCategoryId = this.$params('feeCategoryId');
      if (feeCategoryId) {
        var _this = this
        io.post(io.apiAdminSettlementFeeCategoryDetail, {feeCategoryId: feeCategoryId},
          function (ret) {
            if (ret.success) {
              _this.formData = ret.data
            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })
      }
      this.editable = !feeCategoryId
      this.loadIncomeCategoryList()
      this.loadFeeCategory()
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
          e.preventDefault();
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
      loadIncomeCategoryList:function(){
        var _this = this
        io.post(io.apiAdminSettlementIncomeCategoryList,{
          pageNo:1,
          pageSize:100
        },function(ret){
          if(ret.success){
            _this.incomeCategoryList = ret.data.list
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      loadFeeCategory:function(){
        var _this = this
        io.post(io.apiAdminSettlementFeeCategoryTreeMap,{},function(ret){
          if(ret.success){
            _this.feeCategories = ret.data
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      save: function (complete) {
        var _this = this
        var data = _this.formData
        io.post(io.apiAdminSettlementSaveOrUpdateFeeCategory, data,
          function (ret) {
            complete.call()
            if (ret.success) {
              _this.$toast('OK')
              _this.$router.push('/main/settlement/feeCategory/list')
            } else {
              _this.$alert(ret.desc)
            }

          },
          function () {
            complete.call()
            _this.$alert('请求服务器失败')
          })
      }
    }
  }
</script>
<style lang="less">
  .m-feeCategory-add {
    .am-selected-list {
      height: 230px;
      overflow-y: scroll;
    }
  }
</style>
