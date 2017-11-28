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
    this.apiBarcodeEncode = conf.baseApiPath + '/api/barcode/encode'
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
    this.sysCampusDataPermissionConfig = conf.baseApiPath + '/api/admin/sysCampusDataPermissionConfig'
    this.apiAdminSaveUserDataPermission = conf.baseApiPath + '/api/admin/saveUserDataPermission'
    this.saveUserCampusDataPermission = conf.baseApiPath + '/api/admin/saveUserCampusDataPermission'
    this.apiAdminUserDataPermissionList = conf.baseApiPath + '/api/admin/userDataPermissionList'
    this.userCampusDataPermissionList = conf.baseApiPath + '/api/admin/userCampusDataPermissionList'

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
    this.apiAdminBeforePeriods = conf.baseApiPath + '/api/admin/beforePeriodList'
    this.apiAdminSaveOrUpdatePeriod = conf.baseApiPath + '/api/admin/saveOrUpdatePeriod'
    this.apiAdminUpdateCurrentPeriod = conf.baseApiPath + '/api/admin/updateCurrentPeriod'
    this.apiAdminPeriodListForAreaTeam = conf.baseApiPath + '/api/admin/periodListForAreaTeam'
    this.apiAdminContinueClassSetting = conf.baseApiPath + '/api/admin/continueClassSetting'
    this.apiAdminSaveOrUpdateContinueClassSetting = conf.baseApiPath + '/api/admin/saveOrUpdateContinueClassSetting'

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

    this.apiAdminAddOrUpdateCampus=conf.baseApiPath+'/api/admin/trading/addOrUpdateCampus'
    this.apiAdminOwnTeam=conf.baseApiPath+'/api/admin/trading/ownTeam'
    this.apiAdminOwnPayMainAccountList=conf.baseApiPath+'/api/admin/trading/ownMainCount'

    this.apiAdminRoomList = conf.baseApiPath + '/api/admin/teaching/resource/roomList'
    this.apiAdminRoomDetail = conf.baseApiPath + '/api/admin/teaching/resource/roomDetail'
    this.apiAdminSaveOrUpdateRoom = conf.baseApiPath + '/api/admin/teaching/resource/saveOrUpdateRoom'
    this.apiAdminDelRoom = conf.baseApiPath + '/api/admin/teaching/resource/delRoom'

    this.apiAdminTradingRoomList = conf.baseApiPath + '/api/admin/trading/roomList'
    this.apiAdminTradingRoomDetail = conf.baseApiPath + '/api/admin/trading/roomDetail'
    this.apiAdminTradingSaveOrUpdateRoom = conf.baseApiPath + '/api/admin/trading/saveOrUpdateRoom'
    this.apiAdminTradingDelRoom = conf.baseApiPath + '/api/admin/trading/delRoom'



    this.apiAdminRoomListForClassArrangement = conf.baseApiPath + '/api/admin/arrangement/roomListForClassArrangement'
    this.apiAdminRoomListForArrangement = conf.baseApiPath + '/api/admin/arrangement/roomListForArrangement'
    this.apiAdminArrangeRoom = conf.baseApiPath + '/api/admin/arrangement/arrangementRoom'
    this.saveOrUpdateArrangementRoom = conf.baseApiPath + '/api/admin/arrangement/saveOrUpdateArrangementRoom'
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

    this.allBusTeamList  = conf.baseApiPath + '/api/admin/allBusTeamList'
    this.apiAdminProductManageList  = conf.baseApiPath + '/api/admin/productManageList'
    this.apiAdminProductDetail = conf.baseApiPath + '/api/admin/productDetail'
    this.apiAdminDeleteProduct = conf.baseApiPath + '/api/admin/deleteProduct'
    this.apiAdminProductSaveOrUpdate  = conf.baseApiPath  + '/api/admin/saveOrUpdateProduct'
    this.apiAdminBaseProductList = conf.baseApiPath + '/api/admin/baseProductList'
    this.apiAdminBaseProductListForAreaTeam = conf.baseApiPath + '/api/admin/baseProductListForAreaTeam'
    this.apiAdminBaseCourseTemplateListForAreaTeam = conf.baseApiPath + '/api/admin/baseCourseTemplateListForAreaTeam'
    this.apiAdminBaseCourseList = conf.baseApiPath + '/api/admin/baseCourseList'
    this.apiAdminBaseCourseListForAreaTeam = conf.baseApiPath + '/api/admin/baseCourseListForAreaTeam'
    this.apiAdminPrepareRearrange = conf.baseApiPath + '/api/admin/arrangement/prepareRearrange'
    this.apiAdminResetDefaultPassword = conf.baseApiPath + '/api/admin/resetDefaultPassword'

    this.apiAdminCourseClassList = conf.baseApiPath + '/api/admin/courseClassList'
    this.apiAdminExportCourseClassList = conf.baseApiPath + '/api/admin/exportCourseClassList'
    this.apiAdminCourseClassForReg = conf.baseApiPath + '/api/admin/courseClassForReg'
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
    this.apiAdminSeniorList = conf.baseApiPath + '/api/admin/seniorList'
    this.apiAdminSetupClassSenior = conf.baseApiPath + '/api/admin/setupClassSenior'
    this.apiAdminSetupStudentRegSenior = conf.baseApiPath + '/api/admin/setupStudentRegSenior'
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
    this.apiAdminDiscountListOfPolicy = conf.baseApiPath + '/api/admin/discountListOfPolicy'
    this.apiAdminRecalculateCourseOrderDiscount = conf.baseApiPath + '/api/admin/recalculateCourseOrderDiscount'
    this.apiAdminCourseOrderDetailByRequestPayId = conf.baseApiPath + '/api/admin/courseOrderDetailByRequestPayId'
    this.apiAdminStudentClassCertDetail = conf.baseApiPath + '/api/admin/studentClassCertDetail'
    this.apiAdminConfirmPayOrder= conf.baseApiPath + '/api/admin/confirmPayOrder'
    this.apiAdminQueryPayResult= conf.baseApiPath + '/api/admin/queryPayResult'
    this.encodeBase64= conf.baseApiPath + '/api/qrcode/encodeBase64'

    this.apiAdminStudentRegDetail = conf.baseApiPath + '/api/admin/studentRegDetail'
    this.apiAdminTurnClass = conf.baseApiPath + '/api/admin/turnClass'
    this.apiAdminSaveShiftClass = conf.baseApiPath + '/api/admin/saveShiftClass'
    this.apiAdminStudentRefundList = conf.baseApiPath + '/api/admin/showStudentRefundList'
    this.apiAdminQueryAttendOfStudent = conf.baseApiPath + '/api/admin/queryAttendOfStudent'
    this.apiAdminSaveOrupdateStudentRefund = conf.baseApiPath + '/api/admin/saveStudentRefundClass'
    this.apiAdminStudentRefundDetail = conf.baseApiPath + '/api/admin/studentRefundDetail'
    this.apiAdminChangeStudentRefundStatus = conf.baseApiPath + '/api/admin/changeStudentRefundStatus'
    this.apiAdminChangeStudentPayStatus = conf.baseApiPath + '/api/admin/changeStudentPayStatus'
    this.apiAdminStudentRegList = conf.baseApiPath+ '/api/admin/studentRegList'
    this.apiAdminExportStudentRefund = conf.baseApiPath + '/api/admin/exportStudentRefund'

    this.apiAdminSettlementMainAccountList = conf.baseApiPath + '/api/admin/settlement/mainAccountList'
    this.apiAdminSettlementAllMainAccountListWithoutStudent = conf.baseApiPath + '/api/admin/settlement/allMainAccountListWithoutStudent'
    this.apiAdminSettlementAccountReportDetailList = conf.baseApiPath + '/api/admin/settlement/accountReportDetailList'
    this.apiAdminSettlementAccountReportTotalAmount = conf.baseApiPath + '/api/admin/settlement/accountReportTotalAmount'
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
    this.apiAdminSettlementFeeCategoryTreeMap = conf.baseApiPath + '/api/admin/settlement/feeCategoryTreeMap'
    this.apiAdminSettlementFeeCategoryDetail = conf.baseApiPath + '/api/admin/settlement/feeCategoryDetail'
    this.apiAdminSettlementSaveOrUpdateFeeCategory = conf.baseApiPath + '/api/admin/settlement/saveOrUpdateFeeCategory'
    this.apiAdminSettlementDeleteFeeCategory = conf.baseApiPath + '/api/admin/settlement/deleteFeeCategory'

    this.apiAdminSettlementIncomeCategoryList = conf.baseApiPath + '/api/admin/settlement/incomeCategoryList'
    this.apiAdminSettlementIncomeCategoryDetail = conf.baseApiPath + '/api/admin/settlement/incomeCategoryDetail'
    this.apiAdminSettlementSaveOrUpdateIncomeCategory = conf.baseApiPath + '/api/admin/settlement/saveOrUpdateIncomeCategory'
    this.apiAdminSettlementDeleteIncomeCategory = conf.baseApiPath + '/api/admin/settlement/deleteIncomeCategory'

    this.importCourseExcel= conf.baseApiPath + '/api/admin/courseTemplateImport'
    this.importCourseClassImport= conf.baseApiPath + '/api/admin/courseClassImport'

    this.apiAdminClassHistoryList = conf.baseApiPath + '/api/admin/classHistoryList'

    this.apiAdminSaveCategory = conf.baseApiPath + '/api/admin/trading/saveCategory'
    this.apiAdminEditCategory = conf.baseApiPath + '/api/admin/trading/editCategory'
    this.apiAdminCategoryDetail = conf.baseApiPath + '/api/admin/trading/getCategory'
    this.apiAdminCategoryList = conf.baseApiPath + '/api/admin/trading/showCategory'
    this.apiAdminDeleteCategory = conf.baseApiPath + '/api/admin/trading/deleteCategory'
    this.apiAdminGetCategory = conf.baseApiPath + '/api/admin/trading/getCategoryMessage'

    this.apiAdminGetCategoryByType = conf.baseApiPath + '/api/admin/trading/findServiceCategoryTreeVoByType'

    this.apiAdminServiceMerchantList = conf.baseApiPath + '/api/admin/trading/merchantList'

    this.apiAdminServiceMerchantDetail = conf.baseApiPath + '/api/admin/trading/merchantDetail'
    this.apiAdminChangeServiceMerchant = conf.baseApiPath + '/api/admin/trading/auditMerchant'

    this.apiAdminGoodList=conf.baseApiPath+'/api/admin/trading/goodPage'
    this.apiAdminOffGood=conf.baseApiPath+'/api/admin/trading/offGood'
    this.apiAdminDeleteGood=conf.baseApiPath+'/api/admin/trading/deleteGood'

    this.apiAdminDemandList=conf.baseApiPath+'/api/admin/trading/demandPage'
    this.apiAdminOffDemand=conf.baseApiPath+'/api/admin/trading/offDemand'
    this.apiAdminDeleteDemand=conf.baseApiPath+'/api/admin/trading/deleteDemand'


    this.apiAdminLeaseList=conf.baseApiPath+'/api/admin/trading/leasePage'
    this.apiAdminOffLease=conf.baseApiPath+'/api/admin/trading/offLease'
    this.apiAdminDeleteLease=conf.baseApiPath+'/api/admin/trading/deleteLease'


    this.apiAdminOrderItemList=conf.baseApiPath+'/api/admin/trading/orderItemList'


    this.apiAdminAttendClassLectureList = conf.baseApiPath + '/api/admin/attendance/attendClassLectureList'
    this.apiAdminAttendanceAttendanceRecordList = conf.baseApiPath + '/api/admin/attendance/attendanceRecordList'
    this.apiAdminAttendanceAttendanceRecordDetailList = conf.baseApiPath + '/api/admin/attendance/attendanceRecordDetailList'
    this.apiAdminAttendanceSaveAttendanceRecordDetail = conf.baseApiPath + '/api/admin/attendance/saveAttendanceRecordDetail'
    this.apiAdminAttendanceAttendClassRecordDetailList = conf.baseApiPath + '/api/admin/attendance/attendClassRecordDetailList'
    this.apiAdminAttendanceExportAttendClassRecordDetail = conf.baseApiPath + '/api/admin/attendance/exportAttendClassRecordDetail'


    this.apiAdminStudentMainAccount = conf.baseApiPath + '/api/admin/studentMainAccount'
    this.autoBindStudent = conf.baseApiPath + '/api/m/u/autoBindStudent'


    this.apiAdminReportChargeList = conf.baseApiPath + '/api/admin/report/chargeList'
    this.campusChargeList = conf.baseApiPath + '/api/admin/report/campusChargeList'
    this.apiAdminReportChangeChargeDailyStatus = conf.baseApiPath + '/api/admin/report/changeChargeDailyStatus'
    this.canelChargeDailyStatus  = conf.baseApiPath + '/api/admin/report/canelChargeDailyStatus '
    this.apiAdminReportExportCharge = conf.baseApiPath + '/api/admin/report/exportCharge'
    this.exportCampusCharge = conf.baseApiPath + '/api/admin/report/exportCampusCharge'
    this.apiAdminReportAggregateConsumeList = conf.baseApiPath + '/api/admin/report/aggregateConsumeList'
    this.apiAdminReportExportConsumeAggregation = conf.baseApiPath + '/api/admin/report/exportConsumeAggregation'
    this.apiAdminReportPayRecordList = conf.baseApiPath + '/api/admin/report/payRecordList'
    this.apiAdminReportExportPayRecordList = conf.baseApiPath + '/api/admin/report/exportPayRecordList'


    this.apiAdminScheduleScheduleDataOfTeacher = conf.baseApiPath + '/api/admin/schedule/scheduleDataOfTeacher'
    this.apiAdminSchedulescheduleDataOfCampus = conf.baseApiPath + '/api/admin/schedule/scheduleDataOfCampus'
    this.apiAdminScheduleSaveChange = conf.baseApiPath + '/api/admin/schedule/saveChange'


    this.apiAdminHtml2excel = conf.baseApiPath + '/api/admin/html2excel'

    this.apiAdminDiscountCategoryList = conf.baseApiPath + '/api/admin/discount/categoryList'
    this.apiAdminDiscountCategoryDetail = conf.baseApiPath + '/api/admin/discount/categoryDetail'
    this.apiAdminDiscountDelCategory = conf.baseApiPath + '/api/admin/discount/delCategory'
    this.apiAdminDiscountSaveOrUpdateCategory = conf.baseApiPath + '/api/admin/discount/saveOrUpdateCategory'
    this.apiAdminDiscountRuleList = conf.baseApiPath + '/api/admin/discount/ruleList'
    this.apiAdminDiscountRuleDetail = conf.baseApiPath + '/api/admin/discount/ruleDetail'
    this.apiAdminDiscountDelRule = conf.baseApiPath + '/api/admin/discount/delRule'
    this.apiAdminDiscountSaveOrUpdateRule = conf.baseApiPath + '/api/admin/discount/saveOrUpdateRule'
    this.apiAdminDiscountDiscountList = conf.baseApiPath + '/api/admin/discount/discountList'
    this.apiAdminDiscountDiscountDetail = conf.baseApiPath + '/api/admin/discount/discountDetail'
    this.apiAdminDiscountDelDiscount = conf.baseApiPath + '/api/admin/discount/delDiscount'
    this.apiAdminDiscountSaveOrUpdateDiscount = conf.baseApiPath + '/api/admin/discount/saveOrUpdateDiscount'
    this.apiAdminDiscountTestRule = conf.baseApiPath + '/api/admin/discount/testRule'
    this.apiAdminDiscountTestData = conf.baseApiPath + '/api/admin/discount/testData'

    this.mainAccountTargetList = conf.baseApiPath + '/api/admin/analyze/mainAccountTargetList'
    this.teacherTargetList = conf.baseApiPath + '/api/admin/analyze/teacherTargetList'
    this.classTargetList = conf.baseApiPath + '/api/admin/analyze/classTargetList'
    this.findMainAccountCostAndIncome = conf.baseApiPath + '/api/admin/analyze/findMainAccountCostAndIncome'
    this.findIncomeByAllCategory = conf.baseApiPath + '/api/admin/analyze/findIncomeByAllCategory'
    this.findCostByAllCategory = conf.baseApiPath + '/api/admin/analyze/findCostByAllCategory'
    this.incomeDetail = conf.baseApiPath + '/api/admin/analyze/incomeDetail'
    this.costDetail = conf.baseApiPath + '/api/admin/analyze/costDetail'
    this.productCostDetail = conf.baseApiPath + '/api/admin/analyze/productCostDetail'
    this.gradeAndSubjectDetail = conf.baseApiPath + '/api/admin/analyze/gradeAndSubjectDetail'
    this.productStatisticsList = conf.baseApiPath + '/api/admin/analyze/productStatisticsList'
    this.areaTeamGradeAndSubjectStatistics = conf.baseApiPath + '/api/admin/analyze/areaTeamGradeAndSubjectStatistics'
    this.productStatisticsByCategory = conf.baseApiPath + '/api/admin/analyze/productStatisticsByCategory'
    this.gradeAndSubjectAllCategoryDetail = conf.baseApiPath + '/api/admin/analyze/gradeAndSubjectAllCategoryDetail'
    this.gradeAndSubjectIncome = conf.baseApiPath + '/api/admin/analyze/gradeAndSubjectIncome'
    this.productIncomeList = conf.baseApiPath + '/api/admin/analyze/productIncomeList'
    this.incomeProfitsOfAreaTeam = conf.baseApiPath + '/api/admin/analyze/incomeProfitsOfAreaTeam'
    this.businessCaseOfAreaTeam = conf.baseApiPath + '/api/admin/analyze/businessCaseOfAreaTeam'
    this.warningOfAreaTeam = conf.baseApiPath + '/api/admin/analyze/warningOfAreaTeam'
    this.fullClassRate = conf.baseApiPath + '/api/admin/analyze/fullClassRate'
    this.seniorComletionRate = conf.baseApiPath + '/api/admin/analyze/seniorComletionRate'
    this.gradeCompletionRate = conf.baseApiPath + '/api/admin/analyze/gradeCompletionRate'
    this.classComletionRate = conf.baseApiPath + '/api/admin/analyze/classComletionRate'
    this.exportGradeCompletionRate = conf.baseApiPath + '/api/admin/analyze/exportGradeCompletionRate'
    this.exportSomeSeniorComletionRate  = conf.baseApiPath + '/api/admin/analyze/exportSomeSeniorComletionRate '
    this.exportClassComletionRate = conf.baseApiPath + '/api/admin/analyze/exportClassComletionRate'
    this.exportSeniorComletionRate = conf.baseApiPath + '/api/admin/analyze/exportSeniorComletionRate'
    this.exportClassComletionRate = conf.baseApiPath + '/api/admin/analyze/exportClassComletionRate'
    this.productTargetList = conf.baseApiPath + '/api/admin/analyze/productTargetList'
    this.findSummerWinterById = conf.baseApiPath + '/api/admin/findSummerWinterById'
    this.findSummerWinterList = conf.baseApiPath + '/api/admin/findSummerWinterList'
    this.deleteSummerWinter = conf.baseApiPath + '/api/admin/deleteSummerWinter'
    this.saveOrUpdateSummerWinter = conf.baseApiPath + '/api/admin/saveOrUpdateSummerWinter'
    this.findSummerWinterByCampusId = conf.baseApiPath + '/api/admin/findSummerWinterByCampusId'
    this.periodByYearAndAreaTeamId = conf.baseApiPath + '/api/admin/analyze/periodByYearAndAreaTeamId'
    this.saveOrUpdateMainAccountTarget = conf.baseApiPath + '/api/admin/analyze/saveOrUpdateMainAccountTarget'
    this.saveOrUpdateProductTarget = conf.baseApiPath + '/api/admin/analyze/saveOrUpdateProductTarget'
    this.saveTeacherTarget = conf.baseApiPath + '/api/admin/analyze/saveTeacherTarget'
    this.saveClassTarget = conf.baseApiPath + '/api/admin/analyze/saveClassTarget'
    this.ownMainCount = conf.baseApiPath + '/api/admin/trading/ownMainCount'
    this.auditTransfer = conf.baseApiPath + '/api/admin/balance/auditTransfer'
    this.auditWithdrawal = conf.baseApiPath + '/api/admin/balance/auditWithdrawal'
    this.setupPayStatusForWithdrawal = conf.baseApiPath + '/api/admin/balance/setupPayStatusForWithdrawal'
    this.transferDetail = conf.baseApiPath + '/api/admin/balance/transferDetail'
    this.transferForStudent = conf.baseApiPath + '/api/admin/balance/transferForStudent'
    this.transferList = conf.baseApiPath + '/api/admin/balance/transferList'
    this.withdrawalDetail = conf.baseApiPath + '/api/admin/balance/withdrawalDetail'
    this.withdrawalForStudent = conf.baseApiPath + '/api/admin/balance/withdrawalForStudent'
    this.withdrawalList = conf.baseApiPath + '/api/admin/balance/withdrawalList'
    this.exportWithdrawalList = conf.baseApiPath + '/api/admin/balance/exportWithdrawalList'
    this.exportTransferList = conf.baseApiPath + '/api/admin/balance/exportTransferList'
    this.studentRefundWithRegInfoDetail = conf.baseApiPath + '/api/admin/studentRefundWithRegInfoDetail'


    this.apiAdminAllinPayCusIdConfigList = conf.baseApiPath + '/api/admin/allinPayCusIdConfigList'
    this.apiAdminAllinPayCusIdConfig = conf.baseApiPath + '/api/admin/allinPayCusIdConfig'
    this.apiAdminSaveAllinPayCusIdConfig = conf.baseApiPath + '/api/admin/saveAllinPayCusIdConfig'



    this.studentScoreList = conf.baseApiPath + '/api/admin/measurement/studentScoreList'
    this.studentScoreDetail = conf.baseApiPath + '/api/admin/measurement/studentScoreDetail'
    this.saveOrUpdateStudentScore = conf.baseApiPath + '/api/admin/measurement/saveOrUpdateStudentScore'
    this.saveOrUpdateMeasurement = conf.baseApiPath + '/api/admin/measurement/saveOrUpdateMeasurement'
    this.measurementList = conf.baseApiPath + '/api/admin/measurement/measurementList'
    this.measurementDetail = conf.baseApiPath + '/api/admin/measurement/measurementDetail'
    this.deleteMeasurement = conf.baseApiPath + '/api/admin/measurement/deleteMeasurement'







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
      timeout : 60000,
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
      timeout : 60000,
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
      timeout : 60000,
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
    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      dataType: 'json',
      processData: false,
      headers :this.getHeaders(),
      timeout : 60000,
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
    Vue.http.post(url +"?accessToken="+this.getHeaders().accessToken,data ,{timeout : 0 }).then(data=>{
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
    console.log(data)
    $form.appendTo('body').submit().remove()
  }

};

io.configUrls()

export default io ;
