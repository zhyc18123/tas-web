<template>
  <div class="m-teach-toward">
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-fl">课酬明细</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>
        <div class="widget-body">
          <div class="am-form-group am-u-sm-12 am-form ">
            <input v-model="name" class="search-input" type="text" name="name" placeholder="请输入姓名">
            <button type="button" @click="handleSearch" class="am-btn am-btn-default am-btn-success"><span class="am-icon-search"></span>查询
            </button>
          </div>
          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                prop="index"
                label="序号"
                min-width="190">
              </el-table-column>
              <el-table-column
                prop="a"
                label="姓名"
                min-width="190">
              </el-table-column>
                <el-table-column
                prop="b"
                label="电话"
                min-width="190">
              </el-table-column>
              <el-table-column
                prop="c"
                label="身份证"
                min-width="190">
              </el-table-column>
                <el-table-column
                  prop="d"
                  label="班级名称"
                  min-width="190">
                </el-table-column>
                <el-table-column
                  prop="e"
                  label="区域"
                  min-width="190">
                </el-table-column>
                <el-table-column
                  prop="f"
                  label="业务组"
                  min-width="190">
                </el-table-column>
                <el-table-column
                  prop="g"
                  label="讲次"
                  min-width="190">
                </el-table-column>
                <el-table-column
                  prop="h"
                  label="课酬/课时（元）"
                  min-width="190">
                </el-table-column>
                <el-table-column
                  prop="i"
                  label="总课时"
                  min-width="190">
                </el-table-column>
                <el-table-column
                  prop="j"
                  label="总课酬（元）"
                  min-width="190">
                </el-table-column>
                <el-table-column
                  prop="k"
                  label="结算时间"
                  min-width="190">
                </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import io from '../../lib/io'
  import moment from 'moment'
  export default{
    data:function(){
      return {
        name: '',
        tableData:[
          {
            index: 0,
            a: '兼职',
            b: 100,
            c: '01',
            d: '01',
            e: '01',
            f: '01',
            g: '01',
            h: '01',
            i: '01',
            j: '250',
            k: '2017-20-50',
          }
        ],
      }
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
//      this.loadTableData();
//      this.loadFeeCategoryData();
    },
    methods:{
      handleSearch() {
          console.log(this.name)
      },
      loadTableData:function(){
        var _this = this,
          year;
        _this.$showLoading()
        if (_this.targetType === 0) {
          year = this.year
        } else {
          year = this.year2
        }
        io.post(io.mainAccountTargetList,{
          areaTeamId: this.areaTeamId,
          year: year,
          targetType: this.targetType,
        },function(ret){
          _this.$hiddenLoading()
          if(ret.success){
            if (_this.targetType === 0) {
              _this.tableData = ret.data
            } else {
              _this.tableData2 = ret.data
            }
          }else{
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .m-teach-toward{
    .search-input {
      width: 25%!important;
      float: left;
      margin-right: 10px;
    }
  }
</style>
