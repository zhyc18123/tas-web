<template>
  <div class="user-add">
    <!-- 系统管理员身份的新增 -->
    <el-form  class="add-form" label-width="100px" status-icon :rules="rules" ref="form" :model="form">
      <el-form-item prop="username"  class="orign-password">
        <div slot="label" class="tow-four" >
            姓<span>名：</span>
        </div>
        <el-input v-model="form.username" placeholder="请输入用户姓名" ></el-input>
      </el-form-item>
      <el-form-item  prop="account"  class="orign-password">
        <div slot="label" class="tow-four" >
            手<span>机：</span>
        </div>
        <el-input v-model="form.account" placeholder="请输入手机号，该号用于登录系统 " ></el-input>
      </el-form-item>
      <el-form-item prop="password" class="orign-password"  >
        <div slot="label" class="tow-four">
            密<span>码：</span>
        </div>
        <el-input v-model="password" type = "password" placeholder="请输入6-18位数字或字母为密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="cPassword" class="orign-password" >
        <div slot="label" class="tow-four">
           确认密码：
        </div>
        <el-input v-model="cPassword"  type = "password" placeholder="请再次输入密码" auto-complete="off"></el-input>
      </el-form-item>
       <el-form-item prop="authRoleId"  >
        <div slot="label" class="tow-four">
           用户角色：
        </div>
        <el-radio-group v-model="form.authRoleId" @change="changeAuthRole">
          <el-radio v-for="(item,index) in roleList" v-if='item.systemType===0' :key="index" :label="item.id" >{{item.roleName}}</el-radio>
        </el-radio-group>
        </el-form-item>
        <el-form-item  v-if="roleType == 2"  class="orign-password">
            <div slot="label" class="tow-four">
            所属机构：
            </div>
            <el-select v-model="form.authOrganizationId" placeholder="所属机构">
                <el-option v-for="(organ,index) in system.organList.list" :label="organ.orgName" :value="organ.id" :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item  v-if="roleType == 3"  class="orign-password">
            <div slot="label" class="tow-four">
            所属个人：
            </div>
            <el-select v-model="form.organPersonId" placeholder="所属个人">
                <el-option v-for="(organ,index) in system.organPerson.list" :label="organ.perName" :value="organ.id" :key="index">{{organ.perName}}</el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="角色权限叠加:" >
          <el-checkbox-group v-model="form.addAuthRoleIds">
              <el-checkbox v-if="item.systemType===2" v-for="item in roleList" :label="item.id" :key="item.id">{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
       <div>
            <el-button :disabled="addDisabled" @click="handleSave" class="btn-save" type="basis">保存</el-button>
            <el-button @click="$router.go(-1);" class="btn-cancel" type="basis">取消</el-button>
       </div>
    </el-form>
  </div>
</template>

<script>
import io from '../../../lib/io'
import storage from '../../../lib/storage'
import md5 from 'js-md5'
import { mapState, mapActions } from 'vuex'
export default {
    prop:[],
    components: {
    },

    data() {
        const validatePhoneNo = (rule, value, callback) => {
            console.log(value)
            if (value === '') {
                callback(new Error('请输入手机号，该号用于登录系统'));
            } else if (!(/^1[34578]\d{9}$/.test(value))) {
                callback(new Error('手机号码有误，请重填'));
            } else {
                callback();
            }
        };
        // const validatePassword = (rule, value, callback) =>{
        //     console.log(value)
        //     if (value === '') {
        //         callback(new Error('请输入密码'));
        //     } else if (!(/^[a-zA-Z0-9]{6,}$/.test(value))) {
        //         callback(new Error('密码必须为6-18位的字母数字组合'));
        //     } else {
        //         callback();
        //     }
        // };
        // const validateCpassword = (rule, value, callback) =>{
        //     console.log(value,this.password)
        //     if (value === '') {
        //         callback(new Error('请再次输入密码'));
        //     } else if (!(/^[a-zA-Z0-9]{6,}$/.test(value))) {
        //         callback(new Error('密码必须为6-18位的字母数字组合'));
        //     } else if(value !== this.password){
        //         callback(new Error('两次输入密码不一致!'));
        //     } else {
        //         callback();
        //     }
        // };

    return {
        addDisabled:false,
        loginInfo:storage.getCurrentUserInfo(),
        roleList:[],
        userId:'',
        password:"",
        cPassword:'',
        oldPassword:'',
        roleType:'',
        
        form: {
          authRoleId:'',
          account:'',
          password:'',
          cPassword:'',
          username:'',
          organPersonId:'',
          authOrganizationId:'',
          addAuthRoleIds:[],
        },
      rules: {
        account: [
          { validator: validatePhoneNo, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
           { max:10, message: '输入超过最大限度10字', trigger: 'blur' },
        ],
        authRoleId:[
          {required: true, message: "请选择角色", trigger: 'change' }
        ],
      }
    }
  },
    created() {
        this.findAuthRoleList()
        this.findAuthOrgan({pageIndex:1,pageSize:1000000})
        this.findAuthOrganPerson({pageIndex:1,pageSize:1000000})
        if (this.$route.query.userId) {
            this.userId = this.$route.query.userId

            this.authUserDetail()
        }
    },
    computed:{
        ...mapState(['system']),
    },
    methods: {
        ...mapActions(['findAuthOrgan','findAuthOrganPerson']),
        findAuthRoleList() {
          io.post(io.findAuthRoleList,{},(data) => {
              console.log(data)
              this.roleList = data;
              if(!this.userId){
                  this.form.authRoleId = data[0].id;
                  console.log(data)
                  this.roleType = data[0].roleType;
              }
          })
        },
        changeAuthRole(val){
          console.log(val,this.roleList)
          this.roleList.map((item)=>{
            if(val==item.id){
              this.roleType = item.roleType
            }
          })
        },
        // 新增
        handleSave() {
        let _this = this
        console.log(this.form)
            this.addDisabled=true
            setTimeout(()=>{
                this.addDisabled=false
            },2000)
        this.$refs.form.validate((valid) => {
            console.log(this.form,valid)
            if (valid) {
                let data = Object.assign({}, {...this.form})
                console.log(_this.form.authRoleId)
                if(_this.roleType == 3){
                    data.authOrganizationId = _this.form.organPersonId
                }
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
                console.log(data)
                if(this.roleType !=1 && data.authOrganizationId ==''){
                  this.$message("请选择机构")
                  return false
                }
                if(this.password !== '******' && this.cPassword !== '******'){
                    data.password = md5(this.password)
                    data.cPassword = md5(this.cPassword)
                }else{
                    data.password = this.oldPassword
                    data.cPassword = this.oldPassword
                }
                data.addAuthRoleIds = this.form.addAuthRoleIds.join(',')
                if(!this.userId){
                    io.post(io.addSysAuthUser, data, (data) => {
                        this.$message({
                            type:'success',
                            message:'保存成功！'
                        })
                        this.$router.push('/main/system/userList/list')
                    })
                }else if(this.userId){
                    data.id = this.userId
                    io.post(io.updateSysAuthUser,data,(ret)=>{
                        this.$message({
                            type:'success',
                            message:'保存成功！'
                        })
                        this.$router.push('/main/system/userList/list')
                    })
                }
            } else {
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
        //修改的初始化数据
        authUserDetail(){
            let param = {
                id:this.userId
            }
            io.post(io.authUserDetail,param,(ret)=>{
                console.log(ret)
                let authRoleId = []
                let addAuthRoleIds = []
                ret.authRoleList.map(item=>{
                  if(item.systemType===0){
                    authRoleId.push(item)
                  }else if(item.systemType===2){
                    addAuthRoleIds.push(item.id)
                  }
                })
                this.form = {
                    authRoleId:authRoleId[0].id,
                    account:ret.account,
                    password:ret.password,
                    cPassword:ret.password,
                    username:ret.username,
                    organPersonId:authRoleId[0].roleType===3?ret.authOrganizationId:'',
                    authOrganizationId:authRoleId[0].roleType===2?ret.authOrganizationId:'',
                    addAuthRoleIds:addAuthRoleIds
                }
                this.password = '******'
                this.cPassword = '******'
                this.oldPassword = ret.password.toString()
                this.roleList.map((item)=>{
                  if(authRoleId[0].id==item.id){
                    this.roleType = item.roleType
                  }
                })

            })
        }
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

