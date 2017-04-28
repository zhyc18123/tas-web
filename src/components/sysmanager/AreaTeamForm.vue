<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">区域信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>区域名
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入区域名" required v-model="formData.name">
              </div>
            </div>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>地区
              </label>
              <div class="am-u-sm-3 input-field">
                <select2 required v-model="formData.province" :options="provinces" @input="formData.city='';formData.district=''">
                  <option value="">请选择省份</option>
                </select2>
              </div>
              <div class="am-u-sm-3 input-field am-u-end">
                <select2 required v-model="formData.city" :options="cities" @input="formData.district=''">
                  <option value="">请选择城市</option>
                </select2>
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
import conf from '../../lib/conf'
    export default{
        data(){
            return{
                location:[],
                cityMap:{},
                districtMap:{},
                formData:{
                  province : '',
                  city : ''
                }
            }
        },
        created:function(){
         var areaTeamId  = this.$params('areaTeamId')
         if(areaTeamId){
          var _this = this
          io.post(io.apiAdminAreaTeamDetail,{ areaTeamId : areaTeamId },
            function(ret){
              if(ret.success){
                _this.formData = ret.data
              }
            },
            function(){
              _this.$alert('请求服务器失败')
          })
         }
         this.loadLocation()


        },
        computed:{
          provinces:function(){
            return this.location.map(function(item){
              return {value:item.n,text:item.n}
            })
          },
          cities:function(){
            var cities  = this.formData.province && this.cityMap[this.formData.province]
            if( !cities ){
              return []
            }
            return cities.map(function(item){
              return {value:item.n,text:item.n}
            })
          }
        },
        mounted:function(){
          var _this = this ;
          $('#' + this.id ).validator({
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
                _this.$root.$emit('reloadConfig')
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
            var _this = this
            io.post(io.apiAdminSaveAreaTeam,_this.formData,
            function(ret){
              complete.call()
              if(ret.success){
                _this.$toast('OK')
                _this.$router.push('/main/sys/areateam/list')
              }else{
                _this.$alert(ret.desc)
              }

            },
            function(){
              complete.call()
              _this.$alert('请求服务器失败')
            })
          },
          loadLocation:function(){
            var _this = this
            $.getJSON(conf.basePath + '/static/location/data.json',function(ret){
              _this.location  = ret
              for(var i =0 ; i < ret.length ; i++ ){
                _this.cityMap[ret[i].n] = ret[i].s
                for(var ii = 0 ; ii < ret[i].s.length ;ii++ ){
                  _this.districtMap[ ret[i].n + ret[i].s[ii].n ] = ret[i].s[ii].s
                }
              }
            })
          }
        }
    }

</script>
