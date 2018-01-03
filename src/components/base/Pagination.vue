<template>
  <ul class="am-pagination tpl-pagination" v-if="total != 0 ">
    <li v-if="isShowTotal" style="font-size: 14px;color: #333">共&nbsp;{{total}}&nbsp;条</li>
    <li v-if="showLeftMore"><a href="javascript:;" @click="$emit('paging' , showPages[0] - 1 )">...</a></li>
    <li v-for="n in showPages" :key="n" :class="n==pageNo ? 'am-active' :''"><a href="javascript:;" @click="$emit('paging' , n )" class="">{{n}}</a></li>
    <li v-if="showRightMore"><a href="javascript:;" @click="$emit('paging' , showPages[showPages.length - 1] + 1 )">...</a></li>
  </ul>
</template>
<style scoped>

</style>
<script>
    export default{
        name : 'pagination',
        props:{
          total: {
            default: 0
          },
          pageNo: {
            default: 1
          },
          pageSize: {
            default: 10
          },
          isShowTotal: {
            type: Boolean,
            default: true
          }
        },
        data:function(){
          return {
            totalPage : 10,
            showPages : [] ,
            showLeftMore : false,
            showRightMore : false
          }
        },
        watch:{
          total:function () {
             this.change()
          },
          pageNo:function () {
            this.change()
          },
          pageSize:function () {
            this.change()
          }
        },
        created:function(){
            if(this.total > 0 ){
                this.change()
            }
        },
        methods:{
          change:function(){
            this.totalPage = parseInt( this.total / this.pageSize ) ;
            if(this.total % this.pageSize != 0 ){
              this.totalPage++
            }

            var maxShow  = Math.min(10,this.totalPage )

            var sp  = []
            var s = parseInt( ( this.pageNo - 1 ) / maxShow ) * maxShow + 1
            var e = Math.min( s + maxShow , this.totalPage + 1 )
            for(var i  = s  ;i < e ; i++ ){
              sp.push(i)
            }

            this.showPages = sp
            this.showLeftMore = this.pageNo > maxShow
            this.showRightMore = this.pageNo <= parseInt( ( this.totalPage -1 ) / maxShow ) * maxShow

          }
        }

    }
</script>
