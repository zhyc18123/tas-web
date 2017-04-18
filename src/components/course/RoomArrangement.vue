<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-body  am-fr">

          <!--search-->
          <div class="am-g am-form">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2 v-model="query.campusId" :options="campus">
                  <option value="">校区</option>
                </select2>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" class="am-input-lg" name="roomName" v-model="query.roomName" placeholder="请输入教室名称"/>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="search" ><span class="am-icon-search"></span>查询
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
                  <calendar :roomId="scope.row.roomId"></calendar>
                </template>
              </el-table-column>
              <el-table-column
                label="所在校区"
                min-width="100">
                <template scope="scope">
                  {{scope.row.campusName }}
                </template>
              </el-table-column>
              <el-table-column
                prop="roomName"
                label="教室名称"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="seatAmount"
                label="座位数"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="memo"
                label="备注"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="操作"
                width="100">
                <template scope="scope">
                  <el-button size="small" @click.native="confirmArrangeRoom(scope.row.roomId)">确定</el-button>
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
  import Calendar from './CalendarForRoom'


  export default{
    data:function(){
      return {
        tableData:[],
        total:0,
        pageSize:10,
        pageNo:1,
        query:{},
        campus:[]
      }
    },
    props: ['courseClass'],
    components: { Pagination ,'calendar':Calendar },
    watch:{
      'courseClass.classId':function () {
        this.tableData = []
        if(this.courseClass.classId){
          this.loadCampus()
        }
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      if (this.courseClass.classId) {
        this.loadTableData(this.pageNo)
        this.loadCampus()
      }
    },
    methods:{
      search:function(){
        this.loadTableData(this.pageNo)
      },
      loadTableData:function(pageNo){
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminRoomListForClassArrangement,$.extend({
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
      confirmArrangeRoom:function (roomId) {
        var _this = this;
        _this.$showLoading()
        io.post(io.apiAdminArrangeRoom, {classId: this.courseClass.classId, roomId: roomId},
          function (ret) {
            _this.$hiddenLoading()
            if (ret.success) {
              _this.$toast('OK');
              _this.$emit('arrangementSuccess');
            } else {
              _this.$alert(ret.desc)
            }
        })
      },
      loadCampus:function(){
        var _this = this;
        io.post(io.apiAdminAllCampus,{},
          function (ret) {
            if (ret.success) {
              _this.campus = ret.data.map(function(item){
                  return {value : item.campusId  , text : item.campusName}
              })
            } else {
              _this.$alert(ret.desc)
            }
          })
      }
    }
  }
</script>

