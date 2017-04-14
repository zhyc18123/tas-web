<template>
  <div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">校区管理</div>
        </div>
        <div class="widget-body  am-fr">
          <div class="am-u-sm-12 am-form ">
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.busTeamId" :options="busTeams">
                  <option value="">所属商家</option>
                </select2>
              </div>
            </div>
            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.busTeamId" :options="busTeams">
                  <option value="">城市</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <select2  v-model="query.areaTeamId" :options="areaTeams">
                  <option value="">区域</option>
                </select2>
              </div>
            </div>

            <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
              <div class="am-form-group">
                <input type="text" name="campusName" v-model="query.campusName" placeholder="请输入校区名称"/>
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
                <button type="button" class="am-btn am-btn-default am-btn-success"
                        @click="$router.push('/main/tradingService/campusManage/add')" v-if="hasPermission('add')"><span
                  class="am-icon-plus"></span>新增校区
                </button>
              </div>
            </div>

          </div>

          <div class="am-u-sm-12 am-scrollable-horizontal">
            <el-table
              :data="tableData"
              border
              stripe
              @selection-change="handleSelectionChange"
              style="min-width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>

              <el-table-column
                fixed
                prop="className"
                label="所属商家"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="periodName"
                label="校区名称"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="城市"
                label="校区"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="roomName"
                label="区域"
                min-width="100">
              </el-table-column>
              <el-table-column
                label="状态"
                min-width="150">
                <template scope="scope">
                  {{scope.row.startCourseTime | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="studyingTime"
                label="联系人"
                min-width="150">
              </el-table-column>
              <el-table-column
                label="联系电话"
                min-width="100">
                <template scope="scope">
                  {{scope.row.courseProgress}}/{{scope.row.lectureAmount}}
                </template>
              </el-table-column>
              <el-table-column
                prop="regAmount"
                label="详细地址"
                min-width="100">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template scope="scope">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :disabled="scope.row.status != 0" @click.native="$router.push('/main/tradingService/campusManage/edit/'+scope.row.classId)">编辑</el-dropdown-item>
                      <el-dropdown-item :disabled="scope.row.status != 0" @click.native="$router.push('')">禁用</el-dropdown-item>
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
</template>
