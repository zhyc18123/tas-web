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
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>校区
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.campusId" :options="campuses"
                         @input="loadRoomData();formData.roomId=''">
                  <option value="">请选择</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>课室
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.roomId" :options="rooms"
                         @input="fillAServiceRentWithRoomData(formData.roomId)">
                  <option value="">请选择</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>省
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入省" required v-model="formData.province" disabled>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>市
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入市" required v-model="formData.city" disabled>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>区
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入区" required v-model="formData.district" disabled>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>多媒体
              </label>
              <div class="am-u-sm-9 input-field">
                <label class="am-radio-inline">
                  <input type="radio" value="1" name="isMultimedia" v-model="formData.isMultimedia" disabled> 是
                </label>
                <label class="am-radio-inline">
                  <input type="radio" value="0" name="_isMultimedia" v-model="formData.isMultimedia" disabled> 否
                </label>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>地址
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输地址" required v-model="formData.address" disabled>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>单价
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="number" class="am-form-field" placeholder="请输入价格" min="0" step="0.01" required
                       v-model="formData.price">
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs"></span>名称
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入名称" required
                       v-model="formData.productName">
              </div>
            </div>

            <!--图片-->
            <div class="am-form-group" v-for="(item,index) in serviceImages">
              <label class="am-u-sm-3 am-form-label" >
                <span v-if="index==0">图片</span>
              </label>
              <div class="am-u-sm-2 am-form-file input-field">
                <file-upload extensions="jpg,png" @uploaded="uploadImages">
                  <img class="am-margin-top am-radius" :src="item.imageUrl" v-model="serviceImages[index].imageUrl" style="width:168px;height:168px">
                </file-upload>
              </div>
              <div class="am-u-sm-7 input-field">
                <a href="javascript:;" @click="addProductImage"> <i class="am-icon-plus"></i></a>
                <a href="javascript:;" @click="delProductImage(index)"><i class="am-icon-remove"></i></a>
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
          isMultimedia: '0',
          type:"2"
        },
        campuses: [],
        rooms: [],
        serviceImages: [{}],
        productImage:[]
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
      this.loadCampusData();
      this.rooms = []
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
        //TODO:handler room
      save: function (complete) {
        var _this = this
        var data = _this.formData;
        io.post(io.apiAdminSaveServiceProduct, $.extend({
          productImages:JSON.stringify(this.productImage)
          }, data),
          function (ret) {
            complete.call();
            if (ret.success) {
              _this.$toast('OK')
//              _this.$router.push('/main/tradingService/rent/list')
            } else {
              _this.$alert(ret.desc)
            }
          },
          function () {
            complete.call();
            _this.$alert('请求服务器失败')
          })
      },
      loadCampusData: function () {
        var _this = this
        io.post(io.apiAdminAllCampus, {}, function (ret) {
          if (ret.success) {
            _this.campuses = ret.data.map(function (item) {
              return {value: item.campusId, text: item.campusName}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadRoomData: function () {
        var _this = this;
        if (!_this.formData.campusId) {
          _this.formData.province = '';
          _this.formData.city = '';
          _this.formData.district = '';
          _this.formData.isMultimedia = '';
          _this.formData.address = '';
          _this.formData.price = '';
          _this.rooms = [];
          return;
        }
        io.post(io.apiAdminRoomListOfCampus, {campusId: _this.formData.campusId}, function (ret) {
          if (ret.success) {
            _this.rooms = ret.data.map(function (item) {
              return {value: item.roomId, text: item.roomName}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      uploadImages: function (info) {
        console.log("info:"+info.url)
        this.productImage.push( info.url)
        console.log("array:"+this.productImage.toString())
        console.log("List:"+this.serviceImages.map(function (item) {
            return item.imageUrl;
          }))
      },
      fillAServiceRentWithRoomData: function (roomId) {
        var _this = this;
        if (!roomId) {
          _this.formData.province = '';
          _this.formData.city = '';
          _this.formData.district = '';
          _this.formData.isMultimedia = '';
          _this.formData.address = '';
          _this.formData.price = '';
          return;
        }
        io.post(io.apiAdminRoomDetail, {roomId: roomId},
          function (ret) {
            if (ret.success) {
              var selectRoom = ret.data;
              _this.formData.province = selectRoom.province;
              _this.formData.city = selectRoom.city;
              _this.formData.district = selectRoom.district;
              _this.formData.isMultimedia = selectRoom.isMultimedia;
              _this.formData.address = selectRoom.address;
              _this.formData.price = selectRoom.rent;
            }
          }, function () {
            _this.$alert('请求服务器失败')
          })
      },
      addProductImage :function () {
        this.serviceImages.push({});
      },
      delProductImage:function (index) {
        if(this.serviceImages.length <= 1){
          return
        }
        this.serviceImages.splice(index,1)
      }
    }
  }
</script>
