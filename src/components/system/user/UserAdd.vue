<template>
  <div class="user-add">
    <line-head-form class="head" title="新增账号"/>
    <el-form :rules="rules" ref="form" :model="form" label-width="100px" class="add-form" v-if="!loginInfo.isSystem">
      <el-form-item prop="username" required >
        <div slot="label" class="tow-four">
            账<span>号：</span>
        </div>
        <el-input v-model="form.username" placeholder="请输入20字以内的用户姓名"></el-input>
      </el-form-item>
      <el-form-item  prop="phoneNo" required >
        <div slot="label" class="tow-four">
            手<span>机：</span>
        </div>
        <el-input v-model="form.account" placeholder="请输入登录手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password" class="orign-password" >
        <div slot="label" class="tow-four">
            密<span>码：</span>
        </div>
        <el-input v-model="form.password" placeholder="请输入6-18位数字或字母为密码"></el-input>
      </el-form-item>
      <el-form-item prop="cpassword" class="orign-password" >
        <div slot="label" class="tow-four">
           确认密码：
        </div>
        <el-input v-model="form.cpassword"  placeholder="请重复确认密码"></el-input>
      </el-form-item>
       <el-form-item prop="jobStatuses" required >
        <div slot="label" class="tow-four">
           任职状态：
        </div>
        <el-radio-group v-model="form.jobStatus">
          <el-radio v-for="(item,index) in jobStatuses" :key="index" :label="item.value" >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="type" required >
        <div slot="label" class="tow-four">
           人员类型：
        </div>
        <el-radio-group v-model="form.type">
            <el-tooltip v-for="(item,index) in types" :key="index" class="item" effect="dark" :content="item.content" placement="bottom" :open-delay="500">
                 <el-radio   :label="item.value">{{item.label}}</el-radio>
            </el-tooltip>
        </el-radio-group>
      </el-form-item>
      <div class="auth-role">
        <div class="sex">
          <div slot="label" class="label">
            性别：
          </div>
          <el-radio-group v-model="form.sex" class="role-cont">
            <el-radio :label="0" >男</el-radio>
            <el-radio :label="1" >女</el-radio>
          </el-radio-group>
        </div>
        <div class="subject">
          <div slot="label" class="label">
            科目：
          </div>
          <el-checkbox-group v-model="form.checkedSubject" @change="handleCheckedSubjectChange" class="role-cont">
            <el-checkbox :label="item.id"  v-for="item in condition.subjectList" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="subject">
          <div slot="label" class="label">
            学段：
          </div>
          <div class="role-cont">
              <ul>
                <li v-for="item in condition.gradeObj"  :key="item.id">
                  <h4>数学</h4>
                  <div class="grade">
                      <el-checkbox label="" :key="0">全部</el-checkbox>
                      <el-checkbox :label="item.id" v-for="item in condition.gradeObj" :key="item.id"></el-checkbox>
                  </div>
                </li>
              </ul>
          </div>
        </div>
      </div>
       <el-form-item prop="jobStatuses" >
        <div slot="label" class="tow-four">
           账号角色：
        </div>
        <el-radio-group v-model="form.authRoleIds">
          <el-radio v-for="(item,index) in roleList" :key="index" :label="item.id" >{{item.roleName}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-button @click="handleSave" class="btn-save" type="basis">保存</el-button>
      <el-button @click="$router.go(-1);resetForm" class="btn-cancel" type="basis">取消</el-button>
    </el-form>
    <!-- 系统管理员身份的新增 -->
    <sys-user-add v-if="loginInfo.isSystem"></sys-user-add>
  </div>
</template>

<script>
import io from '../../../lib/io'
import storage from '../../../lib/storage'
// import VCharacterTitle from '../../common/CharacterTitle.vue'
import LineHeadForm from '../../common/LineHeadForm'
import SysUserAdd from "./SysUserAdd"
import md5 from 'js-md5'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    LineHeadForm,
    SysUserAdd,
  },
  data() {
    const validatePhoneNo = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入个人电话'));
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('手机号码有误，请重填'));
      } else {
        callback();
      }
    };
    const validateIdNo = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入个人身份证'));
      } else if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value))) {
        callback(new Error('身份证号码有误，请重填'));
      } else {
        callback();
      }
    };
    return {
      loginInfo:storage.getCurrentUserInfo(),
      checkAll: true,
      roleList: [],
      password: '',
      grades: '',
      dataSubjects:'',
      form: {
        userId: "",
        username:'',
        account: "",
        name: "",
        sex:0,
        roleName: "",
        authRoleIds:[],
        password: "",
        cPassword: "",
        checkedSubject:[],
        status: 1,
        jobStatus: 1,
        type: 0,
      },
      types: [{
        label: '教师',
        value: 0,
        content:"教师权限：登录备课、授课"
      }, {
        label: '教研',
        value: 1,
        content:"教研权限：查看教研课程"
      }, {
        label: '教务',
        value: 2,
        content:"教备权限：查看班级管理"
      }],
      jobStatuses: [{
        label: '离职',
        value: 0,
      }, {
        label: '在职',
        value: 1,
      },],
      keyword: '',
      rules: {
        teachGradeIds: [
          { type: 'array', required: true, message: '请至少选择一个任教年级', trigger: 'change' }
        ],
        teachSubjectIds: [
          { type: 'array', required: true, message: '请至少选择一个任教科目', trigger: 'change' }
        ],
        phoneNo: [
          { validator: validatePhoneNo, trigger: 'blur' }
        ],
        idNo: [
          { validator: validateIdNo, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        name: [
          { required: true, min: 2, max: 8, message: '长度在 2 到 8个字符', trigger: 'blur' },
        ],
        password:[
          {required: true,message: '请输入密码',trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.findSubjectsData({pageIndex: 1, pageSize: 1000000,})
    this.findBaseSectionBySubject()
    this.findAuthRoleList()
    if (this.$route.query.userId) {
      this.userId = this.$route.query.userId
      this.getUserDetail()
    }
  },
  computed:{
    ...mapState(['condition']),
  },
  methods: {
    ...mapActions(['findSubjectsData']),
    resetForm() {
      this.form = {
        userId: "",
        username: "",
        name: "",
        roleName: "",
        optRoleId: "",
        password: "",
        phoneNo: "",
        idNo: "",
        teachGradeIds: [],
        teachSubjectIds: [],
        status: 1,
        jobStatus: 1,
        jobNature: '0',
        level: '',
      }
    },
    handleCheckedSubjectChange(val){
      this.dataSubjects = val.join(',')
      this.findBaseSectionBySubject()
    },
    findAuthRoleList() {
      io.post(io.findAuthRoleList,{},(data) => {
        console.log(data)
        this.roleList = data;
        // if(!this.userId){
        // this.form.optRoleId=data.list[0].optRoleId;
        // }
      })
    },
    findBaseSectionBySubject(){
      let param = {
        subjectId:this.form.checkedSubject.join(',')
      }
      io.post(io.findBaseSectionBySubject,param,(ret)=>{
        console.log(ret)
      })
    },
    getUserDetail() {
      io.post(io.userDetail, { userId: this.userId }, (data) => {
        data.teachGradeIds = data.teachGradeIds === null || !data.teachGradeIds ? [] : data.teachGradeIds.split(',')
        data.teachSubjectIds = data.teachSubjectIds === null || !data.teachSubjectIds ? [] : data.teachSubjectIds.split(',')
        data.status = parseInt(data.status)
        data.jobStatus = parseInt(data.jobStatus)
        data.jobNature = parseInt(data.jobNature)
        data.level = parseInt(data.level)
        data.optRoleId = data.optRoleId
        this.password = '******'
        this.oldPassword = data.password
        this.form = data;
      })
    },
    handleSave() {
      let _this = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = Object.assign({}, this.form)
          data.teachSubjectNames = []
          data.teachSubjectIds.map((j) => {
            this.subjects.map((val) => {
              if (j === val.subjectId) {
                data.teachSubjectNames.push(val.subjectName)
              }
            })
          })
          data.teachGradeIds = data.teachGradeIds.join(',')
          data.teachSubjectIds = data.teachSubjectIds.join(',')
          data.teachSubjectNames = data.teachSubjectNames.join(',')
          if(!_this.password){
            this.$message('初始密码不可以为空！');
            return;
          }
          if (_this.password !== '******') {
            data.password = md5(this.password)
          }
          io.post(io.saveOrUpdateUser, data, (data) => {
            this.$message('保存成功！')
            console.log(data)
            try{
            if (data.userId === JSON.parse(sessionStorage.getItem('currentUserInfo'))&&data.userId === JSON.parse(sessionStorage.getItem('currentUserInfo')).userId) {
              sessionStorage.setItem('currentUserInfo', JSON.stringify(data))
            };
}catch(e){
  console.log(e)
}
            console.log("xx")
            this.$store.dispatch('hasLogin')
            this.$router.push('/main/system/userList/list')
            this.resetForm()
          })
        } else {
          return false;
        }
      });
    },
  },
}
</script>

<style lang="less" scoped>
.user-add {
  .head{
    margin-top:10px;
    margin-bottom: 30px;
  }
  .el-form {
    padding: 5px 0px;
    text-align: center;
    width:68%;
    min-width:770px;
    margin:0 auto;
    .auth-role{
      padding:40px 20px 20px 100px;
      border: 1px solid #bfebf3;
      border-radius:4px;
      .sex,.subject{
        display:flex;
        margin-bottom:38px;
        .label{
          width:auto;
          padding-right:20px;
        }
        .role-cont{
          flex:1;
          text-align:left;
          .el-checkbox{
            margin-right:30px;
            margin-bottom: 10px;
          }
          ul{
            li{
              margin-bottom:20px;
              h4{
                font-size:14px;
                color:#333;
                height:40px;
                background:#cceff6;
                font-weight: 500;
                padding-left:24px;
                line-height:40px;
                margin:0;
              }
              .grade{
                background:#f8f8f8;
                padding:28px 24px;
              }
            }
          }

        }
      }
    }
    .el-form-item {
      text-align: left;
      min-height: 60px;
      line-height: 60px;
      vertical-align: middle;
      margin-bottom: 0;
      .tow-four{
        display:inline-block;
      }
      
      // .el-form-item__label {
      //   color: #333333;
      //   line-height: 62px;
      // }
      // .el-form-item__content {
      //   line-height: 60px;
      //   .el-form-item__error {
      //     top: 20px;
      //     left: 383px;
      //   }
      // }
      .el-input { 
        color: #666;
        font-size: 12px;
        .el-input__inner {
          color: #666;
          font-size: 12px;
        }
      }
      .el-radio {
        margin-right: 40px;
        margin-left: 0;
        margin: 5px 40px 5px 0;
      }
      .el-checkbox+.el-checkbox {
        margin-right: 40px;
      }
      .el-radio__label {
        color: #666;
        font-size: 12px;
      }
      .el-checkbox__label {
        color: #666;
        font-size: 12px;
      }
    }
    .small-form-item {
      .el-input {
        width: 174px;
      }
    }
    .el-button {
      margin-top: 37px;
      margin-bottom: 49px
    }
  }
  .f-db {
    display: block;
  }
  .btn-save,
  .btn-cancel {
    padding: 10px 33px;
    font-size: 16px;
  }
  .btn-cancel {
    margin-left: 26px;
    color: #fff;
    background-color: #0acabf;
    border-color: #0acabf;
  }
  .btn-cancel:hover {
    color: #fff;
    background-color: #13dcd1;
    border-color: #13dcd1;
  }
}
</style>
<style lang="less">

.orign-password{
  label:before{
  content: "*";
    color: #ff4949;
    margin-right: 4px;
  }
}
.user-add{
  .auth-role{
     .el-checkbox+.el-checkbox {
        margin-left: 0px;
      }
  }
}
</style>

