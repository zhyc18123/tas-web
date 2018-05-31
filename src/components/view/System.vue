<template>
  <div class="m-system container">
    <el-breadcrumb class="nav-little" separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">
        <svg class="icon shouye" aria-hidden="true">
          <use xlink:href="#icon-shouye1"></use>
        </svg>
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/main/system' }">
        系统管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{activeName}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="tabs my-tabs sys-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户列表" name="用户列表">
        </el-tab-pane>
        <el-tab-pane label="操作角色列表" name="操作角色列表">
        </el-tab-pane>
        <el-tab-pane label="教育机构管理" name="教育机构管理">
        </el-tab-pane>
        <el-tab-pane label="个人合作管理" name="个人合作管理">
        </el-tab-pane>
        <el-tab-pane label="班级管理" name="班级管理">
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <div class="system-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import VCharacterListContainer from '../system/CharacterListContainer.vue'
import VUserListContainer from '../system/UserListContainer.vue'
export default {
  name: 'system',
  components: {
    VCharacterListContainer,
    VUserListContainer,
  },
  data() {
    return {
      activeName: '用户列表'
    }
  },
  created() {
    this.$store.dispatch('config')
    if (this.$route.path.indexOf('userList') > 0) {
      this.activeName = '用户列表'
    } else if (this.$route.path.indexOf('characterList') > 0) {
      this.activeName = '操作角色列表'
    } else if (this.$route.path.indexOf('organization') > 0) {
      this.activeName = '教育机构管理'
    }else if (this.$route.path.indexOf('personal') > 0) {
      this.activeName = '个人合作管理'
    } else if (this.$route.path.indexOf('class') > 0) {
      this.activeName = '班级管理'
    }
  },
  computed: {
  },
  methods: {
    handleClick(tab) {
      if (this.activeName === '用户列表') {
        this.$router.push('/main/system/userList/list')
      } else if (this.activeName === '操作角色列表') {
        this.$router.push('/main/system/characterList/list')
      }else if (this.activeName === '教育机构管理') {
        this.$router.push('/main/system/organization/list')
      }else if (this.activeName === '个人合作管理') {
        this.$router.push('/main/system/personal/list')
      }else if (this.activeName === '班级管理') {
        this.$router.push('/main/system/class/list')
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.m-system {
  .nav-little {
    border-bottom: none;
    margin: 0;
  }
  .system-content {
    // min-height: 1000px;
  }
}
</style>
<style lang="less">
.m-system {
  padding: 0 30px;
  background-color: #fff;
  .tabs {
    .el-tabs__header {
      border-bottom: 4px solid #00b1d1;
      margin: 0;
      background:white;
      padding-left:0;
      padding-top:0;
    }
    .el-tabs__item {
      height: 38px;
      line-height: 36px;
      margin-right: 1px;
      background: #fff;
      color: #333;
      font-size: 14px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      font-weight: bold;
      border: 1px solid #00b1d1;
      border-bottom: 4px solid #00b1d1;
    }
    .el-tabs__nav-wrap {
      margin-bottom: -4px;
    }
    .el-tabs__content {
      /*background: white;*/
      /*min-height: 1000px;*/
      display: none;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
      background: #00b1d1;
      color: #fff;
      border: 1px solid #00b1d1;
      border-bottom: 4px solid #00b1d1;
    }
  }
}
</style>
<style lang="less">
.sys-tab{
  .tabs .el-tabs__header{
    background:white;
  }
  .el-tabs__header{
    box-shadow:none;
  }
}
</style>



