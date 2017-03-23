<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">教室列表</div>
        </div>
        <div class="widget-body  am-fr">

          <!--search-->
          <div class="am-u-sm-12 am-form ">

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" class="am-input-lg" name="roomName" v-model="query.roomName" placeholder="请输入教室名称"/>
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
                <th>所在校区</th>
                <th>教室名称</th>
                <th>座位数</th>
                <th>备注</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="(item, index) in tableData" :key="item.productId">
                <td>{{index}}</td>
                <td>{{item.campusName }}</td>
                <td>{{item.roomName}}</td>
                <td>{{item.seatAmount}}</td>
                <td>{{item.memo}}</td>
                <td>
                  <div class="tpl-table-black-operation">
                    <a href="javascript:;" @click="$router.push('')" >
                      <i class="am-icon-edit"></i> 确定
                    </a>
                    <a href="javascript:;" @click="$router.push('')" >
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
    data:function(){
      return {
        tableData:[],
        total:0,
        pageSize:10,
        pageNo:1,
        query:{},
        classId:''
      }
    },
    props: ['classId'],
    components: {
      Pagination
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      if (this.classId) this.loadTableData(this.classId,this.pageNo);
    },
    methods:{
      search:function(){
        this.loadTableData(this.classId,this.pageNo)
      },
      loadTableData:function(classId,pageNo){
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminRoomListForClassArrangement,$.extend({
          classId:classId,
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
      }
    }
  }
</script>

