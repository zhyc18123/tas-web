<template>
  <div class="am-u-sm-12 am-scrollable-horizontal">
    <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
      <thead>
      <tr>
        <th>序号</th>
        <th>订单编号</th>
        <th>缴费时间</th>
        <th>总金额</th>
        <th>应缴金额</th>
        <th>已缴金额</th>
        <th>欠费金额</th>
        <th>状态</th>
        <th>操作人</th>
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
        <td>
          <div class="tpl-table-black-operation">
            <a href="javascript:;" @click="">
              <i class="am-icon-edit"></i> 订单详情
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
