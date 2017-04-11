<template>
  <component v-bind:is="currentStep" :courseClass="courseClass" @goStep="goStep" @completed="completed" :args="args">
  </component>
</template>

<script>
  import io from '../../lib/io'

  import TeacherArrangementOne from  './TeacherArrangementOne.vue'
  import TeacherArrangementTwo from  './TeacherArrangementTwo.vue'

  export default{
    data: function () {
      return {
        currentStep : 'step-one',
        args : {}
      }
    },
    components:{
      'step-one': TeacherArrangementOne,
      'step-two' :TeacherArrangementTwo
    },

    props: ['courseClass'],
    watch:{
      'courseClass.classId' : function () {
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
      },
      completed:function () {
        this.$emit('arrangementSuccess')
      }
    }
  }

</script>
