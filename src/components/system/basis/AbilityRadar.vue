<template>
  <div class="ability-radar">
    <v-class-category @getSubjectId="getSubjectId"></v-class-category>
    <div class="content">
      <span class="direction-icon"></span>
      <el-table :data="tableData" class="small-table" row-class-name="tr-class" style="width: 100%">
        <el-table-column label="能力分类" width="200" class-name="ability-category-column" align="center">
          <template scope="scope">
            <div v-show="scope.row.abilityCategory&&scope.row.abilityCategory.abilityCategoryName && !scope.row.newCategory && !scope.row.addCategory">
              <el-input v-if="editCategoryIndex === scope.$index&&scope.row.abilityCategory" @blur="saveOrUpdateAbilityCategory(scope.row.abilityCategory)" @keyup.native.enter="saveOrUpdateAbilityCategory(scope.row.abilityCategory)" v-model="scope.row.abilityCategory.abilityCategoryName"></el-input>
              <div v-show="editCategoryIndex !== scope.$index" @click="editCategoryIndex = scope.$index" class="tag">
                <span>{{scope.row.abilityCategory&&scope.row.abilityCategory.abilityCategoryName}}</span>
                <svg @click.stop="handleDeleteRow(scope.row.abilityCategory.abilityCategoryId)" class="icon" aria-hidden="true">
                  <use xlink:href="#icon-clear"></use>
                </svg>
              </div>
            </div>
            <div v-if="scope.row.abilityCategory&&scope.row.newCategory && !scope.row.addCategory&&scope.row.abilityCategory">
              <el-input class="add-category-input" @blur="saveOrUpdateAbilityCategory(scope.row.abilityCategory)" @keyup.native.enter="saveOrUpdateAbilityCategory(scope.row.abilityCategory)" v-model="scope.row.abilityCategory.abilityCategoryName" placeholder="请输入分类名称"></el-input>
            </div>
            <div v-show="scope.row.addCategory && !scope.row.newCategory" class="btn-add">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tianjia"></use>
              </svg>
              <span @click="handleAddCategory()">增加</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="power" :render-header="renderHeader">
          <template scope="scope" v-if="scope.row.abilityItemWithScoreList">
            <div class="row" v-for="(item,scoreIndex) in scope.row.abilityItemWithScoreList" v-if="item.score">
              <div class="score">{{item.score}}</div>
              <div class="ability-content">
                <template v-for="(j,index) in item.abilityItemList">
                  <div class="tag" v-show="!j.editAbility">
                    <span @click="j.editAbility=true">{{j.abilityItemName}}</span>
                    <svg @click.stop="handleDeleteTag(j.abilityItemId)" class="icon" aria-hidden="true">
                      <use xlink:href="#icon-clear"></use>
                    </svg>
                  </div>
                    <el-input @blur="saveOrUpdateAbilityItem(j)" @keyup.native.enter='saveOrUpdateAbilityItem(j)' class="ability-input" v-show="j.editAbility" v-model="j.abilityItemName"></el-input>
                </template>
                <div class="input-add-tag" v-show="item.addTag">
                  <el-input @blur="handleSaveTag(item,scope.row.abilityCategory.abilityCategoryId)" @change="handleInputChange" @keyup.enter.native.stop="handleSaveTag(item,scope.row.abilityCategory.abilityCategoryId)" class="" ></el-input>
                </div>
                <div @click="handleAddTag(item)" class="tag add-tag">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div v-show="!scope.row.addCategory" class="btn-add">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tianjia"></use>
              </svg>
              <span @click="handleAddRow(scope.row.abilityItemWithScoreList)">增加</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import VClassCategory from '../../common/ClassCategory.vue'
