<template>
  <div class="am-u-sm-12 am-u-md-12 am-u-lg-12 m-invoice-mainPart-form" >
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">发票财务主体</div>
        <div class="widget-function am-fr">
          <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
        </div>
      </div>
      <div class="widget-body am-fr">
        <el-form :rules="rules" :model="query" ref="query" label-width="180px" class="demo-query">
          <el-row>
            <el-col :span="12"><el-form-item label="财务主体" prop="periodId">
              <el-input type="text" placeholder="财务主体" v-model="query.financeSubjectName"></el-input>
            </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="请选择区域" prop="areaTeamId">
              <el-select v-model="query.areaTeamId" placeholder="请选择区域">
                <el-option v-for="item in areaTeams" :key="item.areaTeamId" :label="item.areaTeamName" :value="item.areaTeamId"></el-option>
              </el-select>
            </el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><el-form-item label="开票方识别号" prop="periodId">
              <el-input type="text" placeholder="开票方识别号" v-model="query.invoicerIdentificationNo"></el-input>
            </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="开票方名称" prop="areaTeamId">
              <el-input type="text" placeholder="开票方名称" v-model="query.invoicerIdentificationName"></el-input>
            </el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><el-form-item label="开票方电子档案" prop="periodId">
              <el-input type="text" placeholder="开票方电子档案" v-model="query.invoicerElectronicFile"></el-input>
            </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="税务机构代码" prop="areaTeamId">
              <el-input type="text" placeholder="税务机构代码" v-model="query.taxCode"></el-input>
            </el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><el-form-item label="代开标识" prop="periodId">
              <el-input :disabled="true" type="text" placeholder="代开标识" value="自开"></el-input>
            </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="主要开票项目" prop="areaTeamId">
              <el-input type="text" placeholder="主要开票项目" v-model="query.invoiceProject"></el-input>
            </el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><el-form-item label="销货方识别号" prop="periodId">
              <el-input type="text" placeholder="销货方识别号" v-model="query.saleNo"></el-input>
            </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="销货方名称" prop="areaTeamId">
              <el-input type="text" placeholder="销货方名称" v-model="query.saleName"></el-input>
            </el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><el-form-item label="销货方地址" prop="periodId">
              <el-input type="text" placeholder="销货方地址" v-model="query.saleAddress"></el-input>
            </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="销货方号码" prop="areaTeamId">
              <el-input type="text" placeholder="销货方号码" v-model="query.salePhone"></el-input>
            </el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><el-form-item label="销货方银行名称" prop="periodId">
              <el-input type="text" placeholder="销货方银行名称" v-model="query.saleBankName"></el-input>
            </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="行业代码" prop="areaTeamId">
              <el-input type="text" placeholder="行业代码" v-model="query.industryCode"></el-input>
            </el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><el-form-item label="行业名称" prop="periodId">
              <el-input type="text" placeholder="行业名称" v-model="query.industryName"></el-input>
            </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="开票员（自助开票）" prop="areaTeamId">
              <el-input type="text" placeholder="开票员（自助开票）" v-model="query.invoiceMember"></el-input>
            </el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><el-form-item label="税率" prop="periodId">
              <el-input type="Number" placeholder="税率" v-model="query.taxRate"></el-input>
            </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="发票开票含税限额" prop="areaTeamId">
              <el-input type="text" placeholder="发票开票含税限额" v-model="query.limitInvoicingTax"></el-input>
            </el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><el-form-item label="抬头修改" prop="periodId">
              <el-input :disabled="true" type="text" placeholder="抬头修改" value="否"></el-input>
            </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="商品分类编码" prop="areaTeamId">
              <el-input type="text" placeholder="商品分类编码" v-model="query.goodCategoryCode"></el-input>
            </el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><el-form-item label="是否享受优惠政策" prop="periodId">
              <el-select v-model="query.ifDiscount" placeholder="请选择">
                <el-option label="否" value="0"></el-option>
                <el-option label="是" value="1"></el-option>
              </el-select>
            </el-form-item></el-col>
            <el-col :span="12"><el-form-item label="增值税特殊管理" prop="areaTeamId">
              <el-input type="text" placeholder="享受优惠政策时请填写，例如：免税" v-model="query.taxEspecialManager"></el-input>
            </el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否启用" prop="subjectStatus">
                <el-select v-model="query.subjectStatus" placeholder="是否启用">
                  <el-option label="否" value="0"></el-option>
                  <el-option label="是" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="请选择校区" prop="checkedCampuses">
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
    components: {},
    data() {
      return {
        query: {
          financeSubjectId: '',
          studentId: '',
          areaTeamId: '',
          areaTeamName: "",
        },
        disabledBtn: false,
        checkAll: false,
        isEdit: false,
        campuses: [],
        periods: [],
        rules: {
          checkedCampuses: [
            {  type: 'array', required: true, message: '请至少选择一个校区', trigger: 'change'},
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
        financeSubjectId: '',
        financeSubjectName: '',
        areaTeamId: '',
        areaTeamName: '',
        invoicerIdentificationNo: '',
        invoicerIdentificationName: '',
        invoicerElectronicFile: '',
        taxCode: '',
        issueSign: '0',
        invoiceProject: '',
        saleNo: '',
        saleName: '',
        saleAddress: '',
        salePhone: '',
        saleBankName: '',
        industryCode: '',
        industryName: '',
        invoiceMember: '',
        taxRate: '',
        limitInvoicingTax: '',
        modifyRise: '0',
        goodCategoryCode: '',
        ifDiscount: '0',
        subjectStatus: '1',
        taxEspecialManager: '',
        campusIds: '',
        campusNames: '',
        checkedCampuses: [],
      }
      this.disabledBtn = false
      this.query.financeSubjectId = this.$route.query.financeSubjectId
      if (this.query.financeSubjectId) {
        this.isEdit = true
        this.financeSubjectDetail(this.query.financeSubjectId)
      } else {
        this.query.areaTeamId = window.config.areaTeams[0].areaTeamId
      }
    },
    watch: {
      'query.areaTeamId' () {
        if (!this.isEdit) {
          this.query.campusIds = []
          this.query.checkedCampuses = []
          this.loadCampusData()
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
      financeSubjectDetail(financeSubjectId) {
        let _this =this;
        if (this.query.financeSubjectId) {
          io.post(io.financeSubject, {
            financeSubjectId : financeSubjectId
          }, function (ret) {
            if (ret.success) {
              ret.data.checkedCampuses = ret.data.campusIds && ret.data.campusIds.split(',') || []
              _this.query = ret.data;
              _this.loadCampusData(ret.data.checkedCampuses)
            } else {
              _this.$alert(ret.desc)
            }
          })
        }
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
            if (_this.query.ifDiscount === '1' && !_this.query.taxEspecialManager) {
              _this.$alert('享受优惠政策时，必须输入增值税特殊管理')
              this.disabledBtn = false
              return
            }
            _this.query.areaTeamName = _this.areaTeams.filter((item)=>{ return item.areaTeamId === _this.query.areaTeamId })[0].areaTeamName
            io.post(io.saveOrUpdate,Object.assign({},_this.query,{
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
  .m-invoice-mainPart-form {
    .el-form {
      padding: 30px 100px;
      .el-select {
        width: 100%;
      }
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
  }
</style>
