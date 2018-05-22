<template>
  <div class="organization">
    <el-form :inline="true" :model="form" class="t-form gray">
      <el-form-item label="">
        <el-select v-model="form.region" placeholder="合作状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.user" placeholder="请输入姓名/手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item class="new-item">
        <el-button type="primary" class="new-btn" @click="onSubmit">新建个人合作</el-button>
      </el-form-item>
    </el-form>
            <el-table class="line-table" :data="tableData"  style="width: 100%" header-align="center">
                <el-table-column prop="className" label="编号" align="center" ></el-table-column>
                <el-table-column prop="grade" label="姓名"  align="center"></el-table-column>
                <el-table-column prop="term"  label="手机号" align="center"> </el-table-column>
                <el-table-column prop="campus"  label="合作状态" align="center"> </el-table-column>
                <el-table-column prop="curriculumTime"  label="账号有效期" align="center"> </el-table-column>
                <el-table-column label="操作" align="center"> 
                  <template scope="scope">
                    <router-link to="/main/system/personal/list/1">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xiugaiziliao"></use>
                            </svg>
                    </router-link>
                  </template>
                </el-table-column>
            </el-table>
    <v-pagination ref="pagin" class="pag" :total="result.total|toNumber" @getListResult="getListResult" :currentPage="form.pageNo"></v-pagination>
  </div>
</template>
<script>
import VPagination from '../../common/Pagination'
export default {
  components: {
    VPagination
  },
  data () {
    return {
      form:{
        user:'',
        region:'',
        pageNo:1,
        pageSize:10
      },
      result:{
        total:99
      },
            tableData:[
                {
                    className:"2018春季物理提高班",
                    grade:"初二",
                    term:"春季",
                    campus:"岗顶校区",
                    curriculumTime:"2017-02-12",
                    tier:"提高班",
                    schoolTime:"8:45 - 9:45",
                    week:'周一'
                }
            ],
    }
  },
  methods: {
    onSubmit(){

    },
    getListResult(){

    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.t-form
  table-form()
  margin-top 20px
  margin-bottom 30px
.line-table
  .icon
    cursor pointer
    font-size 22px
    color #999
    &:hover
      color #333
</style>


