<template>
    <div class="create-special-tree container">

        <el-dialog class="knowledge" :visible.sync="dialogShow" :title="dialogDetail.name" placement="right" width="820" trigger="click">
            <el-row class="diolog-body">
                <el-row>
                    <el-col :span="4" class="title">
                        知识要求
                    </el-col>
                    <el-col :span="20" v-html="dialogDetail.requirement" class="content">
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4" class="title">
                        题型描述
                    </el-col>
                    <el-col :span="20" v-html="dialogDetail.testDescription" class="content">
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4" class="title">
                        内容
                    </el-col>
                    <el-col :span="20" v-html="dialogDetail.content" class="content">
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4" class="title">
                        标签
                    </el-col>
                    <el-col :span="20" class="content">
                        {{ dialogDetail.tags }}
                    </el-col>
                </el-row>
            </el-row>
        </el-dialog>

        <el-breadcrumb class="nav-little" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">
                <svg class="icon shouye" aria-hidden="true">
                    <use xlink:href="#icon-shouye1"></use>
                </svg>
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/main/knowledge-tree' }">
                知识树管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                新建定制知识树
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="new-tree">
            <el-col :span="12" class="new-left">
                <el-row class="title">
                    <span>
                        基础知识树
                    </span>
                    <el-button type="primary" class="show-hide" v-show="!showAll" @click="expandAll">
                        展开全部分支
                    </el-button>
                    <el-button type="primary" class="show-hide" v-show="showAll" @click="expandAll">
                        收起全部分支
                    </el-button>
                </el-row>
                <el-row>
                    <ul id="jichu" class="ztree"></ul>
                </el-row>
            </el-col>
            <el-col :span="12" class="new-right">
                <el-row class="title">
                    <span>知识树名称</span>
                    <el-input @blur="createTree" v-model="treeName" placeholder="请输入知识树名称"></el-input>
                </el-row>
                <el-row class="new-row">
                    <ul id="new-tree" class="ztree new-tree-ul"></ul>
                </el-row>
                <el-row v-if="false" class="empty">
                    请从左侧把需要的知识点拖到到这里
                </el-row>
            </el-col>
        </el-row>
        <el-row class="save">
            <el-button size="small" @click="$router.push({path:'/main/knowledge-tree',query:{activeName:activeName,activeIndex:activeIndex}});" type="primary">
                返回
            </el-button>
        </el-row>
    </div>
</template>

