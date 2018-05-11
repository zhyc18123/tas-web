// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import './lib/ztree/css/zTreeStyle/zTreeStyle.css'
// import './lib/ztree/css/demo.css'
import './lib/ztree/css/metroStyle/metroStyle.css'
import './lib/ztree/js/jquery.ztree.all.min'

import './assets/iconfont/iconfont'
import util from './lib/util'
import './assets/normalize.css'
import './assets/common.css'

import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import {Notification} from 'element-ui'
// import {
//   Button, Select, Menu, MenuItem,Carousel,CarouselItem,
//   Breadcrumb,BreadcrumbItem,Dialog, Form, FormItem, MessageBox,Notification ,
//   Input,Radio,RadioGroup,Col,Switch,CheckboxGroup,Checkbox,Option,Row,Submenu,Collapse,CollapseItem,Dropdown,DropdownItem,DropdownMenu,
//   Tabs,TabPane,TableColumn,Table,Tag,Pagination,DatePicker,Cascader,Message,Progress,TimeSelect,Popover,Loading
// } from 'element-ui'
// // Message, Notification等组件需要特殊处理
// // https://github.com/ElemeFE/element/issues/2434
// Vue.prototype.$message = Message
// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$notify = Notification
window.$notify=Notification
// Vue.prototype.$confirm = MessageBox.confirm
// // Vue.use(Loading.directive)
// Vue.prototype.$loading = Loading.service
// Vue.prototype.$loading = Loading.service


Vue.use(util)
// Vue.use(Button)
// Vue.use(Select)
// Vue.use(Menu)
// Vue.use(MenuItem)
// Vue.use(Carousel)
// Vue.use(CarouselItem)
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
// Vue.use(Dialog)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Radio)
// Vue.use(RadioGroup)
// Vue.use(Col)
// Vue.use(Switch)
// Vue.use(CheckboxGroup)
// Vue.use(Checkbox)
// Vue.use(Option)
// Vue.use(Row)
// Vue.use(Submenu)
// Vue.use(Collapse)
// Vue.use(CollapseItem)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(Tabs)
// Vue.use(Table)
// Vue.use(TabPane)
// Vue.use(TableColumn)
// Vue.use(Tag)
// Vue.use(Pagination)
// Vue.use(DatePicker)
// Vue.use(Cascader)
// Vue.use(Progress)
// Vue.use(TimeSelect)
// Vue.use(Popover)

Vue.config.productionTip = false

var data={config:{}};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data:data,
  template: '<App/>',
  components: { App },
  store
})
