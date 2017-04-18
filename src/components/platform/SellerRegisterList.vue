<template>
  <div class="am-u-sm-12 am-scrollable-horizontal">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">服务商注册审核管理</div>
      </div>
      <div class="widget-body am-fr">
        <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
          <thead>
          <tr>
            <th>序号</th>
            <th>商家名称</th>
            <th>手机号码</th>
            <th>注册时间</th>
            <th>服务类型</th>
            <th>服务区域</th>
            <th>审批状态</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="(item,index) in tableData" :key="item.merchantId">
            <td>{{index+1}}</td>
            <td>{{item.merchantName}}</td>
            <td>{{item.phoneNo}}</td>
            <td>{{item.createTime | formatTime}}</td>
            <td>{{item.name}}</td>
            <td>{{item.serviceArea}}</td>
            <td>{{item.status==0?'未审批':(item.status==1?'审批通过':'审批不通过')}}</td>
            <td>
              <div class="tpl-table-black-operation">
                <a href="javascript:;" @click="edit(item.merchantId)" v-if="item.status==0">
                  <i class="am-icon-edit"></i> 审批
                </a>
                <span v-else="item.status==0">{{item.status==1?'审批通过':'审批不通过'}}</span>
                <!--<a href="javascript:;" @click="del(merchantId)">
                  <i class="am-icon-remove"></i> 删除
                </a>-->
              </div>
            </td>
          </tr>
          </tbody>
        </table>

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
        merchantId:''
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
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminServiceMerchantList,{
          pageSize:_this.pageSize,
          pageNo:_this.pageNo
        },function (ret) {
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