<script>
import WriteTree from '../common/WriteTree'
import util from '../../lib/util'
import io from '../../lib/io'
import storage from '../../lib/storage'
export default {
    name: 'create-special-tree',
    components: {
        WriteTree
    },
    data() {
        return {
            showAll: false,
            baseTree: {},
            treeId: this.$route.query.treeId,
            treeName: this.$route.query.treeName,
            activeName: this.$route.query.activeName || '',
            activeIndex: this.$route.query.activeIndex || 0,
            newTree: null,
            first: 1,
            dialogShow: false,
            dialogDetail: {}
        }
    },
    created() {
        this.knowledgeTreeList({ subjectId: this.subjectId ? this.subjectId : storage.getSubjectId() });
    },
    mounted() {
        this.first = 1;
        this.getNewTree();
    },
    methods: {
        getNewTree() {
            if (this.treeId) {
                io.post(io.allNodeOfKnowledgeTree, { knowledgeTreeId: this.treeId }, (data) => {
                    this.newTree = util.mapTree(data);
                    this.init();
                })
            }
        },
        knowledgeTreeList(opt) {
            io.post(io.knowledgeTreeList, opt, (data) => {
                this.allNodeOfKnowledgeTree({ knowledgeTreeId: data[0].knowledgeTreeId });
            })
        },
        allNodeOfKnowledgeTree(opt) {
            io.post(io.allNodeOfKnowledgeTree, opt, (data) => {
                this.baseTree = util.mapTree(data);
                this.init();
            })
        },
        knowledgeNodeDetail(opt, cb) {
            this.dialogShow = true;
            io.post(io.knowledgeNodeDetail, opt, (data) => {
                if (data.tags != null && data.tags != 'true') {
                    data.tags = JSON.parse(data.tags);
                    let tag = '';
                    let tagText = ['知识讲解', '题型总结', '章节', '标题'];
                    data.tags.map((item, i) => {
                        tag += tagText[item] + ',';
                    });
                    data.tags = tag.substring(0, tag.length - 1);
                } else {
                    data.tags = ''
                }
                data.name = data.name ? data.name : '新知识点';
                data.requirement = data.requirement ? data.requirement : ' ';
                data.testDescription = data.testDescription ? data.testDescription : ' ';
                data.content = data.content ? data.content : ' ';
                this.$set(this, 'dialogDetail', data);
            })
        },
        createTree() {
            if (!this.treeName) {
                this.$message('请输入树的名称');
                return;
            };
            if (this.treeName.length > 15) {
                this.$message('树的名称字数最多15个');
                return;
            };
            io.post(io.createOrUpdateCustomKnowledgeTree, {
                name: this.treeName,
                subjectId: this.subjectId ? this.subjectId : storage.getSubjectId(),
                knowledgeTreeId: this.treeId
            }, (data) => {
                this.treeId = data.knowledgeTreeId;
                this.$message('保存成功');
            })
        },
        expandAll() {
            this.showAll = !this.showAll;
            let treeObj = $.fn.zTree.getZTreeObj('jichu');
            treeObj.expandAll(this.showAll);
        },
        init() {
            let that = this;
            var setting = {
                edit: {
                    enable: true,
                    showRemoveBtn: false,
                    showRenameBtn: false,
                    drag: {
                        isCopy: true,
                        isMove: false
                    },
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    beforeDrop: beforeDrop,
                    onDrop: onDrop,
                    beforeRemove: beforeRemove,
                    onClick: onClick
                }
            };
            function onClick(e, treeId, treeNode) {
                if (treeNode) {
                    that.knowledgeNodeDetail({ knowledgeNodeId: treeNode.id });
                }

            }
            function onDrop(e, treeId, treeNodes, targetNode, moveType, isCopy) {
            }
            function beforeDrop(treeId, treeNodes, targetNode, moveType) {
                if (!that.treeId) {
                    that.$message('知识树不存在，请输入知识树名称');
                    return false;
                } else {

                    let loading
                    let to = setTimeout(() => {
                        loading = that.$loading.service({ fullscreen: true });
                    }, 200)
                    let treeObj = $.fn.zTree.getZTreeObj('new-tree');
                    if (treeNodes[0].rootId === 'new-tree') {
                        var num = '';
                        var parentId = '';
                        let targetIndex = targetNode && targetNode.getIndex();
                        let moveIndex = treeNodes[0].getIndex();
                        if (moveType === 'inner') {
                            num = '';
                            parentId = targetNode ? targetNode.id : '';
                        } else if (moveType === 'prev') {
                            if (targetIndex > moveIndex) {
                                num = targetIndex - 1;
                            } else {
                                num = targetIndex;
                            };
                            parentId = targetNode ? targetNode.pId : '';
                        } else {
                            if (targetIndex > moveIndex) {
                                num = targetIndex;
                            } else {
                                num = targetIndex + 1;
                            };
                            parentId = targetNode ? targetNode.pId : '';
                        }
                        io.post(io.moveKnowledgeNode, {
                            toParentKnowledgeNodeId: parentId || '',
                            knowledgeNodeId: treeNodes[0].id,
                            positionOrder: num
                        }, (data) => {
                            treeObj.moveNode(targetNode, treeNodes[0], moveType)
                            clearTimeout(to)
                            if (loading) {
                                loading.close();
                            }
                        }, (err) => {
                            clearTimeout(to)
                            if (loading) {
                                loading.close();
                            }
                        })

                    } else {
                        io.post(io.relate2BaseKnowledgeNode, {
                            knowledgeTreeId: that.treeId,
                            parentKnowledgeNodeId: targetNode ? targetNode.id : '',
                            mapKnowledgeNodeId: treeNodes[0].id
                        }, (data) => {
                            that.first = 0;
                            treeObj.addNodes(targetNode ? targetNode : null, { id: data.knowledgeNodeId, pId: data.parentKnowledgeNodeId, name: treeNodes[0].name, rootId: 'new-tree' });
                            clearTimeout(to)
                            if (loading) {
                                loading.close();
                            }
                        }, (err) => {
                            clearTimeout(to)
                            if (loading) {
                                loading.close();
                            }
                        })
                    }

                };
                return false;
            }
            function beforeRemove(treeId, treeNode) {
                let treeObj = $.fn.zTree.getZTreeObj('new-tree');
                that.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    io.post(io.deleteKnowledgeNode, {
                        knowledgeTreeId: that.treeId,
                        knowledgeNodeId: treeNode.id
                    }, (data) => {
                        that.first = 0;
                        treeObj.removeNode(treeNode);
                    });
                }).catch(() => {
                    that.$message('已取消删除');
                });
                return false;
            }

            $(document).ready(function() {
                if (that.first === 1) {
                    $.fn.zTree.init($("#jichu"), setting, that.baseTree);
                }
                setting.edit.showRemoveBtn = true;
                that.newTree && that.newTree.map((item) => {
                    item.rootId = 'new-tree';
                });
                setting.edit.drag.isCopy = false;
                setting.edit.drag.isMove = true;
                $.fn.zTree.init($("#new-tree"), setting, that.newTree || '');
                $.fn.zTree.getZTreeObj('new-tree').expandAll(true);
            });

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.knowledge-tree {}

.new-tree {
    margin: 20px;
    border: 1px solid #00b1d1;
    height: 1000px;
}

.new-left {
    height: 100%; // overflow: scroll;
    background: #f8f8f8;
    border-right: 1px solid #00b1d1;
    .title {
        span {
            display: inline-block;
            height: 47px;
            width: 157px;
            line-height: 47px;
            background: #f8f8f8;
            position: relative;
            text-align: center;
            margin-left: 10px;
            top: 12px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            border: 1px solid #00b1d1;
            border-bottom: 0;
        }
    }
}

.new-right {
    line-height: 60px;
    height: 100%;
    .el-input {
        width: 418px;
        height: 34px;
    }
    span {
        margin-left: 40px;
        margin-right: 15px;
    }
}

.title {
    height: 60px;
    border-bottom: 1px solid #00b1d1;
    background: white;
    span {
        color: #005875;
    }
    button {
        height: 28px;
        padding: 0;
        width: 120px;
        background: #78c655;
        border: 0;
        margin-top: 16px;
        float: right;
        margin-right: 20px;
    }
}

.empty {
    height: 960px;
    text-align: center;
    padding-top: 470px;
    font-size: 16px;
    color: #666;
}

.save {
    text-align: center;
    margin: 30px 0;
    button {
        background: #00b1d1;
        width: 90px;
        height: 28px;
        border: 0;
        padding: 0;
    }
}

.new-tree-ul {
    height: 100%;
    width: 100%;
}

.new-row {
    height: 100%;
}

.new-left,
.new-right {}

.ztree {
    padding: 30px 60px;
    box-sizing: border-box;
    overflow-y: scroll;
    height: 900px;
}

.diolog-body {
    background: #eefbff;
    line-height: 40px;
    font-size: 14px;
    .title {
        background: transparent;
        border-bottom: 0;
        height: 40px;
        text-align: right;
        padding-right: 20px;
    }
    .content {
        background: white;
        min-height: 40px;
        padding-left: 20px;
        color: #999;
        border-left: 1px solid #b1e0ef;
        border-bottom: 1px solid #b1e0ef;
    }
}
</style>
<style lang="less">
.knowledge {
    .el-dialog{
        padding:5px;
    }
    .el-dialog__body {
        padding: 0 !important;
        border:1px solid #3997be;
        .el-row:last-child{
            .content{
                // border-bottom:0;
            }
        }
    }
    .el-dialog__header {
        padding: 15px 15px 15px 20px;
        background: #b1e0ef;
        border:1px solid #b1e0ef;
    }
    .el-dialog__headerbtn .el-dialog__close {
        color: black;
    }
}
</style>



