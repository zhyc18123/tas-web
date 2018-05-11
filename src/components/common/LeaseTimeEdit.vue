<template>
  <div class="m-lease-time-edit" :isActive="isActive">
    <div @click="isActive = !isActive" class="head is-active">
      租赁时间&nbsp;{{index + 1}}
      <span v-show="time">
      ({{time[0] | formatDate}} 至 {{time[1] | formatDate}})
      </span>
      <span class="icon f-fr icon-collapse">
        <i class="el-icon-arrow-up"></i>
      </span>
      <span @click="handleDestroy" class="icon f-fr icon-delete-lease-way">—</span>
    </div>
    <div class="main">
      <div class="main-content-head">
        <el-date-picker
          v-model="time"
          type="daterange"
          placeholder="选择日期范围">
        </el-date-picker>
        <router-link to="/classroomsOccupyList" tag="a" target="_blank">
          <el-button type="primary">查看课室占用表</el-button>
        </router-link>
      </div>
      <div class="way">
        <span>请选择出租方式：</span>
        <el-checkbox :disabled="!timeDiff" v-model="periodChecked" label="按小时"></el-checkbox>
        <el-checkbox :disabled="!timeDiff" v-model="dayChecked" label="按天"></el-checkbox>
        <el-checkbox :disabled="timeDiff <= 7" v-model="weekChecked" label="按周"></el-checkbox>
        <el-checkbox :disabled="timeDiff <= 30" v-model="monthChecked" label="按月"></el-checkbox>
        <el-checkbox :disabled="timeDiff <= 365" v-model="yearChecked" label="按年"></el-checkbox>
      </div>
      <div v-show="periodChecked" class="period-lease-contentBox contentBox">
        <div class="lease-way-title">按小时出租条件：</div>
        <div class="container">
          <v-lease-time-edit-item
            v-for="(item,index) in OneWeek"
            :label="item.label"
            :disabledChecked="item.disabledChecked"
            @isCheckedEveryDay="isCheckedEveryDay"
            :key="item"
            :weekIndex="index"
            :unit="'元/小时'"
            ref="hourLeaseWay"
          />
        </div>
      </div>
      <div v-show="dayChecked" class="day-lease-contentBox contentBox">
        <div class="lease-way-title">按天出租条件：</div>
        <div class="container">
          <v-lease-time-edit-item
            v-for="(item,index) in OneWeek"
            :label="item.label"
            :disabledChecked="item.disabledChecked"
            @isCheckedEveryDay="isCheckedEveryDay"
            :weekIndex="index"
            :key="item"
            :unit="'元/天'"
            ref="dayLeaseWay"
          />
        </div>
      </div>
      <div v-show="weekChecked" class="week-lease-contentBox contentBox">
        <div  class="lease-way-title">按周出租条件：</div>
        <div class="container">
          <el-input v-model="weekUnitPrice" size="small"></el-input>
          <span>&nbsp;元/周</span>
        </div>
      </div>
      <div v-show="monthChecked" class="month-lease-contentBox contentBox">
        <div  class="lease-way-title">按月出租条件：</div>
        <div class="container">
          <el-input v-model="monthUnitPrice" size="small"></el-input>
          <span>&nbsp;元/月</span>
        </div>
      </div>
      <div ref="yearModel" v-show="yearChecked" class="year-lease-contentBox contentBox">
        <div class="lease-way-title">按年出租条件：</div>
        <div class="container">
          <el-input v-model="yearUnitPrice" size="small"></el-input>
          <span>&nbsp;元/年</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/io'
  import conf from '../../lib/conf'
  import storage from '../../lib/storage'
  import moment from 'moment'
  import VLeaseTimeEditItem from './LeaseTimeEditItem.vue'
  export default {
    components: {
      VLeaseTimeEditItem
    },
    created() {

    },
    data() {
      return {
        time: '',
        isActive: true,
        leaseTime: '',
        weekChecked: false,
        monthChecked: false,
        yearChecked: false,
        dayChecked: false,
        periodChecked: false,
        start: '',
        end: '',
        status: '',
        unit: '',
        unitPrice: '',
        dataType: '',
        weekNum: '',
        detachable: '',
        timeDesc: '',
        timeType: '',
        hourUnitPrice: '',
        dayUnitPrice: '',
        weekUnitPrice: '',
        monthUnitPrice: '',
        yearUnitPrice: '',
        OneWeek: [
        {
          label: '每天出租',
          disabledChecked: false
        },{
            label: '周日',
            disabledChecked: false
          },{
          label: '周一',
          disabledChecked: false
        },{
          label: '周二',
          disabledChecked: false
        },{
          label: '周三',
          disabledChecked: false
        },{
          label: '周四',
          disabledChecked: false
        },{
          label: '周五',
          disabledChecked: false
        },{
          label: '周六',
          disabledChecked: false
        },
        ]
      }
    },
    computed: {
      timeDiff() {
        if (this.time.length > 0) {
          let start = moment(this.time[0]).format('YYYY-MM-DD'),
          end = moment(this.time[1]).format('YYYY-MM-DD')
          return moment(end).diff(moment(start), 'days')
        } else {
          return 0
        }
      },
      startTime() {
          return moment(this.time[0]).format('YYYY-MM-DD')
      },
      endTime() {
        return moment(this.time[1]).format('YYYY-MM-DD')
      },
    },
    props: ['index'],
    methods: {
      isCheckedEveryDay(isChecked) {
        if(isChecked) {
            this.OneWeek.map((val, index) => {
              index !== 0 ? val.disabledChecked = true: val.disabledChecked = false
            })
        } else {
          this.OneWeek.map((val) => {
            val.disabledChecked = false
          })
        }
      },
      handleDestroy() {
          let _this = this
          this.$emit('deleteLeaseWay', _this.index)
      },
      getLeaseWayItemData() {
        let data = []
        this.$refs.hourLeaseWay.map((i) => {
          i.list.map((j) => {
            if(j.checked) {
                data.push(j)
              }
          })
        })
        this.$refs.dayLeaseWay.map((i) => {
          if(i.list[0].checked) {
            data.push(i.list[0])
          }
        })
        return {
          startTime: this.startTime,
          endTime: this.endTime,
          leaseWayItemData: data,
          weekUnitPrice: this.weekUnitPrice,
          monthUnitPrice: this.monthUnitPrice,
          yearUnitPrice: this.yearUnitPrice,
        }
      },
    },
  }
</script>

<style lang="less" scope>
  .m-lease-time-edit {
    border: 1px solid #cbe3ef;
    margin-bottom: 15px;
    .head {
      background-color: #dcf0f9;
      color: #03a6eb;
      height: 35px;
      font-size: 12px;
      padding: 0 15px;
      font-weight: bold;
      cursor: pointer;

      .icon {
        width: 28px;
        text-align: center;
        font-size: 18px;
        height: 36px;
      }
    }
    .f-fr {
      float: right;
    }
    .icon-collapse {
      font-size: 15px;
    }
    .icon-delete-lease-way{
      cursor: pointer;
    }
    .lease-way-title {
      color: #333333;
      font-weight: bold;
      float: left;
      margin-right: 10px;
    }
    .period-lease-contentBox .lease-way-title {
      float: none;
    }
    .day-lease-contentBox {
      .container {
        .lease-time-item .prize {
          margin-left: 0;
        }

      }
    }
    .main {
      display: none;
      .main-content-head {
        padding: 15px 15px 0;
      }
      .way {
        margin: 5px 0;
        padding: 0 15px;
      }
    }
  }
  [isActive] {
    .main {
      display: block;
    }
    .el-icon-arrow-up {
      transform: rotate(180deg);
    }
  }
</style>
