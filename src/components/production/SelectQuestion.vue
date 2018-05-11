<template>
  <el-row class="container select-question">
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


    </el-col>
    <el-row class="select-body">
      <el-row class="search-form">
        <el-row>
          <el-col :span="8">
            <span>关键词 ：</span>
            <el-input v-model="form.keyword" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="8">
            <span>题号 ：</span>
            <el-input v-model="form.no" placeholder="请输入题号"></el-input>
          </el-col>
      <el-col :span="8">
        <span>题目状态 ：</span>

        <el-select v-model="form.editStatus" placeholder="全部状态">
          <el-option v-for="item in editStatusList" :key="item.editStatus" :label="item.name" :value="item.editStatus">
          </el-option>
        </el-select>

      </el-col>
        </el-row>
        <el-row>
          <span>题目类别 ：</span>


          <el-select v-model="form.questionTypeId" placeholder="题目类别">
          <el-option value="">
            全部
          </el-option>
          <el-option v-for="(item,i) in questionTypeOfSubjectList" :key="i" :label="item.name" :value="item.questionTypeId">
          </el-option>
          </el-select>

          <span>题目来源 ：</span>

          <el-select v-model="form.originName" placeholder="题目来源">
            <el-option v-for="(item,i) in originConfig.names" :key="i" :label="item.name" :value="item.name">
            </el-option>
          </el-select>

          <span>年份 ：</span>

          <el-select v-model="form.originYear" placeholder="年份">
            <el-option v-for="(item,i) in originConfig.years" :key="i" :label="item.name" :value="item.name">
            </el-option>
          </el-select>

          <span>地区 ：</span>

          <el-select v-model="form.originArea" placeholder="地区">
            <el-option v-for="(item,i) in originConfig.areas" :key="i" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-row>
        <el-row class="search-by">

          <el-popover v-model="mVisiable" popper-class="search-tag" placement="bottom" width="850" trigger="click" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">

            <pop-knowledge-search :noType="true" @kSearch="mSearch" id="masterTags" :tags="mTags" @changeTags="mChangeTags"/>

            <el-button type="text" slot="reference" >按主标签搜索</el-button>
          </el-popover>
          <el-popover v-model="sVisiable"  popper-class="search-tag" placement="bottom" width="850" trigger="click" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <pop-knowledge-search :noType="true" @kSearch="sSearch" id="slaveTags" :tags="sTags" @changeTags="sChangeTags" />
            <el-button type="text" slot="reference" @click="slaveBtn">按副标签搜索</el-button>
          </el-popover>

        </el-row>
      </el-row>
      <el-row class="q-list">
        <template v-for="(item,i) in questionData.list">
          <question-item :question="item" :sppConfigList="sppConfigList" class="q-item">
            <el-checkbox slot="num" @change="checkedQuestion(item)" v-model="item.checked"></el-checkbox>
          </question-item>
        </template>
        <v-pagination class="pag" :total="questionData.total|toNumber" @getListResult="lectureNoteQuestionList"></v-pagination>
      </el-row>
    </el-row>
    <el-row class="back">
    <el-button type="primary" @click="$router.go(-1)">确定</el-button>
    </el-row>
  </el-row>
</template>

