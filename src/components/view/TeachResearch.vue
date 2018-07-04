<template>
  <div class="t-research container">
    <el-breadcrumb class="nav-little" separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">
        <svg class="icon shouye" aria-hidden="true">
          <use xlink:href="#icon-shouye1"></use>
        </svg>
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{activeName}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="tabs my-tabs sys-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane v-if="config.lesson" label="课程" name="课程">
        </el-tab-pane>
        <el-tab-pane v-if="config.chapter" label="讲次" name="讲次">
        </el-tab-pane>
        <el-tab-pane v-if="config.material" label="素材" name="素材">
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <div class="researc-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 't-research',
  components: {
  },
  data() {
    return {
      activeName: '课程'
    }
  },
  created() {
    // this.$store.dispatch('config')
    this.init()
  },
  beforeUpdate () {
    this.init()
  },
  computed: {
    ...mapGetters(['config'])
  },
  methods: {
    init(){
    if (this.$route.path.indexOf('course') > 0) {
      this.activeName = '课程'
    } else if (this.$route.path.indexOf('lecture') > 0) {
      this.activeName = '讲次'
    } else if (this.$route.path.indexOf('data') > 0) {
      this.activeName = '素材'
    }
    },
    handleClick(tab) {
      if (this.activeName === '课程') {
        this.$router.push('/main/teach-research/course')
      } else if (this.activeName === '讲次') {
        this.$router.push('/main/teach-research/lecture')
      } else if (this.activeName === '素材') {
        this.$router.push('/main/teach-research/data')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.my-tabs{
  // padding-top: 20px;
}
.t-research {
  .nav-little {
    border-bottom: none;
    margin: 0;
    .shouye{
      font-size:14px;
      color:#999;
    }
  }
}
</style>
<style lang="less">
.t-research {
  padding: 0 30px;
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
      padding:0 50px !important;
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
.sys-tab{
  .tabs .el-tabs__header{
    background:white;
  }
  .el-tabs__header{
    box-shadow:none;
  }
}
</style>



