import conf from '../conf'

import Storage from '../storage'

import Vue from 'vue'

$.cachedScript = function( url, options ) {
  options = $.extend( options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });
  return $.ajax( options );
};

function checkResult (ret) {
  if( !ret.success && ret.desc && ( ret.desc.indexOf('accessToken不存在或已过期') != -1 || ret.desc.indexOf('token不能为空') != -1 ) ){
    document.location.href = '/'
  }

}

const io = {


  configUrls: function () {
    this.saveUser = conf.baseApiPath + '/api?method=saveUser'
    this.getUser = conf.baseApiPath + '/api?method=getUser'
    this.userList = conf.baseApiPath + '/api?method=userList'

    this.apiQrcodeEncode = conf.baseApiPath + '/api/qrcode/encode'
    this.apiPayPreparePay = conf.baseApiPath + '/api/pay/preparePay'

    this.apiAdminLogin = conf.baseApiPath + '/api/admin/login'
    this.apiAdminCheckNeedCaptcha = conf.baseApiPath + '/api/admin/checkNeedCaptcha'
    this.apiCaptcha = conf.baseApiPath + '/api/captcha'
    this.apiAdminConfig = conf.baseApiPath + '/api/admin/config'

    this.apiAdminChangeMyPassword = conf.baseApiPath + '/api/admin/changeMyPassword'


    this.apiAdminSysUserList = conf.baseApiPath + '/api/admin/sysUserList'
    this.apiAdminSysUserDetail = conf.baseApiPath + '/api/admin/sysUserDetail'
    this.apiAdminSaveOrUpdateSysUser = conf.baseApiPath + '/api/admin/saveOrUpdateSysUser'
    this.apiAdminUpdateSysUserStatus = conf.baseApiPath + '/api/admin/updateSysUserStatus'
    this.apiAdminDelSysUser = conf.baseApiPath + '/api/admin/delSysUser'

    this.apiAdminSysResourceList = conf.baseApiPath + '/api/admin/sysResourceList'
    this.apiAdminRoleResourceList = conf.baseApiPath + '/api/admin/roleResourceList'
    this.apiAdminSaveRoleResource = conf.baseApiPath + '/api/admin/saveRoleResource'

    this.apiAdminSysDataPermissionConfig = conf.baseApiPath + '/api/admin/sysDataPermissionConfig'
    this.apiAdminSaveUserDataPermission = conf.baseApiPath + '/api/admin/saveUserDataPermission'
    this.apiAdminUserDataPermissionList = conf.baseApiPath + '/api/admin/userDataPermissionList'

    this.apiAdminRoleList = conf.baseApiPath + '/api/admin/roleList'
    this.apiAdminRoleDetail = conf.baseApiPath + '/api/admin/roleDetail'
    this.apiAdminSaveRole = conf.baseApiPath + '/api/admin/saveRole'
    this.apiAdminDelRole = conf.baseApiPath + '/api/admin/delRole'
    this.apiAdminSaveUserRole = conf.baseApiPath + '/api/admin/saveUserRole'
    this.apiAdminUserRoleList = conf.baseApiPath + '/api/admin/userRoleList'
    this.apiAdminRoleUserList = conf.baseApiPath + '/api/admin/roleUserList'
    this.apiAdminRecycleRole = conf.baseApiPath + '/api/admin/recycleRole'

    this.apiAdminAreaTeamList = conf.baseApiPath + '/api/admin/areaTeamList'
    this.apiAdminAreaTeamDetail = conf.baseApiPath + '/api/admin/areaTeamDetail'
    this.apiAdminSaveAreaTeam = conf.baseApiPath + '/api/admin/saveAreaTeam'
    this.apiAdminDelAreaTeam = conf.baseApiPath + '/api/admin/delAreaTeam'

    this.apiAdminBusTeamList = conf.baseApiPath + '/api/admin/busTeamList'
    this.apiAdminBusTeamDetail = conf.baseApiPath + '/api/admin/busTeamDetail'
    this.apiAdminSaveBusTeam = conf.baseApiPath + '/api/admin/saveBusTeam'
    this.apiAdminDelBusTeam = conf.baseApiPath + '/api/admin/delBusTeam'

    this.apiAdminPeriodList = conf.baseApiPath + '/api/admin/periodList'
    this.apiAdminPeriodDetail = conf.baseApiPath + '/api/admin/periodDetail'
    this.apiAdminSaveOrUpdatePeriod = conf.baseApiPath + '/api/admin/saveOrUpdatePeriod'
    this.apiAdminUpdateCurrentPeriod = conf.baseApiPath + '/api/admin/updateCurrentPeriod'

    this.apiAdminStudentSchoolList = conf.baseApiPath + '/api/admin/studentSchoolList'
    this.apiAdminStudentSchoolDetail = conf.baseApiPath + '/api/admin/studentSchoolDetail'
    this.apiAdminSaveOrUpdateStudentSchool = conf.baseApiPath + '/api/admin/saveOrUpdateStudentSchool'
    this.apiAdminSearchStudentSchool = conf.baseApiPath + '/api/admin/searchStudentSchool'

    this.apiAdminClassRemunerationList = conf.baseApiPath + '/api/admin/classRemunerationList'
    this.apiAdminClassRemunerationDetail = conf.baseApiPath + '/api/admin/classRemunerationDetail'
    this.apiAdminSaveOrUpdateClassRemuneration = conf.baseApiPath + '/api/admin/saveOrUpdateClassRemuneration'
    this.apiAdminDelClassRemuneration = conf.baseApiPath + '/api/admin/delClassRemuneration'



    this.apiAdminTeacherList = conf.baseApiPath + '/api/admin/teaching/resource/teacherList'
    this.apiAdminTeacherDetail = conf.baseApiPath + '/api/admin/teaching/resource/teacherDetail'
    this.apiAdminSaveOrUpdateTeacher = conf.baseApiPath + '/api/admin/teaching/resource/saveOrUpdateTeacher'
    this.apiAdminDelTeacher = conf.baseApiPath + '/api/admin/teaching/resource/delTeacher'
    this.apiAdminTeacherTags = conf.baseApiPath + '/api/admin/teaching/resource/teacherTags'
    this.apiAdminExportTeachers = conf.baseApiPath + '/api/admin/teaching/resource/exportTeachers'

    this.apiAdminCampusManageList = conf.baseApiPath + '/api/admin/teaching/resource/campusManageList'
    this.apiAdminCampusUseList = conf.baseApiPath + '/api/admin/teaching/resource/campusUseList'
    this.apiAdminCampusOfAreaTeam = conf.baseApiPath + '/api/admin/teaching/resource/campusOfAreaTeam'
    this.apiAdminBaseCampusList = conf.baseApiPath + '/api/admin/teaching/resource/baseCampusList'
    this.apiAdminCampusDetail = conf.baseApiPath + '/api/admin/teaching/resource/campusDetail'
    this.apiAdminSaveOrUpdateCampus = conf.baseApiPath + '/api/admin/teaching/resource/saveOrUpdateCampus'
    this.apiAdminDelCampus = conf.baseApiPath + '/api/admin/teaching/resource/delCampus'

    this.apiAdminAuditCampusList=conf.baseApiPath+'/api/admin/trading/campusList'
    this.apiAdminShowCampusDetail=conf.baseApiPath+'/api/admin/trading/campusDetail'
    this.apiAdminAuditCampus=conf.baseApiPath+'/api/admin/trading/auditCampus'
    this.apiAdminEditorCampus=conf.baseApiPath+'/api/admin/trading/editorCampus'
    this.apiAdminAddCampus=conf.baseApiPath+'/api/admin/trading/addCampus'



    this.apiAdminRoomList = conf.baseApiPath + '/api/admin/teaching/resource/roomList'
    this.apiAdminRoomDetail = conf.baseApiPath + '/api/admin/teaching/resource/roomDetail'
    this.apiAdminSaveOrUpdateRoom = conf.baseApiPath + '/api/admin/teaching/resource/saveOrUpdateRoom'
    this.apiAdminDelRoom = conf.baseApiPath + '/api/admin/teaching/resource/delRoom'

    this.apiAdminRoomListForClassArrangement = conf.baseApiPath + '/api/admin/arrangement/roomListForClassArrangement'
    this.apiAdminArrangeRoom = conf.baseApiPath + '/api/admin/arrangement/arrangementRoom'
    this.apiAdminRoomTimeList = conf.baseApiPath + '/api/admin/arrangement/roomTimeList'
    this.apiAdminTeacherClassTimeList = conf.baseApiPath + '/api/admin/arrangement/teacherClassLectureList'
    this.apiAdminTeacherListForClassArrangement = conf.baseApiPath + '/api/admin/arrangement/teacherListForArrangement'
    this.apiAdminArrangeTeacher = conf.baseApiPath + '/api/admin/arrangement/arrangeTeacher'
    this.apiAdminClassTimeList = conf.baseApiPath + '/api/admin/arrangement/classLectureList'

    this.apiAdminCourseTemplateManageList = conf.baseApiPath + '/api/admin/courseTemplateManageList'
    this.apiAdminCourseTemplateUseList = conf.baseApiPath + '/api/admin/courseTemplateUseList'
    this.apiAdminTemplateDetailDetail = conf.baseApiPath + '/api/admin/courseTemplateDetail'
    this.apiAdminDeleteCourseTemplate = conf.baseApiPath + '/api/admin/deleteCourseTemplate'
    this.apiAdminSaveOrUpdateTemplateDetail = conf.baseApiPath + '/api/admin/saveOrUpdateCourseTemplate'
    this.apiAdminChangeCourseTypeList = conf.baseApiPath + '/api/admin/courseTypeList'
    this.apiAdminCourseTypeManageList = conf.baseApiPath + '/api/admin/courseTypeManageList'
    this.apiAdminCourseTypeSaveOrUpdate = conf.baseApiPath + '/api/admin/saveOrUpdateCourseType'
    this.apiAdminDeleteCourseType = conf.baseApiPath + '/api/admin/deleteCourseType'

    this.apiAdminProductManageList  = conf.baseApiPath + '/api/admin/productManageList'
    this.apiAdminProductManageUseList  = conf.baseApiPath + '/api/admin/productUseList'
    this.apiAdminProductDetail = conf.baseApiPath + '/api/admin/productDetail'
    this.apiAdminDeleteProduct = conf.baseApiPath + '/api/admin/deleteProduct'
    this.apiAdminProductSaveOrUpdate  = conf.baseApiPath  + '/api/admin/saveOrUpdateProduct'
    this.apiAdminBaseProductList = conf.baseApiPath + '/api/admin/baseProductList'
    this.apiAdminBaseProductListForAreaTeam = conf.baseApiPath + '/api/admin/baseProductListForAreaTeam'
    this.apiAdminBaseCourseList = conf.baseApiPath + '/api/admin/baseCourseList'
    this.apiAdminPrepareRearrange = conf.baseApiPath + '/api/admin/arrangement/prepareRearrange'

    this.apiAdminCourseClassList = conf.baseApiPath + '/api/admin/courseClassList'
    this.apiAdminCourseClassDetail = conf.baseApiPath + '/api/admin/courseClassDetail'
    this.apiAdminCourseClassBaseDetail = conf.baseApiPath + '/api/admin/courseClassBaseDetail'
    this.apiAdminSaveOrUpdateClass = conf.baseApiPath + '/api/admin/saveOrUpdateCourseClass'
    this.apiAdminChangeCourseClassStatus = conf.baseApiPath + '/api/admin/changeCourseClassStatus'
    this.apiAdminRecommendCourseClass = conf.baseApiPath + '/api/admin/recommendCourseClass'
    this.apiAdminSaveArrangeClassTimeResult = conf.baseApiPath + '/api/admin/arrangement/saveArrangeClassTimeResult'
    this.apiAdminRearrangeTimeForLecture = conf.baseApiPath + '/api/admin/arrangement/rearrangeTimeForLecture'
    this.apiAdminRearrangeTeacherForLecture = conf.baseApiPath + '/api/admin/arrangement/rearrangeTeacherForLecture'
    this.apiAdminChangeClassType = conf.baseApiPath + '/api/admin/changeClassType'
    this.apiAdminExportStudentReg = conf.baseApiPath + '/api/admin/exportStudentReg'

    this.apiAdminCrowdfundingClassList = conf.baseApiPath + '/api/admin/crowdfundingClassMgr'
    this.apiAdminCrowdfundingClassRegList = conf.baseApiPath + '/api/admin/crowdfundingClassRegList'
    this.apiAdminCrowdfundingClassEdit = conf.baseApiPath + '/api/admin/crowdfundingClassDetail'
    this.apiAdminCrowdfundingSaveOrUpdate = conf.baseApiPath + '/api/admin/saveOrUpdateCrowdfundingClass'

    this.apiAdminBookingOrder = conf.baseApiPath + '/api/admin/countBookingStudent'

    this.studentSaveOrUpdate = conf.baseApiPath + '/api/admin/saveOrUpdateStudent'
    this.apiAdminStudentDetail = conf.baseApiPath + '/api/admin/studentDetail'
    this.apiAdminSearchStudent = conf.baseApiPath + '/api/admin/searchStudent'
    this.apiAdminCreateOfflineOrder = conf.baseApiPath + '/api/admin/createOfflineOrder'
    this.apiAdminCourseOrderList = conf.baseApiPath + '/api/admin/courseOrderList'
    this.apiAdminCancelCourseOrder = conf.baseApiPath + '/api/admin/cancelCourseOrder'
    this.apiAdminStudentReadClassList = conf.baseApiPath + '/api/admin/studentReadClassList'
    this.apiAdminCourseOrderDetail = conf.baseApiPath + '/api/admin/courseOrderDetail'
    this.apiAdminStudentClassCertDetail = conf.baseApiPath + '/api/admin/studentClassCertDetail'
    this.apiAdminConfirmPayOrder= conf.baseApiPath + '/api/admin/confirmPayOrder'
    // this.apiAdminStudentRefundForm = conf.baseApiPath + '/api/admin/studentRefund'
    this.apiAdminShowOldClassDetail = conf.baseApiPath + '/api/admin/showOldClass'
    this.apiAdminShowNewClassDetail = conf.baseApiPath + '/api/admin/showNewClass'
    this.apiAdminTurnClass = conf.baseApiPath + '/api/admin/turnClass'
    this.apiAdminStudentRefundList = conf.baseApiPath + '/api/admin/showStudentRefundList'
    this.apiAdminShowClassMessage = conf.baseApiPath + '/api/admin/showClassMessage'
    this.apiAdminSaveOrupdateStudentRefund = conf.baseApiPath + '/api/admin/saveStudentRefundClass'
    this.apiAdminStudentRefundDetail = conf.baseApiPath + '/api/admin/studentRefundDetail'
    this.apiAdminChangeStudentRefundStatus = conf.baseApiPath + '/api/admin/changeStudentRefundStatus'
    this.apiAdminStudentRegList = conf.baseApiPath+ '/api/admin/studentRegList'
    this.apiAdminExportStudentRefund = conf.baseApiPath + '/api/admin/exportStudentRefund'

    this.apiAdminSettlementMainAccountList = conf.baseApiPath + '/api/admin/settlement/mainAccountList'
    this.apiAdminSettlementAllMainAccountListWithoutStudent = conf.baseApiPath + '/api/admin/settlement/allMainAccountListWithoutStudent'
    this.apiAdminSettlementAccountReportDetailList = conf.baseApiPath + '/api/admin/settlement/accountReportDetailList'
    this.apiAdminSettlementFeeList = conf.baseApiPath + '/api/admin/settlement/feeList'
    this.apiAdminSettlementFeeDetail = conf.baseApiPath + '/api/admin/settlement/feeDetail'
    this.apiAdminSettlementSaveFee = conf.baseApiPath + '/api/admin/settlement/saveFee'
    this.apiAdminSettlementDeleteFee = conf.baseApiPath + '/api/admin/settlement/deleteFee'
    this.apiAdminSettlementAuditingFee = conf.baseApiPath + '/api/admin/settlement/auditingFee'
    this.apiAdminSettlementProfitDetaile = conf.baseApiPath + '/api/admin/settlement/profitDetail'
    this.apiAdminSettlementAccountWithdrawalList = conf.baseApiPath + '/api/admin/settlement/accountWithdrawalList'
    this.apiAdminSettlementWithdrawalList = conf.baseApiPath + '/api/admin/settlement/withdrawalList'
    this.apiAdminSettlementApplyWithdrawal = conf.baseApiPath + '/api/admin/settlement/applyWithdrawal'
    this.apiAdminSettlementUpdateWithdrawalStatus = conf.baseApiPath + '/api/admin/settlement/updateWithdrawalStatus'
    this.apiAdminSettlementFeeCategoryList = conf.baseApiPath + '/api/admin/settlement/feeCategoryList'
    this.apiAdminSettlementAllFeeCategory = conf.baseApiPath + '/api/admin/settlement/allFeeCategory'
    this.apiAdminSettlementFeeCategoryDetail = conf.baseApiPath + '/api/admin/settlement/feeCategoryDetail'
    this.apiAdminSettlementSaveOrUpdateFeeCategory = conf.baseApiPath + '/api/admin/settlement/saveOrUpdateFeeCategory'
    this.apiAdminSettlementDeleteFeeCategory = conf.baseApiPath + '/api/admin/settlement/deleteFeeCategory'

    this.apiAdminSettlementIncomeCategoryList = conf.baseApiPath + '/api/admin/settlement/incomeCategoryList'
    this.apiAdminSettlementAllIncomeCategory = conf.baseApiPath + '/api/admin/settlement/allIncomeCategory'
    this.apiAdminSettlementIncomeCategoryDetail = conf.baseApiPath + '/api/admin/settlement/incomeCategoryDetail'
    this.apiAdminSettlementSaveOrUpdateIncomeCategory = conf.baseApiPath + '/api/admin/settlement/saveOrUpdateIncomeCategory'
    this.apiAdminSettlementDeleteIncomeCategory = conf.baseApiPath + '/api/admin/settlement/deleteIncomeCategory'

    this.importCourseExcel= conf.baseApiPath + '/api/admin/courseTemplateImport'

    this.apiAdminClassHistoryList = conf.baseApiPath + '/api/admin/classHistoryList'

    this.apiAdminSaveCategory = conf.baseApiPath + '/api/admin/trading/saveCategory'
    this.apiAdminEditCategory = conf.baseApiPath + '/api/admin/trading/editCategory'
    this.apiAdminCategoryDetail = conf.baseApiPath + '/api/admin/trading/getCategory'
    this.apiAdminCategoryList = conf.baseApiPath + '/api/admin/trading/showCategory'
    this.apiAdminDeleteCategory = conf.baseApiPath + '/api/admin/trading/deleteCategory'
    this.apiAdminGetChildCategory = conf.baseApiPath + '/api/admin/trading/getChildCategory'
    this.apiAdminGetCategory = conf.baseApiPath + '/api/admin/trading/getCategoryMessage'
    this.apiAdminGetAllCategoryDetail = conf.baseApiPath + '/api/admin/trading/getAllCategory'
    this.apiAdminSaveServiceProduct = conf.baseApiPath + '/api/admin/trading/saveServiceProduct'

    this.apiAdminServiceProductList = conf.baseApiPath + '/api/admin/trading/showServiceProduct'
    this.apiAdminDeleteServiceProduct = conf.baseApiPath + '/api/admin/trading/deleteServiceProduct'
    this.apiAdminServiceProductDetail = conf.baseApiPath + '/api/admin/trading/getServiceProduct'
    this.apiAdminServiceMerchantList = conf.baseApiPath + '/api/admin/trading/merchantList'
    this.apiAdminServiceProductImages = conf.baseApiPath + '/api/admin/trading/productImageList';

    this.apiAdminServiceMerchantDetail = conf.baseApiPath + '/api/admin/trading/merchantDetail'
    this.apiAdminChangeServiceMerchant = conf.baseApiPath + '/api/admin/trading/auditMerchant'
    this.apiAdminProductOrderList = conf.baseApiPath + '/api/admin/trading/productOrderList'
    this.apiAdminProductOrderDetail = conf.baseApiPath + '/api/admin/trading/productOrderDetail'
    this.apiAdminAddComment = conf.baseApiPath + '/api/admin/trading/addProductComment'
    this.apiAdminCommentList = conf.baseApiPath + '/api/admin/trading/commentList'

    this.apiAdminGoodList=conf.baseApiPath+'/api/admin/trading/goodPage'
    this.apiAdminOffProduct=conf.baseApiPath+'/api/admin/trading/offProduct'

    this.apiAdminDemandList=conf.baseApiPath+'/api/admin/trading/demandPage'
    this.apiAdminOffDemand=conf.baseApiPath+'/api/admin/trading/offDemand'

    this.apiAdminLeaseList=conf.baseApiPath+'/api/admin/trading/leasePage'
    this.apiAdminOffLease=conf.baseApiPath+'/api/admin/trading/offLease'

    this.apiAdminOrderItemList=conf.baseApiPath+'/api/admin/trading/orderItemList'


    // this.apiAdminShippingAddressDetail = conf.baseApiPath + '/api/admin/trading/shippingAddressById'
    this.apiAdminOrderItemDetail = conf.baseApiPath + '/api/admin/trading/orderItemDetail'
    this.apiAdminSaveOrUpdateProductRefund = conf.baseApiPath + '/api/admin/trading/saveOrUpdateProductRefund'
    this.apiAdminProductRefundList = conf.baseApiPath + '/api/admin/trading/productRefundList'
    this.apiAdminProductRefundDetail = conf.baseApiPath + '/api/admin/trading/productRefundDetail'
    this.apiAdminSellProductOrderList = conf.baseApiPath + '/api/admin/trading/sellProductOrderList'

    // this.apiAdminSellOrderDetail = conf.baseApiPath + '/api/admin/trading/OrderItemDetail'
    this.apiAdminchangeSellOrderItemStatus = conf.baseApiPath + '/api/admin/trading/updateOrderItemStatus'
    this.apiAdminSaveOrUpdateAddress = conf.baseApiPath + '/api/admin/trading/saveOrUpdateShippingAddress'
    this.apiAdminAddressList = conf.baseApiPath + '/api/admin/trading/shippingAddressList'
    this.apiAdminDelAddress = conf.baseApiPath + '/api/admin/trading/delShippingAddress'
    this.apiAdminGetOrderItemRefundDetail = conf.baseApiPath + '/api/admin/trading/getOrderItemRefund'
    this.apiAdminRentRoomList = conf.baseApiPath + '/api/admin/trading/rentRoomList'

    this.apiAdminRoomListOfCampus = conf.baseApiPath + '/api/admin/trading/roomListOfCampus'

    this.apiAdminAttendanceCourseClassList = conf.baseApiPath + '/api/admin/attendance/courseClassList'
    this.apiAdminAttendanceAttendanceRecordList = conf.baseApiPath + '/api/admin/attendance/attendanceRecordList'
    this.apiAdminAttendanceAttendanceRecordDetailList = conf.baseApiPath + '/api/admin/attendance/attendanceRecordDetailList'
    this.apiAdminAttendanceSaveAttendanceRecordDetail = conf.baseApiPath + '/api/admin/attendance/saveAttendanceRecordDetail'


    this.apiAdminStudentMainAccount = conf.baseApiPath + '/api/admin/studentMainAccount'


    this.apiAdminReportChargeList = conf.baseApiPath + '/api/admin/report/chargeList'
    this.apiAdminReportChangeChargeDailyStatus = conf.baseApiPath + '/api/admin/report/changeChargeDailyStatus'
    this.apiAdminReportExportCharge = conf.baseApiPath + '/api/admin/report/exportCharge'


    this.apiAdminScheduleScheduleDataOfTeacher = conf.baseApiPath + '/api/admin/schedule/scheduleDataOfTeacher'
    this.apiAdminSchedulescheduleDataOfCampus = conf.baseApiPath + '/api/admin/schedule/scheduleDataOfCampus'
    this.apiAdminScheduleSaveChange = conf.baseApiPath + '/api/admin/schedule/saveChange'


    this.apiAdminHtml2excel = conf.baseApiPath + '/api/admin/html2excel'


  },
  getHeaders : function(){
    const accessToken = Storage.getAccessToken() || '' ;
    return {
      accessToken
    }

  },
  get: function (url, data, success, fail) {
    data.accessToken = this.getHeaders().accessToken
    $.ajax({
      url: url,
      type: 'GET',
      data: data,
      dataType: 'json',
      cache: true,
      timeout : 30000,
      success: function (data) {
        checkResult(data)
        if (success) {
          success(data);
        }
      },
      error: function (xhr, status, error) {
        if (fail) {
          fail(xhr, status, error);
        } else {
          //alert("服务端出错");
        }
      }
    });
  },
  post: function (url, data, success, fail) {
    data.accessToken = this.getHeaders().accessToken
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      dataType: 'json',
      timeout : 30000,
      success: function (data) {
        checkResult(data)
        if (success) {
          success(data);
        }
      },
      error: function (xhr, status, error) {
        if (fail) {
          fail(xhr, status, error);
        } else {
          //alert("服务端出错");
        }
      }
    });
  },
  syncPost: function (url, data, success, fail) {
    data.accessToken = this.getHeaders().accessToken
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      dataType: 'json',
      timeout : 30000,
      async : false ,
      success: function (data) {
        checkResult(data)
        if (success) {
          success(data);
        }
      },
      error: function (xhr, status, error) {
        if (fail) {
          fail(xhr, status, error);
        } else {
          //alert("服务端出错");
        }
      }
    });
  },
  postPlayload: function (url, data, success, fail) {
    data.accessToken = this.getHeaders().accessToken
    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      dataType: 'json',
      processData: false,
      timeout : 30000,
      success: function (data) {
        checkResult(data)
        if (success) {
          success(data);
        }
      },
      error: function (xhr, status, error) {
        if (fail) {
          fail(xhr, status, error);
        }else {
          //alert("服务端出错");
        }
      }
    });
  },
  postMitiFile:function (url,data,success) {
    Vue.http.post(io.importCourseExcel+"?accessToken="+this.getHeaders().accessToken,data).then(data=>{
      if (success) success(data);
    })
  },
  getScripts:function(urls,done){
    var $scripts = $.map( urls , function(url) {
      return $.cachedScript(url)
    });
    $scripts.push($.Deferred(function( deferred ){
      $( deferred.resolve );
    }));
    $.when.apply($, $scripts).done(done)
  },
  downloadFile : function (url,data ) {
    data.accessToken = this.getHeaders().accessToken
    //data = $.param(data)
    // 把参数组装成 form的  input
    var inputs = []
    for(var k of Object.keys(data)){
      inputs.push( '<input type="hidden" name="' + k + '"/>')
    }

    // request发送请求
    var $form = $('<form target="_blank" action="' + url + '" method="post" style="display: none">' + inputs.join('') + '</form>')
    for(var k of Object.keys(data)){
      $form.find('input[name='+k+']').val(data[k])
    }
    $form.appendTo('body').submit().remove()
  }

};

io.configUrls()

export default io ;
