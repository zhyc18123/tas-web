<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">优惠规则信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>规则名称
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入名称" required v-model="formData.name">
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>优惠分类
              </label>
              <div class="am-u-sm-3 input-field  am-u-end">
                <select2 required v-model="formData.categoryId">
                  <option value="">请选择优惠分类</option>
                  <option v-for="item in discountCategoryList" :value="item.discountCategoryId" >{{item.name}}</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>优惠方式
              </label>
              <div class="am-u-sm-3 input-field  am-u-end">
                <select2 required v-model="formData.discountType">
                  <option value="">请选择优惠方式</option>
                  <option value="0">折扣</option>
                  <option value="1">金额</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>状态
              </label>
              <div class="am-u-sm-3 input-field  am-u-end">
                <select2 required v-model="formData.status">
                  <option value="">请选择状态</option>
                  <option value="0">不可用</option>
                  <option value="1">可用</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>优惠计算
              </label>
              <div class="am-u-sm-9 input-field  am-u-end">
                <textarea required v-model="formData.calFunction" rows="10"></textarea>
                <span class="am-text-xs">java/groovy</span>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>参数
              </label>
              <div class="am-u-sm-9  am-u-end">
                <div class="am-g am-margin-bottom-xs am-padding-left-xs" v-for="(param,index) in formData.params">
                  <div class="am-u-sm-2 input-field">
                    <select2 required v-model="param.type">
                      <option value="">数据类型</option>
                      <option value="string">字符串</option>
                      <option value="int">整数</option>
                      <option value="float">浮点数</option>
                      <option value="date">日期</option>
                    </select2>
                  </div>
                  <div class="am-u-sm-3 input-field">
                    <input type="text" class="am-form-field" placeholder="参数名" required v-model="param.name" >
                  </div>
                  <div class="am-u-sm-3 input-field">
                    <input type="text" class="am-form-field" placeholder="默认值" required v-model="param.value">
                  </div>
                  <div class="am-u-sm-3 input-field">
                    <input type="text" class="am-form-field" placeholder="说明" required v-model="param.remark">
                  </div>

                  <div class="am-u-sm-1 am-text-left am-u-end am-padding-top-xs">
                    <a href="javascript:;" @click="addParam"> <i class="am-icon-plus"></i></a>
                    <a href="javascript:;" @click="delParam(index)"><i class="am-icon-remove"></i></a>
                  </div>
                </div>
                <span class="am-text-xs">折扣参数使用百分比，如95%</span>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>优惠说明
              </label>
              <div class="am-u-sm-9 input-field  am-u-end">
                <textarea required v-model="formData.remark"></textarea>
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
  import conf from '../../lib/conf'
  import Select2 from "../base/Select2";


  export default{
    components: {Select2}, data(){
      return {
        discountCategoryList: [],
        formData: {
          discountRuleId : this.$params('discountRuleId'),
          status : 0 ,
          discountType : 0,
          params:[{}]
        }
      }
    },
    created: function () {

      this.loadDiscountCategoryList()
      this.loadDetail()


    },
    mounted: function () {
      var _this = this;
      $('#' + this.id).validator({
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
            _this.$root.$emit('reloadConfig')
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
        var data = Object.assign({},_this.formData)

        for(var p of data.params ){
          if(p.type  == 'int' && !/^\d+$/.test(p.value )){
            this.$alert(p.name +'的值只能是整数');
            complete()
            return
          }else if(p.type == 'float' && !/^\d+(.\d+)?$/.test(p.value)){
            this.$alert(p.name +'的值只能是浮点数');
            complete()
            return
          }else if(p.type  == 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(p.value)){
            this.$alert(p.name +'的值只能是日期，如2017-01-01');
            complete()
            return
          }
        }

        data.params = JSON.stringify(data.params)

        io.post(io.apiAdminDiscountSaveOrUpdateRule,data,
          function (ret) {
            complete.call()
            if (ret.success) {
              _this.$toast('OK')
              _this.$router.push('/main/discount/rule/list')
            } else {
              _this.$alert(ret.desc)
            }
          },
          function () {
            complete.call()
            _this.$alert('请求服务器失败')
          })
      },
      loadDetail:function(){
        if(!this.formData.discountRuleId){
            return
        }
        var _this = this
        io.post(io.apiAdminDiscountRuleDetail, {discountRuleId: this.formData.discountRuleId},
          function (ret) {
            if (ret.success) {
              ret.data.params = ret.data.params ? JSON.parse(ret.data.params) : [{}]
              _this.formData = ret.data
            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })
      },
      loadDiscountCategoryList: function () {
        io.post(io.apiAdminDiscountCategoryList, {
            pageNo: 1,
            pageSize: 100
          },
          (ret) => {
            if (ret.success) {
              this.discountCategoryList = ret.data.list
            } else {
              this.$alert(ret.desc)
            }
          },
          () => {
            this.$alert('请求服务器失败')
          })
      },
      addParam : function(){
        this.formData.params.push({})
      },
      delParam : function(index){
        if(this.formData.params.length <= 1){
          return
        }
        this.formData.params.splice(index,1)
      },
    }
  }

</script>
