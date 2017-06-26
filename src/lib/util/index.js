import moment from 'moment'

moment.locale('zh-cn')

console.log(1)

export default  {

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
    return parseFloat(val).toFixed(fixed)
  }


}
