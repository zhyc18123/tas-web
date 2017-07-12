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
                <select2  v-model="query.areaTeamId" :options="areaTeams">
                  <option value="">区域</option>
                </select2>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.busTeamId" :options="busTeams">
                  <option value="">业务组</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.subjectId" :options="subjects">
                  <option value="">科目</option>
                </select2>
              </div>
            </div>



            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 required  v-model="query.scheduleTemplate"  >
                  <option value="">课表模板</option>
                  <option value="gz_yuyougaozhong">广州誉优高中</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.periodId" :options="periods">
                </select2>
              </div>
            </div>


            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
              </div>
            </div>


          </div>

          <div class="am-u-sm-12">

            <table class="am-table am-table-bordered am-table-radius am-table-compact">
              <thead>
              <tr>
                <th rowspan="2">老师</th>
                <th rowspan="2">属性</th>
                <th rowspan="2">时间</th>
                <th colspan="4">期数</th>
              </tr>
              <tr>
                <th>第一段</th>
                <th>第二段</th>
                <th>第三段</th>
                <th>第四段</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td rowspan="4"> 张礼羊 </td>
                <td rowspan="4"> 专职 </td>
                <td class="time-item-wrapper"> <div class="time-item">08:30-10:20</div>  </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-0">市二宫高三尖子班2</div> </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-1">市二宫高三尖子班2</div> </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-2">市二宫高三尖子班2</div> </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-0">市二宫高三尖子班2</div> </td>
              </tr>
              <tr>
                <td class="time-item-wrapper"> <div class="time-item">08:30-10:20</div>  </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-0">市二宫高三尖子班2</div> </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-1">市二宫高三尖子班2</div> </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-2">市二宫高三尖子班2</div> </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-0">市二宫高三尖子班2</div> </td>
              </tr>
              <tr>
                <td class="time-item-wrapper"> <div class="time-item">08:30-10:20</div>  </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-0">市二宫高三尖子班2</div> </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-1">市二宫高三尖子班2</div> </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-2">市二宫高三尖子班2</div> </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-0">市二宫高三尖子班2</div> </td>
              </tr>
              <tr>
                <td class="time-item-wrapper"> <div class="time-item">08:30-10:20</div>  </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-0">市二宫高三尖子班2</div> </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-1">市二宫高三尖子班2</div> </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-2">市二宫高三尖子班2</div> </td>
                <td class="class-item-wrapper"> <div class="class-item class-item-bg-0">市二宫高三尖子班2</div> </td>
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
  window.jQuery = $
  import io from '../../lib/io'
  import touch from '../../lib/touch-dnd'

  export default{
    data: function () {
      return {
        query: {
          areaTeamId : '',
          busTeamId : '',
          periodId : '',
          scheduleTemplate:'gz_yuyougaozhong'
        }
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      var currentPeriod  = window.config.periods.filter( item => item.isCurrent == 1 )
      if(currentPeriod && currentPeriod.length ){
        this.query.periodId = currentPeriod[0].periodId
      }

    },
    mounted:function () {
      $('.class-item').draggable()
      $('.class-item-wrapper').droppable({
        hoverClass:'hover',
        receiveHandler: function(ui) {
          $('.class-item',this).appendTo(ui.item.parent())
          ui.item.appendTo(this)
        }
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
        return window.config.subjects.map(function(item){
          return {value: item.subjectId, text: item.subjectName}
        })
      },
      periods:function(){
        return window.config.periods.map(function(item){
          return {value: item.periodId, text: item.periodName}
        })
      }
    },
    methods: {
      search: function () {

      },
      loadCourseClassWithTeacher:function(){
        io.post(io.apiAdminCourseClassDetail, {courseClassId: courseClassId},
          function (ret) {
            if (ret.success) {

            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })
      }
    }
  }
</script>

<style>
  .am-table > thead > tr > th{
    border-bottom-width: 0px ;
    text-align: center;
    vertical-align: middle;
  }

  .am-table > tbody > tr > td{
    text-align: center;
    vertical-align: middle;
  }

  td.time-item-wrapper{
    border-left: 1px solid #ddd !important;
  }

  .class-item-bg-0 {
    background-color: #ffc ;
  }

  .class-item-bg-1 {
    background-color: #cfc; ;
  }

  .class-item-bg-2 {
    background-color: #ccf ;
  }

  .hover {
    background-color: lightgrey;
  }


</style>
