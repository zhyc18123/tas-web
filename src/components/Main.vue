<template>
  <div class="am-g tpl-g">
    <!-- 头部 -->
    <main-header/>

    <!-- 侧边导航栏 -->
    <left-sidebar/>

    <!-- 内容区域 -->
    <div class="tpl-content-wrapper">
      <div class="row-content am-cf">
        <breadcrumb />
        <template v-if="$route.matched.length > 1 ">
          <router-view></router-view>
        </template>
        <template v-else>
          <p>You are logged</p>
        </template>
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


export default {
  name: 'main',
  components: {
    LeftSidebar,
    MainHeader,
    Breadcrumb
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted:function(){
    this.loadConfig()
    var _this = this
    this.$root.$on('reloadConfig',function(){
      _this.loadConfig()
    })
  },
  methods:{
    loadConfig:function(){
      var _this = this
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

        var menus  = toMenus(ret.data.resourceList)
        _this.$root.config = {
        menus : toMenus(ret.data.resourceList),
        permission:toPermission(ret.data.resourceList),
        groupBusTeams:toGroupBusTeams(ret.data.busTeamList),
        areaTeams:ret.data.areaTeamList || [],
        busTeams:ret.data.busTeamList || [],
        grades:ret.data.gradeList,
        subjects:ret.data.subjectList,
        periods:ret.data.periodList

        }


      })
    }
  }
}


</script>

