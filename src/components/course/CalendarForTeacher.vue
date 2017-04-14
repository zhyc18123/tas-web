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
    props:['teacherId'],
    mounted:function(){
      $('#'+ this.id ).fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        editable: false,
        events: io.apiAdminTeacherClassTimeList +"?accessToken="+io.getHeaders().accessToken+"&teacherId="+this.teacherId,
        eventRender:function(event, element){
          element.text($.fullCalendar.formatDate(event.start, "HH:mm-")+$.fullCalendar.formatDate(event.end, "HH:mm")
          )
        }
      })
    }
  }
</script>
