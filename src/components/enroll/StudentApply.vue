<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">

      <div class="widget-body  am-fr">
        <div class="am-u-sm-12 am-form ">
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2 v-model="query.areaTeamId" :options="areaTeams">
                <option value="">区域组</option>
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
              <select2 v-model="query.productId" :options="products">
                <option value="">产品</option>
              </select2>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2 v-model="query.courseTemplateId" :options="courses">
                <option value="">课程</option>
              </select2>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2 v-model="query.periodId" :options="periods">
                <option value="">期数</option>
              </select2>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <select2 v-model="query.gradeId" :options="grades">
                <option value="">年级</option>
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
              <button type="button" class="am-btn am-btn-default am-btn-success"
                      @click="search"><span class="am-icon-search"></span>查询
              </button>
            </div>
          </div>

        </div>

        <div class="am-u-sm-12 am-scrollable-horizontal">
          <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
            <thead>
            <tr>
              <th>班级名称</th>
              <th>开始讲数</th>
              <th>结束讲数</th>
              <th>讲数</th>
              <th>期数</th>
              <th>年级</th>
              <th>学费</th>
              <th>已报/学位数</th>
              <th>老师</th>
              <th>教室</th>
              <th>开课日期</th>
              <th>上课时间</th>
              <th>校区</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="item in tableData" :key="item.classId">
              <td>{{item.className}}</td>
              <td><input type="text" v-model="item.startAmount"/></td>
              <td><input type="text" v-model="item.endAmount"/></td>
              <td>{{item.lectureAmount}}</td>
              <td>{{item.periodName}}</td>
              <td>{{item.gradeName}}</td>
              <td>{{item.studyingFee}}</td>
              <td>0/{{item.lectureAmount}}</td>
              <td>{{item.teacherNames}}</td>
              <td>{{item.roomName}}</td>
              <td>{{item.startCourseTime | formatDate }}</td>
              <td>{{0}}-{{0}}</td>
              <td>{{item.campusName}}</td>
              <td>
                <div class="tpl-table-black-operation">
                  <a href="javascript:;" @click="studentReg(item)">
                    <i class="am-icon-edit"></i> 报名
                  </a>
                  <a href="javascript:;"  @click="pay(item.classId)">
                    <i class="am-icon-edit"></i> 缴费
                  </a>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>


      <div class="am-u-lg-12 am-cf">

        <div class="am-fr">
          <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData"/>
        </div>
      </div>

    </div>



  </div>

</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'


  export default{
    data: function () {
      return {
        studentId: '',
        tableData: [],
        tableJson: [],
        total: 0,
        pageSize: 5,
        pageNo: 1,
        query: {
          areaTeamId: '',
          busTeamId: '',
          productId: '',

        },
        products: [],
        courses: [],
        searchConfig: {},
      }
    },
    components: {
      Pagination
    },
    computed: {

      areaTeams: function () {
        var options = ( this.$root.config.areaTeams || [] )
          .map(function (item) {
            return {value: item.areaTeamId, text: item.name}
          })
        return options
      },
      busTeams: function () {
        var options = ( ( this.query.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.query.areaTeamId] || [] ) : [] )
          .map(function (item) {
            return {value: item.busTeamId, text: item.name}
          })
        this.query.busTeamId = ''
        return options
      },
      grades: function () {
        return this.$root.config.grades.map(function (item) {
          return {value: item.gradeId, text: item.gradeName}
        })
      },
      subjects: function () {
        return this.$root.config.subjects.map(function (item) {
          return {value: item.subjectId, text: item.subjectName}
        })
      },
      periods: function () {
        return this.$root.config.periods.map(function (item) {
          return {value: item.periodId, text: item.periodNo}
        })
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo);
    },
    methods: {
      search: function () {
        this.query = {}
        if (!this.searchConfig.searchItem) {
          this.$alert('--请选择--搜索选项')
          return
        }
        this.query[this.searchConfig.searchItem] = this.searchConfig.searchValue
        this.loadTableData()
      },
      created: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCourseClassList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query), function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            for(var i = 0 ; i < ret.data.list.length ; i++ ){
              ret.data.list[i].startAmount = 1 ;
              ret.data.list[i].endAmount = ret.data.list[i].lectureAmount ;

            }
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadProductData: function () {
        var _this = this
        io.post(io.apiAdminBaseProductList, {}, function (ret) {
          if (ret.success) {
            _this.products = ret.data.map(function (item) {
              return {value: item.productId, text: item.name}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadCourseData: function () {
        var _this = this
        io.post(io.apiAdminBaseCourseList, {}, function (ret) {
          if (ret.success) {
            _this.courses = ret.data.map(function (item) {
              return {value: item.courseTemplateId, text: item.courseName}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      studentReg: function (classInfo) {
        var isHad = false ;
        for( var i = 0 ; i < this.$root.courseShoppingCart.length ;i++){
          if(this.$root.courseShoppingCart[i].classId == classInfo.classId ){
            isHad = true
            this.$alert('已报名，请查看代缴费页')
            break
          }
        }

        if(!isHad){
          this.$root.courseShoppingCart.push(classInfo)
        }



      },
      pay:function (classId) {
        var studentId = this.$params('studentId')
        var _this = this
      }
    }
  }


</script>
