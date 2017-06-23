<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-body  am-fr">

          <div class="am-g am-form " >

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" class="am-input-lg" name="selectedTeacher" v-model="query.selectedTeacher" placeholder="请输入教师姓名"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" class="am-input-lg" name="idNo" v-model="query.idNo" placeholder="请输入身份证号码"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success" @click="search">
                  <span class="am-icon-search"></span>查询
                </button>
              </div>
            </div>
          </div>

          <!--table-->
          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column type="expand">
                <template scope="scope">
                  <calendar :teacherId="scope.row.teacherId"></calendar>
                </template>
              </el-table-column>
              <el-table-column
                prop="teacherName"
                label="教师姓名"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="teachSubjectNames"
                label="任教科目"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="入职时间"
                min-width="100">
                <template scope="scope">
                  {{scope.row.joinTime | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="phoneNo"
                label="电话号码"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="操作"
                width="100">
                <template scope="scope">
                  <el-button size="small" @click.native="ok(scope.row)">确定</el-button>
                </template>
              </el-table-column>
            </el-table>
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
  import Calendar from './CalendarForTeacher'

  export default{
    data:function(){
      return {
        tableData:[],
        teacherData:[],
        total:0,
        pageSize:10,
        pageNo:1,
        query:{},
        selectedTeacher:[]
      }
    },
    props: ['courseClass','classLecture'],
    watch:{
      classLecture : function () {
        this.loadTableData()
      }
    },
    components: {
      Pagination,'calendar' :Calendar
    },
    mounted:function(){
      $(window).smoothScroll();
    },
    created:function(){
      this.loadTableData()
    },
    destroyed:function () {
    },
    methods:{
      search:function(){
        this.loadTableData(this.pageNo)
      },
      loadTableData:function(pageNo){
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminTeacherListForClassArrangement,$.extend({
          areaTeamId:_this.courseClass.areaTeamId,
          //busTeamId:_this.courseClass.busTeamId,
          gradeName:_this.courseClass.gradeName,
          subjectName:_this.courseClass.subjectName,
          pageNo:_this.pageNo,
          pageSize:_this.pageSize
        },_this.query),function(ret){
          if(ret.success){
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      ok:function(teacher){
        var _this  = this
        io.post(io.apiAdminRearrangeTeacherForLecture,{
          classLectureId : this.classLecture.classLectureId ,
          teacherId  : teacher.teacherId ,
          updateAfterLecture : false
        },function(ret){
          if(ret.success){
            _this.$emit('ok')
          }else{
            _this.$alert(ret.desc ||  '处理失败')
          }
        })
      }
    }
  }
</script>

