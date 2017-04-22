<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">产品列表</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form ">

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group tpl-table-list-select">
              <div class="am-form-group">
                <select2  required v-model="query.areaTeamId" :options="areaTeams">
                  <option value="">区域</option>
                </select2>
              </div>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-form-group">
              <input type="text" name="name" v-model="query.name" placeholder="请输入产品名称"/>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
            <div class="am-form-group">
              <button type="button" class="am-btn am-btn-default am-btn-success"
                      @click="search" ><span class="am-icon-search"></span>查询
              </button>
            </div>
          </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
              <div class="am-form-group">
                <button type="button" class="am-btn am-btn-default am-btn-success" @click="$router.push('/main/product/product/add')" v-if="hasPermission('add')"><span  class="am-icon-plus"></span>新增产品</button>
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
                prop="name"
                label="产品"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="区域"
                min-width="100">
                <template scope="scope">
                  {{scope.row.areaTeamName }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="操作"
                width="150">
                <template scope="scope">
                  <el-button size="small" @click.native="$router.push('/main/product/product/edit/'+scope.row.productId)" v-if="hasPermission('edit')">编辑</el-button>
                  <el-button size="small" @click.native="del(scope.row.productId)" v-if="hasPermission('del')">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="am-u-lg-12 am-cf">

            <div class="am-fr">
              <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize" @paging="loadTableData" />
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
    data:function(){
      return {
        tableData:[],
        total:0,
        pageSize:10,
        pageNo:1,
        query:{
          areaTeamId : '',
          name:'',
        },
        searchConfig:{}
      }
    },
    components: {
      Pagination
    },
    mounted:function(){
      $(window).smoothScroll()
    },
    created:function(){
      this.loadTableData(this.pageNo);
    },
    computed:{
      areaTeams: function () {
        var options = ( this.$root.config.areaTeams || [] )
          .map(function (item) {
            return {value: item.areaTeamId, text: item.name}
          })
        return options
      },
      },
    methods:{
      search:function(){
        this.loadTableData()
      },
      loadTableData:function(pageNo){
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminProductList,$.extend({
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
      del:function(productId){
        var _this  = this
        io.post(io.apiAdminDeleteProduct,{
            productId : productId
        },function(ret){
          if(ret.success){
            _this.loadTableData()
            _this.$alert('删除成功')
          }else{
            _this.$alert(ret.desc)
          }
        })
      }
    }
  }
</script>
