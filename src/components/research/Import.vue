<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">结果录入</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <question-detail :questionDetail='questionDetail' :questionnaireId='questionnaireId' :classId='classId'/>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import util from '../../lib/util'
  import QuestionDetail from './QuestionDetail'
  export default{
    data() {
      return {
        classId: '',
        questionnaireId:'',
        questionDetail:{courseClass:{},questionnaire:{},questionnaireQuestionList:[]},
        // questions: [{
        //   questionnaireQuestionNo:'',
        //   content: '',
        //   score: '',
        // }],
        // currentQuestionNo: 0,
        disabledBtn: false,
        isEdit: false,
        rules: {
          questionType: [
            { required: true, message: '请选择题型', trigger: 'blur' }
          ],
          body: [
            { required: true, message: '请输入题干', trigger: 'blur' }
          ],
          answer: [
            { required: true, message: '请选择标准答案', trigger: 'blur' }
          ],
        }
      };
    },
    components: {
        QuestionDetail
    },
    mounted: function () {
      $(window).smoothScroll()
      util.initReEdit();
    },
    created: function () {
      // this.query = this.getInitQuestion()
      this.disabledBtn = false
      this.classId = this.$route.query.classId
      if (this.classId) {
        this.isEdit = true
        this.questionListByClassId(this.classId)
      }
    },
    methods: {
      // handleAddOption() {
      //   let items = this.questions[this.currentQuestionNo].answerConfig.items
      //   items.push(
      //     String.fromCharCode(items[items.length - 1].charCodeAt(0) + 1)
      //   )
      // },
      // handleLessOption() {
      //   let items = this.questions[this.currentQuestionNo].answerConfig.items
      //   items.splice(items.length -1, 1)
      // },
      // standardAnswersLengthChange(val) {
      //   this.handleAnswersCount(val,this.questions[this.currentQuestionNo].inputAnswersLength)
      // },
      // handleAnswersCount(standardAnswersLength,inputAnswersLength) {
      //   let arr = [], answers = []

      //   standardAnswersLength = parseInt(standardAnswersLength) || 1
      //   inputAnswersLength = parseInt(inputAnswersLength) || 1
      //   if (standardAnswersLength > 5) {
      //     this.$alert('系统不支持超过5种答案，请确认！')
      //     this.questions[this.currentQuestionNo].standardAnswersLength = 1
      //     this.questions[this.currentQuestionNo].standardAnswers = [[{answer: ''}]]
      //     return
      //   }
      //   if (inputAnswersLength > 50) {
      //     this.$alert('系统不支持超过50个答案，请确认！')
      //     inputAnswersLength = 1
      //   }

      //   for (let i = 0, length = inputAnswersLength; i < length; i++) {
      //     answers.push({answer: ''})
      //   }
      //   for (let i = 0, length = standardAnswersLength; i < length; i++) {
      //     arr.push(JSON.parse(JSON.stringify(answers)))
      //   }

      //   this.questions[this.currentQuestionNo].standardAnswers = arr
      // },
      // inputAnswersLengthChange(val) {
      //  this.handleAnswersCount(this.questions[this.currentQuestionNo].standardAnswersLength,val)
      // },
      // handleAddQuestion() {
      //   let oldQuestionLength = this.questions.length
      //   this.questions.push(this.getInitQuestion())
      //   this.currentQuestionNo = oldQuestionLength
      // },
      // getInitQuestion() {
      //   return {
      //     answer: '',
      //     score: '',
      //     inputAnswersLength: 1,
      //     standardAnswersLength: 1,
      //     standardAnswers: [[{answer: ''}]],
      //     inputAnswers: [{
      //       answer: ''
      //     }],
      //     answerConfig: {
      //       items: ["A", "B", "C", "D"]
      //     },
      //     questionType: '0',
      //   }
      // },
      // handleDelCurrentQuestion() {
      //   let length,_this = this
      //   if (this.questions.length === 1) {
      //     this.$alert('题目数量必须大于0')
      //     return
      //   }
      //   _this.$confirm("确认删除本道题目吗？",
      //     function () {
      //       _this.questions.splice(_this.currentQuestionNo,1)
      //       length = _this.questions.length
      //       _this.currentQuestionNo = _this.currentQuestionNo === length ? _this.currentQuestionNo - 1: _this.currentQuestionNo
      //   });
      // },
      questionListByClassId(classId) {
        let _this =this;
        if (this.classId) {
          io.post(io.questionListByClassId, {
            classId : classId
          }, function (ret) {
            if (ret.success) {
              _this.questionDetail = ret.data;
              _this.questionnaireId=ret.data.questionnaire&&ret.data.questionnaire.questionnaireId;
            } else {
              _this.$alert(ret.desc);
              _this.$router.go(-1);
            }
          })
        }
      },
      // isInteger(value) {
      //   return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
      // },
      // formatData(questions) {
      //   let arr = [], missingIndexes = ''
        // questions.map((val, index) => {
        //   if(val.questionType === '0') {
        //     if (!val.score || !val.body|| !val.answer || !this.isInteger(Number(val.score))) {
        //       missingIndexes += (index + 1) + '，'
        //     }
        //     arr.push({
        //       answer: JSON.stringify([val.answer]),
        //       score: val.score,
        //       body: val.body,
        //       answerConfig: JSON.stringify(val.answerConfig),
        //       questionType: val.questionType,
        //     })
        //   } else if (val.questionType === '1') {
        //     let answer = []
        //     if (!val.score || !val.body || !this.isInteger(Number(val.score))) {
        //       missingIndexes += (index + 1) + '，'
        //     } else {
        //       let end = false
        //       for (var i = 0; i < val.standardAnswers.length; i++) {
        //         let arr = []
        //         if (end) {
        //           break
        //         }
        //         for (var j = 0; j < val.standardAnswers[i].length; j++) {
        //           if (!val.standardAnswers[i][j].answer) {
        //             missingIndexes += (index + 1) + '，'
        //             end = true
        //             break
        //           }
        //           arr.push(val.standardAnswers[i][j].answer)
        //         }
        //         answer.push(arr)
        //       }
        //     }
        //     arr.push({
        //       answer: JSON.stringify(answer),
        //       score: val.score,
        //       body: val.body,
        //       answerConfig: JSON.stringify({inputCount: parseInt(val.inputAnswersLength)}),
        //       questionType: val.questionType,
        //     })
        //   }
        // })
      //   if (missingIndexes) {
      //     this.$alert(`第${missingIndexes.substring(0, missingIndexes.length-1)}题还没填写完整,请先填写完整或者删除！`)
      //     return []
      //   } else {
      //     return arr
      //   }
      // },
      // submitForm() {
      //   let _this = this,
      //     data = this.formatData(this.questions)

      //   if (data.length === 0) {
      //     return
      //   }
      //   this.disabledBtn = true
      //   io.postPlayload(io.saveOrUpdateExamPaperQuestions,{
      //     classId: this.classId,
      //     questions: data
      //   }, function (ret) {
      //     if (ret.success) {
      //       _this.$toast('提交成功！')
      //       _this.$router.go(-1)
      //     } else {
      //       _this.disabledBtn = false
      //       _this.$alert(ret.desc)
      //     }
      //   })
      // },
    }
  }
</script>
<style lang="less" scoped>
  .el-form {
    padding: 10px;
    .input-answer {
      .el-input {
        width: 49%;
        &:nth-child(2n) {
          margin-left: 2%;
        }
      }
    }
    .input-answer-set {
      .el-input {
        width: 49%;
        &:nth-child(2n) {
          margin-left: 1%;
        }
      }
    }
    .icon-add, .icon-less {
      font-size: 20px;
      vertical-align: -0.5rem;
      fill: #01c8c0;
      cursor: pointer;
      margin: 0 5px;
      &:hover {
        fill: #3ae6df
      }
    }
    .icon-less {
      font-size: 22px;
      vertical-align: -0.63rem;
      margin-left: 30px;
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
  .el-select {
    width: 100%;
  }
  .am-text-center .el-form-item__content {
    text-align: center;
  }
</style>
