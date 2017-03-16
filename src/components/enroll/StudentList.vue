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
              <div class="am-btn-toolbar">
                <div class="am-btn-group am-btn-group-xs">
                  <button type="button" class="am-btn am-radius am-btn-success" @click="$router.push('/main/enroll/student/add')" v-if="hasPermission('add')"><span class="am-icon-plus"></span>新增学员</button>
                </div>
              </div>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
            <div class="am-form-group tpl-table-list-select">
              <selected v-model="searchConfig.searchItem">
                <select data-am-selected="{btnSize: 'sm'}" placeholder="搜索选项">
                  <option>请选择</option>
                  <option value="studentNo">学生编号</option>
                  <option value="name">学生姓名</option>
                  <option value="phoneNo">学生手机</option>
                </select>
              </selected>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-input-group am-input-group-sm tpl-form-border-form cl-p">
              <input type="text" class="am-form-field " v-model="searchConfig.searchValue">
              <span class="am-input-group-btn">
              <button class="am-btn  am-btn-default am-btn-success tpl-table-list-field am-icon-search" type="button" @click="search"></button>
            </span>
            </div>
          </div>

          <div class="am-u-sm-12 am-scrollable-horizontal">
            <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
              <thead>
              <tr>
                <th>操作</th>
                <th>姓名</th>
                <th>学号</th>
                <th>出生日期</th>
                <th>年级</th>
                <th>就读学校</th>
                <th>短信号码</th>
                <th>城市</th>
                <th>校区</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in tableData" :key="item.studentId">
                <td>
                  <div class="tpl-table-black-operation">
                    <a href="javascript:;" @click="$router.push('/main/enroll/student/reg/'+item.studentId)" v-if="hasPermission('edit')">
                      <i class="am-icon-edit"></i> 确认
                    </a>
                  </div>
                </td>
                <td>{{item.name}}</td>
                <td>{{item.studentNo }}</td>
                <td>{{item.birthday | formatDate }}</td>
                <td>{{item.gradeName}}</td>
                <td>{{item.school}}</td>
                <td>{{item.phoneNo}}</td>
                <td>{{item.location}}</td>
                <td></td>
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
        pageSize: 5,
        pageNo: 1,
        query:{},
        searchConfig:{}
      }
    },
    components: {
      Pagination
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      this.loadTableData(this.pageNo);
    },
    methods:{
      search:function(){
        this.query={}
        if(!this.searchConfig.searchItem){
          this.$alert('请选择搜索选项')
          return
        }
        this.query[this.searchConfig.searchItem] =  this.searchConfig.searchValue
        this.loadTableData()
      },
      loadTableData:function(pageNo){

        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminStudentList,$.extend({
          pageNo:_this.pageNo,
          pageSize:_this.pageSize
        },_this.query),function(ret){
          if(ret.success){
              //alert(JSON.stringify(ret.data));
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
