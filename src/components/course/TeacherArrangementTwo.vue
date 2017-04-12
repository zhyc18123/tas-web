<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-body  am-fr">
          <div align="left">
            <div class="am-u-sm-12 am-form ">
              <div class="am-g am-text-left">
                <label class="am-u-sm-2">已选老师：</label>
                <div class="am-u-sm-10 am-u-sm-pull-1 am-u-end">
                  <button class="am-btn am-btn-default am-btn-sm am-margin-left-xs" v-for="(item, index) in args.teachers ">{{item.teacherName}}<i @click="delTeacher(index)" class="am-icon-remove"></i></button>
                </div>
              </div>
              <div class="am-u-sm-12 am-u-md-12 am-u-lg-12 am-text-right">
                <div class="am-form-group">
                  <button type="submit" class="am-btn am-btn-primary" @click="quickArrange(1)">单讲交替</button>
                  <button type="submit" class="am-btn am-btn-primary" @click="quickArrange(2)">双讲交替</button>
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

                <tr v-for="(item,index) in tableData" :key="item.classTimeId">
                  <td>{{item.lectureNo}}</td>
                  <td>{{item.classDate | formatDate }}</td>
                  <td>{{item.startTime }}-{{item.endTime }}</td>
                  <td>
                    <div class="am-form">
                      <select2 required v-model="item.teacherId" :options="teacherForSelect"></select2>
                    </div>
                  </td>
                </tr>

                </tbody>
              </table>
            </div>

            <div class="am-u-sm-12 am-text-center am-margin-top-lg">
              <button type="button" class="am-btn am-btn-primary" @click="confirm">确定</button>
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
        tableData: [],
      }
    },
    props: ["courseClass", "args"],
    computed: {
      teacherForSelect: function () {
        return this.args.teachers.map(function (item) {
          return {value: item.teacherId, text: item.teacherName}
        })
      }
    },
    components: {
      Pagination
    },
    created: function () {
      this.loadTableData();
    },
    watch: {
      'courseClassclassId': function () {
        this.loadTableData();
      }
    },
    destroyed: function () {
      this.args.teachers = [];
    },
    methods: {
      loadTableData: function () {
        var _this = this
        io.post(io.apiAdminClassTimeList, {
          classId: _this.courseClass.classId,
        }, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data;
            _this.initSelected();
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      initSelected:function(){
        for(var i = 0 ;i < this.tableData.length ;i++ ){
          this.tableData[i].teacherId = this.args.teachers[0].teacherId
        }
      },
      delTeacher: function (index) {
        if(this.args.teachers.length == 1 ){
            return
        }
        this.args.teachers.splice(index, 1);
        this.initSelected()
      },
      confirm: function () {
        var _this = this
        var teacherIds = []
        for (var i = 0; i < this.tableData.length; i++) {
          teacherIds.push(this.tableData[i].teacherId)
        }

        _this.$showLoading()

        io.post(io.apiAdminArrangeTeacher, {
         classId: this.courseClass.classId,
         teacherIds: teacherIds.join(",")
         }, function (ret) {
          _this.$hiddenLoading()
          if (ret.success) {
            _this.$emit('completed')
          } else {
            _this.$alert(ret.desc)
          }
         });

      },
      back: function () {
        //弹窗
        this.$emit('goStep', 'step-one' )
      },
      //单双讲交替
      quickArrange: function (step) {
        var _this = this;
        if (this.args.teachers.length == 0) {
          _this.$alert('请选择老师');
          return;
        }

        (function(){
          var index = 0 ;
          while (true){
            for(var i = 0 ;i < this.args.teachers.length ;i++){
              for(var ii = 0 ;ii < step ;ii++ ){
                this.tableData[index++].teacherId = this.args.teachers[i].teacherId
                console.log(1)
                if( index >= this.tableData.length ){
                    return
                }
              }
            }
          }
        }).bind(this)()


      }
    }
  }
</script>
