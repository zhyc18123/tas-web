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
    // 课程
    this.publishLesson=conf.baseApiPath+'/lesson//api/lesson/publishLesson'



    this.questionList = conf.baseApiPath + '/api/question/questionList'
    this.editStatus = conf.baseApiPath + '/api/question/editStatus'
    this.questionTypeOfSubjectList = conf.baseApiPath + '/api/question/questionTypeOfSubjectList'
    this.questionOriginConfig = conf.baseApiPath + '/api/question/questionOriginConfig'
    this.sppOfSubject = conf.baseApiPath + '/api/question/sppOfSubject'
    this.abilityOfSubject = conf.baseApiPath + '/api/question/abilityOfSubject'
    this.abilityOfQuestion = conf.baseApiPath + '/api/question/abilityOfQuestion'
    
    this.questionDetail = conf.baseApiPath + '/api/question/questionDetail'
    this.releaseQuestion = conf.baseApiPath + '/api/question/releaseQuestion'
    this.questionOptStatus = conf.baseApiPath + '/api/question/questionOptStatus'
    this.saveAbilityConfig = conf.baseApiPath + '/api/question/saveAbilityConfig'
    this.saveQuestion = conf.baseApiPath + '/api/question/saveQuestion'
    this.saveQuestionOriginArea = conf.baseApiPath + '/api/question/saveQuestionOriginArea'
    this.saveQuestionOriginName = conf.baseApiPath + '/api/question/saveQuestionOriginName'
    this.saveQuestionOriginYear = conf.baseApiPath + '/api/question/saveQuestionOriginYear'
    this.saveOrUpdateSubjectSpp = conf.baseApiPath + '/api/question/saveOrUpdateSubjectSpp'
    this.saveSubjectQuestionType = conf.baseApiPath + '/api/question/saveSubjectQuestionType'
    this.questionOriginList = conf.baseApiPath + '/api/question/questionOriginList'
    this.questionOriginConfig = conf.baseApiPath + '/api/question/questionOriginConfig'
    this.questionOriginAreaList = conf.baseApiPath + '/api/question/questionOriginAreaList'
    this.deleteQuestionOrigin = conf.baseApiPath + '/api/question/deleteQuestionOrigin'
    this.deleteSubjectQuestionType = conf.baseApiPath + '/api/question/deleteSubjectQuestionType'
    this.questionSchoolList = conf.baseApiPath + '/api/question/questionSchoolList'
    this.saveQuestionOriginSchool = conf.baseApiPath + '/api/question/saveQuestionOriginSchool'
    this.detectQuestionOptStatus = conf.baseApiPath + '/api/question/detectQuestionOptStatus'
    this.deleteSubjectSpp = conf.baseApiPath + '/api/question/deleteSubjectSpp'
    this.moveSubjectSpp = conf.baseApiPath + '/api/question/moveSubjectSpp'
    this.saveOrUpdateAbilityCategory = conf.baseApiPath + '/api/question/saveOrUpdateAbilityCategory'
    this.saveOrUpdateAbilityItem = conf.baseApiPath + '/api/question/saveOrUpdateAbilityItem'
    this.deleteAbilityCategory = conf.baseApiPath + '/api/question/deleteAbilityCategory'
    this.deleteAbilityItem = conf.baseApiPath + '/api/question/deleteAbilityItem'
    this.findSimQuestion = conf.baseApiPath + '/api/question/findSimQuestion'
// 系统
    this.delOptRole = conf.baseApiPath + '/api/platform/delOptRole'
    this.delUser = conf.baseApiPath + '/api/platform/delUser'
    this.optResourceList = conf.baseApiPath + '/api/platform/optResourceList'
    this.optRoleList = conf.baseApiPath + '/api/platform/optRoleList'
    this.optRoleResourceList = conf.baseApiPath + '/api/platform/optRoleResourceList'
    this.organizationBaseConfig = conf.baseApiPath + '/api/platform/organizationBaseConfig'
    this.roleDetail = conf.baseApiPath + '/api/platform/roleDetail'
    this.saveOptRoleResource = conf.baseApiPath + '/api/platform/saveOptRoleResource'
    this.saveOrUpdateUser = conf.baseApiPath + '/api/platform/saveOrUpdateUser'
    this.saveOrUpdateUserOptRole = conf.baseApiPath + '/api/platform/saveOrUpdateUserOptRole'
    this.saveRole = conf.baseApiPath + '/api/platform/saveRole'
    this.userDetail = conf.baseApiPath + '/api/platform/userDetail'
    this.userList = conf.baseApiPath + '/api/platform/userList'
    this.userRoleList = conf.baseApiPath + '/api/platform/userRoleList'
    this.optRoleSppList = conf.baseApiPath + '/api/platform/optRoleSppList'
    this.saveOptRoleSpp = conf.baseApiPath + '/api/platform/saveOptRoleSpp'
    this.sppResourceList = conf.baseApiPath + '/api/platform/sppResourceList'
    this.tagList = conf.baseApiPath + '/api/platform/tagList'
    this.saveTag = conf.baseApiPath + '/api/platform/saveTag'
    this.deleteTag = conf.baseApiPath + '/api/platform/deleteTag'
