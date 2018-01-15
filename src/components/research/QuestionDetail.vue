<template>
    <div class="widget-body am-fr">
        <el-form :inline="true" :model="query" :rules="rules" ref="query" label-width="130px" class="demo-query">
            <div v-if="isWindow" class='total-score'>
                <el-form-item label="总分：">
                    <span>{{questionDetail.courseClass&&questionDetail.courseClass.totalScore}}</span>
                </el-form-item>
                <el-form-item label="最终得分：">
                    <span>{{questionDetail.courseClass&&questionDetail.courseClass.headCoefficientScore||'--'}}</span>
                </el-form-item>
            </div>
            <el-form-item label="校区：">
                <span>{{questionDetail.courseClass&&questionDetail.courseClass.campusName}}</span>
            </el-form-item>
            <el-form-item label="班级：">
                <span>{{questionDetail.courseClass&&questionDetail.courseClass.className}} </span>
            </el-form-item>
            <el-form-item label="本班人数：">
                <span v-if="questionDetail.courseClass">{{questionDetail.courseClass.regAmount||questionDetail.courseClass.regNum}}</span>
            </el-form-item>
            </el-form-item>
            <el-form-item label="教师：">
                <span>{{questionDetail.courseClass&&questionDetail.courseClass.teacherName}}</span>
            </el-form-item>
            <el-form-item v-if="isWindow" label="调研问卷份数：">
                <span>{{questionDetail.courseClass&&questionDetail.courseClass.totalNum}}</span>
            </el-form-item>
            <el-form-item v-if="!isWindow" label="调研问卷份数：" prop="questionTotal">
                <el-input type="Number" placeholder="" v-model="totalNum"></el-input>
            </el-form-item>
            <div>
                <el-form-item class="question-number-btn" label="题目：">
                    <el-button :type="currentQuestionNo === index ? 'primary': 'default'" @click="currentQuestionNo = index" v-for="(item,index) in questions">{{index + 1}}</el-button>
                </el-form-item>
            </div>
            <hr>
            <div v-show="currentQuestionNo === index" v-for="(item,index) in questions">
                <div>
                    <el-form-item label="题干：" prop="body">
                        <span v-html="item.content"></span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item v-if="!isWindow" label="调研结果：">
                        <el-table border :data="item.resultTable" style="width: 100%">
                            <el-table-column align="center" prop="levle" label="选项" width="300">
                            </el-table-column>
                            <el-table-column align="center" label="份数" width="300">
                                <template scope="scope">
                                    <el-input type="number" v-model="scope.row.questionNum"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-button style="float:right" v-if="currentQuestionNo<questions.length-1" @click="currentQuestionNo++" >下一题</el-button>
                    </el-form-item>
                    <el-form-item v-if="isWindow" label="调研结果：">
                        <el-table border :data="item.resultTable" style="width: 100%">
                            <el-table-column align="center" prop="levle" label="选项" width="300">
                            </el-table-column>
                            <el-table-column align="center" label="份数" width="300">
                                <template scope="scope">
                                    <span>{{scope.row.questionNum}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--<el-button @click="handleDelCurrentQuestion" >删除本题</el-button>-->
                    </el-form-item>
                </div>
                <div v-if="isWindow">
                    <el-form-item label="本题得分：">
                        <span>{{item.questionScore}}</span>
                    </el-form-item>
                </div>
            </div>
            <hr>
            <div v-if="!isWindow" class="am-text-center">
                <el-button :disabled="disabledBtn" type="primary" @click="submitForm()">提交</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import io from '../../lib/io'
import util from '../../lib/util'
export default {
    data() {
        return {
            // resultTable: [{
            //     levle: '优',
            //     questionNum: ''
            // }, {
            //     levle: '良',
            //     questionNum: ''
            // }, {
            //     levle: '中',
            //     questionNum: ''
            // }, {
            //     levle: '差',
            //     questionNum: ''
            // }],
            formInline: {},
            examPaperId: '',
            totalNum: '',
            currentQuestionNo: 0,
            disabledBtn: false,
            isEdit: false,
            questionTotal: '',
            rules: {
                questionTotal: [
                    // { required: true, message: '请输入份数' }
                ],
            }
        };
    },
    props: ['isWindow', 'questionDetail', 'classId', 'questionnaireId'],
    mounted: function() {
        $(window).smoothScroll()
        util.initReEdit();
    },
    computed: {
        questions() {
            if (this.isWindow) {
                this.questionDetail && this.questionDetail.questionnaireQuestionList.map((item) => {
                    item.resultTable = [{
                        levle: '优',
                        questionNum: item.optimalNum
                    }, {
                        levle: '良',
                        questionNum: item.goodNum
                    }, {
                        levle: '中',
                        questionNum: item.midNum
                    }, {
                        levle: '差',
                        questionNum: item.badNum
                    }]
                })
            } else {
                this.questionDetail && this.questionDetail.questionnaireQuestionList.map((item) => {
                    item.resultTable = [{
                        levle: '优',
                        questionNum: ''
                    }, {
                        levle: '良',
                        questionNum: ''
                    }, {
                        levle: '中',
                        questionNum: ''
                    }, {
                        levle: '差',
                        questionNum: ''
                    }]
                })
            }
            return this.questionDetail.questionnaireQuestionList || [{
                questionnaireQuestionNo: '',
                content: '',
                score: '',
            }]
        }
    },
    created: function() {
        console.log('questionDetail', this.questionDetail)
        this.query = this.getInitQuestion()
        this.disabledBtn = false
        this.examPaperId = this.$route.query.examPaperId
        if (this.examPaperId) {
            this.isEdit = true
            this.examPaperDetail(this.examPaperId)
        }
    },
    methods: {
        getInitQuestion() {
            return {
                answer: '',
                score: '',
                inputAnswersLength: 1,
                standardAnswersLength: 1,
                standardAnswers: [[{ answer: '' }]],
                inputAnswers: [{
                    answer: ''
                }],
                answerConfig: {
                    items: ["A", "B", "C", "D"]
                },
                questionType: '0',
            }
        },
        isInteger(value) {
            return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
        },
        submitForm() {
            let _this = this
            let classQuestionDetailJson = [];
            if(!this.totalNum){
                this.$alert('请输入份数！');
                return;
            }
            this.questions.map((item) => {
                classQuestionDetailJson.push({
                    questionnaireQuestionId: item.questionnaireQuestionId,
                    optimalNum: item.resultTable[0].questionNum,
                    goodNum: item.resultTable[1].questionNum,
                    midNum: item.resultTable[2].questionNum,
                    badNum: item.resultTable[3].questionNum,
                })
            })
            this.disabledBtn = true
            io.post(io.saveQuestionnaireRecord, {
                classId: this.classId,
                totalNum: this.totalNum,
                questionnaireId: this.questionnaireId,
                classQuestionDetailJson: JSON.stringify(classQuestionDetailJson)
            }, function(ret) {
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
    .input-answer-set {
        .el-input {
            width: 49%;
            &:nth-child(2n) {
                margin-left: 1%;
            }
        }
    }
    .icon-add,
    .icon-less {
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
<style lang="less">
.total-score {
    color: red;
    .el-form-item__label {
        color: red;
    }
}
</style>

