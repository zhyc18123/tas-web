import moment from 'moment'

export default  {

  formatTime : function (time) {
    if (!time) return "";
    if (typeof time == "string") {
      time = parseInt(time, 10);
    }
    return moment(time).format('YYYY-MM-DD H:mm:ss')
  },
  formatDate:function (time) {
    if (!time) return "";
    if (typeof time == "string") {
      time = parseInt(time, 10);
    }
    return moment(time).format('YYYY-MM-DD')
  }


}
