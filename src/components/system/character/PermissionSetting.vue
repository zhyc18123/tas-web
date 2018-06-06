<template>
  <div class="permission-setting">
    <div class="content">
      <v-character-title icon="icon-weibiaoti-_fuzhi-" name="权限设定">
      </v-character-title>
      <div class="">
        <ul id="treeDemo" class="ztree"></ul>
      </div>
      <el-button @click="handleSave" class="btn-save" type="basis">保存</el-button>
      <el-button @click="$router.go(-1)" class="btn-cancel" type="basis">取消</el-button>
    </div>
  </div>
</template>

<script>
import VClassCategory from '../../common/ClassCategory.vue'
// import VCharacterTitle from '../../common/CharacterTitle.vue'
import io from '../../../lib/io'
export default {
  name: 'permission-setting',
  components: {
    VClassCategory,
    // VCharacterTitle
  },
  data() {
    return {
      checkList: [],
      tableData: []
    }
  },
  created() {
    this.roleName = this.$route.query.roleName ? this.$route.query.roleName + ' - ' : ''
    this.optRoleId = this.$route.query.optRoleId || ''
  },
  mounted() {
    this.getOptResourceList()
  },
  methods: {
    handleSave: function() {
      var sNodes = this.$zTree.getCheckedNodes(),
        _this = this;
      if (!sNodes || sNodes.length == 0) {
        this.$msgbox.alert('至少选择一项')
        return
      }
      var ids = []
      for (var i = 0; i < sNodes.length; i++) {
        ids.push(sNodes[i].id)
      }
      io.post(io.saveOptRoleResource, {
        optRoleId: this.optRoleId,
        optResourceIds: ids.join(',')
      }, function() {
        _this.$store.dispatch('config')
        _this.$message('权限设定成功！')
        _this.$router.push('/main/system/characterList/list')
      })

    },
    getOptResourceList: function() {
      var _this = this
      io.post(io.optResourceList, {},
        function(data) {
          function toZNodes(resourceList, pId) {
            var nodes = [];
            for (var i = 0; i < resourceList.length; i++) {
              var resource = resourceList[i]
              var node = {
                id: parseInt(resource.optResourceId),
                pId: pId,
                name: resource.resourceName
              }

              if (resource.children && resource.children.length > 0) {
                var ns = toZNodes(resource.children, node.id)
                node.open = true
                nodes.push.apply(nodes, ns)
              }
              nodes.push(node)
            }
            return nodes;
          }

          var zNodes = toZNodes(data);
          _this.initZTree(zNodes)
          _this.loadRoleResourceList()
        })
    },
    initZTree: function(zNodes) {
      this.$zTree = $.fn.zTree.init($("#treeDemo"), {
        check: {
          enable: true,
          chkboxType: { "Y": "ps", "N": "ps" }
        },
        data: {
          simpleData: {
            enable: true
          }
        }
      }, zNodes);
    },
    loadRoleResourceList: function() {
      var _this = this
      io.post(io.optRoleResourceList, {
        optRoleId: this.optRoleId
      }, function(data) {
        var roleResourceList = data
        for (var i = 0; i < roleResourceList.length; i++) {
          var roleResource = roleResourceList[i]
          var node = _this.$zTree.getNodeByParam('id', parseInt(roleResource.optResourceId))
          _this.$zTree.checkNode(node, true, false)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.permission-setting {
  // height: 200px;
  background: white;
  .class-category {
    float: left;
  }
  .content {
    position: relative;
    text-align: center;
    min-height: 800px;
    .ztree {
      // height: 800px;
    }
    .btn-save,
    .btn-cancel {
      padding: 10px 33px;
      font-size: 16px;
      margin-top: 96px;
      margin-bottom: 80px;
    }
    .btn-cancel {
      margin-left: 26px;
      color: #fff;
      background-color: #0acabf;
      border-color: #0acabf;
    }
    .btn-cancel:hover {
      color: #fff;
      background-color: #13dcd1;
      border-color: #13dcd1;
    }
  }
}
</style>
