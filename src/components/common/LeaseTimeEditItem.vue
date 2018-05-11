<template>
  <div class="lease-time-item">
    <div :first-item="index === 0" v-for="(item,index) in list" :key="item.id">
      <div class="prize">
        <el-checkbox
          :disabled="disabledChecked"
          @change="handleCheckboxChange(item, weekIndex)"
          v-model="item.label"
          v-if="index === 0">
          {{label}}
        </el-checkbox>
        <el-input :disabled="!item.checked || disabledChecked" v-model="item.unitPrice" size="small"></el-input>
        <span>{{unit}}</span>
      </div>
      <div class="time-check" v-show="unit == '元/小时'" style="display: inline">
        <span>从&nbsp;</span>
        <el-time-select
          :disabled="!item.checked || disabledChecked"
          size="small"
          v-model="item.start"
          :picker-options="{
        start: '00:00',
        step: '01:00',
        end: '24:00'
      }"/>
        <span>&nbsp;至&nbsp;</span>
        <el-time-select
          :disabled="!item.checked || disabledChecked"
          size="small"
          v-model="item.end"
          :picker-options="{
        start: '00:00',
        step: '01:00',
        end: '24:00'
      }"/>
        <el-button v-if="index === 0 && unit == '元/小时'" :disabled="!item.checked || disabledChecked" size="small"
                   @click="handleAdd">添加
        </el-button>
        <el-button v-if="index !== 0 && unit == '元/小时'" size="small" @click="handleDelete(index)">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import conf from '../../lib/conf'
  import storage from '../../lib/storage'
  export default {
    components: {},
    created() {

    },
    data() {
      return {
        list: [
          {
            id: 0,
            start: '',
            end: '',
            label: '',
            weekNum: this.weekIndex,
            unit: this.unit,
            unitPrice: '',
            checked: false
          }
        ]
      }
    },
    props: ['unit', 'label', 'disabledChecked', 'weekIndex'],
    mounted() {

    },
    methods: {
      handleCheckboxChange(item, index) {
        item.checked = !item.checked;
        if (index === 0) {
          if (item.checked === true) {
            this.$emit('isCheckedEveryDay', true)
          } else {
            this.$emit('isCheckedEveryDay', false)
          }
        }
      },
      handleDelete(deleteIndex) {
        this.list.splice(deleteIndex, 1)
      },
      handleAdd() {
        this.list.push(
          {
            id: this.list.length,
            start: '',
            end: '',
            label: '',
            weekNum: this.weekIndex,
            unit: this.unit,
            unitPrice: '',
            checked: true
          }
        )
      },
    },
  }
</script>

<style lang="less" scope>
  .lease-time-item {
    /*width: 200px;*/
    /*margin-left: 200px;*/
    button {
      border: none;
    }
    .el-button.is-disabled {
      background: transparent;
    }
    .prize {
      margin-left: 134px;
      width: 146px;
      display: inline-block;
      margin-bottom: 8px;
      margin-right: 40px;
    }
    .time-check {
      width: 300px;
      display: inline-block;
    }
    [first-item] {
      .prize {
        width: 280px;
        display: inline-block;
        margin-bottom: 8px;
        margin-right: 40px;
      }
      .el-checkbox {
        width: 130px;
      }
    }
  }

  .contentBox {
    padding: 10px 15px 10px 15px;
    border-top: 1px solid #cbe3ef;
    .head {
      background-color: #dcf0f9;
      color: #666666;
      height: 35px;
      font-size: 12px;
      padding: 0 15px;
    }
    .container {
      min-height: 50px;
      .el-input {
        display: inline-block;
        width: 90px;

        input {
        }
      }
    }
  }
</style>
