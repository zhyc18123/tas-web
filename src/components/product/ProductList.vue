<template>
  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">产品列表</div>
        </div>
        <div class="widget-body  am-fr">

          <div class="am-u-sm-12 am-form ">
          <div class="am-u-sm-12 am-u-md-6 am-u-lg-6">
            <div class="am-form-group">
              <div class="am-btn-toolbar">
                <div class="am-btn-group am-btn-group-xs">
                  <button type="button" class="am-btn am-btn-default am-btn-success" @click="$router.push('/main/product/product/add')" v-if="hasPermission('add')"><span class="am-icon-plus"></span>新增</button>
                </div>
              </div>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-6 am-u-lg-3">
            <div class="am-form-group tpl-table-list-select">
              <div class="am-form-group">
                <select2  required v-model="query.areaTeamId" :options="areaTeams">
                  <option value="">区域组</option>
                </select2>
              </div>
            </div>
          </div>

          <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
            <div class="am-input-group am-input-group-sm tpl-form-border-form cl-p">
              <input type="text" class="am-form-field " v-model="searchConfig.searchValue">
              <span class="am-input-group-btn">
              <button class="am-btn  am-btn-default am-btn-success tpl-table-list-field am-icon-search" type="button" @click="search"></button>
            </span>
            </div>
          </div>




          <div class="am-u-sm-12 am-scrollable-horizontal">
            <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
              <thead>
              <tr>
                <th>操作</th>
                <th>产品</th>
                <th>区域</th>
                <th>操作人</th>
                <th>操作时间</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="item in tableData" :key="item.productId">
                <td>
                <div class="tpl-table-black-operation">
                  <a href="javascript:;" @click="$router.push('/main/product/product/edit/'+item.productId)" v-if="hasPermission('edit')">
                    <i class="am-icon-edit"></i> 编辑
                  </a>
                </div>
              </td>
                <td>{{item.name}}</td>
                <td>{{item.areaTeamName }}</td>
                <td></td>
                <td>{{item.updateTime}}</td>
              </tr>


              <!-- more data -->
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
        this.query={}
        if(!this.searchConfig.searchItem){
          this.$alert('请选择搜索选项')
          return
        }
        this.query[this.searchConfig.searchItem] =  this.searchConfig.searchValue
        this.loadTableData()
      },
      loadTableData:function(pageNo){
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCourseProductTemplateList,$.extend({
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
      }
    }
  }
</script>
