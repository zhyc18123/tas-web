<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">优惠信息</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id">
          <fieldset>
            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>优惠规则
              </label>
              <div class="am-u-sm-3 input-field  am-u-end">
                <select2 required v-model="formData.discountRuleId">
                  <option value="">请选择优惠规则</option>
                  <option v-for="item in discountRuleList" :value="item.discountRuleId">{{item.name}}</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>优惠说明
              </label>
              <div class="am-u-sm-9 input-field  am-u-end">
                <textarea required v-model="formData.remark" readonly></textarea>
              </div>
            </div>

            <div class="am-form-group" v-if="formData.discountRuleId">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>参数
              </label>
              <div class="am-u-sm-9  am-u-end">
                <div class="am-g am-margin-bottom-xs am-padding-left-xs" v-for="(param,index) in formData.params">
                  <div class="am-u-sm-2 input-field">
                    <select2 required v-model="param.type" disabled>
                      <option value="">数据类型</option>
                      <option value="string">字符串</option>
                      <option value="int">整数</option>
                      <option value="float">浮点数</option>
                      <option value="date">日期</option>
                    </select2>
                  </div>
                  <div class="am-u-sm-3 input-field">
                    <input type="text" class="am-form-field" placeholder="参数名" required v-model="param.name" disabled>
                  </div>
                  <div class="am-u-sm-3 input-field">
                    <input type="text" class="am-form-field" placeholder="默认值" required v-model="param.value">
                  </div>
                  <div class="am-u-sm-3 input-field am-u-end">
                    <input type="text" class="am-form-field" placeholder="说明" required v-model="param.remark" disabled>
                  </div>
                </div>
                <span class="am-text-xs">折扣参数使用百分比，如95%</span>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>优惠名称
              </label>
              <div class="am-u-sm-9 input-field">
                <input type="text" class="am-form-field" placeholder="请输入名称" required v-model="formData.name">
              </div>
            </div>


            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>开关状态
              </label>
              <div class="am-u-sm-3 input-field  am-u-end">
                <select2 required v-model="formData.switchStatus">
                  <option value="">请选择开关状态</option>
                  <option value="0">关闭</option>
                  <option value="1">启用</option>
                </select2>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>生效开始时间
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <date-time-picker v-model="formData.effectiveStartTime" format="YYYY-MM-DD HH:mm">
                  <input data-am-datetimepicker class="am-form-field" placeholder="请选择生效开始时间">
                </date-time-picker>
              </div>
            </div>


            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>生效结束时间
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <date-time-picker v-model="formData.effectiveEndTime" format="YYYY-MM-DD HH:mm">
                  <input data-am-datetimepicker class="am-form-field" placeholder="请选择生效结束时间">
                </date-time-picker>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>所属区域
              </label>
              <div class="am-u-sm-3 am-u-end input-field">
                <select2 required v-model="formData.areaTeamId" :options="areaTeams">
                  <option value="">请选择</option>
                </select2>

              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                适用业务组
              </label>
              <div class="am-u-sm-9  input-field">
                <choose v-model="formData.busTeamIds">
                  <select  data-placeholder="选择业务组" style="min-width:300px;" multiple class="chosen-select-no-results">
                    <option value="" ></option>
                    <option v-for="item in busTeams" :value="item.value" :key="item.value">{{item.text}}</option>
                  </select>
                </choose>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                适用产品
              </label>
              <div class="am-u-sm-9  input-field">
                <choose v-model="formData.productIds">
                  <select  data-placeholder="选择产品" style="min-width:300px;" multiple class="chosen-select-no-results">
                    <option value="" ></option>
                    <option v-for="item in productList" :value="item.productId" :key="item.productId">{{item.name}}</option>
                  </select>
                </choose>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                适用课程
              </label>
              <div class="am-u-sm-9  input-field">
                <choose v-model="formData.courseTemplateIds">
                  <select  data-placeholder="选择产品" style="min-width:300px;" multiple class="chosen-select-no-results">
                    <option value=""></option>
                    <option v-for="item in templateCourseList" :value="item.courseTemplateId" :key="item.courseTemplateId">{{item.courseName}}</option>
                  </select>
                </choose>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                适用期
              </label>
              <div class="am-u-sm-9 input-field">
                <choose v-model="formData.periodIds">
                  <select  data-placeholder="选择期" style="min-width:300px;" multiple class="chosen-select-no-results">
                    <option value=""></option>
                    <option v-for="item in periods" :value="item.periodId">{{item.periodName}}</option>
                  </select>
                </choose>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                适用年级
              </label>
              <div class="am-u-sm-9  input-field">
                <choose v-model="formData.gradeIds">
                  <select  data-placeholder="选择年级" style="min-width:300px;" multiple class="chosen-select-no-results">
                    <option value=""></option>
                    <option v-for="item in $root.config.grades" :value="item.gradeId">{{item.gradeName}}</option>
                  </select>
                </choose>
              </div>
            </div>

            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                适用科目
              </label>
              <div class="am-u-sm-9 input-field">
                <choose v-model="formData.subjectIds">
                  <select  data-placeholder="选择科目" style="min-width:300px;" multiple class="chosen-select-no-results">
                    <option value=""></option>
                    <option v-for="item in $root.config.subjects" :value="item.subjectId">{{item.subjectName}}</option>
                  </select>
                </choose>
              </div>
            </div>


            <div class="am-form-group">
              <label class="am-u-sm-3 am-form-label">
                不和其他叠加
              </label>
              <div class="am-u-sm-9 input-field">
                <el-tag v-for="(item ,n ) in formData.exclusiveDiscountIds" type="warring" :closable="true" :close-transition="true" @close="handleDelExclusiveDiscount(n)">{{formData.exclusiveDiscountNames[n]}}</el-tag>
                <el-button type="small" @click="selectDiscount">添加</el-button>
              </div>
            </div>


            <div class="am-form-group">
              <div class="am-u-sm-9 am-u-sm-push-3">

                <button type="submit" class="am-btn am-btn-primary">提交</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
    <select-discount ref="selectDiscount" @ok="handleSelectDiscount"></select-discount>
  </div>
