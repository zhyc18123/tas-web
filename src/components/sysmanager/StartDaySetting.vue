<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12 m-continue-apply-set" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">{{areaTeamName}}{{periodName}}开课日设置</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <div class="content">
          <el-form ref="form" label-width="80px">
            <el-form-item class="list-item" v-for="item in list" label="开课日期1">
              <el-date-picker
                v-model="item.periodGradeDate"
                type="date"
                placeholder="开课日期">
              </el-date-picker>
              <el-select size="small" class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-form-group" multiple
                         v-model="item.gradeIds" placeholder="适用年级">
                <el-option
                  v-for="item in grades"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div>
            <el-button @click="handleAdd" type="success">添加开课日</el-button>
            <el-button @click="handleDel" type="success">删除最后一个</el-button>
          </div>
        </div>
        <div class="am-form-group" style="text-align: center">
          <button type="button" :disabled="submitting" class="am-btn am-btn-primary" @click="submit">保存</button>

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
        areaTeamId: '',
        areaTeamName : '',
        periodName : '',
        periodId : '',
        submitting : false,
        list: [
          {
            periodGradeDate: '',
            gradeIds: []
          }
        ]
      }
    },
    created:function(){
      var _this = this
      this.periodId = this.$params('periodId')
      this.areaTeamId = this.$route.query.areaTeamId

      this.periodName = this.$route.query.periodName
      var areaTeams =  window.config.areaTeams || []
      areaTeams.map(val => {
        if (val.areaTeamId === _this.areaTeamId) {
          _this.areaTeamName = val.name
        }
      })
    },
    computed: {
      grades () {
        return this.$root.config.grades.map(function(item){
          return {value: item.gradeId, label: item.gradeName}
        })
      },
    },
    methods:{
      submit:function(){
        let periodGradeDateSaveList

//        this.list.map(val => {
//          val.periodGradeDate = val.periodGradeDate
//        })
        periodGradeDateSaveList = JSON.stringify(this.list)
        this.submitting = true
        io.postPlayload(io.savePeriodGradeDate,{
          periodId: this.periodId,
          periodGradeDateSaveList: periodGradeDateSaveList,
        },(ret)=>{
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
