<template>
  <el-row class="container edit-knowledge">
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
        <el-col class="edit-left" :span="10">
          <el-row class="title">
            {{knowledgeTreeName}}
          </el-row>
          <el-row class="action">
            <div class="search-input">
              <svg class="icon fangdajing" aria-hidden="true">
                <use xlink:href="#icon-fangdajing"></use>
              </svg>
              <input type="text" v-model="treeSearch" placeholder="输入名称" @change="showBySearch();" />
            </div>
            <span class="el-button edit-btn show-all" @click="expandAll">
              {{showAll?'收起':'展开'}}
            </span>
          </el-row>
          <el-row class="add-tree">
            <ul id="addTree" class="ztree"></ul>
          </el-row>
        </el-col>
        <el-col class="edit-right" :span="14">
          <template v-if="knowledgeDetail">
            <el-checkbox v-model="requirement">知识点要求 ：</el-checkbox>
            <el-row class="right-item">
              <p v-html="knowledgeDetail.requirement"></p>
            </el-row>
            <el-checkbox v-model="testDescription">题型描述 ：</el-checkbox>
            <el-row class="right-item">
              <p v-html="knowledgeDetail.testDescription"></p>
            </el-row>
            <el-checkbox v-model="content">内容 ：</el-checkbox>
            <el-row class="right-item">
              <p v-html="knowledgeDetail.content"></p>
            </el-row>
          </template>
        </el-col>
      </el-row>
      <el-row class="bottom-btn">
        <span class="clear" @click="clearAllSelect">
          清空全部选择
        </span>
        <span class="sure" @click="saveLectureNodeContentKnowledge">
          确定
        </span>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import ListParent from '../common/ListParent'
