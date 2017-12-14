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
        <el-form :model="query" :rules="rules" ref="query" label-width="210px" class="demo-query">
          <el-form-item class="question-number-btn" label="题目：">
            <el-button :type="currentQuestionNo === index ? 'primary': 'default'" @click="currentQuestionNo = index" v-for="(item,index) in questions">{{index + 1}}</el-button>
            <el-button type="success" @click="handleAddQuestion" >添加</el-button>
          </el-form-item>
          <hr>
          <div>
            <el-form-item label="题型：" prop="questionType">
              <el-radio class="radio" v-model="questions[currentQuestionNo].questionType" label="0">单选题</el-radio>
              <el-radio class="radio" v-model="questions[currentQuestionNo].questionType" label="1">填空题</el-radio>
            </el-form-item>
            <el-form-item label="题干：" prop="body">
              <editor v-model="questions[currentQuestionNo].body"></editor>
            </el-form-item>
            <el-form-item v-if="questions[currentQuestionNo].questionType == 0" label="标准答案：" prop="answer">
              <el-radio class="radio" v-for="item in questions[currentQuestionNo].answerConfig.items" v-model="questions[currentQuestionNo].answer"
                        :label="item">{{item}}</el-radio>
              <span>
                <span @click="handleLessOption">
                  <svg class="icon icon-less" aria-hidden="true">
                  <use xlink:href="#icon-jian1"></use>
                </svg>
                </span>
                <span @click="handleAddOption">
                  <svg class="icon icon-add" aria-hidden="true">
                  <use xlink:href="#icon-tianjia"></use>
                </svg>
                </span>
              </span>
            </el-form-item>
            <div v-else>
              <el-form-item class="input-answer is-required" label="设置答案个数：" prop="inputAnswersLength">
                <el-input @change="inputAnswersLengthChange" type="Number" :placeholder="'请输入答案个数'" v-model="questions[currentQuestionNo].inputAnswersLength"></el-input>
              </el-form-item>
              <el-form-item class="input-answer is-required" label="标准答案（注意答案顺序）：">
                <el-input v-for="(item,index) in questions[currentQuestionNo].inputAnswers" type="Number"
                          :placeholder="'请输入第'+ (index+1) +'个答案'" v-model="item.answer"></el-input>
              </el-form-item>
            </div>
            <el-form-item class="is-required" label="分值：" prop="score">
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
        examPaperId: '',
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
        currentQuestionNo: 0,
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
    mounted: function () {
      $(window).smoothScroll()
      util.initReEdit();
    },
    created: function () {
      this.query = this.getInitQuestion()
      this.disabledBtn = false
      this.examPaperId = this.$route.query.examPaperId
      if (this.examPaperId) {
        this.isEdit = true
        this.examPaperDetail(this.examPaperId)
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
      inputAnswersLengthChange(val) {
        val = parseInt(val)
        let inputAnswers = this.questions[this.currentQuestionNo].inputAnswers
        if (val > 50) {
          this.$alert('系统不支持超过50个答案，请确认！')
          return
        } else {
          let arr = [],currentLength = inputAnswers.length
          debugger
          if (currentLength > val) {
            inputAnswers.splice(val, inputAnswers.length)
          } else {
            for (let i = currentLength, length = val; i < length; i++) {
              arr.push({answer: ''})
            }
            this.questions[this.currentQuestionNo].inputAnswers = inputAnswers.concat(arr)
          }
        }
      },
      handleAddQuestion() {
        let oldQuestionLength = this.questions.length
        this.questions.push(this.getInitQuestion())
        this.currentQuestionNo = oldQuestionLength
      },
      getInitQuestion() {
        return {
          answer: '',
          score: '',
          inputAnswersLength: 1,
          inputAnswers: [{
            answer: ''
          }],
          answerConfig: {
            items: ["A", "B", "C", "D"]
          },
          questionType: '0',
        }
      },
      handleDelCurrentQuestion() {
        let length,_this = this
        _this.$confirm("确认删除本道题目吗？",
          function () {
            _this.questions.splice(_this.currentQuestionNo,1)
            length = _this.questions.length
            _this.currentQuestionNo = _this.currentQuestionNo === length ? _this.currentQuestionNo - 1: _this.currentQuestionNo
        });
      },
      examPaperDetail(examPaperId) {
        let _this =this;
        if (this.examPaperId) {
          io.post(io.questionsOfExamPaper, {
            examPaperId : examPaperId
          }, function (ret) {
            if (ret.success) {
              _this.query = ret.data.examPaper;
              if (ret.data.questions.length === 0) {
                ret.data.questions = [_this.getInitQuestion()]
              } else {
                ret.data.questions.map(val => {
                  if (val.questionType === '0') {
                    val.answerConfig = JSON.parse(val.answerConfig)
                    val.answer = val.answer && JSON.parse(val.answer)[0]
                    val.inputAnswersLength = 1
                    val.inputAnswers = [{answer: ''}]
                  } else {
                    val.answerConfig = JSON.parse(val.answerConfig)
                    val.inputAnswersLength = val.answerConfig.inputCount
                    val.answerConfig.items = ["A", "B", "C", "D"]
                    val.inputAnswers = val.answer && JSON.parse(val.answer).map((val) => {
                      return {answer: val}
                    })
                  }
                })
              }
              _this.questions = ret.data.questions;
            } else {
              _this.$alert(ret.desc)
            }
          })
        }
      },
      formatData(questions) {
        let arr = [], missingIndexes = ''
        questions.map((val, index) => {
          if(val.questionType === '0') {
            if (!val.score || !val.body|| !val.answer) {
              missingIndexes += (index + 1) + '，'
            }
            arr.push({
              answer: JSON.stringify([val.answer]),
              score: val.score,
              body: val.body,
              answerConfig: JSON.stringify(val.answerConfig),
              questionType: val.questionType,
            })
          } else if (val.questionType === '1') {
            debugger
            let answer = []
            if (!val.score || !val.body) {
              missingIndexes += (index + 1) + '，'
            } else {
              for (var i = 0; i < val.inputAnswers.length; i++) {
                if (!val.inputAnswers[i].answer) {
                  missingIndexes += (index + 1) + '，'
                  break
                }
                answer.push(val.inputAnswers[i].answer)
              }
            }
            arr.push({
              answer: JSON.stringify(answer),
              score: val.score,
              body: val.body,
              answerConfig: JSON.stringify({inputCount: parseInt(val.inputAnswersLength)}),
              questionType: val.questionType,
            })
          }
        })
        if (missingIndexes) {
          this.$alert(`第${missingIndexes.substring(0, missingIndexes.length-1)}题还没填写完整,请先填写完整或者删除！`)
          return []
        } else {
          return arr
        }
      },
      submitForm() {
        let _this = this,
          data = this.formatData(this.questions)

        if (data.length === 0) {
          return
        }
        this.disabledBtn = true
        io.postPlayload(io.saveOrUpdateExamPaperQuestions,{
          examPaperId: this.examPaperId,
          questions: data
        }, function (ret) {
          if (ret.success) {
            _this.$toast('提交成功！')
            _this.$router.go(-1)
          } else {
            _this.disabledBtn = false
            _this.$alert(ret.desc)
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
