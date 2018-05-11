<template>
    <el-row class="write-answer">
        <el-popover ref="popover" placement="top" width="820" trigger="click">
            <pop-ability :tag="tagList" :index="index"/>
        </el-popover>
        <el-row class="input-div no-bottom">
            <el-col :span='4' class="l-title">
                {{title}}
            </el-col>
            <el-col :span='18'>
                <v-editor  :id="id" v-model="editorText"></v-editor>
            </el-col>
        </el-row>
        <el-col v-if="config.question_item_ability_tag" :span='18' :offset="4" class="editor-bottom tag">
            <el-col class="editor-tag">
                能力标签 ：
            </el-col>
            <el-col :span="20">
            <template v-for="item in tagList">
                <template v-for="itemA in item.abilities">
                    <template v-for="itemT in itemA.tags">
                <span v-if="itemT.checkedStatus">
                    {{itemT.tagName}}
                    <svg class="icon clear" aria-hidden="true" @click="itemT.checkedStatus=false;">
                        <use xlink:href="#icon-clear"></use>
                    </svg>
                </span>
                    </template>
                </template>
            </template>
                <em v-popover:popover>
                    <svg class="icon tianjia" aria-hidden="true">
                        <use xlink:href="#icon-tianjia"></use>
                    </svg>
                    添加
                </em>

            </el-col>
        </el-col>
    </el-row>
</template>

<script>

import VEditor from '../common/Editor.vue'
import { mapActions } from 'vuex'
import PopAbility from '../common/PopAbility'
import storage from '../../lib/storage'
export default {
    name: 'write-answer',
    props: ['id', 'title', 'vtext', 'tag', 'index'],
    components: {
        VEditor,
        PopAbility
    },
    computed: {
        tagList(){
            return this.tag;
        }
    },
    watch: {
        editorText(val){
            this.$emit('textChange',val,this.index);
        }
    },
    data() {
        return {
            editorText: this.vtext,
            config: storage.getConfig(),
        }
    },
    methods: {
        ...mapActions({
            changeWrite: 'changeWrite'
        }),
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.input-div {
    margin: 25px 0;
    line-height: 34px;
    .b-title {
        text-align: right;
        line-height: 34px;
        color: #333;
        font-weight: bold;
    }
    .el-input {
        width: 50%;
    }
    .left30 {
        margin-left: 30px;
    }
}

.l-title {
    font-size: 12px;
    color: #006994;
    text-align: right;
    font-weight: bold;
}

.no-bottom {
    margin-bottom: 0;
}

.tag {
    padding: 10px 15px;
    font-size: 14px;
    border: 1px solid #bfebf3;
    border-top: 0;
    line-height: 30px;
    span {
        display: inline-block;
        height: 28px;
        border: 1px solid #bfebf3;
        line-height: 28px;
        border-radius: 28px;
        padding: 0 10px;
        margin-right: 18px;
        margin-bottom: 5px;
        font-size: 12px;
        .icon {
            cursor: pointer;
            margin-left: 10px;
            color: #bfeff3;
        }
        &:hover {
            border-color: #00b1d1;
            .icon {
                color: #3ec4dc;
            }
        }
    }
    em {
        font-size: 12px;
        color: #0066d9;
        cursor: pointer;
        .icon {
            font-size: 16px;
            color: #00b1d1;
            position: relative;
            top: 2px;
        }
    }
}

.editor-tag {
    width: 80px;
    color: #00b1d1;
    font-weight: bold;
}
</style>
