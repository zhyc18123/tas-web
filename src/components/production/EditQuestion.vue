<template>
    <el-row class="container edit-question">
        <el-col :span="24">
            <el-breadcrumb class="nav-little" separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">
                    <svg class="icon shouye" aria-hidden="true">
                        <use xlink:href="#icon-shouye1"></use>
                    </svg>
                    首页
                    <!--{{list[0] | deepGet('question[0].name')}}-->
                    <!--<span v-html="deepGet(list[0],'question[0].name.a.b')"></span>-->
                </el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/main/production' }">
                    产品管理
                </el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/main/production' }">
                    讲义管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    新建讲义
                </el-breadcrumb-item>
            </el-breadcrumb>
            <el-row class="edit-body">
                <el-col class="edit-left" :span="8">
                    <el-row class="title">
                        题目管理
                    </el-row>
                    <el-row class="action">
                        <router-link :to="{path:'/main/production/select-question',query:{lectureNodeId:lectureNodeId,lectureNoteId:lectureNoteId,versionId:versionId}}" class="el-button edit-btn add-question">
                            添加题目
                        </router-link>
                        <em>共{{selectedQuestion.length}}道题</em>
                    </el-row>
                    <ul class="q-list">
                        <li v-for="(item,i) in selectedQuestion" :key="i">
                            <span class="q-num">
                                {{i+1}}、{{item.questionVo.no}}
                                <svg class="icon up" aria-hidden="true" @click="moveQuestion(item.questionVo.questionId,i,'up')">
                                    <use xlink:href="#icon-jiantou"></use>
                                </svg>
                                <svg class="icon down" aria-hidden="true" @click="moveQuestion(item.questionVo.questionId,i,'down')">
                                    <use xlink:href="#icon-jiantou"></use>
                                </svg>
                            </span>
                            <span class="q-btn">
                                <el-popover v-model="item.showPop" placement="bottom" width="333" trigger="click" class="pop-see">
                                <set-able :item="item" :lectureNodeId="lectureNodeId" type='0' @success="item.showPop=false"/>
                                    <el-button slot="reference">设置可见部分</el-button>
                                </el-popover>
                                <el-button @click="deleteQuestion(item)">
                                    删除
                                </el-button>
                            </span>
                        </li>
                    </ul>
                </el-col>
                <el-col class="edit-right" :span="16">
                    <el-row class="title">
                        题目内容
                    </el-row>
                    <el-row class="right-div">
                        <template v-for="(item,i) in selectedQuestion">
                            <question-item :question="item.questionVo" :sppConfigList="sppConfigList">
                                <span slot="num">{{i+1}}、</span>
                            </question-item>
                        </template>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import QuestionItem from '../common/QuestionItem'
