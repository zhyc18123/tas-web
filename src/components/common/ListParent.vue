<template>
  <ul>
      <li v-for="(item,i) in list">
              <svg class="icon wenjianjia" aria-hidden="true">
                <use xlink:href="#icon-wenjianjia1"></use>
              </svg>
          <input v-model="item.name" v-if="item.isInput" @blur="changeName(item)"/>    
          <span v-else class="title" :class="{active:item.active}" @click="selectNode(item)">{{item.name}}</span>
          <p v-for="(q,qI) in item.question">
              <svg class="icon wenjian3" aria-hidden="true">
                <use xlink:href="#icon-wenjian3"></use>
              </svg>
              {{q.name}}
          </p>
          <list-child @changeName="changeName" @selectItem='selectItem' v-if="item.childrenNodeList&&item.childrenNodeList.length" :list='item.childrenNodeList'/>
      </li>
  </ul>
</template>

<script>

  export default {
    name: 'parent',
    props:['list','cActive'],
    components:{
    },
    data() {
      return {
        activeItem: {},
      }
    },
    watch:{
    },
    beforeCreate: function () {
  this.$options.components.ListChild = require('./ListChild.vue')
},
    created() {
    },
    methods: {
        changeName(item){
            this.$emit('changeName',item);
        },
        selectItem(){
            this.$emit("selectItem")
        },
        selectNode(item){
            sessionStorage.setItem('activeItem',JSON.stringify(item))
            this.$emit("selectItem")
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
ul{
    padding-left: 20px;
    margin-top: 15px;
    color: #333;
}
p{
    margin-top: 15px;
    margin-left: 20px;
}
.title{
    color: #00499c;
    font-weight: bold;
    cursor: pointer;
}
.title.active{
    color: red;
}
.icon{
    color: #309eda;
    margin-right: 10px;
}
li{
    margin-bottom: 15px;
}
</style>
