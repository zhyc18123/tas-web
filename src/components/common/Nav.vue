<template>
  <div class="m-nav">
    <el-row class="m-head-nav">
      <div class="head-nav container">

        <el-col :span='16' class="head-version">
          <div class="logo-div">
            <router-link to="/">
              <img class="logo" alt="logo" src="../../assets/img/logo.svg">
            </router-link>
          </div>
          <el-col :span='10' class="version" text="教学赋能平台">教学赋能平台
            <em>V1.0</em>
          </el-col>
        </el-col>
        <el-col :span='8' v-if="!noLogin">
          <template v-if="!loginInfo">
            <el-button class="btn-login" v-show="false" type="text" @click="showLoginForm = true">登录</el-button>
          </template>
          <div class="has-login" v-else>
            <!-- <div class="has-name-img">
                <img src="" alt="">
              </div> -->
            <div class="login-name">
              <img v-if="true" :src="loginInfo.avatarUrl" />
              <span>欢 迎您！
                <em>{{loginInfo?loginInfo.userName:''}}</em>
              </span>
              <!--<svg class="icon xiala" aria-hidden="true">
                      <use xlink:href="#icon-xiala"></use>
                    </svg>-->
            </div>
            <a href="javascript:;" @click="vLogout">退出</a>
          </div>
        </el-col>
      </div>
    </el-row>
    <div class="nav-div" v-if="!noTab">
      <el-menu theme="light" :default-active="activeIndex" router class="el-menu-demo" mode="horizontal">
        <el-menu-item index="/main/teach-research/course">教研</el-menu-item>
        <el-menu-item index="/main/prepare-lessons">备课</el-menu-item>
        <el-menu-item index="/main/attend-class">上课</el-menu-item>
        <el-menu-item index="/main/system/basisSetting/topicOrigin">系统管理</el-menu-item>
        <!-- <el-menu-item v-if="config.report_manage" index="/main/report">报表管理</el-menu-item>
          <el-menu-item v-if="config.sys_manage" index="/main/system/basisSetting/topicOrigin">系统管理</el-menu-item> -->
      </el-menu>
    </div>
  </div>
</template>

<script>
import io from '../../lib/io'
import md5 from 'js-md5'
import storage from '../../lib/storage/index'
import { mapGetters,mapActions } from 'vuex'

const PASSWORD_PLACEHOLDER = '****************' // 16
export default {
  components: {},
  props: ['noTab', 'noLogin'],
  data: function() {
    let activeIndex,
      routerModule = this.$router.currentRoute.path.split("/")[2];
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    if (routerModule) {
      console.log('fff',routerModule.indexOf('teach-research'))
      if (routerModule.indexOf('teach-research') === 0) {
        activeIndex = '/main/teach-research/course'
      } else if (routerModule.indexOf('prepare-lessons') === 0) {
        activeIndex = '/main/prepare-lessons'
      } else if (routerModule.indexOf('attend') === 0) {
        activeIndex = '/main/attend-class'
      } else if (routerModule.indexOf('system') === 0) {
        activeIndex = '/main/system/basisSetting/topicOrigin'
      }
      else {
        activeIndex = '/index'
      }
      // }
    } else {
      activeIndex = '/index'
    }
    return {
      activeIndex: activeIndex,
      loginInfo:storage.getCurrentUserInfo()
    }
  },
  created: function() {
  },
  computed: {
    // ...mapGetters([
    //   'loginInfo'
    // ])
  },
  methods: {
    ...mapActions(['logout']),
  vLogout(){
    this.$confirm('确认退出？','提示').then(()=>{
      this.logout()
    this.$router.push({path:'/login',query:{backUrl:this.$route.fullPath}})
    })
  }
  }
}
</script>

