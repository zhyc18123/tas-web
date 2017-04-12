<template>
    <select :required="required" :disabled="disabled" >
      <slot></slot>
      <option v-for="item in options"  :value="item.value">{{item.text}}</option>
    </select>
</template>

<script>
    export default{
        name: 'select2',
        props:['value','options','required','disabled' ],
        watch:{
          value:function(){
             this.setSelect(this.value)
          },
          options : function(v){
            this.$nextTick(function(){
              this.setSelect(this.value)
            })
          }
        },
        mounted:function(){
          this.setSelect(this.value)
          var _this  = this
          $(_this.$el).on('change',function(){
            _this.$emit('input' , $(_this.$el).val() )
          })

        },
        methods:{
          setSelect:function(val){
            var selectEl = this.$el
            $("option",  selectEl ).each(function (idx, item) {
              if ( item.value == val) {
                  selectEl.selectedIndex = idx;
              }
            })
          }
        }
    }
</script>
