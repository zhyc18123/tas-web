<template>
  <window ref="win" title="排老师">
    <component v-bind:is="currentStep" :courseClass="courseClass" @goStep="goStep" @completed="completed" :args="args">
    </component>
  </window>
</template>

<script>
  import io from '../../lib/io'

  import TeacherArrangementOne from  './TeacherArrangementOne.vue'
  import TeacherArrangementTwo from  './TeacherArrangementTwo.vue'

  export default{
    data: function () {
      return {
        currentStep : 'step-one',
        args : {},
        courseClass:{}
      }
    },
    components:{
      'step-one': TeacherArrangementOne,
      'step-two' :TeacherArrangementTwo
    },
    methods:{
      goStep:function (which,data) {
          this.currentStep = which
          this.args = data || {}
      },
      completed:function () {
        this.$emit('completed')
        this.$refs.win.close()
      },
      show:function(){
        this.currentStep = 'step-one'
        this.$refs.win.show( { width : 1000 } )
      }
    }
  }

</script>
