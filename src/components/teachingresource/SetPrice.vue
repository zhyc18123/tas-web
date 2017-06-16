<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
     <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
      <fieldset>

      <div class="am-form-group">
          <select2  required   v-model="formData.discountType">
            <option value="1">连续优惠</option>
            <option value="2">分段优惠</option>
          </select2>
      </div>

      <div  class="am-form-group" v-for="(item, index) in priceList" v-if="formData.discountType == 2">
        <label class="am-u-sm-1 am-form-label">
          <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>人数
        </label>
        <div class="am-u-sm-2 input-field">
          <input type="text" class="am-form-field" required placeholder=" " v-model="priceList[index].number" >
        </div>
        <label class="am-u-sm-2 am-form-label">
          <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>价格/人
        </label>
        <div class="am-u-sm-2 input-field">
          <input type="text" class="am-form-field" required placeholder="" v-model="priceList[index].price" >
        </div>
        <div class="am-u-sm-1 input-field">
          <a href="javascript:;" @click="addPrice"> <i class="am-icon-plus"></i></a>
          <a href="javascript:;" @click="delPrice(index)"><i class="am-icon-remove"></i></a>
        </div>
      </div>

      <div id ="div2" v-if="formData.discountType == 1">
         <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>可开课学位下限
            </label>
            <div class="am-u-sm-9 input-field">
              <input type="text" placeholder=""  required  v-model="formData.quotaMin" >
            </div>
          </div>
          <div class="am-form-group">
             <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>学位上限
            </label>
            <div class="am-u-sm-9 input-field">
              <input type="text" placeholder=""  required  v-model="formData.quotaMax" >
            </div>
          </div>
          <div class="am-form-group">
             <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>课程总价
            </label>
            <div class="am-u-sm-9 input-field">
              <input type="text" placeholder=""  required  v-model="formData.totalPrice" >
            </div>
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

  export default{
    data(){
      return{
        priceList:[{}],
        formData:{
          priceRange:'',
          discountType:'1',
        }
      }
    },
    props:['classId'],
    components:{ },
    computed:{
      grades:function(){
        return this.$root.config.grades.map(function(item){
          return {value:item.gradeId,text:item.gradeName}
        })
      }
    },
    created:function(){
      var studentId  = this.studentId
      if(studentId){
        var _this = this
        io.get(io.apiAdminStudentDetail,{ studentId : studentId },
          function(ret){
            if(ret.success){
              ret.data.student.birthday = util.formatDate(ret.data.student.birthday)
              _this.formData = ret.data.student
              _this.guardianList =  ret.data.guardianList && ret.data.guardianList.length == 0  ?  [{}] : ret.data.guardianList
            }
          },
          function(){
            _this.$alert('请求服务器失败')
          })
      }
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
      save:function(complete){
        var _this = this
        var data = _this.formData
        alert(data.discountType)
        var str=""
        for (var i = 0; i < _this.priceList.length; i++) {
           str = str + _this.priceList[i]["number"] + ":" + _this.priceList[i]["price"] + ","
        }   
        str = str.substring(0, str.length -1) 
        data.priceRange = str
        data.classId = _this.classId
        data.lowestPrice = _this.priceList[0]["price"]
        data.highestPrice = _this.priceList[_this.priceList.length - 1]["price"]
        io.post(io.apiAdminCrowdfundingSaveOrUpdate,data ,
          function(ret){
            complete.call()
            if(ret.success){
              _this.$toast('OK')
              _this.$emit('saveCompleted',ret.data)
            }else{
              _this.$alert(ret.desc)
            }

          },
          function(){
            complete.call()
            _this.$alert('请求服务器失败')
          })
      },
      addPrice : function(){
        this.priceList.push({})
      },
      delPrice : function(index){
        if(this.priceList.length <= 1){
          return
        }
        this.priceList.splice(index,1)
      },
      selectReferrer:function(student){
        this.formData.referrerId = student.studentId
        this.formData.referrerName = student.name
      }
    },
  
   
/*    $("#select").change(function(){
    alert("hhh")
    var selectedValue=$(this).val();
    if(selectedValue == 1){
        $("#div1").show();
        $("#div2").hide();
    }
     if(selectedValue == 2){
        $("#div2").show();
        $("#div1").hide();
    }
  }*/

  };

  
</script>

