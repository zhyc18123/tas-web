<template>
  <el-row class="organization-detail">
<line-head-form class="head" :title="title" :type="types"/>
    <el-form class="o-form" label-position="right" label-width="130px" :model="form" :rules="rules" ref="form">
        <el-form-item label="机构图标:" class="required">
            <file-upload @success="uploading" chooseType="00" :fileUrl="form.orgHeadUrl" fileType='img'/>
            <div class="tip">
                <p>尺寸建议500*500</p>
                <p>文件小于2M</p>
                <p>支持JPG/PNG/BMP等图片</p>
            </div>
        </el-form-item>
        <el-form-item label="机构名称:" prop="orgName">
            <el-input v-model="form.orgName" placeholder="请输入机构名称"></el-input>
        </el-form-item>
        <el-form-item label="机构简称:" >
            <el-input v-model="form.orgShortName" placeholder="请输入机构简称"></el-input>
        </el-form-item>
        <el-form-item label="机构简介:" prop="orgIntroduce">
            <el-input type="textarea" :rows="6" v-model="form.orgIntroduce" placeholder="请输入机构简介"></el-input>
        </el-form-item>
        <el-form-item label="合作状态:" class="required">
            <el-radio :label="0" v-model="form.status">试用期</el-radio>
            <el-radio :label="1" v-model="form.status">合约期</el-radio>
            <el-radio :label="2" v-model="form.status">终止</el-radio>
        </el-form-item>
        <el-form-item label="账号有效期:" class="required">
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
                <el-input v-model="form.freeAccount"></el-input>
            </el-col> <em class="free-num">个</em> 
            </el-form-item>
            <el-form-item label="合作类型:" class="required" prop="cooperType">
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
            <el-button :disabled="addDisabled" class="height-btn" @click="addAuthOrgan">确定</el-button>
            <el-button class="light-btn" @click="$router.go(-1)">取消</el-button>
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
            types:'add',
            title:'新建合作机构',
            type:this.$route.params.type,
            id:this.$route.query.id,
            userTime:[],
            roleList:[],
            form:{
                orgName:'',
                orgShortName:'',
                orgHeadUrl:'',
                orgIntroduce:'',
                userTimeStart:'',
                userTimeEnd:"",
                status:'',
                freeAccount:'',
                cooperType:'',
                roles:[],
            },
            rules: {
                orgName: [
                    { required: true, message: '请输入机构名称', trigger: 'blur' },
                    { max:40,message: '输入超过最大限度40字', trigger: 'blur'}
                ],
                orgIntroduce: [
                    { required: true, message: '请输入机构简称', trigger: 'blur' },
                ],
                freeAccount:[
                    {required: true, validator: validateFreeAccount, trigger: 'blur',}
                ],
                cooperType:[
                    {required: true, message: '请选择合作类型', trigger: 'blur',}
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
            this.title = "编辑合作机构"
            this.types = 'edit'
            this.getAuthOrganDetail()
        }
    },
    methods:{
        // 角色接口
        authRoleListForOrgan(){
            let param = {}
            io.post(io.authRoleListForOrgan,param,(ret)=>{
                this.roleList = ret
                console.log(ret)
            })
        },
        uploading(info){
            this.form.orgHeadUrl = info
            console.log(info)
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
        addAuthOrgan(){
            console.log(this.form,this.userTime)
            this.addDisabled=true
            setTimeout(()=>{
                this.addDisabled=false
            },2000)
            this.$refs.form.validate((valid) => {
                if(valid){
                    let param = {...this.form}
                    param.roles = param.roles.join(',')
                    console.log(param)
                    if(this.userTime){
                        param.userTimeStart = util.formatDate(this.userTime[0])+' 00:00:00'
                        param.userTimeEnd = util.formatDate(this.userTime[1])+' 23:59:59'
                    }else{
                        param.userTimeStart = null
                         param.userTimeEnd = null
                    }
                    if(!param.orgHeadUrl){
                        this.$message("请上传机构图标")
                        return false
                    }
                    if(param.status===''){
                        this.$message("请选择合作状态")
                        return false
                    }
                    if(!param.userTimeStart || !param.userTimeStart) {
                        this.$message("请选择账号有效期")
                        return false
                    }
                    if(!param.freeAccount===""){
                        this.$message("请输入免费添加账号数")
                        return false
                    }
                    if(param.cooperType===''){
                        this.$message("请选择合作类型")
                        return false
                    }
                    if(!(this.type && this.id)){
                        io.post(io.addAuthOrgan,param,(ret)=>{
                            this.$message({
                                type:'success',
                                message:'添加成功'
                            })
                            this.$router.push('/main/system/organization/list')
                            console.log(ret)
                        })
                    }else{
                        param.id = this.id
                        console.log(param)
                        io.post(io.updateAuthOrgan,param,(ret)=>{
                            this.$message({
                                type:'success',
                                message:'修改成功'
                            })
                            this.$router.push('/main/system/organization/list')
                            console.log(ret)
                        })
                    }
                    
                }else{
                    this.$message('还有必填项未填，请先填写')
                    return
                }
            })
            
        },
        resetForm(){
            this.form = {
                orgName:'',
                orgShortName:'',
                orgHeadUrl:'',
                orgIntroduce:'',
                userTimeStart:'',
                userTimeEnd:"",
                status:'',
                freeAccount:'',
                coopeType:'',
                roles:[],
            }
            this.userTime = []
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
        color #666
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
.required
    position relative
    .tip
        position absolute
        top 30px
        left 200px
</style>
<style lang="stylus">
.organization-detail{
    .required{
        .el-form-item__label:before{
            content: "*";
            color: #f56c6c;
            margin-right: 4px;
        }
  }
}
  

</style>
