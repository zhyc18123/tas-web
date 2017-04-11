<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>服务分类
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.categoryId" :options="category">
                  <option value="">请选择</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>服务名称
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入服务名称" required v-model="formData.productName">
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>单价
              </label>
              <div class="am-u-sm-3 input-field">
                <input type="text" class="am-form-field" placeholder="请输入商品价格" required v-model="formData.price">
              </div>
              <div class="am-u-sm-6 input-field am-lg-text-left">
                元
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>单位
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入商品单位" required v-model="formData.unit">
              </div>
            </div>

            <!--<div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                上传图片
              </label>
              <div class="am-u-sm-9 am-form-file input-field">
                <file-upload extensions="jpg,png" @uploaded="uploadAvatar">
                  <img class="am-margin-top" :src="formData.avatarUrl">
                </file-upload>
              </div>
            </div>-->

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                服务描述
              </label>
              <div class="am-u-sm-9 input-field">
                <editor v-model="formData.content"></editor>
              </div>
            </div>

            <div class="am-form-group">
              <div class="am-u-sm-9 am-u-sm-push-3">
                <a href="javascript:void(0)" @click="saveServiceProduct">
                  <button class="am-btn am-btn-primary">保存</button>
                </a>
                <a href="javascript:void(0)" data-am-modal-close>
                  <button class="am-btn am-btn-primary">取消</button>
                </a>
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
          productName: '',
          content: '',
          price: '',
          unit: '',
          categoryId:'',
        },
        category:[],
      }
    },
    created: function () {
      var productId = this.$params('productId');
      if (productId) {
        var _this = this
        io.post(io.apiAdminServiceProductDetail, {productId: productId},
          function (ret) {
            if (ret.success) {
              _this.formData = ret.data
            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })
      }
      this.loadCategoryData()
    },
    computed: {},

    methods: {
      saveServiceProduct:function () {
        var _this = this
        var data = _this.formData
        io.post(io.apiAdminSaveServiceProduct, $.extend({},data),
          function (ret) {
            if (ret.success) {
              _this.$toast('OK')
              _this.$root.$emit('addSuccess:new')
            } else {
              _this.$alert(ret.desc)
            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })
        _this.$emit('addSuccess')
      },
      loadCategoryData: function () {
        var _this = this
        io.post(io.apiAdminGetAllCategoryDetail, {}, function (ret) {
          if (ret.success) {
            _this.category = ret.data.map(function (item) {
              return {value: item.categoryId, text: item.name}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>
