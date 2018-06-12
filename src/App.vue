<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    
// document.oncontextmenu = function(){
//   return false;
// }
// document.onkeydown = function(){
//   if (event.ctrlKey && window.event.keyCode==67){
//     return false;
//   }
// }
// document.body.oncopy = function (){
//   return false;
// }
  }
}
</script>

<style>
#app {
  font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  position: relative;
  font-size: 14px;
  color: #333;
  min-width: 1200px;
  min-height: 100%;
  height: 100%;
}
</style>
