<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-body am-fr">
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>商品分类
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.categoryId" :options="category">
                  <option value="">请选择</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>商品名称
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入商品名称" required v-model="formData.productName">
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>商品价格
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入商品价格" required v-model="formData.price">
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

            <!--图片-->
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span>图片</span>
              </label>
              <div class="am-u-sm-9 am-form-file input-field">
                <file-upload extensions="jpg,png" @uploaded="uploadImages">
                  <div class="am-inline-block" v-for="(item, index) in productImages" style="margin-left: 10px">
                    <img class="am-margin-top am-radius" :src="productImages[index]" style="width:168px;height:168px">
                  </div>
                  <a class="am-align-right" href="javascript:;" @click="clearImages"> <i
                    class="am-icon-btn-md am-icon-trash-o"></i></a>
                </file-upload>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                商品描述
              </label>
              <div class="am-u-sm-9 input-field">
                <editor v-model="formData.content"></editor>
              </div>
            </div>


            <div class="am-form-group">
              <div class="am-u-sm-9 am-u-sm-push-3">
                <button type="submit" class="am-btn am-btn-primary">保存</button>
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
          productName: '',
          content: '',
          price: '',
          unit: '',
          categoryId: ''
        },
        category: [],
        productImages: []
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
          }),
        io.post(io.apiAdminServiceProductImages, {productId: productId},
          function (ret) {
            if (ret.success) {
              _this.productImages = ret.data
            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })
      }
      this.loadCategoryData();
    },
    mounted: function () {
      var _this = this;
      $('#' + this.id).validator({
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
        _this.formData.imageId = _this.imgId;
        var data = _this.formData;
        io.post(io.apiAdminSaveServiceProduct, $.extend({
            productImages: JSON.stringify(this.productImages)
          }, data),
          function (ret) {
            complete.call();
            if (ret.success) {
              _this.$toast('OK')
              _this.$router.push('/main/tradingService/product/list');
            } else {
              _this.$alert(ret.desc)
            }
          },
          function () {
            complete.call();
            _this.$alert('请求服务器失败')
          })
      },

      loadCategoryData: function () {
        var _this = this
        io.post(io.apiAdminGetAllCategoryDetail, {type: 0}, function (ret) {
          if (ret.success) {
            _this.category = ret.data.map(function (item) {
              return {value: item.categoryId, text: item.name}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      uploadImages: function (info) {
        this.productImages.push(info.url)
      },
      clearImages: function () {
        this.productImages = [];
      }
    }
  }
</script>
