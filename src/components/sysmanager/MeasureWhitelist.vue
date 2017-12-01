<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">设置测评白名单</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <el-form :model="query" ref="query" label-width="200px" class="demo-query">
          <el-form-item label="区域：">
            <div>{{}}</div>
          </el-form-item>
          <el-form-item label="科目：">
            <div>{{}}</div>
          </el-form-item>
          <el-form-item label="年级：">
            <el-checkbox-group v-model="query.gradeIds">
              <el-checkbox v-for="item in grades" :key="item.gradeId" :label="item.gradeId">{{item.gradeName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="期数：">
            <el-checkbox-group v-model="query.periodIds">
              <el-checkbox v-for="item in periods" :key="item.periodId" :label="item.periodId">{{item.periodName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="班型：">
            <el-checkbox-group v-model="query.levels">
              <el-checkbox label="1">不区分</el-checkbox>
              <el-checkbox label="2">尖端</el-checkbox>
              <el-checkbox label="3">状元</el-checkbox>
              <el-checkbox label="4">尖子</el-checkbox>
              <el-checkbox label="5">提高</el-checkbox>
              <el-checkbox label="6">竞赛</el-checkbox>
              <el-checkbox label="7">集训队</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="报名校区：">
            <el-checkbox  v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="query.checkedCampuses" @change="handleCampusesChange">
              <el-checkbox v-for="item in campuses" :key="item.campusId" :label="item.campusId">{{item.campusName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item class="am-text-center">
            <el-button :disabled="disabledBtn" type="primary" @click="submitForm('query')">提交</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  export default{
    data() {
      return {
        query: {
          measurementId: '',
          areaTeamId: '',
          areaTeamName: "",
          campusIds: [],
          campusNames: "",
          gradeIds: [],
          levels: [],
          periodIds: [],
          checkedCampuses: [],
        },
        disabledBtn: false,
        checkAll: false,
        isEdit: false,
        campuses: [],
        periods: [],
      };
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.checkAll = false
      this.disabledBtn = false
      this.query.measurementId = this.$route.query.measurementId
      if (this.query.measurementId) {
        this.isEdit = true
        this.measurementDetail(this.query.measurementId)
      } else {
        this.query.areaTeamId = window.config.areaTeams[0].areaTeamId
      }
    },
    watch: {
      'query.areaTeamId' () {
        if (!this.isEdit) {
          this.query.campusIds = []
          this.query.periodId = ''
          this.query.checkedCampuses = []
          this.loadCampusData()
          this.loadPeriodData()
        } else {
          this.isEdit = false;
        }
      }
    },
    computed: {
      grades: function () {
        return this.$root.config.grades.map(function(item){
          return {gradeId: item.gradeId, gradeName: item.gradeName}
        })
      },
    },
    methods: {
      handleCheckAllChange(event) {
        let allCampusId = []
        this.campuses.map(item => {
          allCampusId.push(item.campusId)
        })
        this.query.checkedCampuses = event.target.checked ? allCampusId : [];
      },
      handleCampusesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.campuses.length;
      },
      measurementDetail(measurementId) {
        let _this =this;
        if (this.query.measurementId) {
          io.post(io.measurementDetail, {
            measurementId : measurementId
          }, function (ret) {
            if (ret.success) {
              ret.data.checkedCampuses = ret.data.campusIds.split(',')
              _this.query.areaTeamId = ret.data.areaTeamId;
              _this.loadCampusData(ret.data.checkedCampuses)
              _this.loadPeriodData()
            } else {
              _this.$alert(ret.desc)
            }
          })
        }
      },
      loadPeriodData: function () {
        var _this = this
        if (!this.query.areaTeamId) {
          return
        }
        io.post(io.apiAdminPeriodListForAreaTeam, {
          areaTeamId : this.query.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.periods = ret.data.map(function (item) {
              return {periodId: item.periodId, periodName: item.periodName }
            })
            _this.query.periodId = _this.query.periodId ? _this.query.periodId: ret.data.filter(item => item.isCurrent == 1 )[0].periodId
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadCampusData:function(checkedCampuses){
        var _this  = this
        if (!this.query.areaTeamId) {
          return
        }
        io.post(io.apiAdminCampusOfAreaTeam, {
          areaTeamId : _this.query.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.campuses = ret.data
            if(checkedCampuses) {
              _this.handleCampusesChange(checkedCampuses)
            }
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      submitForm(formName) {
        let _this = this
        this.disabledBtn = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.query.areaTeamName = _this.areaTeams.filter((item)=>{ return item.areaTeamId === _this.query.areaTeamId })[0].areaTeamName
            _this.query.gradeName = _this.grades.filter((item)=>{ return item.gradeId === _this.query.gradeId })[0].gradeName
            _this.query.periodName = _this.periods.filter((item)=>{ return item.periodId === _this.query.periodId })[0].periodName
            _this.query.subjectName = _this.subjects.filter((item)=>{ return item.subjectId === _this.query.subjectId })[0].subjectName
            let campusNames = [];
            _this.query.checkedCampuses.map((campusId) => {
              campusNames.push(_this.campuses.filter((item)=>{return item.campusId === campusId})[0].campusName)
            })
            io.post(io.saveOrUpdateMeasurement,Object.assign({},_this.query,{
              campusNames: campusNames.join(','),
              campusIds: _this.query.checkedCampuses.join(',')
            }), function (ret) {
              if (ret.success) {
                _this.$toast('提交成功！')
                _this.$router.go(-1)
              } else {
                _this.disabledBtn = false
                _this.$alert(ret.desc)
              }
            })
          } else {
            this.disabledBtn = false
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>
<style lang="less">
  .el-form {
    padding: 30px 100px;
  }
  .red {
    padding: 0 100px;
    color: #ff9449;
    font-size: 14px;
  }
  .el-form-item__content {
    text-align: left;
  }
  .am-text-center .el-form-item__content {
    text-align: left;
  }
  .el-checkbox+.el-checkbox {
    margin-left: 0;
  }
  .el-checkbox {
    margin-right: 15px;
  }
  .am-text-center .el-form-item__content {
    text-align: center;
  }
</style>
