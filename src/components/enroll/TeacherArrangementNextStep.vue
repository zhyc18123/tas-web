<template>


  <div align="left">
    <div class="am-u-lg-3">
    <label>已选老师：</label>
    </div>
    <div class="am-u-lg-3">
      <a href="javascript:;" @click=""><button class="am-radius">单讲交替</button></a>
      <a href="javascript:;" @click=""><button class="am-radius">双讲交替</button></a>
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

        <tr v-for="(item, index) in tableData" :key="item.classId">
          <td>{{}}</td>
          <td>{{}}</td>
          <td>{{}}</td>
          <td>{{}}</td>
          <td>
              <select>
                <option>老师A</option>
                <option>老师B</option>
              </select>
          </td>
          <td>{{}}</td>
          <td>{{}}</td>
        </tr>

        </tbody>
      </table>
    </div>

    <div class="am-u-sm-12 am-text-center am-margin-top-lg">
      <button type="submit" class="am-btn am-btn-primary" @click="confirm">确定</button>
      <button type="submit" class="am-btn am-btn-primary" @click="back">上一步</button>
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
          tableData:[],
      }
    },
    components: {
      Pagination,
    },
    mounted:function(){
    },
    created:function(){
    },
    methods:{
        confirm:function () {
          this.$emit("arrangementSuccessNextStep");
        },
        back:function () {
          alert(123546);

        },
    }
  }
</script>
