<template>
  <div class="data-analysis">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">数据分析</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3" style="padding-left: 0">
              <div class="am-form-group">
                <el-select v-model="areaTeamId" placeholder="请选择">
                  <el-option
                    v-for="item in areaTeams"
                    :key="item.areaTeamId"
                    :label="item.name"
                    :value="item.areaTeamId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <!--<div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">-->
              <!--<div class="am-form-group">-->
                <!--<button type="button" class="am-btn am-btn-default am-btn-success"-->
                        <!--@click="search" ><span class="am-icon-search"></span>查询-->
                <!--</button>-->
              <!--</div>-->
            <!--</div>-->
          </div>
          <div class="am-u-sm-12 am-form-group">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
              <el-menu-item index="/main/operating/dataAnalysis/list/basicData">
                <router-link tag="a" to="/main/operating/dataAnalysis/list/basicData">基础数据分析</router-link>
              </el-menu-item>
              <el-menu-item index="/main/operating/dataAnalysis/list/problemWarning">
                <router-link tag="a" to="/main/operating/dataAnalysis/list/problemWarning">财务预警</router-link>
              </el-menu-item>
              <el-menu-item index="/main/operating/dataAnalysis/list/fullClassRate">
                <router-link tag="a" to="/main/operating/dataAnalysis/list/fullClassRate">满班率</router-link>
              </el-menu-item>
              <el-menu-item index="/main/operating/dataAnalysis/list/subjectCompleteRate">
                <router-link tag="a" to="/main/operating/dataAnalysis/list/subjectCompleteRate">科数完成率</router-link>
              </el-menu-item>
            </el-menu>
            <router-view :areaTeamId="areaTeamId"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'

  export default{
    data:function(){
      return {
        activeIndex: '/main/operating/dataAnalysis/list/basicData',
        areaTeamId : '',
      }
    },
    mounted:function(){
      $(window).smoothScroll()

      // 基于准备好的dom，初始化echarts实例
    },
    created:function(){
      if (window.config.areaTeams) {
        this.areaTeamId = window.config.areaTeams[0].areaTeamId
      }
//      this.getAreaTeamList();
    },
    computed: {
      areaTeams: function () {
        return this.$root.config.areaTeams || []
      },
    },
    methods:{
      search:function(){
        this.getBusinessCaseOfAreaTeam()
      },
      getAreaTeamList: function () {
        var _this = this;
        io.post(io.apiAdminAreaTeamList,{
        },function(ret){
          if(ret.success){
            _this.areaTeams = []
            ret.data.list.map(function (item) {
              _this.areaTeams.push({value: item.areaTeamId, text: item.name})
            })
            _this.areaTeamId = _this.areaTeams[0].value
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
    }
  }
</script>
<style lang="less" scoped>

</style>
