<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">分类信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>
                所属服务类型:
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 v-model="formData.type" required>
                  <option value="">请选择</option>
                  <option value="0">供应</option>
                  <option value="2">课室</option>
                  <option value="3">需求</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                 可选择父分类：
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required  v-model="formData.parentId" :options="serviceCategorys" >
                  <option value=" ">请选择</option>
                </select2>
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>分类名称
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入分类名称" v-model="formData.name" required>
              </div>
            </div>




            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>成本类型
              </label>
              <div class="am-u-sm-3  input-field am-u-end">
              <!--  <choose v-model="formData.feeCategoryId">-->
                  <select 　 v-model="formData.feeCategoryId"　data-placeholder="成本类型" style="min-width:300px;" class="chosen-select-deselect"  required>
                    <option value=""></option>
                    <option v-for="item in feeCategories" :value="item.feeCategoryId">{{item.name}}</option>
                  </select>
              <!--  </choose>-->
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs" >*</span>收入类型
              </label>
              <div class="am-u-sm-3  input-field am-u-end">
              <!--  <choose v-model="formData.incomeCategoryId">-->
                  <select v-model="formData.incomeCategoryId"　data-placeholder="收入类型" style="min-width:300px;" class="chosen-select-deselect" required>
                    <option value=""></option>
                    <option v-for="item in incomeCategories" :value="item.incomeCategoryId">{{item.name}}</option>
                  </select>
               <!-- </choose>-->
              </div>
            </div>



            <!--<div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>分类属性1
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入分类属性" v-model="formData.attribute1">
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>分类属性2
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入分类属性" v-model="formData.attribute2">
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>分类属性3
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入分类属性" v-model="formData.attribute3">
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>分类属性4
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入分类属性" v-model="formData.attribute4">
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>分类属性5
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入分类属性" v-model="formData.attribute5">
              </div>
            </div>-->

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
        productTypeData: [],
        formData: {
          categoryId:'',
          name:'',
          type:'',
        },
        category: [],
        feeCategories:[],
        incomeCategories:[],
        serviceCategorys:[]
      }
    },

    created: function () {
      var categoryId = this.$params('categoryId');
      if (categoryId) {
        var _this = this
        io.post(io.apiAdminCategoryDetail, {categoryId: categoryId},
          function (ret) {
            if (ret.success) {
              _this.formData = ret.data
            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })
      }
      //this.loadCategoryData();
      this.loadFeeCategoryData();
      this.loadIncomeCategoryData();

    },
    watch:{
      'formData.type':function(){
        this.loadServiceCategoryByType();
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
      save: function (complete) {
        var _this = this
        var data = _this.formData
        if(!this.formData.feeCategoryId){
          complete.call()
          this.$alert('请选择成本类型')
          return
        }
        if(!this.formData.incomeCategoryId){
          complete.call()
          this.$alert('请选择收入类型')
          return
        }
        io.post(io.apiAdminSaveCategory, data,
          function (ret) {
            complete.call()
            if (ret.success) {
              _this.$toast('OK')
              _this.$router.push('/main/serviceManager/category/list')
            } else {
              _this.$alert(ret.desc)
            }

          },
          function () {
            complete.call()
            _this.$alert('请求服务器失败')
          })
      },
      loadIncomeCategoryData: function () {
        var _this = this
        io.post(io.apiAdminSettlementAllIncomeCategory, {}, function (ret) {
          if (ret.success) {
            _this.incomeCategories = ret.data
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadFeeCategoryData: function () {
        var _this = this
        io.post(io.apiAdminSettlementAllFeeCategory, {}, function (ret) {
          if (ret.success) {
            _this.feeCategories = ret.data
          } else {
            _this.$alert(ret.desc)
          }
        })
      },


      loadCategoryData:function() {
        var _this = this
        io.post(io.apiAdminGetCategory, {}, function (ret) {
          if (ret.success) {
            _this.category = ret.data.map(function (item) {
              return {value: item.categoryId, text: item.name}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadCategoryData:function() {
        var _this = this
        io.post(io.apiAdminGetCategory, {}, function (ret) {
          if (ret.success) {
            _this.category = ret.data.map(function (item) {
              return {value: item.categoryId, text: item.name}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadServiceCategoryByType:function() {
        var _this = this
        _this.serviceCategorys=[];
        io.post(io.apiAdminGetCategoryByType, {type:_this.formData.type}, function (ret) {
          if (ret.success) {
             function getLengthByLevel(level) {
                 var length="";
                 level=parseInt(level);
                 for(var i=1;i<level;i++){
                     length=length+"-"
                 }
                 return length;
             }
            function toList(categoryList) {
              for (var i = 0; i < categoryList.length; i++) {
                var serviceCategory = categoryList[i]
                var minCategory = {
                  value: serviceCategory.value,
                  text: getLengthByLevel(serviceCategory.level)+serviceCategory.label
                }
                _this.serviceCategorys.push(minCategory)
                if (serviceCategory.children) {
                  toList(serviceCategory.children)
                }
              }
            }
            toList(ret.data)
            console.log(_this.serviceCategorys)


          } else {
            _this.$alert(ret.desc)
          }
        })
      },
    }
  }
</script>
