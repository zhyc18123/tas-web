<template>
  <window ref="win" title="">
    <div ref="refundDocIframe"></div>
    <el-button type="success" @click="print">打印</el-button>
  </window>
</template>

<script>
  import io from '../../lib/io'
  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData: [],
        studentRefundId: '',
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
        io.post(io.studentRefundWithRegInfoDetail,{
          studentRefundId: this.studentRefundId
        },function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            ret.data.studentRefund.createTime = _this.$options.filters.formatTime(ret.data.studentRefund.createTime)
            ret.data.studentRefund.updateTime = _this.$options.filters.formatTime(ret.data.studentRefund.updateTime)
            _this.tableData = Object.assign({},ret.data.studentRefund,ret.data.courseClass,ret.data.studentReg,ret.data.student)
            ret.data.createTime = _this.$options.filters.formatDate(ret.data.createTime)
            ret.data.auditTime = _this.$options.filters.formatDate(ret.data.auditTime)
            sessionStorage.setItem('refundDetail', JSON.stringify(ret.data))
            let src = "../../static/cert/refund.html?time=" + new Date().getTime()
            $(_this.$refs.refundDocIframe).html('<iframe ref="withdrawDoc" height="900px" src='+ src +
              ' width="100%" frameborder="0"></iframe>')
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      show:function(){
        this.$refs.win.show({
          width:900,
          height:1000
        })
        this.loadTableData()
      },
      print() {
        var frame = $(this.$refs.refundDocIframe).find('iframe')[0];
        frame.contentWindow.focus()
        frame.contentWindow.print();
      },
    }
  }
</script>
