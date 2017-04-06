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
              <input type="text" class="am-form-field" placeholder="班级名"  v-model="query.className">
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
            <div class="am-form-group">
              <button type="button" class="am-btn am-btn-default am-btn-success"
                      @click="search"><span class="am-icon-search"></span>查询班级
              </button>
            </div>
          </div>

        </div>

        <div class="am-u-sm-12 am-scrollable-horizontal" v-if="tableData&&tableData.length>0">
          <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
            <thead>
            <tr>
              <th>班级名称</th>
              <th>开始讲数</th>
              <th>结束讲数</th>
              <th>年级</th>
              <th>剩余名额</th>
              <th>学位数</th>
              <th>教师</th>
              <th>以上/总讲数</th>
              <th>业务组</th>
              <th>开课日期</th>
              <th>上课时间</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="item in tableData" :key="item.classId">
              <td>{{item.className}}</td>
              <td><input type="number" class="am-form-field am-input-sm" v-model="item.startAmount" @change="check(item)"/></td>
              <td><input type="number" class="am-form-field am-input-sm" v-model="item.endAmount" @change="check(item)"/></td>
              <td>{{item.gradeName}}</td>
              <td>{{item.quota-item.regAmount}}</td>
              <td>{{item.quota}}</td>
              <td>{{item.teacherNames}}</td>
              <td>/{{item.lectureAmount}}</td>
              <td></td>
              <td>{{item.startCourseTime | formatDate }}</td>
              <td></td>
              <td>
                <div class="tpl-table-black-operation">
                  <a href="javascript:;" @click="confirm(item)">
                    <i class="am-icon-edit"></i> 确定
                  </a>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <!--<window ref="sure" title="转班第三步">
            <confirm-class  @sure="$refs.sure.close()"></confirm-class>
          </window>-->
        </div>
      </div>


      <div class="am-u-lg-12 am-cf">

        <div class="am-fr">
          <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData"/>
        </div>
      </div>

      <div class="am-u-sm-12 am-text-center am-margin-top-lg">
        <button type="submit" class="am-btn am-btn-primary" @click="back">上一步</button>
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
        courseOrderId: '',
      }
    },
    props:['args','regId'],
    components: {
      Pagination,
    },
    watch:{
      args:function () {
      }
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
      //this.loadTableData()
      this.loadProductData()
      this.loadCourseData()
    },
    methods: {
      check:function(item){
        if(item.startAmount <= 0 || item.startAmount > item.lectureAmount ){
          item.startAmount = 1
        }

        if( item.endAmount < 0 || item.endAmount > item.lectureAmount ){
          item.endAmount = item.lectureAmount
        }

      },
      search: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCourseClassList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
          status : 1
        }, _this.query), function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            for (var i = 0; i < ret.data.list.length; i++) {
              ret.data.list[i].startAmount = 1;
              ret.data.list[i].endAmount = ret.data.list[i].lectureAmount;
              ret.data.list[i].regId = _this.regId
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
      confirm: function (item) {
        this.$emit('goStep','step-three' , {item : item, formData : this.args.formData})
      },
      back: function () {
        var regId = this.args.regId
        var formData = this.args.formData

        this.$emit('goStep' ,'step-one',{regId2:regId})
      }
    }
  }


</script>
