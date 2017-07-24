<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">优惠不可叠加规则</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
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
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>不可同时优惠
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <ul id="treeDemo" class="ztree"></ul>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>备注
              </label>
              <div class="am-u-sm-9 input-field  am-u-end">
                <textarea v-model="formData.remark"></textarea>
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
  import conf from '../../lib/conf'

  require('../../../static/ztree/zTreeStyle.css')
  require('../../../static/ztree/jquery.ztree.all.min.js')

  export default{
    data(){
      return {
        formData: {
          discountExclusiveRuleId: this.$params('discountExclusiveRuleId'),
          switchStatus : 1
        }
      }
    },
    created: function () {
      this.loadDiscountRule()
      //this.loadDetail()

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

        var exclusiveIds = []
        for (var i = 0; i < sNodes.length; i++) {
          var idParts = sNodes[i].id.split(':')
          if (idParts[1] == 'r') {
            exclusiveIds.push(idParts[0])
          }
        }

        var _this = this
        _this.formData.exclusiveRuleIds = exclusiveIds.join(',')
        io.post(io.apiAdminDiscountSaveOrUpdateExclusiveRule, _this.formData,
          function (ret) {
            complete.call()
            if (ret.success) {
              _this.$toast('OK')
              _this.$router.push('/main/discount/exclusiveRule/list')
            } else {
              _this.$alert(ret.desc)
            }
          },
          function () {
            complete.call()
            _this.$alert('请求服务器失败')
          })
      },
      loadDetail: function () {
        if (!this.formData.discountExclusiveRuleId) {
          return
        }
        var _this = this
        io.post(io.apiAdminDiscountExclusiveRuleDetail, {discountExclusiveRuleId: this.formData.discountExclusiveRuleId},
          function (ret) {
            if (ret.success) {
              var ruleIds = ret.data.exclusiveRuleIds.split(',')
              for (var i = 0; i < ruleIds.length; i++) {
                var ruleId = ruleIds[i]
                var node = _this.$zTree.getNodeByParam('id', ruleId + ':r' )
                _this.$zTree.checkNode(node, true, true )
              }
              _this.formData = ret.data
            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })
      },
      loadDiscountRule: function () {
        var _this = this
        io.post(io.apiAdminDiscountDiscountRuleTree, {},
          function (ret) {
            if (ret.success) {
              function toZNodes(resourceList, pId) {
                var nodes = [];
                for (var i = 0; i < resourceList.length; i++) {
                  var resource = resourceList[i]
                  var node = {
                    id: resource.categoryId ? resource.categoryId + ":c" : resource.ruleId + ":r",
                    pId: pId,
                    name: resource.name
                  }

                  if (resource.ruleList) {
                    var ns = toZNodes(resource.ruleList, node.id)
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
