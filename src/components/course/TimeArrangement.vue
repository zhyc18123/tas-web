<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
        <div class="am-form-group ">

          <div class="am-u-sm-3 input-field">
            <date-picker v-model="startDate">
              <input type="text" class="am-input-lg" placeholder="请选择首次上课时间" data-am-datepicker required>
            </date-picker>
          </div>

          <div class="am-u-sm-3 input-field am-u-end">
            <select v-model="arrangeWay">
              <option value="arrangeByWeek">按周排</option>
              <option value="arrangeByDay">按天排</option>
            </select>
          </div>

        </div>

        <hr/>

        <div class="am-form-group am-g-collapse" v-if="arrangeWay=='arrangeByWeek'" v-for="(day, dayIndex ) in weekDays">

          <div class="am-u-sm-1 input-field am-margin-top-xs">
            <label><input :id="day.id" :value="true" type="checkbox" v-model="weekDays[dayIndex].selected"/>{{day.name}}</label>
          </div>
          <template v-for="(time , timeIndex) in day.times">
            <div class="am-u-sm-1 input-field">
              &nbsp;
            </div>
            <div class="am-u-sm-2 input-field">
              <time-picker v-model="weekDays[dayIndex].times[timeIndex]"></time-picker>
            </div>
          </template>
          <div class="am-u-sm-1 am-margin-top-xs am-u-end">
            <a href="javascript:;" @click="addTime(day)"> <i class="am-icon-plus"></i></a>
            <a href="javascript:;" @click="removeTime(day)"><i class="am-icon-remove"></i></a>
          </div>


        </div>
        <div class="am-form-group am-g-collapse" v-if="arrangeWay=='arrangeByDay'">

          <div class="am-u-sm-1 input-field am-margin-top-xs">
            {{everyday.name}}
          </div>
          <template v-for="(time , timeIndex) in everyday.times">
            <div class="am-u-sm-1 input-field">
              &nbsp;
            </div>
            <div class="am-u-sm-2 input-field">
              <time-picker v-model="everyday.times[timeIndex]"></time-picker>
            </div>
          </template>
          <div class="am-u-sm-1 am-margin-top-xs am-u-end">
            <a href="javascript:;" @click="addTime(everyday)"> <i class="am-icon-plus"></i></a>
            <a href="javascript:;" @click="removeTime(everyday)"><i class="am-icon-remove"></i></a>
          </div>


        </div>
        <div class="am-form-group am-g-collapse">
          <input type="text" placeholder="规避节日：选填,填入数据须用空格隔开 如：2014-05-01 2014-10-01" v-model="excludeDays"/>
        </div>
        <div class="am-form-group">
          <div class="am-u-sm-3 am-u-sm-centered">
            <button type="button" class="am-btn am-btn-primary" @click="arrangeTime">预览</button>
          </div>
        </div>

        <div class="am-form-group" v-if="arrangeResult.length > 0 ">
          <div class="am-u-sm-12 am-scrollable-horizontal">
            <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
              <thead>
              <tr>
                <th>讲数</th>
                <th>上课日期</th>
                <th>上课时间</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="( item,index ) in arrangeResult">
                <td>第{{index + 1 }}讲</td>
                <td>{{item.date}}</td>
                <td>{{item.time}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="am-form-group" v-if="arrangeResult.length > 0 ">
          <div class="am-u-sm-3 am-u-sm-centered">
            <button type="button" class="am-btn am-btn-primary" @click="save">保存</button>
          </div>
        </div>

      </form>
    </div>
  </div>

</template>

<script>
  import io from '../../lib/io'
  import util from '../../lib/util'
  import TimePicker from "../base/TimePicker"
  import moment from 'moment'
  export default{
    components: {TimePicker},
    data(){
      return {
        query: {},
        excludeDays: '',
        startDate: '',
        arrangeWay: 'arrangeByWeek',
        weekDays: [],
        everyday:{ },
        arrangeResult: []
      }
    },
    props: ['courseClass','classId', 'lectureAmount'],
    watch: {
      startDate: function (val) {
        if (this.arrangeWay == 'arrangeByWeek' && val) {
          $('#' + moment(val, "YYYY-MM-DD").format('dddd')).click()
        }
      },
      'courseClass.classId' : function(){
        this.init()
      }
    },
    created:function(){
       moment.locale('cn')
       this.init()
    },
    methods: {
      init:function(){
        this.weekDays = [
          {id: '星期一', selected: false, name: '星期一', times: ['08:00-10:00']},
          {id: '星期二', selected: false, name: '星期二', times: ['08:00-10:00']},
          {id: '星期三', selected: false, name: '星期三', times: ['08:00-10:00']},
          {id: '星期四', selected: false, name: '星期四', times: ['08:00-10:00']},
          {id: '星期五', selected: false, name: '星期五', times: ['08:00-10:00']},
          {id: '星期六', selected: false, name: '星期六', times: ['08:00-10:00']},
          {id: '星期日', selected: false, name: '星期日', times: ['08:00-10:00']},
        ]
        this.everyday = { name: '每天', times: ['08:00-10:00']}
        this.arrangeResult= []
        this.excludeDays =  ''
        this.startDate = ''
      },
      addTime: function (day) {
        if (day.times.length > 2) {
          return
        }
        day.times.push('08:00-10:00')
      },
      removeTime: function (day) {
        if (day.times.length > 1) {
          day.times.pop()
        }
      },
      arrangeTime: function () {
        if(!this.startDate){
          this.$alert('请选择首次上课时间')
          return
        }

        this.arrangeResult = []



        if (this.arrangeWay == 'arrangeByWeek') {


          var startDateWeek = moment(this.startDate, "YYYY-MM-DD").format('dddd') ;
          if( !$('#' + startDateWeek).prop('checked')){
              this.$alert('请选上' + startDateWeek )
          }


          var selectedDays = []
          for (var i = 0; i < this.weekDays.length; i++) {
            if (this.weekDays[i].selected) {
              selectedDays.push({
                times: this.weekDays[i].times
              })
            }
          }



          if(selectedDays.length == 0 ){
            this.$alert('至少选择一天')
            return
          }
          (function () {
            var start = moment(this.startDate, "YYYY-MM-DD")
            for (var i = 0; ; i++) {
              for (var ii = 0; ii < selectedDays.length; ii++) {
                var currentDay = moment(start).add( i * 7 +  ii , 'days')
                var date = currentDay.format("YYYY-MM-DD")
                if(this.inExcludeDay(date)){
                    continue
                }
                for (var iii = 0; iii < selectedDays[ii].times.length; iii++) {
                  var times  = selectedDays[ii].times[iii].split('-')
                  if(times[0] >= times[1]){
                    this.$alert('错误时间段：' + selectedDays[ii].times[iii] )
                    return
                  }
                  this.arrangeResult.push({
                    date : date ,
                    time : selectedDays[ii].times[iii]
                  })
                  if (this.arrangeResult.length >= this.courseClass.lectureAmount) {
                    return
                  }
                }
              }
            }
          }).bind(this).call()

        }else if(this.arrangeWay == 'arrangeByDay'){

          (function () {
            var start = moment(this.startDate, "YYYY-MM-DD")
            for (var i = 0; ; i++) {
              var currentDay = moment(start).add( i , 'days')
              var date = currentDay.format("YYYY-MM-DD")
              if(this.inExcludeDay(date)){
                continue
              }
              for (var ii = 0; ii < this.everyday.times.length; ii++) {
                var times  = this.everyday.times[ii].split('-')
                if(times[0] >= times[1]){
                  this.$alert('错误时间段：' + this.everyday.times[ii] )
                  return
                }
                this.arrangeResult.push({
                  date : date ,
                  time : this.everyday.times[ii]
                })
                if (this.arrangeResult.length == this.courseClass.lectureAmount) {
                  return
                }
              }
            }
          }).bind(this).call()
        }

      },
      inExcludeDay: function (d) {
        var days = this.excludeDays.split(/\s/)
        for (var i = 0; i < days.length; i++) {
          if(d == days[i]){
            return true
          }
        }
        return false
      },
      save:function(){
          var _this  = this
          io.post(io.apiAdminSaveArrangeClassTimeResult,{
            classId : this.courseClass.classId ,
            resultJsonStr : JSON.stringify(this.arrangeResult)
          },function(ret){
              if(ret.success){
                  _this.$emit('arrangementSuccess')
              }else{
                  _this.$alert(ret.desc ||  '处理失败')
              }
          })
      }

    }
  }
</script>