<script>
import QuestionItem from '../common/QuestionItem'
import ListParent from '../common/ListParent'
import util from '../../lib/util'
import storage from '../../lib/storage'
import io from '../../lib/io'
import VPagination from '../common/Pagination'
import PopKnowledgeSearch from '../common/PopKnowledgeSearch'
export default {
  name: 'select-question',
  components: {
    ListParent,
    QuestionItem,
    VPagination,
    PopKnowledgeSearch
  },
  data() {
    return {
      versionId: this.$route.query.versionId,
      loginInfo: storage.getCurrentUserInfo(),
      subjectId: storage.getSubjectId(),
      lectureNodeId: this.$route.query.lectureNodeId,
      lectureNoteId: this.$route.query.lectureNoteId,
      checked: false,
      form: '',
      list: ['1'],
      questionData: [],
      sppConfigList: [],
      questionTypeOfSubjectList:[],
      originConfig:[],
      sTags:[],
      mTags:[],
      sVisiable:false,
      mVisiable:false,
      form: {
        keyword: '',
        no:'',
        editStatus:null,
        questionTypeId: '',
        originName: '',
        originYear: '',
        originArea: '',
        slaveKnowledgeNodeIds: [],
        masterKnowledgeNodeIds: [],
        knowledgeNodeTagType: [],
        pageNo: 1,
        pageSize: 10
      },
    }
  },
  created() {
    //  let test=util.deepGet(this.list[0],'question[0].name')
    // console.log('test',test);

    this.$store.dispatch('editStatus');
    this.lectureNoteQuestionList();
    this.sppResourceList();
    this.getSubjectList();
    this.getOriginConfig();
  },
  computed:{
    editStatusList() {
      console.log('xxxx',this.$store.state.questionBank.editStatus)
      return this.$store.state.questionBank.editStatus;
    },
  },
  methods: {
       async checkedQuestion(item){
         console.log('item',item)
         if(item.checked){
          let {data}=await io.post6(io.checkLectureQuestionUsed,{lectureNoteId:this.lectureNoteId,questionId:item.questionId})
          if(data.success){
            if(data.data.hasUsed){
              this.$confirm('该题目已经存在【'+data.data.list.join('；')+'】中，是否继续引用？','提示').then(()=>{
                this.changeQuestion(item)
              }).catch(()=>{
                item.checked=!item.checked
              })
            }else{
              this.changeQuestion(item)
            }
          }
         }else{
           this.changeQuestion(item)
         }
        },
        async changeQuestion(item){
        let {data}=await io.post6(io.saveLectureNodeContentQuestion,{lectureNodeId:this.lectureNodeId,subjectId:storage.getSubjectId(),questionId:item.questionId,opt:item.checked?1:0});
        if(data.success&&data.data.code==='2'){
          this.$message('该题已存在本讲义中，请选择另一道题目');
          item.checked=!item.checked;
        }
        if(!data.success){
          item.checked=!item.checked;
        }
        },
    async slaveBtn(){
      let {data}=await io.post6(io.lectureNoteQuestionKnowledge,{lectureNodeId:this.lectureNodeId,type:2});
      this.sTags.splice(0,this.sTags.length);
      this.sTags.push.apply(this.sTags,data.data);
      console.log(this.sTags)
    },
    sSearch(){
          this.form.slaveKnowledgeNodeIds=[];
          this.sTags.map((item,i)=>{
            this.form.slaveKnowledgeNodeIds.push(item.knowledgeNodeId)
          });
          this.form.slaveKnowledgeNodeIds=this.form.slaveKnowledgeNodeIds.join(',');
          this.search();
          this.sVisiable=false;
    },
    sChangeTags(tags, id){
          this.sTags=tags;
    },
    mSearch(){
          this.form.masterKnowledgeNodeIds=[];
          this.mTags.map((item,i)=>{
            this.form.masterKnowledgeNodeIds.push(item.knowledgeNodeId)
          });
          this.form.masterKnowledgeNodeIds=this.form.masterKnowledgeNodeIds.join(',');
          this.search();
          this.mVisiable=false;
    },
    mChangeTags(tags, id){
          this.mTags=tags;
    },
        getOriginConfig() {
            io.post(io.questionOriginConfig, { subjectId: this.subjectId, subjectName: storage.getSubjectName() }, (data) => {
                this.originConfig = data;
            })
        },
    async getSubjectList(){
      let {data}=await io.post6(io.questionTypeOfSubjectList,{subjectId:this.subjectId});
      this.questionTypeOfSubjectList=data.data;
    },
    search() {
      console.log(this.form)
      this.lectureNoteQuestionList();
    },
    reset(){
      this.form.keyword='';
      this.form.no='';
      this.form.questionTypeId='';
      this.form.originName='';
      this.form.originYear='';
      this.form.originArea='';
      this.lectureNoteQuestionList();
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
    async lectureNoteQuestionList(opt) {
      let { data } = await io.post6(io.lectureNoteQuestionList, { ...this.form, ...opt, subjectId: this.subjectId, lectureNodeId: this.lectureNodeId });
      if (data.success) {
        data.data.list.map((item) => {
          item.showMore = false;
          try{
              if(item.sysSubjectType==='0'){
                item.answer=item.answer&&JSON.parse(item.answer).join(',');
              };
              if(item.sysSubjectType==='1'){
                item.answer=item.answer&&JSON.parse(item.answer).join(';');
              };
          }catch(err){
            console.log(err)
          }

          if (item.checked === '1') {
            item.checked = true;
          } else {
            item.checked = false;
          }
        });
        this.questionData = data.data;
        console.log(this.questionData)
      }
    },
    questionList(data) {
      // this.$loading();
      // io.post(io.questionList, {subjectId: this.subjectId || storage.getSubjectId() }, (data) => {
      //   this.$loading().close();
      // try{
      // data.list.map((item) => {
      //   let sysType = '';
      //   this.questionTypeOfSubjectList.map((type) => {
      //     if (type.questionTypeId === item.questionTypeId) {
      //       sysType = type.sysSubjectType
      //     }
      //   });
      //   if (sysType === '0') {
      //     let answer = '';
      //     item.answer = item.answer && JSON.parse(item.answer).join(',');
      //   };
      // })
      // }catch(err){
      //   console.log(err)
      // }
      // this.questionData = data;
      // })
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.select-question {
  // height: 100%;
  // height: 200px;
  background: white;
}

.nav-little {
  border-bottom: 0;
}

.select-body {
  // min-height: 1000px;
}

.search-form {
  margin: 20px;
  padding: 0px 20px;
  margin-top: 52px;
  height: 150px;
  background: #f7f7f7;
  border: 1px solid #f1f1f1;
  .el-row {
    margin-top: 15px;
  }
  .el-input {
    width: 220px;
  }
  .el-select {
    width: 150px;
    margin-right: 20px;
  }
}

.search-by {
  .el-button {
    padding: 0;
    color: #005bc2;
    text-decoration: underline;
    margin-right: 30px;
  }
}

.q-list {
  margin: 0 20px;
  border: 1px solid #bbdde7;
  padding: 30px 30px 0;
}

.q-item {
  .el-checkbox {
    margin-right: 10px;
  }
}
.back{
  margin: 20px 0;
  text-align: center;
}
</style>
<style lang="less">
  .el-popover.search-tag{
    padding:0 !important;
  }
</style>



