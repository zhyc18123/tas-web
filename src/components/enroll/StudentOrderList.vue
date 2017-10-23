<template>
  <div class="am-u-sm-12">

    <el-table
      :data="tableData"
      border
      stripe
      style="min-width: 100%">
      <el-table-column
        fixed
        prop="courseOrderId"
        label="订单编号"
        min-width="200">
      </el-table-column>
      <el-table-column
        label="订单来源"
        min-width="100">
        <template scope="scope">
          {{ scope.row.regFrom == 0 ? '线下' : '线上' }}
        </template>
      </el-table-column>
      <el-table-column
        label="缴费时间"
        min-width="200">
        <template scope="scope">
          {{scope.row.updateTime | formatTime}}
        </template>
      </el-table-column>
      <el-table-column
        prop="counselorName"
        label="咨询师"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="totalAmount"
        label="总金额"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="payableAmount"
        label="应缴金额"
        min-width="100">
      </el-table-column>
      <el-table-column
        label="优惠金额"
        min-width="100">
        <template scope="scope">
          {{ ( scope.row.totalAmount - scope.row.payableAmount ) | formatNumber(2)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="paidAmount"
        label="已缴金额"
        min-width="100">
      </el-table-column>
      <el-table-column
        label="欠费金额"
        min-width="100">
        <template scope="scope">
          {{ ( scope.row.payableAmount-scope.row.paidAmount ) | formatNumber(2)}}
        </template>
      </el-table-column>
      <el-table-column
        label="缴费状态"
        min-width="100">
        <template scope="scope">
          {{scope.row.chargingStatus == 0 ? '未缴费' : (scope.row.chargingStatus == 1 ? '欠费' : ( scope.row.chargingStatus == 2 ? '已缴费' : '已撤销' )) }}
                </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="320">
        <template scope="scope">
          <el-button size="small" :disabled="scope.row.regFrom == 1 || scope.row.chargingStatus == 2 ||  scope.row.chargingStatus == 4" @click.native="showDetail(scope.row.courseOrderId)">缴费</el-button>
          <el-button size="small" :disabled="scope.row.regFrom == 1 || scope.row.chargingStatus != 0" @click.native="cancel(scope.row.courseOrderId)">撤销</el-button>
          <el-button size="small" :disabled="scope.row.chargingStatus == 4" @click.native="showDetail(scope.row.courseOrderId)">订单详情</el-button>
          <el-button size="small" :disabled="scope.row.chargingStatus == 4" @click.native="printCert(scope.row.courseOrderId)">打印听课证</el-button>
        </template>
      </el-table-column>
    </el-table>


    <course-order ref="courseOrder" @completed="loadTableData(1)" ></course-order>

    <window ref="cert" title="听课证">

      <div style="height:608px;" id="certIframe">

      </div>

      <div style="height:5%;padding-top: 4px ;">
        <button type="button" class="am-btn am-btn-primary" @click="confirmPrint">确定打印</button>
      </div>

    </window>

    <div class="am-u-lg-12 am-cf">
      <div class="am-fr">
        <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                    @paging="loadTableData"/>
      </div>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import conf from '../../lib/conf'

  import Pagination from '../base/Pagination'
  import CourseOrder from './CourseOrder'

  export default{
    data : function () {
      return{
        courseOrderId: '',
        tableData:[],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        studentId:'',
      }

    },
    components: {
      Pagination,
      'course-order' : CourseOrder
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function () {
      this.loadTableData(this.pageNo)
      this.$root.$on('order:new',()=>{
        this.loadTableData(1)
      })
      this.$root.$on('order:pay:success',()=>{
        this.loadTableData()
      })
      window._apiAdminStudentClassCertDetail = io.apiAdminStudentClassCertDetail + '?accessToken='+io.getHeaders().accessToken
    },
    methods:{
      loadTableData:function(pageNo){

        var studentId = this.$params('studentId')
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCourseOrderList,$.extend({
          pageNo:_this.pageNo,
          pageSize:_this.pageSize,
          studentId:studentId
        },_this.query),function(ret){
          if(ret.success){
//            alert(JSON.stringify(ret.data));
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      showDetail(courseOrderId){
        this.$refs.courseOrder.courseOrderId = courseOrderId
        this.$refs.courseOrder.show()
      },
      cancel(courseOrderId){
        var _this = this
        this.$confirm('确定撤销订单',function(){
          _this.$showLoading()
          io.post(io.apiAdminCancelCourseOrder,{
            courseOrderId
          },function(ret){
            _this.$hiddenLoading()
            if(ret.success){
              _this.loadTableData(1)
            }else{
              _this.$alert(ret.desc)
            }
          })
        })

      },
      printCert:function(courseOrderId){
        this.courseOrderId = courseOrderId
        $('#certIframe').html('<iframe height="100%" src="./static/cert/index.html?courseOrderId='+courseOrderId+'" width="100%" frameborder="0"></iframe>')
        this.$refs.cert.show({
          width:810,
          height:700
        })
      },
      confirmPrint:function(){
        var frame = $("#certIframe iframe")[0];
        var _this = this;
        io.post(io.apiAdminStudentClassCertDetail,{
          courseOrderId:this.courseOrderId
        },function(ret){
          if(ret.success){
            frame.contentWindow.focus()
            frame.contentWindow.print(ret.data);
            _this.$refs.cert.close()
          }else{
            _this.$alert(ret.desc)
          }
        })
      }


    }
  }

</script>
