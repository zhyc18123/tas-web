<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">买家地址列表</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form">

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-12 ">
              <div class="am-form-group am-cf">
                <button type="button" class="am-btn am-btn-default am-btn-success am-fr"
                        @click="$router.push('/main/buyer/address/add')" v-if="hasPermission('add')"><span
                  class="am-icon-plus"></span>新增地址
                </button>
              </div>
            </div>

          </div>

          <div class="am-u-sm-12">
            <el-table
              :data="tableData"
              border
              stripe
              style="min-width: 100%">
              <el-table-column
                prop="consignee"
                label="联系姓名"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="phoneNo"
                label="联系电话"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="address"
                label="收货地址"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="操作"
                width="120">
                <template scope="scope">
                  <el-button size="small" @click.native="del(scope.row.addressId)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import Pagination from '../base/Pagination'

  export default{
    data: function () {
      return {
        tableData: []
      }
    },
    components: {
      Pagination
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData();
      this.$on('addressList:new', function () {
        this.loadTableData()
      })
    },
    methods: {
      loadTableData: function () {
        var _this = this
        io.post(io.apiAdminAddressList, {}, function (ret) {
          if (ret.success) {
            _this.tableData = ret.data
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      del: function (addressId) {
        var _this = this
        _this.address = addressId
        _this.$confirm('确定删除？', function () {
          io.post(io.apiAdminDelAddress, {
              addressId: _this.address
            }, function (ret) {
              if (ret.success) {
                _this.$toast('OK')
                _this.$emit('addressList:new')
              } else {
                _this.$alert(ret.desc)
              }
            }
          )
        })
      }
    }
  }
</script>

