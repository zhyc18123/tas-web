
<template>
    <div class="upload">
        <el-upload v-loading="loading" class="avatar-uploader f-upload" :ref="ref" :http-request="httpRequest" :auto-upload="true" action="string" :show-file-list="false" :before-upload="beforeAvatarUpload" :data="{token:uptoken}">

            <el-button size="small" type="primary" class="up-btn">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiajianzujianjiahao"></use>
                </svg>
                {{btnText}}</el-button>
        </el-upload>
        <el-form class="upload-form" :inline="true" label-position="right" label-width="80px">
            <el-form-item label="已上传:">
                <label class="file-name" :title="originalName">{{originalName||'--'}}</label>
            </el-form-item>
            <el-form-item label="类型:">
                <label>{{typeName||'--'}}</label>
            </el-form-item>
            <el-form-item label="大小:">
                <label>{{fileSize||'--'}}M</label>
            </el-form-item>
            <el-form-item label="" class="preview">
                <el-button size="small" @click="preview">预览</el-button>
            </el-form-item>
        </el-form>
        <slot></slot>
    </div>
</template>

<script>
import conf from 'lib/conf'
import io from 'lib/io'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
    name: 'v-header',
    props: ['fileUrl', 'sOriginalName', 'sFileSize', 'btnText', 'fileType', 'sTypeName', 'isOfs'],
    components: {
    },
    data() {
        return {
            percent: 0,
            loading: false,
            uploadUrl: conf.qiniuBaseUrl,
            newFileUrl: this.fileUrl,
            uptoken: '',
            ref: 'ref' + (new Date().getTime()),
            type: '',   //type,图片：00;视频：01；音频：02；文件：03,
            inter: '',
            res: '',
            typeName: this.sTypeName,
            originalName: this.sOriginalName,
            fileSize: this.sFileSize
        }
    },
    created() {
        console.log(this.fileName)
    },
    watch: {
        sFileSize(val) {
            this.fileSize = val
        },
        sOriginalName(val) {
            this.originalName = val
        },
        sTypeName(val) {
            this.typeName = val
        },
        fileUrl(val) {
            this.newFileUrl = val
        }
    },
    computed: {
        ...mapState(['office'])
    },
    methods: {
        ...mapActions(['view']),
        preview() {
            if (!this.newFileUrl) {
                this.$message('请先上传文件！')
                return
            }
            if (this.isOfs) {
                let resourceId = this.res.resourceId
                if (!this.res.resourceId) {
                    let urlArr = this.newFileUrl.split('/')
                    resourceId = urlArr[urlArr.length - 1]
                }
                this.view({ resourceId: resourceId })
                if (!this.office.token) {
                    setTimeout(() => {
                        window.open(conf.ofsUrl+'office/view/'+this.newFileUrl + '?token=' + this.office.token)
                    }, 1000)
                } else {
                    window.open(conf.ofsUrl+'office/view/'+this.newFileUrl + '?token=' + this.office.token)
                }
                // console.log(this.office)
                // this.nextTick(() => {
                //     window.open(this.newFileUrl + '?token=' + this.office.token)
                // })
                // this.newFileUrl=this.newFileUrl+'?token'
            } else {
                window.open(this.newFileUrl)
            }
        },
        async httpRequest(item) {
            try {
                let param = new FormData()
                param.append('chunk', '0');//断点传输
                console.log('xd')
                param.append('chunks', '1');
                param.append('file', item.file, item.file.name)
                let config = {
                    onUploadProgress: progressEvent => {
                        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                        console.log(complete)//进度值
                        if (complete > 100) {
                            complete = 100
                        }
                        this.percent = complete
                    },
                    headers: { 'Content-Type': 'multipart/form-data' }
                };
                console.log('item', item)
                let url = conf.qiniuUploadTokenApi
                if (item.file.type.indexOf('video/') > -1) {
                    url = conf.qiniuVideoUrl
                }
                let res = await io.get6(url)
                console.log('res', res)
                this.uptoken = res.data.uptoken
                param.append('token', this.uptoken);
                this.uploading(param, config, item.file.name);//然后将参数上传七牛
            } catch (e) {
                console.log(e)
            }
            return;
        },
        uploading(param, config, pathName) {
            if (this.isOfs) {
                this.uploadUrl = conf.ofsUrl+'office/upload'
            }
            axios.post(this.uploadUrl, param, config)
                .then(response => {
                    console.log(response.data);
                    this.handleSuccess(response.data)
                })
        },
        async callSuccess(res){
            let {data}=await io.post(io.upload,{resourceId:res.resourceId})
        },
        handleSuccess(res, file) {
            if (this.isOfs) {
                this.callSuccess(res)
            }
            console.log('file', res, file)
            this.res = res
            this.loading = false
            let backUrl = 'http://static.yuyou100.com/' + res.url
            if (this.isOfs) {
                backUrl =res.resourceId
            }
            let duration = 0
            this.newFileUrl = backUrl;
            let resType = res.type || res.contentType
            console.log(res.type)
            if (resType.indexOf('image') > -1) {
                this.type = '00'
            } else if (resType.indexOf('video') > -1) {
                console.log("xxx")
                this.type = '01'
                duration = res.avinfo.video.duration
                this.typeName = '视频'
            } else if (resType.indexOf('application') > -1) {
                this.type = '03'
            }
            if (this.fileType === 'ppt') {
                this.typeName = 'PPT'
            } else if (this.fileType === 'word') {
                this.typeName = 'WORD'
            }
            this.originalName = res.original || res.name
            this.fileSize = Math.round((res.size / 1024 / 1024) * 100) / 100
            this.$emit('success', backUrl, this.fileSize, duration, res.original || res.name)
        },
        beforeAvatarUpload(file) {
            let fileSize = file / 1024 / 1024
            console.log('dd',this.fileType,fileSize)
            this.loading = true
                if (!fileSize) {
                    this.$message('文件大小不能为0')
                    this.loading = false
                    return false
                }
            if (this.fileType === 'img') {
                // let img
                if (!(file.type.indexOf('image/') > -1)) {
                    this.$message('只能上传图片')
                    this.loading = false
                    return false
                }
                if (fileSize > 10) {
                    this.$message('图片大小不能超过10M')
                    return false
                    this.loading = false
                }
            } else if (this.fileType === 'video') {
                console.log('file', file)
                if (!(file.type.indexOf('video/') > -1)) {
                    this.$message('只能上传视频')
                    this.loading = false
                    return false
                }
                if (fileSize > 500) {
                    this.$message('视频大小不能超过500M')
                    this.loading = false
                    return false
                }
            } else if (this.fileType === 'ppt') {
                console.log('file', file)
                if (!(file.name.indexOf('.ppt') > -1)) {
                    this.$message('只能上传PPT')
                    this.loading = false
                    return false
                }
            } else if (this.fileType === 'word') {
                if (!(file.name.indexOf('.doc') > -1)) {
                    this.$message('只能上传WORD')
                    this.loading = false
                    return false
                }
            }else if(this.fileType==='data'){
            //    this.typeName= file.name.indexOf('.ppt')>-1?'PPT':file.name.indexOf('.doc')>-1?'WORD':file.name.indexOf('.xls')>-1?'EXCEL':file.name.indexOf('.pdf')>-1?'PDF':'压缩包'
            } else {
                const isLt500M = file.size / 1024 / 1024 < 500;
                if (!isLt500M) {
                    this.$message.error('文件大小不能超过 500MB!');
                }
                return isLt500M;
            }
        },
        downLoad(fileUrl) {
            window.open(fileUrl)
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl'
.upload-form
    table-form()
    padding-right 20px
    width 100%
.preview
    float right 
    .el-button
        border 0
        background transparent
        text-decoration-line underline
.up-btn
    background white
    height 46px
    line-height 42px
    padding 0 15px
    color #01d1bb
    border-color #01d1bb
    border-width 2px
    border-radius 6px
    font-weight bold
    font-size 14px
    .icon
        font-size 20px
.decoding{
    line-height 178px
}
.file-name
    display inline-block
    width 140px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>

<style lang="stylus">
.f-upload
    .el-upload
        width 100%
        text-align left 
.upload-form
    .el-form-item__label
        font-weight normal
.avatar-uploader .el-upload {
    /*border: 1px dashed #d9d9d9;*/
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.fildtype {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
