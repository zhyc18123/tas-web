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

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>上传图片
              </label>
              <div class="am-u-sm-9">
                <button type="button" class="am-btn am-btn-default am-btn-success  am-form-file">
                  <input id="uploadFile" @change="uploadImage" type="file" accept="application/formData">
                  <span class="am-icon-cloud-upload"></span>请选择图片上传
                </button>
              </div>
            </div>

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
                  <button type="submit" class="am-btn am-btn-primary">保存</button>
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
        imgId:''
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
    mounted:function(){
      var _this = this ;
      $('#' + this.id ).validator({
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
    methods: {
      save:function (complete) {
        var _this = this
        _this.formData.imageId = _this.imgId;
        var data = _this.formData;
        io.post(io.apiAdminSaveServiceProduct, $.extend({},data),
          function (ret) {
            complete.call();
            if (ret.success) {
              _this.$toast('OK')
              _this.$router.push('/main/tradingService/service/list')
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
        io.post(io.apiAdminGetAllCategoryDetail, {type:1}, function (ret) {
          if (ret.success) {
            _this.category = ret.data.map(function (item) {
              return {value: item.categoryId, text: item.name}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },

      //TODO:del
      uploadImage:function () {
        var _this = this;
        var formUrl = new FormData();
        formUrl.append("file",document.getElementById('uploadFile').files[0]);
        io.postUploadFile(io.apiAdminUploadFile,formUrl,function (ret) {
          if (ret.data.success){
            _this.imgId = ret.data.data
          }else {
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>
