<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">优惠信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>


            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>优惠规则
              </label>
              <div class="am-u-sm-3 input-field  am-u-end">
                <select2 required v-model="formData.discountRuleId">
                  <option value="">请选择优惠规则</option>
                  <option v-for="item in discountRuleList" :value="item.discountRuleId">{{item.name}}</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group" v-if="formData.discountRuleId">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>参数
              </label>
              <div class="am-u-sm-9  am-u-end">
                <div class="am-g am-margin-bottom-xs am-padding-left-xs" v-for="(param,index) in formData.params">
                  <div class="am-u-sm-2 input-field">
                    <select2 required v-model="param.type" disabled>
                      <option value="">数据类型</option>
                      <option value="string">字符串</option>
                      <option value="int">整数</option>
                      <option value="float">浮点数</option>
                      <option value="date">日期</option>
                    </select2>
                  </div>
                  <div class="am-u-sm-2 input-field">
                    <input type="text" class="am-form-field" placeholder="参数名" required v-model="param.name" disabled>
                  </div>
                  <div class="am-u-sm-3 input-field">
                    <input type="text" class="am-form-field" placeholder="默认值" required v-model="param.value">
                  </div>
                  <div class="am-u-sm-2 input-field am-u-end">
                    <input type="text" class="am-form-field" placeholder="说明" required v-model="param.remark" disabled>
                  </div>
                </div>
                <span class="am-text-xs">折扣参数使用百分比，如95%</span>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>优惠名称
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入名称" required v-model="formData.name">
              </div>
            </div>


            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>开关状态
              </label>
              <div class="am-u-sm-3 input-field  am-u-end">
                <select2 required v-model="formData.switchStatus">
                  <option value="">请选择开关状态</option>
                  <option value="0">关闭</option>
                  <option value="1">启用</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>生效开始时间
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <date-time-picker v-model="formData.effectiveStartTime" format="YYYY-MM-DD HH:mm" >
                  <input data-am-datetimepicker class="am-form-field" placeholder="请选择生效开始时间">
                </date-time-picker>
              </div>
            </div>


            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>生效结束时间
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <date-time-picker v-model="formData.effectiveEndTime" format="YYYY-MM-DD HH:mm" >
                  <input data-am-datetimepicker class="am-form-field" placeholder="请选择生效结束时间">
                </date-time-picker>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>区域&业务组
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <ul id="treeDemo" class="ztree"></ul>
              </div>
            </div>

            <div class="am-form-group">
              <div class="am-u-sm-9 am-u-sm-push-3">

                <button type="submit" class="am-btn am-btn-primary">提交</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import io from '../../lib/io'
  import util from '../../lib/util'
  import conf from '../../lib/conf'

  require('../../../static/ztree/zTreeStyle.css')
  require('../../../static/ztree/jquery.ztree.all.min.js')

  export default{
    data(){
      return {
        discountRuleList: [],
        formData: {
          discountId : this.$params('discountId'),
          discountRuleId : '',
          name :'',
          switchStatus : 1,
          discountType : 0,
          params:[{}]
        }
      }
    },
    created: function () {

      this.loadAreaTeamBusTeamTree()
      this.loadDiscountRuleList()
      //this.loadDetail()


    },
    watch:{
      'formData.discountRuleId':function(val,oVal){
          if(val){
            var rule  = this.discountRuleList.filter(item => item.discountRuleId == val )[0]
            if(this.formData._1 ){
                delete this.formData._1
            }else{
              this.formData.params = JSON.parse(rule.params)
              this.formData.name = rule.name
            }

          }
      }
    },
    mounted: function () {
      var _this = this;
      $('#' + this.id).validator({
        onValid: function (validity) {
          $(validity.field).closest('.input-field').find('.am-alert').hide();
        },
        onInValid: function (validity) {
          var $field = $(validity.field);
          var $group = $field.closest('.input-field');
          var $alert = $group.find('.am-alert');
          // 使用自定义的提示信息 或 插件内置的提示信息
          var msg = $field.data('validationMessage') || this.getValidationMessage(validity);

          if (!$alert.length) {
            $alert = $('<div class="am-alert am-alert-danger"></div>').hide().appendTo($group);
          }

          $alert.html(msg).show();
        },
        submit: function (e) {
          e.preventDefault();
          var $submitBtn = $('button[type=submit]', e.target);
          $submitBtn.attr("disabled", "disabled")
          _this.$showLoading()
          var formValidity = this.isFormValid();
          var complete = function () {
            _this.$hiddenLoading()
            _this.$root.$emit('reloadConfig')
            $submitBtn.removeAttr("disabled", "disabled")
          }
          if (formValidity) {
            _this.save(complete);
          } else {
            complete.call()
          }
        }
      });
    },
    methods: {
      save: function (complete) {

        var sNodes = this.$zTree.getCheckedNodes()
        if (!sNodes || sNodes.length == 0) {
          this.$alert('至少选择一项')
          complete.call()
          return
        }

        var areaTeamOrBusTeams = []
        for (var i = 0; i < sNodes.length; i++) {
          var p = {}
          var idParts  = sNodes[i].id.split(':')
          if(idParts[1] == 'a' ){
            p.areaTeamId = idParts[0]
          }else{
            p.busTeamId = idParts[0]
          }
          areaTeamOrBusTeams.push(p)
        }

        var data = Object.assign({},this.formData)

        for(var p of data.params ){
          if(p.type  == 'int' && !/^\d+$/.test(p.value )){
            this.$alert(p.name +'的值只能是整数');
            complete()
            return
          }else if(p.type == 'float' && !/^\d+(.\d+)?$/.test(p.value)){
            this.$alert(p.name +'的值只能是浮点数');
            complete()
            return
          }else if(p.type  == 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(p.value)){
            this.$alert(p.name +'的值只能是日期，如2017-01-01');
            complete()
            return
          }
        }

        data.effectiveAreaBus = JSON.stringify(areaTeamOrBusTeams)
        data.params = JSON.stringify(data.params)

        var _this = this

        io.post(io.apiAdminDiscountSaveOrUpdateDiscount,data,
          function (ret) {
            complete.call()
            if (ret.success) {
              _this.$toast('OK')
              _this.$router.push('/main/discount/discount/list')
            } else {
              _this.$alert(ret.desc)
            }
          },
          function () {
            complete.call()
            _this.$alert('请求服务器失败')
          })
      },
      loadDetail:function(){
        if(!this.formData.discountId){
            return
        }
        var _this = this
        io.post(io.apiAdminDiscountDiscountDetail, {discountId: this.formData.discountId},
          function (ret) {
            if (ret.success) {
              if(ret.data.effectiveStartTime){
                ret.data.effectiveStartTime = util.formatDate(ret.data.effectiveStartTime , 'YYYY-MM-DD HH:mm')
              }
              if(ret.data.effectiveEndTime){
                ret.data.effectiveEndTime = util.formatDate(ret.data.effectiveEndTime , 'YYYY-MM-DD HH:mm')
              }

              var effectiveAreaBus = JSON.parse( ret.data.effectiveAreaBus )

              for (var i = 0; i < effectiveAreaBus.length; i++) {
                var p = effectiveAreaBus[i]
                var node = _this.$zTree.getNodeByParam('id', p.areaTeamId ? p.areaTeamId + ':a' : p.busTeamId + ':b'  )
                _this.$zTree.checkNode(node, true, false )
              }

              ret.data.params = JSON.parse(ret.data.params)
              ret.data._1 = true
              _this.formData = ret.data

            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })
      },
      loadDiscountRuleList: function () {
        io.post(io.apiAdminDiscountRuleList, {
            pageNo: 1,
            pageSize: 1000
          },
          (ret) => {
            if (ret.success) {
              this.discountRuleList = ret.data.list.filter(item => item.status  == 1 )
            } else {
              this.$alert(ret.desc)
            }
          },
          () => {
            this.$alert('请求服务器失败')
          })
      },
      loadAreaTeamBusTeamTree: function () {
        var _this = this
        io.post(io.apiAdminDiscountAreaTeamBusTeamOrgTree, {},
          function (ret) {
            if (ret.success) {
              function toZNodes(resourceList, pId) {
                var nodes = [];
                for (var i = 0; i < resourceList.length; i++) {
                  var resource = resourceList[i]
                  var node = {
                    id: resource.areaTeamId ? resource.areaTeamId + ":a" : resource.busTeamId + ":b",
                    pId: pId,
                    name: resource.name
                  }

                  if (resource.busTeamList) {
                    var ns = toZNodes(resource.busTeamList, node.id)
                    node.open = true
                    nodes.push.apply(nodes, ns)
                  }
                  nodes.push(node)
                }
                return nodes;
              }

              var zNodes = toZNodes(ret.data);
              _this.initZTree(zNodes)
              _this.loadDetail()
            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })
      },
      initZTree: function (zNodes) {
        this.$zTree = $.fn.zTree.init($("#treeDemo"), {
          check: {
            enable: true,
            chkboxType: {"Y": "ps", "N": "ps"}
          },
          data: {
            simpleData: {
              enable: true
            }
          }
        }, zNodes);
      },
    }
  }

</script>
