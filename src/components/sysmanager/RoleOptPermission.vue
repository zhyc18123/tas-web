<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">设置操作权限</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <ul id="treeDemo" class="ztree"></ul>
        <div class="am-g">
          <div class="am-u-sm-12 am-u-sm-centered">
            <button type="button" class="am-btn am-btn-primary" @click="save">保存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  require('../../../static/ztree/zTreeStyle.css')
  require('../../../static/ztree/jquery.ztree.all.min.js')
  import io from '../../lib/io'

  export default{
    data(){
      return {}
    },
    created: function () {
      setTimeout(function () {
        var link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("type", "text/css")
        link.setAttribute("href", 'static/ztree/zTreeStyle.css')
        document.getElementsByTagName("head")[0].appendChild(link)
      })

    },
    mounted: function () {
      var _this = this
      _this.loadSysResourceList()
    },

    methods: {

      save: function () {
        var sNodes = this.$zTree.getCheckedNodes()
        if (!sNodes || sNodes.length == 0) {
          this.$alert('至少选择一项')
          return
        }
        var ids = []
        for (var i = 0; i < sNodes.length; i++) {
          ids.push(sNodes[i].id)
        }

        var _this = this
        io.post(io.apiAdminSaveRoleResource, {
            roleId: _this.$params('roleId'),
            resourceIds: ids
          },
          function (ret) {
            if (ret.success) {
              _this.$toast('OK')
              _this.$root.$emit('reloadConfig')
              _this.$router.push('/main/sys/role/list')
            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })

      },
      loadSysResourceList: function () {
        var _this = this
        io.post(io.apiAdminSysResourceList, {},
          function (ret) {
            if (ret.success) {
              function toZNodes(resourceList, pId) {
                var nodes = [];
                for (var i = 0; i < resourceList.length; i++) {
                  var resource = resourceList[i]
                  var node = {
                    id: resource.resourceId,
                    pId: pId,
                    name: resource.resourceName
                  }

                  if (resource.children) {
                    var ns = toZNodes(resource.children, node.id)
                    node.open = true
                    nodes.push.apply(nodes, ns)
                  }
                  nodes.push(node)
                }
                return nodes;
              }

              var zNodes = toZNodes(ret.data);
              _this.initZTree(zNodes)
              _this.loadRoleResourceList()
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
      loadRoleResourceList: function () {
        var _this = this
        io.post(io.apiAdminRoleResourceList, {
            roleId: _this.$params('roleId')
          },
          function (ret) {
            if (ret.success) {
              var roleResourceList = ret.data
              for (var i = 0; i < roleResourceList.length; i++) {
                var roleResource = roleResourceList[i]
                var node = _this.$zTree.getNodeByParam('id', roleResource.resourceId)
                _this.$zTree.checkNode(node, true, false)
              }
            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })
      }

    }
  }
</script>
