<template>
  <div class="am-u-sm-12 am-form ">
    <div v-if="isAreaTeam" class="am-u-sm-12 am-u-md-12 am-u-lg-3">
      <div class="am-form-group">
        <select2  v-model="query.areaTeamId" :options="areaTeams">
          <option value="" disabled>区域</option>
        </select2>
      </div>
    </div>
    <div v-if="isBusTeam" class="am-u-sm-12 am-u-md-12 am-u-lg-3">
      <div class="am-form-group">
        <select2  v-model="query.busTeamId" :options="busTeams">
          <option value="">业务组</option>
        </select2>
      </div>
    </div>

    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
      <div class="am-form-group">
        <select2  v-model="query.productId" :options="products">
          <option value="">产品</option>
        </select2>
      </div>
    </div>

    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
      <div class="am-form-group">
        <select2  v-model="query.courseTemplateId" :options="courses">
          <option value="">课程</option>
        </select2>
      </div>
    </div>

    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
      <div class="am-form-group">
        <select2 :disabled="periods.length === 0"  v-model="query.periodId" :options="periods">
          <option value="">期数</option>
        </select2>
      </div>
    </div>

    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
      <div class="am-form-group">
        <select2  v-model="query.gradeId" :options="grades">
          <option value="">年级</option>
        </select2>
      </div>
    </div>

    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
      <div class="am-form-group">
        <select2  v-model="query.subjectId" :options="subjects">
          <option value="">科目</option>
        </select2>
      </div>
    </div>

    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
      <div class="am-form-group">
        <select2  v-model="query.status">
          <option value="">班级状态</option>
          <option value="0">初始化</option>
          <option value="1">报名中</option>
          <option value="2">已作废</option>
          <option value="3">已结课</option>
        </select2>
      </div>
    </div>

    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
      <div class="am-form-group">
        <input type="text" name="className" v-model="query.className" placeholder="请输入班级名称"/>
      </div>
    </div>

    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
      <div class="am-form-group">
        <input type="text" name="teacherNames" v-model="query.teacherNames" placeholder="请输入教师姓名"/>
      </div>
    </div>

    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3">
      <div class="am-form-group">
        <el-date-picker
          v-model="query.startCourseTime"
          type="date"
          placeholder="请选择开课日期">
        </el-date-picker>
      </div>
    </div>

    <div class="am-u-sm-12 am-u-md-12 am-u-lg-3 am-u-end">
      <div class="am-form-group">
        <button type="button" class="am-btn am-btn-default am-btn-success"
                @click="search" ><span class="am-icon-search"></span>查询
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  import io from '../../lib/io'
  import moment from 'moment'

  export default{
    data: function () {
      return {
        query: {
          areaTeamId : this.areaTeamId || window.config.areaTeams[0] && window.config.areaTeams[0].areaTeamId || '' ,
          busTeamId : this.busTeamId,
          courseTemplateId:'',
          productId : '',
          periodId : '',
        },
        searchConfig: {},
        products:[],
        courses:[],
        periods:[],
        selection:[]
      }
    },
    props: ['areaTeamId', 'busTeamId','isAreaTeam', 'isBusTeam'],
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.loadProductData()
      this.loadCourseData()
      this.loadPeriodData()
    },
    computed: {
      areaTeams: function () {
        var options = ( this.$root.config.areaTeams || [] )
          .map(function (item) {
            return {value: item.areaTeamId, text: item.name}
          })
        return options
      },
      busTeams: function () {
        var options = ( ( this.query.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.query.areaTeamId] || [] ) : [] )
          .map(function (item) {
            return {value: item.busTeamId, text: item.name}
          })
        this.query.busTeamId = ''
        return options
      },
      grades: function () {
        return this.$root.config.grades.map(function(item){
          return {value: item.gradeId, text: item.gradeName}
        })
      },
      subjects: function () {
        return this.$root.config.subjects.map(function(item){
          return {value: item.subjectId, text: item.subjectName}
        })
      },
    },
    watch:{
      'query.areaTeamId':function(){
        this.query.busTeamId =  ''
        this.query.productId = ''
        this.query.courseTemplateId = ''
        this.query.periodId = ''
        this.loadProductData()
        this.loadCourseData()
        this.loadPeriodData()
      }
    },
    methods: {
      search: function () {
        this.$emit('search', this.query)
      },
      loadProductData: function () {
        var _this = this
        if (!this.query.areaTeamId) {
          this.$alert('请选择区域！')
          return
        }
        io.post(io.apiAdminBaseProductListForAreaTeam, {
          areaTeamId : this.query.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.products = ret.data.map(function (item) {
              return {value: item.productId, text: item.name}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadCourseData: function () {
        var _this = this
        io.post(io.apiAdminBaseCourseListForAreaTeam, {
          areaTeamId : this.query.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.courses = ret.data.map(function (item) {
              return {value: item.courseTemplateId, text: item.courseName}
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadPeriodData: function () {
        var _this = this
        io.post(io.apiAdminPeriodListForAreaTeam, {
          areaTeamId : this.query.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.periods = ret.data.map(function (item) {
              return {value: item.periodId, text: item.periodName }
            })
          } else {
            console.log(ret.desc)
            _this.periods = []
          }
        })
      },

    }
  }
</script>
<style lang="less" spoded>
  .am-form {
    &>.am-u-sm-12:nth-child(4n + 1) {
      clear: both;
    }
  }
</style>
