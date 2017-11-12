<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">设置校区权限</div>
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
      _this.loadSysCampusDataPermissionConfig()
    },

    methods: {

      save: function () {
        var sNodes = this.$zTree.getCheckedNodes()
        if (!sNodes || sNodes.length == 0) {
          this.$alert('至少选择一项')
          return
        }

        var permission = []
        for (var i = 0; i < sNodes.length; i++) {
          var p = {}
          var idParts  = sNodes[i].id.split(':')
          if(idParts[1] == 'a' ){
            p.areaTeamId = idParts[0]
          }else{
            p.campusId = idParts[0]
          }
          permission.push(p)
        }

        var _this = this
        io.post(io.saveUserCampusDataPermission, {
            userId: _this.$params('userId'),
            permissionJSON: JSON.stringify(permission)
          },
          function (ret) {
            if (ret.success) {
              _this.$toast('OK')
              _this.$root.$emit('reloadConfig')
              _this.$router.back()
            }else{
              _this.$alert(ret.desc || '处理失败')
            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })

      },
      loadSysCampusDataPermissionConfig: function () {
        var _this = this
        io.post(io.sysCampusDataPermissionConfig, {},
          function (ret) {
            if (ret.success) {
              function toZNodes(resourceList, pId) {
                var nodes = [];
                for (var i = 0; i < resourceList.length; i++) {
                  var resource = resourceList[i]
                  var node = {
                    id: resource.areaTeamId ? resource.areaTeamId + ":a" : resource.campusId + ":b",
                    pId: pId,
                    name: resource.name
                  }

                  if (resource.campusList) {
                    var ns = toZNodes(resource.campusList, node.id)
                    node.open = true
                    nodes.push.apply(nodes, ns)
                  }
                  nodes.push(node)
                }
                return nodes;
              }

              var zNodes = toZNodes(ret.data);
              _this.initZTree(zNodes)
              _this.loadPermission()
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
      loadPermission: function () {
        var _this = this
        io.post(io.userCampusDataPermissionList, {
            userId: _this.$params('userId')
          },
          function (ret) {
            if (ret.success) {
              var permission = ret.data
              for (var i = 0; i < permission.length; i++) {
                var p = permission[i]
                var node = _this.$zTree.getNodeByParam('id', p.areaTeamId ? p.areaTeamId + ':a' : p.campusId + ':b'  )
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
