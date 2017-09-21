<template>
  <window ref="win" title="转班">
    <component v-bind:is="currentStep" :regId="regId" @goStep="goStep" :args="args" @completed="$emit('completed');$refs.win.close()">
    </component>
  </window>
</template>

<script>
  import io from '../../lib/io'

  import TurnClassStepOne from  './TurnClassStepOne'
  import TurnClassStepTwo from  './TurnClassStepTwo'
  import TurnClassStepThree from './TurnClassStepThree'

  export default{
    data: function () {
      return {
        currentStep : 'step-one',
        args : {},
        regId:''
      }
    },
    components:{
      'step-one': TurnClassStepOne,
      'step-two' :TurnClassStepTwo,
      'step-three':TurnClassStepThree
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
