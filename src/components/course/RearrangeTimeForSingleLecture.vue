<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
        <div class="am-form-group ">
          <div class="am-u-sm-3 input-field">
            <date-picker v-model="formData.date">
              <input type="text" class="am-input-lg" placeholder="请选择上课日期" data-am-datepicker required>
            </date-picker>
          </div>

          <div class="am-u-sm-3 input-field ">
            <time-picker v-model="formData.time"></time-picker>
          </div>

          <div class="am-u-sm-3 input-field am-padding-top-xs">
            <label><input  :value="true" type="checkbox" v-model="formData.updateAfterLecture"/>后续讲次顺延</label>
          </div>

          <div class="am-u-sm-3 input-field am-u-end am-text-left">
            <button type="button" class="am-btn am-btn-primary" @click="save">保存</button>
          </div>

        </div>

      </form>
    </div>
  </div>

</template>

<script>
  import io from '../../lib/io'
  import util from '../../lib/util'
  import TimePicker from "../base/TimePicker"
  export default{
    components: {TimePicker},
    data(){
      return {
        formData:{
          date :'',
          time :'',
          updateAfterLecture : false
        }
      }
    },
    props: ['classLecture'],
    watch:{
      classLecture:function(){
        this.init()
      }
    },
    created:function(){
       this.init()
    },
    methods: {
      init:function(){
        this.formData.date = util.formatDate(this.classLecture.classDate)
        this.formData.time = this.classLecture.startTime + '-' + this.classLecture.endTime
      },
      save:function(){
          var _this  = this
          io.post(io.apiAdminRearrangeTimeForLecture,{
            classLectureId : this.classLecture.classLectureId ,
            date : this.formData.date,
            time : this.formData.time,
            updateAfterLecture : this.formData.updateAfterLecture
          },function(ret){
              if(ret.success){
                  _this.$emit('ok')
              }else{
                  _this.$alert(ret.desc ||  '处理失败')
              }
          })
      }

    }
  }
</script>
