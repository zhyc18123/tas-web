<template>
  <ul class="am-pagination tpl-pagination">
    <li v-for="n in pages" :key="n" :class="n==pageNo ? 'am-active' :''"><a href="javascript:;" @click="$emit('paging' , n )" class="">{{n}}</a></li>
  </ul>
</template>
<style scoped>

</style>
<script>
    export default{
        name : 'pagination',
        props:['total','pageNo','pageSize'],
        data:function(){
          return {
            pages2 : 10
          }

        },
        computed:{
            pages:function(){
              var pages = parseInt( this.total / this.pageSize ) ;
              if(this.total % this.pageSize != 0 ){
                pages++
              }
              return pages
            }
         }
    }
</script>
