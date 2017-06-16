<template>
  <div class="am-u-sm-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">众筹定价</div>
      </div>
      <div class="widget-body am-fr">      
            <div class="am-form-group">    
            <tr>
              <td style="width:100px; height:50px;">
                  <img height="300" width="300" :src="teachersData.avatarUrl" >
              </td>
              <td style="width:300px; height:250px;padding-left:5%;padding-top:20%">   
                  {{teachersData.teacherName}} </br>
                  {{teachersData.sex == 1 ? '男' : (teachersData.sex == 2 ? '女' : '')}} </br>
                  {{teachersData.teachGradeNames}}</br>
                  {{teachersData.phoneNo}}</br>
                  {{teachersData.areaTeamName}} </br>
                  {{teachersData.tags}}            
              </td>
            </tr>      
            </div>
            
            
            

        <el-table
          :data="classData"
          border
          stripe
          style="min-width: 100%">
          <el-table-column
            fixed
            prop="className"
            label="名师班级"
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="gradeName"
            label="年级"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="subjectName"
            label="科目"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="season"
            label="学期"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="lectureAmount"
            label="讲数"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="level"
            label="层级"
            min-width="100">
          </el-table-column>
          <el-table-column
            label="学位"
            min-width="100">      
            <template scope="scope">
                {{scope.row.discountType == 0 ? ' - ':(scope.row.quotaMin + '-' + scope.row.quotaMax)}}
            </template>     
          </el-table-column>
          <el-table-column
            prop="discountType"
            label="优惠方式"
            min-width="100">
            <template scope="scope">
              {{scope.row.discountType == 1 ? "连续优惠" : (scope.row.discountType == 2 ? "分段优惠" : "-" )}}
            </template>
              }
          </el-table-column>
          <el-table-column
            label="最低单价"
            min-width="100">
            <template scope="scope">
              {{scope.row.discountType == 0 ? '-' : scope.row.lowestPrice }}
            </template>
          </el-table-column>
          <el-table-column
            label="最高单价"
            min-width="100">
            <template scope="scope">
              {{scope.row.discountType ==0 ? '-': scope.row.highestPrice}}
                </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
             <template scope="scope">
                  <el-dropdown v-if="scope.row.status != 2">
                    <span class="el-dropdown-link">
                      操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <template >
                        <el-dropdown-item  :classId="classId" @click.native="setPrice(scope.row.classId)" v-if="scope.row.discountType == 0">定价</el-dropdown-item>
                        <el-dropdown-item  :classId="classId" @click.native="setPrice(scope.row.classId)" v-else>重新定价</el-dropdown-item>
                      </template>
                      <template >
                        <el-dropdown-item  :disabled="scope.row.status != 0 "  @click.native="changeStatus(scope.row.classId,1)"> 开班
                        </el-dropdown-item>
                        <el-dropdown-item  :disabled="scope.row.status != 1"  @click.native="changeStatus(scope.row.classId,0)"> 取消开班
                        </el-dropdown-item>
                      </template>           
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
          </el-table-column>
        </el-table>
       

        <div class="am-u-lg-12 am-cf">
          <div class="am-fr">
            <pagination v-bind:total="total" v-bind:pageNo="pageNo" v-bind:pageSize="pageSize"
                        @paging="loadTableData"/>
          </div>
        </div>
      </div>
    </div>
    <window ref="priceSetting" title="设置价格" @close="priceRange = {}">
      <price-setting :classId = classId @arrangementSuccess="$refs.SetPrice.close();loadTableData()"></price-setting>
    </window>
  </div>

</template>

<script>
  import io from '../../lib/io'
  import Pagination from '../base/Pagination'
  import SetPrice from './SetPrice'
  export default{
    data: function () {
      return {
        teachersData: {},
        classData:[],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        classId: '',
        priceRange: {}
      }
    },
    components: {
      Pagination,
      'price-setting':SetPrice
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.classId = this.$params('classId')
      this.loadTableData(this.pageNo)
      var _this = this
      this.$root.$on('studentRefundList:new', function () {
        _this.pageNo = 1
        _this.loadTableData(_this.pageNo)
      })
    },
    methods: {
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCrowdfundingClassEdit, {
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
          classId: _this.classId
        }, function (ret) {
          if (ret.success) {
            _this.teachersData = ret.data.teacherList[0]
            var classData = [];
            classData.push(ret.data.crowdfundingClass);
            _this.classData = classData;
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      //众筹定价
      setPrice:function (classId) {//弹窗
        
        this.classId = classId
        this.$refs.priceSetting.show({
          width:1000,
          height:700
        })
      }
    }
  }
</script>
