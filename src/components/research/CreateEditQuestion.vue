<template>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
        <div class="widget am-cf">
            <div class="widget-head am-cf">
                <div class="widget-title am-fl">调研设置</div>
                <div class="widget-function am-fr">
                    <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
                </div>
            </div>
            <div class="widget-body am-fr">
                <el-form :model="query" :rules="rules" ref="query" label-width="150px" class="demo-query">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="请选择区域：" prop="areaTeamId">
                                <el-select v-model="query.areaTeamId" placeholder="请选择区域">
                                    <el-option v-for="item in areaTeams" :key="item.areaTeamId" :label="item.areaTeamName" :value="item.areaTeamId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="问卷标题：" prop="areaTeamId">
              <el-input type="text" placeholder="标题" v-model="query.questionnaireName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12" class="quanzhong">
                            <el-form-item label="各选项权重：" prop="areaTeamId">
                                <span>（本题得分 = 本题分数*对应选项权重）</span>
                            </el-form-item>
                            <el-form-item label="优：" prop="optimalWeight">
              <el-input type="text" placeholder="" v-model="query.optimalWeight"></el-input><span>%</span>
                            </el-form-item>
                            <el-form-item label="良：" prop="goodWeight">
              <el-input type="text" placeholder="" v-model="query.goodWeight"></el-input>%
                            </el-form-item>
                            <el-form-item label="中：" prop="midWeight">
              <el-input type="text" placeholder="" v-model="query.midWeight"></el-input>%
                            </el-form-item>
                            <el-form-item label="差：" prop="badWeight">
              <el-input type="text" placeholder="" v-model="query.badWeight"></el-input>%
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item class="am-text-center">
                        <el-button :disabled="disabledBtn" type="primary" @click="submitForm('query')">确定</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
    </div>
</template>

