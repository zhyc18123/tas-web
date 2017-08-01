<template>
  <div class="am-u-sm-12 am-scrollable-horizontal">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">校区审核</div>
      </div>

      <div class="widget-body  am-fr">
        <div class="am-u-sm-12 am-form search-div">

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">
            <div class="am-form-group">
              <label class="am-u-sm-4 am-padding-top-xs ">
                校区名:
              </label>
              <div class="am-u-sm-8 am-u-end  input-field">
                <input type="text" name="campusName" v-model="query.campusName" placeholder=""/>
              </div>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">
            <div class="am-form-group">
              <label class="am-u-sm-4 am-padding-top-xs ">
                联系人:
              </label>
              <div class="am-u-sm-8 am-u-end  input-field">
                <input type="text" name="username" v-model="query.username" placeholder=""/>
              </div>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-2">
            <div class="am-form-group">
              <label class="am-u-sm-4 am-padding-top-xs ">
                手机号:
              </label>
              <div class="am-u-sm-8 am-u-end  input-field">
                <input type="text" name="userPhoneNo" v-model="query.userPhoneNo" placeholder=""/>
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
                <select2 v-model="query.state">
                  <option value="">请选择</option>
                  <option value="0">待审核</option>
                  <option value="1">通过</option>
                  <option value="2">不通过</option>
                </select2>
              </div>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-10 am-u-end">
            <div class="am-form-group">

            </div>

          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-1 am-u-end">
            <div class="am-form-group">
              <button type="button" class="am-btn am-btn-default am-btn-success"
                      @click="$router.push('/main/sys/campus/new/add')"><span class="am-icon-plus"></span>新增
              </button>
            </div>
          </div>
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-1 am-u-end">
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
            prop="campusName"
            label="校区名"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="username"
            label="联系人"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="userPhoneNo"
            label="联系人手机"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="city"
            label="城市"
            min-width="100">
          </el-table-column>

          <el-table-column
            prop="address"
            label="详细地址"
            min-width="100">
          </el-table-column>

          <el-table-column
            prop="unitPrice"
            label="成本(元/月)"
            min-width="100">
          </el-table-column>

          <el-table-column
            label="申请日期"
            min-width="100">
            <template scope="scope">
              {{scope.row.createTime | formatTime}}
            </template>
          </el-table-column>

          <el-table-column

            label="审核状态"
            min-width="100">
            <template scope="scope">
              {{scope.row.state==1?"通过":scope.row.state==2?"不通过":"待审核"}}
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
          <!--<el-table-column
            label="操作"
            width="120">
            <template scope="scope">
              <el-button size="small" :disabled="scope.row.status!=0 && scope.row.status!=2"
                         @click.native="edit(scope.row.merchantId)">审核
              </el-button>
              <el-button size="small" :disabled="scope.row.status!=0 && scope.row.status!=2"
                         @click.native="edit(scope.row.merchantId)">编辑
              </el-button>
              <el-button size="small" :disabled="scope.row.status!=0 && scope.row.status!=2"
                         @click.native="edit(scope.row.merchantId)">管理教室
              </el-button>
            </template>
          </el-table-column>
        -->

          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template scope="scope">
              <el-dropdown>
                        <span class="el-dropdown-link">
                          操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                <el-dropdown-menu slot="dropdown">
                  <template >
                    <el-dropdown-item  :disabled="scope.row.state == 1" @click.native="edit(scope.row.campusId)">审核</el-dropdown-item>
                  </template>
                  <template >
                    <el-dropdown-item    @click.native="$router.push( '/main/sys/edit/campus/' + scope.row.campusId)"> 编辑
                    </el-dropdown-item>
                    <el-dropdown-item  :disabled="scope.row.state != 1"  @click.native="$router.push('/main/sys/room/new/list?campusId='+scope.row.campusId)">管理教室
                    </el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>




          <window ref="campusAudit" title="校区审批">
          <change-campus-state :campusId="campusId"
                                  @changeCampusState="$refs.campusAudit.close()"></change-campus-state>
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

<style scope>

  .search-div .am-form-group {
    overflow: hidden;
  }
  .btn-check {
    float: right;
    margin-right: 46px;
  }
</style>

<script>
  import io from '../../lib/io'
  import Pagination from '../base/Pagination'
  import ChangeCampusState from './ChangeCampusState'
  export default{
    data: function () {
      return {
        tableData: [],
        pageNo: 1,
        pageSize: 10,
        total: 0,
        campusId: '',
        query: {}
      }
    },
    components: {
      Pagination,
      'change-campus-state': ChangeCampusState
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo)
      var _this = this
      this.$root.$on('campusAudit:new', function () {
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
        io.post(io.apiAdminAuditCampusList, $.extend({
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
      edit: function (campusId) {
        var _this = this
        _this.campusId =campusId ;
        _this.$refs.campusAudit.show({
          width: 1000,
          height: 600
        })
      }
    },

  }

</script>


