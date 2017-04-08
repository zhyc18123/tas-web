<template>
  <div class="am-g am-g-collapse">
    <div class="am-u-sm-5">
      <date-time-picker format="HH:mm" v-model="startTime">
        <input data-am-datetimepicker class="am-form-field">
      </date-time-picker>
    </div>
    <div class="am-u-sm-2 am-margin-top-xs">
      -
    </div>
    <div class="am-u-sm-5">
      <date-time-picker format="HH:mm" v-model="endTime">
        <input data-am-datetimepicker class="am-form-field">
      </date-time-picker>
    </div>
  </div>
</template>

<script>
    export default{
        data:function(){
            return {
                startTime : '00:00',
                endTime : '00:00'
            }
        },
        name:'time-picker',
        props:['value'],
        watch:{
            value:function(val){
              this.setVal(val)
            },
            startTime:function(val){
                this.input()
            },
            endTime:function(val){
              this.input()
            }
        },
        mounted:function(){
            this.setVal(this.value)
        },
        methods:{
            setVal:function(val){
                if(val){
                  var times = val.split('-')
                  this.startTime = times[0]
                  this.endTime = times[1]
                }
            },
            input:function(){
                this.$emit('input',this.startTime + '-' + this.endTime )
            }
        }

    }
</script>
