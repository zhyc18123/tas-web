<template>
  <div class="m-basis-set-container">
    <div class="basis-set-nav">
      <router-link tag="el-button" to="/main/system/basisSetting/schoolSetting">校区设置</router-link>
      <router-link tag="el-button" to="/main/system/basisSetting/termSetting">学期设置</router-link>
      <router-link tag="el-button" to="/main/system/basisSetting/classSetting">班型设置</router-link>
      <!--
      <router-link tag="el-button" to="/main/system/basisSetting/provinceSetting" class="active">省份设定</router-link>
      <router-link tag="el-button" to="/main/system/basisSetting/topicCategory">题目类别</router-link>
      <router-link tag="el-button" to="/main/system/basisSetting/abilityRadar">能力雷达设定</router-link>
      <router-link tag="el-button" to="/main/system/basisSetting/paradigmList">范式设定</router-link>
      <router-link tag="el-button" to="/main/system/basisSetting/set-tag">标签设定</router-link>-->
    </div>
    <div class="basis-set-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ElButton from "../../../node_modules/element-ui/packages/button/src/button";

import { mapState, mapActions,mapGetters } from 'vuex'
export default {
  name: 'basis-set-container',
  components: {
    ElButton
  },
  data() {
    return {
      msg: ''
    }
  },
  computed: {
    ...mapGetters(['config'])
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.m-basis-set-container {
  // min-height:900px;
  padding-bottom:50px;
  .basis-set-nav {
    height: 44px;
    padding-left: 30px;
    line-height: 44px;
    background-color: #effdff;
    .el-button {
      color: #333;
      background-color: #effdff;
      border-color: #a7d8e0;
      padding: 7px 13px;
      margin-right: 60px;
      &.router-link-active {
        color: #fff;
        background-color: #ff9600;
        border-color: #ff9600;
      }
    }
  }
  .basis-set-content {
    min-height: 900px;
    // overflow-y: scroll;

  }
}
</style>
