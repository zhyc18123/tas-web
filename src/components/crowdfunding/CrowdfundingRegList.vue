<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">报名列表</div>
          <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
        </div>

      <div class="widget-body am-fr">
        <div class="am-u-sm-12">
          <el-table
           :data="classData"
            border
            stripe
            style="min-width: 100%">
             <el-table-column
                prop="deposit"
                label="预约金"
                min-width="150">
              </el-table-column>
               <el-table-column
                label="报名截止时间"
                min-width="150">
                <template scope="scope">
                  {{scope.row.endRegTime | formatTime}}
                </template>
              </el-table-column>
               <el-table-column
                prop="currentPrice"
                label="报名截止价格"
                min-width="150">
                <template scope="scope">
                  {{scope.row.crowdfundingStatus == 1 ? scope.row.currentPrice :''}}
                </template>
              </el-table-column>
               <el-table-column
                label="众筹余款"
                min-width="150">
                <template scope="scope">
                  {{scope.row.crowdfundingStatus == 1 ? (scope.row.currentPrice - scope.row.deposit):''}}
                </template>
              </el-table-column>
               <el-table-column
                prop="crowdfundingStatus"
                label="众筹状态"
                min-width="150">
                <template scope="scope">
                  {{scope.row.crowdfundingStatus == 0 ? '众筹中': scope.row.crowdfundingStatus == 1 ?  '众筹成功':'众筹失败'}}
                </template>
              </el-table-column>
          </el-table>
      </div>


        </div>

        <div class="widget-body am-fr">
          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                prop="studentName"
                label="姓名"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="phoneNo"
                label="联系方式"
                min-width="150">
              </el-table-column>
              <el-table-column
                label="预约金支付日期"
                min-width="150">
                <template v-if="scope.row.chargingStatus == 2 " scope="scope">
                  {{scope.row.depositPayDate | formatTime}}
                </template>
              </el-table-column>
              <el-table-column
                label="余款支付状态"
                min-width="150">
              <template scope="scope">
                  {{scope.row.amountPayDate == null ? '未支付':'已支付'}}
              </template>
              </el-table-column>
               <el-table-column
                label="余款支付日期"
                min-width="150">
                <template scope="scope">
                  {{scope.row.amountPayDate | formatTime }}
                </template>
              </el-table-column>
              <el-table-column
                label="学生状态"
                min-width="150">
                <template scope="scope">
                  {{scope.row.regStatus == 0 ? '在读' : scope.row.regStatus == 1 ? '转班' : scope.row.regStatus == 2 ? '退账户' :  scope.row.regStatus == 3 ? '退班退费' :'' }}
                </template>
              </el-table-column> 
              <el-table-column
                label="退款"
                min-width="150">
                <template scope="scope">
                  {{scope.row.refundStatus == 0 ? '未返还' : scope.row.refundStatus == 1 ? '已返还' : '' }}
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
    data: function () {
      return {
        tableData: [],
        classData:[],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        query: {
          regStatus: '0',
          classId: ''
        }
      }
    },
    components: {
      Pagination
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.query.classId = this.$params('classId')
      this.loadTableData(this.pageNo)
      this.loadClassData()
    },
    methods: {
      search: function () {
        this.loadTableData(1)
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCrowdfundingClassRegList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize
        }, _this.query), function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadClassData:function(){
        var _this = this
        io.post(io.apiAdminCrowdfundingClassEdit,{classId: _this.query.classId}
          ,function(ret){
          if(ret.success){
            if(0 == _this.classData.length){
               _this.classData.push(ret.data.crowdfundingClass)
            }
          }else{
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>