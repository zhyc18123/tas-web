<template>
  <ol class="am-breadcrumb">
    <li><a href="javascript:;" class="am-icon-home">首页</a></li>
    <li v-for="item in items"><a href="javascript:;" @click="go(item)">{{item.name}}</a></li>
  </ol>
</template>
<style scoped>

</style>
<script>
    export default{
        name:'breadcrumb',
        data(){
            return{
                items:[]
            }
        },
        created:function(){
          var _this = this
          this.$root.$on('sidebar.click',function(items){
            _this.items = items
          })
        },
        methods:{
          go:function(item){
            this.$router.push(item.path)
          }
        }
    }
</script>
