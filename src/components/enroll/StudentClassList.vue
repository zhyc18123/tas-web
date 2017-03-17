<template>
  <div class="am-u-sm-12 am-scrollable-horizontal">
    <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
      <thead>
      <tr>
        <th>序号</th>
        <th>期数</th>
        <th>校区</th>
        <th>年级</th>
        <th>班级名称</th>
        <th>总金额</th>
        <th>以上/总讲数</th>
        <th>报读开始讲数</th>
        <th>报读结束讲数</th>
        <th>报名讲数</th>
        <th>开课日期</th>
        <th>上课时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="" :key="">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <div class="tpl-table-black-operation">
            <a href="javascript:;" @click="">
              <i class="am-icon-edit"></i> 转班
            </a>
            <a href="javascript:;" @click="">
              <i class="am-icon-edit"></i> 班级退账户
            </a>
            <a href="javascript:;" @click="">
              <i class="am-icon-edit"></i> 退费申请
            </a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import io from '../../lib/io'

  import Pagination from '../base/Pagination'

  export default{
  }

</script>