// 知识点
    this.allNodeOfKnowledgeTree = conf.baseApiPath + '/api/knowledge//allNodeOfKnowledgeTree'
    this.allNodeOfKnowledgeTree = conf.baseApiPath + '/api/knowledge/allNodeOfKnowledgeTree'
    this.createOrUpdateCustomKnowledgeTree = conf.baseApiPath + '/api/knowledge/createOrUpdateCustomKnowledgeTree'
    this.createEmptyKnowledgeNode = conf.baseApiPath + '/api/knowledge/createEmptyKnowledgeNode'
    this.knowledgeNodeDetail = conf.baseApiPath + '/api/knowledge/knowledgeNodeDetail'
    this.knowledgeTreeList = conf.baseApiPath + '/api/knowledge/knowledgeTreeList'
    this.lastEditHistory = conf.baseApiPath + '/api/knowledge/lastEditHistory'
    this.moveKnowledgeNode = conf.baseApiPath + '/api/knowledge/moveKnowledgeNode'
    this.relate2BaseKnowledgeNode = conf.baseApiPath + '/api/knowledge/relate2BaseKnowledgeNode'
    this.saveKnowledgeNodeForBase = conf.baseApiPath + '/api/knowledge/saveKnowledgeNodeForBase'
    this.saveKnowledgeNodeForCustom = conf.baseApiPath + '/api/knowledge/saveKnowledgeNodeForCustom'
    this.deleteKnowledgeNode = conf.baseApiPath + '/api/knowledge/deleteKnowledgeNode'
    this.knowledgeEditStatus = conf.baseApiPath + '/api/knowledge/editStatus'
    this.knowledgeTree = conf.baseApiPath + '/api/knowledge/knowledgeTree'

    this.code = conf.baseApiPath + '/api/sms/code'
    this.sendCode = conf.baseApiPath + '/api/sms/sendCode'
    this.validCode = conf.baseApiPath + '/api/sms/validCode'
    this.changeMyPassword = conf.baseApiPath + '/api/user/changeMyPassword'
    this.config = conf.baseApiPath + '/api/user/config'
    //产品
    this.checkLectureQuestionUsed = conf.baseApiPath + '/api/product/checkLectureQuestionUsed'
    this.changeLevel = conf.baseApiPath + '/api/product/changeLevel'
    this.createEmptyLectureNode = conf.baseApiPath + '/api/product/createEmptyLectureNode'
    this.createPeerLectureNode = conf.baseApiPath + '/api/product/createPeerLectureNode'
    this.deleteLectureNote = conf.baseApiPath + '/api/product/deleteLectureNote'
    this.lectureNodeDetail = conf.baseApiPath + '/api/product/lectureNodeDetail'
    this.lectureNoteList = conf.baseApiPath + '/api/product/lectureNoteList'
    this.lectureNoteQuestionList = conf.baseApiPath + '/api/product/lectureNoteQuestionList'
    this.moveLectureNode = conf.baseApiPath + '/api/product/moveLectureNode'
    this.renameLectureNode = conf.baseApiPath + '/api/product/renameLectureNode'
    this.saveLectureNodeContentKnowledge = conf.baseApiPath + '/api/product/saveLectureNodeContentKnowledge'
    this.saveLectureNodeContentQuestion = conf.baseApiPath + '/api/product/saveLectureNodeContentQuestion'
    this.saveOrUpdateLectureNoteBaseInfo = conf.baseApiPath + '/api/product/saveOrUpdateLectureNoteBaseInfo'
    this.allNodeOfLectureNote = conf.baseApiPath + '/api/product/allNodeOfLectureNote'
    this.saveOrUpdateLectureNoteBaseInfo = conf.baseApiPath + '/api/product/saveOrUpdateLectureNoteBaseInfo'
    this.createEmptyLectureNode = conf.baseApiPath + '/api/product/createEmptyLectureNode'
    this.lectureNoteQuestionKnowledge = conf.baseApiPath + '/api/product/lectureNoteQuestionKnowledge'
    this.changeLevel = conf.baseApiPath + '/api/product/changeLevel'
    this.moveLectureNode = conf.baseApiPath + '/api/product/moveLectureNode'
    this.renameLectureNode = conf.baseApiPath + '/api/product/renameLectureNode'
    this.deleteLectureNode = conf.baseApiPath + '/api/product/deleteLectureNode'
    this.moveLectureNode = conf.baseApiPath + '/api/product/moveLectureNode'
    this.lectureNodeDetail = conf.baseApiPath + '/api/product/lectureNodeDetail'
    this.lectureNoteQuestionList = conf.baseApiPath + '/api/product/lectureNoteQuestionList'
    this.saveLectureNodeContentKnowledge = conf.baseApiPath + '/api/product/saveLectureNodeContentKnowledge'
    this.saveLectureNodeContentQuestion = conf.baseApiPath + '/api/product/saveLectureNodeContentQuestion'
    this.saveLectureNodeContentQuestionSetting = conf.baseApiPath + '/api/product/saveLectureNodeContentQuestionSetting'
    this.lectureNoteEditHistory = conf.baseApiPath + '/api/product/lectureNoteEditHistory'
    this.generateFile = conf.baseApiPath + '/api/product/generateFile'
    this.exportFile = conf.baseApiPath + '/api/product/exportFile'
    this.lectureNoteDetailList = conf.baseApiPath + '/api/product/lectureNoteDetailList'
    this.moveQuestion = conf.baseApiPath + '/api/product/moveQuestion'
    this.generateFileStatus = conf.baseApiPath + '/api/product/generateFileStatus'
    this.saveLectureNoteQuestionSetting = conf.baseApiPath + '/api/product/saveLectureNoteQuestionSetting'
    // 报表统计
    this.questionOfKnowledgeNode = conf.baseApiPath + '/api/report/questionOfKnowledgeNode'
    this.queryUserList = conf.baseApiPath + '/api/report/queryUserList'
    this.questionProgressOfTeacher = conf.baseApiPath + '/api/report/questionProgressOfTeacher'
    this.questionEfficiencyOfTeacher = conf.baseApiPath + '/api/report/questionEfficiencyOfTeacher'
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
            document.location.href='/';
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
      if(!res.data.success){
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
