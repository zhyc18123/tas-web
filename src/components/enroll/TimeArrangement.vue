<template xmlns="http://www.w3.org/1999/html">

  <div  class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="am-tabs" data-am-tabs>
        <ul class="am-tabs-nav am-nav am-nav-tabs">
          <li class="am-active"><a href="#tab1">模板排课时间</a></li>
          <li><a href="#tab2">手工排课时间</a></li>
        </ul>
        <div class="am-tabs-bd">
          <!--模板排课时间-->
          <div class="am-tab-panel am-fade am-in am-active" id="tab1">

            <div>
              模板名称：<input type="text">
              总讲数：<input type="text">
              <button type="button" class="am-btn am-btn-default am-btn-success"
                      @click="" ><span class="am-icon-search"></span>查询
              </button>
            </div>

            <div class="widget am-cf">
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
                      <a href="javascript:;" @click="" >
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
                </tr>
                </tbody>
              </table>
            </div>
            </div>

          </div>
          <!--手工排课时间-->
          <div class="am-tab-panel am-fade" id="tab2">
            <div align="left">
              <label>首次上课时间：</label><input type="text">
              <select>
                <option>排课方式</option>
                <option>按周排</option>
                <option>按天排</option>
              </select>
            </div>
            <div>
              <div align="left">
                <input type="checkbox" name="1">周一
                <span><input type="text"></span>
                <a href="javascript:;" @click=""> <i class="am-icon-plus"></i></a>
                <a href="javascript:;" @click=""> <i class="am-icon-remove"></i></a>
              </div>
              <div align="left">
                <input type="checkbox" name="2">周二
                <span><input type="text"></span>
                <a href="javascript:;" @click=""> <i class="am-icon-plus"></i></a>
                <a href="javascript:;" @click=""> <i class="am-icon-remove"></i></a>
              </div>
              <div align="left">
                <input type="checkbox" name="3">周三
                <span><input type="text"></span>
                <a href="javascript:;" @click=""> <i class="am-icon-plus"></i></a>
                <a href="javascript:;" @click=""> <i class="am-icon-remove"></i></a>
              </div>
              <div align="left">
                <input type="checkbox" name="4">周四
                <span><input type="text"></span>
                <a href="javascript:;" @click=""> <i class="am-icon-plus"></i></a>
                <a href="javascript:;" @click=""> <i class="am-icon-remove"></i></a>
              </div>
              <div align="left">
                <input type="checkbox" name="5">周五
                <span><input type="text"></span>
                <a href="javascript:;" @click=""> <i class="am-icon-plus"></i></a>
                <a href="javascript:;" @click=""> <i class="am-icon-remove"></i></a>
              </div>
              <div align="left">
                <input type="checkbox" name="6">周六
                <span><input type="text"></span>
                <a href="javascript:;" @click=""> <i class="am-icon-plus"></i></a>
                <a href="javascript:;" @click=""> <i class="am-icon-remove"></i></a>
              </div>
              <div align="left">
                <input type="checkbox" name="0">周日
                <span><input type="text"></span>
                <a href="javascript:;" @click=""> <i class="am-icon-plus"></i></a>
                <a href="javascript:;" @click=""> <i class="am-icon-remove"></i></a>
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
  import util from '../../lib/util'
  export default{
    data(){
      return{
      }
    },
    props: ['classId','isArrangeTime'],
    mounted:function () {
      $(window).smoothScroll();
    },
    created:function(){

    },
    computed:{
    },
    mounted:function(){
    },

    methods:{
    }
  }
</script>
