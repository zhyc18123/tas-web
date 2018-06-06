<template>
  <el-row class="organization-detail">
<line-head-form class="head" title="新建合作机构"/>
    <el-form class="o-form" label-position="right" label-width="130px" :model="form" :rules="rules" ref="form">
        <el-form-item label="机构图标:" class="required">
            <file-upload @success="uploading" chooseType="00" :fileUrl="form.orgHeadUrl"/>
        </el-form-item>
        <el-form-item label="机构名称:" prop="orgName">
            <el-input v-model="form.orgName"></el-input>
        </el-form-item>
        <el-form-item label="机构简称:" >
            <el-input v-model="form.orgShortName"></el-input>
        </el-form-item>
        <el-form-item label="机构简介:" prop="orgIntroduce">
            <el-input type="textarea" :rows="6" v-model="form.orgIntroduce"></el-input>
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
            <el-form-item label="合作类型:" class="required">
                <el-tooltip class="item" effect="light" content="指机构本身拥有业务 课程" placement="bottom-start">
                    <el-button class="personal">
                        <el-radio :label="0" v-model="form.coopeType">
                            个性化
                        </el-radio>
                    </el-button>
                </el-tooltip>
            <el-radio :label="1" v-model="form.coopeType">标准</el-radio>
        </el-form-item>
        <el-form-item class="opt-btn">
            <el-button class="height-btn" @click="addAuthOrgan">确定</el-button>
            <el-button class="light-btn">取消</el-button>
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
        return {
            type:this.$route.params.type,
            id:this.$route.query.id,
            userTime:[],
            form:{
                orgName:'',
                orgShortName:'',
                orgHeadUrl:'',
                orgIntroduce:'',
                userTimeStart:'',
                userTimeEnd:"",
                status:'',
                freeAccount:'',
                coopeType:''
            },
            rules: {
                orgName: [
                    { required: true, message: '请输入机构名称', trigger: 'blur' }
                ],
                orgIntroduce: [
                    { required: true, message: '请输入机构简称', trigger: 'blur' },
                ],
                freeAccount:[
                    {required: true, message: "请输入可免费新增账号数", trigger: 'change' }
                ],
            }
            
        }
    },
    created(){
        this.resetForm()
        if(this.type && this.id){
            this.getAuthOrganDetail()
        }
    },
    methods:{
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
                userTime.push(util.formatTime(ret.userTimeStart))
                userTime.push(util.formatTime(ret.userTimeEnd))
                this.userTime = userTime
                console.log(ret)
            })
        },
        addAuthOrgan(){

            this.$refs.form.validate((valid) => {
                if(valid){
                    let param = this.form
                    param.userTimeStart = util.formatTime(this.userTime[0])
                    param.userTimeEnd = util.formatTime(this.userTime[1])
                    if(!param.orgHeadUrl){
                        this.$message("请上传机构图标")
                    }
                    if(!param.status){
                        this.$message("请选择合作状态")
                    }
                    if(!param.coopeType){
                        this.$message("请选择合作类型")
                    }
                    if(!param.userTimeStart || !param.userTimeStart) {
                        this.$message("请选择账号有效期")
                    }
                    console.log(param)
                    io.post(io.addAuthOrgan,param,(ret)=>{
                        this.$message({
                            type:'success',
                            message:'添加成功'
                        })
                        this.$router.push('/main/system/organization/list')
                        console.log(ret)
                    })
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
                coopeType:''
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
    .opt-btn
        text-align center
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
