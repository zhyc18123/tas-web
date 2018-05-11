<template>
  <div class="question-bank container">
    <el-breadcrumb class="nav-little" separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">
        <svg class="icon shouye" aria-hidden="true">
          <use xlink:href="#icon-shouye1"></use>
        </svg>
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        题库管理
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-popover v-model="sVisiable" ref="ks" placement="left-start" width="820" trigger="click">
      <pop-knowledge-search @kSearch="kSearch" id="slaveTags" :tags="tags" @changeTags="changeTags" />
    </el-popover>
    <em class="k-search" title="知识点筛选题目" v-popover:ks>
      <img src="../../assets/img/search-icon.png" />
      <span>知识点搜索</span>
    </em>
    <el-row class="search">
      <el-col :span="5">
        <span>题目状态 ：</span>

        <el-select v-model="form.editStatus" placeholder="全部状态">
          <el-option v-for="item in editStatusList" :key="item.editStatus" :label="item.name" :value="item.editStatus">
          </el-option>
        </el-select>

      </el-col>
      <el-col :span="5">
        <span>题目编号 ：</span>
        <el-input v-model="form.no" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="5">
        <span>题目类别 ：</span>
        <el-select v-model="form.questionTypeId" placeholder="全部">
          <el-option value="">
            全部
          </el-option>
          <el-option v-for="item in questionTypeOfSubjectList" :key="item.questionTypeId" :label="item.name" :value="item.questionTypeId">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <span>最后操作人 ：</span>
        <el-input v-model="form.lastModifier" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="10" class="last-date">
        <span>最后操作日期 ：</span>
        <el-date-picker :clearable="false" :editable="false" v-model="updateTimeStart" type="date" placeholder="选择日期">
        </el-date-picker>
        &nbsp;&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;&nbsp;
        <el-date-picker :clearable="false" :editable="false" v-model="updateTimeEnd" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" @click.native="search();" class="search-btn">搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="head-btn">
      <el-button type="primary" v-show="false" class="show-btn" @click="previewWord=true">预览导出</el-button>
      <div v-show="previewWord" class="out-word">
        <div id="word">
          <div style="color:red;fontSize:30px" v-for="(item,i) in questionData.list">
            <div v-html="item.body">

            </div>
          </div>
        </div>
        <el-button type="primary" class="show-btn" @click="previewWord=false">取消</el-button>
        <el-button type="primary" class="show-btn" @click="outWord('docx')">导出word文档</el-button>
        <el-button type="primary" class="show-btn" @click="outWord('pdf')">导出pdf文档</el-button>
      </div>
      <router-link v-if="config.question_item_add" class="el-button el-button-primary create-btn" :to="{path:'question-bank/create-question'}" tag="span">
        新建题目
      </router-link>
      <el-button type="primary" v-show="showAll=false" class="show-btn">全部收起</el-button>
    </el-row>

    <el-row>
      <el-table @sort-change="sortChange" empty-text="暂无题目" :data="questionData.list" style="width: 100%">
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
                    <div v-for="(item,index) in scope.row.spps" v-if="sppConfigList.indexOf(item.subjectSppId)>-1">
                      <span class="more-title">{{item.orderNo}}、{{item.subjectSppName}}</span>
                      <span v-html="item.content"></span>
                      <p class="ability-tag" v-if="config.question_item_ability_tag">
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
        <el-table-column align="center" width="200" label="创建时间" sortable="custom">
          <template scope="scope">
            {{scope.row.createTime |formatTime('YYYY-MM-DD H:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="200" label="最后操作时间">
          <template scope="scope">
            {{scope.row.updateTime |formatTime('YYYY-MM-DD H:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column width="150" label="操作人">
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
            <span class="btn-span" slot="reference">{{scope.row.lastModifier}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <span @click="toDetail(scope.row)" class="write-btn btn-span" tag="span">
              {{scope.row.editStatus==='0'&&config.question_edit_status_analyse?'解析':''}} {{scope.row.editStatus==='1'&&config.question_edit_status_input?'重新录入':''}} {{scope.row.editStatus==='2'&&config.question_edit_status_audit?'审核':''}} {{scope.row.editStatus==='3'&&config.question_edit_status_analyse?'重新解析':''}} {{scope.row.editStatus==='4'&&config.question_edit_status_storage?'入库':''}} {{scope.row.editStatus==='5'&&config.question_edit_status_audit?'重新审核':''}} {{scope.row.editStatus==='6'&&config.question_edit_status_audit?'撤回':''}} {{scope.row.editStatus==='7'&&config.question_edit_status_audit?'入库':''}}
            </span>

            <el-popover ref="hander11" placement="bottom" width="400" trigger="click">
              <el-row class="reason-pop">
                <el-col :span="4">
                  原因 ：
                </el-col>
                <el-col :span="20" class="reason-right">
                  <p>{{scope.row.editRemark}}</p>
                </el-col>
                <el-col :span="4" class="checker">
                  审核人 ：
                </el-col>
                <el-col :span="20" class="checker reason-right">
                  {{scope.row.lastModifier}}
                </el-col>
                <el-col :span="4">
                  日期 ：
                </el-col>
                <el-col :span="20" class="reason-right">
                  {{scope.row.updateTime | formatTime('YYYY-MM-DD')}}
                </el-col>
              </el-row>
            </el-popover>
            <span class="btn-span" v-if="scope.row.editStatus==='1'||scope.row.editStatus==='3'||scope.row.editStatus==='5'" v-popover:hander11>驳回原因</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <v-pagination ref="pagin" class="pag" :total="questionData.total|toNumber" @getListResult="questionList" :currentPage="form.pageNo"></v-pagination>
  </div>
</template>

<script>
//require('pdfmake/build/pdfmake.js')
//require('pdfmake/build/vfs_fonts.js')
require('../../lib/exportWord/js/jquery.wordexport.js')
import io from '../../lib/io'
import util from '../../lib/util'
import storage from '../../lib/storage'
import { mapGetters, mapActions } from 'vuex'
import VPagination from '../common/Pagination'
import PopKnowledgeSearch from '../common/PopKnowledgeSearch'
export default {
  name: 'question-bank',
  data() {
    return {
      module: this.$store.state.questionBank,
      previewWord: false,
      showMore: false,
      showAll: false,
      questionData: {},
      updateTimeStart: '',
      updateTimeEnd: '',
      questionTypeList: '',
      sppConfigList: [],
      tags: [],
      sVisiable: false,
      wordTable: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
      form: {
        editStatus: '',
        no: '',
        questionTypeId: '',
        lastModifier: '',
        updateTimeStart: '',
        updateTimeEnd: '',
        pageNo: 1,
        pageSize: 10,
        knowledgeNodeTagType: '',
        knowledgeNodeIds: [],
        orderCreate:null
      },
    }
  },
  components: {
    VPagination,
    PopKnowledgeSearch
  },
  computed: {
    ...mapGetters([
      'questionTypeOfSubjectList',
      'subjectId',
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
    this.sppResourceList();
    this.$store.dispatch('editStatus');
    this.$store.dispatch('questionTypeOfSubjectList', { subjectId: this.subjectId || storage.getSubjectId() });

  },
  mounted() {
    this.questionList();
  },
  methods: {
    outWord() {
      // var html='<html>'+$("#word").html()+'</html>';
      // XDoc.run(html,type,{},'_blank');

      //     	var imgs=new Array();
      // imgs.push({image:***,margin:[ 150, -100, 0, 0 ]});
      //***为图片转的base64编码
      //pdfmake的图片格式{image:image dataurl}
      //margin调整位置，四个坐标依次为左上右下
      // }
      //            var dd = {
      //		content: [
      //			{text:'比希望更炽热的',fontSize: 12,margin:[ 300, 0, 0, 0 ]},
      //		 	{text:'比绝望更深邃的',fontSize: 12,margin:[ 300, 0, 0, 0 ]},
      //               		{text:'是爱啊',fontSize: 20},
      //		        ],
      //	       defaultStyle: {
      //		  font: '微软雅黑'
      //	       }
      //	   };
      //  	   pdfMake.fonts = {
      //           	微软雅黑: {
      //     	   	normal: 'msyh.ttf',
      //           	bold: 'msyh.ttf',
      //          	italics: 'msyh.ttf',
      //          	bolditalics: 'msyh.ttf'
      //    	   }
      //  	};
      //	 pdfMake.createPdf(dd).download();


      //  $("#word").wordExport();
      // if(confirm("您确认下载服务报告模板?")){
      //    var pdf = new jsPDF('p','pt','a4');
      // // 设置打印比例 越大打印越小
      //    pdf.internal.scaleFactor = 2;
      //    var options = {
      //        pagesplit: true, // 设置是否自动分页
      //       "background": '#FFFFFF'   // 如果导出的pdf为黑色背景，需要将导出的html模块内容背景 设置成白色。
      //   };
      //    var printHtml = $('#word').get(0);   // 页面某一个div里面的内容，通过id获取div内容
      //    pdf.addHTML(printHtml,15, 15, options,function() {
      //       pdf.save('服务总结报告.pdf');
      //   });
      // }


    },
    sortChange(col){
      console.log('chang',col)
      if(col.order==='descending'){//向下排序
      this.form.orderCreate=1;
      }else{
        this.form.orderCreate=0;
      }
      this.search();
    },
    changeTags(tags, id) {
      this.tags = tags;
    },
    kSearch(tagType) {
      console.log(this.tags)
      this.form.knowledgeNodeTagType = tagType;
      this.form.knowledgeNodeIds = [];
      this.tags.map((item, i) => {
        this.form.knowledgeNodeIds.push(item.knowledgeNodeId)
      });
      this.form.knowledgeNodeIds = this.form.knowledgeNodeIds.join(',');
      this.search();
      this.sVisiable = false;
    },
    sppResourceList() {
      io.post(io.sppResourceList, {
        subjectId: this.subjectId || storage.getSubjectId(), optRoleId: this.loginInfo.optRoleId
      }, (data) => {
        this.sppConfigList = [];
        data.map((item) => {
          this.sppConfigList.push(item.subjectSppId);
        });
        console.log(this.sppConfigList)
      })
    },
    toDetail(row) {
      io.post(io.questionOptStatus, { questionId: row.questionId }, (data) => {
        if (data.optStatus === '1') {
          // this.$router.push({ path: 'question-bank/create-question', query: { questionId: row.questionId } });
          // var openLink = document.createElement('a');
          // openLink.target = '_blank';
          // openLink.href = window.location.origin + '/#/main/question-bank/create-question?questionId=' + row.questionId;
          // openLink.click();
          window.open(window.location.origin +'/#/main/question-bank/create-question?questionId='+row.questionId)
        } else {
          this.$message(data.optUserName + '正在操作该题目，请勿重复操作！')
        }
      })
    },
    handlePage(pageNo) {
      this.form.pageNo = pageNo;
      this.questionList();
    },
    questionList(data) {
      this.$loading();
      if (this.updateTimeStart) {
        this.form.updateTimeStart = util.formatTime(this.updateTimeStart, 'YYYY-MM-DD') + ' 00:00:00'
      };
      if (this.updateTimeEnd) {
        this.form.updateTimeEnd = util.formatTime(this.updateTimeEnd, 'YYYY-MM-DD') + ' 23:59:59'
      };
      io.post(io.questionList, { ...this.form, ...data, subjectId: this.subjectId || storage.getSubjectId() }, (data) => {
        this.$loading().close();
        try {
          data.list.map((item) => {
            let sysType = '';
            this.questionTypeOfSubjectList.map((type) => {
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
        this.questionData = data;
        console.log('datad', data)
      })
    },
    search() {
      // this.form.pageNo = 1;
      if(this.$refs.pagin.form.pageNo===1){
      this.questionList();
      }else{
      this.$refs.pagin.changePage(1);
      }
    },
    synInput(key) {
      return {
        get() {
          return this.$store.state.questionBank.form[key];
        },
        set(value) {
          this.$store.dispatch('inputChange', { value: value, key: key, module: this.module })
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.question-bank {
  background: white;
  padding: 0 20px;
  padding-bottom: 100px;
  // min-height: 800px;
}
.reason-pop .el-col{
  min-height: 30px;
  line-height: 30px;
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
  color: #20a0ff;
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
    // padding: 10px 0;
    &.checker {
      border-top: 1px solid white;
      border-bottom: 1px solid white;
    }
  }
  .el-col-20 {
    background: white;
    padding: 0 10px;
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
</style>
<style lang="less">
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

  ol{
    li{
      list-style: decimal;
    }
  }
</style>

