<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-form-item label="请选择日期：" class="date-picker-item">
          <el-date-picker
            v-model="year"
            align="right"
            type="year"
            placeholder="选择年">
          </el-date-picker>
          <el-date-picker
            v-model="month"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="status-item">
          <span><span class="status0 status"></span> 未占用</span>
          <span><span class="status1 status"></span> 已占用</span>
          <span><span class="status2 status"></span> 不属于出租方</span>
          <span><span class="status3 status"></span> 当前选中</span>
        </el-form-item>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData2"
      border
      style="width: 100%">
      <el-table-column
        v-for="item in tableColumns"
        :prop="item.prop"
        :label="item.label"
        :width="item.width">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
      data() {
          return {
            month: '',
            year: '',
            tableData2: [],
            tableColumns: [
              {
                prop:"date",
                label:"日期",
                width:"100"
              },{
                prop:"week",
                label:"周",
                width:"100"
              },{
                prop:"0",
                label:"8:00",
                width:"100"
              },{
                prop:"1",
                label:"8:30",
                width:"100"
              },{
                prop:"2",
                label:"9:00",
                width:"100"
              },{
                prop:"3",
                label:"9:30",
                width:"100"
              },{
                prop:"4",
                label:"10:00",
                width:"100"
              },{
                prop:"5",
                label:"10:30",
                width:"100"
              },{
                prop:"6",
                label:"11:00",
                width:"100"
              },{
                prop:"7",
                label:"11:30",
                width:"100"
              },{
                prop:"8",
                label:"12:00",
                width:"100"
              },{
                prop:"9",
                label:"12:30",
                width:"100"
              }
            ]
          }
      }
  }
</script>

<style scope lang="less">
  .status-item {
    width: 550px;

    .status {
      width: 40px;
      height: 20px;
      margin-left: 18px;
      display: inline-block;
      vertical-align: middle;
      border: 1px solid #eeeeee;
    }
    .status0 {
      background-color: #fff;
    }.status1 {
       background-color: #49b070;
     }.status2 {
        background-color: #ccc;
      }.status3 {
         background-color: #ff5a00;
       }
  }
</style>
