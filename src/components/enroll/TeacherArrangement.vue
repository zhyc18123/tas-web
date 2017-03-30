<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form ">

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" class="am-input-lg" name="teacherName" v-model="query.teacherName" placeholder="请输入教师名称"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" class="am-input-lg" name="idNo" v-model="query.idNo" placeholder="请输入身份证号码"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success am-btn-lg"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
              </div>
            </div>
          </div>

          <!--table-->
          <div class="am-u-sm-12 am-scrollable-horizontal">
            <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
              <thead>
              <tr>
                <th>序号</th>
                <th>教师姓名</th>
                <th>任教性质</th>
                <th>任教科目</th>
                <th>入职时间</th>
                <th>电话号码</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="(item, index) in tableData" :key="item.teacherId">
                <td>{{index+1}}</td>
                <td>{{item.teacherName }}</td>
                <td>{{item.jobNature}}</td>
                <td>{{item.teachSubjectNames}}</td>
                <td>{{item.joinTime | formatDate}}</td>
                <td>{{item.phoneNo}}</td>
                <td>
                  <div class="tpl-table-black-operation">
                    <a href="javascript:;" @click="confirmArrangeTeacher(item)" >
                      <i class="am-icon-edit"></i> 确定
                    </a>
                    <a href="javascript:;" @click="">
                      <i class="am-icon-edit"></i> 查看占用情况
                    </a>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="am-u-lg-12 am-cf">
            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData" />
            </div>
          </div>

          <div class="am-align-left" id="teacher">
            <label>已选老师：</label>
          </div>


          <div class="am-u-sm-12 am-text-center am-margin-top-lg">
            <button type="submit" class="am-btn am-btn-primary" @click="nextStep()">下一步</button>
            <button type="submit" class="am-btn am-btn-primary" @click="cancel">取消</button>
          </div>

          <window ref="teacher_arrangement_nextStep" title="排老师">
            <teacher-arrangement-nextStep :teacherData="teacherData" :classId="classId" @arrangementSuccessNextStep="$refs.teacher_arrangement_nextStep.close()"></teacher-arrangement-nextStep>
          </window>

        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import TeacherArrangementNextStep from '../enroll/TeacherArrangementNextStep'
  import Pagination from '../base/Pagination'

  export default{
    data:function(){
      return {
        tableData:[],
        teacherData:[],
        total:0,
        pageSize:5,
        pageNo:1,
        query:{},
      }
    },
    props: ['classId', 'teacherNames'],
    watch:{
      classId : function () {
        $("#teacher .teacherName").remove();
        this.loadNullData();
      }
    },
    components: {
      Pagination,
      'teacher-arrangement-nextStep':TeacherArrangementNextStep
    },
    mounted:function(){
      $(window).smoothScroll();
    },
    created:function(){
    },
    methods:{
      search:function(){
        this.loadTableData(this.pageNo)
      },
      loadNullData:function () {
        this.tableData = null;
      },
      loadTableData:function(pageNo){
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminTeacherListForClassArrangement,$.extend({
          classId:_this.classId,
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
      confirmArrangeTeacher:function (item) {
        this.teacherData.push(item.teacherName);
        $('#teacher').append('<label class="teacherName">'+item.teacherName+'<a href="javascript:;" @click="delTeacher()"> <i class="am-icon-remove"></i></a></label>');
      },
      delTeacher : function(){

      },
      cancel:function () {
          this.teacherData.pop();
          this.$emit("arrangementSuccess");
      },
      nextStep:function () {
        //弹窗
        var _this = this;
        _this.tableData = _this.teacherData;
        _this.$emit("arrangementSuccess"),
        _this.$refs.teacher_arrangement_nextStep.show({
          width : 1000,
          height: 500
        });
      },
    }
  }
</script>

