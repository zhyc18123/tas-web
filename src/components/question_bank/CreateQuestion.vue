<template>
    <div class="question-bank container">
        <el-dialog :visible.sync="tag1" width="70%">
            <pop-knowledge id='preTags' :tags="data.knowledgeTagsVo.preTags" @changeTags="changeTags" />

        </el-dialog>
        <el-dialog :visible.sync="tag2" width="70%">
            <pop-knowledge id='masterTags' :tags="data.knowledgeTagsVo.masterTags" @changeTags="changeTags" />
        </el-dialog>
        <el-dialog :visible.sync="tag3" width="70%">
            <pop-knowledge id="slaveTags" :tags="data.knowledgeTagsVo.slaveTags" @changeTags="changeTags" />
        </el-dialog>
        <el-row class="anchor">
            <a class="anchor-tag" :class="{active:data.beAnchor==='1'}" @click="goAnchor('#an-body');data.beAnchor='1'">题干</a>
            <a class="anchor-tag" :class="{active:data.beAnchor==='2'}" @click="goAnchor('#an-answer');data.beAnchor='2'">标准答案</a>
            <a class="anchor-tag" :class="{active:data.beAnchor==='3'}" @click="goAnchor('#an-explane');data.beAnchor='3'">范式解题</a>
            <a class="anchor-tag" :class="{active:data.beAnchor==='4'}" @click="goAnchor('#an-knowledge');data.beAnchor='4'">知识点</a>
        </el-row>
        <el-breadcrumb class="nav-little" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">
                <svg class="icon shouye" aria-hidden="true">
                    <use xlink:href="#icon-shouye1"></use>
                </svg>
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/main/question-bank' }">
                题库管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                新建题目
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="input-div">
            <el-col :span='4' class="b-title">
                题目编号 ：
            </el-col>
            <el-col :span='20'>
                <el-input :value="data.formData.no" :disabled="true" title="系统自动生成" placeholder="系统自动生成"></el-input>
            </el-col>
        </el-row>
        <el-row class="input-div">
            <el-col :span='4' class="b-title">
                题目来源 ：
            </el-col>
            <el-col :span='20'>
                <el-select v-model="data.formData.originYear" placeholder="请选择年份">
                    <el-option v-for="item in data.questionSource.years" :key="item.questionOriginId" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
                <el-select class="left30" v-model="data.formData.originAreaId" placeholder="请选择省份">
                    <el-option v-for="item in data.questionSource.areas" :key="item.questionOriginId" :label="item.name" :value="item.questionOriginId">
                    </el-option>
                </el-select>
                <el-select class="left30" v-model="data.formData.originSchoolId" placeholder="请选择名校">
                    <el-option v-for="item in data.questionSource.schools" :key="item.name" :label="item.name" :value="item.questionOriginId">
                    </el-option>
                </el-select>
                <el-select class="left30" v-model="data.formData.originNameId" placeholder="请选择来源">
                    <el-option v-for="item in data.questionSource.names" :key="item.names" :label="item.name" :value="item.questionOriginId">
                    </el-option>
                </el-select>

            </el-col>
        </el-row>
        <el-row class="input-div">
            <el-col :span='4' class="b-title">
                <em>*</em>
                题目类别 ：
            </el-col>
            <el-col :span='20'>
                <el-radio v-for="(item,i) in data.questionTypeList" :key="i" class="radio" v-model="data.formData.questionTypeId" :label="item.questionTypeId">{{item.name}}</el-radio>
            </el-col>
        </el-row>
        <el-row class="input-div" id="an-body">
            <el-col :span='4' class="b-title">
                <em>*</em>
                题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;干 ：
            </el-col>
            <el-col :span='18'>
                <v-editor :id="'tigan'" :readonly='!data.config.question_item_add' v-model="data.formData.body"></v-editor>
            </el-col>
            <el-col :offset="4">
                <el-button type="primary" class="sim-btn" @click.native="findSim();">相似/重复性检测</el-button>
            </el-col>
            <el-col :span="18" :offset="4">
                <span v-if="!simTable.length&&showNoFind">未在系统中找到相似/重复题目</span>
                <el-table v-if="simTable.length" empty-text="暂无题目" :data="simTable" style="width: 100%">
                    <el-table-column type="expand">
                        <template scope="scope">
                            <el-row class="detail">
                                <el-row>
                                    <el-col :span="4" class="detail-left">
                                        <img src="../../assets/img/range-img.png" />
                                        <span>题干</span>
                                    </el-col>
                                    <el-col :span="20" class="detail-right">
                                        <p v-html="scope.row.body"></p>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4" class="detail-left">
                                        <img src="../../assets/img/range-img.png" />
                                        <span>答案</span>
                                    </el-col>
                                    <el-col :span="20" class="detail-right">
                                        <p v-html="scope.row.answer"></p>
                                    </el-col>
                                </el-row>

                                <div v-show="!showMore" @click="showMore=true" class="more-btn">
                                    查看更多信息
                                </div>
                                <div v-show="showMore">
                                    <el-row>
                                        <el-col :span="4" class="detail-left">
                                            <img src="../../assets/img/range-img.png" />
                                            <span>范式</span>
                                        </el-col>
                                        <el-col :span="20" class="detail-right">
                                            <div v-for="(item,index) in scope.row.spps" v-if="data.sppConfigList.indexOf(item.subjectSppId)>-1">
                                                <span class="more-title">{{item.orderNo}}、{{item.subjectSppName}}</span>
                                                <span v-html="item.content"></span>
                                                <p class="ability-tag">
                                                    <span class="more-title">能力标签：</span>
                                                    <template v-for="itemA in item.abilityConfigItems">
                                                        <template v-for="itemAb in itemA.abilities">
                                                            <template v-for="itemTag in itemAb.tags">
                                                                {{itemTag.tagName }}
                                                            </template>
                                                        </template>
                                                    </template>
                                                </p>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="4" class="detail-left">
                                            <img src="../../assets/img/range-img.png" />
                                            <span>知识点</span>
                                        </el-col>
                                        <el-col v-if="scope.row.knowledgeTagsVo" :span="20" class="detail-right">
                                            <p v-if="config.question_item_edit_pre_tag">1、预选标签：
                                                <span v-for="item in scope.row.knowledgeTagsVo.preTags">{{item.knowledgeName}}</span>
                                            </p>
                                            <p v-if="config.question_item_edit_master_tag">2、主标签：
                                                <span v-for="item in scope.row.knowledgeTagsVo.masterTags">{{item.knowledgeName}}</span>
                                            </p>
                                            <p v-if="config.question_item_edit_slave_tag">3、副标签：
                                                <span v-for="item in scope.row.knowledgeTagsVo.slaveTags">{{item.knowledgeName}}</span>
                                            </p>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div v-show="showMore" @click="showMore=false" class="more-btn">
                                    收起
                                </div>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column width="200" label="题目编号" prop="no">
                    </el-table-column>
                    <el-table-column width="100" label="题目状态">
                        <template scope="scope">
                            <template v-for="item in editStatusList">
                                {{item.editStatus===scope.row.editStatus?item.name:''}}
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="100" label="相似度">
                        <template scope="scope">
                            {{scope.row.similar*100 | formatNumber(2)}}%
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="200" label="最后操作时间">
                        <template scope="scope">
                            {{scope.row.updateTime |formatTime('YYYY-MM-DD H:mm:ss') }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作人">
                        <template scope="scope">
                            <el-popover ref="hander" placement="bottom" width="400" trigger="click">
                                <el-table :data="scope.row.questionEditHistoryList">
                                    <el-table-column width="100" label="历史状态">
                                        <template scope="scope">
                                            <template v-for="item in editStatusList">
                                                {{item.editStatus===scope.row.editStatus?item.name:''}}
                                            </template>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作时间">
                                        <template scope="scope">
                                            {{scope.row.updateTime | formatTime('YYYY-MM-DD H:mm:ss')}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column width="100" property="principalName" label="操作人"></el-table-column>
                                </el-table>
                            </el-popover>
                            <span class="btn-span" v-popover:hander>{{scope.row.lastModifier}}</span>
                        </template>
                    </el-table-column>
                </el-table>

            </el-col>
        </el-row>
        <el-row class="input-div choose " id="an-answer">
            <el-col :span='4' class="b-title">
                <em>*</em>
                标准答案 ：
            </el-col>
            <el-col v-if="sysSubjectType==='0'" :span='18' class="choose-div">
                <el-checkbox-group v-model="data.chooseList">
                    <el-checkbox class="check-box" v-for="i in data.chooseNo" :key="i" :label="data.wordTable[i-1]">
                        {{data.wordTable[i-1]}}
                        <!--<v-editor :value="chooseAnswerArea[i-1]" :id="'answer'+i" @input='chooseInput(i,$event)'></v-editor>-->
                    </el-checkbox>
                </el-checkbox-group>
                <svg class="icon jian1" v-if="data.config.question_item_add" aria-hidden="true" @click="chooseCut">
                    <use xlink:href="#icon-jian1"></use>
                </svg>
                <svg class="icon tianjia" v-if="data.config.question_item_add" aria-hidden="true" @click="chooseAdd">
                    <use xlink:href="#icon-tianjia"></use>
                </svg>
                <v-editor :id="'answerRemark'" v-model="data.formData.answerRemark"></v-editor>
            </el-col>
            <div v-else>
                <el-col class="fill" v-show="sysSubjectType==='1'" :span='18' ref="fill">
                    <v-editor class="fill-editor" v-for="i in data.fillNo" :key="i" :value="data.fillAnswerArea[i-1]" :id="'answerInput'+i" @input='fillInput(i,$event)'></v-editor>

                    <svg class="icon jian1" v-if="data.config.question_item_add" aria-hidden="true" @click="fillCut">
                        <use xlink:href="#icon-jian1"></use>
                    </svg>
                    <svg v-if="data.config.question_item_add" class="icon tianjia" aria-hidden="true" @click="fillAdd">
                        <use xlink:href="#icon-tianjia"></use>
                    </svg>
                </el-col>
                <el-col v-show="sysSubjectType!=='1'" :span='18'>
                    <v-editor :id="'biaozhundaan'" :readonly='!data.config.question_item_add' v-model="data.formData.answer"></v-editor>
                </el-col>
            </div>
        </el-row>
        <el-row class="write-title " id="an-explane">
            范式解题 ：
        </el-row>
        <write-answer v-for="(item,index) in data.sppList" :key="index" :id='"ssp"  +item.orderNo' v-if="data.sppConfigList.indexOf(item.subjectSppId)>-1" :vtext='item.content' :index='index' :title='(index+1)+"、"+item.subjectSppName+" ："' :tag='item.abilityConfigItems' @textChange="textChange" />

        <el-row class="input-div " id="an-knowledge" v-if="config.question_item_edit_pre_tag">
            <el-col :span='4' class="b-title">
                知识点 ：
            </el-col>
            <el-col class="knowledge" :span='18'>
                <el-row class="knowledge-title">
                    <span>预选标签</span>
                    <em>“初级教研人员提供”</em>
                </el-row>
                <el-row class="tag">
                    <span v-for="item in data.knowledgeTagsVo.preTags">
                        {{item.knowledgeName}}
                        <svg class="icon clear" aria-hidden="true" @click="deleteTags($event,'preTags',item.knowledgeNodeId)">
                            <use xlink:href="#icon-clear"></use>
                        </svg>
                    </span>
                    <br/>
                    <em @click="tag1=true;">
                        <svg class="icon tianjia" aria-hidden="true">
                            <use xlink:href="#icon-tianjia"></use>
                        </svg>
                        添加
                    </em>

                </el-row>
                <template v-if="data.config.question_item_edit_master_tag">
                    <el-row class="knowledge-title">
                        <span>主标签</span>
                    </el-row>
                    <el-row class="tag">
                        <span v-for="item in data.knowledgeTagsVo.masterTags">
                            {{item.knowledgeName}}
                            <svg class="icon clear" aria-hidden="true" @click="deleteTags($event,'masterTags',item.knowledgeNodeId)">
                                <use xlink:href="#icon-clear"></use>
                            </svg>
                        </span>
                        <br/>
                        <em  @click="tag2=true;">
                            <svg class="icon tianjia" aria-hidden="true">
                                <use xlink:href="#icon-tianjia"></use>
                            </svg>
                            添加
                        </em>
                    </el-row>
</template>

<template v-if="data.config.question_item_edit_slave_tag">
    <el-row class="knowledge-title">
        <span>副标签</span>
    </el-row>
    <el-row class="tag">
        <span v-for="item in data.knowledgeTagsVo.slaveTags">
            {{item.knowledgeName}}
            <svg class="icon clear" aria-hidden="true" @click="deleteTags($event,'slaveTags',item.knowledgeNodeId)">
                <use xlink:href="#icon-clear"></use>
            </svg>
        </span>
        <br/>
        <em @click="tag3=true;">
            <svg class="icon tianjia" aria-hidden="true">
                <use xlink:href="#icon-tianjia"></use>
            </svg>
            添加
        </em>
    </el-row>
</template>
            </el-col>
        </el-row>

        <el-row class="input-div">
            <el-col :span='4' class="b-title">
                <em>*</em>
                当前题目状态 ：
            </el-col>
            <el-col :span='18'>
                <el-select v-model="data.formData.editStatus" placeholder="请选择">
                    <el-option v-for="item in editStatusList" :key="item.editStatus" :label="item.name" :value="item.editStatus">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row class="input-div" v-show="data.formData.editStatus==='1'||data.formData.editStatus==='3'||data.formData.editStatus==='5'">
            <el-col :span='4' class="b-title">
                备注 ：
            </el-col>
            <el-col :span='18'>
                <el-input class="remark-textarea"  v-model="data.formData.editRemark" type="textarea" autosize placeholder=""></el-input>
            </el-col>
        </el-row>

        <el-row class="write-btn">
            <el-button type="primary submit" :disabled="saveBtn" @click="saveQuestion">
                保存
            </el-button>
            <el-button type="primary cancle" @click="cancle">取消</el-button>
        </el-row>

        <el-popover ref="popover" placement="right" width="400" trigger="click">
            <span>text</span>
        </el-popover>
    </div>
</template>

<script>

import VEditor from '../common/Editor.vue'
import WriteAnswer from '../common/WriteAnswer'
import PopKnowledge from '../common/PopKnowledge'
import { mapGetters, mapActions } from 'vuex'
import storage from '../../lib/storage'
import io from '../../lib/io'
import util from '../../lib/util'
var debounce = require('lodash.debounce');
export default {
    name: 'question-bank',
    components: {
        VEditor,
        WriteAnswer,
        PopKnowledge
    },
    data() {
        return {
            saveBtn:false,
            showMore: false,
            simTable: '',
            showNoFind: false,
            tag1:false,
            tag2:false,
            tag3:false,
            data: {
                qDetail: '',
                module: this.$store.state.createQuestion.formData,
                input: '',
                chooseList: [],
                chooseAnswerArea: [],
                chooseNo: 4,
                wordTable: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
                fillNo: 1,
                fillAnswerArea: [],
                value: '',
                questionId: this.$route.query.questionId || '',
                formData: {
                    no: '',
                    questionTypeId: '',
                    inputAnswerArea: '',
                    originAreaId: '',
                    originYear: '',
                    originNameId: '',
                    originSchoolId: '',
                    body: '',
                    answer: '',
                    editStatus: '',
                    lastModifier: '',
                    editRemark: '',
                    answerRemark: '',
                    answerNum: ''
                },
                questionSource: {},
                sppList: [],
                ability: {},
                afterAbility: [],
                // selectedAbility: {},
                knowledgeTagsVo: { preTags: [], masterTags: [], slaveTags: [] },
                tiaojian: '',
                questionTypeList: [],
                sppConfigList: [],
                config: storage.getConfig(),
                inDrawShow: false,
                statusList: [],
                beAnchor: '',
                saveLeave: false,
                lastDetail: '',
                setInter: '',
                lockInter: ''
            }
        }
    },
    created() {
        this.sppResourceList();
        this.questionTypeOfSubjectList();
        this.questionOriginConfig();
        this.initEvent();
        if (this.data.questionId) {
            io.post(io.detectQuestionOptStatus, { questionId: this.data.questionId }, (data) => {
            })
            this.data.lockInter = setInterval(() => {
                io.post(io.detectQuestionOptStatus, { questionId: this.data.questionId }, (data) => {
                })
            }, 20000)
        }
    },
    watch: {
    },
    mounted() {
        util.initReEdit();
        window.onbeforeunload = (event) => {
            this.unLock();
        };
    },
    beforeRouteLeave: function(to, from, next) {
        if (this.data.saveLeave) {
            next(true);
        } else {
            if (!confirm('确定离开此页？')) {
                next(false)
            } else {
                this.unLock();
                next(true)
            }
        }
    },
    beforeDestroy() {
        this.unLock();
        clearInterval(this.data.setInter);
        clearInterval(this.data.lockInter);
    },
    computed: {
        ...mapGetters([
            'subjectId',
            'loginInfo'
        ]),
        config() {
            if (!this.$store.state.global.config) {
                this.$store.dispatch('config');
            };
            return this.$store.state.global.config;
        },
        sysSubjectType() {
            let sysSubjectType = '';
            if (this.data.questionTypeList && this.data.questionTypeList.length) {
                this.data.questionTypeList.map((item) => {
                    if (item.questionTypeId === this.data.formData.questionTypeId) {
                        sysSubjectType = item.sysSubjectType;
                    };
                });
            }
            return sysSubjectType;

        },
        editStatusList() {
            if (!this.$store.state.questionBank.editStatus.length) {
                this.$store.dispatch('editStatus');
            };
            let status = this.$store.state.questionBank.editStatus;
            this.data.statusList = status;
            if (status.length) {
                if (this.data.config.question_edit_status_storage) {
                    return status.slice(1, 10);
                } else if (this.data.config.question_edit_status_audit) {
                    return status.slice(1, 6);
                } else if (this.data.config.question_edit_status_analyse) {
                    return status.slice(1, 4);
                } else {
                    return status.slice(1, 2);
                };
            };

        },
        editStatus: ({
            get() {
                return this.$store.state.createQuestion.formData.editStatus;
            },
            set(value) {
                this.$store.dispatch('inputChange', { value: value, key: 'editStatus', module: this.data.module })
            }
        }),
    },
    methods: {
        cancle(){
            this.$router.push('/main/question-bank')
        },
        async findSim() {
            if (this.data.formData.body.length < 10) {
                this.$message('字数不能少于10个！');
                return;
            };
            let { data } = await io.post6(io.findSimQuestion, { content: this.data.formData.body, subjectId: storage.getSubjectId(),questionId: this.data.questionId });
            if (data.success) {
                this.showNoFind = true;

                try {
                    data.data.map((item) => {
                        let sysType = '';
                        this.data.questionTypeList.map((type) => {
                            if (type.questionTypeId === item.questionTypeId) {
                                sysType = type.sysSubjectType
                            }
                        });
                        if (sysType === '0') {
                            let answer = '';
                            item.answer = item.answer && JSON.parse(item.answer).join(',');
                        };
                        if (sysType === '1') {
                            let answer = '';
                            item.answer = item.answer && JSON.parse(item.answer).join(';');
                        };
                    })
                } catch (err) {
                    console.log(err)
                }
                this.simTable = data.data;
            }
        },
        goAnchor(selector) {
            var anchor = this.$el.querySelector(selector)
            $(document).scrollTop(anchor.offsetTop)
        },
        initEvent() {
            window.onbeforeunload = (event) => {
                this.unLock();
            }
        },
        unLock() {
            io.post(io.releaseQuestion, { questionId: this.data.questionId }, (data) => {
            })
        },
        fillInput(index, val) {
            if (!this.data.fillAnswerArea.length) {
                for (var i = 1; i < this.data.fillNo + 1; i++) {
                    this.data.fillAnswerArea.push('');
                };
            };
            this.data.fillAnswerArea[Number(index) - 1] = val;
        },
        questionTypeOfSubjectList() {
            io.post(io.questionTypeOfSubjectList, { subjectId: this.data.subjectId || storage.getSubjectId() }, (data) => {
                this.data.questionTypeList = data;
            })
        },
        sppResourceList() {
            io.post(io.sppResourceList, {
                subjectId: this.data.subjectId || storage.getSubjectId(), optRoleId: this.loginInfo.optRoleId
            }, (data) => {
                this.data.sppConfigList = [];
                data.map((item) => {
                    this.data.sppConfigList.push(item.subjectSppId
                    );
                });
                if (this.data.questionId) {
                    this.questionDetail();
                } else {
                    this.sppConfigOfSubject();
                }
            })
        },
        textChange(text, index) {
            this.data.sppList[index].content = text;
        },
        fillAdd() {
            this.data.fillNo++;
        },
        fillCut() {
            if (this.data.fillNo > 1) {
                this.data.fillNo--;
            } else {
                this.$message('至少有一个答案')
            }
        },
        chooseAdd() {
            this.data.chooseNo++;
        },
        chooseCut() {
            if (this.data.chooseNo > 1) {
                this.data.chooseNo--;
            } else {
                this.$message('至少有一个选项')
            }
        },
        setInt() {
            this.data.setInter = setInterval(() => {
                localStorage.setItem('qDetail', JSON.stringify(this.data))
            }, 5000);
        },
        questionDetail() {
            io.post(io.questionDetail, { questionId: this.data.questionId }, (data) => {
                let detail = localStorage.getItem('qDetail');
                if (detail) {
                    let detailObj = JSON.parse(detail);
                    if (detailObj.questionId === data.questionId) {
                        // this.localDetailTo(detailObj);
                        this.data = detailObj;
                    } else {
                        this.detailTo(data);
                        this.data.qDetail = data;
                    }
                } else {
                    this.detailTo(data);
                    this.data.qDetail = data;
                }
                this.setInt();
            })
        },
        // localDetailTo(localDetail){
        //     this.formData=localDetail;
        //     this.sppList=localDetail.sppList;
        //     this.knowledgeTagsVo=localDetail.knowledgeTagsVo;
        // },
        detailTo(data) {
            this.data.formData.questionTypeId = data.questionTypeId;
            setTimeout(() => {
                this.data.formData = data;
                this.data.sppList = data.spps;
                if (this.sysSubjectType == '0') {
                    this.data.chooseList = JSON.parse(data.answer);
                    // this.chooseAnswerArea = JSON.parse(data.inputAnswerArea)
                    this.data.chooseNo = Number(data.answerNum);
                };
                if (this.sysSubjectType == '1') {
                    this.data.fillAnswerArea = JSON.parse(data.inputAnswerArea)
                    this.data.fillNo = JSON.parse(data.inputAnswerArea).length;
                };
                this.data.knowledgeTagsVo = data.knowledgeTagsVo;
                for (var i = 0; i < this.editStatusList.length; i++) {
                    if (this.editStatusList[i].editStatus !== data.editStatus) {
                        this.data.statusList.map((item) => {
                            if (item.editStatus === data.editStatus) {
                                this.data.formData.editStatus = '请选择'
                            }
                        })
                    }
                }
            }, 200);
        },
        dealAllDetail() {
            let str = JSON.stringify(this.data.sppList);
            let saveSppList = JSON.parse(str);
            saveSppList.map((item) => {
                item.abilityConfigItems = this.dealSaveAbility(item.abilityConfigItems);
            });
            let data = {
                sysSubjectType: this.sysSubjectType,
                ...this.data.formData,
                subjectId: this.data.subjectId || storage.getSubjectId(),
                knowledgeTagsVo: this.data.knowledgeTagsVo,
                spps: saveSppList
            };
            return JSON.stringify(data);
        },
        saveQuestion() {
                this.saveBtn=true;
                setTimeout(()=>{
                    this.saveBtn=false
                },5000)
            // return
            if (this.sysSubjectType === '0') {
                if (!this.data.chooseList.length) {
                    this.$message('请选择答案！')
                    return;
                }
                this.data.formData.answerNum = this.data.chooseNo;
                this.data.formData.answer = JSON.stringify(this.data.chooseList);
                // if (!this.chooseAnswerArea.length) {
                //     this.$message('请输入答案内容');
                //     return;
                // }
                // this.formData.inputAnswerArea = JSON.stringify(this.chooseAnswerArea);
            };
            if (this.sysSubjectType === '1') {
                if (!this.data.fillAnswerArea.length) {
                    this.$message('请输入答案内容');
                    return;
                }
                this.data.formData.inputAnswerArea = JSON.stringify(this.data.fillAnswerArea);
                this.data.formData.answer = JSON.stringify(this.data.fillAnswerArea);
            };
            if (!this.data.formData.questionTypeId) {
                this.$message('请选择题目类别');
                return;
            };
            if (!this.data.formData.body) {
                this.$message('请输入题干');
                return;
            };
            if (!this.data.formData.answer) {
                this.$message('请输入答案');
                return;
            };
            if (!this.data.formData.editStatus || this.data.formData.editStatus === '请选择') {
                this.$message('请选择状态');
                return;
            };
            if (!this.data.formData.editRemark.length > 300) {
                this.$message('备注字数最多300字');
                return;
            };

            let questionQueryVo = this.dealAllDetail();
            // questionQueryVo=questionQueryVo.replace(new RegExp('\\\\\\\\\\\\','gm'),'');
            io.post(io.saveQuestion, { questionQueryVo: questionQueryVo }, (data) => {
                this.$message('保存成功！');
                localStorage.removeItem('qDetail');
                this.data.saveLeave = true;
                this.$router.push('/main/question-bank');
            })
        },
        deleteTags(e, id, tagId) {
            let dIndex = '';
            for (var i = 0; i < this.data.knowledgeTagsVo[id].length; i++) {
                if (this.data.knowledgeTagsVo[id][i].knowledgeNodeId === tagId) {
                    dIndex = i;
                    break;
                }
            }
            this.data.knowledgeTagsVo[id].splice(dIndex, 1);
        },
        changeTags(tags, id) {
            this.data.knowledgeTagsVo[id] = [];
            this.data.knowledgeTagsVo[id].push(...tags);
        },
        questionOriginConfig() {
            io.post(io.questionOriginConfig, { subjectId: this.data.subjectId || storage.getSubjectId(), subjectName: storage.getSubjectName() }, (data) => {
                this.data.questionSource = data;
            })
        },
        sppConfigOfSubject() {
            io.post(io.sppOfSubject, { subjectId: this.data.subjectId || storage.getSubjectId() }, (data) => {
                this.data.sppList = data;
                this.abilityConfigOfSubject();
            })
        },
        dealAbility(ab) {
            if (ab.length) {
                ab.map((item) => {
                    item.abilities.map((itemA) => {
                        let tags = [];
                        itemA.tags.map((itemT) => {
                            tags.push({ tagName: itemT, checkedStatus: false });
                        });
                        itemA.tags = tags;
                    });
                });
            };
            return ab;
        },
        dealSaveAbility(ab) {
            if (ab.length) {
                ab.map((item) => {
                    item.abilities.map((itemA) => {
                        let tags = [];
                        itemA.tags.map((itemT) => {
                            if (itemT.checkedStatus) {
                                tags.push(itemT)
                            }
                        });
                        itemA.tags = tags;
                    });
                });
            };
            return ab;
        },
        abilityConfigOfSubject() {
            io.post(io.abilityOfQuestion, { subjectId: this.data.subjectId || storage.getSubjectId() }, (data) => {
                this.data.abilities = data;
                this.data.sppList.map((item, i) => {
                    this.$set(this.data.sppList[i], 'content', '');
                    var arr = JSON.stringify(data.abilityConfigItems);
                    this.$set(this.data.sppList[i], 'abilityConfigItems', JSON.parse(arr));
                });
            })
        },


    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.check-box {
    margin-right: 30px;
}

.anchor {
    position: fixed;
    left: 4%;
    z-index: 11111;
    width: 100px;
    top: 200px;
    .anchor-tag {
        display: block;
        background: #6cc6e6;
        color: white;
        margin-top: 5px; // text-align: center;
        padding-left: 20px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        &:hover,
        &.active {
            background: #009fd7;
        }
    }
}

.choose {
    .icon {
        font-size: 18px;
        color: #00c1d1;
        margin-right: 5px;
    }
    .el-checkbox {
        margin-bottom: 10px;
        margin-left: 0;
    }
}

.fill {
    .el-input {
        width: 200px !important;
        margin-right: 10px;
        margin-bottom: 10px;
    }
}

.question-bank {
    background: white;
}

.nav-little {
    height: 50px;
    line-height: 50px;
    color: #999;
    font-size: 12px;
    border-bottom: 1px solid #f1f1f1;
    margin: 0 20px;
}

.shouye {
    color: #999;
}

.input-div {
    margin: 25px 0;
    line-height: 34px;
    .b-title {
        text-align: right;
        line-height: 34px;
        color: #333;
        font-weight: bold;
        em {
            color: red;
        }
    }
    .el-checkbox-group {
        display: inline-block;
    }
    .el-input {
        width: 50%;
    }
    .left30 {
        margin-left: 30px;
    }
}

.write-title {
    margin: 0 20px;
    height: 40px;
    line-height: 40px;
    color: #333;
    background: #f1f1f1;
    font-weight: bold;
    padding-left: 30px;
    font-size: 14px;
}

.tag {
    padding: 10px 15px;
    font-size: 14px;
    line-height: 30px;
    border-bottom: 1px solid #bfebf3;
    &:last-child {
        border-bottom: 0;
    }
    span {
        display: inline-block;
        height: 28px;
        border: 1px solid #bfebf3;
        line-height: 28px;
        border-radius: 28px;
        padding: 0 10px;
        margin-right: 18px;
        font-size: 12px;
        margin-bottom: 10px !important;
        margin-top: 5px;
        .icon {
            cursor: pointer;
            margin-left: 10px;
            color: #bfeff3;
        }
        &:hover {
            border-color: #00b1d1;
            .icon {
                color: #3ec4dc;
            }
        }
    }
    em {
        font-size: 12px;
        color: #0066d9;
        cursor: pointer;
        .icon {
            font-size: 16px;
            color: #00b1d1;
            position: relative;
            top: 2px;
        }
    }
}

.knowledge {
    border: 1px solid #bfebf3;
}

.knowledge-title {
    font-size: 16px;
    color: #00b1d1;
    font-weight: bold;
    padding-left: 15px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #bfebf3;
    em {
        color: #999;
        font-size: 12px;
    }
}

.write-btn {
    text-align: center;
    font-size: 16px;
    padding-bottom: 220px;
    button {
        border: 1px solid #00b1d1;
        ;
        width: 100px;
        height: 38px;
    }
    .submit {
        background: #00b1d1;
    }
    .cancle {
        background: white;
        color: #00b1d1;
        border: 1px solid #00b1d1;
    }
}

.more-btn {
    margin-left: 30px;
    text-decoration: underline;
    color: #20a0ff;
    cursor: pointer;
}

.detail {
    margin-left: 50px;
    background: #f8fbfc;
    border-left: 1px solid #cceef4;
    padding: 40px 0 20px 0;
    .el-row {
        margin-bottom: 20px;
        .el-col-20 {
            overflow: hidden;
        }
    }
    .detail-right {
        margin-top: 6px;
        p {
            line-height: 30px;
        }
    }
    .detail-left {
        position: relative;
        width: 100px;

        img {
            position: relative;
            left: -7px;
        }
        span {
            position: absolute;
            z-index: 1;
            left: 16px;
            top: -2px;
            font-weight: bold;
        }
    }
}

.sim-btn {
    margin: 20px 0
}
</style>
<style lang="less">
.choose-div {
    .edui-editor.edui-default {}
}

.fill-editor {
    margin-top: 10px;
}

.remark-textarea {
    textarea {
        min-height: 33px!important;
    }
}
</style>

