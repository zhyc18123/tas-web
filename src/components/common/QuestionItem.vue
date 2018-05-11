<template>
            <el-row class="question-list">
                <el-row class="question-number">
                    <slot name="num">1、</slot>{{question.no}}
                </el-row>
              <el-row class="question-content">
                <p class="question-body detail" v-html="question.body">
                </p>

            <el-row class="detail" v-show="question.showMore">
              <el-row>
                <el-col :span="4" class="detail-left">
                  <img src="../../assets/img/range-img.png" />
                  <span>答案</span>
                </el-col>
                <el-col :span="20" class="detail-right">
                  <p v-html="question.answer"></p>
                </el-col>
              </el-row>
              <div>
                <el-row>
                  <el-col :span="4" class="detail-left">
                    <img src="../../assets/img/range-img.png" />
                    <span>范式</span>
                  </el-col>
                  <el-col :span="20" class="detail-right">
                    <div v-for="(item,index) in question.spps" v-if="sppConfigList.indexOf(item.subjectSppId)>-1" >
                      <span class="more-title">{{item.orderNo}}、{{item.subjectSppName}}</span>
                      <span v-html="item.content"></span>
                      <p class="ability-tag" v-if="config.question_item_ability_tag" ><span class="more-title">能力标签：</span>
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
                <!--<el-row>
                  <el-col :span="4" class="detail-left">
                    <img src="../../assets/img/range-img.png" />
                    <span>知识点</span>
                  </el-col>
                  <el-col :span="20" class="detail-right">
                    <p>1、预选标签：<span>预选标签</span></p>
                    <p>2、主标签：<span>主标签</span></p>
                    <p>3、副标签：<span>副标签</span></p>
                  </el-col>
                </el-row>-->
              </div>
              <!--<div v-show="showMore" @click="showMore=false" class="more-btn">
                收起
              </div>-->
            </el-row>

                <el-row class="show-div" @click.native="question.showMore=!question.showMore">
                  <span>{{question.showMore?'收起':'查看更多'}}</span>
                </el-row>
              </el-row>
            </el-row>
</template>

<script>
import io from '../../lib/io'
import storage from '../../lib/storage'
  export default {
    name: 'question-item',
    props:['question','sppConfigList'],
    components:{
    },
    data() {
      return {
            lectureNodeId:this.$route.query.lectureNodeId,
      }
    },
    watch:{
       'question.checked'(val){
        // this.changeQuestion(val);
      }
    },
    created() { 
      console.log('sppconfig',this.sppConfigList)
    },
    computed:{
    config() {
      if (!this.$store.state.global.config) {
        this.$store.dispatch('config');
      };
      return this.$store.state.global.config;
    },
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  .question-list{
      margin-bottom: 30px;
    .question-number{
        font-weight: bold;
    }
    .question-content{
      background: #f3fafc;
      margin-top: 10px;
      .question-body{
        padding: 20px;
      }
      .show-div{
        height: 50px;
        line-height: 50px;
        border-top: 1px dashed #bfebf3;
        margin: 0 35px;
        span{
          color: #005bc2;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }

.detail {
  margin-left: 50px;
  background: #f3fafc;
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
    p{
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
</style>
