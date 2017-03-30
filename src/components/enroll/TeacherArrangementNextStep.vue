<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
  <div class="widget-body  am-fr">
  <div align="left">
    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      已选老师：<span v-for="item in teacherData">{{item}}<a href="javascript:;" @click=""> <i class="am-icon-remove"></i></a></span>
        <button type="submit" class="am-btn am-btn-primary" @click="">单讲交替</button>
        <button type="submit" class="am-btn am-btn-primary" @click="">双讲交替</button>
    </div>

    <div class="am-u-sm-12 am-scrollable-horizontal">
      <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
        <thead>
        <tr>
          <th>讲次</th>
          <th>周次</th>
          <th>上课日期</th>
          <th>上课时间</th>
          <th>教师</th>
          <th>教室</th>
          <th>上课状态</th>
        </tr>
        </thead>
        <tbody>

        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
              <select2>
                <option v-for="item in teacherData">{{item}}</option>
              </select2>
          </td>
          <td></td>
          <td></td>
        </tr>

        </tbody>
      </table>
    </div>

    <div class="am-u-lg-12 am-cf">
      <div class="am-fr">
        <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData" />
      </div>
    </div>

    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="submit" class="am-btn am-btn-primary" @click="confirm">确定</button>
      <button type="submit" class="am-btn am-btn-primary" @click="back">上一步</button>
    </div>
  </div>
  </div>
  </div>
  </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import TeacherArrangement from '../enroll/TeacherArrangement'
  import Pagination from '../base/Pagination'

  export default{
    data:function(){
      return {
        total:0,
        pageSize:5,
        pageNo:1,
      }
    },
    props:["teacherData", "classId"],
    components: {
      Pagination,
    },
    mounted:function(){
    },
    created:function(){
    },
    watch:{
      classId:function () {
      this.loadTableData(this.classId);
      }
    },
    methods:{
      loadTableData:function (classId) {
        io.post(io.apiAdminGetClassMessage, {classId:classId},
          function (ret) {
            if (ret.success) {

            } else {
              _this.$alert(ret.desc)
            }
          })
      },
        confirm:function () {
          this.$emit("arrangementSuccessNextStep");
        },
        back:function () {

        },
    }
  }
</script>
