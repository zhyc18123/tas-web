<template>
  <div class="m-report container">
    <el-breadcrumb class="nav-little" separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">
        <svg class="icon shouye" aria-hidden="true">
          <use xlink:href="#icon-shouye1"></use>
        </svg>
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/main/report' }">
        报表管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{activeName}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="tabs my-tabs sys-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane v-if="config.knowledge_question_count_table" label="知识点题目分布表" name="知识点题目分布表">
          <!--<v-basis-set-container></v-basis-set-container>-->
        </el-tab-pane>
        <el-tab-pane v-if="config.workload_progress" label="进度表" name="进度表">
          <!--<v-user-list-container></v-user-list-container>-->
        </el-tab-pane>
        <el-tab-pane v-if="config.workload_Efficiency" label="效率表" name="效率表">
          <!--<v-character-list-container></v-character-list-container>-->
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <div class="report-content">
      <!--<keep-alive>-->
      <router-view></router-view>
      <!--</keep-alive>-->
    </div>
  </div>
</template>

<script>
// import VCharacterListContainer from '../report/CharacterListContainer.vue'
// import VUserListContainer from '../report/UserListContainer.vue'
// import VBasisSetContainer from '../report/BasisSetContainer.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'report',
  components: {
    // VCharacterListContainer,
    // VUserListContainer,
    // VBasisSetContainer
  },
  data() {
    return {
      activeName: '知识点题目分布表'
    }
  },
  created() {
    this.$store.dispatch('config')
    this.toReport()
  },
  computed: {
    ...mapGetters(['config']),
  },
  mounted(){
console.log("xxx")
    if (this.$route.path.indexOf('knowledge-question') > 0) {
      this.activeName = '知识点题目分布表'
    } else if (this.$route.path.indexOf('progress') > 0) {
      this.activeName = '进度表'
    } else if (this.$route.path.indexOf('efficient') > 0) {
      this.activeName = '效率表'
    } else {
    }
  },
  methods: {
    toReport(){
      if (this.config.knowledge_question_count_table) {
        this.$router.push('/main/report/knowledge-question')
      } else if (this.config.workload_progress) {
        this.$router.push('/main/report/progress')
      } else {
        this.$router.push('/main/report/efficient')
      }
    },
    handleClick(tab) {
      if (this.activeName === '知识点题目分布表') {
        this.$router.push('/main/report/knowledge-question')
      } else if (this.activeName === '进度表') {
        this.$router.push('/main/report/progress')
      } else if (this.activeName === '效率表') {
        this.$router.push('/main/report/efficient')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.m-report {
  .nav-little {
    border-bottom: none;
    margin: 0;
  }
  .report-content {
    min-height: 1000px;
  }
}
</style>
<style lang="less">
.m-report {
  padding: 0 20px;
  background-color: #fff;
  .tabs {
    .el-tabs__header {
      border-bottom: 4px solid #00b1d1;
      margin: 0;
      background:white;
      padding-left:0;
      padding-top:0;
    }
    .el-tabs__item {
      height: 38px;
      line-height: 36px;
      margin-right: 1px;
      background: #fff;
      color: #333;
      font-size: 14px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      font-weight: bold;
      border: 1px solid #00b1d1;
      border-bottom: 4px solid #00b1d1;
    }
    .el-tabs__nav-wrap {
      margin-bottom: -4px;
    }
    .el-tabs__content {
      /*background: white;*/
      /*min-height: 1000px;*/
      display: none;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
      background: #00b1d1;
      color: #fff;
      border: 1px solid #00b1d1;
      border-bottom: 4px solid #00b1d1;
    }
  }
}
</style>
<style lang="less">
.sys-tab {
  .tabs .el-tabs__header {
    background: white;
  }
  .el-tabs__header {
    box-shadow: none;
  }
}
</style>



