<template>
    <div :span="20" :offset="2" class="knowledge-tree container">
        <el-breadcrumb class="nav-little" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">
                <svg class="icon shouye" aria-hidden="true">
                    <use xlink:href="#icon-shouye1"></use>
                </svg>
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                知识树管理
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row v-show="treeList.length" class="tabs">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane v-for="(item,index) in treeList" :key="index" :label="item.name" :name="index===0?'jichu':'dingzhi'+index">
                    <write-tree class="tree" ref="write-tree" :name="item.name" :lab="index===0?'jichu':'dingzhi'+index" :index="index" :id="item.knowledgeTreeId" />
                </el-tab-pane>
            </el-tabs>
            <el-col v-if="activeName==='jichu'&&config.knowledge_tree_item_add_custom_tree" class="create">
                <router-link to="knowledge-tree/create-special-tree" tag="span">
                    <svg class="icon jiahao" aria-hidden="true">
                        <use xlink:href="#icon-jiahao"></use>
                    </svg>
                    新建定制知识树
                </router-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import WriteTree from '../common/WriteTree'
import { mapGetters } from 'vuex'
import util from '../../lib/util'
import io from '../../lib/io'
import storage from '../../lib/storage'
export default {
    name: 'knowledge-tree',
    components: {
        WriteTree
    },
    data() {
        return {
            activeName: this.$route.query.activeName || 'jichu',
            treeList: [],
            activeIndex: this.$route.query.activeIndex || 0,
            subjectId:storage.getSubjectId(),
            lastTap:''
        }
    },
    created() {
        this.knowledgeTreeList({ subjectId: this.subjectId });
    },
    computed: {
        config() {
            if (!this.$store.state.global.config) {
                this.$store.dispatch('config');
            };
            return this.$store.state.global.config;
        },
    },
    mounted() {
    },
    methods: {

        knowledgeTreeList(opt) {
            io.post(io.knowledgeTreeList, opt, (data) => {
                this.allNodeOfKnowledgeTree({ knowledgeTreeId: data[this.activeIndex].knowledgeTreeId }, this.activeIndex);
                this.treeList = data;
            })
        },
        allNodeOfKnowledgeTree(opt, index) {
            io.post(io.allNodeOfKnowledgeTree, opt, (data) => {
                data = util.mapTree(data);
                this.$refs['write-tree'][index].initTree(data)
            })
        },
        handleCurrentChange() {
        },
        handleClick(tab) {
            if(this.lastTap!==tab){
            this.allNodeOfKnowledgeTree({ knowledgeTreeId: this.treeList[tab.index].knowledgeTreeId }, tab.index);
            this.$refs['write-tree'][tab.index].clearSearch();
        }
        this.lastTap=tab;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.knowledge-tree {
    margin: auto;
    background: white;
}


.tabs {
    position: relative;
}

.create {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    position: absolute;
    right: 20px;
    top: -1px;
    width: 130px;
    span {
        display: inline-block;
        height: 32px;
        border-radius: 32px;
        line-height: 32px;
        margin-top: 8px;
        width: 130px;
        background: white;
        font-size: 12px;
        color: #005875;
        text-align: center;
        cursor: pointer;
    }
}

.tree {
    margin: 20px;
}
</style>
<style lang="less">
.tabs {
    .el-tabs__header {
        background: #b1e0ef;
        margin: 0;
        padding-top: 12px;
        padding-left: 20px;
        padding-right: 200px;
    }
    .el-tabs__item {
        height: 38px;
        line-height: 36px;
        margin-right: 5px;
        background: #31a5cb;
        color: white;
    }
    .el-tabs__content {
        background: white;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
        background: white;
        color: #005875;
    }
}
</style>


