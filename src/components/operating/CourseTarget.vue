<template>
  <div class="m-input-main-income">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">班级目标</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <div class="widget-body  am-fr">
          <toolbar :isAreaTeam="true" :isBusTeam="true" @search="search"></toolbar>
          <div class="am-u-sm-12" v-show="!empty">
            <div>
              <el-table
                :data="tableData"
                border
                empty-text="暂无数据"
                stripe
                style="min-width: 100%">
                <el-table-column
                  prop="periodName"
                  label="期数">
                </el-table-column>
                <el-table-column
                  prop="className"
                  label="班级名称">
                </el-table-column>
                <el-table-column
                  prop="campusName"
                  label="校区">
                </el-table-column>
                <el-table-column
                  prop="subjectName"
                  label="学科">
                </el-table-column>
                <el-table-column
                  prop="gradeName"
                  label="年级">
                </el-table-column>
                <el-table-column
                  prop="teacherNames"
                  label="教师">
                </el-table-column>
                <el-table-column
                  class-name="input-cell"
                  label="目标顺期续读率">
                  <template scope="scope">
                    <el-input v-model="scope.row.sequentialTargetRate"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  class-name="input-cell"
                  label="目标跨期续读率">
                  <template scope="scope">
                    <el-input v-model="scope.row.stepTargetRate"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  class-name="target"
                  align="center"
                  label="操作">
                  <template scope="scope">
                    <div class="save-btn">
                      <el-button size="small" @click.native="handleSave(scope.row)">保存</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div style="padding-left: 10px" v-show="empty">当前年份：{{year | formatDate('YYYY')}}，还没有设置期数。
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
  import Toolbar from '../base/Toolbar.vue'
  import Pagination from '../base/Pagination.vue'
  import moment from 'moment'
  export default{
    components: {
      Pagination,
      Toolbar
    },
    data:function(){
      return {
        tableData:[],
        empty: false,
        year: '',
        query: [],
        pageNo: 1,
        pageSize: 10,
        total: 0
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    computed: {

    },
    created:function(){
      this.loadTableData(1)
    },

    methods:{
    	search(query) {
    		this.query = query
        this.loadTableData(1)
      },
      handleSave(list) {
        var _this = this,
          data = {
            classId: list.classId,
            sequentialTargetRate: list.sequentialTargetRate,
            stepTargetRate : list.stepTargetRate
          }
        _this.$showLoading()
        io.post(io.saveClassTarget,data,function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            _this.$alert('保存成功')
            _this.loadTableData()
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      loadTableData:function(pageNo){
        var _this = this;
        _this.$showLoading()
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.classTargetList,Object.assign({},{
          pageNo:this.pageNo,
          pageSize:this.pageSize,
        },_this.query),function(ret){
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
    td.input-cell .cell{
      padding: 0;
    }
  }
</style>
