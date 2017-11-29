<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">测评设置</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <el-form :model="query" :rules="rules" ref="query" label-width="150px" class="demo-query">
          <el-row>
            <el-col :span="12"><el-form-item label="请选择区域" prop="areaTeamId">
              <el-select v-model="query.areaTeamId" placeholder="请选择区域">
                <el-option v-for="item in areaTeams" :key="item.areaTeamId" :label="item.areaTeamName" :value="item.areaTeamId"></el-option>
              </el-select>
            </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="请选择期数" prop="periodId">
              <el-select v-model="query.periodId" placeholder="请选择期数">
                <el-option v-for="item in periods" :key="item.periodId" :label="item.periodName" :value="item.periodId"></el-option>
              </el-select>
            </el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><el-form-item label="请选择年级" prop="gradeId">
              <el-select v-model="query.gradeId" placeholder="请选择年级">
                <el-option v-for="item in grades" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId"></el-option>
              </el-select>
            </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="请选择科目" prop="subjectId">
              <el-select v-model="query.subjectId" placeholder="请选择科目">
                <el-option v-for="item in subjects" :key="item.subjectId" :label="item.subjectName" :value="item.subjectId"></el-option>
              </el-select>
            </el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><el-form-item label="请选择班型" prop="level">
              <el-select v-model="query.level" placeholder="请选择班型">
                <el-option value="1" label="①不区分"></el-option>
                <el-option value="2" label="②尖端"></el-option>
                <el-option value="3" label="③状元"></el-option>
                <el-option value="4" label="④尖子"></el-option>
                <el-option value="5" label="⑤提高"></el-option>
                <el-option value="6" label="⑥竞赛"></el-option>
                <el-option value="7" label="⑦集训队"></el-option>
              </el-select>
            </el-form-item></el-col>
          </el-row>
          <el-form-item label="请选择校区" prop="checkedCampuses">
            <el-checkbox  v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="query.checkedCampuses" @change="handleCampusesChange">
              <el-checkbox v-for="item in campuses" :key="item.campusId" :label="item.campusId">{{item.campusName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="请输入及格分数" prop="passingScore">
            <el-input type="Number" placeholder="请输入及格分数" v-model="query.passingScore"></el-input>
          </el-form-item>
          <el-form-item class="am-text-center">
            <el-button type="primary" @click="submitForm('query')">提交</el-button>
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
          studentId: '',
          areaTeamId: '',
          areaTeamName: "",
          campusIds: [],
          campusNames: "",
          gradeId: '',
          gradeName: "",
          level: '',
          periodId: '',
          periodName: "",
          passingScore: "",
          subjectId: '',
          subjectName: "",
          way: '0',
          checkedCampuses: [],
        },
        checkAll: false,
        isEdit: false,
        campuses: [],
        periods: [],
        rules: {
          passingScore: [
            { required: true, message: '请输入分数', trigger: 'blur' }
          ],
          areaTeamId: [
            { required: true, message: '请选择区域', trigger: 'change' }
          ],
          checkedCampuses: [
            { type: 'array',required: true, message: '请至少选择一个校区', trigger: 'change' }
          ],
          gradeId: [
            { required: true, message: '请选择年级', trigger: 'change' }
          ],
          subjectId: [
            { required: true, message: '请选择科目', trigger: 'change' }
          ],
          level: [
            { required: true, message: '请选择班型', trigger: 'change' }
          ],
          periodId: [
            { required: true, message: '请选择期数', trigger: 'change' }
          ],

        }
      };
    },
    props: ['studentId'],
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      console.log(1)
      this.query = {
        measurementId: '',
          studentId: '',
          areaTeamId: '',
          areaTeamName: "",
          campusIds: [],
          campusNames: "",
          gradeId: '',
          gradeName: "",
          level: '',
          periodId: '',
          periodName: "",
          passingScore: "",
          subjectId: '',
          subjectName: "",
          way: '0',
          checkedCampuses: [],
      }
      this.checkAll = false
      this.query.areaTeamId = window.config.areaTeams[0].areaTeamId
      this.query.measurementId = this.$route.query.measurementId
      if (this.query.measurementId) {
        this.measurementDetail(this.query.measurementId)
      }
    },
    watch: {
      'query.areaTeamId' () {
        if (!this.isEdit) {
          this.query.campusIds = []
          this.query.periodId = ''
          this.loadCampusData()
          this.loadPeriodData()
        } else {
          this.isEdit = false;
        }
      }
    },
    computed: {
      areaTeams: function () {
        var options = ( this.$root.config.areaTeams || [] )
          .map(function (item) {
            return {areaTeamId: item.areaTeamId, areaTeamName: item.name}
          })
        return options
      },
      grades: function () {
        return this.$root.config.grades.map(function(item){
          return {gradeId: item.gradeId, gradeName: item.gradeName}
        })
      },
      subjects: function () {
        return this.$root.config.subjects.map(function(item){
          return {subjectId: item.subjectId, subjectName: item.subjectName}
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
              _this.isEdit = true
              ret.data.checkedCampuses = ret.data.campusIds.split(',')
              _this.query = ret.data;
              _this.loadCampusData()
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
      loadCampusData:function(){
        var _this  = this
        if (!this.query.areaTeamId) {
          return
        }
        io.post(io.apiAdminCampusOfAreaTeam, {
          areaTeamId : _this.query.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.campuses = ret.data
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      submitForm(formName) {
        let _this = this
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
                _this.$alert(ret.desc)
              }
            })
          } else {
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
