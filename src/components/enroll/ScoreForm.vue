<template>
  <window ref="win" title="新建测评成绩">
    <el-form :model="query" :rules="rules" ref="query" label-width="20px" class="demo-query">
      <el-row>
        <el-col :span="12"><el-form-item label=" " prop="areaTeamId">
        <el-select v-model="query.areaTeamId" placeholder="请选择区域">
          <el-option v-for="item in areaTeams" :key="item.areaTeamId" :label="item.areaTeamName" :value="item.areaTeamId"></el-option>
        </el-select>
      </el-form-item></el-col>
        <el-col :span="12"><el-form-item label=" " prop="periodId">
          <el-select v-model="query.periodId" placeholder="请选择期数">
            <el-option v-for="item in periods" :key="item.periodId" :label="item.periodName" :value="item.periodId"></el-option>
          </el-select>
        </el-form-item></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><el-form-item label=" " prop="gradeId">
          <el-select v-model="query.gradeId" placeholder="请选择年级">
            <el-option v-for="item in grades" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId"></el-option>
          </el-select>
        </el-form-item></el-col>
        <el-col :span="12"><el-form-item label=" " prop="subjectId">
          <el-select v-model="query.subjectId" placeholder="请选择科目">
            <el-option v-for="item in subjects" :key="item.subjectId" :label="item.subjectName" :value="item.subjectId"></el-option>
          </el-select>
        </el-form-item></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><el-form-item label=" " prop="level">
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
        <el-col :span="12"><el-form-item label=" " prop="campusId">
          <el-select v-model="query.campusId" placeholder="请选择校区">
            <el-option v-for="item in campuses" :key="item.campusId" :label="item.campusName" :value="item.campusId"></el-option>
          </el-select>
        </el-form-item></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><el-form-item label=" " prop="validity">
          <el-select v-model="query.validity" placeholder="请选择状态">
            <el-option label="有效" value="1"></el-option>
            <el-option label="作废" value="0"></el-option>
          </el-select>
        </el-form-item></el-col>
      </el-row>
      <el-form-item label=" " prop="studentScore">
        <el-input type="Number" placeholder="请输入分数" v-model="query.studentScore"></el-input>
      </el-form-item>
      <el-form-item class="am-text-center">
        <el-button type="primary" @click="submitForm('query')">提交</el-button>
      </el-form-item>
    </el-form>
  </window>
</template>

<script>
  import io from '../../lib/io'
  export default{
    data() {
      return {
        query: {
          studentMeasureScoreId: '',
          studentId: '',
          areaTeamId: '',
          areaTeamName: "",
          campusId: '',
          campusName: "",
          gradeId: '',
          gradeName: "",
          level: '',
          periodId: '',
          periodName: "",
          studentScore: "",
          subjectId: '',
          subjectName: "",
          way: '0',
          validity: '1'
        },
        isEdit: false,
        campuses: [],
        periods: [],
        rules: {
          studentScore: [
            { required: true, message: '请输入分数', trigger: 'blur' }
          ],
          areaTeamId: [
            { required: true, message: '请选择区域', trigger: 'change' }
          ],
          campusId: [
            { required: true, message: '请选择校区', trigger: 'change' }
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
          validity: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ],
        }
      };
    },
    props: ['studentId'],
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.query.studentId = this.studentId
    },
    watch: {
      'query.areaTeamId' () {
        if (!this.isEdit) {
          this.query.campusId = ''
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
            _this.query.campusName = _this.campuses.filter((item)=>{ return item.campusId === _this.query.campusId })[0].campusName
            _this.query.studentId = _this.studentId
            io.post(io.saveOrUpdateStudentScore,_this.query, function (ret) {
              if (ret.success) {
                _this.$toast('提交成功！')
                _this.$emit('completed')
                _this.$refs.win.close()
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
      studentScoreDetail(studentMeasureScoreId) {
        let _this = this;
        io.post(io.studentScoreDetail,{studentMeasureScoreId: studentMeasureScoreId}, function (ret) {
          if (ret.success) {
            _this.query = ret.data
            _this.isEdit = true
            _this.loadCampusData()
            _this.loadPeriodData()
            _this.$refs.win.show({
              width:700,
              height:600
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      show:function(){
        if (this.query.studentMeasureScoreId) {
          this.studentScoreDetail(this.query.studentMeasureScoreId)
        } else {
          this.query =  {
            studentMeasureScoreId: '',
              studentId: '',
              areaTeamId: '',
              areaTeamName: "",
              campusId: '',
              campusName: "",
              gradeId: '',
              gradeName: "",
              level: '',
              periodId: '',
              periodName: "",
              studentScore: "",
              subjectId: '',
              subjectName: "",
              way: '0',
              validity: '1'
          };
          this.$refs.win.show({
            width:700,
            height:600
          })
        }
      },
    }
  }
</script>
<style lang="less">
  .el-form {
    padding: 30px 100px;
  }
  .el-form-item__content {
    text-align: left;
  }
  .am-text-center .el-form-item__content {
    text-align: center;
  }
</style>
