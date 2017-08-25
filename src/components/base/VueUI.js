
import util from '../../lib/util'

import AMLoading from './Loading'
import AMAlert from './Alert'
import ADialog from './Dialog'
import AMConfirm from './Confirm'
import AMPrompt from './Prompt'
import AMToast from './Toast.vue'
import DatePicker from './DatePicker'
import Selected from './Selected'
import FileUpload from './FileUpload'
import Editor from './Editor'
import Window from './Window'
import Select2 from './Select2'
import DateTimePicker from './DateTimePicker'
import TimePicker from './TimePicker'
import Choose from './Choose'


import {
  Table ,
  TableColumn ,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tag,
  Rate,
  Steps,
  Step,
  Input,
  Tabs,
  TabPane,
} from 'element-ui'

var VueUI = function(){

}

VueUI.install = function (Vue){



  const Loading = Vue.extend(AMLoading)
  const Alert = Vue.extend(AMAlert)
  const Dialog = Vue.extend(ADialog)
  const Confirm = Vue.extend(AMConfirm)
  const Prompt = Vue.extend(AMPrompt)
  const Toast = Vue.extend(AMToast)

  $('body').append('<div id="_windowSlot"></div>')
  $('body').append('<div id="_componentSlot"></div>')
  const caches = {}
  function getInstance(Component,name){
    var o  =  caches[name] || ( caches[name] = new Component );
    if(!o.$el){
      $('#_componentSlot').append(o.$mount().$el)
    }
    return o ;
  }
  function getInstanceNoCache(Component){
    var o  = new Component ;
    $('#_componentSlot').append(o.$mount().$el)
    return o ;
  }

  Vue.showLoading = Vue.prototype.$showLoading = function (){
    getInstance(Loading,'loading').show()
  }

  Vue.hiddenLoading = Vue.prototype.$hiddenLoading = function (){
    getInstance(Loading,'loading').close()
  }

  Vue.alert = Vue.prototype.$alert = function (msg){
    getInstance(Alert,'alert').show(msg)
  }

  Vue.dialog = Vue.prototype.$dialog = function (title,content){
    getInstance(Dialog,'dialog').show(title,content)
  }

  Vue.confirm = Vue.prototype.$confirm = function (msg,confirm,cancel){
    getInstanceNoCache(Confirm).show(msg,confirm,cancel)
  }

  Vue.prompt = Vue.prototype.$prompt = function (msg,confirm,cancel){
    getInstanceNoCache(Prompt).show(msg,confirm,cancel)
  }

  Vue.toast = Vue.prototype.$toast = function (msg, options = {}){
    options.message = msg
    let toast = caches[options.id] || (caches[options.id] = new Toast)
    if (!toast.$el) {
      $('body').append(toast.$mount().$el)
    }
    toast.queue.push(options)
  }

  Vue.prototype.$params=function(name){
    return this.$router.currentRoute.params[name] ;
  }

  Vue.component('date-picker',DatePicker)
  Vue.component('selected',Selected)
  Vue.component('file-upload',FileUpload)
  Vue.component('editor',Editor)
  Vue.component('window',Window)
  Vue.component('select2',Select2)
  Vue.component('choose',Choose)
  Vue.component('date-time-picker',DateTimePicker)
  Vue.component('time-picker',TimePicker)
  Vue.component(Table.name,Table)
  Vue.component(TableColumn.name,TableColumn)
  Vue.component(Button.name,Button)
  Vue.component(Dropdown.name,Dropdown)
  Vue.component(DropdownMenu.name,DropdownMenu)
  Vue.component(DropdownItem.name,DropdownItem)
  Vue.component(Tag.name,Tag)
  Vue.component(Rate.name,Rate)
  Vue.component(Steps.name,Steps)
  Vue.component(Step.name,Step)
  Vue.component(Tabs.name,Tabs)
  Vue.component(Input.name,Input)
  Vue.component(TabPane.name,TabPane)

  Vue.filter('formatDate' ,util.formatDate )
  Vue.filter('formatTime' , util.formatTime )
  Vue.filter('formatNumber' , util.formatNumber )

  Vue.mixin({
    computed:{
      id:function(){
        return 'id-' + (parseInt(Math.random() * 1000 ))  +'-'+(new Date().getTime())
      }
    },
    created:function(){
      if(this.query && this.$parent.isMainLayout && this.$route && this.$root[this.$route.fullPath]){
        Object.assign(this,this.$root[this.$route.fullPath])
      }
    },
    beforeRouteLeave (to, from, next) {
      if(this.$parent.isMainLayout && this.$data.query){
        this.$root[from.fullPath] = this.$data
      }
      next()
    },
    methods: {
      hasPermission: function (permission) {
        return this.$root.config.permission[this.$route.path] && this.$root.config.permission[this.$route.path][permission] ? true : false
      }
    }
  })


}


export default VueUI
