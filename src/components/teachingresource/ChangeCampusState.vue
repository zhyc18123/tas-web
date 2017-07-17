<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">用户名：</div>
        <div class="am-u-sm-10">{{tableData.merchantName}}</div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">手机号码：</div>
        <div class="am-u-sm-10">{{tableData.phoneNo}}</div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">角色：</div>
        <div class="am-u-sm-10">{{tableData.roleType==null?'—':tableData.roleType==0?'区域':tableData.roleType==1?'业务组':'教师'}}</div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">姓名：</div>
        <div class="am-u-sm-10">{{tableData.teacherName==null?'—':tableData.teacherName}}</div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">身份证：</div>
        <div class="am-u-sm-10">{{tableData.idNo==null?'—':tableData.idNo}}</div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">所属业务组：</div>
        <div class="am-u-sm-10">
          <div>{{tableData.belongBusTeamName==null?'—':tableData.belongBusTeamName}}</div>
        </div>
      </div>
      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">所属区域：</div>
        <div class="am-u-sm-10">
          <div>{{tableData.belongAreaTeamName}}</div>
        </div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">申请日期：</div>
        <div class="am-u-sm-10">
          <div>{{tableData.createTime | formatDate}}</div>
        </div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">审核日期：</div>
        <div class="am-u-sm-10">
          <div>{{tableData.updateTime==tableData.createTime?'—':(tableData.updateTime | formatDate)}}</div>
        </div>
      </div>

    <!--  <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">审核状态：</div>
        <div class="am-u-sm-10">
          <div>{{tableData.status==0?'待审核':tableData.status==1?'通过':'不通过'}}</div>
        </div>
      </div>-->



      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">审核结果：</div>
        <div class="am-u-sm-10">
          <input type="radio" value="1" v-model="tableData.status">审核通过&nbsp;&nbsp;&nbsp;
          <input type="radio" value="2" v-model="tableData.status">驳回
        </div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">备 &nbsp; 注：</div>
        <div class="am-u-sm-10">
          <textarea v-model="tableData.remarks"></textarea>
        </div>
      </div>

      <div class="am-u-sm-12 am-text-center am-margin-top-lg">
        <button type="button" class="am-btn am-btn-primary" @click="confirmToRefund">确定</button>
        <a href="javascript:void(0)" data-am-modal-close>
          <button class="am-btn am-btn-primary">取消</button>
        </a>
      </div>
    </div>


  </form>

</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData:[],
      }
    },
    props: ['merchantId'],
    created: function () {
//      this.loadTableData(this.merchantId)
    },
    watch:{
      merchantId:function (val) {
        this.loadTableData(val)
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods: {
      loadTableData: function (merchantId) {
        var _this = this
        if(merchantId) {
          io.post(io.apiAdminServiceMerchantDetail, {
            merchantId: merchantId
          }, function (ret) {
            if (ret.success) {
              _this.tableData = ret.data
            } else {
              _this.$alert(ret.desc)
            }
          })
        }

      },
      confirmToRefund: function () {
        var _this = this
        _this.tableData.createTime=''
        _this.tableData.updateTime=''
        io.post(io.apiAdminCahngeServiceMerchant,{
            'merchantId': _this.tableData.merchantId,
            'status': _this.tableData.status,
            'remarks':_this.tableData.remarks
          },function (ret) {
          if (ret.success){
            _this.$alert('审批成功')
            _this.$root.$emit('sellerRegister:new')
          }else {
            _this.$alert('审批失败')
          }
        })
        _this.$emit('changeSellerRegister')
      }
    }
  }


</script>
