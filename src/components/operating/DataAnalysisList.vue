<template>
  <div class="data-analysis">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">数据分析</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12">
            <div class="am-u-sm-12" style="padding-left: 0;margin-bottom: 20px;">
              <div class="am-form-group">
                <el-select size="small" @change="handleAreaTeamIdChange" v-model="areaTeamId" class="am-u-md-2" placeholder="请选择区域">
                  <el-option
                    v-for="item in areaTeams"
                    :key="item.areaTeamId"
                    :label="item.name"
                    :value="item.areaTeamId">
                  </el-option>
                </el-select>
                <el-select v-if="showBusTeam" size="small" class="am-u-md-2 am-u-end"
                           :disabled="busTeams.length === 0" v-model="busTeamId" placeholder="请选择业务组">
                  <el-option
                    v-for="item in busTeams"
                    :key="item.busTeamId"
                    :label="item.name"
                    :value="item.busTeamId">
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
            <!--<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">-->
              <!--<el-menu-item  v-if="hasPermission('basicData')"index="/main/operating/dataAnalysis/list/basicData?type=basic" >-->
                <!--<router-link tag="a" to="/main/operating/dataAnalysis/list/basicData">基础数据分析</router-link>-->
              <!--</el-menu-item>-->
              <!--<el-menu-item  v-if="hasPermission('problemWarning')" index="/main/operating/dataAnalysis/list/basicData?type=problemWarning">-->
                <!--<router-link tag="a" to="/main/operating/dataAnalysis/list/problemWarning">财务预警</router-link>-->
              <!--</el-menu-item>-->
              <!--<el-menu-item v-if="hasPermission('fullClassRate')"  index="/main/operating/dataAnalysis/list/basicData?type=fullClassRate">-->
                <!--<router-link tag="a" to="/main/operating/dataAnalysis/list/fullClassRate">满班率</router-link>-->
              <!--</el-menu-item>-->
              <!--<el-menu-item v-if="hasPermission('subjectCompleteRate')" index="/main/operating/dataAnalysis/list/basicData?type=subjectCompleteRate">-->
                <!--<router-link tag="a" to="/main/operating/dataAnalysis/list/subjectCompleteRate">科数完成率</router-link>-->
              <!--</el-menu-item>-->
            <!--</el-menu>-->
            <router-view :areaTeamId="areaTeamId" :busTeamId="busTeamId"></router-view>
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
        busTeamId : '',
        showBusTeam : false,
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
      this.showBusTeam = this.$route.path.indexOf('subjectCompleteRate') > 0
//      this.getAreaTeamList();
    },
    computed: {
      areaTeams: function () {
        return this.$root.config.areaTeams || []
      },
      busTeams: function () {
        return ( ( this.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.areaTeamId] || [] ) : [] )
      },
    },
    methods:{
      handleAreaTeamIdChange() {
      	this.busTeamId = ''
      },
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
