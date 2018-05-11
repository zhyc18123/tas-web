<template>
    <el-row class="pop-knowledge">
        <el-row class="knowledge-body">
            <el-col :span="12">
                <el-row class="head">
        <el-select v-if="!noType" v-model="tagType" placeholder="预选标签">
          <el-option label="预选标签" value="0"></el-option>
          <el-option label="主标签" value="1"></el-option>
          <el-option label="副标签" value="2"></el-option>
        </el-select>
                <el-button type="primary" class="show-hide" v-show="!showAll" @click="expandAll">
                    展开
                </el-button>
                <el-button type="primary" class="show-hide" v-show="showAll" @click="expandAll">
                    收起
                </el-button>
                </el-row>
                <el-row class="tree">
                    <ul :id="id" :tree="tree" class="ztree"></ul>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class="head">
                    已选择知识点 ：
                    <em @click="clearTag">清空</em>
                </el-row>
                <el-row class="tag">
                    <span v-for="item in tag">
                        {{item.knowledgeName}}
                        <svg class="icon clear" aria-hidden="true" @click="deleteSelect(item.knowledgeNodeId)">
                            <use xlink:href="#icon-clear"></use>
                        </svg>
                    </span>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="knowledge-btn">
            <el-button @click="search">
                确定
            </el-button>
        </el-row>
    </el-row>
</template>

<script>
import util from '../../lib/util'
import io from '../../lib/io'
import storage from '../../lib/storage'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'pop-knowledge',
    props: ['id', 'tags','noType','kId'],
    components: {
    },
    data() {
        return {
            tagType:'0',
            name: '',
            iTree: '',
            tree: '',
            treeId: '',
            tag:this.tags,
            showAll:false
        }
    },
    created() {
        this.knowledgeTreeList();
    },
    mounted() {
        this.initTree();
    },
    computed: {
        ...mapGetters([
            'subjectId'
        ]),
    },
    methods: {
        knowledgeTreeList() {
            io.post(io.knowledgeTreeList, { subjectId: this.subjectId ? this.subjectId : storage.getSubjectId() }, (data) => {
                data.map((item) => {
                    if(this.kId){
                        if(this.kId===item.knowledgeTreeId){
                            this.treeId=item.knowledgeTreeId;
                        }
                    }else if (item.isBase === '1') {
                        this.treeId = item.knowledgeTreeId;
                    };
                });
                this.allNodeOfKnowledgeTree();
            })
        },
        allNodeOfKnowledgeTree() {
            io.post(io.allNodeOfKnowledgeTree, { knowledgeTreeId: this.treeId }, (data) => {
                this.tree = util.mapTree(data);
                this.iTree = util.mapTree(data);
                this.initTree();
            })
        },
        deleteSelect(id) {
            let dIndex = '';
            for (var i = 0; i < this.tag.length; i++) {
                if (this.tag[i].knowledgeNodeId === id) {
                    console.log(i)
                    dIndex = i;
                    break;
                }
            }
            this.tag.splice(dIndex, 1);
        },
        search() {
            if(!this.tagType){
                this.$message("请选择标签类型");
                return;
            };
            this.$emit('kSearch',this.tagType);
        },
        clearTag(){
            this.tag=[];
            this.$emit('changeTags', this.tag);
        },
        expandAll() {
            this.showAll = !this.showAll;
            let treeObj = $.fn.zTree.getZTreeObj(this.id);
            treeObj.expandAll(this.showAll);
        },
        initTree() {
            let that = this;
            function onClick(event, treeId, treeNode, clickFlag) {
                let hasNode = false;
                for (let i = 0; i < that.tag.length; i++) {
                    if (that.tag[i].knowledgeNodeId === treeNode.id) {
                        hasNode = true;
                        break;
                    } else {
                        hasNode = false;
                    }
                };
                if (!hasNode) {
                    that.tag.push({
                        knowledgeNodeId: treeNode.id,
                        knowledgeName: treeNode.name,
                        type: that.id === 'preTags' ? 0 : that.id === 'masterTags' ? 1 : that.id === 'slaveTags' ? 2 : ""
                    });
                    that.$emit('changeTags', that.tag, this.id);
                }
            }
            var setting = {
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onClick: onClick
                }
            };
            $.fn.zTree.init($("#" + this.id), setting, that.tree);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.pop-knowledge {
    background: white;

.show-hide {
    margin-top: 6px;
    float: right;
    background: #78c655;
    border: 0;
}
    .head {
        height: 48px;
        line-height: 48px;
        padding: 0 10px;
        border-bottom: 1px solid #eaeaea;
        border-right: 1px solid #eaeaea;
        color: #005875;
        font-size: 14px;
        em{
            float: right;
            font-style: normal;
            cursor: pointer;
            color: #00b1d1;
        }
        .search-input {
            height: 34px;
            border: 1px solid #eaeaea;
            border-radius: 34px;
            font-size: 14px;
            color: #999;
            margin-top: 6px;
            line-height: 34px;
            background: #f8f8f8;
            padding: 0 10px;
            .icon {
                font-size: 22px;
                color: #00b1d1;
                margin-right: 10px;
                position: relative;
                top: 3px;
            }
            input {
                height: 95%;
                width: 300px;
                border: 0;
                background: #f8f8f8;
                &:focus {
                    border: 0;
                }
            }
        }
    }
}

.knowledge-btn {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 14px;
    color: white;
    button {
        height: 28px;
        width: 90px;
        border: 1px solid #00b1d1;
        background: #00b1d1;
        padding: 0;
        color: white;
    }
    // .cancle {
    //     color: #00b1d1;
    //     margin-right: 30px;
    // }
    // .confirm {
    //     background: #00b1d1;
    // }
}

.knowledge-body {
    border-bottom: 1px solid #eaeaea;
}

.tree {
    border-right: 1px solid #eaeaea;
    background: #f8f8f8;
    height: 413px;
    overflow: scroll;
    padding: 15px;
}

.tag {
    padding: 0 20px;
    span {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        border: 1px solid #00b1d1;
        font-size: 12px;
        color: #333;
        border-radius: 28px;
        text-align: center;
        padding: 0 10px;
        margin-top: 20px;
        margin-right: 10px;
        .icon {
            color: #00b1d1;
            margin-left: 10px;
        }
    }
}
</style>
<style>

        .head .el-input{
            border: 0 !important;
        }
</style>

