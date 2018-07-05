<template>
  <el-row class="organization-detail">
<line-head-form class="head" :title="title" :type="types"/>
<el-form class="o-form" label-position="right" label-width="130px" :model="form" :rules="rules" ref="form"> 
    <el-form-item label="真实姓名:" prop="perName" >
        <el-input v-model="form.perName"  placeholder="请输入真实姓名"></el-input>
    </el-form-item>
    <el-form-item  prop="perPhone"  label="手机:">
        <!-- <div slot="label" class="tow-four">
            手<span>机：</span>
        </div> -->
        <el-input v-model="form.perPhone" placeholder="请输入登录手机号"></el-input>
    </el-form-item>
    <el-form-item label="合作状态:">
        <el-radio :label="0" v-model="form.status">试用期</el-radio>
        <el-radio :label="1" v-model="form.status">合约期</el-radio>
        <el-radio :label="2" v-model="form.status">终止</el-radio>
    </el-form-item>
    <el-form-item label="账号有效期:">
        <el-date-picker
        v-model="userTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
        </el-date-picker>
    </el-form-item>
    <el-form-item label="可免费新增账号:" prop="freeAccount">
        <el-col :span="6">
        <el-input v-model="form.freeAccount" ></el-input>
        </el-col> <em class="free-num">个</em> 
    </el-form-item>
    <el-form-item label="合作类型:" class="required">
        <el-tooltip class="item" effect="light" content="指机构本身拥有业务 课程" placement="bottom-start">
            <!-- <el-button class="personal"> -->
                <el-radio :label="0" v-model="form.cooperType">
                    个性化
                </el-radio>
            <!-- </el-button> -->
        </el-tooltip>
        <el-radio :label="1" v-model="form.cooperType">标准</el-radio>
    </el-form-item>
    <el-form-item label="角色权限:" prop="roles">
        <el-checkbox-group v-model="form.roles">
            <el-checkbox v-for="item in roleList" :label="item.id" :key="item.id">{{item.roleName}}</el-checkbox>
        </el-checkbox-group>
    </el-form-item>
    <div class="opt-btn">
        <el-button :disabled="addDisabled" class="height-btn" @click="saveForm">确定</el-button>
        <el-button class="light-btn" @click="$router.go(-1)" >取消</el-button>
    </div>
    
</el-form>
  </el-row>
</template>
<script>
import LineHeadForm from '../../common/LineHeadForm'
import FileUpload from '../../common/FileUpload'
import io from '../../../lib/io'
import util from "../../../lib/util"
export default {
    components: {
        LineHeadForm,
        FileUpload
    },
    data () {
        const validatePerName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入您的真实姓名'));
            } else if (value.length>40) {
                callback(new Error('输入超过最大限度40字'));
            } else {
                callback();
            }
        };
        const validatePhoneNo = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入个人手机号'));
            } else if (!(/^1[34578]\d{9}$/.test(value))) {
                callback(new Error('手机号码有误，请重填'));
            } else {
                callback();
            }
        };
        const validateFreeAccount = (rule, value, callback)=>{
             if (value === '') {
                callback(new Error('请输入免费添加账号数'));
            } else if (!(/^[0-9]*$/.test(value))) {
                callback(new Error('请输入数字'));
            } else {
                callback();
            }
        };
        return {
            addDisabled:false,
            title:"新建个人合作",
            types:'add',
            type:this.$route.params.type,
            id:this.$route.query.id,
            userTime:[],
            roleList:[],
            form:{
                cooperType:'',
                perName:'',
                perPhone:'',
                status:'',
                effictTime:'',
                freeAccount:'',
                userTimeStart:'',
                userTimeEnd:'',
                roles:[],
            },
            rules:{
                perName:[
                    {validator: validatePerName,trigger:'blur'}
                ],
                perPhone:[
                    {validator: validatePhoneNo, trigger: 'blur'}
                ],
                freeAccount:[
                    {validator: validateFreeAccount, trigger: 'blur'}
                ],
                roles:[
                    {required: true, message: '请选择角色权限', trigger: 'change',}
                ]
            }
        }
    },
    created(){
        this.resetForm()
        this.authRoleListForOrgan()
        if(this.type && this.id){
            this.title="编辑个人合作"
            this.types = 'edit'
            this.getAuthOrganDetail()
        }
    },
    methods:{
        resetForm(){
            this.form={
                perName:'',
                perPhone:'',
                status:'',
                effictTime:'',
                freeAccount:'',
                userTimeStart:'',
                userTimeEnd:'',
                cooperType:'',
                roles:[],
            }
            this.userTime = []
        },
                // 角色接口
        authRoleListForOrgan(){
            let param = {}
            io.post(io.authRoleListForOrgan,param,(ret)=>{
                this.roleList = ret
                console.log(ret)
            })
        },
        getAuthOrganDetail(){
            let param = {
                id : this.id
            }
            io.post(io.getAuthOrganDetail,param,(ret)=>{
                this.form = ret
                let userTime = []
                userTime.push(ret.userTimeStart)
                userTime.push(ret.userTimeEnd)
                this.userTime = userTime
                console.log(ret)
            })
        },
        saveForm(){
            this.addDisabled=true
            setTimeout(()=>{
                this.addDisabled=false
            },2000)
            this.$refs.form.validate((valid) => {
                if(valid){
                    let param = {...this.form}
                    param.roles = param.roles.join(',')
                    if(this.userTime){
                        param.userTimeStart = util.formatDate(this.userTime[0])+' 00:00:00'
                        param.userTimeEnd = util.formatDate(this.userTime[1])+' 23:59:59'
                    }else{
                         param.userTimeStart = null
                         param.userTimeEnd = null
                    }
                    if(param.status===''){
                        this.$message("请选择合作状态")
                        return false
                    }
                    if(!param.userTimeStart || !param.userTimeStart) {
                        this.$message("请选择账号有效期")
                        return false
                    }
                    if(param.cooperType===''){
                        this.$message("请选择合作类型")
                        return false
                    }
                    if(!(this.type && this.id)){
                        io.post(io.addAuthOrganPerson,param,(ret)=>{
                            this.$message({
                                type:'success',
                                message:'添加成功'
                            })
                            this.$router.push('/main/system/personal/list')
                            console.log(ret)
                        })
                    }else{
                        param.id = this.id
                        io.post(io.updateAuthOrganPerson,param,(ret)=>{
                            this.$message({
                                type:'success',
                                message:'修改成功'
                            })
                            this.$router.push('/main/system/personal/list')
                        })
                    }
                }else{
                    this.$message('还有必填项未填，请先填写')
                    return
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.organization-detail
    .o-form
        padding 0 200px
        margin auto
        margin-top 50px
    .head
      margin-top 10px
    .free-num
        margin-left 10px
        font-style normal
    .personal
        border 0
        // color #606266
        &:hover
            background transparent
        .el-radio
            color:#666
            font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";
    .opt-btn
        text-align center
        margin-top 37px
        padding-bottom 49px
        .el-button+.el-button{
            margin-left 26px
        }
        
</style>
<style lang="stylus">
   .organization-detail
        .o-form
            .el-form-item__label:before
                content: "*";
                color: #f56c6c;
                margin-right: 4px;
            
  


</style>