<script>
import io from '../../lib/io'
export default {
    data() {
        return {
            query: {
                questionnaireId: '',
                studentId: '',
                areaTeamId: '',
                areaTeamName: "",
                questionnaireName:'',
                campusIds: [],
                campusNames: "",
                gradeIds: '',
                gradeName: "",
                level: '',
                periodId: '',
                periodName: "",
                passingScore: "",
                subjectId: '',
                subjectName: "",
                way: '0',
                checkedGrade: [],
                checkedSubject: [],
                checkedCampuses: [],
                optimalWeight:'',
                goodWeight:'',
                midWeight:'',
                badWeight:''
            },
            disabledBtn: false,
            checkAllGrade: false,
            checkAllSubject: false,
            checkAll: false,
            isEdit: false,
            campuses: [],
            periods: [],
            rules: {
                passingScore: [
                    { required: true, message: '请输入分数', trigger: 'blur' }
                ],
                areaTeamId: [
                    { required: true, message: '请选择区域', trigger: 'change' }
                ],
                checkedGrade: [
                    { type: 'array', required: true, message: '请至少选择一个年级', trigger: 'change' }
                ],
                checkedSubject: [
                    { type: 'array', required: true, message: '请至少选择一个科目', trigger: 'change' }
                ],
                checkedCampuses: [
                    { type: 'array', required: true, message: '请至少选择一个校区', trigger: 'change' }
                ],
                optimalWeight: [
                    // { type: 'number', message: '请输入数字' }
                ],
                goodWeight: [
                    // { type: 'number', message: '请输入数字' }
                ],
                midWeight: [
                    // { type: 'number', message: '请输入数字' }
                ],
                badWeight: [
                    // { type: 'number', message: '请输入数字' }
                ],

            }
        };
    },
    props: ['studentId'],
    mounted: function() {
        $(window).smoothScroll()
    },
    created: function() {
        //   console.log(1)
        //   this.query = {
        //     questionnaireId: '',
        //       studentId: '',
        //       areaTeamId: '',
        //       areaTeamName: "",
        //       campusIds: [],
        //       campusNames: "",
        //       gradeId: '',
        //       gradeName: "",
        //       level: '',
        //       periodId: '',
        //       periodName: "",
        //       passingScore: "",
        //       subjectId: '',
        //       subjectName: "",
        //       way: '0',
        //       checkedCampuses: [],
        //   }
        this.checkAll = false
        this.disabledBtn = false
        this.query.questionnaireId = this.$route.query.questionnaireId
        if (this.query.questionnaireId) {
            this.isEdit = true
            this.questionnaireDetail(this.query.questionnaireId)
        } else {
            this.query.areaTeamId = window.config.areaTeams[0].areaTeamId
        }
    },
    watch: {
        'query.areaTeamId'() {
            if (!this.isEdit) {
                this.query.campusIds = []
                this.query.periodId = ''
                this.query.checkedGrade = []
                this.query.checkedSubject = []
                this.query.checkedCampuses = []
                this.loadCampusData()
                this.loadPeriodData()
            } else {
                this.isEdit = false;
            }
        }
    },
    computed: {
        areaTeams: function() {
            var options = (this.$root.config.areaTeams || [])
                .map(function(item) {
                    return { areaTeamId: item.areaTeamId, areaTeamName: item.name }
                })
            return options
        },
        grades: function() {
            return this.$root.config.grades.map(function(item) {
                return { gradeId: item.gradeId, gradeName: item.gradeName }
            })
        },
        subjects: function() {
            return this.$root.config.subjects.map(function(item) {
                return { subjectId: item.subjectId, subjectName: item.subjectName }
            })
        },
    },
    methods: {
        handleCheckAllGrade(event) {
            let gradeIds = []
            this.grades.map(item => {
                gradeIds.push(item.gradeId)
            })
            console.log('gr', gradeIds)
            this.query.checkedGrade = event.target.checked ? gradeIds : [];
        },
        handleCheckAllSubject(event) {
            let subjectIds = []
            this.subjects.map(item => {
                subjectIds.push(item.subjectId)
            })
            this.query.checkedSubject = event.target.checked ? subjectIds : [];
        },
        handleCheckAllChange(event) {
            let allCampusId = []
            this.campuses.map(item => {
                allCampusId.push(item.campusId)
            })
            this.query.checkedCampuses = event.target.checked ? allCampusId : [];
        },
        handleGradeChange(value) {
            let checkedCount = value.length;
            this.checkAllGrade = checkedCount === this.grades.length;
        },
        handleSubjectChange(value) {
            let checkedCount = value.length;
            this.checkAllSubject = checkedCount === this.subjects.length;
        },
        handleCampusesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.campuses.length;
        },
        questionnaireDetail(questionnaireId) {
            let _this = this;
            if (this.query.questionnaireId) {
                io.post(io.questionnaireDetail, {
                    questionnaireId: questionnaireId
                }, function(ret) {
                    if (ret.success) {
                        // ret.data.checkedCampuses = ret.data.campusIds.split(',');
                        // ret.data.checkedGrade=ret.data.gradeIds.split(',');
                        // ret.data.checkedSubject=ret.data.subjectIds.split(',');
                        _this.query = ret.data;
                        _this.loadCampusData(ret.data.checkedCampuses)
                        _this.loadPeriodData()
                    } else {
                        _this.$alert(ret.desc)
                    }
                })
            }
        },
        loadPeriodData: function() {
            var _this = this
            if (!this.query.areaTeamId) {
                return
            }
            io.post(io.apiAdminPeriodListForAreaTeam, {
                areaTeamId: this.query.areaTeamId
            }, function(ret) {
                if (ret.success) {
                    _this.periods = ret.data.map(function(item) {
                        return { periodId: item.periodId, periodName: item.periodName }
                    })
                    _this.query.periodId = _this.query.periodId ? _this.query.periodId : ret.data.filter(item => item.isCurrent == 1)[0].periodId
                } else {
                    _this.$alert(ret.desc)
                }
            })
        },
        loadCampusData: function(checkedCampuses) {
            var _this = this
            if (!this.query.areaTeamId) {
                return
            }
            io.post(io.apiAdminCampusOfAreaTeam, {
                areaTeamId: _this.query.areaTeamId
            }, function(ret) {
                if (ret.success) {
                    _this.campuses = ret.data
                    if (checkedCampuses) {
                        _this.handleCampusesChange(checkedCampuses)
                    }
                } else {
                    _this.$alert(ret.desc)
                }
            })
        },
        resetForm(){
this.query.questionnaireName='';
this.query.optimalWeight='';
this.query.goodWeight='';
this.query.midWeight='';
this.query.badWeight='';
        },
        submitForm(formName) {
            let _this = this
            // this.disabledBtn = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!this.query.optimalWeight||!this.query.goodWeight||!this.query.midWeight||!this.query.badWeight){
                        this.$alert('权重不允许为空！');
                        return;
                    }
                    _this.query.areaTeamName = _this.areaTeams.filter((item) => { return item.areaTeamId === _this.query.areaTeamId })[0].areaTeamName
                    // _this.query.gradeIds=this.query.checkedGrade.join(',');
                    // _this.query.periodName = _this.periods.filter((item) => { return item.periodId === _this.query.periodId })[0].periodName
                    // _this.query.subjectIds = this.query.checkedSubject.join(',');
                    // let campusNames = [];
                    // _this.query.checkedCampuses.map((campusId) => {
                    //     campusNames.push(_this.campuses.filter((item) => { return item.campusId === campusId })[0].campusName)
                    // })
                    io.post(io.saveUpdateQuestionnaire, Object.assign({}, _this.query, {
                        // campusNames: campusNames.join(','),
                        // campusIds: _this.query.checkedCampuses.join(',')
                    }), function(ret) {
                        if (ret.success) {
                            _this.$toast('提交成功！')
                            _this.resetForm();
                            _this.$router.go(-1)
                        } else {
                            _this.disabledBtn = false
                            _this.$alert(ret.desc)
                        }
                    })
                } else {
                    this.disabledBtn = false
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>
<style lang="less">
.el-form {
    padding: 30px 100px;
}

.red {
    padding: 0 100px;
    color: #ff9449;
    font-size: 14px;
}

.el-form-item__content {
    text-align: left;
}

.am-text-center .el-form-item__content {
    text-align: left;
}

.el-checkbox+.el-checkbox {
    margin-left: 0;
}

.el-checkbox {
    margin-right: 15px;
}

.am-text-center .el-form-item__content {
    text-align: center;
}
.quanzhong{
    .el-input{
        width: 150px;
        margin-right: 10px;
    }
}
</style>
