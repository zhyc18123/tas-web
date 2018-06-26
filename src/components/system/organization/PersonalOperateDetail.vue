<template>
  <el-row class="organization-detail">
<line-head-form class="head" :title="title"/>
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
            <el-button class="personal">
                <el-radio :label="0" v-model="form.cooperType">
                    个性化
                </el-radio>
            </el-button>
        </el-tooltip>
        <el-radio :label="1" v-model="form.cooperType">标准</el-radio>
    </el-form-item>
    <el-form-item class="opt-btn">
        <el-button class="height-btn" @click="saveForm">确定</el-button>
        <el-button class="light-btn" @click="$router.go(-1)" >取消</el-button>
    </el-form-item>
    
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
            title:"新建个人合作",
            type:this.$route.params.type,
            id:this.$route.query.id,
            userTime:[],
            form:{
                cooperType:'',
                perName:'',
                perPhone:'',
                status:'',
                effictTime:'',
                freeAccount:'',
                userTimeStart:'',
                userTimeEnd:'',
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
                ]
            }
        }
    },
    created(){
        this.resetForm()
        if(this.type && this.id){
            this.title="编辑个人合作"
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
            }
            this.userTime = []
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
            this.$refs.form.validate((valid) => {
                if(valid){
                    let param = this.form
                    if(this.userTime){
                        param.userTimeStart = util.formatTime(this.userTime[0])
                        param.userTimeEnd = util.formatTime(this.userTime[1])
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
        color #606266
        &:hover
            background transparent
    .opt-btn
        text-align center
        margin-top 200px
</style>
<style lang="stylus">
   .organization-detail
        .o-form
            .el-form-item__label:before
                content: "*";
                color: #f56c6c;
                margin-right: 4px;
            
  


</style>


