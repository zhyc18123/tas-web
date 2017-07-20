<template>
  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
    <div class="am-u-sm-12 am-scrollable-horizontal">
      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">校区名：</div>
        <div class="am-u-sm-10">{{tableData.campusName}}</div>
      </div>
      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">联系人：</div>
        <div class="am-u-sm-10">{{tableData.username}}</div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">联系人手机：</div>
        <div class="am-u-sm-10">{{tableData.userPhoneNo}}</div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">详细地址：</div>
        <div class="am-u-sm-10">{{tableData.address}}</div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">成本（元/月）：</div>
        <div class="am-u-sm-10">{{tableData.unitPrice}}</div>
      </div>

      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">申请日期：</div>
        <div class="am-u-sm-10">{{tableData.createTime | formatTime}}</div>
      </div>
<!--

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
-->

    <!--  <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">审核状态：</div>
        <div class="am-u-sm-10">
          <div>{{tableData.status==0?'待审核':tableData.status==1?'通过':'不通过'}}</div>
        </div>
      </div>-->



      <div class="am-g am-text-left">
        <div class="am-u-sm-2 am-text-right">审核结果：</div>
        <div class="am-u-sm-10">
          <input type="radio" value="1" v-model="tableData.state">审核通过&nbsp;&nbsp;&nbsp;
          <input type="radio" value="2" v-model="tableData.state">驳回
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
    props: ['campusId'],
    created: function () {
     // this.loadTableData(this.campusId)
    },
    watch:{
      campusId:function (val) {
        this.loadTableData(val)
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    methods: {
      loadTableData: function (campusId) {
        var _this = this
        if(campusId) {
          io.post(io.apiAdminShowCampusDetail, {
            campusId: campusId
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
        io.post(io.apiAdminAuditCampus,{
            'campusId': _this.tableData.campusId,
            'state': _this.tableData.state,
            'remarks':_this.tableData.remarks
          },function (ret) {
          if (ret.success){
            _this.$alert('审批成功')
            _this.$root.$emit('campusAudit:new')
          }else {
            _this.$alert(ret.desc)
          }
        })
        _this.$emit('changeCampusState')
      }
    }
  }


</script>
