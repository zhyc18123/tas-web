<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">校区课表</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.campusId" >
                  <!--<option value="">校区</option>-->
                  <option v-for="item in campuses" :value="item.campusId">{{item.campusName}}</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.periodId" :options="periods">
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
              <div class="am-form-group am-btn-group-xs">
                <button type="button" class="am-btn am-btn-default am-btn-success " @click="download">
                  <span class="am-icon-download"></span>下载课表
                </button>
              </div>
            </div>
          </div>

          <div class="am-u-sm-12 am-scrollable-horizontal" v-if="courseClassList.length > 0">

            <table id="schedule" class="am-table am-table-bordered am-table-radius am-table-compact am-text-nowrap">

              <thead>

              <template v-if="period.segments == 1 ">
                <tr><th :colspan="3+times.length"> {{campus.campusName}}({{period.periodName}})</th></tr>
                <tr>
                  <th>年级</th>
                  <th>层次</th>
                  <th>时间</th>
                  <th v-for="time in times">{{time}}</th>
                </tr>
              </template>
              <template v-else>
                <tr><th :colspan="2+times.length"> {{campus.campusName}}({{period.periodName}})</th></tr>
                <tr>
                  <th>年级</th>
                  <th>日期</th>
                  <th v-for="time in times">{{time}}</th>
                </tr>
              </template>
              </thead>
              <tbody>
              <template v-if="period.segments == 1 ">
                <template v-for="(grade ,gn ) in grades">
                  <template v-for="(level,ln) in levels">
                    <template v-for="(week , wn) in weeks">

                      <tr>
                        <td v-if="wn == 0 && ln == 0" :rowspan="levels.length * weeks.length ">{{grade}}</td>
                        <td class="left-border" v-if="wn == 0" :rowspan="weeks.length ">{{level}}</td>
                        <td class="left-border">{{week}}</td>
                        <td v-for="time in times" :id="grade+'_'+level+'_'+week+'_'+time"  class="class-item-wrapper"></td>
                      </tr>

                    </template>

                  </template>

                </template>


              </template>
              <template v-else>

                <template v-for="(grade ,gn ) in grades">
                  <template v-for="(segment,sn) in segmentList">

                    <tr>
                      <td v-if="sn == 0" :rowspan="segmentList.length ">{{grade}}</td>
                      <td class="left-border">第{{segment.segmentNo}}段:{{segment.startDate | formatDate('MM.DD')}}~{{segment.endDate | formatDate('MM.DD')}}</td>
                      <td v-for="time in times" :id="grade+'_'+segment.segmentNo+'_'+time" class="class-item-wrapper"></td>
                    </tr>


                  </template>

                </template>

              </template>

              <tr>
                <td>备注</td>
                <td :colspan="period.segments == 1?times.length + 2 :times.length + 1">#后面的数字是报名人数</td>
              </tr>


              </tbody>
            </table>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import io from '../../lib/io'
  import util from '../../lib/util'

  export default{
    data: function () {
      var currentPeriod = window.config.periods.filter(item => item.isCurrent == 1)[0]
      return {
        query: {
          campusId: '',
          periodId: currentPeriod.periodId
        },
        segmentList: [],
        courseClassList: [],
        campuses:[],
        period: {},
        campus: {},
        times:[],
        weeks:[],
        levels:[],
        grades:[]

      }
    },
    created:function(){
      this.loadCampusData()
      if(this.query.campusId){
          this.loadScheduleData()
      }
    },
    mounted: function () {

    },
    computed: {
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
      loadCampusData:function(){
        var _this = this
        io.post(io.apiAdminBaseCampusList, {},
          function (ret) {
            if (ret.success) {

              if(!_this.query.campusId){
                _this.query.campusId = ret.data[0] ? ret.data[0].campusId : ''
              }
              _this.campuses = ret.data

            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })
      },
      loadScheduleData: function () {
        var _this = this
        _this.$showLoading()
        io.post(io.apiAdminSchedulescheduleDataOfCampus, this.query,
          function (ret) {
            if (ret.success) {
              _this.period = window.config.periods.filter(item => item.periodId == _this.query.periodId)[0];
              _this.period.segments = parseInt(_this.period.segments)

              _this.campus = _this.campuses.filter(item => item.campusId == _this.query.campusId)[0]

              _this.segmentList = ret.data.segmentList
              _this.courseClassList = ret.data.courseClassList

              var times = new Set();
              for (var cc of ret.data.courseClassList) {
                if (cc.studyingTime) {
                  cc.studyingTime.split(' ').forEach(item => times.add(item))
                }
              }
              _this.times = Array.from(times).sort()

              _this.weeks = Array.from(new Set(ret.data.courseClassList.filter(item => item.startCourseTime).map(function (item) {
                item.week = util.formatDate(item.startCourseTime, 'dddd');
                return item.week;
              }))).sort()

              _this.levels = Array.from(new Set(ret.data.courseClassList.map(item => item.level))).sort()
              _this.grades = Array.from(new Set(ret.data.courseClassList.map(item => item.gradeName))).sort()

              //清空
              $('.class-item-wrapper').empty()

              _this.$nextTick(function(){
                for (var cc of ret.data.courseClassList) {

                  var id
                  if(_this.period.segments == 1 ){
                    id = cc.gradeName +'_'+cc.level+'_'+cc.week+'_'+cc.studyingTime.split(' ')[0]
                  }else{
                    id = cc.gradeName +'_'+cc.segmentNo+'_'+cc.studyingTime.split(' ')[0]
                  }

                  var td = document.getElementById(id)
                  $(td).append('<div data-classid="' + cc.classId + '" class="class-item class-item-bg-' + (cc.classId % 3 ) + '"><span class="class-item-title">' + cc.className + '#' + cc.regAmount + '</span></div>')

                }
                _this.$hiddenLoading()
              })

            }
          },
          function () {
            _this.$hiddenLoading()
            _this.$alert('请求服务器失败')
          })
      },
      download:function(){
        var _this = this
        io.downloadFile(io.apiAdminHtml2excel,{
          html:$('<div>').append($('#schedule').clone()).html(),
          downloadName:   '校区课表-'+_this.campus.campusName
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

  td.left-border {
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

  .class-item-bg-0 {
    background-color: #ffc;
  }

  .class-item-bg-1 {
    background-color: #cfc;;
  }

  .class-item-bg-2 {
    background-color: #ccf;
  }



</style>
