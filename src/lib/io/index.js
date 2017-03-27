
import conf from '../conf'

import Storage from '../storage'

import Vue from 'vue'

jQuery.cachedScript = function( url, options ) {
  options = $.extend( options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });
  return jQuery.ajax( options );
};

const io = {


  configUrls: function () {
    this.saveUser = conf.baseApiPath + '/api?method=saveUser'
    this.getUser = conf.baseApiPath + '/api?method=getUser'
    this.userList = conf.baseApiPath + '/api?method=userList'

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

    this.apiAdminTeacherList = conf.baseApiPath + '/api/admin/teacherList'
    this.apiAdminTeacherDetail = conf.baseApiPath + '/api/admin/teacherDetail'
    this.apiAdminSaveOrUpdateTeacher = conf.baseApiPath + '/api/admin/saveOrUpdateTeacher'
    this.apiAdminDelTeacher = conf.baseApiPath + '/api/admin/delTeacher'

    this.apiAdminCampusList = conf.baseApiPath + '/api/admin/campusList'
    this.apiAdminCampusDetail = conf.baseApiPath + '/api/admin/campusDetail'
    this.apiAdminSaveOrUpdateCampus = conf.baseApiPath + '/api/admin/saveOrUpdateCampus'
    this.apiAdminDelCampus = conf.baseApiPath + '/api/admin/delCampus'

    this.apiAdminRoomList = conf.baseApiPath + '/api/admin/roomList'
    this.apiAdminRoomDetail = conf.baseApiPath + '/api/admin/roomDetail'
    this.apiAdminSaveOrUpdateRoom = conf.baseApiPath + '/api/admin/saveOrUpdateRoom'
    this.apiAdminDelRoom = conf.baseApiPath + '/api/admin/delRoom'
    this.apiAdminRoomListForClassArrangement = conf.baseApiPath + '/api/admin/arrangement/roomListForClassArrangement'
    this.apiAdminArrangeRoom = conf.baseApiPath + '/api/admin/arrangement/arrangementRoom'

    this.apiAdminCourseTemplateList = conf.baseApiPath + '/api/admin/courseTemplateList'
    this.apiAdminTemplateDetailDetail = conf.baseApiPath + '/api/admin/courseTemplateDetail'
    this.apiAdminSaveOrUpdateTemplateDetail = conf.baseApiPath + '/api/admin/saveOrUpdateCourseTemplate'
    this.apiAdminChangeCourseStatus = conf.baseApiPath + '/api/admin/changeCourseStatus'
    this.apiAdminChangeCourseTypeList = conf.baseApiPath + '/api/admin/courseTypeList'
    this.apiAdminDownloadCourseExcel = conf.baseApiPath+ '/api/admin/downloadCourseTemplate'

    this.apiAdminCourseProductTemplateList  = conf.baseApiPath + '/api/admin/courseProductList'
    this.apiAdminProductDetail = conf.baseApiPath + '/api/admin/productDetail'
    this.apiAdminProductSaveOrUpdate  = conf.baseApiPath  + '/api/admin/saveOrUpdateProduct'
    this.apiAdminBaseProductList = conf.baseApiPath + '/api/admin/baseProductList'
    this.apiAdminBaseCourseList = conf.baseApiPath + '/api/admin/baseCourseList'

    this.apiAdminCourseClassList = conf.baseApiPath + '/api/admin/courseClassList'
    this.apiAdminCourseClassDetail = conf.baseApiPath + '/api/admin/courseClassDetail'
    this.apiAdminSaveOrUpdateClass = conf.baseApiPath + '/api/admin/saveOrUpdateCourseClass'

    this.studentSaveOrUpdate = conf.baseApiPath + '/api/admin/saveOrUpdateStudent'
    this.apiAdminStudentDetail = conf.baseApiPath + '/api/admin/studentDetail'
    this.apiAdminSearchStudent = conf.baseApiPath + '/api/admin/searchStudent'
    this.apiAdminCreateOfflineOrder = conf.baseApiPath + '/api/admin/createOfflineOrder'
    this.apiAdminCourseOrderList = conf.baseApiPath + '/api/admin/courseOrderList'
    this.apiAdminStudentReadClassList = conf.baseApiPath + '/api/admin/studentReadClassList'
    this.apiAdminCourseOrderDetail = conf.baseApiPath + '/api/admin/courseOrderDetail'
    this.apiAdminPayCourseOrder= conf.baseApiPath + '/api/admin/payCourseOrder'
    this.apiAdminStudentRefundForm = conf.baseApiPath + '/api/admin/studentRefund'

    this.apiAdminLoadGradesByAreaTeamIdAndBusTeamId = conf.baseApiPath + '/api/admin/loadGradesByAreaTeamIdAndBusTeamId'

    this.apiAdminSettlementAccountMainBodyList = conf.baseApiPath + '/api/admin/settlement/accountMainBodyList'
    this.apiAdminSettlementAccountReportDetailList = conf.baseApiPath + '/api/admin/settlement/accountReportDetailList'
    this.apiAdminSettlementFeelList = conf.baseApiPath + '/api/admin/settlement/feelList'
    this.apiAdminSettlementSaveFee = conf.baseApiPath + '/api/admin/settlement/saveFee'
    this.apiAdminSettlementAuditingFee = conf.baseApiPath + '/api/admin/settlement/auditingFee'
    this.apiAdminSettlementExpensesTypeList = conf.baseApiPath + '/api/admin/settlement/expensesTypeList'

    this.importCourseExcel= conf.baseApiPath + '/api/admin/courseTemplateImport'

    this.apiAdminClassHistoryList = conf.baseApiPath + '/api/admin/classHistoryList'



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
        if (success) {
          success(data);
        }
      },
      error: function (xhr, status, error) {

        if (fail) {
          fail(xhr, status, error);
        } else {
          alert("服务端出错");
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
        if (success) {
          success(data);
        }
      },
      error: function (xhr, status, error) {
        if (fail) {
          fail(xhr, status, error);
        } else {
          alert("服务端出错");
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
        if (success) {
          success(data);
        }
      },
      error: function (xhr, status, error) {
        if (fail) {
          fail(xhr, status, error);
        } else {
          alert("服务端出错");
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
        if (success) {
          success(data);
        }
      },
      error: function (xhr, status, error) {
        if (fail) {
          fail(xhr, status, error);
        }else {
          alert("服务端出错");
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
  }
};

io.configUrls()

export default io ;
