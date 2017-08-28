<template>
  <div class="am-u-sm-12 am-scrollable-horizontal">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">用户注册审核</div>
      </div>

      <div class="widget-body  am-fr">
        <div class="am-u-sm-12 am-form">

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">
            <div class="am-form-group">
              <label class="am-u-sm-4 am-padding-top-xs ">
                用户名:
              </label>
              <div class="am-u-sm-8 am-u-end  input-field">
                <input type="text" name="className" v-model="query.merchantName" placeholder=""/>
              </div>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">
            <div class="am-form-group">
              <label class="am-u-sm-4 am-padding-top-xs ">
                手机号:
              </label>
              <div class="am-u-sm-8 am-u-end  input-field">
                <input type="text" name="className" v-model="query.phoneNo" placeholder=""/>
              </div>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">
            <div class="am-form-group">
              <label class="am-u-sm-5 am-padding-top-xs ">
                申请日期:
              </label>
              <date-picker class="am-u-sm-7 am-u-end  input-field" v-model="query.beginTime">
                <input type="text" placeholder="" data-am-datepicker readonly required>
              </date-picker>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">
            <div class="am-form-group">
              <label class="am-u-sm-4 am-padding-top-xs ">
                到
              </label>
              <date-picker class="am-u-sm-7 am-u-end  input-field" v-model="query.endTime">
                <input type="text" placeholder="" data-am-datepicker readonly required>
              </date-picker>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">
            <div class="am-form-group">
              <label class="am-u-sm-5 am-padding-top-xs ">
                审核状态:
              </label>
              <div class="am-u-sm-6 am-u-end  input-field">
                <select2 v-model="query.status">
                  <option value="">请选择</option>
                  <option value="0">待审核</option>
                  <option value="1">通过</option>
                  <option value="2">不通过</option>
                </select2>
              </div>
            </div>
          </div>


          <div class="am-u-sm-12 am-u-md-12 am-u-lg-2 am-u-end">
            <div class="am-form-group">
              <button type="button" class="am-btn am-btn-default am-btn-success"
                      @click="search"><span class="am-icon-search"></span>查询
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="widget-body am-fr">

        <el-table
          :data="tableData"
          border
          stripe
          style="min-width: 100%">
          <el-table-column
            fixed
            type="index"
            label="序号"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="merchantName"
            label="用户名"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="phoneNo"
            label="手机号"
            min-width="100">
          </el-table-column>
          <el-table-column
            label="角色"
            align="center"
            min-width="60">
            <template scope="scope">
              {{scope.row.roleType==null?'─':scope.row.roleType==1?'区域':(scope.row.roleType==2?'业务组':'教师')}}
            </template>

          </el-table-column>
          <el-table-column
            align="center"
            label="姓名"
            min-width="80">
            <template scope="scope">
              {{scope.row.teacherName==null?'─':scope.row.teacherName}}
            </template>
          </el-table-column>

          <el-table-column
            label="身份证"
            align="center"
            min-width="120">
            <template scope="scope">
              {{scope.row.inNo==null?'─':scope.row.teacherName}}
            </template>
          </el-table-column>
          <el-table-column
            label="所属业务组"
            align="center"
            min-width="100">
            <template scope="scope">
              {{scope.row.belongBusTeamName==null?'─':scope.row.belongBusTeamName}}
            </template>
          </el-table-column>
          <el-table-column
            prop="belongAreaTeamName"
            label="所属区域"
            min-width="100">
          </el-table-column>


          <el-table-column
            label="申请日期"
            min-width="90">
            <template scope="scope">
              {{scope.row.createTime | formatDate}}
            </template>
          </el-table-column>
          <el-table-column
            label="审核日期"
            align="center"
            min-width="90">
            <template scope="scope">
              {{ scope.row.auditTime |  formatTime}}
            </template>
          </el-table-column>

          <el-table-column
            label="审核状态"
            min-width="100">
            <template scope="scope">
              {{scope.row.status==0?'未审核':scope.row.status==1?'通过':'不通过'}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="备注"
            min-width="200">
            <template scope="scope">
              {{scope.row.remarks==null?'—':scope.row.remarks}}
            </template>
          </el-table-column>


          <!--
                    <el-table-column
                      prop="name"
                      label="服务类型"
                      min-width="100">
                    </el-table-column>
                    <el-table-column
                      prop="serviceArea"
                      label="服务区域"
                      min-width="100">
                    </el-table-column>
                    <el-table-column
                      label="审批状态"
                      min-width="100">
                      <template scope="scope">
                        {{scope.row.status==0?'未审批':(scope.row.status==1?'审批通过':'审批不通过')}}
                      </template>
                    </el-table-column>-->
          <el-table-column
            label="操作"
            width="120">
            <template scope="scope">
              <el-button v-if="hasPermission('audit')" size="small" :disabled="scope.row.status!=0 && scope.row.status!=2"
                         @click.native="edit(scope.row.merchantId)">审批
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <window ref="sellerRegister" title="服务商注册审批">
          <change-seller-register :merchantId="merchantId"
                                  @changeSellerRegister="$refs.sellerRegister.close()"></change-seller-register>
        </window>

        <div class="am-u-lg-12 am-cf">
          <div class="am-fr">
            <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                        @paging="loadTableData"/>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import Pagination from '../base/Pagination'
  import ChangeSellerRegister from './ChangeSellerRegister'
  export default{
    data: function () {
      return {
        tableData: [],
        pageNo: 1,
        pageSize: 10,
        total: 0,
        merchantId: '',
        query: {}
      }
    },
    components: {
      Pagination,
      'change-seller-register': ChangeSellerRegister
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo)
      var _this = this
      this.$root.$on('sellerRegister:new', function () {
        _this.pageNo = 1
        _this.loadTableData(_this.pageNo)
      })
    },
    methods: {
      search: function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminServiceMerchantList, $.extend({
          pageSize: _this.pageSize,
          pageNo: _this.pageNo
        }, _this.query), function (ret) {
          if (ret.success) {
            _this.tableData = ret.data.list
            _this.total = ret.data.total
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      edit: function (merchantId) {
        var _this = this
        _this.merchantId = merchantId;
        _this.$refs.sellerRegister.show({
          width: 1000,
          height: 600
        })
      }
    },

  }

</script>


