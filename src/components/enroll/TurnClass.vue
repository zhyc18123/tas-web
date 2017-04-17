<template>
  <component v-bind:is="currentStep" :regId="regId" @goStep="goStep" :args="args" @completed="$emit('completed')">
  </component>
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
        args : {}
      }
    },
    components:{
      'step-one': TurnClassStepOne,
      'step-two' :TurnClassStepTwo,
      'step-three':TurnClassStepThree
    },

    props: ['regId'],
    watch:{
      regId : function () {
        //选择其他重置回第一步
          this.currentStep = 'step-one'
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods:{
      goStep:function (which,data) {
          this.currentStep = which
          this.args = data || {}
      }
    }
  }

</script>
