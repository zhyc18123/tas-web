<template>
  <div class="teaching">
    <el-row class="search">
      <el-col :span="5">
        <span>讲义编号 ：</span>
        <el-input v-model="form.no" placeholder="请输入编号"></el-input>
      </el-col>
      <el-col :span="5">
        <span>讲义标签 ：</span>
        <el-input v-model="form.tag" placeholder="请输入标签"></el-input>
      </el-col>
      <el-col :span="5">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;讲义标题 ：</span>
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-col>
      <el-col :span="5">
        <span>讲义讲次 ：</span>
        <el-input v-model="form.lectureNo" type="number" placeholder="请输入讲次"></el-input>
      </el-col>
      <el-col :span="4">
        <span>创建人 ：</span>
        <el-input v-model="form.creator" placeholder="请输入创建人"></el-input>
      </el-col>
      <el-col :span="10" class="last-date">
        <span>创建时间 ：</span>
        <el-date-picker :clearable="false" :editable="false" v-model="createTimeStart" type="date" placeholder="选择日期">
        </el-date-picker>
        &nbsp;&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;&nbsp;
        <el-date-picker :clearable="false" :editable="false" v-model="createTimeEnd" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-col>
      <!--<el-col :span="5">
                    <span>最后编辑人 ：</span>
                    <el-input v-model="form.lastModifier" placeholder="请输入编辑人"></el-input>
                  </el-col>-->
      <el-col :span="10" class="last-date">
        <span>最后编辑时间 ：</span>
        <el-date-picker :clearable="false" :editable="false" v-model="updateTimeStart" type="date" placeholder="选择日期">
        </el-date-picker>
        &nbsp;&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;&nbsp;
        <el-date-picker :clearable="false" :editable="false" v-model="updateTimeEnd" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click.native="search();" class="search-btn">搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="head-btn">
      <span v-if="config.lecture_note_item_add" class="el-button el-button-primary create-btn" @click="newLecture">
        新建讲义
      </span>
      <el-button v-if="config.lecture_note_item_export" type="primary" class="show-btn" @click="exportBatch">批量导出</el-button>
    </el-row>

    <el-row>
      <el-table :data="teachingData.list" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column fixed="left" width="150" label="讲义标题" prop="title">
        </el-table-column>
        <el-table-column width="150" label="讲义编号" prop="no">
        </el-table-column>
        <el-table-column width="150" label="讲义标签" prop="tag">
        </el-table-column>
        <el-table-column width="150" label="讲次设定" prop="lectureNo">
        </el-table-column>
        <el-table-column width="150" label="讲义版本" prop="version">
        </el-table-column>
        <el-table-column width="150" label="创建人" prop="creator">
        </el-table-column>
        <el-table-column width="200" label="创建时间">
          <template scope="scope">
            {{scope.row.createTime | formatTime('YYYY-MM-DD H:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column align="center" width="400" label="最后编辑时间">
          <template scope="scope">
            {{scope.row.updateTime |formatTime('YYYY-MM-DD H:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template scope="scope">
            <span v-if="config.lecture_note_question_setting" class="write-btn btn-span" @click="setQuestionAble(scope.row)">
              题目权限
            </span>
            <span v-if="config.lecture_note_setting" class="write-btn btn-span" @click="reLecture(scope.row)">
              讲义设定
            </span>
            <router-link v-if="config.lecture_note_item_edit" tag="span" :to="{path:'/main/production/edit-teaching',query:{lectureNoteId:scope.row.lectureNoteId,versionId:scope.row.versionId}}" class="write-btn btn-span">
              编辑
            </router-link>
            <span v-if="config.lecture_note_item_export" class="write-btn btn-span" @click="exportOne(scope.row)">
              导出
            </span>
            <span v-if="config.lecture_note_item_del" class="write-btn btn-span" @click="deleteTeaching(scope.row.lectureNoteId)">
              删除
            </span>

          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <v-pagination class="pag" :pageSize="20" :total="teachingData.total|toNumber" @getListResult="lectureNoteList"></v-pagination>

    <el-dialog class="teaching-dialog" :visible.sync="showSetAble" title="设置题目权限" placement="right" width="550" trigger="click">

                            <span class="q-btn">
            <set-able :item='tableRow' :lectureNoteId="rowLectureNoteId" type='1' @success="showSetAble=false"/>
                            </span>

            </el-dialog>
    <el-dialog class="teaching-dialog" :visible.sync="dialogShow" title="请选择导出条件" placement="right" width="550" trigger="click">
      <el-row class="s-body">
        <el-row class="s-item">
          <span class="s-title">师生版本 ：</span>
          <el-radio v-model="tsVersion" label="0">教师版</el-radio>
          <el-radio v-model="tsVersion" label="1">学生版</el-radio>
        </el-row>
        <el-row class="s-item">
          <span class="s-title">内容版本 ：</span>
          <el-radio v-model="contentVersion" label="0">校对版</el-radio>
          <el-radio v-model="contentVersion" label="1">录排版</el-radio>
        </el-row>
        <el-row class="s-item">
          <span class="s-title">格式 ：</span>
          <el-radio v-model="format" label="0">.doc</el-radio>
          <el-radio v-model="format" label="1" v-show="false">.pdf</el-radio>
        </el-row>
        <el-row class="s-item">
          <span class="s-title">合并讲义 ：</span>
          <el-radio v-model="merge" label="1">是</el-radio>
          <el-radio v-model="merge" label="0">否</el-radio>
        </el-row>
      </el-row>
      <el-row class="out-btn">
        <el-button type="primary" class="min-button" @click="exportDocx">导出</el-button>
      </el-row>
    </el-dialog>

    <el-dialog class="teaching-dialog" :visible.sync="showNewTeaching" :title="popType==='0'?'新建讲义':'讲义设定'" placement="right" width="550" trigger="click">
      <el-row class="s-body new-body">
        <el-row class="s-item">
          <span class="s-title">版本设定 ：</span>
          <el-select :disabled='popType==="1"' v-model="newForm.versionId" placeholder="请选择版本">
            <el-option v-for="(item,i) in versionList" :key="i" :label="item.name" :value="item.knowledgeTreeId">
            </el-option>
          </el-select>
        </el-row>
        <el-row class="s-item">
          <span class="s-title">标签设定 ：</span>
          <el-select v-model="newForm.tagId" placeholder="请选择标签">
            <el-option v-for="(item,i) in tagList" :key="i" :label="item.name" :value="item.tagId">
            </el-option>
          </el-select>
        </el-row>
        <el-row class="s-item">
          <span class="s-title">讲次设定 ：</span>
          <el-input type="number" v-model="newForm.lectureNo" placeholder="只能输入数字"></el-input>
        </el-row>
        <el-row class="s-item">
          <span class="s-title">讲次标题 ：</span>
          <el-input v-model="newForm.title" placeholder="请输入标题"></el-input>
        </el-row>
      </el-row>
      <el-row class="out-btn">
        <el-button type="primary" class="min-button" @click="toEdit">{{popType==='0'?'下一步':'保存'}}</el-button>
      </el-row>
    </el-dialog>
    <div id="export" style="display:none">
      <div class="export-item" v-for="(item,i) in lectureDetail" :key="i">
        <template v-if="item.lectureNote&&item.lectureNodeContentList">
          <h2 style="textAlign:center;fontSize:21.4px;" class="l-title">{{item.lectureNote.title}}</h2>
          <span v-for="(nodeItem,nodeI) in item.lectureNodeContentList">
            <h3 style="color:#843c0b;fontSize:16px"  class="l-title">{{nodeItem.name}}
              <!--<span style="marginLeft:20px;">{{nodeItem.name}}</span>-->
            </h3>
            <template v-if="nodeItem.lectureNodeContentKnowledgeList" v-for="(klItem,klI) in nodeItem.lectureNodeContentKnowledgeList">
              <template v-if="klItem.properties&&klItem.properties.indexOf('requirement')>-1">
            <h4 style="color:#0070c0" class="l-title">知识要求：</h4>
                <p style="color:#00499c;fontSize:14px;fontWeight:bold;"  v-html="klItem.knowledgeNodeName"></p>
                <p style="textIndent:2em;" class="content-div" v-html="klItem.lectureNodeContentKnowledgeItemVo&&klItem.lectureNodeContentKnowledgeItemVo.requirement"></p>
              </template>
            </template>
            <template v-if="nodeItem.lectureNodeContentKnowledgeList" v-for="(klItem,klI) in nodeItem.lectureNodeContentKnowledgeList">
              <template v-if="klItem.properties&&klItem.properties.indexOf('content')>-1">
            <h4 style="color:#0070c0" class="l-title">知识讲解：</h4>
                <p style="color:#00499c;fontSize:14px;fontWeight:bold;" v-html="klItem.knowledgeNodeName"></p>
                <p style="textIndent:2em;" class="content-div" v-html="klItem.lectureNodeContentKnowledgeItemVo&&klItem.lectureNodeContentKnowledgeItemVo.content"></p>
              </template>
            </template>
            <template v-if="nodeItem.lectureNodeContentKnowledgeList" v-for="(klItem,klI) in nodeItem.lectureNodeContentKnowledgeList">
              <template v-if="klItem.properties&&klItem.properties.indexOf('testDescription')>-1">
            <h4 style="color:#0070c0" class="l-title">题型描述：</h4>
                <p style="color:#00499c;fontSize:14px;fontWeight:bold;"  v-html="klItem.knowledgeNodeName"></p>
                <p style="textIndent:2em;" class="content-div" v-html="klItem.lectureNodeContentKnowledgeItemVo&&klItem.lectureNodeContentKnowledgeItemVo.testDescription"></p>
              </template>
            </template>
            <template v-if="nodeItem.lectureNodeContentQuestionList.length">
              <div v-for="(qItem,qI) in nodeItem.lectureNodeContentQuestionList">

            <h4  style="color:#0070c0" class="l-title">典型例题：</h4>
                <h4 style="lineHeight:1.3;fontSize:14px;" v-if="qItem.setSeeAble&&qItem.setSeeAble.indexOf('题干')>-1">
                  <p>
                    <a :href='host+"/#/main/question-bank/create-question?questionId="+qItem.questionId' v-if="contentVersion==='0'">{{host+'/#/main/question-bank/create-question?questionId='+qItem.questionId}}</a>
                  </p>
                  <span style="display:inline-block;verticalAlign:top;"  class="content-div">{{qI+1}}、</span>
                  <p style="display:inline-block" class="content-div" v-html="qItem.questionVo&&qItem.questionVo.body">
                  </p>
                </h4>
                <p style="lineHeight:30px" v-if="qItem.setSeeAble&&qItem.setSeeAble.indexOf('答案')>-1">
                  <span style="fontSize:14px">答案：</span>
                  <span  class="content-div" v-html="qItem.questionVo&&qItem.questionVo.answer"></span>
                </p>
                <template v-if="qItem.questionVo">
                  <p v-for="(fItem,fI) in qItem.questionVo.spps" style="lineHeight:30px" v-if="qItem.setSeeAble&&qItem.setSeeAble.indexOf(fItem.subjectSppId)>-1">
                    <span style="fontSize:14px;fontWeight:bold">【{{fItem.subjectSppName}}】</span>
                    <span style="display:inline-block" class="content-div" v-html="fItem.content"></span>
                  </p>
                </template>
              </div>
            </template>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
//require('pdfmake/build/pdfmake.js')
//require('pdfmake/build/vfs_fonts.js')
require('../../lib/exportWord/js/jquery.wordexport.js')
import io from '../../lib/io'
import util from '../../lib/util'
import conf from '../../lib/conf'
import storage from '../../lib/storage'
import { mapGetters, mapActions } from 'vuex'
import VPagination from '../common/Pagination.vue'
import PopKnowledgeSearch from '../common/PopKnowledgeSearch'
import SetAble from '../common/SetAble'
export default {
  name: 'teaching',
  data() {
    return {
      tableRow:{},
      rowLectureNoteId:'',
      popType:'0',//0,新建讲义；1，讲义设定
      subjectId: storage.getSubjectId(),
      subjectName: storage.getSubjectName(),
      versionList: [],
      showSetAble:false,
      dialogShow: false,
      showNewTeaching: false,
      previewWord: false,
      teachingData: {},
      updateTimeStart: '',
      updateTimeEnd: '',
      questionTypeList: '',
      tsVersion: '0',
      contentVersion: '0',
      format: '0',
      merge: '1',
      host: "http://" + document.location.host,
      tagList: [],
      createTimeStart: '',
      createTimeEnd: '',
      lastModifier: '',
      updateTimeStart: '',
      updateTimeEnd: '',
      exportItem: [],
      lectureDetail: [],
      form: {
        subjectId: storage.getSubjectId(),
        no: '',
        tag: '',
        title: '',
        lectureNo: '',
        creator: '',
        createTimeStart: '',
        createTimeEnd: '',
        lastModifier: '',
        updateTimeStart: '',
        updateTimeEnd: '',
        pageNo: 1,
        pageSize: 20
      },
      newForm: {
        versionId: '',
        tagId: '',
        lectureNo: '',
        title: ''
      }
    }
  },
  components: {
    VPagination,
    PopKnowledgeSearch,
    SetAble
  },
  computed: {
    ...mapGetters([
      'loginInfo'
    ]),
    config() {
      if (!this.$store.state.global.config) {
        this.$store.dispatch('config');
      };
      return this.$store.state.global.config;
    },
    editStatusList() {
      return this.$store.state.questionBank.editStatus;
    },
  },
  created() {
    this.knowledgeTreeList();
    this.getTagList();
    sessionStorage.removeItem('activeItem');
    sessionStorage.removeItem('exportSelect')
  },
  mounted() {
    this.lectureNoteList();
  },
  beforeDestroy() {
  },
  methods: {
    setQuestionAble(row){
      this.tableRow=row;
      this.rowLectureNoteId=row.lectureNoteId;
      this.showSetAble=true;
    },
    newLecture(){
      this.showNewTeaching=true;
      this.popType='0';
      this.newForm.versionId='';
      this.newForm.tagId='';
      this.newForm.lectureNo='';
      this.newForm.title='';
    },
    reLecture(row){
      this.popType='1';
      this.showNewTeaching=true;
      this.newForm.versionId=row.versionId;
      this.newForm.tagId=row.tagId;
      this.newForm.lectureNo=row.lectureNo;
      this.newForm.title=row.title;
      this.newForm.lectureNoteId=row.lectureNoteId;
    },
    exportOne(item) {
      this.dialogShow = true;
      this.exportItem = [];
      this.exportItem.push(item);
    },
    exportBatch() {
      let exportItems = sessionStorage.getItem('exportSelect') && JSON.parse(sessionStorage.getItem('exportSelect')) || '';
      if (exportItems.length) {
        this.dialogShow = true;
        this.exportItem = [];
        this.exportItem = [...exportItems];
      } else {
        this.$message('至少选中一个讲义');
      }
    },
    async exportDocx() {
      console.log(this.exportItem)
      this.$loading()
      let ids=[]
      this.exportItem.map((item,i)=>{
        ids.push(item.lectureNoteId)
      })
      let { data } = await io.post6(io.generateFile, { tsVersion: this.tsVersion, contentVersion: this.contentVersion, format: this.format, merge: this.merge, subjectId:this.subjectId,lectureNoteIds:ids.join(',') });
      if (data.success) {
    
      let postInter=setInterval(async()=>{
      let res = await io.post6(io.generateFileStatus, { filePath:data.data.filePath,fileNum:this.merge==='1'?1:data.data.fileNum});
      if (res.data.success&&res.data.data.status==='1') {
        this.dialogShow=false;
        this.$loading().close();
        this.exportFile(data.data);
        clearInterval(postInter);
      }
    },5000);
    
      }

    },
    async exportFile(data) {
      console.log('dta',data)
      window.open(io.exportFile + '?filePath=' + data.filePath + '&fileNum=' + data.fileNum + '&accessToken=' + storage.getAccessToken());
    },
    async toEdit() {
      if (!this.newForm.versionId) {
        this.$message("版本不能为空");
        return;
      };
      if (!this.newForm.tagId) {
        this.$message("标签不能为空");
        return;
      };
      if (!this.newForm.lectureNo) {
        this.$message("讲次不能为空");
        return;
      };
      if (!(/(^[1-9]\d*$)/.test(this.newForm.lectureNo))) {
        this.$message('输入的不是正整数');
        　　　　　　return false;
      　　　　};
      if (!this.newForm.title) {
        this.$message("讲次标题不能为空");
        return;
      };

      let { data } = await io.post6(io.saveOrUpdateLectureNoteBaseInfo, { ...this.newForm, subjectId: this.subjectId });
      if (data.success) {
        if(this.popType==='0'){
        this.$router.push({ path: '/main/production/edit-teaching', query: { lectureNoteId: data.data.lectureNoteId, versionId: data.data.versionId } });
      }else{
        this.showNewTeaching=false;
          this.lectureNoteList();
        }
      }
    },
    handleSelectionChange(val) {
      // console.log(val)
      // this.exportItem = [...val];
      sessionStorage.setItem('exportSelect', JSON.stringify(val))
    },
    deleteTeaching(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let { data } = await io.post6(io.deleteLectureNote, { lectureNoteId: id });
        if (data.success) {
          this.$message('删除成功！')
        }
        this.lectureNoteList();
      }).catch(() => {
        this.$message('已取消删除');
      });
    },
    handlePage(pageNo) {
      this.form.pageNo = pageNo;
      this.lectureNoteList();
    },
    async  getTagList() {
      let { data } = await io.post6(io.tagList, { subjectName: this.subjectName });
      if (data.success) {
        this.tagList = data.data;
      }
    },
    async  knowledgeTreeList() {
      let { data } = await io.post6(io.knowledgeTreeList, { subjectId: this.subjectId });
      if (data.success) {
        this.versionList.push.apply(this.versionList, data.data);
      }
    },
    async lectureNoteList(obj) {
      this.$loading();
      let { data } = await io.post6(io.lectureNoteList, { ...this.form, ...obj });
      if (data.success) {
        this.$loading().close();
        data.data.list.map((item) => {
          item.checked = true;

                    item.dialogTableVisible = false;
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
                
        })
        
        this.teachingData = data.data;
      }

    },
    search() {
      this.form.pageNo = 1;
      let form = this.form;
      if (this.updateTimeStart) {
        this.form.updateTimeStart = util.formatTime(this.updateTimeStart, 'YYYY-MM-DD') + ' 00:00:00'
      } else {
        this.form.updateTimeStart = '';
      };
      if (this.updateTimeEnd) {
        this.form.updateTimeEnd = util.formatTime(this.updateTimeEnd, 'YYYY-MM-DD') + ' 23:59:59'
      } else {
        this.form.updateTimeEnd = '';
      };
      if (this.createTimeStart) {
        this.form.createTimeStart = util.formatTime(this.createTimeStart, 'YYYY-MM-DD') + ' 00:00:00'
      } else {
        this.form.createTimeStart = '';
      };
      if (this.createTimeEnd) {
        this.form.createTimeEnd = util.formatTime(this.createTimeEnd, 'YYYY-MM-DD') + ' 23:59:59'
      } else {
        this.form.createTimeEnd = '';
      };
      this.lectureNoteList();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.teaching {
  background: white;
  padding: 20px;
  padding-bottom: 100px;
  min-height: 800px;
}

.out-word {
  text-align: left;
  padding: 50px;
  box-sizing: border-box;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100%;
  width: 100%;
  overflow: auto;
}

.k-search {
  position: fixed;
  left: 3%;
  top: 192px;
  z-index: 11;
  background: white;
  text-align: center;
  cursor: pointer;
  padding: 4px;
  width: 70px;
  height: 70px;
  border-radius: 4px;
  border: 1px solid #eee;
  img {
    margin-top: 3px;
  }
  span {
    font-size: 12px;
    color: #00a4d4;
    display: block;
    font-style: normal;
  }
}

.more-title {
  color: #ff8400;
  font-weight: bold;
  margin-bottom: 5px;
  display: inline-block;
}

.nav-little {
  height: 50px;
  line-height: 50px;
  color: #999;
  font-size: 12px;
  border-bottom: 0;
  margin: 0 0px;
}

.ability-tag {
  margin: 10px 0;
}

.more-btn {
  margin-left: 30px;
  text-decoration: underline;
  color: #20a0ff;
  cursor: pointer;
}

.search {
  font-size: 12px;
  padding: 10px 20px;
  background: #f7f7f7;
  margin-bottom: 15px;
  .el-col {
    margin: 5px 0
  }
  .el-select {
    width: 100px;
  }
  .el-input {
    width: 120px;
  }
  .last-date {
    .el-input {
      width: 142px;
    }
  }
  .search-btn {
    width: 60px;
    height: 30px;
    padding: 0;
    background: #009ada;
    margin-bottom: 5px;
  }
}

.head-btn {
  text-align: right;
  margin-bottom: 5px;
  button {
    height: 30px;
    padding: 0;
    width: 90px;
    border: 0;
  }
  .create-btn {
    background: #00b1d1;
    color: white;
    height: 30px;
    line-height: 28px;
    padding: 0;
    width: 90px;
    border: 0;
  }
  .show-btn {
    background: #01cabf;
  }
}

.pag {
  text-align: right;
  padding-top: 20px;
  margin-top: 0;
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
      top: 7px;
      font-weight: bold;
    }
  }
}

.btn-span {
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  color: #0084bb;
  margin-right: 5px;
  &:hover {
    color: #00b1d1;
  }
}

.reason-pop {
  background: white;
  border: 1px solid #dff1f6;
  background: #dff1f6;
  color: #666;
  .reason-right {
    min-height: 33px;
  }
  .el-col-4 {
    text-align: right;
    padding: 10px 0;
    &.checker {
      border-top: 1px solid white;
      border-bottom: 1px solid white;
    }
  }
  .el-col-20 {
    background: white;
    padding: 10px;
    &.checker {
      border-top: 1px solid #dff1f6;
      border-bottom: 1px solid #dff1f6;
    }
  }
}

.knowledge-point {
  margin-right: 20px;
}

.write-btn {
  cursor: pointer;
}

.out-btn {
  padding: 15px 0;
  text-align: center;
  border-top: 1px solid #eaeaea;
}

.s-body {
  padding: 40px 0;
}

.s-item {
  margin-top: 10px;
  color: #005875;
  font-size: 14px;
  height: 34px;
  line-height: 34px;
  &:first-child {
    margin-top: 0;
  }
  .s-title {
    display: inline-block;
    width: 138px;
    font-weight: bold;
    text-align: right;
    margin-right: 30px;
  }
  .el-radio {
    color: #005875;
    display: inline-block;
    width: 100px;
  }
  .el-input,
  .el-select {
    width: 200px;
  }
}

.new-body {
  .s-title {
    width: 200px;
    margin-right: 10px;
  }
}
</style>
<style lang="less">
.teaching-dialog .el-dialog--small {
  width: 550px !important;
}

.el-input {
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  font-size: 12px;
}

.search {
  .el-input__icon+.el-input__inner {
    height: 30px;
    line-height:30px;
    font-size: 12px;
  }
  .el-input__inner {
    border-color: #fefefe;
  }
  .el-input__inner {
    height: 30px;
    line-height:30px;
  }
  .el-input__icon {
    color: #5ee6ff;
    font-size: 18px;
  }
}
</style>

