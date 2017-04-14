<template>
  <div :id="id"></div>
</template>

<script>
  import io from '../../lib/io'

  require('fullcalendar/dist/fullcalendar.css')
  require('fullcalendar')
  require('fullcalendar/dist/locale/zh-cn.js')

  export default{
    data:function(){
      return {}
    },
    props:['roomId'],
    mounted:function(){
      $('#'+ this.id ).fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        editable: false,
        events: io.apiAdminRoomTimeList +"?accessToken="+io.getHeaders().accessToken+"&roomId="+this.roomId,
        eventRender:function(event, element){
          element.text($.fullCalendar.formatDate(event.start, "HH:mm-")+$.fullCalendar.formatDate(event.end, "HH:mm")
          )
        }
      })
    }
  }
</script>