<style lang="less">
.m-nav {
  background-color: #fff;
  .m-head-nav {
    box-shadow: 0px 1px 4px 0px rgba(85, 85, 85, 0.3);
  }
  .tip {
    color: red;
    margin: 0 0 20px 0;
  }
  .radio {
    margin: 30px 20px 20px 0;
  }
  .logo-div {
    display: inline-block;
    float: left;
    height: 80px;
  }
  .head-version {
    height: 80px;
    line-height: 80px;
    a:hover {
      background: transparent;
    }
  }
  .version {
    font-size: 26px;
    margin-left: 28px;
    font-family: MFLangQian_Noncommercial-Regular;
    color: #00A1D5;
    display: inline-block; // height: 80px;
    position: relative;
    &:before {
      //渐变
      content: attr(text);
      position: absolute;
      z-index: 10;
      color: #01CEBF;
      -webkit-mask: linear-gradient(to left, #01CEBF, transparent);
    }
    em {
      color: #ff9000;
      font-size: 12px;
      position: relative;
      top: -5px;
      vertical-align: top;
      margin-left: 7px;
      font-weight: 700;
      font-style: normal;
    }
  }
  .subject-name {
    background: #eee;
    border-radius: 2px;
    font-size: 12px;
    padding: 3px 6px;
    margin-right: 10px;
  }
  .has-login {
    font-size: 12px;
    color: #999;
    float: right;
    height: 80px;
    line-height: 80px;
    .has-name-img {
      display: inline-block;
      padding-right: 22px;
      height: 80px;
      img {
        width: 36px;
        height: 36px;
        display: inline-block;
        border: solid 2px rgba(170, 170, 170, 0.3);
        border-radius: 50%;
      }
    }
    .login-name {
      display: inline-block;
      padding-right: 20px;
      height: 80px;
      em {
        font-style: normal;
        display: inline-block;
        height: 47px;
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
        top: 2px;
      }
    }
    .xiala {
      font-size: 20px !important;
      color: #00b1d1;
      position: relative;
      top: -2px;
      margin-left: 3px;
      margin-right: 20px;
    }
    a {
      padding-left: 10px;
      border-left: 1px solid #eee;
      &:hover {
        color: #00a7eb;
      }
    }
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      position: relative;
      top: 13px;
      margin-right: 22px;
    }
  }
  .head-nav {
    height: 80px;
    line-height: 80px;
    .el-dialog__body {
      padding: 0 20px;
    }
    .el-dialog__header {
      padding: 0 20px;
    }
    .logo {
      width: 110px;
      height: 40px;
      line-height: 67px;
      margin: 20px 0;
      padding: 0 38px;
      padding-left: 20px;
      border-right: 1px solid #eee;
    }

    .icon {
      font-size: 28px;
      vertical-align: -8px;
      margin-right: 3px;
    }
    .pass {
      font-size: 24px;
    }

    .btn-login {
      background-color: #0681d1 !important;
      color: #fff;
      padding: 0 12px;
      font-size: 12px;
      border: none;
      height: 26px;
      line-height: 26px;
      margin: 32px 0;
      &:hover {
        background-color: #2a92d6;
      }
    }
    .btn-sign-up {
      background-color: #ff7f00;
      color: #fff;
      padding: 0 12px;
      font-size: 12px;
      border: none;
      height: 26px;
      line-height: 26px;
      margin: 32px 0px 0 10px;
      &:hover {
        background-color: #fba652;
      }
    }
  }

  .login-dialog {
    width: 540px; // height: 400px;
    padding: 30px 70px;
    background: white;

    .el-dialog__headerbtn {
      margin-top: -15px;
    }

    .el-dialog__header {
      padding: 20px 0 0;
      text-align: center;
      border-bottom: 2px solid #00b1d1;
      height: 40px;
      line-height: 40px;
      background: white !important;
      .el-dialog__title {
        line-height: 1;
        color: #008fa9 !important;
        font-size: 28px;
      }
    }
    .el-dialog__body {
      padding: 20px 0;
    }

    .el-form {
      width: 398px;

      .el-form-item {
        .el-input__inner {
          height: 40px;
          line-height: 40px;
        }
      }
      .phone-code-item {
        margin-bottom: 12px;
        .el-input {
          width: 291px;
          vertical-align: top;
          text-align: left;
          margin-top: 3px;
        }
        img {
          cursor: pointer;
        }
      }
      .el-input-group__prepend {
        border-color: #bfebf3;
        svg {
          fill: #00b1d1;
        }
        input {
          border-left: none;
        }
      }
      .remember {
        height: 20px;
        line-height: 20px;
        margin-top: 20px;
      }
      .dialog-footer {
        height: 80px;
        line-height: 36px;
      }
      .submit-login {
        padding: 14px 177px;
        font-size: 20px;
        margin-top: 42px;
        color: white;
      }
    }
    .login-form-footer {
      text-align: left;
      a {
        text-decoration: underline;
        color: #20a0ff;
      }
    }
  }

  .el-menu {
    width: 480px;
    background-color: transparent;
    margin: 0 auto;
  }
  .nav-div {
    background: linear-gradient(to right, #009fd7, #01d1bb);
  }
  .el-menu--horizontal .el-menu-item {
    height: 60px;
    line-height: 60px; // padding: 0 35px;
    width: 120px;
    text-align: center;
    font-size: 18px;
    color: white; // font-weight: bold;
    &.is-active,
    &:hover {
      border-bottom: 4px solid #ffd800;
      background: #33c9d1;
    }
  }
}

.container {
  width: 80%;
  min-width: 1200px;
  margin: auto;
}

.sure-btn {
  text-align: center;
}
</style>

<!--覆盖第三方组件的子组件存在问题-->
<!--https://github.com/vuejs/vue-loader/issues/821-->
