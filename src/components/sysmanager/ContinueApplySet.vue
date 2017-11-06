<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12 m-continue-apply-set" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">期数信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <div class="info">区域：{{areaTeamName}}</div>
        <div class="info">期数：{{periodName}}</div>
        <div class="form-box">
          <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id" v-for="(item,index) in formData.itemList">
            <fieldset>

              <div class="am-form-group">
                <label class="am-u-sm-3 am-form-label">
                  <span class="am-text-danger am-margin-right-xs am-text-xs"></span>续报期
                </label>
                <div class="am-u-sm-3 am-u-end">
                  <el-select v-model="item.regPeriodId" placeholder="请选择">
                    <el-option
                      v-for="item in periodList"
                      :key="item.periodId"
                      :label="item.periodName"
                      :value="item.periodId">
                    </el-option>
                  </el-select>

                </div>
              </div>
              <div class="am-form-group am-form-select">
                <label class="am-u-sm-3 am-form-label">
                  <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>同科目
                </label>
                <div class="am-u-sm-3 input-field am-u-end">
                  <el-radio name="isSameSubject" :disabled="true" class="radio" v-model="item.isSameSubject" :label="true">是</el-radio>
                  <el-radio name="isSameSubject" :disabled="true" class="radio" v-model="item.isSameSubject" :label="false">否</el-radio>
                </div>
              </div>
              <div class="am-form-group am-form-select">
                <label class="am-u-sm-3 am-form-label">
                  <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>同校区
                </label>
                <div class="am-u-sm-3 input-field am-u-end">
                  <el-radio name="isSameCampus" :disabled="true" class="radio" v-model="item.isSameCampus" :label="true">是</el-radio>
                  <el-radio name="isSameCampus" :disabled="true" class="radio" v-model="item.isSameCampus" :label="false">否</el-radio>
                </div>
              </div>
              <div class="am-form-group am-form-select">
                <label class="am-u-sm-3 am-form-label">
                  <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>同层级
                </label>
                <div class="am-u-sm-3 input-field am-u-end">
                  <el-radio name="isSameLevel" :disabled="true" class="radio" v-model="item.isSameLevel" :label="true">是</el-radio>
                  <el-radio name="isSameLevel" :disabled="true" class="radio" v-model="item.isSameLevel" :label="false">否</el-radio>
                </div>
              </div>
              <div class="am-form-group am-form-select">
                <label class="am-u-sm-3 am-form-label">
                  <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>跨年级推送
                </label>
                <div class="am-u-sm-3 input-field am-u-end">
                  <el-radio name="isSameGrade" :disabled="!item.regPeriodId" class="radio" v-model="item.isSameGrade" :label="false">是</el-radio>
                  <el-radio name="isSameGrade" :disabled="!item.regPeriodId" class="radio" v-model="item.isSameGrade" :label="true">否</el-radio>
                </div>
              </div>
              <div style="color: #999;margin-top: -18px;">
                <div class="am-u-sm-3">&nbsp;</div>
                （若选是，则续报期课程将推送给目标学生下一年的课程）</div>
            </fieldset>
          </form>
          <div class="btn-group">
            <el-button type="success" @click="handleAdd">添加续报期</el-button>
            <el-button type="success" :disabled="this.formData.itemList.length < 2" @click="handleDel">删除</el-button>
          </div>
        </div>
        <div class="am-form-group" style="text-align: center">
          <button type="button" :disabled="submitting" class="am-btn am-btn-primary" @click="submit">提交</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import util from '../../lib/util'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  export default{
    components: {ElButton},
    data(){
      return{
        areaTeamId: '',
        areaTeamName : '',
        periodName : '',
        periodList:[],
        formData:{
          periodId : '',
          itemList :[{regPeriodId :'' ,isSameSubject:true,isSameCampus:true,isSameLevel:true,isSameGrade:true}],
        },
        submitting : false
      }
    },
    created:function(){
      var _this = this
      this.formData.periodId = this.$params('periodId')
      this.areaTeamId = this.$route.query.areaTeamId
      var areaTeams =  window.config.areaTeams || []
      areaTeams.map(val => {
        if (val.areaTeamId === _this.areaTeamId) {
          _this.areaTeamName = val.name
        }
      })
      this.getPeriodList()
      this.loadContinueClassSetting()
    },
    methods:{
      submit:function(){
        for(var i = 0 ;i < this.formData.itemList.length ; i++ ){
          if( !this.formData.itemList[i].regPeriodId ){
            this.$alert('请选择续报期')
            return
          }
        }
        this.submitting = true
        io.postPlayload(io.apiAdminSaveOrUpdateContinueClassSetting,this.formData,(ret)=>{
          this.submitting = false
          if(ret.success){
            this.$router.go(-1)
          }else{
            this.$alert(ret.desc || '处理失败')
          }
        })
      },
      handleAdd() {
        this.formData.itemList.push(
          {regPeriodId :'' ,isSameSubject:true,isSameCampus:true,isSameLevel:true,isSameGrade:true}
        )
      },
      handleDel() {
        this.formData.itemList.length > 1 && this.formData.itemList.pop()
      },
      getPeriodList: function () {
        var _this = this
        io.post(io.apiAdminPeriodList, {
          pageNo: 1,
          pageSize: 100,
          areaTeamId: this.areaTeamId
        }, function (ret) {
          if (ret.success) {

            let selectPeriod = ret.data.list.filter((item)=>{ return item.periodId === _this.formData.periodId })[0]
            _this.periodName = selectPeriod.periodName
            _this.periodList = ret.data.list.filter((item)=>{ return parseInt(item.periodNo)  > parseInt( selectPeriod.periodNo)  })

          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadContinueClassSetting(){
        io.post(io.apiAdminContinueClassSetting,{
          periodId : this.formData.periodId
        },(ret)=>{
          if(ret.success){

            this.formData = ret.data
            if( !ret.data.itemList || ret.data.itemList.length == 0 ){
              this.handleAdd()
            }
          }else{
            this.$alert(ret.desc || '加载失败')
          }

        })
      }
    }
  }
</script>
<style lang="less">
  .m-continue-apply-set {
    .info {
      margin-left: 20px;
    }
    .form-box {
      border: 1px dashed #ddd;
      margin: 15px;
      .am-form input[type=text][readonly] {
        cursor: default;
        background-color: #fff;
      }
      form + form {
        border-top: 1px solid #ddd;
      }
    }
    .btn-group {
      margin-left: 25%;
      padding-left: 10px;
      margin-top: -20px;
      margin-bottom: 20px;
    }
  }
</style>
