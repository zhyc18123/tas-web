<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">学生列表</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">
            <div class="am-form-group">
              <input type="text" class="am-form-field" placeholder="请输入学生编号／姓名／手机号"  v-model="query.keyword">
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
            <div class="am-form-group">
              <button class="am-btn  am-btn-default am-btn-success  am-icon-search " type="button" @click="search">查询</button>
              <button class="am-btn  am-btn-default am-btn-success " type="button" @click="$router.push('/main/enroll/student/add')" v-if="hasPermission('add')"><span class="am-icon-plus"></span>新增学员</button>
            </div>
          </div>
          <div class="am-u-sm-12 am-scrollable-horizontal" v-if="tableData&&tableData.length>0">
            <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
              <thead>
              <tr>
                <th>姓名</th>
                <th>学号</th>
                <th>手机号码</th>
                <th>出生日期</th>
                <th>年级</th>
                <th>就读学校</th>
                <th>地区</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in tableData" :key="item.studentId">
                <td>{{item.name}}</td>
                <td>{{item.studentNo }}</td>
                <td>{{item.phoneNo}}</td>
                <td>{{item.birthday | formatDate }}</td>
                <td>{{item.gradeName}}</td>
                <td>{{item.school}}</td>
                <td>{{item.location}}</td>
                <td>
                  <div class="tpl-table-black-operation">
                    <a href="javascript:;" @click="$router.push('/main/enroll/student/reg/'+item.studentId)" v-if="hasPermission('edit')">
                      <i class="am-icon-edit"></i> 确认
                    </a>
                  </div>
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
        total: 0,
        pageSize: 10,
        pageNo: 1,
        query:{}
      }
    },
    components: {
      Pagination
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    methods:{
      search:function(){
        if(!this.query.keyword){
          this.$alert('请输入学生编号／姓名／手机号')
          return
        }
        this.loadTableData()
      },
      loadTableData:function(pageNo){
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminSearchStudent,$.extend({
          pageNo:_this.pageNo,
          pageSize:_this.pageSize
        },_this.query),function(ret){
          if(ret.success){
            _this.total = ret.data.total
            _this.tableData = ret.data.list;
          }else{
            _this.$alert(ret.desc)
          }
        })
      }

    }
  }


</script>
