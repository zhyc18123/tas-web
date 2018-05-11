<template>
  <el-row class="container edit-teaching">
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
            讲义结构
          </el-row>
          <el-row class="action">
          <el-row class="action" :class="{actionFix:actionFix}">
            <span class="el-button edit-btn add-root" @click="createEmptyLectureNode(0)">
              添加根节点
            </span>
            <span>
              <span title="升级节点" @click="changeLevel('upLevel')">
                <svg class="icon left" aria-hidden="true">
                  <use xlink:href="#icon-jiantou"></use>
                </svg>
              </span>
              <span title="降级节点">
                <svg class="icon right" title="降级节点" @click="changeLevel('downLevel')">
                  <use xlink:href="#icon-jiantou"></use>
                </svg>
              </span>
              <span title="上移节点" @click="moveLectureNode('upLevel')">
                <svg class="icon up" aria-hidden="true">
                  <use xlink:href="#icon-jiantou"></use>
                </svg>
              </span>
              <span title="下移节点" @click="moveLectureNode('downLevel')">
                <svg class="icon down" aria-hidden="true">
                  <use xlink:href="#icon-jiantou"></use>
                </svg>
              </span>

            </span>
            <span class="action-span">
              <span title="编辑节点" @click="toInput">
                <svg class="icon bianji" aria-hidden="true">
                  <use xlink:href="#icon-bianji"></use>
                </svg>
              </span>
              <span title="添加子节点" @click="addChildNode">
                <svg class="icon xinjian" aria-hidden="true">
                  <use xlink:href="#icon-xinjian1"></use>
                </svg>
              </span>
              <span title="删除节点" @click="deleteNode">
                <svg class="icon shanchu" aria-hidden="true">
                  <use xlink:href="#icon-shanchu"></use>
                </svg>
              </span>
            </span>
          </el-row>
          </el-row>
          <el-row class="edit-list">
            <list-parent :list='lectureNote' @selectItem="selectItem" @changeName="changeName" />
          </el-row>
        </el-col>
        <el-col class="edit-right" :span="16">
          <el-row class="title">
            讲义内容
          </el-row>
          <template v-if="lectureDetail">
            <el-row class="action">
              <span class="k-title">{{lectureDetail.name}}</span>
              <span class="action-right-btn">
                <router-link tag="span" :to='{path:"/main/production/edit-knowledge",query:{lectureNoteId:lectureNoteId,lectureNodeId:aItem&&aItem.lectureNodeId,versionId:versionId}}' class="el-button edit-btn add-knowledge" @click="">
                  知识讲解管理
                </router-link>
                <router-link tag="span" :to='{path:"/main/production/edit-question",query:{lectureNoteId:lectureNoteId,lectureNodeId:aItem&&aItem.lectureNodeId,versionId:versionId}}' class="el-button edit-btn add-question">
                  题目管理
                </router-link>
              </span>
            </el-row>
            <el-row class="right-div">
              <el-row class="knowledge-list" v-if="lectureDetail&&lectureDetail.lectureNodeContentKnowledgeList.length">
                <el-row class="right-title">
                  知识讲解 ：
                </el-row>
                <el-row class="knowledge-content">
                  <template v-for="(item,i) in lectureDetail.lectureNodeContentKnowledgeList">
                    <template v-if="item.properties&&item.properties.indexOf('requirement')>-1">
                    <p class="k-title" v-html="item.knowledgeNodeName"></p>
                    <p v-html="item.lectureNodeContentKnowledgeItemVo.requirement">
                    </p>
                    </template>
                  </template>
                </el-row>
                <el-row class="knowledge-content">
                  <template v-for="(item,i) in lectureDetail.lectureNodeContentKnowledgeList" v-html="item.lectureNodeContentKnowledgeItemVo.content">
                    <template v-if="item.properties&&item.properties.indexOf('content')>-1">
                    <p class="k-title" v-html="item.knowledgeNodeName"></p>
                    <p v-html="item.lectureNodeContentKnowledgeItemVo.content" >
                    </p>
                    </template>
                  </template>
                </el-row>
                <el-row class="knowledge-content">
                  <template v-for="(item,i) in lectureDetail.lectureNodeContentKnowledgeList" v-html="item.lectureNodeContentKnowledgeItemVo.testDescription">
                    <template v-if="item.properties&&item.properties.indexOf('testDescription')>-1" >
                    <p class="k-title" v-html="item.knowledgeNodeName"></p>
                    <p v-html="item.lectureNodeContentKnowledgeItemVo.testDescription" >
                    </p>
                    </template>
                  </template>
                </el-row>
              </el-row>

              <el-row class="question-list">
                <el-row class="right-title">
                  例题 ：
                </el-row>
                <template v-for="(item,i) in lectureDetail.lectureNodeContentQuestionList">
                  <question-item :question="item.questionVo" :sppConfigList="sppConfigList">
                    <span slot="num">{{i+1}}、</span>
                  </question-item>
                </template>
              </el-row>
            </el-row>
          </template>
        </el-col>
      </el-row>
      <el-row class="update-log">
        <el-row class="log-title" :class="{'up-title':showLog,'down-title':!showLog}">
          <span>操作日志（不包含首次创建）：</span>
          <span class="show-icon" @click="showLog=!showLog">
            <svg class="icon xiala" aria-hidden="true">
              <use xlink:href="#icon-xiala"></use>
            </svg>
          </span>
        </el-row>

        <el-table v-show="showLog" :data="editHistory.list" class="log-table" style="width: 100%">
          <el-table-column width="200" label="操作时间">
            <template scope="scope">
            <span>{{scope.row.updateTime | formatDate('YYYY-MM-DD H:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column width="100" label="操作人" prop="principalName">
          </el-table-column>
          <el-table-column align="center" width="400" label="操作" prop="opt">
          </el-table-column>
          <el-table-column label="对应内容" prop="remark">
          </el-table-column>
        </el-table>

    <v-pagination class="pag" :total="editHistory.total|toNumber" @getListResult="lectureNoteEditHistory"></v-pagination>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import QuestionItem from '../common/QuestionItem'
import ListParent from '../common/ListParent'
import util from '../../lib/util'
import storage from '../../lib/storage'
import io from '../../lib/io'
import VPagination from '../common/Pagination.vue'
export default {
  name: 'edit-teaching',
  components: {
    ListParent,
    QuestionItem,
    VPagination
  },
  data() {
    return {
      loginInfo: storage.getCurrentUserInfo(),
      sppConfigList: [],
      subjectId: storage.getSubjectId(),
      lectureNoteId: this.$route.query.lectureNoteId,
      versionId: this.$route.query.versionId,
      aItem: '',
      // brotherNode:'',
      // hasNext:'',
      items: {},
      lectureDetail: '',
      showMore: false,
      showLog: false,
      actionFix: false,
      msg: '',
      editHistory:[],
      lectureNote: []
    }
  },
  created() {
    //  let test=util.deepGet(this.list[0],'question[0].name')
    this.allNodeOfLectureNote();
    this.sppResourceList();
    this.lectureNoteEditHistory();
  },
  beforeDestroy() {
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    async lectureNoteEditHistory(opt){
      let {data}=await io.post6(io.lectureNoteEditHistory,{
        lectureNoteId:this.lectureNoteId,...opt
      });
      if(data.success){
        this.editHistory=data.data;
      }
    },
    handleScroll() {
      if (window.scrollY > 240) {
        this.actionFix = true;
      } else {
        this.actionFix = false;
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
    async deleteNode() {
      if(!this.aItem){
        this.$message('请选择删除节点');
        return;
      };
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let item = this.aItem;
        let { data } = await io.post6(io.deleteLectureNode, {
          lectureNodeId: item.lectureNodeId
        });
        if (data.success) {
          this.$message('删除成功');
          this.aItem='';
          sessionStorage.removeItem('activeItem');
          this.lectureDetail='';
          this.allNodeOfLectureNote();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },
    toInput() {
      this.dealList(this.lectureNote, true);
    },
    async changeName(item) {
      if(item.name.trim().length>45){
        this.$message('节点名称不能超过45字');
        return;
      };
      if(!item.name.trim()){
        this.$message('节点名称不能为空！');
        return;
      };
      
      let { data } = await io.post6(io.renameLectureNode, { lectureNodeId: item.lectureNodeId, name: item.name });
      if (data.success) {
        this.$message('修改成功');
        this.allNodeOfLectureNote();
      } else {
        // this.$message('修改失败');
      }
    },
    getBrotherNode(list, type) {
      let activeItem = sessionStorage.getItem('activeItem') && JSON.parse(sessionStorage.getItem('activeItem'));
      list.map((item, i) => {
        if (item.parentLectureNodeId === activeItem.parentLectureNodeId) {
          this.items = list;
        };
        if (item.childrenNodeList && item.childrenNodeList.length) {
          this.getBrotherNode(item.childrenNodeList, type);
        }
      });
    },
    async moveLectureNode(type) {
      let activeItem = sessionStorage.getItem('activeItem') && JSON.parse(sessionStorage.getItem('activeItem'));
      let toId = '';
      this.getBrotherNode(this.lectureNote);
      if (type === 'upLevel') {
        if (activeItem.orderNo === '1') {
          this.$message('第一个节点不能上移');
          return;
        }
        toId = this.items[Number(activeItem.orderNo) - 2].lectureNodeId;
      } else {
        if (activeItem.orderNo == this.items.length) {
          this.$message('最后子节点不能下移');
          return;
        } else {
          toId = this.items[Number(activeItem.orderNo)].lectureNodeId;
        }
      };
      let { data } = await io.post6(io.moveLectureNode, { lectureNodeId: activeItem.lectureNodeId, toLectureNodeId: toId });
      if (data.success) {
        this.items = {};
        sessionStorage.setItem('activeItem', JSON.stringify(data.data));
      }
      this.allNodeOfLectureNote();
    },
    async changeLevel(type) {
      let activeItem = sessionStorage.getItem('activeItem') && JSON.parse(sessionStorage.getItem('activeItem'));
      let toId = '';
      if (type === 'upLevel') {
        if (activeItem.parentLectureNodeId === '0') {
          this.$message('已经是最顶级了');
          return;
        }
        toId = activeItem.parentLectureNodeId
      } else {
        this.getBrotherNode(this.lectureNote);
        if (activeItem.orderNo === '1') {
          this.$message('第一个子节点不能降级');
          return;
        } else {
          console.log(this.items)
          toId = this.items[Number(activeItem.orderNo) - 2].lectureNodeId
        }
      };
      let { data } = await io.post6(io.changeLevel, { lectureNodeId: activeItem.lectureNodeId, toLectureNodeId: toId });
      if (data.success) {
        this.items = {};
        sessionStorage.setItem('activeItem', JSON.stringify(data.data));
      }
      this.allNodeOfLectureNote();
    },
    addChildNode() {
      let activeItem = sessionStorage.getItem('activeItem') && JSON.parse(sessionStorage.getItem('activeItem'));
      if (activeItem) {
        this.createEmptyLectureNode(activeItem.lectureNodeId);
      } else {
        this.$message('请选择父节点')
      }
    },
    dealList(list, isInput) {
      list && list.map((item) => {
        if (item.lectureNodeId === this.aItem.lectureNodeId) {
          item.active = true;
          if (isInput) {
            item.isInput = true;
          } else {
            item.isInput = false;
          }
        } else {
          item.active = false;
          item.isInput = false;
        }
        if (item.childrenNodeList && item.childrenNodeList.length) {
          this.dealList(item.childrenNodeList, isInput);
        }
      });
      return list;
    },
    async selectItem() {
      let aItem = sessionStorage.getItem('activeItem');
      aItem ? this.aItem = JSON.parse(aItem) : '';
      this.dealList(this.lectureNote);
      let { data } = await io.post6(io.lectureNodeDetail, { lectureNodeId: this.aItem.lectureNodeId, subjectId: this.subjectId });
      if (data.success) {
        data.data.lectureNodeContentQuestionList.map((item) => {
          item.questionVo.showMore = false;
          try{
              if(item.questionVo&&item.questionVo.sysSubjectType==='0'){
                item.questionVo.answer=item.questionVo.answer&&JSON.parse(item.questionVo
                .answer).join(',');
              };
              if(item.questionVo&&item.questionVo.sysSubjectType==='1'){
                item.questionVo.answer=item.questionVo.answer&&JSON.parse(item.questionVo
                .answer).join(';');
              };
          }catch(err){
            console.log(err)
          }
        })
        this.lectureDetail = data.data;
        sessionStorage.setItem('selectedKnowledge', JSON.stringify(data.data.lectureNodeContentKnowledgeList));
        // sessionStorage.setItem('selectedQuestion',JSON.stringify(data.data.lectureNodeContentQuestionList));
      }
    },
    async allNodeOfLectureNote() {
      let { data } = await io.post6(io.allNodeOfLectureNote, { lectureNoteId: this.lectureNoteId });
      this.dealList(data.data);
      this.lectureNote = data.data;
      if (sessionStorage.getItem('activeItem')) {
        this.selectItem();
      }
    },
    async createEmptyLectureNode(id) {
      let { data } = await io.post6(io.createEmptyLectureNode, { lectureNoteId: this.lectureNoteId, parentLectureNodeId: id });
      this.allNodeOfLectureNote();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.edit-teaching {
  // height: 100%;
  // height: 200px;
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
    .icon {
      font-size: 20px;
      color: #31a5cb;
      position: relative;
      top: 3px;
      margin: 0 3px;
      cursor: pointer;
    }
    .right {
      transform: rotate(180deg);
    }
    .up {
      transform: rotate(90deg);
    }
    .down {
      transform: rotate(270deg);
    }
    .shanchu {
      font-size: 24px;
    }
    .k-title {
      margin-left: 30px;
      color: #333;
      font-weight: bold;
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
  overflow: hidden;
  overflow-y: auto;
}

.edit-left {
  background: #f8f8f8;
}

.edit-list {
  padding: 25px 0 0 0px;
  font-size: 14px;
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

.add-root {
  margin: 0 20px;
}

.action-right-btn {
  float: right;
  clear: both;
  padding-left: 30px;
}

.add-question,
.add-knowledge {
  // float: right;
}

.add-knowledge {
  background: #00b1d1;
}

.add-question {
  margin-left: 8px;
  margin-right: 30px;
  background: #01cabf;
}

.right-div {
  padding: 30px;
  .knowledge-list {
    .knowledge-content {
      border: 1px solid #bfebf3;
      padding: 15px;
      margin-top: 10px;
      p {
        color: #666;
        line-height: 26px;
      }
    }
  }
  .right-title {
    font-size: 14px;
    color: #333;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 10px;
  }
}

.update-log {
  padding: 20px;
  .log-title {
    height: 50px;
    line-height: 50px;
    border: 1px solid #bfebf3;
    padding-left: 20px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    border-bottom: 0;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    .show-icon {
      float: right;
      clear: both;
      padding: 0 20px;
      cursor: pointer;
    }
    .icon {
      font-size: 18px;
      color: #18b8d5;
    }
  }
  .up-title {
    .icon {
      transform: rotate(180deg);
    }
  }
  .down-title {
    border-bottom: 1px solid #bfebf3 !important;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }
}

.log-table {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  position: relative;
  top: -1px;
}

.actionFix {
  position: fixed;
  top: 0;
  // width: 100%;
  z-index: 1;
  padding-right: 20px;
}
.k-title{
  color: #00499c !important;
  font-size: 16px;
}
</style>
<style lang="less">
.detail-right {
  img {
    max-width: 100%;
    height: auto;
  }
}
</style>



