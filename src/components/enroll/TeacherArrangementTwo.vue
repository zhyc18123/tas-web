<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-body  am-fr">
          <div align="left">
            <div class="am-u-sm-12 am-form ">
              <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
                <div class="am-form-group"><span> 已选老师：</span></div>
              </div>
              <div class="am-u-sm-12 am-u-md-12 am-u-lg-5">
                <span v-for="(item, index) in $root.teacherName ">
                  <a href="javascript:;" @click="delTeacher(index)">{{item.teacherName}}<i
                    class="am-icon-remove"></i></a>
                </span>
              </div>
              <div class="am-u-sm-12 am-u-md-12 am-u-lg-4 ">
                <div class="am-form-group">
                  <button type="submit" class="am-btn am-btn-primary" @click="">单讲交替</button>
                  <button type="submit" class="am-btn am-btn-primary" @click="">双讲交替</button>
                </div>
              </div>
            </div>

            <div class="am-u-sm-12 am-scrollable-horizontal">
              <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
                <thead>
                <tr>
                  <th>讲次</th>
                  <th>上课日期</th>
                  <th>上课时间</th>
                  <th>教师</th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="item in tableData" :key="item.classTimeId">
                  <td>{{item.lectureNo}}</td>
                  <td>{{item.classDate | formatDate }}</td>
                  <td>{{item.startTime }}</td>
                  <td>
                    <select2>
                      <option v-for="teacherNameItem in $root.teacherName">{{teacherNameItem.teacherName}}</option>
                    </select2>
                  </td>
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

            <div class="am-u-sm-12 am-text-center am-margin-top-lg">
              <a href="javascript:void(0)" data-am-modal-close>
                <button type="button" class="am-btn am-btn-primary" @click="confirm" v-show="isShow()">确定</button>
              </a>
              <button type="button" class="am-btn am-btn-primary" @click="back">上一步</button>
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
        total: 0,
        pageSize: 5,
        pageNo: 1,
        teacherIds: [],
        tableData: []
      }
    },
    props: ["classId", "isArrangeTeacher"],
    components: {
      Pagination
    },
    mounted: function () {
    },
    created: function () {
      this.loadTableData();
    },
    watch: {
      classId: function () {
        this.loadTableData();
      }
    },
    destroyed: function () {
      this.$root.teacherName = [];
    },
    methods: {
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1;
        io.post(io.apiAdminClassTimeList, {
          classId: _this.classId,
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      delTeacher: function (index) {
        this.$root.teacherName.splice(index, 1);
      },
      confirm: function () {
        for (var i = 0; i < this.$root.teacherName.length; i++) {
          this.teacherIds.push(this.$root.teacherName[i].teacherId)
        }
        io.post(io.apiAdminArrangeTeacher, {
          classId: this.classId,
          teacherIds: this.teacherIds
        }, function (ret) {
          if (ret.success) {
            alert(success);
          } else {
          }
        })
        this.$root.teacherName = [];
        this.teacherIds = [];
        this.$emit('clear')
      },
      back: function () {
        //弹窗
        this.$emit('goStep', 'step-one', {
            classId: this.classId,
            isArrangeTeacher: this.isArrangeTeacher,
          })
      },
      isShow: function () {
        return this.isArrangeTeacher != '1';
      }
    }
  }
</script>
