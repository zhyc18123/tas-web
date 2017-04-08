<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form " v-show="isShow()">

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
                <button type="button" class="am-btn am-btn-default am-btn-success am-btn-lg" @click="search">
                  <span class="am-icon-search"></span>查询
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
                <td>{{item.teacherName}}</td>
                <td>{{item.jobNature}}</td>
                <td>{{item.teachSubjectNames}}</td>
                <td>{{item.joinTime | formatDate}}</td>
                <td>{{item.phoneNo}}</td>
                <td>
                  <div class="tpl-table-black-operation">
                    <a href="javascript:;" @click="confirmArrangeTeacher(item)" v-show="isShow()">
                      <i class="am-icon-edit"></i>确定
                    </a>
                    <a href="javascript:;" @click="">
                      <i class="am-icon-edit"></i>查看占用情况
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

          <div class="am-align-left" v-show="isShow()">
            <label>已选老师：</label>
            <span v-for="(item, index) in $root.teacherName "><a href="javascript:;" @click="delTeacher(index)">{{item.teacherName}}<i class="am-icon-remove"></i></a></span>
          </div>


          <div class="am-u-sm-12 am-text-center am-margin-top-lg">
            <button type="submit" class="am-btn am-btn-primary" @click="nextStep()">下一步</button>
            <button type="submit" class="am-btn am-btn-primary" @click="cancel">取消</button>
          </div>

          <window ref="teacher_arrangement_nextStep" title="排老师">
            <teacher-arrangement-nextStep :classId="classId" :isArrangeTeacher="isArrangeTeacher" @arrangementSuccessNextStep="$refs.teacher_arrangement_nextStep.close()"></teacher-arrangement-nextStep>
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
        query:{}
      }
    },
    props: ['classId','isArrangeTeacher'],
    watch:{
      classId : function () {
        if ( this.isArrangeTeacher=='1'){
          this.loadTableData(this.pageNo);
        }else{
          this.loadNullData();
        }
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
    destroyed:function () {
      this.$root.teacherName=[];
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
      confirmArrangeTeacher:function(item){
        //将老师放进全局数组中
        var isHad = false;
        for (var i = 0; i < this.$root.teacherName.length; i++) {
          if (this.$root.teacherName[i].teacherId == item.teacherId) {
            isHad = true
            this.$alert("老师已经被选了")
            break
          }
        }
        //判断是否存在，如果不存在，则添加
        if(!isHad){
          this.$root.teacherName.push(item)
        }
      },
      delTeacher:function(index){
          //点击删除老师，从数组中移除
        this.$root.teacherName.splice(index,1)
      },
      cancel:function(){
          //关闭，置空数组
        this.$root.teacherName=[];
        this.$emit("arrangementSuccess");
      },
      nextStep:function(){
        //弹窗
        var _this = this;
        _this.classId = this.classId;
        _this.isArrangeTeacher = this.isArrangeTeacher;
        _this.$emit("arrangementSuccess");
        _this.$refs.teacher_arrangement_nextStep.show({
          width : 1000,
          height: 500
        });
      },
      isShow:function() {
        return this.isArrangeTeacher!='1';
      }
    }
  }
</script>

