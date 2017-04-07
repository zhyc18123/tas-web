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
                          @click=""><span class="am-icon-search"></span>查询
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
              <div class="am-form-group ">

                <div class="am-u-sm-3 input-field">
                  <date-picker >
                    <input type="text" class="am-input-lg" placeholder="请选择首次上课时间" data-am-datepicker required>
                  </date-picker>
                </div>

                <div class="am-u-sm-3 input-field">
                  <select id="arrange_way">
                    <option value="arrangeByWeek">按周排</option>
                    <option value="arrangeByDay">按天排</option>
                  </select>
                </div>

                <div class="am-u-sm-3 input-field ">
                  <label><input type="checkbox" class="am-input-lg"></label>是否生成模板
                </div>

                <div class="am-u-sm-3 input-field">
                  <input type="text" class="am-input-lg" placeholder="模板名称">
                </div>

              </div>

              <div class="am-form-group ">

                <div class="am-u-sm-1 input-field">
                  周一
                </div>

                <div class="am-u-sm-4 input-field">
                  <date-time-picker format="HH:mm">
                    <input data-am-datetimepicker value="" class="am-form-field">
                  </date-time-picker>
                </div>
                <div class="am-u-sm-4 input-field">
                  <div class="am-g am-g-collapse">
                    <div class="am-u-sm-2">
                      <select >
                        <option v-for="n in 24" :value="n">{{n}}</option>
                      </select>
                    </div>
                    <div class="am-u-sm-1">
                      :
                    </div>
                    <div class="am-u-sm-2">
                      <select >
                        <option v-for="n in 60" :value="n">{{n}}</option>
                      </select>
                    </div>
                    <div class="am-u-sm-2">
                      -
                    </div>
                    <div class="am-u-sm-2">
                      <select >
                        <option v-for="n in 24" :value="n">{{n}}</option>
                      </select>
                    </div>
                    <div class="am-u-sm-1">
                      :
                    </div>
                    <div class="am-u-sm-2">
                      <select >
                        <option v-for="n in 60" :value="n">{{n}}</option>
                      </select>
                    </div>

                  </div>
                </div>
                <div class="am-u-sm-1 input-field am-u-end">
                  1
                </div>


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
