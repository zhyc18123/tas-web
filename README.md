
#vuex-element-axios
vuex使用示例

# vuex-element-axios

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

##规范

#使用技术

1.element ui (ui 框架)
    1)采用按需引入的方式，需要在Container.js配置组件后使用
    2)element可以自定义主题，放在lib目录下，具体方法看官网
2.axios (数据请求)
    1)所有的请求经过io文件的方法，可以根据需求修改文件
3.less  (css 样式)
    1)公共样式放在app.vue
4.vuex（状态管理)
    1)按照模块放在store

#代码结构

1.外部和公共js代码放在lib文件夹
    1）lib下面，conf放配置文件
    2）io放请求文件
    3）util放工具方法

2.图片放assets文件夹

3.目录与路由router说明
 一级路由，也就是大模块: Index, Info, Login, SignUp, User, Order, Cart等统一放在view文件夹
 二级路由，商品，租赁，需求大厅，使用Main.vue作为父级组件，以通用Header.vue, Nav.vue, Footer.vue

4.组件components文件夹
    1）公用组件放common
    2)其他组件根据模块分文件夹
    3）组件，.vue结尾的文件结构，从上到下为，html，js，css，css类名与html的类名一样从上到下

# iconfont
http://www.iconfont.cn
1. 加入项目
2. 下载最新文件
3. 采用svg的方式引入
    全局引入<script src="iconfont.js"></script>
    <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-Secret"></use>
    </svg>

# 内部组件命名规则
如： VHead 大驼峰，V用于区分第三方组件

# 样式
common.css 公共样式， normalize.css reset样式 都在main.js引入

# 全局广播
https://github.com/scottcorgan/tiny-emitter
import emitter from 'tiny-emitter/instance';

emitter.on('some-event', function (arg1, arg2, arg3) {
 //
});

emitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');

# 截图上传
https://github.com/dai-siki/vue-image-crop-upload

# 富文本编辑器
https://github.com/surmon-china/vue-quill-editor


## 发布

### 测试
```
scp -P 50000 -r dist/* yunwei@118.89.53.121:/apps/html/trp
```

### 生产
```
scp -P 50000 -r dist/* yunwei@139.199.228.120:/apps/html/trp
```
