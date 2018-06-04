<template>
  <div class="character-add">
    <v-character-title icon="icon-wenjian2" name="角色管理">
    </v-character-title>
    <el-form :rules="rules" ref="form" :model="form" label-width="100px">
      <el-form-item prop="roleName" required label="角色名称：">
        <el-input @keyup.enter.native="handleSave" v-model="form.roleName"></el-input>
      </el-form-item>
      <el-button @click="handleSave" class="btn-save" type="basis">保存</el-button>
      <el-button @click="$router.go(-1);" class="btn-cancel" type="basis">取消</el-button>
    </el-form>
  </div>
</template>

<script>
  import io from '../../../lib/io'
  // import VCharacterTitle from '../../common/CharacterTitle.vue'

  export default {
    components: {
      // VCharacterTitle
    },
    created() {
      if(this.$route.query.optRoleId && this.$route.query.optRoleId) {
        this.form.optRoleId = this.$route.query.optRoleId
        this.form.roleName = this.$route.query.roleName
      }
    },
    data() {
    	return {
        form: {
          roleName: '',
          optRoleId: '',
        },
        rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      handleSave() {
        this.$refs.form.validate((valid) => {
          if (valid) {
          	io.post(io.saveRole, {
              roleName: this.form.roleName,
              optRoleId: this.form.optRoleId
            }, (data)=> {
          		this.$message('保存成功')
              this.$router.push('/main/system/characterList/list')
            })
          } else {
            return false;
          }
        });
      },
    },
  }
</script>

<style lang="less" scope>
  .character-add{
    .el-form {
      padding: 5px 0px;
      text-align: center;

      .el-form-item {
        text-align: left;
        padding-left: 310px;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px dashed #dcf0f3;
        vertical-align: middle;
        margin-bottom: 0;
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
