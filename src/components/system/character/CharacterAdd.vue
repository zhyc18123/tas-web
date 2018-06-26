<template>
  <div class="character-add">
    <!-- <v-character-title icon="icon-wenjian2" name="角色管理"> -->
    <!-- </v-character-title> -->
    <line-head-form class="head" :title="title"/>
    <el-form :rules="rules" ref="form" :model="form" label-width="100px">
      <el-form-item prop="roleName" label="角色名称：">
        <el-input  v-model="form.roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item  class="role-type">
        <div slot="label" class="tow-four">
          角色所属：
        </div>
        <el-radio-group v-model="form.systemType">
          <el-radio v-for="(item,index) in systemTypes" :key="index" :label="item.value" >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-button @click="handleSave" class="btn-save" type="basis">保存</el-button>
      <el-button @click="$router.go(-1);" class="btn-cancel" type="basis">取消</el-button>
    </el-form>
  </div>
</template>

<script>
  import io from '../../../lib/io'
  // import VCharacterTitle from '../../common/CharacterTitle.vue'
import LineHeadForm from '../../common/LineHeadForm'  
  export default {
    components: {
      // VCharacterTitle
      LineHeadForm
    },
    data() {
    	return {
        title:'新增角色',
        form: {
          id:'',
          roleName: '',
          systemType: '1',
        },
        systemTypes:[
          {
            value:'1',
            label:"机构/个人"
          },
          {
            value:'0',
            label:"系统"
          },
          
        ],
        rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            {max:40,message:'输入超过最大限度40字',trigger:'blur'}
          ],
        }
      }
    },
    created() {
      console.log(this.$route.query)
      if(this.$route.query.id) {
        this.form.id = this.$route.query.id
        this.form.roleName = this.$route.query.roleName
        this.form.systemType = this.$route.query.systemType
        this.title = "编辑角色"
      }
    },
    methods: {
      handleSave() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let param = this.form
            if(param.systemType===''){
              this.$message('请选择角色所属')
            }
            if(this.form.id){
              io.post(io.updateAuthRole,param, (data)=> {
                this.$message({
                  message:'修改成功',
                  type:'success'
                  })
                this.$router.push('/main/system/characterList/list')
              })
            }else{
              io.post(io.addAuthRole,param, (data)=> {
                this.$message({
                  message:'保存成功',
                  type:'success'
                  })
                this.$router.push('/main/system/characterList/list')
              })
            }
          } else {
            this.$message('还有必填项未填，请先填写')
            return false;
          }
        });
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .character-add{
    .head{
       margin-top 20px
    }
    .el-form {
      padding: 50px 0px;
      text-align: center;

      .el-form-item {
        text-align: left;
        padding-left: 310px;
        height: 60px;
        line-height: 60px;
        // border-bottom: 1px dashed #dcf0f3;
        vertical-align: middle;
        margin-bottom: 0;
        .role-type{
          .tow-four{
              i{
                color: #ff4949;
                margin-right: 4px;
              }
          }
          
        }
        .el-form-item__label {
          color: #333333;
          line-height: 37px;
        }
        .el-form-item__content {
          line-height: 60px;
          .el-form-item__error {
            top: 20px;
            left: 383px;
          }
        }
        .el-input {
          width: 374px;
          color: #666;
          font-size: 12px;
          .el-input__inner {
            color: #666;
            font-size: 12px;
          }
        }
        .el-radio + .el-radio {
          margin-left: 40px;
        }
        .el-checkbox + .el-checkbox {
          margin-left: 40px;
        }
        .el-radio__label {
          color: #666;
          font-size: 12px;
        }
        .el-checkbox__label {
          color: #666;
          font-size: 12px;
        }
      }
      .small-form-item {
        .el-input {
          width: 174px;
        }
      }
      .el-button {
        margin-top: 37px;
      }

    }
    .f-db {
      display: block;
    }
    .btn-save,.btn-cancel {
      padding: 10px 33px;
      font-size: 16px;
    }
    .btn-cancel {
      margin-left: 26px;
      color: #fff;
      background-color: #0acabf;
      border-color: #0acabf;
    }
    .btn-cancel:hover {
      color: #fff;
      background-color: #13dcd1;
      border-color: #13dcd1;
    }
  }
</style>
<style lang="stylus">
  .role-type{
    .el-form-item__label:before{
    content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }
  }

</style>

