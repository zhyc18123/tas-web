<template>
  <window ref="win" title="调班">
    <component v-bind:is="currentStep" :regId="regId" @goStep="goStep" :args="args" @completed="$emit('completed');$refs.win.close()">
    </component>
  </window>
</template>

<script>
  import io from '../../lib/io'

  import ShiftClassStepOne from  './ShiftClassStepOne.vue'
  import ShiftClassStepTwo from  './ShiftClassStepTwo.vue'
  import ShiftClassStepThree from  './ShiftClassStepThree.vue'

  export default{
    data: function () {
      return {
        currentStep : 'step-one',
        args : { defaultAttendClassRecordId : '' },
        regId:'',
      }
    },
    components:{
      'step-one': ShiftClassStepOne,
      'step-two' :ShiftClassStepTwo,
      'step-three' :ShiftClassStepThree,
    },
    watch:{
      regId : function () {
        //选择其他重置回第一步
      }
    },
    methods:{
      goStep:function (which,data) {
        this.args[this.currentStep] = data || {}
        this.currentStep = which
      },
      show:function(){
        this.currentStep = 'step-one'
        this.$refs.win.show({
          width: 1200
        })
      }
    }
  }

</script>
