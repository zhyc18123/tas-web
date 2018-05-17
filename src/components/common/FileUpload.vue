
<template>
    <div class="upload" :style="{width:width||'180px'}">
        <el-upload v-loading="loading" class="avatar-uploader" :ref="ref" :http-request="httpRequest" :auto-upload="true" :disabled="disabled" action="string" :show-file-list="false" :before-upload="beforeAvatarUpload" :data="{token:uptoken}">
            <img v-if="((!type&&!chooseType)||chooseType==='00'||type==='00')&&(newFileUrl||fileUrl)" :src="newFileUrl||fileUrl" class="avatar">
            
            <span class="avatar decoding" v-else-if="(chooseType==='01'||type==='01')&&(newFileUrl)">正在解码中。。。</span>
        <d-player class="d-player avatar" v-else-if="(chooseType==='01'||type==='01')&&(newFileUrl||fileUrl)" :options="{autoplay:true,video:{url:(newFileUrl||fileUrl)+'.m3u8',pic:(newFileUrl||fileUrl)+'-thumbnail-2',type: 'hls'}}" ref="dplay"></d-player>
        

            <div v-else-if="(chooseType==='03'||type==='03')&&(newFileUrl||fileUrl)" class="avatar" @click="downLoad(newFileUrl||fileUrl)">
                <svg class="icon fildtype" aria-hidden="true">
                    <use xlink:href="#icon-dazuoye"></use>
                </svg>
            </div>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-progress v-if="!disabled&&percent" :percentage="percent"></el-progress>
    </div>
</template>

<script>
import conf from 'lib/conf'
import io from 'lib/io'
import axios from 'axios'
import VueDPlayer from 'vue-dplayer'
import '../../../node_modules/vue-dplayer/dist/vue-dplayer.css'
export default {
    name: 'v-header',
    props: ['fileUrl', 'chooseType', 'disabled', "width", 'fileType'],
    components: {
        "d-player": VueDPlayer
    },
    data() {
        return {
            percent: 0,
            loading: false,
            uploadUrl: conf.qiniuBaseUrl,
            newFileUrl: this.fileUrl,
            // fileSourceName:'',
            uptoken: '',
            ref: 'ref' + (new Date().getTime()),
            type: '',   //type,图片：00;视频：01；音频：02；文件：03,
            inter: ''
        }
    },
    methods: {
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
                console.log('item',item)
                let url=conf.qiniuUploadTokenApi
                if(item.file.type.indexOf('video/')>-1){
                    url=conf.qiniuVideoUrl
                }
                let res = await io.get6(url)
                console.log('res',res)
                this.uptoken = res.data.uptoken
                param.append('token', this.uptoken);
                this.uploading(param, config, item.file.name);//然后将参数上传七牛
            } catch (e) {
                console.log(e)
            }
            return;
        },
        uploading(param, config, pathName) {
            axios.post(this.uploadUrl, param, config)
                .then(response => {
                    console.log(response.data);
                    this.handleSuccess(response.data)
                })
        },
        handleSuccess(res, file) {
            console.log('file',res, file)
            this.loading = false
            let backUrl = 'http://static.yuyou100.com/' + res.url
            let duration = 0
            this.newFileUrl = backUrl;
            console.log(res.type)
            if (res.type.indexOf('image') > -1) {
                this.type = '00'
            } else if (res.type.indexOf('video') > -1) {
                console.log("xxx")
                this.type = '01'
                duration = res.avinfo.video.duration
            } else if (res.type.indexOf('application') > -1) {
                this.type = '03'
            }
            this.$emit('success', backUrl, (res.size / 1024 / 1024), duration,res.original)
        },
        beforeAvatarUpload(file) {
            let fileSize = file / 1024 / 1024
            console.log(this.fileType)
            this.loading = true
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
.decoding{
    line-height 178px
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
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
