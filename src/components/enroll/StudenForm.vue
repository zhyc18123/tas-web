<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">学生信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <student-edit-from :studentId="studentId" v-on:saveCompleted="saveCompleted" ></student-edit-from>
      </div>
    </div>
  </div>
</template>


<script>
  import StudentEditForm from './StudentEditForm'
  export default{
    data(){
      return{
        studentId : ''
      }
    },
    components:{
      'student-edit-from': StudentEditForm
    },
    computed:{
      grades:function(){
        return this.$root.config.grades.map(function(item){
          return {value:item.gradeId,text:item.gradeName}
        })
      }
    },
    created:function(){
      var studentId  = this.$params('studentId')
      if(studentId){
        this.studentId = studentId
      }
    },
    methods:{
      saveCompleted : function(studentId){
        this.$router.push('/main/enroll/student/reg/' + studentId)
      }
    }
  }
</script>
`