import SetAble from '../common/SetAble'
import util from '../../lib/util'
import io from '../../lib/io'
import storage from '../../lib/storage'
export default {
    name: 'edit-question',
    components: {
        QuestionItem,
        SetAble
    },
    data() {
        return {
            versionId: this.$route.query.versionId,
            loginInfo: storage.getCurrentUserInfo(),
            lectureNoteId: this.$route.query.lectureNoteId,
            lectureNodeId: this.$route.query.lectureNodeId,
            checked: '',
            selectedQuestion: {},
            subjectId: storage.getSubjectId(),
            sppConfigList: []
        }
    },
    created() {
        // this.lectureNoteQuestionList();
        this.loadSelected();
        this.sppResourceList();
    },
    watch: {
        selectedQuestion: {
            handler: (val, olVal) => {
                console.log(val)
                // val.map((item,i)=>{
                //     console.log('oldval',olVal)
                // if(item&&oldVal[i]&&item.settingWithChecked.sAllCheck){
                //      item.settingWithChecked.settingOfStudent.spps.map((sItem)=>{
                //          sItem.checked=true;
                //      })
                // }else{
                //      item.settingWithChecked.settingOfStudent.spps.map((sItem)=>{
                //          sItem.checked=false;
                //      })
                // }
                // if(item.settingWithChecked.tAllCheck){
                //     item.settingWithChecked.settingOfTeacher.spps.map((tItem)=>{
                //         tItem.checked=true;
                //     })
                // }
                // })
            }, deep: true
        }
    },
    methods: {
        async moveQuestion(id, index, type) {
            let toQuestionId = '';
            if (type === 'down') {
                if (index < this.selectedQuestion.length - 1) {
                    toQuestionId = this.selectedQuestion[index + 1].questionId;
                } else {
                    this.$message('最后一个,不能下移');
                    return;
                }
            } else {
                if (index > 0) {
                    toQuestionId = this.selectedQuestion[index - 1].questionId;
                } else {
                    this.$message('第一个,不能上移');
                    return;
                }
            };

            let { data } = await io.post6(io.moveQuestion, {
                questionId: id, lectureNodeId: this.lectureNodeId, toQuestionId: toQuestionId
            });
            if (data.success) {
                this.loadSelected();
            }
        },
        sppResourceList() {
            io.post(io.sppResourceList, {
                subjectId: this.subjectId || storage.getSubjectId(), optRoleId: this.loginInfo.optRoleId
            }, (data) => {
                this.sppConfigList = [];
                data.map((item) => {
                    this.sppConfigList.push(item.subjectSppId);
                });
            })
        },
        async loadSelected() {
            let { data } = await io.post6(io.lectureNodeDetail, { lectureNodeId: this.lectureNodeId, subjectId: this.subjectId });
            if (data.success) {
                data.data.lectureNodeContentQuestionList.map((item) => {
                    item.questionVo.showMore = false;
                    try {
                        if (item.questionVo && item.questionVo.sysSubjectType === '0') {
                            item.questionVo.answer = item.questionVo.answer && JSON.parse(item.questionVo
                                .answer).join(',');
                        };
                        if (item.questionVo && item.questionVo.sysSubjectType === '1') {
                            item.questionVo.answer = item.questionVo.answer && JSON.parse(item.questionVo
                                .answer).join(';');
                        };
                    } catch (err) {
                        console.log(err)
                    }
                    item.showPop = false;
                    item.settingWithChecked.settingOfStudent.spps = util.deepGet(item, 'settingWithChecked.settingOfStudent.spps') && JSON.parse(item.settingWithChecked.settingOfStudent.spps);
                    item.settingWithChecked.settingOfTeacher.spps = util.deepGet(item, 'settingWithChecked.settingOfTeacher.spps') && JSON.parse(item.settingWithChecked.settingOfTeacher.spps);
                    item.settingWithChecked.settingOfStudent.properties = util.deepGet(item, 'settingWithChecked.settingOfStudent.properties') && JSON.parse(item.settingWithChecked.settingOfStudent.properties);
                    item.settingWithChecked.settingOfTeacher.properties = util.deepGet(item, 'settingWithChecked.settingOfTeacher.properties') && JSON.parse(item.settingWithChecked.settingOfTeacher.properties);
                });
                console.log('xxxxx', data.data.lectureNodeContentQuestionList)
                this.selectedQuestion = data.data.lectureNodeContentQuestionList;
            }
        },
        async deleteQuestion(question) {
            this.$confirm('确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let { data } = await io.post6(io.saveLectureNodeContentQuestion, { lectureNodeId: this.lectureNodeId, questionId: question.questionId, opt: 0 });
                console.log(this.selectedQuestion)
                this.selectedQuestion.map((item, i) => {
                    console.log('dd', item)
                    if (item.questionId === question.questionId) {
                        this.selectedQuestion.splice(i, 1);
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.edit-question {
    background: white;
}

.edit-body {
    border: 1px solid #b1e0ef;
    height: 1000px;
    background: white;
    font-size: 14px;
    margin: 0 20px;
    .title {
        border-bottom: 1px solid #b1e0ef;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #005875;
        font-weight: bold;
        background: white;
    }
    .action {
        height: 50px;
        line-height: 50px;
        background: #f0f0f0;
        em {
            position: absolute;
            right: 20px;
            font-style: normal;
        }
    }
    .action-span {
        display: inline-block;
        height: 22px;
        position: relative;
        top: 14px;
        border-left: 1px solid #ccc;
        margin-left: 10px;
        padding-left: 5px;
        .icon {
            position: relative;
            top: -12px;
            left: 10px;
        }
    }
}

.edit-left,
.edit-right {
    height: 100%;
    overflow: auto;
}

.edit-left {
    background: #f8f8f8;
}


.edit-right {
    border-left: 1px solid #b1e0ef;
    .action {
        background: #e7f6fa;
    }
}

.edit-btn {
    background: #78c655;
    border: 0;
    color: white;
}

.add-question {
    margin: 0 20px;
}

.q-list {
    margin: 0;
    padding: 0;
    li {
        height: 60px;
        line-height: 60px;
        border-bottom: 1px dashed #eaeaea;
        position: relative;
        padding: 0 20px;
        .q-num {
            font-weight: bold;
        }
        .q-btn {
            color: #005bc2;
            position: absolute;
            right: 5px;
            button {
                border: 0;
                background: transparent;
                color: #005bc2;
            }
        }
    }
}

.action-right-btn {
    float: right;
    clear: both;
    padding-left: 30px;
}

.right-div {
    padding: 25px 30px;
}



.q-num {
    .icon {
        display: none;
        cursor: pointer;
        color: red;
        font-size: 12px;
        margin: 0 5px;
    }
}

.q-list li:hover .icon {
    display: inline;
}

.up {
    transform: rotate(90deg);
}

.down {
    transform: rotate(270deg);
    position: relative;
    top: 2px;
}
</style>



