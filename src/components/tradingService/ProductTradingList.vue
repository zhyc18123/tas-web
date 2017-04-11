<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">商品列表</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form ">

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group tpl-table-list-select">
                <div class="am-form-group">
                  <select2  required v-model="query.categoryId" :options="category">
                    <option value="">商品分类</option>
                  </select2>
                </div>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" class="am-input-lg" name="productName" v-model="query.productName" placeholder="请输入商品名称"/>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success am-btn-lg"
                        @click="search" ><span class="am-icon-search"></span>查询
                </button>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success" @click="addServiceProduct()">新增</button>
              </div>
            </div>

          </div>

          <div class="am-u-sm-12 am-scrollable-horizontal">
            <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
              <thead>
              <tr>
                <th>序号</th>
                <th>商品名称</th>
                <th>商品分类</th>
                <th>单价</th>
                <th>单位</th>
                <th>更新人</th>
                <th>更新时间</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="(item,index) in tableData" :key="item.productId">
                <td>{{index+1}}</td>
                <td>{{item.productName}}</td>
                <td>{{item.categoryName}}</td>
                <td>{{item.price}}</td>
                <td>{{item.unit}}</td>
                <td>{{item.username}}</td>
                <td>{{item.updateTime | formatTime}}</td>
                <td>
                  <div class="tpl-table-black-operation">
                    <a href="javascript:;" @click="$router.push('/main/tradingService/product/edit/'+item.productId)" v-if="hasPermission('edit')">
                      <i class="am-icon-edit"></i> 编辑
                    </a>
                    <a href="javascript:;" @click="del(item.productId)">
                      <i class="am-icon-remove"></i>删除
                    </a>
                  </div>
                </td>
              </tr>

              </tbody>
            </table>
          </div>
          <div class="am-u-lg-12 am-cf">
            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <window ref="add_Serviceproduct" title="新建商品">
      <add-ServiceProduct @addSuccess="$refs.add_Serviceproduct.close()"></add-ServiceProduct>
    </window>


  </div>


  </div>
</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'
  import ProductTradingForm from '../tradingService/ProductTradingForm'

  export default{
    data:function(){
      return {
        tableData:[],
        total:0,
        pageSize:15,
        pageNo:1,
        query:{
          categoryId:'',
          productName:'',
        },
        category:[],
        searchConfig:{}
      }
    },
    components: {
      Pagination,
      'add-ServiceProduct':ProductTradingForm
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      this.loadTableData(this.pageNo);
      this.loadCategoryData();
      var _this = this
      this.$root.$on('product:new',function () {
        _this.pageNo = 1
        _this.loadTableData(_this.pageNo)
      })
    },
    methods:{
      search:function(){
        this.loadTableData()
      },
      loadCategoryData:function() {
        var _this = this
        io.post(io.apiAdminGetAllCategoryDetail, {}, function (ret) {
          if (ret.success) {
            _this.category = ret.data.map(function (item) {
              return {value: item.categoryId, text: item.name}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadTableData:function(pageNo){
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminServiceProductList,$.extend({
          pageNo:_this.pageNo,
          pageSize:_this.pageSize
        },_this.query),function(ret){
          if(ret.success){
            _this.total = ret.data.total
            _this.tableData = ret.data.list
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      addServiceProduct:function () {
        //弹窗
        var _this = this;
        _this.$refs.add_Serviceproduct.show({
          width : 1500,
          height: 600
        });
      },
      del:function (productId) {
        var _this = this ;
        _this.productId = productId
        _this.$confirm('你确定要删除？' ,
          function(){
            io.post(io.apiAdminDeleteServiceProduct,{productId:_this.productId},function(ret){
              if(ret.success){
                _this.$toast('OK')
                _this.$root.$emit('product:new')
              }else{
                _this.$alert(ret.desc)
              }
            })
          });
      },
    }
  }
</script>
