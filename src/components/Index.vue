<template>
  <div class="am-g tpl-g m-main">
    <!-- 头部 -->
    <main-header/>

    <!-- 侧边导航栏 -->
    <left-sidebar/>

    <!-- 内容区域 -->
    <div class="tpl-content-wrapper" v-bind:style="{ minHeight: contentHeight + 'px'}">
      <div  class="m-index">
        <div class="bg">
          <div class="main-bg-1"></div>
          <div class="main-bg-2"></div>
        </div>
        <div class="info">
          <div class="bg-text"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import LeftSidebar from './base/LeftSidebar'
  import MainHeader from './base/MainHeader'
  import Breadcrumb from './base/Breadcrumb'

  import io from '../lib/io'
  import conf from '../lib/conf'

  import Vue from 'vue'

  import storage from '../lib/storage'


  function loadConfig( cb ){
    io.post(io.apiAdminConfig , {},function(ret){

      function toMenus( resourceList ){
        var menus = []
        for(var i = 0 ; i < resourceList.length ; i++ ){
          var resource = resourceList[i]
          if(resource.resourceType != 1 ){
            continue ;
          }
          var menu = {
            name:resource.resourceName ,
            path:resource.pageUrl,
            icon:resource.iconUrl
          }

          if(resource.children){
            menu.subMenus =  toMenus(resource.children)
          }
          menus.push(menu)
        }
        return menus
      }

      function toPermission(resourceList,parent,permission){
        permission = permission || {}
        for(var i = 0 ; i < resourceList.length ; i++ ){
          var resource = resourceList[i]

          if(parent && parent.pageUrl ){
            permission[parent.pageUrl] = permission[parent.pageUrl] || {}
            permission[parent.pageUrl][resource.permission] = true
          }

          if(resource.children){
            toPermission(resource.children,resource,permission)
          }
        }

        return permission
      }

      function toGroupBusTeams(busTeamList){
        var group = {}
        if(!busTeamList){
          return group ;
        }
        for(var i = 0 ; i < busTeamList.length ;i++ ){
          var busTeam = busTeamList[i]
          group[busTeam.areaTeamId] = group[busTeam.areaTeamId] || []
          group[busTeam.areaTeamId].push(busTeam)
        }
        return group
      }

      cb && cb({
        menus : toMenus(ret.data.resourceList),
        permission:toPermission(ret.data.resourceList),
        groupBusTeams:toGroupBusTeams(ret.data.busTeamList),
        areaTeams:ret.data.areaTeamList || [],
        busTeams:ret.data.busTeamList || [],
        grades:ret.data.gradeList,
        subjects:ret.data.subjectList,
        periods:ret.data.periodList

      })

    })
  }


  export default {
    name: 'main',
    components: {
      LeftSidebar,
      MainHeader,
      Breadcrumb
    },
    data () {
      return {
        isMainLayout : true,
        isIndex : false,
        contentHeight : 922,
      }
    },
    beforeRouteEnter (to, from, next) {
      var st = setTimeout(function(){
        Vue.showLoading()
      },500)
      loadConfig(function(config){
        window.config = config
        next(function(vm){
          vm.$root.config =  config
          clearTimeout(st)
          Vue.hiddenLoading()
        })
      })
    },
    created:function(){
      this.isIndex = this.$route.path === '/main/index'
      this.refreshUserInfo()
    },
    mounted:function(){
      var _this = this
      $(document).ready(function(){
        _this.contentHeight = $(window).height() - 60
      })
      this.$root.$on('reloadConfig',function(){
        loadConfig(function(config){
          _this.$root.config =  config
        })
      })
    },
    methods:{
      refreshUserInfo:function(){
        if(!storage.getLogin()){
          return
        }
        var _this = this
        io.post(io.apiAdminSysUserDetail,{
          userId : storage.getLogin().userId
        },function(ret){
          if(ret.success){
            storage.setCurrentUserInfo(ret.data)
            _this.$root.$emit('userInfoChange',ret.data)
          }
        })
      }
    }
  }


</script>
<style scoped lang="less">
  .m-index {
    width: 100%;
    height: 100%;
    .info {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      /*background: url("../assets/img/bg-06.jpg") center center no-repeat  fixed;*/
      /*background-size: cover;*/
    }
    .bg-text {
      z-index: 100;
      vertical-align: middle;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: url("../assets/img/bg-05.png") center 38% no-repeat;
      width: 100%;
    }
    .bg {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: #FFF;
      height: 100%;
      /*background: url("../assets/img/bg-06.jpg") center center no-repeat  fixed;*/
      /*background-size: cover;*/
    }
    .main-bg-1 {
      background: url("../assets/img/bg-01.jpg") top no-repeat;
      background-size: 100%;
      height: 67%;
    }
    .main-bg-2 {
      background: url("../assets/img/bg-02.png") 0 bottom no-repeat;
      background-size: 100%;
      height: 33%;
    }
  }
</style>
