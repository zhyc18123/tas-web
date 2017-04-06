<template xmlns="http://www.w3.org/1999/html">

  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="am-tabs" data-am-tabs>
        <ul class="am-tabs-nav am-nav am-nav-tabs">
          <li class="am-active"><a href="#tab1">模板排课时间</a></li>
          <li><a href="#tab2">手工排课时间</a></li>
        </ul>
        <div class="am-tabs-bd">
          <!--模板排课时间-->
          <div class="am-tab-panel am-fade am-in am-active" id="tab1">
            <!--search-->
            <div class="am-u-sm-12 am-form ">
              <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
                <div class="am-form-group">
                  <input type="text" class="am-input-lg" name="name" v-model="query.name"
                         placeholder="模板名称"/>
                </div>
              </div>
              <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
                <div class="am-form-group">
                  <input type="text" class="am-input-lg" name="lectureAmount" v-model="query.lectureAmount"
                         placeholder="总讲数"/>
                </div>
              </div>
              <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
                <div class="am-form-group">
                  <button type="button" class="am-btn am-btn-default am-btn-success am-btn-lg"
                          @click="search"><span class="am-icon-search"></span>查询
                  </button>
                </div>
              </div>
            </div>

            <div class="am-u-sm-12 am-scrollable-horizontal">
              <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
                <thead>
                <tr>
                  <th>操作</th>
                  <th>模板名称</th>
                  <th>年份</th>
                  <th>季节</th>
                  <th>总讲数</th>
                  <th>起始日期</th>
                  <th>结束日期</th>
                  <th>上课时间</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                  <td>
                    <div class="tpl-table-black-operation">
                      <a href="javascript:;" @click="">
                        使用
                      </a>
                      <a href="javascript:;" @click="">
                        查看
                      </a>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                </tbody>
              </table>
            </div>

          </div>
          <!--手工排课时间-->
          <div class="am-tab-panel am-fade" id="tab2">
            <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">

              <div class="am-form-group">
                <label class="am-u-sm-3 am-form-label">
                  <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>首次上课时间：
                </label>
                <div class="am-u-sm-3 am-u-end input-field">
                  <date-picker v-model="formData.joinTime">
                    <input type="text" placeholder="请选择首次上课时间" data-am-datepicker required>
                  </date-picker>
                </div>
              </div>

              <div class="am-form-group">
                <label class="am-u-sm-3 am-form-label" for="arrange_way">排课方式</label>
                <select class="am-u-sm-3 am-u-end input-field" id="arrange_way">
                  <option value="arrangeByWeek">按周排</option>
                  <option value="arrangeByDay">按天排</option>
                </select>
                <span class="am-form-caret"></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import util from '../../lib/util'
  export default{
    data(){
      return {
        query: {},
        formData: {}
      }
    },
    props: ['classId', 'isArrangeTime'],
    mounted: function () {
      $(window).smoothScroll();
    },
    created: function () {

    },
    computed: {},
    mounted: function () {
    },

    methods: {}
  }
</script>
