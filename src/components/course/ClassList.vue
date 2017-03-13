<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">班级列表</div>
        </div>
        <div class="widget-body  am-fr">

          <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
            <fieldset>
              <div class="am-form-group">
                <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
                  <div class="am-form-group">
                    <div class="am-u-sm-3 input-field">
                      <select2 required name="areaTeam" v-model="formData.areaTeamId" :options="areaTeams">
                        <option value="">城市</option>
                      </select2>
                    </div>
                    <div class="am-u-sm-3 am-u-end input-field">
                      <select2 name="busTeam" v-model="formData.busTeamId" :options="busTeams">
                        <option value="">区域</option>
                      </select2>
                    </div>
                    <div class="am-u-sm-3 am-u-end input-field">
                      <select2 name="busTeam" v-model="formData.busTeamId" :options="busTeams">
                        <option value="">校区</option>
                      </select2>
                    </div>
                    <div class="am-u-sm-3 am-u-end input-field">
                      <select2 name="busTeam" v-model="formData.busTeamId" :options="busTeams">
                        <option value="">年份</option>
                      </select2>
                    </div>
                  </div>
                </div>
                <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
                  <div class="am-form-group">
                    <div class="am-u-sm-3 am-u-end input-field">
                      <select2 name="busTeam" v-model="formData.busTeamId" :options="busTeams">
                        <option value="">季节</option>
                      </select2>
                    </div>
                    <div class="am-u-sm-3 am-u-end input-field">
                      <select2 name="busTeam" v-model="formData.busTeamId" :options="busTeams">
                        <option value="">产品</option>
                      </select2>
                    </div>
                    <div class="am-u-sm-3 am-u-end input-field">
                      <select2 name="grade" v-model="formData.gradeId" :options="grades">
                        <option value="">年级</option>
                      </select2>
                    </div>
                    <div class="am-u-sm-3 am-u-end input-field">
                      <select2 name="busTeam" v-model="formData.busTeamId" :options="busTeams">
                        <option value="">学科</option>
                      </select2>
                    </div>
                  </div>
                </div>
                <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
                  <div class="am-form-group">
                    <div class="am-u-sm-3 am-u-end input-field">
                      <select2 name="openStatus" v-model="formData.openStatus" >
                        <option value="">班级状态</option>
                        <option value="0">未开班</option>
                        <option value="1">已开班</option>
                      </select2>
                    </div>
                    <div class="am-u-sm-3 am-u-end input-field">
                      <input type="text" class="am-form-field" placeholder="班级名称" required v-model="formData.className">
                    </div>
                    <div class="am-u-sm-3 am-u-end input-field">
                      <input type="text" class="am-form-field" placeholder="开课日期" required v-model="formData.className">
                    </div>
                    <div class="am-u-sm-3 am-u-end input-field">
                      <input type="text" class="am-form-field" placeholder="教师姓名" required v-model="formData.className">
                    </div>
                  </div>
                </div>
                <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
                  <div class="am-form-group">
                    <div class="am-u-sm-3 am-u-end input-field">
                      <input type="text" class="am-form-field" placeholder="教室" required v-model="formData.className">
                    </div>
                    <div class="am-u-sm-3 am-u-end input-field">
                      <select2 name="isArrangeTime" v-model="formData.isArrangeTime" >
                        <option value="">是否排时间</option>
                        <option value="0">是</option>
                        <option value="1">否</option>
                      </select2>
                    </div>
                    <div class="am-u-sm-3 am-u-end input-field">
                      <select2 name="isArrangeRoom" v-model="formData.isArrangeRoom" >
                        <option value="">是否排教室</option>
                        <option value="0">是</option>
                        <option value="1">否</option>
                      </select2>
                    </div>
                    <div class="am-u-sm-3 am-u-end input-field">
                      <select2 name="isArrangeTeacher" v-model="formData.isArrangeTeacher" >
                        <option value="">是否排老师</option>
                        <option value="0">是</option>
                        <option value="1">否</option>
                      </select2>
                    </div>
                  </div>
                </div>

              </div>
            </fieldset>
          </form>

          <div class="am-u-sm-12 am-u-md-6 am-u-lg-3 am-u-lg-offset-6">
            <div class="am-form-group">
              <button type="button" class="am-btn am-btn-default am-btn-success"
                      @click="$router.push('/main/course/class/add')" v-if="hasPermission('add')"><span
                class="am-icon-plus"></span>新增
              </button>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-3 am-u-sm-3">
            <div class="am-form-group">
              <button type="button" class="am-btn am-btn-default am-btn-success"
                      @click="$router.push('')" ><span
                class="am-icon-search"></span>查询
              </button>
            </div>
          </div>

          <div class="am-u-sm-12 am-scrollable-horizontal">
            <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
              <thead>
              <tr>
                <td>操作</td>
                <th>班级名称</th>
                <th>校区</th>
                <th>开课日期</th>
                <th>上课时间</th>
                <th>已上/总讲次</th>
                <th>已报人数</th>
                <th>学位数</th>
                <th>教师</th>
                <th>班主任</th>
                <th>教室</th>
                <th>学费</th>
                <th>年级</th>
                <th>科目</th>
                <th>期名</th>
                <th>开班状态</th>

                <!--<th>进度状态</th>
                <th>区域组</th>
                <th>业务组</th>-->
              </tr>
              </thead>
              <tbody>

              <tr v-for="item in tableData" :key="item.userId">
                <td>
                  排时间 排教室 排老师
                  <div class="tpl-table-black-operation">
                    <a href="javascript:;" @click="$router.push('/main/course/class/edit/'+item.classId)"
                       v-if="hasPermission('edit')">
                      <i class="am-icon-edit"></i> 编辑
                    </a>
                  </div>
                </td>
                <td>{{item.className}}</td>
                <td>{{item.campusName}}</td>
                <td>{{new Date(item.startCourseTime).toLocaleDateString() }}</td>
                <td></td>
                <td>0/{{item.lectureAmount}}</td>
                <td>{{item.regAmount}}</td>
                <td>{{item.quota}}</td>
                <td>{{item.teacherNames}}</td>
                <td>{{item.seniorName}}</td>
                <td>{{item.roomName}}</td>
                <td>{{item.studyingFee}}</td>
                <td>{{item.gradeName}}</td>
                <td>{{item.subjectName}}</td>
                <td>{{item.periodName}}</td>
                <td>{{item.openStatus == 0 ? '未开办':'已开班'}}</td>

                <!--<td>{{item.progressStatus == 0 ? '未开课' : item.progressStatus == 1 ?  '已开课' : '已结课' }}</td>
                <td>{{item.areaTeamName}}</td>
                <td>{{item.busTeamName}}</td>-->
              </tr>
              </tbody>
            </table>
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
        pageSize: 5,
        pageNo: 1,
        query: {},
        searchConfig: {},
        formData: {
          areaTeamId: '',
          busTeamId: '',
        }
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
        var options = ( ( this.formData.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.formData.areaTeamId] || [] ) : [] )
          .map(function (item) {
            return {value: item.busTeamId, text: item.name}
          })
        return options
      },
      grades: function () {
        var _this = this
        io.post(io.apiAdminLoadGradesByAreaTeamIdAndBusTeamId, $.extend({
          areaTeamId: _this.formData.areaTeamId ,
          busTeamId: _this.formData.busTeamId
        }, _this.query), function (ret) {
          if (ret.success) {
            var results = ret.data.list;
            results.map(function (item) {
              return {value: item.gradeId,text:item.gradeName}
            })
          } else {
            return [];
            _this.$alert(ret.desc)
          }
        })
      }

    },
    methods: {
      search: function () {
        this.query = {}
        if (!this.searchConfig.searchItem) {
          this.$alert('请选择搜索选项')
          return
        }
        this.query[this.searchConfig.searchItem] = this.searchConfig.searchValue
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
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>
