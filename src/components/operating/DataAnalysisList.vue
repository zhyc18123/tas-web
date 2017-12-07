<template>
  <div class="data-analysis">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">数据分析</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form-group">
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

    },
    computed: {

    },
    methods:{

    }
  }
</script>
<style lang="less" scoped>

</style>
