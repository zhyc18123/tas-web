<template>
  <div class="left-sidebar">
    <!-- 用户信息 -->
    <div class="tpl-sidebar-user-panel">
      <div class="tpl-user-panel-slide-toggleable">
        <div class="tpl-user-panel-profile-picture">
          <img :src="avatarUrl" alt="">
        </div>
          <span class="user-panel-logged-in-text">
              <i class="am-icon-circle-o am-text-success tpl-user-panel-status-icon"></i>
              {{name}}
          </span>
        <a href="javascript:;" class="tpl-user-panel-action-link" @click="$router.push('/main/sys/user/profile')"> <span class="am-icon-pencil"></span> 账号设置</a>
      </div>
    </div>

    <!-- 菜单 -->
    <ul class="sidebar-nav">

      <li v-for="item in menus" class="sidebar-nav-link" >
        <a href="javascript:;" :class="item.subMenus?'sidebar-nav-sub-title':''" @click="go(item)">
          <i class="sidebar-nav-link-logo" :class="item.icon"></i> {{item.name}}
          <span class="am-icon-chevron-down am-fr am-margin-right-sm sidebar-nav-sub-ico" v-if="item.subMenus"></span>
        </a>
        <ul class="sidebar-nav sidebar-nav-sub" v-if="item.subMenus" >
          <li class="sidebar-nav-link" v-for="subItem in item.subMenus">
            <a href="javascript:;" @click="go(item,subItem)">
              <span class="sidebar-nav-link-logo" :class="subItem.icon"></span> {{subItem.name}}
            </a>
          </li>
        </ul>
      </li>


    </ul>
  </div>
</template>

<script>

import storage from '../../lib/storage'

export default {
  name: 'left-sidebar',
  data:function(){
    var userInfo = storage.getCurrentUserInfo()
    return {

      pathMap : {},
      avatarUrl : userInfo.avatarUrl || require('../../assets/img/user04.png'),
      name : userInfo.realName
    }
  },
   created:function(){

  },
  computed:{
    menus:function(){
      return this.$root.config.menus || {}
    }
  },
  mounted:function(){
    $('.sidebar-nav').on('click','.sidebar-nav-sub-title', function() {
    $(this).siblings('.sidebar-nav-sub').slideToggle(80)
            .end()
            .find('.sidebar-nav-sub-ico').toggleClass('sidebar-nav-sub-ico-rotate');
    })

  },
  created:function(){

    var _this = this
    setTimeout(function(){
      _this.$root.$emit('sidebar.click',_this.pathMap[_this.$route.path])
    })

    _this.$root.$on("showOrHiddenLeftSidebar",function(){
      if ($('.left-sidebar').is('.active')) {
          if ($(window).width() > 1024) {
              $('.tpl-content-wrapper').removeClass('active');
          }
          $('.left-sidebar').removeClass('active');
      } else {

          $('.left-sidebar').addClass('active');
          if ($(window).width() > 1024) {
              $('.tpl-content-wrapper').addClass('active');
          }
      }
    })

    _this.$root.$on('changeMenus',function(menus){
      _this.menus = menus
    })

    if ($(window).width() < 1024) {
        $('.left-sidebar').addClass('active');
    } else {
        $('.left-sidebar').removeClass('active');
    }

    _this.$root.$on('userInfoChange',function(userInfo){
      _this.name = userInfo.realName
      _this.avatarUrl = userInfo.avatarUrl
    })
  },

  methods:{
    go:function(){
      var item  = arguments[arguments.length-1]
      if(item.path){
        this.$root.$emit('sidebar.click',arguments)
        this.$router.push(item.path)
      }
    }
  },
  watch:{
    menus : function(menus){
          for(var i = 0 ; i < menus.length ; i++ ){
            var menu = menus[i]
            this.pathMap[ menu.path  ] = [menu]
            if( menu.subMenus && menu.subMenus.length ){
              for(var j = 0 ;j  < menu.subMenus.length ; j++ ){
                var subMenu = menu.subMenus[j]
                this.pathMap[ subMenu.path ] = [menu,subMenu]
              }
            }
          }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