</template>
<script>
  import io from '../../lib/io'
  import util from '../../lib/util'
  import conf from '../../lib/conf'
  import SelectDiscount from './SelectDiscount'


  export default{
    components:{'select-discount':SelectDiscount},
    data(){
      return {
        discountRuleList: [],
        productList:[],
        templateCourseList:[],
        periods:[],
        formData: {
          discountId: this.$params('discountId'),
          discountRuleId: '',
          areaTeamId:'',
          busTeamIds:[],
          periodIds:[],
          productIds:[],
          courseTemplateIds:[],
          gradeIds:[],
          subjectIds:[],
          name: '',
          switchStatus: 1,
          discountType: 0,
          params: [{}],
          exclusiveDiscountIds:[],
          exclusiveDiscountNames:[]
        }
      }
    },
    created: function () {
      this.loadDiscountRuleList()
      this.loadDetail()
    },
    watch: {
      'formData.discountRuleId': function (val, oVal) {
        if (val ){
          if(this.formData._discountId ){
            delete this.formData._discountId
          }else{
            var rule = this.discountRuleList.filter(item => item.discountRuleId == val)[0]
            this.formData.params = JSON.parse(rule.params)
            this.formData.name = rule.name
            this.formData.remark = rule.remark
          }

        }

      },
      'formData.areaTeamId':function(val, oVal){
        if (oVal){
          this.formData.productIds = []
          this.formData.courseTemplateIds = []
          this.formData.busTeamIds = []
          this.formData.periodIds=[]
        }
        this.loadProductData()
        this.loadTemplateCourseData()
        this.loadPeriodData()

      }
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
        var options = ( ( this.formData.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.formData.areaTeamId] || [] ) : [] )
          .map(function (item) {
            return {value: item.busTeamId, text: item.name}
          })

        return options
      },

    },
    mounted: function () {
      var _this = this;
      $('#' + this.id).validator({
        onValid: function (validity) {
          $(validity.field).closest('.input-field').find('.am-alert').hide();
        },
        onInValid: function (validity) {
          var $field = $(validity.field);
          var $group = $field.closest('.input-field');
          var $alert = $group.find('.am-alert');
          // 使用自定义的提示信息 或 插件内置的提示信息
          var msg = $field.data('validationMessage') || this.getValidationMessage(validity);

          if (!$alert.length) {
            $alert = $('<div class="am-alert am-alert-danger"></div>').hide().appendTo($group);
          }

          $alert.html(msg).show();
        },
        submit: function (e) {
          e.preventDefault();
          var $submitBtn = $('button[type=submit]', e.target);
          $submitBtn.attr("disabled", "disabled")
          _this.$showLoading()
          var formValidity = this.isFormValid();
          var complete = function () {
            _this.$hiddenLoading()
            _this.$root.$emit('reloadConfig')
            $submitBtn.removeAttr("disabled", "disabled")
          }
          if (formValidity) {
            _this.save(complete);
          } else {
            complete.call()
          }
        }
      });
    },
    methods: {
      save: function (complete) {

        var data = Object.assign({}, this.formData)

        for (var p of data.params) {
          if (p.type == 'int' && !/^\d+$/.test(p.value)) {
            this.$alert(p.name + '的值只能是整数');
            complete()
            return
          } else if (p.type == 'float' && !/^\d+(.\d+)?$/.test(p.value)) {
            this.$alert(p.name + '的值只能是浮点数');
            complete()
            return
          } else if (p.type == 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(p.value)) {
            this.$alert(p.name + '的值只能是日期，如2017-01-01');
            complete()
            return
          }
        }

        data.params = JSON.stringify(data.params)
        data.productIds = data.productIds ? data.productIds.join(','):''
        data.courseTemplateIds = data.courseTemplateIds?data.courseTemplateIds.join(','):''
        data.gradeIds = data.gradeIds ? data.gradeIds.join(',') :''
        data.subjectIds = data.subjectIds ? data.subjectIds.join(','):''
        data.busTeamIds = data.busTeamIds ? data.busTeamIds.join(','):''
        data.periodIds = data.periodIds ? data.periodIds.join(','):''
        data.exclusiveDiscountIds = data.exclusiveDiscountIds ? data.exclusiveDiscountIds.join(',') : ''
        data.exclusiveDiscountNames = data.exclusiveDiscountNames ? data.exclusiveDiscountNames.join(',') : ''

        var _this = this

        io.post(io.apiAdminDiscountSaveOrUpdateDiscount, data,
          function (ret) {
            complete.call()
            if (ret.success) {
              _this.$toast('OK')
              _this.$router.push('/main/discount/discount/list')
            } else {
              _this.$alert(ret.desc)
            }
          },
          function () {
            complete.call()
            _this.$alert('请求服务器失败')
          })
      },
      loadDetail: function () {
        if (!this.formData.discountId) {
          return
        }
        var _this = this
        io.post(io.apiAdminDiscountDiscountDetail, {discountId: this.formData.discountId},
          function (ret) {
            if (ret.success) {
              if (ret.data.effectiveStartTime) {
                ret.data.effectiveStartTime = util.formatDate(ret.data.effectiveStartTime, 'YYYY-MM-DD HH:mm')
              }
              if (ret.data.effectiveEndTime) {
                ret.data.effectiveEndTime = util.formatDate(ret.data.effectiveEndTime, 'YYYY-MM-DD HH:mm')
              }

              ret.data.productIds  = ret.data.productIds ? ret.data.productIds.split(',') : []
              ret.data.courseTemplateIds  = ret.data.courseTemplateIds ? ret.data.courseTemplateIds.split(',') : []
              ret.data.gradeIds  = ret.data.gradeIds ? ret.data.gradeIds.split(',') : []
              ret.data.subjectIds  = ret.data.subjectIds ? ret.data.subjectIds.split(',') : []
              ret.data.busTeamIds  = ret.data.busTeamIds ? ret.data.busTeamIds.split(',') : []
              ret.data.periodIds  = ret.data.periodIds ? ret.data.periodIds.split(',') : []
              ret.data.exclusiveDiscountIds  = ret.data.exclusiveDiscountIds ? ret.data.exclusiveDiscountIds.split(',') : []
              ret.data.exclusiveDiscountNames  = ret.data.exclusiveDiscountNames ? ret.data.exclusiveDiscountNames.split(',') : []
              ret.data.params = JSON.parse(ret.data.params)
              ret.data._discountId = true
              _this.formData = ret.data

            }
          },
          function () {
            _this.$alert('请求服务器失败')
          })
      },
      loadDiscountRuleList: function () {
        io.post(io.apiAdminDiscountRuleList, {
            pageNo: 1,
            pageSize: 1000
          },
          (ret) => {
            if (ret.success) {
              this.discountRuleList = ret.data.list.filter(item => item.status == 1)
            } else {
              this.$alert(ret.desc)
            }
          },
          () => {
            this.$alert('请求服务器失败')
          })
      },
      loadProductData: function () {
        var _this = this
        io.post(io.apiAdminBaseProductListForAreaTeam, {
          areaTeamId : _this.formData.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.productList = ret.data
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadTemplateCourseData: function () {
        var _this = this
        io.post(io.apiAdminBaseCourseTemplateListForAreaTeam, {
          areaTeamId : _this.formData.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.templateCourseList = ret.data
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      handleDelExclusiveDiscount:function(index){
        this.formData.exclusiveDiscountIds.splice(index,1)
        this.formData.exclusiveDiscountNames.splice(index,1)
      },
      selectDiscount:function(){
        if(!this.formData.areaTeamId){
          this.$alert('先选择区域')
          return
        }
        this.$refs.selectDiscount.show({
          areaTeamId : this.formData.areaTeamId
        })
      },
      handleSelectDiscount:function(discountList){
        discountList.forEach(item => {
          if(this.formData.exclusiveDiscountIds.filter((val) => val == item.discountId).length > 0 || this.formData.discountId == item.discountId  ){
            return
          }

          this.formData.exclusiveDiscountIds.push(item.discountId)
          this.formData.exclusiveDiscountNames.push(item.name)

        })
      },
      loadPeriodData: function () {
        var _this = this
        io.post(io.apiAdminPeriodListForAreaTeam, {
          areaTeamId : this.formData.areaTeamId
        }, function (ret) {
          if (ret.success) {
            _this.periods = ret.data
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
    }
  }

</script>

<style>
  .el-tag+.el-tag {
    margin-left: 10px;
    margin-top: 5px;
  }
</style>
