<template>
  <window class="m-paper-detail" ref="win" title="试卷详情">
   <div>
     <el-form v-if="questions.length > 0" ref="query" label-width="210px" class="container">
       <el-form-item class="question-number-btn" label="题目：">
         <el-button :type="currentQuestionNo === index ? 'primary': 'default'" @click="currentQuestionNo = index" v-for="(item,index) in questions">{{index + 1}}</el-button>
       </el-form-item>
       <hr>
       <div>
         <el-form-item label="题干：" prop="body">
           <div v-html="questions[currentQuestionNo].content"></div>
         </el-form-item>
         <el-form-item class="" label="分值：" prop="score">
           <div>{{questions[currentQuestionNo].score}}</div>
         </el-form-item>
       </div>
     </el-form>
     <div class="container" v-else>
       该试卷还没有录入题目，<el-button type="text" @click="handleToTopicForm">前往</el-button>
     </div>
   </div>
  </window>
</template>

<script>
  import io from '../../lib/io'

  export default{
    data: function () {
      return {
        questionnaireId: '',
        currentQuestionNo: 0,
        questions: []
      }
    },
    created () {
      if (this.questionnaireId) {
        this.examPaperDetail(this.questionnaireId)
      }
    },
    methods:{
      handleToTopicForm() {
        this.$router.push('/main/research/newQuestion?questionnaireId='+ this.questionnaireId)
        this.$refs.win.close()
      },
      examPaperDetail() {
        if (this.questionnaireId) {
          io.post(io.questionList, {
            questionnaireId : this.questionnaireId
          },  (ret)=> {
            if (ret.success) {
              ret.data.map((item)=>{
                item.content=item.content.replace(/\n|\r\n/g,'<br/>');
              })
this.questions=ret.data;
            } else {
              this.$alert(ret.desc)
            }
          })
        }
      },
      show:function(){
        this.$refs.win.show( { width : 1000 } )
        this.examPaperDetail()
      }
    }
  }

</script>
<style lang="less" scoped>
  .container {
    padding: 40px;
  }
  .el-form {
    text-align: left;
    .input-answer {
      .el-input {
        width: 30%;
        margin-right: 1%;
      }
    }
  }
  .el-form-item__content {
    text-align: left;
  }
  .question-number-btn {
    .el-button {
      margin-bottom: 10px;
      margin-right: 10px;
    }
    .el-button+.el-button {
      margin-left: 0px;
    }
  }
  .am-text-center .el-form-item__content {
    text-align: left;
  }
</style>
<style>
  .m-paper-detail .el-radio__input.is-disabled.is-checked .el-radio__inner {
    border-color: #20a0ff;
    background: #20a0ff;
  }
</style>
