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
        <el-form :model="query" :rules="rules" ref="query" label-width="200px" class="demo-query">
          <el-form-item label="区域：">
            <div>{{areaTeamName}}</div>
          </el-form-item>
          <el-form-item label="科目：">
            <div>{{subjectName}}</div>
          </el-form-item>
          <el-form-item label="年级：" prop="gradeIds">
            <el-checkbox-group v-model="query.gradeIds">
              <el-checkbox v-for="item in grades" :key="item.gradeId" :label="item.gradeId">{{item.gradeName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="期数：" prop="periodIds">
            <el-checkbox-group v-model="query.periodIds">
              <el-checkbox v-for="item in periods" :key="item.periodId" :label="item.periodId">{{item.periodName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="班型：" prop="levels">
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
          <el-form-item label="报名校区：" prop="campusIds">
            <el-checkbox  v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="query.campusIds" @change="handleCampusesChange">
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
        subjectName: '',
        areaTeamId: '',
        areaTeamName: '',
        query: {
          campusIds: [],
          gradeIds: [],
          measurementId: '',
          levels: [],
          periodIds: [],
        },
        rules: {
          campusIds: [
            { type: 'array',required: true, message: '请至少选择一个校区', trigger: 'change' }
          ],
          gradeIds: [
            { type: 'array', required: true, message: '请至少选择一个年级', trigger: 'change' }
          ],
          levels: [
            { type: 'array', required: true, message: '请至少选择一个班型', trigger: 'change' }
          ],
          periodIds: [
            { type: 'array', required: true, message: '请至少选择一个期数', trigger: 'change' }
          ],
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
    computed: {
      grades: function () {
        return this.$root.config.grades.map(function(item){
          return {gradeId: item.gradeId, gradeName: item.gradeName}
        })
      },
    },
    methods: {
      formatData(arr) {
        debugger
        for(let i=0 ; i< arr.length; i++) {
          arr[i] = '' + String(new Number(arr[i]).toFixed(0))
        }
        return arr
      },
      handleCheckAllChange(event) {
        let allCampusId = []
        this.campuses.map(item => {
          allCampusId.push(item.campusId)
        })
        this.query.campusIds = event.target.checked ? allCampusId : [];
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
              let whitelistConfig = JSON.parse(ret.data.whitelistConfig);
              _this.areaTeamId = ret.data.areaTeamId;
              _this.subjectName = ret.data.subjectName
              _this.areaTeamName = ret.data.areaTeamName
              if (whitelistConfig) {
                _this.query.periodIds = whitelistConfig.periodIds
                _this.query.gradeIds = whitelistConfig.gradeIds
                _this.query.levels = whitelistConfig.levels
                _this.query.campusIds = whitelistConfig.campusIds
              } else {
                _this.query.periodIds = []
                _this.query.gradeIds = []
                _this.query.levels = []
                _this.query.campusIds = []
              }
              _this.loadCampusData(_this.query.campusIds)
              _this.loadPeriodData()
            } else {
              _this.$alert(ret.desc)
            }
          })
        }
      },
      loadPeriodData: function () {
        var _this = this
        if (!this.areaTeamId) {
          return
        }
        io.post(io.apiAdminPeriodListForAreaTeam, {
          areaTeamId : this.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.periods = ret.data.map(function (item) {
              return {periodId: item.periodId, periodName: item.periodName }
            })
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadCampusData:function(checkedCampuses){
        var _this  = this
        if (!this.areaTeamId) {
          return
        }
        io.post(io.apiAdminCampusOfAreaTeam, {
          areaTeamId : _this.areaTeamId
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
        let _this = this,whitelistConfig
        this.disabledBtn = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            whitelistConfig = JSON.stringify({
              periodIds: this.query.periodIds,
              gradeIds: this.query.gradeIds,
              levels: this.query.levels,
              campusIds: this.query.campusIds,
            })
            io.post(io.updateWhiltelist,{
              measurementId: this.query.measurementId,
              whitelistConfig: whitelistConfig,
            }, function (ret) {
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
