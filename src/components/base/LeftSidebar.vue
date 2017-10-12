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

        var $open = $('.active', $sidebar) ;

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

      var _this = this
      setTimeout(function () {
        _this.$root.$emit('sidebar.click', _this.pathMap[_this.$route.path])
        $('.sidebar-nav-sub-title').each(function () {
          this.innerText.trim() === _this.pathMap[_this.$route.path][0].name ? $(this).trigger('click'): $.noop()
          _this.activePath = _this.$route.path
        })
      })

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
//      getClassName: function (item,e) {
//        var className = ''
//        debugger
//        this.pathMap[this.$route.path][0].name == item.name ? className = 'active ' : className= ''
//        item.subMenus?className += 'sidebar-nav-sub-title':className += ''
//        return className
//      },
      go: function () {
      	debugger
        var item = arguments[arguments.length - 1]
        if (item.path) {
          this.$root.$emit('sidebar.click', arguments)
          this.$router.push(item.path)
          this.activePath = item.path
        }
      }
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
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .left-sidebar {
    .sidebar-nav-link {
      .sidebar-nav-sub-title{
        border-bottom: 1px solid #e9ecf3;
        color: #666666;
        padding: 11px 22px;
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
      }
      .sidebar-nav-sub-ico-rotate {
        color: #3bb4f2;
      }
      .sidebar-nav-link-logo {
        fill: #3bb4f2;
        margin-right: 10px;
      }
    }
  }
</style>
