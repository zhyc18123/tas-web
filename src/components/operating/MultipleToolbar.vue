<template>
  <div class="am-u-sm-12 am-form">
    <el-select v-if="areaTeam" size="small" class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-form-group"
               @change="handleAreaTeamIdChange" v-model="formData.areaTeamId" placeholder="请选择区域">
      <el-option
        v-for="item in areaTeams"
        :key="item.areaTeamId"
        :label="item.name"
        :value="item.areaTeamId">
      </el-option>
    </el-select>
    <el-select v-if="busTeam" size="small" class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-form-group" multiple
               :disabled="busTeams.length === 0" v-model="formData.busTeamIds" placeholder="请选择业务组">
      <el-option
        v-for="item in busTeams"
        :key="item.busTeamId"
        :label="item.name"
        :value="item.busTeamId">
      </el-option>
    </el-select>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-form-group">
      <el-date-picker
        v-model="year"
        type="year"
        :clearable="false"
        :editable="false"
        placeholder="请选择年份">
      </el-date-picker>
    </div>
    <el-select :disabled="periods.length === 0" class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-form-group" multiple
               v-if="period" v-model="formData.periodIds" placeholder="请选择期数">
      <el-option
        v-for="item in periods"
        :key="item.periodId"
        :label="item.periodName"
        :value="item.periodId">
      </el-option>
    </el-select>
    <el-select v-if="product" size="small" class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-form-group" v-model="formData.productId" placeholder="产品线名称">
      <el-option
        v-for="item in products"
        :key="item.productId"
        :label="item.name"
        :value="item.productId">
      </el-option>
    </el-select>
    <el-select v-if="grade" size="small" class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-form-group" multiple
               v-model="formData.gradeIds" placeholder="请选择年级">
      <el-option
        v-for="item in grades"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-if="subject" size="small" class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-form-group"
               v-model="formData.subjectId" placeholder="请选择科目">
      <el-option
        v-for="item in subjects"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-if="classStatus" size="small" class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-form-group"
               v-model="formData.status" placeholder="请选择班级状态">
      <el-option
        v-for="item in statuses"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-form-group" v-if="startDate">
      <el-date-picker
        v-model="formData.startDate"
        type="date"
        placeholder="开始日期">
      </el-date-picker>
    </div>

    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-form-group" v-if="endDate">
      <el-date-picker
        v-model="formData.endDate"
        type="date"
        placeholder="结束日期">
      </el-date-picker>
    </div>
    <el-select v-if="needWithPeriod" size="small" class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-form-group"
               v-model="formData.needWithPeriod" placeholder="请选择科目">
      <el-option
        label="只查本期"
        value="0">
      </el-option>
      <el-option
        label="查询同期"
        value="1">
      </el-option>
    </el-select>

    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-form-group" v-if="className">
      <el-input v-model="formData.className" placeholder="班级名称"></el-input>
    </div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-form-group" v-if="teacherName">
     <el-input v-model="formData.teacherName" :placeholder="teacherNamePlaceholder"></el-input>
    </div>
    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-form-group am-u-end">
      <button @click="handleSearch" type="button" class="btn-search am-btn am-btn-default am-btn-success">
        <span class="am-icon-search"></span>搜索
      </button>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import moment from 'moment'
  export default{
    data:function(){
      return {
        products: [],
        periods: [],
        statuses: [
          {label: '初始化',value: 0},
          {label: '报名中',value: 1},
          {label: '已作废',value: 2},
          {label: '已结课',value: 3},
        ],
        year: moment().format('YYYY'),
        formData: {
          areaTeamId: '',
          busTeamIds: [],
          startDate:　'',
          endDate: '',
          gradeIds: [],
          periodIds: [],
          subjectId: '',
          productId: '',
          className: '',
          teacherName: '',
          status: '',
          needWithPeriod: '0',
        },
      }
    },
    props: {
      classStatus: {
        type: Boolean,
        default : false
      },
      needWithPeriod: {
        type: Boolean,
        default : false
      },
      teacherNamePlaceholder: {
        type: String,
        default: '教师名称'
      },
      areaTeam: {
        type: Boolean,
        default : false
      },
      busTeam: {
        type: Boolean,
        default : false
      },
      period: {
        type: Boolean,
        default : false
      },
      product: {
        type: Boolean,
        default : false
      },
      grade: {
        type: Boolean,
        default : false
      },
      subject: {
        type: Boolean,
        default : false
      },
      className: {
        type: Boolean,
        default : false
      },
      teacherName: {
        type: Boolean,
        default : false
      },
      startDate: {
        type: Boolean,
        default : false
      },
      endDate: {
        type: Boolean,
        default : false
      },
      defaultEndDate: {
        type: Boolean,
        default : false
      },
      needInitSearch: {
        type: Boolean,
        default : true
      },
      needGradeSearch: {
        type: Boolean,
        default : false
      }
    },
    computed: {
      areaTeams: function () {
        return this.$root.config.areaTeams || []
      },
      busTeams: function () {
        return ( ( this.formData.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.formData.areaTeamId] || [] ) : [] )
      },
      grades () {
        return this.$root.config.grades.map(function(item){
          return {value: item.gradeId, label: item.gradeName}
        })
      },
      subjects () {
        return [{value: '', label: '全部科目'}].concat(
          this.$root.config.subjects.map(function(item){
            return {value: item.subjectId, label: item.subjectName}
          })
        )
      }
    },
    created() {
      if (window.config.areaTeams) {
        this.formData.areaTeamId = window.config.areaTeams[0].areaTeamId
      }
      if(this.defaultEndDate) {
        this.formData.endDate = moment().format('YYYY-MM-DD')
      }
      this.loadProductsList()
      this.loadPeriodByYear()
    },
    watch: {
      year (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.loadPeriodByYear()
        }
      }
    },
    methods:{
      handleAreaTeamIdChange() {
        this.loadPeriodByYear()
        this.formData.busTeamIds = []
        this.formData.periodIds = []
      },
      handleSearch(e) {
        if (this.needGradeSearch &&  this.grade && this.formData.gradeIds.length === 0) {
          this.$alert('请选择年级！')
          return
        }
        this.$emit('search', e)
      },
      loadPeriodByYear: function () {
        var _this = this
        if(this.period) {
          io.post(io.periodByYearAndAreaTeamId,{
            areaTeamId: this.formData.areaTeamId,
            year: this.year ? moment(this.year).format('YYYY'): '',
          },function(ret){
            if(ret.success){
              _this.formData.periodIds = []
              _this.periods = ret.data
              if (_this.periods.length === 0) {
                _this.$alert('当前没有设置期数')
                _this.year = moment().format('YYYY')
              }
              if (_this.needInitSearch && _this.periods.length > 0) {
                _this.handleSearch()
              }
            }else{
              _this.$alert(ret.desc)
            }
          })
        }
      },
      loadProductsList:function(){
        var _this = this
        if (this.product) {
          io.post(io.apiAdminBaseProductList,{},function(ret){
            if(ret.success){
              _this.products = ret.data;
            }else{
              _this.$alert(ret.desc)
            }
          })
        }
      },
    }
  }
</script>

<style lang="less">
  .am-form input[type=text][readonly] {
    cursor: text;
    background-color: transparent;
  }
</style>
