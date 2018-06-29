<template>
  <div class="user-add">
    <line-head-form class="head" :title="title"/>
    <el-form :rules="rules" ref="form" :model="form" label-width="100px" class="add-form" v-if="!loginInfo.isSystem">
      <el-form-item prop="username">
        <div slot="label" class="tow-four"   >
            账<span>号：</span>
        </div>
        <el-input v-model="form.username" placeholder="请输入10字以内的用户姓名"></el-input>
      </el-form-item>
      <el-form-item  prop="account" class="orign-password" >
        <div slot="label" class="tow-four"  >
            手<span>机：</span>
        </div>
        <el-input v-model="form.account" placeholder="请输入登录手机号"></el-input>
      </el-form-item>
      <el-form-item class="orign-password" >
        <div slot="label" class="tow-four">
            密<span>码：</span>
        </div>
        <el-input v-model="password" type = "password" placeholder="请输入6-18位数字或字母为密码"></el-input>
      </el-form-item>
      <el-form-item  class="orign-password" >
        <div slot="label" class="tow-four">
           确认密码：
        </div>
        <el-input v-model="cPassword" type = "password"  placeholder="请重复确认密码"></el-input>
      </el-form-item>
       <el-form-item  >
        <div slot="label" class="tow-four">
           人员状态：
        </div>
        <el-radio-group v-model="form.workStatus">
          <el-radio v-for="(item,index) in workStatuss" :key="index" :label="item.value" >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item  >
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
        <el-radio-group v-model="form.type" @change="changeTypes()">
            <el-tooltip v-for="(item,index) in types" :key="index" class="item" effect="light" :content="item.content" placement="bottom" :open-delay="500">
                 <el-radio   :label="item.value">{{item.label}}</el-radio>
            </el-tooltip>
        </el-radio-group>
      </el-form-item>
      <div class="auth-role">
        <div class="sex t-flexs">
          <div slot="label" class="label">
            性别：
          </div>
          <el-radio-group v-model="form.sex" class="role-cont t-flex">
            <el-radio :label="0" >男</el-radio>
            <el-radio :label="1" >女</el-radio>
          </el-radio-group>
        </div>
        <div class="subject t-flexs" v-if="form.type!==3">
          <div slot="label" class="label">
            科目：
          </div>
          <el-checkbox-group v-model="form.checkedSubject" @change="handleCheckedSubjectChange()"  class="role-cont t-flex">
            <el-checkbox :label="item.id"  v-for="item in condition.subjectList" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="subject" v-if="form.checkedSubject.length>=1 && form.type!==3">
          <div slot="label" class="label">
            学段：
          </div>
          <div class="role-cont t-flex" >
              <ul >
                <li v-for="(gradesList,index) in gradesBySubject"  :key="index">
                  <h4>{{gradesList.subjectName}}</h4>
                  <div class="grade">
                    <el-checkbox label="" :key="0" v-model="gradesList.checkAll" :indeterminate="gradesList.isIndeterminate" @change="handleCheckAllChange(gradesList)">全部</el-checkbox>
                    <el-checkbox-group v-model="gradesList.baseSectionIds" @change="handleCheckedGraderChange(gradesList)"> 
          
                      <el-checkbox :label="item.id" v-for="item in gradesList.list" :key="item.id">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
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
        <el-checkbox-group v-model="authRoleIds">
          <el-checkbox v-for="(item,index) in roleList" :key="index" :label="item.id" >{{item.roleName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-button :disabled="addDisabled" @click="handleSave" class="btn-save" type="basis">保存</el-button>
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
        callback(new Error('请输入个人手机号'));
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('手机号码有误，请重填'));
      } else {
        callback();
      }
    };
    // const validateIdNo = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入个人身份证'));
    //   } else if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value))) {
    //     callback(new Error('身份证号码有误，请重填'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      addDisabled:false,
      title:'新增账号',
      loginInfo:storage.getCurrentUserInfo(),
      checkAll: true,
      roleList: [],
      password: '',
      cPassword:'',
      authRoleIds:[],
      grades: '',
      dataSubjects:'',
      form: {
        subcheckAll:false,
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
        workStatus:1,
        jobStatus: 1,
        type: 1,
      },
      gradesAllBySubject:[],
      subjectSectionList:[],
      gradesBySubject:[],
      isIndeterminate:true,
      types: [{
        label: '教师',
        value: 1,
        content:"教师权限：登录备课、授课"
      }, {
        label: '教研',
        value: 2,
        content:"教研权限：查看教研课程"
      }, {
        label: '教务',
        value: 3,
        content:"教备权限：查看班级管理"
      }],
      workStatuss:[{
        label: '在职',
        value: 0,
      }, {
        label: '离职',
        value: 1,
      }],
      jobStatuses: [{
        label: '全职',
        value: 0,
      }, {
        label: '兼职',
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
        account: [
          { validator: validatePhoneNo, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { max: 10, message: '输入超过最大限度10字', trigger: 'blur' },
        ],
      }
    }
  },
  created() {
    this.findSubjectsData({pageIndex: 1, pageSize: 1000000,})
    this.findAuthRoleList()
    if (this.$route.query.userId) {
      this.userId = this.$route.query.userId
      this.title = "编辑账号"
      this.getUserDetail()
    }
    if(this.form.checkedSubject.length!=0){
      this.findBaseSectionBySubject()
    }
  },
  computed:{
    ...mapState(['condition']),
  },
  methods: {
    ...mapActions(['findSubjectsData']),
    resetForm() {
      this.form = {
        subcheckAll:false,
        id: "",
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
        workStatus:1,
        jobStatus: 1,
        type: 1,
      }
    },
    changeTypes(){
      if(this.form.type==3){
        let param = []
        this.findBaseSectionBySubject(param)
      }
    },
    handleCheckedSubjectChange(val){
      if(this.form.checkedSubject.length!=0){
        this.findBaseSectionBySubject()
      }
    },
    // 全选
    handleCheckAllChange(row){
      let allList = []
      row.list.map((item)=>{
        allList.push(item.id)
      })
      row.baseSectionIds = row.checkAll ? allList : [];
      row.isIndeterminate = false
      // row.isIndeterminate = row.checkAll?true:false;
    },
    // 全选
    handleCheckedGraderChange(row){
        let checkedCount = row.baseSectionIds.length;
        row.checkAll = checkedCount === row.list.length;
        row.isIndeterminate = checkedCount > 0 && checkedCount < row.list.length;
    },
    findAuthRoleList() {
      io.post(io.findAuthRoleList,{},(data) => {
        this.roleList = data;
      })
    },
    // 通过科目查找年级
    findBaseSectionBySubject(subjectSectionList){
      let param = {
        subjectId:subjectSectionList||this.form.checkedSubject.join(',')
      }
      io.post(io.findBaseSectionBySubject,param,(ret)=>{
          if(!subjectSectionList){//只有在教务的时候才会传值(subjectSectionList=[])，以此来判断（教务显示全部，不传课程id时候返回的值为全部）
            ret.map(item=>{
              let baseSectionIds = []
              let nullData = 0
              item.checkAll = false
              item.isIndeterminate = true
              if(this.subjectSectionList.length>=1){
                this.subjectSectionList.map((ite)=>{
                  if(item.subjectId==ite.subjectId){
                    ite.sectionList.map(i=>{
                      baseSectionIds.push(i.sectionId)
                    })
                    item.baseSectionIds =JSON.parse(JSON.stringify(baseSectionIds)) 
                  }
                  if(ite.subjectId != item.subjectId){
                    nullData++
                    if(nullData===this.subjectSectionList.length){
                      item.baseSectionIds = []
                    }
                  }
                })
              }else{
                item.baseSectionIds = []
              }
            })
            this.gradesBySubject = ret
          }else{//教务的情况
            ret.map(item=>{
              let baseSectionIds = []
              item.list.map(ite=>{
                baseSectionIds.push(ite.id)
              })
              item.baseSectionIds = baseSectionIds
            })
            this.gradesAllBySubject = ret
          }
          console.log(this.gradesBySubject,this.gradesAllBySubject)
      })
    },
    getUserDetail() {
      io.post(io.authUserDetail, { id: this.userId }, (data) => {
        let checkedSubject = []
        data.subjectSectionList.map((item)=>{
            checkedSubject.push(item.subjectId)
        })
        this.form = {
          id: data.id,
          username:data.username,
          account:data.account,
          sex:data.sex,
          authRoleIds:[],
          password: data.password,
          cPassword: data.password,
          checkedSubject:checkedSubject,
          status: data.status,
          workStatus:data.workStatus,
          jobStatus: data.jobStatus,
          type: data.type,
        }
        this.password = '******'
        this.cPassword = '******'
        let authRoleIds = []
        data.authRoleList.map(item=>{
          authRoleIds.push(item.id)
        })
        this.authRoleIds = authRoleIds
        this.subjectSectionList = data.subjectSectionList
        this.findBaseSectionBySubject()
      })
    },
    handleSave() {
      let _this = this
            this.addDisabled=true
            setTimeout(()=>{
                this.addDisabled=false
            },2000)
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          let data = Object.assign({}, this.form)
          let authSubjectSectionList = []
          if(data.type==3){//教务
              this.gradesAllBySubject.map((val) => {
                authSubjectSectionList.push({subjectId:val.subjectId,baseSectionIds:val.baseSectionIds.join(',')})
              })
          }else{//教师、教研
              data.checkedSubject.map((j) => {
              this.gradesBySubject.map((val) => {
                if (j === val.subjectId) {
                  authSubjectSectionList.push({subjectId:val.subjectId,baseSectionIds:val.baseSectionIds.join(',')})
                }
              })
            })
          }
          data.authSubjectSectionList = authSubjectSectionList
          if(this.password ===""){
            this.$message("密码不能为空")
            return false
          }
          if(this.password.length<6 || this.password.length>18){
            this.$message("密码必须为6-18位的字母数字组合")
            return false
          }
          else if(!(/^[a-zA-Z0-9]{6,}$/.test(this.password)) && !this.userId){
            this.$message("密码必须为字母数字组合")
            return false
          }
          if(this.cPassword ===""){
            this.$message("再次输入密码不能为空")
            return false
          }else if(this.cPassword.length<6 ||  this.cPassword.length>18){
            this.$message("再次输入密码必须为6-18位的字母数字组合")
            return false
          }
          if(this.cPassword !==this.password){
            this.$message("两次输入的密码不一致，请重新输入")
            return false
          }
          if(this.cPassword !==this.password){
            this.$message("两次输入的密码不一致，请重新输入")
            return false
          }
          if (this.password !== '******') {
            data.password = md5(this.password)
          }
          if(this.cPassword !== '******'){
            data.cPassword = md5(this.cPassword)
          }
          if(this.form.checkedSubject.length<=0 && this.form.type!=3){
            this.$message("请选择科目")
            return false
          }
          // let isexist = false
          for(var i = 0;i < data.authSubjectSectionList.length;i++){
            if(data.authSubjectSectionList[i].baseSectionIds ===''){
              this.$message("你有科目未选年级,请选择")
              // isexist = true
              return 
            }
          }
          // if(isexist){
          //   this.$message("你有科目未选年级,请选择")
          //   return false
          // }
          // console.log(isexist)
          if(this.authRoleIds.length<=0){
            this.$message("请选择账号角色")
            return false
          }
          if(this.form.workStatus===''){
            this.$message("请选择人员状态")
            return false
          }
          data.authRoleIds = this.authRoleIds
          if(!this.userId){
            io.post(io.addAuthUser,{authUserAddJsonStr:JSON.stringify(data)}, (data) => {
              this.$message({
                type:"success",
                message:'保存成功！'})
              this.$router.push('/main/system/userList/list')
              this.resetForm()
            })
          }else{
             io.post(io.updateAuthUser,{authUserUpdateJsonStr:JSON.stringify(data)}, (data) => {
              this.$message({
                type:"success",
                message:'保存成功！'})
              this.$router.push('/main/system/userList/list')
              this.resetForm()
            })
          }
         
        } else {
            // if (value === '') {
            //   callback(new Error('请输入个人电话'));
            // } else if (!(/^1[34578]\d{9}$/.test(value))) {
            //   callback(new Error('手机号码有误，请重填'));
            // } else {
            //   callback();
            // }
          if(this.form.username===""){
            this.$message("请输入账号")
            return false
          }
          if(this.form.username.length>40){
            this.$message("用户姓名超过字数限制")
            return false
          }
          if(this.form.account===""){
            this.$message("请输入个人手机号")
            return false
          }
          if(!(/^1[34578]\d{9}$/.test(this.form.account))){
            this.$message("手机号码有误，请重填")
            return false
          }
          this.$message('还有必填项未填，请先填写')
          return false;
        }
      });
    },
  },
  watch:{
    'form.checkedSubject':function(val){
      console.log(val)
    },
    'condition.subjectList':function(val){
      
    },
    'form.type':function(val){
      console.log()
      this.changeTypes()
    }
  }
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

