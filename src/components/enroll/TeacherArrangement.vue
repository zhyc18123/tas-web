<template>
  <component v-bind:is="currentStep" :classId="classId" :isArrangeTeacher="isArrangeTeacher" @goStep="goStep" @clear="clear" :args="args">
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

    props: ['classId','isArrangeTeacher'],
    watch:{
      classId : function () {
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
      clear:function () {
        this.currentStep = 'step-one';
      }
    }
  }

</script>
