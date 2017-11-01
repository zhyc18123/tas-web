<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">目标设置</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12">
            <router-link to="/main/operating/targetSet/mainAccountTarget" tag="div" class="router" v-if="hasPermission('mainAccountTarget')" >
              <el-button type="primary">
                录入业务组目标
              </el-button>
            </router-link>
            <router-link to="/main/operating/targetSet/productTarget" tag="div" class="router" v-if="hasPermission('teacherTarget')" >
              <el-button type="success">
                录入产品线目标
              </el-button>
            </router-link>

            <router-link to="/main/operating/targetSet/courseTarget" tag="div" class="router" v-if="hasPermission('classTarget')" >
              <el-button type="warning">
                录入班级目标
              </el-button>
            </router-link>
            <router-link to="/main/operating/targetSet/teacherTarget" tag="div" class="router" v-if="hasPermission('productTarget')" >
              <el-button type="info">
                录入班主任目标
              </el-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import io from '../../lib/io'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  export default{
    components: {ElButton},
    mounted:function(){
      $(window).smoothScroll()
    },
  }
</script>
<style scoped lang="less">
  .router {
    width: 150px;
    display: inline-block;
    height: 140px;
    cursor: pointer;
    line-height: 140px;
    text-align: center;
  }
</style>
