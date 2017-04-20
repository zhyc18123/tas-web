<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title am-cf">租聘教室列表</div>
        </div>
        <div class="widget-body am-fr">
          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-6">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="$router.push('/main/tradingService/rent/add')">
                  <span class="am-icon-plus"></span>新增
                </button>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group tpl-table-list-select">
                <div class="am-form-group">
                  <select2 required v-model="query.campusId" :options="campuses" >
                    <option value="">校区分类</option>
                  </select2>
                </div>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-input-group am-input-group-lg tpl-form-border-form cl-p">
                <input type="text" class="am-input-lg am-form-field " name="productName" v-model="query.productName"
                       placeholder="请输入教室名称"/>
                <span class="am-input-group-btn">
                  <button class="am-btn am-btn-default am-btn-success tpl-table-list-field am-icon-search"
                          type="button" @click="search"></button>
                </span>
              </div>
            </div>

          </div>

          <div class="am-u-sm-12">
            <el-table :data="tableData" border stripe style="min-width: 100%">
              <el-table-column fixed prop="busTeamName" label="所属商家" min-width="100"></el-table-column>
              <el-table-column label="座位数" min-width="100">
                <template scope="scope">{{scope.row.seatAmount }}</template>
              </el-table-column>
              <el-table-column label="地区" min-width="100">
                <template scope="scope">
                  {{scope.row.city}}{{scope.row.district ? '/' + scope.row.district : '' }}
                </template>
              </el-table-column>
              <el-table-column prop="productName" label="教室名称" min-width="100"></el-table-column>
              <el-table-column label="价格" min-width="100">
                <template scope="scope">
                  {{scope.row.price}}{{scope.row.unit? '/' + scope.row.unit : '' }}
                </template>
              </el-table-column>
              <el-table-column prop="rent" label="每小时" min-width="100"></el-table-column>
              <el-table-column label="多媒体" min-width="100">
                <template scope="scope">{{scope.row.isMultimedia == '0' ? '不是' : '是'}}</template>
              </el-table-column>
              <el-table-column label="状态" min-width="100">
                <template scope="scope">{{scope.row.status == '0' ? '未启用' : '正常'}}</template>
              </el-table-column>
              <el-table-column prop="memo" label="备注" min-width="100"></el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template scope="scope">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="hasPermission('edit')"
                                        @click.native="$router.push('/main/tradingService/rent/edit/'+scope.row.productId)">
                        编辑
                      </el-dropdown-item>
                      <el-dropdown-item v-if="hasPermission('del')"
                                        @click.native="deleteServiceProduct(scope.row.productId)">删除
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="am-u-lg-12 am-cf">
            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                          @paging="loadTableData"/>
            </div>
          </div>

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
        tableData: [],
        total: 0,
        pageSize: 15,
        pageNo: 1,
        query: {
          campusId: '',
          productName: '',
        },
        campuses: []
      }
    },
    components: {
      Pagination,
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadTableData(this.pageNo);
      this.loadCampusData();
    },
    methods: {
      search: function () {
        this.loadTableData()
      },
      loadCampusData: function () {
        var _this = this
        io.post(io.apiAdminAllCampus, {}, function (ret) {
          if (ret.success) {
            _this.campuses = ret.data.map(function (item) {
              return {value: item.campusId, text: item.campusName}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminServiceProductList, $.extend({
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
          type: 2
        }, _this.query), function (ret) {
          if (ret.success) {
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      deleteServiceProduct: function (productId) {
        var _this = this;
        _this.productId = productId
        _this.$confirm('你确定要删除？',
          function () {
            io.post(io.apiAdminDeleteServiceProduct, {productId: _this.productId}, function (ret) {
              if (ret.success) {
                _this.$toast('OK')
                _this.loadTableData()
              } else {
                _this.$alert(ret.desc)
              }
            })
          });
      },
    }
  }
</script>
