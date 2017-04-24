<template>
  <div class="am-u-sm-12 am-scrollable-horizontal">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">服务商注册审核管理</div>
      </div>

      <div class="widget-body  am-fr">
        <div class="am-u-sm-12 am-form">
          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-lg-offset-6">
            <div class="am-form-group tpl-table-list-select">
              <div class="am-form-group">
                <input type="text" class="am-input-lg am-from-feild" v-model="query.merchantName"
                       placeholder="商家名称"/>
              </div>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-input-group am-input-group-lg tpl-form-border-form cl-p">
              <input type="text" class="am-input-lg am-from-feild" v-model="query.phoneNo"
                     placeholder="手机号码"/>
              <span class="am-input-group-btn">
                  <button class="am-btn am-btn-default am-btn-success tpl-table-list-field am-icon-search"
                          type="button" @click="search"></button>
                </span>
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
            label="商家名称"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="phoneNo"
            label="联系电话"
            min-width="100">
          </el-table-column>
          <el-table-column
            label="注册时间"
            min-width="100">
            <template scope="scope" >
              {{scope.row.createTime | formatTime}}
            </template>
          </el-table-column>
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
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template scope="scope">
              <el-button size="small" :disabled="scope.row.status!=0" @click.native="edit(scope.row.merchantId)">审批</el-button>
            </template>
          </el-table-column>
        </el-table>

        <window ref="sellerRegister" title="服务商注册审批">
          <change-seller-register :merchantId="merchantId" @changeSellerRegister="$refs.sellerRegister.close()"></change-seller-register>
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
        tableData:[],
        pageNo:1,
        pageSize: 10,
        total:0,
        merchantId:'',
        query:{

        }
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
      this.$root.$on('sellerRegister:new',function () {
        _this.pageNo = 1
        _this.loadTableData(_this.pageNo)
      })
    },
    methods: {
      search:function () {
        this.loadTableData()
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminServiceMerchantList,$.extend({
          pageSize:_this.pageSize,
          pageNo:_this.pageNo
        },_this.query),function (ret) {
          if (ret.success){
            _this.tableData = ret.data.list
            _this.total = ret.data.total
          }else {
            _this.$alert(ret.desc)
          }
        })
      },
      edit: function (merchantId) {
        var _this = this
        _this.merchantId = merchantId;
        _this.$refs.sellerRegister.show({
          width:1000,
          height:600
        })
      }
    },

  }

</script>


