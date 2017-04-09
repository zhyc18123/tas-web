import moment from 'moment'

export default  {

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
