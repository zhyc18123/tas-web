<template>
  <div class="province-setting">
    <v-class-category @getSubjectId="getSubjectId"></v-class-category>
    <div class="content">
      <span class="direction-icon"></span>
      <el-form>
        <el-form-item label="省份：">
          <el-checkbox label="全选" v-model="checkAll" @change="handleCheckAllChange" class="f-db">
          </el-checkbox>
          <el-checkbox-group v-model="checkedProvince" @change="handleCheckedChange">
            <el-checkbox v-model="item.checkedStatus" v-for="(item,index) in provinceList" :label="item.questionOriginId" :key="index">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-button @click="handleSave" type="basis">保存</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import VClassCategory from '../../common/ClassCategory.vue'
import io from '../../../lib/io'
export default {
  name: 'province-setting',
  components: {
    VClassCategory
  },
  data() {
    return {
      checkAll: false,
      subjectId: '10',
      checkedProvince: [],
      provinceList: [],
    }
  },
  created() {
    this.getQuestionOriginAreaList()
  },
  watch: {
    subjectId() {
      this.getQuestionOriginAreaList()
    }
  },
  methods: {
    getSubjectId(obj) {
      this.subjectId = obj.subjectId
    },
    handleSave() {
      io.post(io.saveQuestionOriginArea, {
        subjectId: this.subjectId,
        originAreaIds: this.checkedProvince.join(',') || ''
      }, (data) => {
        this.$message('保存成功！')
      })
    },
    handleCheckAllChange(event) {
      console.log('event',event)
      this.checkedProvince = [];
      if (event) {
        this.provinceList.map((val) => {
          this.checkedProvince.push(val.questionOriginId)
        })
      }
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.provinceList.length;
    },
    getQuestionOriginAreaList() {
      let _this = this
      io.post(io.questionOriginAreaList, { subjectId: this.subjectId }, (data) => {
        this.provinceList = data
        this.checkedProvince = []
        this.provinceList.map((val) => {
          if (val.checkedStatus === '1') {
            _this.checkedProvince.push(val.questionOriginId)
          }
        })
        this.checkAll = this.checkedProvince.length === this.provinceList.length;
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.province-setting {
  margin-top: 15px;
  background: white;
  .class-category {
    float: left;
  }
  .content {
    position: relative;
    margin-left: 152px;
    text-align: center;
    padding: 60px 70px;
    border: 1px solid #bbdde7;
    height: 389px;
    border-left: none;
    .el-button {
      color: white;
    }
    .el-form {
      height: 300px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
    .direction-icon {
      position: absolute;
      top: -10px;
      left: 230px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 6px 10px 6px;
      border-color: transparent transparent #bbdde7 transparent;
      &::before {
        position: absolute;
        content: "";
        top: 1px;
        left: -9px;
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 0px 9px 17px;
        border-color: transparent transparent rgb(255, 255, 255);
      }
    }
  }
}
</style>
<style lang="less">
.province-setting {
  .el-form {
    .el-form-item {
      margin-bottom: 22px;
      height: 290px;
      text-align: left;
    }
    .el-form-item__content {
      height: 290px;
    }
    .el-checkbox-group .el-checkbox {
      margin-left: 55px;
    }
    .el-button--basis {
      padding: 10px 33px;
      font-size: 16px;
      background:#00b1d1;
      
    }
  }
}
</style>
