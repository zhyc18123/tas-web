import Vue from 'vue'
import VueRouter from 'vue-router'


import VueUI from './components/base/VueUI'

require('amazeui/dist/css/amazeui.css')
require('amazeui')

import PayCourseOrder from 'components/m/pay/PayCourseOrder'
import PaySuccess from 'components/m/pay/PaySuccess'

Vue.use(VueRouter)
Vue.use(VueUI)


const router = new VueRouter({
  routes:[{
    path: '/pay',
    component : { template: '<router-view></router-view>' },
    children:[
      {path:'course/order/:courseOrderId',component : PayCourseOrder },
      {path:'success',component : PaySuccess }
    ]
  }]
})


var appVue = new Vue({
  el: '#app',
  router,
  template: '<div><router-view class="view"></router-view></div>',
  methods:{}

})


