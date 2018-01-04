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
          <el-form ref="form" label-width="100px">
            <el-form-item class="list-item am-form-group" v-for="(item, index) in list" :label="'开课日期' + (index + 1) + '：'">
              <el-date-picker
                v-model="item.periodGradeDate"
                type="date"
                placeholder="开课日期">
              </el-date-picker>
              <el-select size="small" class="" multiple
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
            <el-button size="small" @click="handleAdd" type="success">添加开课日</el-button>
            <el-button size="small" :disabled="list.length < 2" @click="handleDel" type="success">删除最后一个</el-button>
          </div>
        </div>
        <div class="am-form-group" style="text-align: center">
          <button type="button" size="big" :disabled="submitting" class="am-btn am-btn-primary" @click="submit">保存</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import moment from 'moment'
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
      this.getPeriodGradeDateList()
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
        let periodGradeDateSaveList = []
        let _this = this
        this.list.map(val => {
          periodGradeDateSaveList.push({
            periodGradeDate: moment(val.periodGradeDate).format('YYYY-MM-DD'),
            gradeIds: val.gradeIds.join(',')
          })
        })
        this.submitting = true
        io.post(io.savePeriodGradeDate,{
          periodId: this.periodId,
          periodGradeDateSaveList: JSON.stringify(periodGradeDateSaveList),
        },(ret)=>{
          this.submitting = false
          if(ret.success){
            this.$router.go(-1)
          }else{
            this.$alert(ret.desc || '处理失败')
          }
        })
      },
      getPeriodGradeDateList() {
        io.post(io.periodGradeDateList,{
          periodId: this.periodId,
        },(ret)=>{
          if(ret.success){
            this.periodGradeDateList = ret.data
            this.list = []
            let obj = {}
            for(let i =0; i< ret.data.length; i ++) {
              if(!obj[ret.data[i].periodGradeDate]) {
                obj[ret.data[i].periodGradeDate] = {
                  periodGradeDate: this.$options.filters.formatDate(ret.data[i].periodGradeDate),
                  gradeIds: [ret.data[i].gradeId]
                }
              } else {
                obj[ret.data[i].periodGradeDate].gradeIds.push(ret.data[i].gradeId)
              }
            }
            Object.keys(obj).map(val => {
              this.list.push(obj[val])
            })
          }else{
            this.$alert(ret.desc || '处理失败')
          }
        })
      },
      handleAdd() {
        this.list.push(
          {
            periodGradeDate: '',
            gradeIds: []
          }
        )
      },
      handleDel() {
        this.list.splice(this.list.length -1 , this.list.length)
      },
    }
  }
</script>
<style lang="less" scoped>
  .content {
    padding: 20px 150px;
  }
</style>
