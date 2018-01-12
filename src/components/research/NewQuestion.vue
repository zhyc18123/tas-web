<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">题目录入</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <el-form :model="query" :rules="rules" ref="query" label-width="230px" class="demo-query">
          <el-form-item class="question-number-btn" label="题目：">
            <el-button :type="currentQuestionNo === index ? 'primary': 'default'" @click="currentQuestionNo = index" v-for="(item,index) in questions">{{index + 1}}</el-button>
            <el-button type="success" @click="handleAddQuestion" >添加</el-button>
          </el-form-item>
          <hr>
          <div>
            <el-form-item label="题干：" prop="body">
              <editor :toolbar='[]' v-model="questions[currentQuestionNo].content"></editor>
            </el-form-item>
            <el-form-item class="is-required" label="分值(整数)：" prop="score">
              <el-input type="Number" placeholder="分值" v-model="questions[currentQuestionNo].score"></el-input>
            </el-form-item>
            <el-form-item label=" ">
              <el-button @click="handleDelCurrentQuestion" >删除本题</el-button>
            </el-form-item>
          </div>
          <hr>
          <div class="am-text-center">
            <el-button :disabled="disabledBtn" type="primary" @click="submitForm()">提交</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import util from '../../lib/util'
  export default{
    data() {
      return {
        questionnaireId: '',
        questions: [{
          content:'',
          socore:''
        }],
        currentQuestionNo: 0,
        disabledBtn: false,
        isEdit: false,
        rules: {
          questionType: [
            { required: true, message: '请选择题型', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入题干', trigger: 'blur' }
          ],
        }
      };
    },
    mounted: function () {
      $(window).smoothScroll()
      util.initReEdit();
    },
    created: function () {
      this.query = this.getInitQuestion()
      this.disabledBtn = false
      this.questionnaireId = this.$route.query.questionnaireId
      if (this.questionnaireId) {
        this.isEdit = true
        this.examPaperDetail(this.questionnaireId)
      }
    },
    methods: {
      handleAddOption() {
        let items = this.questions[this.currentQuestionNo].answerConfig.items
        items.push(
          String.fromCharCode(items[items.length - 1].charCodeAt(0) + 1)
        )
      },
      handleLessOption() {
        let items = this.questions[this.currentQuestionNo].answerConfig.items
        items.splice(items.length -1, 1)
      },
      standardAnswersLengthChange(val) {
        this.handleAnswersCount(val,this.questions[this.currentQuestionNo].inputAnswersLength)
      },
      handleAnswersCount(standardAnswersLength,inputAnswersLength) {
        let arr = [], answers = []

        standardAnswersLength = parseInt(standardAnswersLength) || 1
        inputAnswersLength = parseInt(inputAnswersLength) || 1
        if (standardAnswersLength > 5) {
          this.$alert('系统不支持超过5种答案，请确认！')
          this.questions[this.currentQuestionNo].standardAnswersLength = 1
          this.questions[this.currentQuestionNo].standardAnswers = [[{answer: ''}]]
          return
        }
        if (inputAnswersLength > 50) {
          this.$alert('系统不支持超过50个答案，请确认！')
          inputAnswersLength = 1
        }

        for (let i = 0, length = inputAnswersLength; i < length; i++) {
          answers.push({answer: ''})
        }
        for (let i = 0, length = standardAnswersLength; i < length; i++) {
          arr.push(JSON.parse(JSON.stringify(answers)))
        }

        this.questions[this.currentQuestionNo].standardAnswers = arr
      },
      inputAnswersLengthChange(val) {
       this.handleAnswersCount(this.questions[this.currentQuestionNo].standardAnswersLength,val)
      },
      handleAddQuestion() {
        let oldQuestionLength = this.questions.length
        this.questions.push(this.getInitQuestion())
        this.currentQuestionNo = oldQuestionLength
      },
      getInitQuestion() {
        return {
          questionnaireQuestionNo:this.questions.length+1,
          content: '',
          score: '',
        }
      },
      handleDelCurrentQuestion() {
        let length,_this = this
        if (this.questions.length === 1) {
          this.$alert('题目数量必须大于0')
          return
        }
        _this.$confirm("确认删除本道题目吗？",
          function () {
            _this.questions.splice(_this.currentQuestionNo,1)
            length = _this.questions.length
            _this.currentQuestionNo = _this.currentQuestionNo === length ? _this.currentQuestionNo - 1: _this.currentQuestionNo
        });
      },
      examPaperDetail(questionnaireId) {
        if (this.questionnaireId) {
          io.post(io.questionList, {
            questionnaireId : questionnaireId
          },  (ret)=> {
            if (ret.success) {
              this.questions = ret.data.length?ret.data:[{questionnaireQuestionNo:1,content:'',score:''}];
            } else {
              this.$alert(ret.desc)
            }
          })
        }
      },
      isInteger(value) {
        return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
      },
      formatData(questions) {
      },
      submitForm() {
        this.disabledBtn = true
        io.post(io.importQuestion,{
          questionnaireId: this.questionnaireId,
          questionListJson: JSON.stringify(this.questions) 
        },  (ret) =>{
          if (ret.success) {
            this.$toast('提交成功！')
            this.$router.go(-1)
          } else {
            this.disabledBtn = false
            this.$alert(ret.desc)
          }
        })
      },
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
