<template>

  <div >
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
      <div class="widget am-cf">
        <div class="widget-head am-cf">
          <div class="widget-title  am-cf">班级退账户</div>
        </div>
        <div class="widget-body am-fr">
            <span>班级信息</span>
          <div class="am-g">
            <div class="am-u-sm-2">期数</div><div class="am-u-sm-2">76</div>
            <div class="am-u-sm-2">业务组</div><div class="am-u-sm-2">业务组AA</div>
            <div class="am-u-sm-2">班级名称</div><div class="am-u-sm-2">精英语文培优班1</div>
          </div>
          <div class="am-g">
            <div class="am-u-sm-2">班级编号</div><div class="am-u-sm-2">211792</div>
            <div class="am-u-sm-2">任课老师</div><div class="am-u-sm-2">闵建平</div>
            <div class="am-u-sm-2">教室</div><div class="am-u-sm-2">06</div>
          </div>
          <div class="am-g">
            <div class="am-u-sm-2">开课日期</div><div class="am-u-sm-2">2017-02-18</div>
            <div class="am-u-sm-2">报读总讲次</div><div class="am-u-sm-2">10</div>
            <div class="am-u-sm-2">已交金额</div><div class="am-u-sm-2">1964.0</div>
          </div>
        </div>

        <div class="widget-body am-fr">
          <span>考勤情况</span>
          <div class="am-table">
            <table>
              <tr v-for="">
              </tr>
            </table>
          </div>
        </div>

        <div>
          <span>当前剩余讲次:</span>第<span></span>讲次~第<span></span>讲次，申请讲次:第<span></span>讲~第<span></span>讲 &nbsp;&nbsp;&nbsp;&nbsp;应退学费金额:<span></span>元
        </div>

        <div class="widget-body am-fr">
          <span>转班原因</span>
          <div>
            <input  type="radio" name="classStatus" class="why"><span>不开班</span>
            <input  type="radio" name="classStatus" class="why"><span>搬家或家庭原因</span>
            <input  type="radio" name="classStatus" class="why"><span>与原校时间冲突</span>
            <input  type="radio" name="classStatus" class="why"><span>学生不愿上</span>
            <input  type="radio" name="classStatus" class="why"><span>其他</span>
          </div>
        </div>

        <div class="widget-body am-fr">
          <span>退费方式:</span>
            <span><input  type="radio" name="money" class="why" value="0">转账</span>
            <span><input  type="radio" name="money" class="why" value="1">现金</span>
        </div>

      </div>

      <div class="widget-body am-fr">
        <label>转账银行</label><input type="text">
        <label>银行开户城市</label><input type="text">
        <label>姓名</label><input type="text">
        <label>银行账号</label><input type="text">
      </div>

      <div class="am-form-group">
        <div class="am-u-sm-9 am-u-sm-push-3">
          <button type="submit" class="am-btn am-btn-primary am-radius" id="save">保存</button>
          <button type="button" class="am-btn am-btn-primary am-radius" @click="$router.go(-1)">取消</button>
        </div>
      </div>

      </div>
    </div>
  </div>

</template>

<script>
  import io from '../../lib/io'


  export default{
    data: function () {
      return{
        studentId:'',
      }
    },
    created:function () {

    },
    mounted: function () {
        var _this = this;
        $('#save').unbind("click").click(function() {
            _this.save();
        })
    },
    methods: {
      save: function () {
        var _this = this
        io.post(io.apiAdminStudentRefundForm, {}, function (ret) {
            if (ret.success) {
              _this.$toast('OK');
            } else {
              _this.$alert(ret.desc);
            }
          }, function () {
            _this.$alert('请求服务器失败');
          })
      },

    }
  }

</script>
