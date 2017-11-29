<template>
  <ol class="am-breadcrumb">
    <li><a href="javascript:;" class="am-icon-home">首页</a></li>
    <li v-for="item in items"><a href="javascript:;" @click="go(item)">{{item.name}}</a></li>
  </ol>
</template>
<style scoped>

</style>
<script>
  import storage from '../../lib/storage'
    export default{
        name:'breadcrumb',
        data(){
            return{
                items:[]
            }
        },
        created:function(){
          var _this = this
          console.log(1)
          _this.items = storage.getBreadcrumb()
          this.$root.$on('sidebar.click',function(items){
            _this.items = items
            storage.setBreadcrumb(items)
          })
        },
      components: {storage},
        methods:{
          go:function(item){
            this.$router.push(item.path)
          }
        }
    }
</script>
<style lang="less" scoped>
  .am-breadcrumb {
    padding-top: 5px;
    padding-bottom: 15px;
    padding-left: 26px;
    font-size: 12px;
    &>li [class*=am-icon-]:before {
      font-size: 14px;
    }
     &>li+li:before {
      content: "\f105";
       color: #666666;
    }
    &>li a{
      color: #666;
      cursor: default;
    }
    &>li:last-child a{
      color: #0090c3;
      cursor: pointer;
    }
    .am-icon-home:before {
      color: #4db3ff;
    }
  }
</style>
