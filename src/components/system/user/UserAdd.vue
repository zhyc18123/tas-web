<template>
  <div class="user-add">
    <line-head-form class="head" title="新增账号"/>
    <el-form :rules="rules" ref="form" :model="form" label-width="100px" class="add-form">
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
        <el-input v-model="form.phoneNo" placeholder="请输入登录手机号"></el-input>
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
      <el-form-item prop="level" required >
        <div slot="label" class="tow-four">
           人员类型：
        </div>
        <el-radio-group v-model="form.level">
          <el-radio v-for="(item,index) in levels" :key="index" :label="item.value">{{item.label}}</el-radio>
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
            <el-checkbox :label="0" :key="0">语文</el-checkbox>
            <el-checkbox :label="0" :key="0">语文</el-checkbox>
            <el-checkbox :label="0" :key="0">语文</el-checkbox>
            <el-checkbox :label="0" :key="0">语文</el-checkbox>
            <el-checkbox :label="0" :key="0">语文</el-checkbox>
            <el-checkbox :label="0" :key="0">语文</el-checkbox>
            <el-checkbox :label="0" :key="0">语文</el-checkbox>
            <el-checkbox :label="0" :key="0">语文</el-checkbox>
            <el-checkbox :label="0" :key="0">语文</el-checkbox>
            <el-checkbox :label="0" :key="0">语文</el-checkbox>
            <el-checkbox :label="0" :key="0">语文</el-checkbox>
            <el-checkbox :label="0" :key="0">语文</el-checkbox>
            <el-checkbox :label="0" :key="0">语文</el-checkbox>
            <el-checkbox :label="0" :key="0">语文</el-checkbox>
            <el-checkbox :label="0" :key="0">语文</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="subject">
          <div slot="label" class="label">
            学段：
          </div>
          <div class="role-cont">
              <ul>
                <li>
                  <h4>数学</h4>
                  <div class="grade">
                      <el-checkbox label="" :key="0">全部</el-checkbox>
                      <el-checkbox :label="0">语文</el-checkbox>
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
        <el-radio-group v-model="form.optRoleId">
          <el-radio v-for="(item,index) in levels" :key="index" :label="item.value" >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-button @click="handleSave" class="btn-save" type="basis">保存</el-button>
      <el-button @click="$router.go(-1);resetForm" class="btn-cancel" type="basis">取消</el-button>
    </el-form>
  </div>
</template>

<script>
import io from '../../../lib/io'
import storage from '../../../lib/storage'
import VCharacterTitle from '../../common/CharacterTitle.vue'
import LineHeadForm from '../../common/LineHeadForm'
import md5 from 'js-md5'

export default {
  components: {
    VCharacterTitle,
    LineHeadForm
  },
  created() {
    // this.getOrganizationBaseConfig()
    // this.getCharacterList()
    if (this.$route.query.userId) {
      this.userId = this.$route.query.userId
      this.getUserDetail()
    }
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
    // const validatePassword = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'));
    //   } else if (!(/^1[34578]\d{9}$/.test(value))) {
    //     callback(new Error('手机号码有误，请重填'));
    //   } else {
    //     callback();
    //   }
    // };
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
      checkAll: true,
      roleList: [],
      password: '',
      grades: '',
      subjects: '',
      form: {
        userId: "",
        username: "",
        name: "",
        sex:0,
        roleName: "",
        optRoleId: 1,
        password: "",
        oldPassword: "",
        phoneNo: "",
        idNo: "",
        checkedSubject:[],
        teachGradeIds: [],
        teachSubjectIds: [],
        status: 1,
        jobStatus: 1,
        jobNature: 0,
        level: 0,
      },
      levels: [{
        label: '教师',
        value: 0
      }, {
        label: '教研',
        value: 1
      }, {
        label: '教务',
        value: 2
      }],
      jobStatuses: [{
        label: '离职',
        value: 0,
      }, {
        label: '在职',
        value: 1,
      },],
      jobNatures: [{
        label: '普通',
        value: 0,
      }, {
        label: '指导',
        value: 1,
      },],
      userStatuses: [{
        label: '禁用',
        value: 0,
      }, {
        label: '正常',
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
  methods: {
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
    handleCheckedSubjectChange(){

    },
    getCharacterList() {
      io.post(io.userRoleList, {pageSize:1000000, userId: this.$store.state.global.loginInfo.userId }, (data) => {
        this.roleList = data.list;
        if(!this.userId){
        this.form.optRoleId=data.list[0].optRoleId;
        }
      })
    },
    getOrganizationBaseConfig() {
      io.post(io.organizationBaseConfig, {}, (data) => {
        this.grades = data.grades;
        this.subjects = data.subjects;
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

