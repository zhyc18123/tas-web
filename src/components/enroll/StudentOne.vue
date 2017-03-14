<style>
  .title{
    height: 100px;
    line-height: 100px;
    float:left;
    margin-left: 50px;
  }
  .studentLists{
    padding-left: 150px;
    height: 50px;
    line-height: 50px;
  }
  .noAndSchool{
    float: left;
  }
  .selectpa{
    padding-right: 30px;
  }
  .spanlist{
    padding-right: 10px;
  }
  .inputlength{
    width: 202px;
  }
  .selectleft{
    float: left;
    padding-right: 10px;
    padding-left: 90px;
  }
</style>
<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">

        <div class="widget-head am-cf">
          <div class="widget-title  am-cf  title"><h1>{{studentData[0].name}}</h1></div>
          <div class="noAndSchool">
          <div class="widget-title  am-cf  studentLists"><span>学号:</span>{{studentData[0].studentNo}}</div>
          <div class="widget-title  am-cf  studentLists"><span>首报校区:</span>{{studentData[0].school}}</div>
          </div>
          <div class="noAndSchool">
            <div class="widget-title  am-cf  studentLists"><span>账户余额:</span>{{studentData[0].studentNo}}</div>
            <div class="widget-title  am-cf  studentLists"><span>电话:</span>{{studentData[0].phoneNo}}</div>
          </div>
          <div class="noAndSchool">
            <div class="widget-title  am-cf  studentLists"><span>年级:</span>{{studentData[0].gradeName}}</div>
            <div class="widget-title  am-cf  studentLists"><span>就读学校:</span>{{studentData[0].school}}</div>
          </div>
        </div>



        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">课程列表</div>
        </div>
        <div class="widget-body  am-fr">


          <form>
          <div   class="am-u-sm-12 am-u-md-6 am-u-lg-3 " >
            <div class="am-form-group tpl-table-list-select selectpa">
              <selected>
                <span class="spanlist">业务组</span>
                <select data-am-selected="" placeholder="搜索选项" name="busTeamName" id="busTeamName">
                  <option></option>
                  <option value="课程名">课程名</option>
                  <option value="课程类型">课程类型</option>
                  <option value="年级">年级</option>
                  <option value="科目">科目</option>
                  <option value="区域组">区域组</option>
                  <option value="业务组">业务组</option>
                </select>
              </selected>
            </div>
          </div>
          <div   class="am-u-sm-12 am-u-md-6 am-u-lg-3 " >
            <div class="am-form-group tpl-table-list-select selectpa">
              <selected >
                <span class="spanlist">期数</span>
                <select data-am-selected="" placeholder="搜索选项" name="">
                  <option></option>
                  <option value="课程名">课程名</option>
                  <option value="课程类型">课程类型</option>
                  <option value="年级">年级</option>
                  <option value="科目">科目</option>
                  <option value="区域组">区域组</option>
                  <option value="业务组">业务组</option>
                </select>
              </selected>
            </div>
          </div>
          <div   class="am-u-sm-12 am-u-md-6 am-u-lg-3 " >
            <div class="am-form-group tpl-table-list-select selectpa">
              <selected >
                <span class="spanlist">校区</span>
                <select  data-am-selected="" placeholder="搜索选项" name="campusName" id="campusName" >
                    <option v-model="item.campusName" v-for="item in CampusData">{{item.campusName}}</option>
                </select>
              </selected>
            </div>
          </div>
          <div   class="am-u-sm-12 am-u-md-6 am-u-lg-3 " >
            <div class="am-form-group tpl-table-list-select selectpa">
              <selected >
                <span class="spanlist">产品</span>
                <select data-am-selected="" placeholder="搜索选项" name="">
                  <option></option>
                  <option value="课程名">课程名</option>
                  <option value="课程类型">课程类型</option>
                  <option value="年级">年级</option>
                  <option value="科目">科目</option>
                  <option value="区域组">区域组</option>
                  <option value="业务组">业务组</option>
                </select>
              </selected>
            </div>
          </div>
          <div   class="am-u-sm-12 am-u-md-6 am-u-lg-3 " >
            <div class="am-form-group tpl-table-list-select selectpa">
              <selected >
                <span class="spanlist">课程</span>
                <select data-am-selected="" placeholder="搜索选项" name="">
                  <option></option>
                  <option value="课程名">课程名</option>
                  <option value="课程类型">课程类型</option>
                  <option value="年级">年级</option>
                  <option value="科目">科目</option>
                  <option value="区域组">区域组</option>
                  <option value="业务组">业务组</option>
                </select>
              </selected>
            </div>
          </div>
          <div   class="am-u-sm-12 am-u-md-6 am-u-lg-3 " >
            <div class="am-form-group tpl-table-list-select selectpa">
              <selected>
                <span class="spanlist">年级</span>
                <select data-am-selected="" placeholder="搜索选项" name="gradeName" id="gradeName">
                  <option></option>
                  <option value="一年级">一年级</option>
                  <option value="二年级">二年级</option>
                  <option value="三年级">三年级</option>
                  <option value="四年级">四年级</option>
                  <option value="五年级">五年级</option>
                  <option value="六年级">六年级</option>
                </select>
              </selected>
            </div>
          </div>
          <div   class="am-u-sm-12 am-u-md-6 am-u-lg-3 " >
            <div class="am-form-group tpl-table-list-select selectpa">
              <selected>
                <span class="spanlist">科目</span>
                <select data-am-selected="" placeholder="搜索选项" name="subjectName" id="subjectName">
                  <option></option>
                  <option value="数学">数学</option>
                  <option value="语文">语文</option>
                  <option value="英语">英语</option>
                </select>
              </selected>
            </div>
          </div>




          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <span class="selectleft">班级</span>
            <div class="am-input-group am-input-group-sm tpl-form-border-form cl-p inputlength">
              <input type="text" class="am-form-field " v-model="searchConfig.searchValue" name="className" id="className">
              <span class="am-input-group-btn">
              <button class="am-btn  am-btn-default am-btn-success tpl-table-list-field am-icon-search" type="button" @click="search"></button>
            </span>
            </div>
          </div>

            <!--<input type="submit" class="am-btn  am-btn-default am-btn-success tpl-table-list-field am-icon-search" value="点击">-->
          </form>

          <div class="am-u-sm-12 am-scrollable-horizontal">
            <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
              <thead>
              <tr>
                <th>课程名</th>
                <th>课程类型</th>
                <th>年级</th>
                <th>科目</th>
                <th>讲数</th>
                <th>区域组</th>
                <th>业务组</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="item in tableData" :key="item.userId">
                <td>{{item.courseName}}</td>
                <td>{{item.courseTypeName }}</td>
                <td>{{item.gradeName}}</td>
                <td>{{item.subjectName}}</td>
                <td>{{item.lectureAmount}}</td>
                <td>{{item.areaTeamName}}</td>
                <td>{{item.busTeamName}}</td>
                <td>{{item.status == 0 ? '未启用':'已启用'}}</td>
                <td>
                  <div class="tpl-table-black-operation">
                    <a href="javascript:;" @click="$router.push('/main/course/course/edit/'+item.courseTemplateId)" v-if="hasPermission('edit')">
                      <i class="am-icon-edit"></i> 报名
                    </a>
                  </div>
                </td>
              </tr>


              <!-- more data -->
              </tbody>
            </table>
          </div>
          <div class="am-u-lg-12 am-cf">

            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData" />
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
        pageSize: 5,
        pageNo: 1,
        query: {},
        searchConfig: {},
        studentData: [],
        CampusData: []
      }
    },
    components: {
      Pagination
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo);
      this.loadCampusData();
      var studentId = this.$params('studentId');
      if (studentId) {
        var _this = this;
        io.post(io.studentList, {studentId: studentId}, function (ret) {
          if (ret.success) {
            _this.studentData = ret.data;
          }
        }, function () {
          _this.$alert('请求服务器失败')
        })
      }
    },
    methods: {
      search: function () {
        var busTeamName = $("#busTeamName").find("option:selected").text();
        var campusName = $("#campusName").val();
        var gradeName = $("#gradeName option:selected").find("option:selected").text();
        var subjectName = $("#subjectName option:selected").find("option:selected").text();
        var className = $("#className ").val();
        alert(btn);
        this.query = {
          busTeamName: busTeamName,
          campusName: campusName,
          gradeName: gradeName,
          subjectName: subjectName,
          className: className
        }
        this.loadTableData();
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCourseTemplateList, $.extend({
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
      loadCampusData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCampusList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query), function (ret) {
          if (ret.success) {
            _this.CampusData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>
