<template>
  <window ref="win" title="">
    <div id="iframe"></div>
    <el-button type="success" @click="print">打印</el-button>
  </window>
</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

  export default{
    components: {ElButton},
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
            ret.data.createTime = _this.$options.filters.formatTime(ret.data.createTime)
            ret.data.auditTime = _this.$options.filters.formatTime(ret.data.auditTime)
            ret.data.bigAmount = _this.digitUppercase(ret.data.amount)
            if (ret.data.status === '0') {
              ret.data.status = '审核中'
            } else if (ret.data.status === '1') {
              ret.data.status = '同意'
            } else if (ret.data.status === '2') {
              ret.data.status = '驳回'
            }
            sessionStorage.setItem('withdrawalDetail', JSON.stringify(ret.data))
            $('#iframe').html('<iframe ref="withdrawDoc" height="600px" src="../../static/cert/withdrawDoc.html" ' +
              'width="100%" frameborder="0"></iframe>')
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      show:function(){
        this.$refs.win.show({
          width:900,
          height:600
        })
        this.loadTableData()
      },
      print() {
        var frame = $("#iframe iframe")[0];
          frame.contentWindow.focus()
          frame.contentWindow.print();
      },
//      https://gist.github.com/tonyc726/00c829a54a40cf80409f 数字金额大写转换
      digitUppercase (n) {
        var fraction = ['角', '分'];
        var digit = [
          '零', '壹', '贰', '叁', '肆',
          '伍', '陆', '柒', '捌', '玖'
        ];
        var unit = [
          ['元', '万', '亿'],
          ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '欠' : '';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
          s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++) {
          var p = '';
          for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
          }
          s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元')
          .replace(/(零.)+/g, '零')
          .replace(/^整$/, '零元整');
      },
    }
  }
</script>
