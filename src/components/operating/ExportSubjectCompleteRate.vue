<template>
    <div class="m-export">
      <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
        <div class="widget am-cf">
          <div class="widget-head am-cf">
            <div class="widget-title am-fl">导出{{name}}表</div>
            <div class="widget-function am-fr">
              <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
            </div>
          </div>
          <div class="widget-body am-fr">
            <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
              <fieldset>
                <div class="am-form-group">
                  <label class="am-u-sm-3 am-form-label">
                    <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>区域
                  </label>
                  <div class="am-u-sm-3 am-u-end input-field">
                    <el-select  v-model="query.areaTeamId" placeholder="区域">
                      <el-option
                        v-for="item in areaTeams"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="am-form-group">
                  <label class="am-u-sm-3 am-form-label">
                    业务组(不选则导出所业务组)
                  </label>
                  <div class="am-u-sm-3 am-u-end input-field">
                    <el-select multiple  v-model="query.busTeamIds" placeholder="业务组">
                      <el-option
                        v-for="item in busTeams"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="am-form-group">
                  <label class="am-u-sm-3 am-form-label">
                    <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>期数
                  </label>
                  <div class="am-u-sm-3 am-u-end input-field">
                    <el-select :disabled="periods.length === 0" multiple  v-model="query.periodIds" placeholder="期数">
                      <el-option
                        v-for="item in periods"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="am-form-group" v-show="active === '1'">
                  <label class="am-u-sm-3 am-form-label">
                    <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>年级阶段
                  </label>
                  <div class="am-u-sm-3 am-u-end input-field">
                    <el-select v-model="query.sectionId" placeholder="请选择年级阶段">
                      <el-option
                        v-for="item in sections"
                        :key="item.sectionId"
                        :label="item.sectionName"
                        :value="item.sectionId">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="am-form-group" v-if="active=== '2'">
                  <label class="am-u-sm-3 am-form-label">
                    年级(不选则导出所有年级)
                  </label>
                  <div class="am-u-sm-3 am-u-end input-field">
                    <el-select multiple v-model="query.gradeIds" placeholder="请选择年级">
                      <el-option
                        v-for="item in grades"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="am-form-group">
                  <div class="am-u-sm-9 am-u-sm-push-3">
                    <button type="button" class="am-btn am-btn-default am-btn-success"
                            @click="handleExport" >确定导出
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
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
        active: '',
        query: {
          areaTeamId : this.areaTeamId || window.config.areaTeams[0] && window.config.areaTeams[0].areaTeamId || '' ,
          busTeamIds : [],
          periodIds : [],
          sectionId : '',
          gradeIds : [],
        },
        searchConfig: {},
        products:[],
        courses:[],
        periods:[],
        selection:[],
        sections: [
          {
            sectionId: 1,
            sectionName: '小学',
          },
          {
            sectionId: 2,
            sectionName: '初中',
          },
          {
            sectionId: 3,
            sectionName: '高中',
          },{
            sectionId: 99,
            sectionName: '其他',
          },
        ]
      }
    },
    mounted: function () {
      $(window).smoothScroll()
    },
    created: function () {
    	this.active = this.$route.query.active
      this.loadPeriodData()
    },
    computed: {
    	name() {
        let active = this.$route.query.active
    		if (active === '1') {
    			return '年级科数完成率'
        } else if (active === '0') {
          return '班主任科数完成率'
        } else if (active === '2') {
    			return '班级续读率'
        }
      },
      areaTeams: function () {
        var options = ( this.$root.config.areaTeams || [] )
          .map(function (item) {
            return {value: item.areaTeamId, label: item.name}
          })
        return options
      },
      busTeams: function () {
        var options = ( ( this.query.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.query.areaTeamId] || [] ) : [] )
          .map(function (item) {
            return {value: item.busTeamId, label: item.name}
          })
        this.query.busTeamIds = []
        return options
      },
      grades: function () {
        return this.$root.config.grades.map(function(item){
          return {value: item.gradeId, label: item.gradeName}
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
        this.query.busTeamIds =  []
        this.query.periodIds = []
        this.loadPeriodData()
      }
    },
    methods: {
      loadPeriodData: function () {
        var _this = this
        io.post(io.apiAdminPeriodListForAreaTeam, {
          areaTeamId : this.query.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.periods = ret.data.map(function (item) {
              return {value: item.periodId, label: item.periodName }
            })
          } else {
            console.log(ret.desc)
            _this.periods = []
          }
        })
      },
      handleExport() {
        if(this.active === '0') {
          this.exportSeniorComletionRate()
        } else if (this.active === '1'){
          this.exportGradeCompletionRate()
        } else if (this.active === '2') {
          this.exportClassComletionRate()
        }
      },
      exportSeniorComletionRate:function(){
        var _this = this,busTeamIds = [];
        if (this.query.busTeamIds.length === 0) {
          this.busTeams.map((val) => {
            busTeamIds.push(val.value)
          })
        } else {
          busTeamIds = this.query.busTeamIds
        }
        if (this.query.periodIds.length === 0) {
          this.$alert('期数不能为空！')
          return
        }
        io.downloadFile(io.exportSeniorComletionRate,{
          areaTeamIdList:_this.query.areaTeamId,
          busTeamIdList: busTeamIds.join(',') ,
          periodIdList: _this.query.periodIds.join(',')
        },function(ret){
          if(ret.success){
            _this.$hiddenLoading()
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      exportGradeCompletionRate:function(){
        var _this = this,busTeamIds = [];
        if (this.query.busTeamIds.length === 0) {
          this.busTeams.map((val) => {
          	busTeamIds.push(val.value)
          })
        } else {
          busTeamIds = this.query.busTeamIds
        }
        if (this.query.periodIds.length === 0) {
          this.$alert('期数不能为空！')
          return
        }
        if (!this.query.sectionId) {
          this.$alert('年级阶段不能为空！')
          return
        }
        io.downloadFile(io.exportGradeCompletionRate,{
          sectionIdList:_this.query.sectionId,
          areaTeamIdList:_this.query.areaTeamId,
          busTeamIdList: busTeamIds.join(',') ,
          periodIdList: _this.query.periodIds.join(',')
        },function(ret){
          if(ret.success){
            _this.$hiddenLoading()
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      exportClassComletionRate:function(){
        var _this = this,busTeamIds = [];
        if (this.query.busTeamIds.length === 0) {
          this.busTeams.map((val) => {
            busTeamIds.push(val.value)
          })
        } else {
          busTeamIds = this.query.busTeamIds
        }
        if (this.query.periodIds.length === 0) {
          this.$alert('期数不能为空！')
          return
        }
        io.downloadFile(io.exportClassComletionRate,{
          gradeIdList:_this.query.gradeIds.join(','),
          areaTeamIdList:_this.query.areaTeamId,
          busTeamIdList:busTeamIds.join(',') ,
          periodIdList: _this.query.periodIds.join(',')
        },function(ret){
          if(ret.success){
            _this.$hiddenLoading()
          }else{
            _this.$alert(ret.desc)
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
  .export-btn {
    text-align: center;
    margin-top: 10px;
  }
</style>
<style>
  .m-export .am-form input[type=text][readonly] {
    background-color: #fff;
    cursor: pointer;
  }
</style>
