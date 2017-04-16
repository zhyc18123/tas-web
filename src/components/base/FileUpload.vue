<template>
    <div :id="id">
      <div :id="pgId"></div>
      <button :id="btnId" type="button" class="am-btn am-btn-default am-btn-sm">
        <i class="am-icon-cloud-upload"></i>
        选择要上传的文件
      </button>
      <div>
        <slot></slot>
      </div>
    </div>
</template>
<style scoped>

</style>
<!--<script src="http://cdn.staticfile.org/plupload/2.1.9/plupload.full.min.js" type="text/javascript"></script>
<script src="http://cdn.staticfile.org/qiniu-js-sdk/1.0.14-beta/qiniu.min.js" type="text/javascript"></script>-->
<script>

import conf from '../../lib/conf'
import io from '../../lib/io'

require('../../../static/qiniu/qiniu.js')

export default{
        name:'file-upload',
        data(){
            return{
                pgId : 'upload-pg-' + (new Date().getTime()),
                btnId : 'upload-btn-' + (new Date().getTime()),
            }
        },
        props:['extensions'],
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
                      _this.progress.set(file.percent/100)
                  },
                  'BeforeUpload': function (up, file) {
                      _this.progress = $.AMUI.progress


                  },
                  'FileUploaded': function (up, file, info) {
                      _this.progress.done(true);
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
          $.AMUI.progress.configure({ parent : '#' +this.pgId  });
        },
        beforeDestroy:function(){
          if(this.uploader){
            this.uploader.destroy()
          }
        }
    }
</script>
