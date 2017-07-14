<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">老师课表</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.areaTeamId" :options="areaTeams">
                </select2>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.busTeamId" :options="busTeams">
                  <option value="">业务组</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.subjectId" :options="subjects">
                  <option value="">科目</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.periodId" :options="periods">
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.scheduleTemplate">
                  <option value="">课表模板</option>
                  <option value="0">广州誉优高中</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search"><span class="am-icon-search"></span>查询

                </button>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" v-if="courseClassList.length > 0">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success " @click="download">
                  <span class="am-icon-download"></span>下载课表
                </button>
              </div>
            </div>
          </div>

          <div class="am-u-sm-12 am-scrollable-horizontal" v-if="courseClassList.length > 0">

            <table class="am-table am-table-bordered am-table-radius am-table-compact am-text-nowrap">

              <thead>
              <tr>
                <th rowspan="2">老师</th>
                <th rowspan="2">属性</th>
                <th rowspan="2">时间</th>
                <th :colspan="period.segments == 1 ? weeks.length : period.segments">{{period.periodName}}</th>
              </tr>
              <template v-if="period.segments == 1 ">
                <tr>
                  <th v-for="item in weeks">{{item}}</th>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <th v-for="seg in period.segments">第{{seg}}段</th>
                </tr>
              </template>

              </thead>
              <tbody>
              <template v-for="teacher in teacherList">
                <tr v-for="(time,n) in scheduleTemplate.times">
                  <template v-if="n == 0">
                    <td :rowspan="scheduleTemplate.times.length"> {{teacher.teacherName}} </td>
                    <td :rowspan="scheduleTemplate.times.length"> {{{
                      '0'
                    :
                      '专职', '1'
                    :
                      '兼职'
                    }
                    [teacher.jobNature] || '-'}}
                  </td>
                  </template>

                  <td class="time-item-wrapper">
                    <div class="time-item">{{time}}</div>
                  </td>
                  <template v-if="period.segments == 1">
                    <td v-for="item in weeks" :id="teacher.teacherId +'_' + time + '_' + item" :data-col="item"
                        class="class-item-wrapper"></td>
                  </template>
                  <template v-else>
                    <td v-for="seg in (period.segments)" :id="teacher.teacherId +'_' + time + '_' + seg "
                        :data-col="seg" class="class-item-wrapper"></td>
                  </template>
                </tr>

              </template>


              </tbody>
            </table>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  window.jQuery = $
  import io from '../../lib/io'
  import util from '../../lib/util'
  import touch from '../../lib/touch-dnd'

  var scheduleTemplates = [{
    times: ['08:30-10:20', '10:40-12:30', '14:00-15:50', '16:10-18:00']
  }]

  export default{
    data: function () {
      var currentPeriod = window.config.periods.filter(item => item.isCurrent == 1)[0]
      return {
        query: {
          areaTeamId: window.config.areaTeams[0] ? window.config.areaTeams[0].areaTeamId : '',
          busTeamId: '',
          periodId: currentPeriod.periodId,
          scheduleTemplate: 0
        },
        weeks: [],
        teacherList: [],
        courseClassList: [],
        courseClassMap: {},
        modifyCourseClassMap: {},
        scheduleTemplate: scheduleTemplates[0],
        period: {}
      }
    },
    watch: {
      courseClassList: function (val) {
        this.courseClassMap = {}
        this.modifyCourseClassMap = {}
        val.forEach(item => this.courseClassMap[item.classId] = item)
      }
    },
    created: function () {
      this.loadScheduleData()
    },
    mounted: function () {
      //this.loadCourseClassWithTeacher()
      var _this = this
      $(document.body).on('click', '.am-icon-edit', function () {
        var $itemClass = $(this).parents('.class-item')
        var classId = $itemClass.data('classid')
        var courseClass = _this.courseClassMap[classId];
        _this.$prompt('修改班名', courseClass.className, function (input) {
          if (input != courseClass.className) {
            $itemClass.addClass('class-item-modify').find('.class-item-title').text(input + '#' + courseClass.regAmount)
            courseClass.className = input
            _this.saveChange({ classId : classId ,className : input })
          }
        })
      })

    },
    computed: {
      areaTeams: function () {
        var options = ( window.config.areaTeams || [] )
          .map(function (item) {
            return {value: item.areaTeamId, text: item.name}
          })
        return options
      },
      busTeams: function () {
        var options = ( ( this.query.areaTeamId  ) ? ( window.config.groupBusTeams[this.query.areaTeamId] || [] ) : [] )
          .map(function (item) {
            return {value: item.busTeamId, text: item.name}
          })
        this.query.busTeamId = ''
        return options
      },
      subjects: function () {
        return window.config.subjects.map(function (item) {
          return {value: item.subjectId, text: item.subjectName}
        })
      },
      periods: function () {
        return window.config.periods.map(function (item) {
          return {value: item.periodId, text: item.periodName}
        })
      }
    },
    methods: {
      search: function () {
        this.loadScheduleData()
      },
      loadScheduleData: function () {
        var _this = this
        _this.$showLoading()
        io.post(io.apiAdminScheduleScheduleDataOfTeacher, this.query,
          function (ret) {
            if (ret.success) {

              _this.scheduleTemplate = scheduleTemplates[_this.query.scheduleTemplate]

              var times = new Set();
              for (var cc of ret.data.courseClassList) {
                if (cc.studyingTime) {
                  cc.studyingTime.split(' ').forEach(item => times.add(item))
                }
              }

              _this.scheduleTemplate.times.forEach(item => times.add(item))
              _this.scheduleTemplate.times = Array.from(times).sort()

              //有未时间、未排老师课程，增加一个虚拟老师
              if (ret.data.courseClassList.filter(item => !item.teacherIds || !item.studyingTime).length > 0) {
                ret.data.teacherList.unshift({
                  teacherId: '-',
                  teacherName: '-',
                  jobNature: '-'
                })
              }

              _this.weeks = Array.from(new Set(ret.data.courseClassList.filter(item => item.startCourseTime).map(function (item) {
                item.week = util.formatDate(item.startCourseTime, 'dddd');
                return item.week;
              }))).sort()

              _this.period = window.config.periods.filter(item => item.periodId == _this.query.periodId)[0];
              _this.period.segments = parseInt(_this.period.segments)
              _this.teacherList = ret.data.teacherList
              _this.courseClassList = ret.data.courseClassList

              //清空
              $('.class-item-wrapper').empty()


              _this.$nextTick(function () {
                for (var cc of ret.data.courseClassList) {
                  var teacherId = (cc.teacherIds || '-').split(',')
                  var studyingTime = (cc.studyingTime || '-').split(' ')
                  var col = _this.period.segments == 1 ? ( cc.week || '-') : cc.segmentNo
                  var td = document.getElementById(teacherId + '_' + studyingTime + '_' + col)
                  $(td).append('<div data-classid="' + cc.classId + '" data-col="' + col + '" class="class-item class-item-bg-' + (cc.classId % 3 ) + '">'+(cc.progressStatus == 0 ? '<i class="am-icon-circle"></i>' :'')+'<span class="class-item-title">' + cc.className + '#' + cc.regAmount + '</span>'+(cc.progressStatus == 0 ? '<i class="am-icon-edit"></i>' :'')+'</div>')

                }
                _this.$hiddenLoading()
                _this.initTouchDnd()
              })
            }
          },
          function () {
            _this.$hiddenLoading()
            _this.$alert('请求服务器失败')
          })
      },
      initTouchDnd: function () {

        var _this = this
        $('.class-item').draggable({
          handle: '.am-icon-circle'
        })
        $('.class-item-wrapper').droppable({
          hoverClass: 'hover',
          accept: function (el) {
            var col = el.data('col')
            return col == $(this).data('col')
          },
          receiveHandler: function (ui) {

            var $this = $(this)
            var id = $this.attr('id').split('_')
            var teacherId = id[0];
            var time = id[1];
            var col = id[2];
            var $classItem = ui.item
            var classId = $classItem.data('classid')

            var courseClass = _this.courseClassMap[classId]

            if (teacherId == '-' && courseClass.teacherIds) {
              return
            }

            var modifyInfo = {classId : classId }


            //判断老师是否变更
            if ((!courseClass.teacherIds && teacherId != '-') || ( courseClass.teacherIds && courseClass.teacherIds.indexOf(teacherId) == -1)) {
              modifyInfo.teacherId = teacherId
              courseClass.teacherIds = teacherId

            }
            //判断上课时间是否变更
            if (courseClass.studyingTime.indexOf(time) == -1) {
              modifyInfo.studyingTime = time
              courseClass.studyingTime = time
            }
            $classItem.addClass('class-item-modify')
            $classItem.appendTo($this)
            _this.saveChange(modifyInfo)
          }
        })
      },
      saveChange:function(modifyInfo){
        var _this  = this
        io.post(io.apiAdminScheduleSaveChange, modifyInfo, function (ret) {
          if (ret.success) {
            _this.$toast('OK')
          } else {
            _this.$alert(ret.desc)
          }
        })

      },
      download:function(){
        io.downloadFile(io.apiAdminHtml2excel,{
          html:$('<div>').append($('table').clone()).html(),
          downloadName:'老师课表'
        })
      }
    }
  }
</script>

<style>

  .am-table > thead > tr > th {
    border-bottom-width: 0px;
    text-align: center;
    vertical-align: middle;
    font-size: 12px;
  }

  .am-table > tbody > tr > td {
    text-align: center;
    vertical-align: middle;
    font-size: 12px;
  }

  td.time-item-wrapper {
    border-left: 1px solid #ddd !important;

  }

  .class-item-wrapper {
    padding: 0px 0px 4px 0 !important;
    clear: both;

  }

  .class-item {
    position: relative;
    width: 200px;
    float: left;
    margin-left: 4px;
    text-align: left;
    margin-top: 4px;

  }



  .class-item .am-icon-edit {
    position: absolute;
    right: 2px;

  }

  .class-item .am-icon-circle{
    cursor: move;
  }

  .class-item-bg-0 {
    background-color: #ffc;
  }

  .class-item-bg-1 {
    background-color: #cfc;;
  }

  .class-item-bg-2 {
    background-color: #ccf;
  }

  .hover {
    background-color: lightgrey;
  }


</style>
