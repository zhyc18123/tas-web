<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">众筹班级</div>
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
                <select2  v-model="query.periodId" :options="periods">
                  <option value="">学期</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.gradeId" :options="grades">
                  <option value="">年级</option>
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
                <input type="text" name="className" v-model="query.className" placeholder="请输入班级名称"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="teacherNames" v-model="query.teacherNames" placeholder="请输入教师姓名"/>
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
            <el-table
              :data="tableData"
              border
              stripe
              @selection-change="handleSelectionChange"
              style="min-width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                fixed
                prop="className"
                label="班级名称"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="teacherNames"
                label="教师"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="periodName"
                label="学期"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="上课日期"
                min-width="150">
                <template scope="scope">
                  {{scope.row.startCourseTime | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="studyingTime"
                label="上课时间"
                min-width="150">
              </el-table-column>
              <el-table-column
                label="学位数"
                min-width="100">
                <template scope="scope">
                  {{scope.row.discountType == 0 ? '-' : ( scope.row.quotaMin + ' - ' + scope.row.quotaMax ) }}
                </template>
              </el-table-column>
               <el-table-column
                label="优惠方式"
                min-width="100">
                <template scope="scope">
                  {{scope.row.discountType == 0 ? '-': (scope.row.discountType == 1 ? '连续优惠' : '分段优惠' ) }}
                </template>
              </el-table-column>           
              <el-table-column
                label="开班"
                min-width="100">
                <template scope="scope">
                  {{scope.row.status == 0 ? '否': ( scope.row.status == 1 ? '是' : ( scope.row.status == 2 ? '已作废' :'已结课') )}}
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                 <template scope="scope">
                      <el-dropdown v-if="scope.row.status != 2">
                        <span class="el-dropdown-link">
                          操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <template >
                            <el-dropdown-item  :classId="classId" @click.native="$router.push( '/main/sys/crowdfunding/edit/' + scope.row.classId)">众筹定价</el-dropdown-item> 
                          </template>
                          <template >
                            <el-dropdown-item  :disabled="scope.row.status != 0 "  @click.native="changeStatus(scope.row.classId,1)"> 开班
                            </el-dropdown-item>
                            <el-dropdown-item  :disabled="scope.row.status != 1"  @click.native="changeStatus(scope.row.classId,0)">  
                              取消开班
                            </el-dropdown-item>
                          </template>
                          </el-dropdown-menu>     
                      </el-dropdown>
                    </template>
            </el-table-column>         
            </el-table>
          </div>
          <div class="am-u-lg-12 am-cf">
            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                          @paging="loadTableData"/>
            </div>
          </div>

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
        tableData: [],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        query: {
          areaTeamId : '',
          busTeamId : '',
          productId : '',
        },
        searchConfig: {},
        products:[],
        courses:[],
        courseClass :{},
        selection:[]
      }
    },
    components: {
      Pagination,
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo)
      this.loadProductData()
      this.loadCourseData()
      var _this = this
      this.$root.$on('courseClass:new',function(){
        _this.pageNo = 1
        _this.loadTableData(_this.pageNo)
      })
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
        return this.$root.config.grades.map(function(item){
          return {value: item.gradeId, text: item.gradeName}
        })
      },
      subjects: function () {
        return this.$root.config.subjects.map(function(item){
          return {value: item.subjectId, text: item.subjectName}
        })
      },
      periods:function(){
        return this.$root.config.periods.map(function(item){
          return {value: item.periodId, text: item.periodName}
        })
      }

    },
    methods: {
      search: function () {
        this.loadTableData(1)
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCrowdfundingClassList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query), function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
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
     
      handleSelectionChange:function (selection) {
        this.selection = selection
      },
     changeStatus:function(classId , status ){
      var _this = this
      _this.$showLoading()
      io.post(io.apiAdminChangeCourseClassStatus, {
        status: status ,
        classIds : [classId].join(',')
      }, function (ret) {
        _this.$hiddenLoading()
        if (ret.success) {
          _this.loadTableData(_this.pageNo)
          _this.$alert('处理成功')
        } else {
          _this.$alert(ret.desc)
        }
      })
    },
    }
  }
</script>
