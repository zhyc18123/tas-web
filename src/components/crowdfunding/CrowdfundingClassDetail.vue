<template>
  <div class="am-u-sm-12">
    <div class="widget am-cf">
      <div class="widget-head am-cf">
        <div class="widget-title am-fl">众筹定价</div>
        <div class="widget-function am-fr">
            <button type="button" class="am-btn am-btn-default" @click="$router.go(-1)">返回</button>
          </div>
      </div>
      <div class="widget-body am-fr">      
            <table class="am-form-group">    
            <tr>
              <td style="width:100px; height:50px;">
                  <img height="300" width="300" :src="teachersData.avatarUrl" >
              </td>
              <td class="teacher-mes">   
                  <p class="teacher-name">{{teachersData.teacherName}} </p>
                  <p>{{teachersData.sex == 1 ? '男' : (teachersData.sex == 2 ? '女' : '')}} </p>
                  <p>{{teachersData.teachGradeNames}}</p>
                  <p>{{teachersData.phoneNo}}</p>
                  <p>{{teachersData.areaTeamName}} </p>
                  <p>{{teachersData.tags}}  </p>          
              </td>
            </tr>      
            </table>

        <el-table
          :data="classData"
          border
          stripe
          style="min-width: 100%">
          <el-table-column
            fixed
            prop="className"
            label="名师班级"
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="discountType"
            label="优惠方式"
            min-width="100">
            <template scope="scope">
              {{scope.row.discountType == 1 ? "连续优惠" : (scope.row.discountType == 2 ? "分段优惠" : "-" )}}
            </template>
          </el-table-column>
          <el-table-column
            label="学位"
            min-width="100">      
            <template scope="scope">
                {{scope.row.discountType == 0 ? ' - ':(scope.row.quotaMin + '-' + scope.row.quotaMax)}}
            </template>     
          </el-table-column>
          <el-table-column  
            prop="deposit"
            label="预约金"
            min-width="100">
          </el-table-column>    
          <el-table-column
            label="最低单价"
            min-width="100">
            <template scope="scope">
              {{scope.row.discountType == 0 ? '-' : scope.row.lowestPrice }}
            </template>
          </el-table-column>
          <el-table-column
            label="最高单价"
            min-width="100">
            <template scope="scope">
              {{scope.row.discountType ==0 ? '-': scope.row.highestPrice}}
            </template>
          </el-table-column>
          <el-table-column
            label="课程总价"
            min-width="100">
             <template scope="scope">
              {{scope.row.discountType != 1 ? '-': scope.row.totalPrice}}
            </template>
          </el-table-column>
          <el-table-column
            label="报名截止时间"
            min-width="100">
            <template scope="scope">
              {{scope.row.endRegTime}} 
            </template>
          </el-table-column>
          <el-table-column
            label="开课时间"
            min-width="100">
            <template scope="scope">
              {{scope.row.startCourseTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="课表"
            min-width="100">
            <template scope="scope">
             <el-button size="small"  @click.native="$router.push(('/main/course/class/time/') + scope.row.classId)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  <form class="am-form tpl-form-border-form tpl-form-border-br" data-am-validator :id="id" style="width:800px">
      <fieldset>
      <div class="am-form-group">
             <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>众筹预约金
            </label>
            <div class="am-u-sm-9 input-field">
              <input type="text" placeholder=""  required  v-model="formData.deposit" >
            </div>
      </div>
      <div class="am-form-group">
        <label class="am-u-sm-3 am-form-label">
           <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>报名截至日期
        </label>
        <div class="am-u-sm-3 am-u-end  input-field">
          <date-picker v-model="formData.endRegTime" >
            <input type="text" class="am-form-field" placeholder="请选择报名截止日期" data-am-datepicker  >
          </date-picker>
        </div>
        <span class="am-text-danger am-margin-right-xs am-text-xs tip">报名截至日期须比开课时间早三天以上</span>
      </div>
      <div class="am-form-group">
          <label class="radio-label"><input name="" type="radio" value="1" v-model="formData.discountType"/>连续人均定价 </label> 
          <label class="radio-label"><input name="" type="radio" value="2"  v-model="formData.discountType"/>分段人均定价 </label> 
      </div>

      <div  class="am-form-group" v-for="(item, index) in priceList" v-if="formData.discountType == 2">
        <label class="am-u-sm-3 am-form-label">
          <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>
           <template scope="scope">
            </template>{{index == 0 ? "可开课总人数" : "总人数"}}
        </label>
        <div class="am-u-sm-2 input-field">
          <input type="text" class="am-form-field" required placeholder=" " v-model="priceList[index].number" >
        </div>
        <label class="am-u-sm-2 am-form-label">
          <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>价格/人
        </label>
        <div class="am-u-sm-2 input-field">
          <input type="text" class="am-form-field" required placeholder="" v-model="priceList[index].price" >
        </div>
        <div class="am-u-sm-1 input-field">
          <a href="javascript:;" @click="addPrice"> <i class="am-icon-plus"></i></a>
          <a href="javascript:;" @click="delPrice(index)"><i class="am-icon-remove"></i></a>
        </div>
      </div>

      <div id ="div2" v-if="formData.discountType == 1">
         <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>可开课学位下限
            </label>
            <div class="am-u-sm-9 input-field">
              <input type="text" placeholder=""  required  v-model="formData.quotaMin" >
            </div>
          </div>
          <div class="am-form-group">
             <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>学位上限
            </label>
            <div class="am-u-sm-9 input-field">
              <input type="text" placeholder=""  required  v-model="formData.quotaMax" >
            </div>
          </div>
          <div class="am-form-group">
             <label class="am-u-sm-3 am-form-label">
              <span class="am-text-danger am-margin-right-xs am-text-xs">*</span>课程总价
            </label>
            <div class="am-u-sm-9 input-field">
              <input type="text" placeholder=""  required  v-model="formData.totalPrice" >
            </div>
          </div>
      </div>

       <div class="am-form-group">
          <div class="am-u-sm-6 am-u-sm-centered">
              <button type="button" class="am-btn am-btn-primary" @click="arrangePrice">预览</button>
          <button type="submit" class="am-btn am-btn-primary" >提交</button>
          </div>
       </div>
       <div class="am-form-group" v-if="1 == formData.discountType && continuousResult.length > 0 ">
          <div class="am-u-sm-12 am-scrollable-horizontal">
            <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
              <thead>
              <tr>
                <th>总人数</th>
                <th>人均价格</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in continuousResult">
                <td>{{ 0 == index ? item.number + '(可开课)' : item.number}}</td>
                <td>{{item.price}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

         <div class="am-form-group" v-if="2 == formData.discountType && segmentResult.length > 0 ">
            <div class="am-u-sm-12 am-scrollable-horizontal">
              <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
                <thead>
                <tr>
                  <th>总人数</th>
                  <th>金额</th>
                  <th>课程总价</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in segmentResult">
                  <td>{{ 0 == index ? item.number + '(可开课)' : item.number}}</td>
                  <td>{{item.price}}</td>
                  <td>{{item.totalPrice}}</td>
                </tr>
                </tbody>
              </table>
            </div>
        </div>

      <!--<div class="am-form-group">
        <div class="am-u-sm-9 am-u-sm-push-3">
          <button type="submit" class="am-btn am-btn-primary" >提交</button>
        </div>
      </div>-->
    </fieldset>
  </form>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import util from '../../lib/util'
  export default{
    data: function () {
      return {
        teachersData: {},
        classData:[],
        total: 0,
        pageSize: 10,
        pageNo: 1,
        classId: '',
        priceList:[{}],
        continuousResult: [], //连续定价
        segmentResult:[], //分段定价
        formData:{
          priceRange:'',
          discountType:'',
          deposit : '',
          endRegTime: '' ,
          startCourseTime:'',
          bookingStudentSum:''
        }
      }
    },
    mounted: function () {
      $(window).smoothScroll()
      var _this = this ;
      $('#' + this.id ).validator({
        validate:function(validity){

        },
        onValid: function(validity) {
          $(validity.field).closest('.input-field').find('.am-alert').hide();
        },
        onInValid: function(validity) {
          var $field = $(validity.field);
          var $group = $field.closest('.input-field');
          var $alert = $group.find('.am-alert');
          // 使用自定义的提示信息 或 插件内置的提示信息
          var msg = $field.data('validationMessage') || this.getValidationMessage(validity);

          if (!$alert.length) {
            $alert = $('<div class="am-alert am-alert-danger"></div>').hide().
            appendTo($group);
          }

          $alert.html(msg).show();
        },
        submit:function(e){
          e.preventDefault();
          var data = _this.formData
          if( 1== _this.classData[0].status){
            _this.$alert("已开班不能修改众筹信息")
            return 
          }
          if( _this.DateDiff(data.startCourseTime , data.endRegTime) < 3){
            _this.$alert("报名截止时间必须比开课时间早3天以上");
            return;
          }
          
          //计算价格区间
          if(1 == data.discountType)
          {
            var str = ""
            for(var i = parseInt(data.quotaMin) ; i <= parseInt(data.quotaMax) ; i++)
            {
              str = str + i +":" + Math.ceil(data.totalPrice/i) + ","
            }
            str = str.substring(0, str.length -1) 
            data.lowestPrice = Math.ceil(data.totalPrice/data.quotaMax)
            data.highestPrice = Math.ceil(data.totalPrice/data.quotaMin)
          }else{
            var str = ""
            for (var i = 0; i < _this.priceList.length; i++) {
              if( 0 != i && parseInt(_this.priceList[i-1]["number"]) >= parseInt(_this.priceList[i]["number"])){
                _this.$alert("报名人数须递增")
                return 
              }
              if(0 != i && parseInt(_this.priceList[i-1]["price"]) <= parseInt(_this.priceList[i]["price"])){
                _this.$alert("报名价格须递减")
                return 
              }
              str = str + _this.priceList[i]["number"] + ":" + _this.priceList[i]["price"] + ","
            }   
            str = str.substring(0, str.length -1) ;

            data.quotaMin = _this.priceList[0]["number"];
            data.highestPrice = _this.priceList[0]["price"];
            data.quotaMax = _this.priceList[_this.priceList.length - 1]["number"];
            data.lowestPrice = _this.priceList[_this.priceList.length - 1]["price"];
          }
          //预约金不能大于最低价格   
          if(parseInt(data.lowestPrice) < parseInt(data.deposit)){
            _this.$alert("预约金不能大于最低价");
            return ;
          }
          data.priceRange = str
          data.classId = _this.classId

          var $submitBtn = $('button[type=submit]',e.target);
          $submitBtn.attr("disabled" ,"disabled" )
          _this.$showLoading()
          var formValidity = this.isFormValid();
          var complete = function(){
            _this.$hiddenLoading()
            $submitBtn.removeAttr("disabled" ,"disabled" )
          }
          if(formValidity){
            _this.save(data,complete);
          }else{
            complete.call()
          }
        }
      });
    },
    created: function () {
      this.classId = this.$params('classId')
      this.loadTableData(this.pageNo)
      this.loadBookingOrderData(this.classId)
      var _this = this
      this.$root.$on('studentRefundList:new', function () {
        _this.pageNo = 1
        _this.loadTableData(_this.pageNo)
      })
    },
    methods: {
      loadTableData: function (pageNo) {
        var _this = this
        _this.pageNo = pageNo || _this.pageNo || 1
        io.post(io.apiAdminCrowdfundingClassEdit, {
          pageNo: _this.pageNo,
          pageSize: _this.pageSize,
          classId: _this.classId
        }, function (ret) {
          if (ret.success) {
            _this.teachersData = ret.data.teacherList[0]
            var classData = [];
            classData.push(ret.data.crowdfundingClass);
            _this.classData = classData;
            _this.formData = ret.data.crowdfundingClass
            _this.formData.discountType = (_this.formData.discountType == 0) ? 1: _this.formData.discountType //默认值
            _this.formData.endRegTime = util.formatDate(_this.formData.endRegTime,'YYYY-MM-DD')
            _this.formData.startCourseTime = util.formatDate(_this.formData.startCourseTime,'YYYY-MM-DD')
          } else {
            _this.$alert(ret.desc)
          }
        })
      },
      loadBookingOrderData:function(classId){   
        var _this = this
        //设置交了预约金的学生总数
        io.post(io.apiAdminBookingOrder,{classId:classId},function(ret){
          if(ret.success){
            _this.formData.bookingStudentSum = ret.data
          }else{
            _this.$alert(ret.desc)
          }
        })
      },
      save:function(data,complete){
        var _this = this 
        io.post(io.apiAdminCrowdfundingSaveOrUpdate,data ,
          function(ret){
            complete.call()
            if(ret.success){
              _this.$toast('OK')
              _this.$emit('saveCompleted',ret.data)
              window.location.reload()
            }else{
              _this.$alert(ret.desc)
            }

          },
          function(){
            complete.call()
            _this.$alert('请求服务器失败')
          })
      },
      //价格区间计算
      arrangePrice : function(){
        var data = this.formData
        this.continuousResult = []
        this.segmentResult = []
        if(data.discountType == 1){
            if(!data.quotaMin){
            this.$alert("请填写学位下限")
            return
          }
            
          if(!data.quotaMax){
            this.$alert("请填写学位上限")
            return
          }
          if(!data.totalPrice){
            this.$alert("请输入总价")
            return
          }   
          
          for(var i = parseInt(data.quotaMin) ; i <= parseInt(data.quotaMax); i++)
          {
            this.continuousResult.push({
              number : i ,
              price : Math.ceil(data.totalPrice/i)
            })
          }
        }else{
            for (var i = 0; i < this.priceList.length; i++) {
              this.segmentResult.push({
                number: this.priceList[i]["number"],
                price: this.priceList[i]["price"],
                totalPrice: this.priceList[i]["number"] * this.priceList[i]["price"],
              })
            } 
        }
        },
      addPrice : function(){
        if(4 == this.priceList.length){
          this.$alert("最多只能添加 4 行")
          return 
        } 
        this.priceList.push({})
      },
      delPrice : function(index){
        if(this.priceList.length <= 1){
          return
        }
        this.priceList.splice(index,1)
      },
      selectReferrer:function(student){
        this.formData.referrerId = student.studentId
        this.formData.referrerName = student.name
      },
      //计算天数差的函数，通用  
      DateDiff:function(sDate1, sDate2){    //sDate1和sDate2是2016-12-18格式  
        var  aDate, oDate1, oDate2, iDays  
        aDate  =  sDate1.split("-")  
        oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2016格式  
        aDate  =  sDate2.split("-")  
        oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  
        iDays  =  parseInt((oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数  
        return  iDays  
      }  
    }
  }
</script>
<style scope>
.teacher-mes{
  padding-left: 30px;
}
.teacher-mes p{
  margin: 10px 0;
}
.tip{
  position: relative;
  top: 5px;
}
.radio-label{
  margin-right: 10px !important;
}
.radio-label input{
  margin-right: 5px;
  margin-top: -5px;
}
.teacher-name{
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 30px !important;
}
</style>
