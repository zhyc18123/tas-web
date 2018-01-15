import moment from 'moment'

moment.locale('zh-cn')


export default  {

  install:function(Vue){
    Vue.filter('formatNumber' ,this.formatNumber )
  },

  getQueryString : function (name){
    var r = window.location.search.substr(1).match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"));
    if(r) {
      return r[2];
    }
    return null;
  },
  formatTime : function (time , format ) {
    if (!time) return "";
    if (typeof time == "string") {
      time = parseInt(time, 10);
    }
    return moment(time).format(format || 'YYYY-MM-DD H:mm:ss')
  },
  formatDate:function (time , format ) {
    if (!time) return "";
    if (typeof time == "string") {
      time = parseInt(time, 10);
    }
    return moment(time).format(format || 'YYYY-MM-DD')
  },
  firstDayOfMonth:function(){
    return moment().startOf('month');
  },
  endDayOfMonth:function(){
    return moment().endOf('month')
  },

  formatNumber:function(val , fixed){
    if (val === Infinity || isNaN(parseFloat(val))) {
      return 0.00
    } else {
      return parseFloat(val).toFixed(fixed)
    }
  },
  initReEdit:function(){
    setTimeout(function(){
      //重新编辑公式
      $($(document).find('iframe').contents().find('body.view')).on('click','.kfformula',function(){
        let viewArr=$(document).find('iframe').contents().find('body.view');
        for(var i=0;i<viewArr.length;i++){
          if(viewArr[i]===$(this).closest('body.view')[0]){
            $($('.edui-for-插入kityformula')[i]).find('.edui-default').click();
          }
        }
      });
      //重新编辑latex
      $($(document).find('iframe').contents().find('body.view')).on('click','.latex',function(){
        let viewArr=$(document).find('iframe').contents().find('body.view');
        for(var i=0;i<viewArr.length;i++){
          if(viewArr[i]===$(this).closest('body.view')[0]){
            $($('.edui-for-解析latex')[i]).find('.edui-default').click();
          }
        }
      });

    },1000)
  },


}
