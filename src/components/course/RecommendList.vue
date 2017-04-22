<template>
  <div class="am-g am-g-collapse">
    <div class="am-u-sm-12">

      <el-table
        :data="tableData"
        border
        stripe
        style="min-width: 100%">
        <el-table-column
          fixed
          prop="classNo"
          label="班级编号"
          min-width="100">
        </el-table-column>
        <el-table-column
          fixed
          prop="className"
          label="班级名称"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="periodName"
          label="期数"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="campusName"
          label="校区"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="roomName"
          label="教室"
          min-width="100">
        </el-table-column>
        <el-table-column
          label="开课日期"
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
          label="已上/总讲次"
          min-width="100">
          <template scope="scope">
            {{scope.row.completedLectureAmount}}/{{scope.row.lectureAmount}}
                </template>
        </el-table-column>
        <el-table-column
          prop="regAmount"
          label="已报人数"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="quota"
          label="学位数"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="teacherNames"
          label="教师"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="seniorName"
          label="班主任"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="studyingFee"
          label="学费"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="gradeName"
          label="年级"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="subjectName"
          label="科目"
          min-width="100">
        </el-table-column>

        <el-table-column
          prop="areaTeamName"
          label="区域"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="busTeamName"
          label="业务组"
          min-width="100">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template scope="scope">
            <el-button size="small" v-if="isRecommend == 1"  @click.native="cancel(scope.row)">取消推荐</el-button>
            <el-button size="small" v-if="isRecommend == 0"  @click.native="add(scope.row)">推荐</el-button>
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
        pageNo: 1
      }
    },
    props:['query','isRecommend'],
    components: {
      Pagination
    },
    created: function () {
      this.loadTableData(this.pageNo)
    },
    methods: {
      search:function(){
          this.loadTableData(1)
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCourseClassList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
          isRecommend : _this.isRecommend
        }, _this.query), function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      cancel:function (courseClass) {
        this.recommend([courseClass.classId],0)
      },
      add:function (courseClass) {
        this.recommend([courseClass.classId],1)
      },
      recommend:function(classIds , isRecommend ){
        var _this = this
        io.post(io.apiAdminRecommendCourseClass, {
          classIds :classIds,
          isRecommend : isRecommend
        }, function (ret) {
          if (ret.success) {
            _this.loadTableData(_this.pageNo)
            _this.$emit('change')
            _this.$alert('处理成功')
          } else {
            _this.$alert(ret.desc)
          }
        })
      }

    }
  }
</script>
