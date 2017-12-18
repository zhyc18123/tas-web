<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">试卷编辑</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <el-form :model="query" :rules="rules" ref="query" label-width="210px" class="demo-query">
          <el-row>
            <el-col :span="12"><el-form-item label="请选择区域" prop="areaTeamId">
              <el-select v-model="query.areaTeamId" placeholder="请选择区域">
                <el-option v-for="item in areaTeams" :key="item.areaTeamId" :label="item.areaTeamName" :value="item.areaTeamId"></el-option>
              </el-select>
            </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="请选择年级" prop="gradeId">
              <el-select v-model="query.gradeId" placeholder="请选择年级">
                <el-option v-for="item in grades" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId"></el-option>
              </el-select>
            </el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><el-form-item label="请选择科目" prop="subjectId">
              <el-select v-model="query.subjectId" placeholder="请选择科目">
                <el-option v-for="item in subjects" :key="item.subjectId" :label="item.subjectName" :value="item.subjectId"></el-option>
              </el-select>
            </el-form-item></el-col>
            <el-col :span="12">
              <el-form-item label="试卷标题" prop="title">
                <el-input type="text" placeholder="请输入试卷标题" v-model="query.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="考试时间/分钟（请输入整数）" prop="testTime">
                <el-input type="Number" placeholder="请输入考试时间" v-model="query.testTime"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
          areaTeamId: '',
          gradeId: '',
          subjectId: '',
          title: '',
          testTime: '',
        },
        disabledBtn: false,
        isEdit: false,
        rules: {
          title: [
            { required: true, message: '请输入试卷标题', trigger: 'blur' }
          ],
          testTime: [
            { required: true, message: '请输入考试时间', trigger: 'blur' }
          ],
          areaTeamId: [
            { required: true, message: '请选择区域', trigger: 'change' }
          ],
          gradeId: [
            { required: true, message: '请选择年级', trigger: 'change' }
          ],
          subjectId: [
            { required: true, message: '请选择科目', trigger: 'change' }
          ],

        }
      };
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
      this.query = {
        areaTeamId: '',
        gradeId: '',
        subjectId: '',
        title: '',
        testTime: '',
      }
      this.checkAll = false
      this.disabledBtn = false
      this.query.examPaperId = this.$route.query.examPaperId
      if (this.query.examPaperId) {
        this.isEdit = true
        this.examPaperDetail(this.query.examPaperId)
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
      examPaperDetail(examPaperId) {
        let _this =this;
        if (this.query.examPaperId) {
          io.post(io.questionsOfExamPaper, {
            examPaperId : examPaperId
          }, function (ret) {
            if (ret.success) {
              _this.query = ret.data.examPaper;
            } else {
              _this.$alert(ret.desc)
            }
          })
        }
      },
      submitForm(formName) {
        let _this = this
        this.disabledBtn = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (Number(_this.query.testTime) % 1 !== 0) {
              _this.$alert('考试时间为整数')
              this.disabledBtn = false
              return
            }
            io.post(io.saveOrUpdateExamPaper,_this.query, function (ret) {
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
<style lang="less" scoped>
  .el-form {
    padding: 30px 100px;
  }
  .el-form-item__content {
    text-align: left;
  }
  .am-text-center .el-form-item__content {
    text-align: left;
  }
  .el-select {
    width: 100%;
  }
  .am-text-center .el-form-item__content {
    text-align: center;
  }
</style>
