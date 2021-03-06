import conf from '../conf'
import axios from 'axios';
import qs from 'qs';
import storage from '../../lib/storage'

const io = {
  configUrls: function () {
// 登录
    this.login = conf.baseApiPath + '/admin/api/login'
    this.checkNeedCaptcha = conf.baseApiPath + '/admin/api/captcha/checkNeedCaptcha'
    this.generCaptcha = conf.baseApiPath + '/admin/api/captcha/generCaptcha'
    // 数据字典
    this.findDataByCategory = conf.baseApiPath + '/admin/api/commDataConfig/findDataByCategory'
// 教研
    this.findLessonPage = conf.baseApiPath + '/lesson/api/lesson/findLessonPage'
    // 查询数据
    this.findBaseSectionPage = conf.baseApiPath + '/lesson/api/BaseSection/findBaseSectionPage'
    this.findSubjectsData = conf.baseApiPath + '/lesson/api/baseDataController/findSubjectsData'
    this.findBaseTermPage = conf.baseApiPath + '/lesson/api/BaseTerm/findBaseTermPage'
    this.findBaseLevelPage = conf.baseApiPath + '/lesson/api/BaseLevel/findBaseLevelPage'
    this.findMaterialData = conf.baseApiPath + '/lesson/api/baseDataController/findMaterialData'
    this.findYearsData = conf.baseApiPath + '/lesson/api/baseDataController/findYearsData'
    // 课程
    this.lessonStatistic=conf.baseApiPath+'/lesson/api/lesson/lessonStatistic'
    this.publishLesson=conf.baseApiPath+'/lesson/api/lesson/publishLesson'
    this.addLesChapters=conf.baseApiPath+'/lesson/api/lessonChapter/addLesChapters'
    this.delLesChapters=conf.baseApiPath+'/lesson/api/lessonChapter/delLesChapters'
    this.changeLesChapter=conf.baseApiPath+'/lesson/api/lessonChapter/changeLesChapter'
    this.sortLesChapters=conf.baseApiPath+'/lesson/api/lessonChapter/sortLesChapters'
    this.detailLesChapters=conf.baseApiPath+'/lesson/api/lessonChapter/detailLesChapters'
    this.addLessonMaterial=conf.baseApiPath+'/lesson/api/LessonMaterial/addLessonMaterial'
    this.findLessonMaterial=conf.baseApiPath+'/lesson/api/LessonMaterial/findLessonMaterial'
    this.delLessonMaterial=conf.baseApiPath+'/lesson/api/LessonMaterial/delLessonMaterial'
    this.addOrUpLesson=conf.baseApiPath+'/lesson/api/lesson/addOrUpLesson'
    this.detailLesson=conf.baseApiPath+'/lesson/api/lesson/detailLesson'
    this.findLesChapterPage=conf.baseApiPath+'/lesson/api/lessonChapter/findLesChapterPage'
    this.publishLesChapter=conf.baseApiPath+'/lesson/api/lessonChapter/publishLesChapter'
    // 讲次
    this.findBaseChapterPage=conf.baseApiPath+'/lesson/api/baseChapter/findBaseChapterPage'
    this.addBaseChapter=conf.baseApiPath+'/lesson/api/baseChapter/addBaseChapter'
    this.updateBaseChapter=conf.baseApiPath+'/lesson/api/baseChapter/updateBaseChapter'
    this.getBaseChapter=conf.baseApiPath+'/lesson/api/baseChapter/getBaseChapter'
    // 素材
    this.findBaseMaterial=conf.baseApiPath+'/lesson/api/baseMaterial/findBaseMaterial'
    this.getBaseMaterial=conf.baseApiPath+'/lesson/api/baseMaterial/getBaseMaterial'
    this.addBaseMaterial=conf.baseApiPath+'/lesson/api/baseMaterial/addBaseMaterial'
    this.updateBaseMaterial=conf.baseApiPath+'/lesson/api/baseMaterial/updateBaseMaterial'
    // office token
    this.view=conf.baseApiPath+'/admin/api/token/view'
    this.edit=conf.baseApiPath+'/admin/api/token/edit'
    this.download=conf.baseApiPath+'/admin/api/token/download'
    this.del=conf.baseApiPath+'/admin/api/token/del'
    this.print=conf.baseApiPath+'/admin/api/token/print'
    this.upload=conf.baseApiPath+'/admin/api/token/upload'

// 系统管理
  this.findAuthUserPage=conf.baseApiPath + '/admin/api/authUser/findAuthUserPage'
  this.findSysAuthUserPage=conf.baseApiPath + '/admin/api/authUser/findSysAuthUserPage'
  this.authUserDetail=conf.baseApiPath + '/admin/api/authUser/authUserDetail'
  this.findAuthRoleList=conf.baseApiPath + '/admin/api/authRole/findAuthRoleList'
  this.addSysAuthUser=conf.baseApiPath + '/admin/api/authUser/addSysAuthUser'
  this.addAuthUser=conf.baseApiPath + '/admin/api/authUser/addAuthUser'
  this.updateSysAuthUser=conf.baseApiPath + '/admin/api/authUser/updateSysAuthUser'
  this.updateAuthUser=conf.baseApiPath + '/admin/api/authUser/updateAuthUser'
  this.updateStatus=conf.baseApiPath + '/admin/api/authUser/updateStatus'
  this.teacherList=conf.baseApiPath + '/admin/api/authUser/teacherList'
  this.config=conf.baseApiPath + '/admin/api/authUser/config'
  //机构
  this.findAuthOrgan=conf.baseApiPath + '/admin/api/authOrgan/findAuthOrgan'
  this.findAuthOrganPerson=conf.baseApiPath + '/admin/api/authOrgan/findAuthOrganPerson'
  this.addAuthOrgan=conf.baseApiPath + '/admin/api/authOrgan/addAuthOrgan'
  this.getAuthOrganDetail=conf.baseApiPath + '/admin/api/authOrgan/getAuthOrganDetail'
  this.updateAuthOrgan=conf.baseApiPath + '/admin/api/authOrgan/updateAuthOrgan'
  this.delAuthOrgan=conf.baseApiPath + '/admin/api/authOrgan/delAuthOrgan'
  this.authRoleListForOrgan=conf.baseApiPath + '/admin/api/authRole/authRoleListForOrgan'
  
  //个人
  this.addAuthOrganPerson=conf.baseApiPath + '/admin/api/authOrgan/addAuthOrganPerson'
  this.updateAuthOrganPerson=conf.baseApiPath + '/admin/api/authOrgan/updateAuthOrganPerson'
  this.delAuthOrganPerson=conf.baseApiPath + '/admin/api/authOrgan/delAuthOrganPerson'
  //角色管理
  this.findAuthRolePag=conf.baseApiPath + '/admin/api/authRole/findAuthRolePage'
  this.addAuthRole=conf.baseApiPath + '/admin/api/authRole/addAuthRole'
  this.updateAuthRole=conf.baseApiPath + '/admin/api/authRole/updateAuthRole'
  this.authRoleResourceList=conf.baseApiPath + '/admin/api/authResource/authRoleResourceList'
  this.saveAuthRoleResourceList=conf.baseApiPath + '/admin/api/authResource/saveAuthRoleResourceList'
  //科目查询班级
  this.findBaseSectionBySubject=conf.baseApiPath + '/lesson/api/BaseSection/findBaseSectionBySubject'
// 个人中心
  this.updatePass=conf.baseApiPath + '/admin/api/updatePass'
  //老师列表
  this.teacherList=conf.baseApiPath + '/admin/api/authUser/teacherList'
  
// 校区
  this.findBaseSchoolPage=conf.baseApiPath + '/lesson/api/BaseSchool/findBaseSchoolPage'
  this.addSchool=conf.baseApiPath + '/lesson/api/BaseSchool/addSchool'
  this.delSchool=conf.baseApiPath + '/lesson/api/BaseSchool/delSchool'
  this.updateSchool=conf.baseApiPath + '/lesson/api/BaseSchool/updateSchool'
  this.getBaseSchool=conf.baseApiPath + '/lesson/api/BaseSchool/getBaseSchool'
  // 班型
  this.addLevel=conf.baseApiPath + '/lesson/api/BaseLevel/addLevel'
  this.updateLevel=conf.baseApiPath + '/lesson/api/BaseLevel/updateLevel'
  this.delLevel=conf.baseApiPath + '/lesson/api/BaseLevel/delLevel'
  // 学期
  this.addTerm=conf.baseApiPath + '/lesson/api/BaseTerm/addTerm'
  this.updateTerm=conf.baseApiPath + '/lesson/api/BaseTerm/updateTerm'
  this.delTerm=conf.baseApiPath + '/lesson/api/BaseTerm/delTerm'
  // 班级
  this.findClassPage=conf.baseApiPath + '/lesson/api/lessonClass/findClassPage'
  this.addOrUpdateClass=conf.baseApiPath + '/lesson/api/lessonClass/addOrUpdateClass'
  this.classDetail=conf.baseApiPath + '/lesson/api/lessonClass/classDetail'
  this.lessonClassPlanChapterList=conf.baseApiPath + '/lesson/api/lessonClass/lessonClassPlanChapterList'
  this.addTeacher=conf.baseApiPath + '/lesson/api/lessonClass/addTeacher'
  this.changeTeacher=conf.baseApiPath + '/lesson/api/lessonClass/changeTeacher'
  this.deleteTeacher=conf.baseApiPath + '/lesson/api/lessonClass/deleteTeacher'
  this.detailLessonClassChapter=conf.baseApiPath + '/lesson/api/lessonClass/detailLessonClassChapter'
  this.deleteLessonClass=conf.baseApiPath + '/lesson/api/lessonClass/deleteLessonClass'
 


  },
  getHeaders: function () {
    const accessToken = storage.getAccessToken();
    return {
      accessToken
    }
  },
  get: function (url, data, success, fail) {
    // data.accessToken = this.getHeaders().accessToken
    data = { accessToken: this.getHeaders().accessToken, ...data }
    let formdata = qs.stringify(data);
    axios({
      url: url,
      method: 'GET',
      data: formdata,
      dataType: 'json',
      cache: true,
      timeout: 30000,
    })
      .then(function ({ data }) {
        if (data.success) {
          if (success) {
            success(data.data);
          }
        } else {
          window.$notify.error({
            title: '错误',
            message: data.desc
          });
        }
      })
      .catch(function (error) {
        if (fail) {
          fail(error);
        } else {
        }
      });
  },
    get6: async function (url, data, success, fail, timeout) {
        try {
            data = { accessToken: this.getHeaders().accessToken, ...data }
            let formdata = qs.stringify(data);
            let res = await axios(url + "?" + formdata, {
                dataType: 'json',
                timeout: timeout || 30000
            });
            if (res.data.code === '3001') {

                storage.removeAccessToken()
                storage.removeCurrentUserInfo()
                Vue.prototype.$router.push('/login')
            }
            if (!res.data.success && !res.data.uptoken) {
                Vue.prototype.$notify.error({
                    title: '错误',
                    message: res.data.desc
                });
            }
            return res;
        } catch (err) {
            Vue.prototype.$notify.error({
                title: '错误',
                message: err.name
            })
            return
        }
    },
  post: function (url, data, success, fail) {
    //如果需要加载数据时显示loading动画，需要传人this对象
    // data对象统一转成formdata 的形式
    data = { accessToken: this.getHeaders().accessToken, ...data }
    let formdata = qs.stringify(data);
    axios({
      url: url,
      method: 'POST',
      data: formdata,
      dataType: 'json',
      timeout: 30000
    })
      .then(function ({ data }) {
        if (data.success) {
          if (success) {
            success(data.data, data.success);
          }
        } else {
          if (fail) {
            fail(data)
          }
          if(data.desc.indexOf('token不能为空')===-1){
            console.log('window',window)
          window.$notify.error({
            title: '错误',
            message: data.desc
          });
        }else{
          storage.removeAccessToken();
          storage.removeCurrentUserInfo();
            // document.location.href='/';
          }
        }
      })
      .catch(function (error) {
        if (fail) {
          fail(error);
        } else {
        }
      });
  },
  post6: async function (url, data, success, fail,timeout) {
    //如果需要加载数据时显示loading动画，需要传人this对象
    // data对象统一转成formdata 的形式
    try {
      data = { accessToken: this.getHeaders().accessToken, ...data }
      let formdata = qs.stringify(data);
      let res= await axios({
        url: url,
        method: 'POST',
        data: formdata,
        dataType: 'json',
        timeout: timeout||30000
      });
      console.log("xxxx")
      console.log('res',res.data.code === '3001')
            if (res.data.code === '3001') {
                storage.removeAccessToken()
                storage.removeCurrentUserInfo()
                // console.log("xxd",Vue.prototype.$router)
                // Vue.prototype.$router.push('/login')
                document.location.reload()
            }
      if(!res.data.success&&res.data.desc){
          window.$notify.error({
            title: '错误',
            message: res.data.desc
          });
      }
      return res;
    } catch (err) {
          window.$notify.error({
            title: '错误',
            message: err.name
          });
    }
    // .then(function ({data}) {
    //   console.log("datasuccess",data.success)
    //   if(data.success){
    //     resolve(data);
    //   // if (success) {
    //   //   success(data.data,data.success);
    //   // }
    // }else{
    //   if(fail){
    //     fail(data)
    //   }
    //   window.$notify.error({
    //     title: '错误',
    //     message: data.desc
    //   });
    //   }
    // })
    // .catch(function (error) {
    //   if (fail) {
    //     fail(error);
    //   } else {
    //   }
    // });
  },
  getJSON: function (url) {
    axios({
      url: url,
      dataType: 'json',
      timeout: 30000
    })
      .then(function (data) {
        if (success) {
          success(data);
        }
      })
      .catch(function (error) {
        if (fail) {
          fail(error);
        } else {
          //alert("服务端出错");
        }
      });
  },

};

io.configUrls()

export default io;
