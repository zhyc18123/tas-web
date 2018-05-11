<template>
  <div class="user-add">
    <v-character-title icon="icon-yonghuguanli" name="用户管理">
    </v-character-title>
    <el-form :rules="rules" ref="form" :model="form" label-width="100px">
      <el-form-item prop="username" required label="登陆账号：">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="name" required label="姓名：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="password" class="orign-password" label="初始密码：">
        <el-input v-model="password"></el-input>
      </el-form-item>
      <el-form-item prop="level" required label="老师级别：">
        <el-radio-group v-model="form.level">
          <el-radio v-for="(item,index) in levels" :key="index" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="optRoleId" required label="角色：">
        <el-radio-group v-model="form.optRoleId">
          <el-radio v-for="(item,index) in roleList" :key="index" :label="item.optRoleId">{{item.roleName}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="phoneNo" required label="电话号码：">
        <el-input v-model="form.phoneNo"></el-input>
      </el-form-item>
      <el-form-item prop="idNo" required label="身份证：">
        <el-input v-model="form.idNo"></el-input>
      </el-form-item>
      <el-form-item prop="teachGradeIds" required label="任教年级：">
        <el-select v-model="form.teachGradeIds" multiple placeholder="">
          <el-option v-for="(item,i) in grades" class="small-form-item" :key="i" :label="item.gradeName" :value="item.gradeId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="teachSubjectIds" required label="任教科目：">
        <el-select v-model="form.teachSubjectIds" multiple placeholder="">
          <el-option v-for="(item,i) in subjects" :key="i" :label="item.subjectName" :value="item.subjectId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="small-form-item" prop="" required label="任职性质：">
        <el-select v-model="form.jobNature" placeholder="">
          <el-option v-for="item in jobNatures" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="small-form-item" prop="" required label="在职状态：">
        <el-select v-model="form.jobStatus" placeholder="">
          <el-option v-for="item in jobStatuses" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="small-form-item" prop="" required label="账号状态：">
        <el-select v-model="form.status" placeholder="">
          <el-option v-for="item in userStatuses" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
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
import md5 from 'js-md5'

export default {
  components: {
    VCharacterTitle
  },
  created() {
    this.getOrganizationBaseConfig()
    this.getCharacterList()
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
        roleName: "",
        optRoleId: "",
        password: "",
        oldPassword: "",
        phoneNo: "",
        idNo: "",
        teachGradeIds: [],
        teachSubjectIds: [],
        status: 1,
        jobStatus: 1,
        jobNature: 0,
        level: 0,
      },
      levels: [{
        label: '初级教研员',
        value: 0
      }, {
        label: '中级教研员',
        value: 1
      }, {
        label: '高级教研员',
        value: 2
      }, {
        label: '资深教研员',
        value: 3
      },],
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

<style lang="less" scope>
.user-add {
  .el-form {
    padding: 5px 0px;
    text-align: center;

    .el-form-item {
      text-align: left;
      padding-left: 310px;
      min-height: 60px;
      line-height: 60px;
      border-bottom: 1px dashed #dcf0f3;
      vertical-align: middle;
      margin-bottom: 0;
      .el-form-item__label {
        color: #333333;
        line-height: 62px;
      }
      .el-form-item__content {
        line-height: 60px;
        .el-form-item__error {
          top: 20px;
          left: 383px;
        }
      }
      .el-input {
        width: 374px;
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
        margin-left: 40px;
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
</style>

