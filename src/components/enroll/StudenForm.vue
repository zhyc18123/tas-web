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
      save:function(complete){
        var _this = this
        var data = _this.formData
        io.post(io.studentSaveOrUpdate,data,
          function(ret){
            complete.call()
            if(ret.success){
              _this.$toast('OK')
              _this.$router.push('/main/enroll/student/list')
            }else{
              _this.$alert(ret.desc)
            }

          },
          function(){
            complete.call()
            _this.$alert('请求服务器失败')
          })
      },
      loadCourseTypeData:function(){
        var _this = this
        io.post(io.studentSaveOrUpdate,{},
          function(ret){
            if(ret.success){
                alert(123);
              _this.courseTypeData = ret.data.map(function(item){
                return {value:item.courseTypeId,text:item.name }
              })
            }else{
              _this.$alert(ret.desc)
            }

          },
          function(){
            _this.$alert('请求服务器失败')
          })
      },

      saveCompleted : function(){
        this.$router.push('/main/enroll/student/list')
      }
    }
  }
</script>
