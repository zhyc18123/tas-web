<template>
  <window class="m-paper-detail" ref="win" title="试卷详情">
   <div>
     <el-form v-if="questions.length > 0" ref="query" label-width="210px" class="container">
       <el-form-item class="question-number-btn" label="题目：">
         <el-button :type="currentQuestionNo === index ? 'primary': 'default'" @click="currentQuestionNo = index" v-for="(item,index) in questions">{{index + 1}}</el-button>
       </el-form-item>
       <hr>
       <div>
         <el-form-item label="题型：" prop="questionType">
           <div>{{questions[currentQuestionNo].questionType === '0' ? '单选题': '填空题'}}</div>
         </el-form-item>
         <el-form-item label="题干：" prop="body">
           <div v-html="questions[currentQuestionNo].body"></div>
         </el-form-item>
         <el-form-item v-if="questions[currentQuestionNo].questionType == 0" label="标准答案：" prop="answer">
           <el-radio disabled class="radio" v-for="item in questions[currentQuestionNo].answerConfig.items" v-model="questions[currentQuestionNo].answer"
                     :label="item">{{item}}</el-radio>
         </el-form-item>
         <div v-else>
           <el-form-item class="input-answer" label="标准答案（注意答案顺序）：">
             <el-input disabled v-for="(item,index) in questions[currentQuestionNo].inputAnswers" type="Number"
                       :placeholder="'第'+ (index+1) +'个答案'" v-model="item.answer"></el-input>
           </el-form-item>
         </div>
         <el-form-item class="" label="分值：" prop="score">
           <div>{{questions[currentQuestionNo].score}}</div>
         </el-form-item>
       </div>
     </el-form>
     <div class="container" v-else>
       该试卷还没有录入题目，<a @click="handleToTopicForm">前往</a>
     </div>
   </div>
  </window>
</template>

<script>
  import io from '../../lib/io'

  export default{
    data: function () {
      return {
        examPaperId: '',
        currentQuestionNo: 0,
        questions: [{
          answer: '',
          inputAnswersLength: 1,
          score: '',
          answerConfig: {
            items: ["A", "B", "C", "D"]
          },
          inputAnswers: [{
            answer: ''
          }],
          questionType: '0',
        }],
      }
    },
    created () {
      if (this.examPaperId) {
        this.examPaperDetail(this.examPaperId)
      }
    },
    methods:{
      handleToTopicForm() {
        this.$router.push('/main/measurement/exam/addTopic?examPaperId='+ this.examPaperId)
        this.$refs.win.close()
      },
      examPaperDetail() {
        let _this =this;
        if (this.examPaperId) {
          io.post(io.questionsOfExamPaper, {
            examPaperId : this.examPaperId
          }, function (ret) {
            if (ret.success) {
              ret.data.questions.map(val => {
                if (val.questionType === '0') {
                  val.answerConfig = JSON.parse(val.answerConfig)
                  val.answer = val.answer && JSON.parse(val.answer)[0]
                } else {
                  val.answerConfig = JSON.parse(val.answerConfig)
                  val.inputAnswers = val.answer && JSON.parse(val.answer).map((val, index) => {
                    return {answer: val}
                  })
                }
              })
              _this.questions = ret.data.questions;
            } else {
              _this.$alert(ret.desc)
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
