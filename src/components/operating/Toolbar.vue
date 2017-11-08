<template>
  <div class="m-toolbar">
    <div class="am-u-sm-12">
      <el-select v-if="type === 'business' || type === 'gradeSubject'" size="small" class="am-u-md-2"
                 @change="handleAreaTeamIdChange" v-model="areaTeamId" placeholder="请选择区域">
        <el-option
          v-for="item in areaTeams"
          :key="item.areaTeamId"
          :label="item.name"
          :value="item.areaTeamId">
        </el-option>
      </el-select>
      <el-select v-if="type === 'business'" size="small" class="am-u-md-2"
                 :disabled="busTeams.length === 0" v-model="busTeamId" placeholder="请选择业务组">
        <el-option
          v-for="item in busTeams"
          :key="item.busTeamId"
          :label="item.name"
          :value="item.busTeamId">
        </el-option>
      </el-select>
      <el-select v-if="type === 'product'" size="small" class="am-u-md-2" v-model="productId" placeholder="产品线名称">
        <el-option
          v-for="item in products"
          :key="item.productId"
          :label="item.name"
          :value="item.productId">
        </el-option>
      </el-select>
      <el-select @change="subjectId = !gradeId ?  '' : subjectId" v-if="type === 'gradeSubject'" size="small" class="am-u-md-2" v-model="gradeId" placeholder="请选择年级">
        <el-option
          v-for="item in grades"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select :disabled="!gradeId" v-if="type === 'gradeSubject'" size="small" class="am-u-md-2" v-model="subjectId" placeholder="请选择科目">
        <el-option
          v-for="item in subjects"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="am-u-md-2">
        <div class="am-form-group">
          <el-date-picker
            v-model="startDate"
            type="date"
            placeholder="开始日期">
          </el-date-picker>
        </div>
      </div>

      <div class="am-u-md-2" style="float: left">
        <div class="am-form-group">
          <el-date-picker
            v-model="endDate"
            type="date"
            placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
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
        feeCategories: [],
        products: [],
        name: '',
        areaTeamId: '',
        busTeamId: '',
        mainAccountId: '',
        startDate:　'',
        endDate: '',
        gradeId: '',
        subjectId: '',
        type: '',
        productId: '',
        formData: {
          feeCategoryId: ''
        },
      }
    },
    created:function(){
    	let query = this.$route.query,
    	  path = this.$route.path
      this.name = query.name
      if (query.areaTeamId == '1') {
        this.areaTeamId = query.busTeamId
        this.mainAccountId = this.areaTeamId || ''
        this.busTeamId = ''
      } else {
        this.areaTeamId = query.areaTeamId || ''
        this.mainAccountId = query.busTeamId ? query.busTeamId : query.areaTeamId
        this.busTeamId = query.busTeamId || ''
      }
      this.startDate = query.startDate || moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD')
      this.endDate = query.endDate || moment().month(moment().month() - 1).endOf('month').format('YYYY-MM-DD')
      this.productId = query.productId || ''
      this.gradeId = query.gradeId || ''
      this.subjectId = query.subjectId || ''
      if (path.indexOf('productStatistics') > -1) {
        this.type = 'product'
      } else if (path.indexOf('businessStatistics') > -1) {
        this.type = 'business'
      }else if (path.indexOf('gradeSubjectStatistics') > -1) {
        this.type = 'gradeSubject'
      }
      if (this.type === 'product') {
        this.loadProductsList()
      }
      if(this.type === 'business') {
        this.$emit('initList', {
          mainAccountId: this.mainAccountId,
          startDate: moment(this.startDate).format('YYYY-MM-DD'),
          endDate: moment(this.endDate).format('YYYY-MM-DD'),
        })
      } else if (this.type === 'product') {
        this.$emit('initList', {
          productId: this.productId,
          startDate: moment(this.startDate).format('YYYY-MM-DD'),
          endDate: moment(this.endDate).format('YYYY-MM-DD'),
        })
      } else if (this.type === 'gradeSubject') {
    		this.areaTeamId = this.areaTeamId ? this.areaTeamId : window.config.areaTeams[0].areaTeamId
        this.$emit('initList', {
          gradeId: this.gradeId,
          subjectId: this.subjectId,
          areaTeamId: this.areaTeamId,
          startDate: moment(this.startDate).format('YYYY-MM-DD'),
          endDate: moment(this.endDate).format('YYYY-MM-DD'),
        })
      }
    },
    computed: {
      areaTeams: function () {
        return this.$root.config.areaTeams || []
      },
      busTeams: function () {
        return ( ( this.areaTeamId  ) ? ( this.$root.config.groupBusTeams[this.areaTeamId] || [] ) : [] )
      },
      grades () {
        return [{value: '', label: '全部'}].concat(
          this.$root.config.grades.map(function(item){
            return {value: item.gradeId, label: item.gradeName}
          })
        )
      },
      subjects () {
        return [{value: '', label: '全部'}].concat(
          this.$root.config.subjects.map(function(item){
            return {value: item.subjectId, label: item.subjectName}
          })
        )
      }
    },
    watch: {
      busTeamId(newVal) {
        this.mainAccountId = newVal
      }
    },
    methods:{
      handleAreaTeamIdChange() {
        this.busTeamId = ''
        this.mainAccountId = this.areaTeamId
      },
      handleSearch() {
        if(this.type === 'business') {
          this.$emit('handleSearch', {
            mainAccountId: this.mainAccountId,
            startDate: moment(this.startDate).format('YYYY-MM-DD'),
            endDate: moment(this.endDate).format('YYYY-MM-DD'),
          })
        } else if (this.type === 'product') {
          this.$emit('handleSearch', {
            productId: this.productId,
            startDate: moment(this.startDate).format('YYYY-MM-DD'),
            endDate: moment(this.endDate).format('YYYY-MM-DD'),
          })
        } else if (this.type === 'gradeSubject') {
          this.$emit('handleSearch', {
            gradeId: this.gradeId,
            subjectId: this.subjectId,
            areaTeamId: this.areaTeamId,
            startDate: moment(this.startDate).format('YYYY-MM-DD'),
            endDate: moment(this.endDate).format('YYYY-MM-DD'),
          })
        }
      },
      loadProductsList:function(){
        var _this = this
        io.post(io.apiAdminBaseProductList,{},function(ret){
          if(ret.success){
            _this.products = ret.data;
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
    }
  }
</script>

<style lang="less">
  .m-toolbar{
    .main-account-select {
      float: left;
    }
    .am-u-sm-12 {
      line-height: 28px;
      padding-left: 0;
    }
  }
</style>
