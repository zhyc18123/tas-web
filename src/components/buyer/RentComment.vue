<template>

  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">商品评价</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>综合评价
              </label>
              <label>
                <el-rate v-model="formData.evaluation" show-text></el-rate>
              </label>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>您的感受
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <textarea cols="10" rows="10" required placeholder="请输入您的感受" v-model="formData.comment"/>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                上传图片
              </label>
              <div class="am-u-sm-9 am-form-file input-field">
                <file-upload extensions="jpg,png" @uploaded="uploadAvatar">
                  <img class="am-margin-top" :src="formData.imageUrl">
                </file-upload>
              </div>
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
          evaluation:null,
          comment: '',
          orderItemId: '',
          type: '',
          imageUrl:''
        },
      }
    },
    created: function () {
      this.formData.orderItemId = this.$params("orderItemId");
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
        _this.formData.type = 0;
        var data = _this.formData
        io.post(io.apiAdminAddComment, data,
          function (ret) {
            complete.call()
            if (ret.success) {
              _this.$toast('OK')
              _this.$router.push('/main/buyer/rentRecord/list');
            } else {
              _this.$alert(ret.desc)
            }

          },
          function () {
            complete.call()
            _this.$alert('请求服务器失败')
          })
      },
      uploadAvatar: function (info) {
        this.formData.imageUrl = info.url
      },
    }
  }

</script>
