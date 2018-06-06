<template>
  <div class="m-basis-set-container">
    <div class="basis-set-nav">
      <router-link tag="el-button" to="/main/system/basisSetting/schoolSetting">校区设置</router-link>
      <!--<router-link tag="el-button" to="/main/system/basisSetting/famousSchool">名校设定</router-link>
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
  created() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.m-basis-set-container {
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
    height: 900px;
    overflow-y: scroll;
  }
}
</style>
