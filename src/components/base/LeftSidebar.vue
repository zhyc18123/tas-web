<template>
  <div class="left-sidebar">

    <!-- 菜单 -->
    <ul class="sidebar-nav">

      <li v-for="item in menus" class="sidebar-nav-link">
        <a href="javascript:;" :class="item.subMenus?'sidebar-nav-sub-title':''" @click="go(item)">
          <svg class="icon sidebar-nav-link-logo" aria-hidden="true">
            <use xlink:href="#icon-wenjianjia"></use>
          </svg>
          {{item.name}}
          <span class="am-icon-angle-double-down am-fr am-margin-right-sm sidebar-nav-sub-ico" v-if="item.subMenus"></span>
        </a>
        <ul class="sidebar-nav sidebar-nav-sub" v-if="item.subMenus">
          <li class="sidebar-nav-link" v-for="subItem in item.subMenus">
            <a href="javascript:;" :class="{active: activePath == subItem.path}" @click="go(item,subItem)">
              <span class="sidebar-nav-link-logo am-icon-angle-right" :class="subItem.icon"></span> {{subItem.name}}
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
    data: function () {
      return {
        pathMap: {},
        activeIndex: '',
        activePath: '',
      }
    },

    computed: {
      menus: function () {
        return this.$root.config.menus || {}
      },
    },
    mounted: function () {
      var $sidebar = $('.sidebar-nav')
      $('.sidebar-nav').on('click', '.sidebar-nav-sub-title', function () {

        let $open = $('.active', $sidebar),
          index = $('.sidebar-nav .sidebar-nav-sub-title').index(this)

        sessionStorage.setItem('activeIndex', index)
        if(!$open.is(this)){
          $open.removeClass('active').siblings('.sidebar-nav-sub').slideToggle(80).end()
            .find('.sidebar-nav-sub-ico').toggleClass('sidebar-nav-sub-ico-rotate')
        }

        $(this).toggleClass("active").siblings('.sidebar-nav-sub').slideToggle(80)
          .end()
          .find('.sidebar-nav-sub-ico').toggleClass('sidebar-nav-sub-ico-rotate');

      })
    },
    created: function () {
      let _this = this
      this.resetUnfolded()
      _this.$root.$emit('sidebar.click', _this.pathMap[_this.$route.path])
      _this.$root.$on("showOrHiddenLeftSidebar", function () {
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

      _this.$root.$on('changeMenus', function (menus) {
        _this.menus = menus
      })

      if ($(window).width() < 1024) {
        $('.left-sidebar').addClass('active');
      } else {
        $('.left-sidebar').removeClass('active');
      }


    },

    methods: {
      go: function () {
        debugger
        var item = arguments[arguments.length - 1]
        if (item.path) {
          this.$root.$emit('sidebar.click', arguments)
          this.$router.push(item.path)
          this.activePath = item.path
          sessionStorage.setItem('activePath', item.path)
        }
      },
      resetUnfolded() {
        let _this = this
        setTimeout(function () {
          _this.activePath = sessionStorage.getItem('activePath') || _this.$route.path // to 从缓存拿
          _this.activeIndex = sessionStorage.getItem('activeIndex')
          _this.menus.map((val, index) => {
            val.subMenus.map(i => {
              if(i.path === _this.$route.path) {
                _this.activeIndex = index
                _this.activePath = _this.$route.path
                sessionStorage.setItem('activeIndex', index)
                sessionStorage.setItem('activePath', _this.$route.path)
              }
            })
          })
          $('.sidebar-nav-sub-title').each(function (index, target) {
            if( _this.pathMap[_this.$route.path] &&  _this.pathMap[_this.$route.path].length > 0) {
              this.innerText.trim() === _this.pathMap[_this.$route.path][0].name ? $(this).trigger('click'): $.noop()
            } else if (Number(_this.activeIndex) === index) {
              $(target).trigger('click')
            }
          })
        })
      },
    },
    watch: {
      menus: function (menus) {
        for (var i = 0; i < menus.length; i++) {
          var menu = menus[i]
          this.pathMap[menu.path] = [menu]
          if (menu.subMenus && menu.subMenus.length) {
            for (var j = 0; j < menu.subMenus.length; j++) {
              var subMenu = menu.subMenus[j]
              this.pathMap[subMenu.path] = [menu, subMenu]
            }
          }
        }
      },
//      TODO 浏览器前进后退的侧边栏的恢复变现
//      '$route' (to, from) {
//        let _this = this
//        this.activePath = to.path
//        this.menus.map((val, index) => {
//          val.subMenus.map(i => {
//          	if(i.path === to.path) {
//          		_this.activeIndex = index
//          		_this.activePath = to.path
//              sessionStorage.setItem('activeIndex', index)
//              sessionStorage.setItem('activePath', to.path)
//            }
//          })
//        })
//        this.resetUnfolded()
//      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .left-sidebar {
    border-right: 1px solid #e9ecf3;
    width: 241px;
    .sidebar-nav-link {
      .sidebar-nav-sub-title{
        border-bottom: 1px solid #e9ecf3;
        color: #666666;
        padding: 11px 14px 11px 22px;
      }
      .sidebar-nav-sub {
        .sidebar-nav-link {
          padding-left: 0;
          a {
            font-size: 12px;
            color: #666666;
            padding-left: 0;
            &.active {
              background-color: #e9ecf3;
              border-left: 3px solid #3bb4f2;
            }
          }
          &:last-child {
            border-bottom: 1px solid #e9ecf3;
          }
        }
        .am-icon-angle-right {
          margin-left: 53px;
        }
      }
      a.active {
        background-color: #effaff;
        border-left: none;
      }
      &:hover {
        .am-icon-angle-double-down {
          color: #3bb4f2;
        }
      }
      [class*=am-icon-] {
        color: #3bb4f2;
      }
      .am-icon-angle-double-down {
        color: #fff;
        font-size: 18px;
        line-height: 23px;
      }
      .sidebar-nav-sub-ico-rotate {
        color: #3bb4f2;
        line-height: 23px;
      }
      .sidebar-nav-link-logo {
        fill: #3bb4f2;
        margin-right: 10px;
      }
    }
  }
</style>
