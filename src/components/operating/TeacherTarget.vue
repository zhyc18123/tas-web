<template>
  <div class="m-input-main-income">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">班主任目标</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <div>
          <div class="am-u-sm-24 am-u-md-24 am-u-lg-24 am-form-group toolbar">
            <el-select @change="handleAreaTeamIdChange" v-model="areaTeamId" placeholder="请选择">
              <el-option
                v-for="item in areaTeams"
                :key="item.areaTeamId"
                :label="item.name"
                :value="item.areaTeamId">
              </el-option>
            </el-select>
            <el-select :disabled="busTeams.length === 0" v-model="busTeamId" placeholder="请选择">
              <el-option
                v-for="item in busTeams"
                :key="item.busTeamId"
                :label="item.name"
                :value="item.busTeamId">
              </el-option>
            </el-select>
            <div class="datepicker">
              <el-date-picker
                v-model="year"
                type="year"
                placeholder="选择年">
              </el-date-picker>
            </div>
            <el-input placeholder="老师名称" v-model="teacherName"></el-input>
            <el-button size="small" @click="handleClick" type="success">搜索</el-button>
          </div>
          <div v-show="!empty" class="widget-body  am-fr">
            <div class="am-u-sm-12">
              <el-table
                :data="tableData"
                border
                ref="table"
                stripe
                style="min-width: 100%">
                <el-table-column
                  align="center"
                  width="100"
                  class-name="category"
                  label="老师">
                  <template scope="scope">
                    <div class="teacher-name">
                      <span>{{scope.row.teacherName}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  class-name="target"
                  align="center"
                  :render-header="renderHeader"
                  label="基本原理">
                  <template scope="scope">
                    <div class="list" size="small" v-for="(item,index) in scope.row.list">
                      <span class="target-name">{{item.targetName}}</span>
                      <el-input :style="{width: targetInputWidth}" class="target-number" v-for="i in item.list" v-model="i.targetNum"></el-input>
                      <div class="save-btn">
                        <el-button size="small" @click.native="handleSave(scope.row, index)">保存</el-button>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div v-show="empty">当前年份：{{year | formatDate('YYYY')}}，还没有设置期数。
            <router-link to="/main/sys/period/list" tag="a">前往设置</router-link>
          </div>
          <div class="am-u-lg-12 am-cf">

            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                          @paging="loadTableData"/>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import io from '../../lib/io'
  import Pagination from '../base/Pagination.vue'
  import moment from 'moment'
  export default{
    components: {
      Pagination
    },
    data:function(){
      return {
        teacherName: '',
        tableData:[],
        periods: [],
        areaTeamId: '',
        busTeamId: '',
        areaTeamName: '',
        year: moment().format('YYYY'),
        targetType: 0,
        empty: false,
        pageNo: 1,
        pageSize: 5,
        total: 0
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    computed: {
      targetInputWidth: function () {
        return (this.$refs.table.$el.clientWidth - 104 - 60 - 110) / this.periods.length + 'px'
      },
      areaTeams: function () {
        return this.$root.config.areaTeams || []
      },
      busTeams: function () {
        return ( ( this.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.areaTeamId] || [] ) : [] )
      }
    },
    created:function(){
      if (window.config.areaTeams) {
        this.areaTeamId = window.config.areaTeams[0].areaTeamId
        if (window.config.groupBusTeams) {
          this.busTeamId = window.config.groupBusTeams[this.areaTeamId][0].busTeamId
        }
      }
      this.loadPeriodByYear();
    },
    watch: {
      year(newVal) {
        if (newVal) {
          this.loadPeriodByYear();
        }
      },
    },
    methods:{
      handleAreaTeamIdChange() {
      	this.busTeamId = ''
      },
      renderHeader(createElement) {
        let array = [createElement('span', {
          'class': {
            'periodName': true
          },
          'style': {
          	'width': '110px',
          	'display': 'inline-block'
          }
        }, ['类型'])]
        this.periods.map((val) => {
          array.push(createElement('span', {
            'class': {
              'periodName': true
            },
            'style': {
              'width': this.targetInputWidth,
              'display': 'inline-block'
            }
          }, [val.periodName]))
        })
        array.push([createElement('span', {
          'class': {
            'periodName': true
          },
          'style': {
            'width': '60px',
            'display': 'inline-block'
          }
        }, ['操作'])])
        return createElement(
          'div',
          array
        );
      },
      handleClick() {
      	this.loadPeriodByYear()
      },
      handleSave(list, index) {
        var _this = this,
          data = {
            year: list.year,
            teacherId: list.teacherId,
            targetType: list.list[parseInt(index)].targetType,
            teacherTargetVoJson : JSON.stringify(list.list[parseInt(index)].list)
      }
        _this.$showLoading()
        io.post(io.saveTeacherTarget,data,function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            _this.$alert('保存成功')
            _this.loadTableData()
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      loadPeriodByYear: function () {
        var _this = this;
        io.post(io.periodByYearAndAreaTeamId,{
          areaTeamId: this.areaTeamId,
          year: this.year ? moment(this.year).format('YYYY'): '',
        },function(ret){
          if(ret.success){
            if (ret.data.length === 0) {
              _this.empty = true
            } else {
              _this.periods = ret.data
              _this.empty = false
              _this.loadTableData();
            }
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      loadTableData:function(){
        var _this = this;
        _this.$showLoading()

        io.post(io.teacherTargetList,{
          areaTeamId: this.areaTeamId,
          busTeamId: this.busTeamId,
          teacherName: this.teacherName,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          year: this.year ? moment(this.year).format('YYYY'): '',
        },function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            _this.tableData = ret.data.list
            _this.total = ret.data.total
          }else{
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .m-input-main-income {
    .el-tabs__header {
      margin-top: 20px;
    }
    .toolbar {
      margin-top: 15px;
      margin-left: 16px;
      .el-input {
        width: 160px;
      }
    }
    .datepicker {
      /*margin: 0 auto;*/
      display: inline-block;
      input {
        text-align: center;
        height: 36px;
        border: 1px solid #bfcbd9;
      }
    }
    .el-table .cell, .el-table th>div{
      padding: 0;
    }
    .el-table {
      .target {
        /*border-bottom: none;*/
        height: auto;
        .cell {
          padding: 0;
          height: 100%;
          line-height: 40px;
          .list + .list {
            border-top: 1px solid #dfe6ec;
            margin: 5px 0;
          }
          .teacher-name {
          }
          .target-name {
            width: 110px;
            display: inline-block;
          }
          .save-btn {
            width: 50px;
            display: inline-block;
            /*padding: 0 10px;*/
          }
          .target-number {
            display: inline-block;
            width: 10%;
            /*margin: 0 0.5%;*/
          }
        }
      }
    }
  }
</style>
