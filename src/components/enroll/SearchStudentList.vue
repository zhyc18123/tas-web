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

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-6 am-u-end">
            <div class="am-form-group">
              <button class="am-btn  am-btn-default am-btn-success  am-icon-search " type="button" @click="search">查询</button>
              <button class="am-btn  am-btn-default am-btn-success " type="button" @click="$router.push('/main/enroll/student/add')" ><span class="am-icon-plus"></span>新增学员</button>
            </div>
          </div>
          <div class="am-u-sm-12" v-if="tableData&&tableData.length>0">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                fixed
                label="学号"
                min-width="150">
                <template scope="scope">
                  {{scope.row.studentNo }}
                </template>
              </el-table-column>
              <el-table-column
                fixed
                prop="name"
                label="姓名"
                min-width="100">
              </el-table-column>

              <el-table-column
                fixed
                prop="phoneNo"
                label="手机号码"
                min-width="150">
              </el-table-column>
              <el-table-column
                label="出生日期"
                min-width="150">
                <template scope="scope">
                  {{scope.row.birthday | formatDate }}
                </template>
              </el-table-column>
              <el-table-column
                prop="gradeName"
                label="年级"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="school"
                label="就读学校"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="location"
                label="地区"
                min-width="100">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template scope="scope">
                  <el-button size="small" @click.native="$router.push('/main/enroll/student/reg/'+scope.row.studentId)">确认</el-button>
                </template>
              </el-table-column>
            </el-table>
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
