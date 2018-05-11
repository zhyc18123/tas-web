<template>
    <div :id="id">
      <div :id="pgId"></div>
      <el-button :id="btnId">
        {{uploadText}}
      </el-button>
      <el-progress v-show="progressShow" :percentage="progress" status="success"></el-progress>
      <div>
        <slot></slot>
      </div>
    </div>
</template>
<!--<script src="http://cdn.staticfile.org/plupload/2.1.9/plupload.full.min.js" type="text/javascript"></script>
<script src="http://cdn.staticfile.org/qiniu-js-sdk/1.0.14-beta/qiniu.min.js" type="text/javascript"></script>-->
<script>
import conf from '../../lib/conf'
import io from '../../lib/io'

require('../../lib/qiniu/qiniu.js')

export default{
  name:'file-upload',
  data(){
      return{
          id: 'upload-container',
          pgId : 'upload-pg-' + (new Date().getTime()),
          btnId : 'upload-btn-' + (new Date().getTime()),
          progress: 0,
      }
  },
  props:['extensions', 'uploadText'],
  computed: {
    progressShow() {
        return 0 < this.progress && this.progress !== 100
    }
  },
  mounted:function(){
    var _this = this
    io.getScripts(['http://cdn.staticfile.org/plupload/2.1.9/plupload.full.min.js'],function(){
      _this.uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',    //上传模式,依次退化
        browse_button: _this.btnId,       //上传选择的点选按钮，**必需**
        uptoken_url:conf.qiniuUploadTokenApi,            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
        save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
        domain: conf.qiniuCDN ,   //bucket 域名，下载资源时用到，**必需**
        get_new_uptoken: true,  //设置上传文件的时候是否每次都重新获取新的token
        container: _this.id ,           //上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '500mb',           //最大文件体积限制
        flash_swf_url:'http://cdn.staticfile.org/plupload/2.2.1//Moxie.swf',  //引入flash,相对路径
        max_retries: 3,                   //上传失败最大重试次数
        dragdrop: true,                   //开启可拖曳上传
        drop_element: _this.id ,        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                //分块上传时，每片的体积
        auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        filters: {
            max_file_size: '500mb',
            prevent_duplicates: false,
            mime_types: [
                {title: "文件类型", extensions: _this.extensions }
            ]
        },
        init: {
            'Key': function (up, file) {
                return new Date().getTime() + "/" + file.name.replace(/\s/g, '');
            },
            'UploadProgress': function (up, file) {
                _this.progress = file.percent
            },
//                  'BeforeUpload': function (up, file) {
//                      _this.progress = $.AMUI.progress
//                  },
            'FileUploaded': function (up, file, info) {
//                      _this.progress.done(true);
                var info = $.parseJSON(info);
                info.url = conf.qiniuCDN + info.url
                _this.$emit('uploaded',info)
            },
            'Error': function (up, err, errTip) {
                _this.$alert("上传失败:" + errTip)
            }
        }
      })
    });
//          $.AMUI.progress.configure({ parent : '#' +this.pgId  });
  },
  beforeDestroy:function(){
    if(this.uploader){
      this.uploader.destroy()
    }
  }
    }
</script>