import io from '../../../lib/io'
import ElInput from "../../../../node_modules/element-ui/packages/input/src/input";
import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
export default {
  name: 'ability-radar',
  components: {
    ElButton,
    ElInput,
    VClassCategory
  },
  data() {
    return {
      newTag: '',
      editCategoryIndex: -1,
      addCategory: false,
      newCategory: false,
      subjectId: '20',
      tableData: []
    }
  },
  watch: {
    subjectId() {
      this.getAbilityConfigOfSubject()
    }
  },
  methods: {
    renderHeader(createElement) {
      return createElement(
        'div',
        [
          createElement('span', ['分值'], {
            'class': {
              'ability-category': true
            }
          }),
          createElement('span', ['能力'], {})
        ]
      );
    },
    getSubjectId(obj) {
      this.subjectId = obj.subjectId
    },
    saveOrUpdateAbilityCategory(row){
      console.log('row',row)
      // if(row&&!row.abilityCategoryName){
      //   this.$message('名称不能为空')
      //   return
      // }
      io.post(io.saveOrUpdateAbilityCategory, {
        subjectId: this.subjectId,
        abilityCategoryId:row&&row.abilityCategoryId,
        abilityCategoryName:row&&row.abilityCategoryName,
        score:row.score
      }, () => {
        this.$message('保存成功！');
        this.newTag = ''
        this.addCategory = false
        this.editCategoryIndex = -1
      this.getAbilityConfigOfSubject();
      },()=>{
        this.getAbilityConfigOfSubject()
      })
    },
    handleDeleteRow(abilityCategoryId) {
      this.$confirm('删除该分类，该分类下的能力也将一并删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      io.post(io.deleteAbilityCategory, {
        subjectId:this.subjectId,
        abilityCategoryId: abilityCategoryId,
      }, () => {
        this.$message('删除成功！');
        this.getAbilityConfigOfSubject();
      });
      }).catch(() => {

      });
    },
    handleDeleteTag(abilityItemId) {
      
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      io.post(io.deleteAbilityItem, {
        subjectId:this.subjectId,
        abilityItemId: abilityItemId,
      }, () => {
        this.$message('删除成功！');
        this.getAbilityConfigOfSubject();
      });
      }).catch(() => {

      });
    },
    handleAddTag(item) {
      this.newTag = ''
      this.$set(item, 'addTag', true)
    },
    handleSaveTag(item,abilityCategoryId) {
      console.log(item)
      if (this.newTag) {
        let tag={};
        tag.abilityCategoryId=abilityCategoryId;
        tag.abilityItemName=this.newTag;
        tag.score=item.score;
        this.saveOrUpdateAbilityItem(tag);
        this.newTag = ''
      }
      this.$set(item, 'addTag', false)
    },
    handleInputChange(val) {
      this.newTag = val
    },
    saveOrUpdateAbilityItem(row){
      console.log(row)
      io.post(io.saveOrUpdateAbilityItem, {
        abilityCategoryId: row.abilityCategoryId,
        abilityItemId: row.abilityItemId,
        abilityItemName:row.abilityItemName,
        score:row.score
      }, () => {
        this.$message('保存成功！');
        this.getAbilityConfigOfSubject()
      })
    },
    handleSave() {
      let data = Object.assign([], this.tableData),
        validate = true;
      data.map((val, index)=> {
        if (val.name === '') {
          validate = false
          this.$message.error('能力分类名称不能为空！')
          return
        } else {
          if (val.abilities) {
            for(let i = 0,flag=true,len=val.abilities.length;i<len;flag ? i++ : i){
              if( val.abilities[i] && val.abilities[i].tags && val.abilities[i].tags.length === 0){
                val.abilities.splice(i,1);
                flag = false;
              } else {
                flag = true;
                if (val.abilities[i]) {
                  val.abilities[i].score = i + 1
                }
              }
            }
          }
        }
        if(val.name === undefined) {
          data.splice(index , 1)
        }
      })
      if (!validate) {
        return
      }
      io.post(io.saveAbilityConfig, {
        subjectId: this.subjectId,
        configJson: JSON.stringify(data)
      }, () => {
        this.$message('保存成功！')
        this.newTag = ''
        this.addCategory = false
        this.editCategoryIndex = -1
        this.getAbilityConfigOfSubject()
      })
    },
    handleAddRow(item) {
      let score=item[item.length-1]&&item[item.length-1].score?(Number(item[item.length-1].score))+1:1;
      item.push({
          "abilityItemList" :[],
          score:score,
          newCategory: true
      });
    },
    handleAddCategory() {
       if (!this.addCategory) {
         this.tableData.splice(this.tableData.length - 1 , 0 ,{
           "abilityCategory" : {abilityCategoryName:''},
           "abilityItemList" : [],
           newCategory: true
         })

         this.addCategory = true
       }
    },
    getAbilityConfigOfSubject() {
      io.post(io.abilityOfSubject, { subjectId: this.subjectId }, (data) => {
        console.log('datadd',data)
        try{
         data.map((item)=>{
           item.abilityItemWithScoreList.map((aItem)=>{
             aItem.abilityItemList.map((alItem)=>{
               alItem.editAbility=false;
             })
           });
         });
        }catch(err){
          console.lor('err',err)
        }
        console.log(data)
        this.tableData = data
        this.tableData.push({ addCategory: true })
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.ability-radar {
  margin-top: 15px;
  background: white;
  border-bottom: 1px solid #bbdde7;
  border-left: 1px solid #bbdde7;
  .class-category {
    float: left;
    border-left: none;
  }
  .el-button--basis {
    padding: 10px 33px;
    font-size: 16px;
    margin: 30px 0;
  }
  .content {
    position: relative;
    min-height: 440px;
    margin-left: 152px;
    text-align: center;
    padding: 20px 20px 50px 20px;
    border: 1px solid #bbdde7;
    border-left: none;
    border-bottom: none;
    .el-table {
      font-size: 12px;
      .btn-edit,
      .btn-delete {
        cursor: pointer;
        color: #0084bb;
        width: 55px;
        display: inline-block;
      }
      .btn-add {
        text-align: left;
        cursor: pointer;
        height: 38px;
        line-height: 38px;
        border-left: 1px solid #bbdde7;
        padding-left: 20px;
        span {
          color: #0066d9;
          text-decoration: underline;
          font-size: 12px;
        }
        svg {
          fill: #00b1d1;
          font-size: 16px;
          vertical-align: -0.25em;
        }
      }
      .tag {
        padding: 1px 7px 1px 15px;
        margin: 5px 18px 5px 0;
        font-size: 12px;
        float: left;
        cursor: pointer;
        border: 1px solid #bbdde7;
        border-radius: 16px;
        &:hover {
          border: 1px solid #13b7d5;
          svg {
            fill: #13b7d5;
          }
        }
        svg {
          fill: #bfebf3;
          font-size: 12px;
          margin-left: 11px;
          width: 16px;
          padding: 3px 0;
          vertical-align: -0.37em;
        }
      }
      .add-tag {
        padding: 1px 10px;
        text-align: center;
        svg {
          fill: #bfebf3;
          font-size: 12px;
          margin-left: 0;
        }
      }
      .input-add-tag {
        width: 180px;
        float: left;
        margin: 5px 18px 5px 0;
        height: 28px;
        .el-input__inner {
          height: 28px;
          line-height: 28px;
        }
      }
    }
    .ability-input{
      width: 200px;
      display: inline-block;
      float: left;
      margin-right: 10px;
    }
    .ability-category-column {
      .btn-add {
        cursor: pointer;
        height: 38px;
        line-height: 38px;
        border: none;
        padding-left: 20px;
      }
      .tag {
        padding: 1px 7px 1px 15px;
        margin: 5px 18px 5px 0;
        font-size: 12px;
        cursor: pointer;
        display: inline-block;
        border: 1px solid #bbdde7;
        border-radius: 16px;
      }
      .el-input {
        width: 150px;
        margin-top: 5px;
        margin-bottom: 5px;
      }
      .add-category-input {}
    }
    .direction-icon {
      position: absolute;
      top: -10px;
      left: 550px;
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
.ability-radar {
  td.ability-category-column {
    vertical-align: top;
    .tag {
      float: none!important;
    }
    /*padding-top: 15px;*/
  }
  th.power {
    span:first-child {
      float: left;
      width: 92px;
    }
  }
  .cell {
    padding: 0;
    .row {
      width: 100%;
      overflow: hidden;
      border-left: 1px solid #bbdde7;
      border-bottom: 1px solid #bbdde7;
    }
    .row+.row {}
  }
  .score {
    float: left;
    width: 90px;
    margin-top: 7px;
  }
  .ability-content {
    padding: 0 10px;
    margin-left: 90px;
    border-left: 1px solid #bbdde7;
    overflow: hidden;
  }
  .input-add-tag {
    .el-input__inner {
      height: 28px;
      line-height:28px;
    }
  }
  thead .score {
    border-left: none;
    border-right: none;
  }
  tr:last-child {
    .score {
      border-right: none;
    }
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #fff;
  }
}
</style>
