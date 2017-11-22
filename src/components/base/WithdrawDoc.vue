<template>
  <window ref="win" title="提现单">
    <iframe ref="withdrawDoc" height="500px" src="../../static/cert/withdrawDoc.html" width="100%" frameborder="0"></iframe>
  </window>
</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData: [],
        balanceWithdrawalId: '',
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {

    },
    methods: {
      loadTableData:function(){
        var _this = this
        _this.$showLoading()
        io.post(io.withdrawalDetail,{
          balanceWithdrawalId: this.balanceWithdrawalId
        },function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            _this.tableData = ret.data
            sessionStorage.setItem('withdrawalDetail', JSON.stringify(ret.data))
            _this.$refs.withdrawDoc.contentWindow.postMessage(JSON.stringify(ret.data), '*')
            debugger
//            _this.$refs.withdrawDoc
//            _this.balanceAmount = ret.data.remainAmount
//            _this.extra = JSON.parse(ret.data.extra)
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      show:function(){
        this.$refs.win.show({
          width:1000,
          height:600
        })
        this.loadTableData()
      }
    }
  }
</script>