import util from '../../lib/util'
import io from '../../lib/io'
var _ = require('lodash');
export default {
  name: 'edit-knowledge',
  components: {
    ListParent
  },
  data() {
    return {
      lectureNoteId: this.$route.query.lectureNoteId,
      lectureNodeId: this.$route.query.lectureNodeId,
      versionId: this.$route.query.versionId,
      requirement: false,
      content: false,
      testDescription:false,
      selectedArr: sessionStorage.getItem('selectedKnowledge') && JSON.parse(sessionStorage.getItem('selectedKnowledge')) || [],
      $zTree: '',
      knowledgeDetail: '',
      treeData: [],
      treeNode: [],
      showAll: false,
      treeSearch: '',
      knowledgeTreeName:''
    }
  },
  watch: {
    requirement() {
      this.saveSelect();
    },
    content() {
      this.saveSelect();
    },
    testDescription(){
      this.saveSelect();
    }
  },
  created() {
    this.allNodeOfKnowledgeTree();
    this.knowledgeTree();
  },
  methods: {
    async knowledgeTree(){
      let {data}=await io.post6(io.knowledgeTree,{knowledgeTreeId:this.versionId});
      if(data.success){
        this.knowledgeTreeName=data.data.name;
      }
    },
    showBySearch: _.debounce(function() {
      let nodeList = '';
      if(!this.treeSearch){
        return;
      };
      try {
        nodeList = this.$zTree.getNodesByParamFuzzy('name', this.treeSearch)
        this.initZTree(this.treeData, nodeList);

      } catch (err) {
        console.log(err)
      }
    }, 400),
    expandAll() {
      this.showAll = !this.showAll;
      this.$zTree.expandAll(this.showAll);
    },
    async saveLectureNodeContentKnowledge() {
      if (this.selectedArr.length) {
        let { data } = await io.post6(io.saveLectureNodeContentKnowledge, { lectureNodeId: this.lectureNodeId, lectureNodeContentKnowledgeJson: JSON.stringify(this.selectedArr) });
        if (data.success) {
          this.$message('保存知识点成功');
          this.$router.go(-1);
        }
      } else {
        this.$message('还没选择知识点')
      }
    },
    clearAllSelect() {

      this.$confirm('确认清除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.selectedArr = [];
        this.requirement = false;
        this.content = false;
        this.testDescription=false;
        this.changeSelect('', '', true);
        this.$message('清除成功')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    async allNodeOfKnowledgeTree() {
      let { data } = await io.post6(io.allNodeOfKnowledgeTree, { knowledgeTreeId: this.versionId });
      if (data.success) {
        this.treeData = util.mapTree(data.data);
        this.initZTree(this.treeData);
      }
    },
    changeSelect(id, check, allNo) {
      this.setNoCheck(false);
      this.treeNode.map((item) => {
        if (item.id === id) {
          this.$zTree.checkNode(item, check, false);
        }
        if (allNo) {
          this.$zTree.checkNode(item, false, false);
        }
      });
      this.setNoCheck(true);
    },
    saveSelect() {
      let hasIn = false;
      let inIndex = '';
      for (let i = 0; i < this.selectedArr.length; i++) {
        if (this.selectedArr[i].knowledgeNodeId === this.knowledgeDetail.knowledgeNodeId) {
          hasIn = true;
          inIndex = i;
          break;
        }
      };
      let sArr = [];
      if (this.requirement) {
        sArr.push('requirement')
      }
      if (this.content) {
        sArr.push('content')
      }
      if(this.testDescription){
        sArr.push('testDescription')
      }
      if (hasIn) {
        if (sArr.length) {
          this.selectedArr[inIndex].properties = sArr;
        } else {
          this.selectedArr.splice(inIndex, 1);
          this.changeSelect(this.knowledgeDetail.knowledgeNodeId, false)
        }
      } else {
        this.selectedArr.push({ knowledgeNodeId: this.knowledgeDetail.knowledgeNodeId,properties: sArr, orderNo: this.selectedArr.length })
        this.changeSelect(this.knowledgeDetail.knowledgeNodeId, true)
      }
    },
    initSelect() {
      this.requirement = false;
      this.content = false;
      this.testDescription=false;
      this.selectedArr.map((item) => {
        if (item.knowledgeNodeId === this.knowledgeDetail.knowledgeNodeId) {
          console.log("item", item)
          if (item.properties && item.properties.indexOf('requirement') > -1) {
            this.requirement = true;
          };
          if (item.properties && item.properties.indexOf('content') > -1) {
            this.content = true;
          };
          if (item.properties && item.properties.indexOf('testDescription') > -1) {
            this.testDescription = true;
          };
        }
      });
    },
    setNoCheck(check) {
      for (var i = 0, l = this.treeNode.length; i < l; i++) {
        this.$zTree.setChkDisabled(this.treeNode[i], check);
      }
    },
    initZTree(zNodes, markList) {
      zNodes.map((item) => {
        let inArr = false;
        this.selectedArr.map((sItem) => {
          if (item.id === sItem.knowledgeNodeId) {
            inArr = true;
          }
        });
        item.checked = inArr;
        item.open = inArr;
      });
      let _this = this;
      let onClick = async (event, treeId, treeNode, clickFlag) => {
        console.log('treeid',treeNode)
        if(!treeNode.pId){
          this.knowledgeDetail='';
          return;
        }
        let { data } = await io.post6(io.knowledgeNodeDetail, { knowledgeNodeId: treeNode.id });
        if (data.success) {
          this.knowledgeDetail = data.data;
          this.initSelect();
          setTimeout(()=>{
            if(!this.requirement&&!this.content&&!this.testDescription){
          this.changeSelect(this.knowledgeDetail.knowledgeNodeId, false);

      let inIndex = '';
      let hasIn=false;
      for (let i = 0; i < this.selectedArr.length; i++) {
        if (this.selectedArr[i].knowledgeNodeId === this.knowledgeDetail.knowledgeNodeId) {
          hasIn = true;
          inIndex = i;
          break;
        }
      };
      if(hasIn){
          this.selectedArr.splice(inIndex, 1);
      }
            }
          },200)
        }
      };
      let mark = (treeNode) => {
        let hasMark = false;
        for (var i = 0; i < markList.length; i++) {
          if (markList[i].id === treeNode.id) {
            hasMark = true;
            break;
          } else {
            hasMark = false;
          }
        };
        return hasMark;
      }
      let setFontCss = (treeId, treeNode) => {
        return mark(treeNode) ? { color: "red" } : {};
      };

      let reMap = (pId) => {
        this.treeData.map((item) => {
          if (item.id === pId) {
            item.open = true;
            if (item.pId) {
              reMap(item.pId);
            }
          }
        })
      }
      this.treeData.map((item, i) => {
        if (markList) {
          console.log('item', item)
          if (mark(item)) {
            item.open = true;
            if (item.pId) {
              reMap(item.pId);
            }
            // item.getParentNode().open=true;
          } else {
            item.open = false;
          }
        }
      })

      var setting = {
        view: {
          fontCss: markList ? setFontCss : ''
        },
        check: {
          enable: true,
          chkDisabledInherit: true
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: onClick,
        }
      };
      this.$zTree = $.fn.zTree.init($("#addTree"), setting, zNodes);
      this.treeNode = this.$zTree.transformToArray(this.$zTree.getNodes());
      this.setNoCheck(true);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.edit-knowledge {
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
  }
}

.edit-left,
.edit-right {
  height: 100%;
}

.edit-left {
  background: #f8f8f8;
  overflow: hidden;
  overflow-y: auto;
}


.edit-right {
  border-left: 1px solid #b1e0ef;
  padding: 0 30px;
  overflow: auto;
  .el-checkbox {
    margin-top: 30px;
  }
  .right-item {
    margin-top: 5px;
    border: 1px solid #b1e0ef;
    padding: 30px 15px;
    line-height: 24px;
  }
  .action {
    background: #e7f6fa;
  }
}

.search-input {
  margin-left: 30px;
  display: inline-block;
  height: 30px;
  width: 228px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  font-size: 14px;
  color: #999;
  margin-top: 8px;
  line-height: 34px;
  background: white;
  padding: 0 10px;
  .icon {
    font-size: 22px;
    color: #00b1d1;
    margin-right: 10px;
    position: relative; // top: 3px;
  }
  input {
    position: absolute;
    height: 28px;
    width: 190px;
    border: 0;
    background: white;
    outline: none;
    &:focus {
      border: 0;
    }
  }
}

.edit-btn {
  background: #78c655;
  border: 0;
  color: white;
}

.show-all {
  position: absolute;
  right: 20px;
  top: 10px;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
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
}

.bottom-btn {
  margin: 0 20px;
  height: 60px;
  text-align: center;
  border: 1px solid #b1e0ef;
  margin-bottom: 80px;
  span {
    height: 28px;
    line-height: 28px;
    margin-top: 15px;
    display: inline-block;
    border-radius: 4px;
    cursor: pointer;
    &.clear {
      width: 110px;
      color: #00b1d1;
      border: 1px solid #00b1d1;
      margin-right: 55px;
    }
    &.sure {
      width: 90px;
      height: 28px;
      border: 1px solid #00b1d1;
      background: #00b1d1;
      color: white;
    }
  }
}

.add-tree {
  background: white;
  height: 100%;
}

.ztree {
  background: white;
  padding: 20px;
}
</style>
<style lang="less">
.edit-right {
  .el-checkbox__label {
    font-weight: bold;
    color: #333 !important;
    margin-left: 10px;
  }
}
</style>



