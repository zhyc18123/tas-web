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
                  <el-button size="small" @click.native="confirmArrangeTeacher(scope.row)">确定</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="am-u-lg-12 am-cf">
            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData" />
            </div>
          </div>

          <div class="am-g am-text-left">
            <label class="am-u-sm-2">已选老师：</label>
            <div class="am-u-sm-10 am-u-sm-pull-1 am-u-end">
              <button class="am-btn am-btn-default am-btn-sm am-margin-left-xs" v-for="(item, index) in selectedTeacher ">{{item.teacherName}}<i @click="delTeacher(index)" class="am-icon-remove"></i></button>
            </div>
          </div>


          <div class="am-u-sm-12 am-text-center am-margin-top-lg">
            <button type="button" class="am-btn am-btn-primary" @click="nextStep">下一步</button>
            <a href="javascript: void(0)" data-am-modal-close><button type="button" class="am-btn am-btn-primary" @click="cancel" >取消</button></a>
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
        pageSize:5,
        pageNo:1,
        query:{},
        selectedTeacher:[]
      }
    },
    props: ['courseClass'],
    watch:{
      'courseClass.classId' : function () {
        if(this.courseClass.classId ){
          this.loadTableData()
        }
      }
    },
    components: {
      Pagination,'calendar' :Calendar
    },
    mounted:function(){
      $(window).smoothScroll();
    },
    created:function(){
      if(this.courseClass.classId ){
        this.loadTableData()
      }
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
          busTeamId:_this.courseClass.busTeamId,
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
      confirmArrangeTeacher:function(item){
        //将老师放进全局数组中
        var isHad = false;
        for (var i = 0; i < this.selectedTeacher.length; i++) {
          if (this.selectedTeacher[i].teacherId == item.teacherId) {
            isHad = true
            this.$alert("老师已经被选了")
            break
          }
        }
        //判断是否存在，如果不存在，则添加
        if(!isHad){
          this.selectedTeacher.push(item)
        }
      },
      delTeacher:function(index){
          //点击删除老师，从数组中移除
        this.selectedTeacher.splice(index,1)
      },
      cancel:function(){
          //关闭，置空数组
        this.selectedTeacher=[];
      },
      nextStep:function(){
        if(this.selectedTeacher.length == 0 ){
          this.$alert('至少选择一个老师')
          return
        }
        //弹窗
        this.$emit('goStep', 'step-two', { teachers : this.selectedTeacher});
      }
    }
  }
</script>

