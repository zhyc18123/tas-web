<template>
    <el-row class="write-tree">
        <el-col :span="10" class="write-left">
            <el-row class="condit-row">
                <el-select @change="showBySearch" v-if="lab==='jichu'" class="status" v-model="statusCondit" placeholder="全部">
                    <el-option v-for="item in selectCondit" :key="item.value" :label="item.name==='请选择'?'初始化':item.name" :value="item.editStatus">
                    </el-option>
                </el-select>
                <router-link v-show="config.knowledge_tree_item_add_custom_tree" tag="span" v-else class="add-knoledge el-button el-button-primary" :to="{path:'/main/knowledge-tree/create-special-tree',query:{treeId:id,treeName:name,activeName:lab,activeIndex:index}}">
                    新增知识点
                </router-link>
                <el-input class="search-input" @change="showBySearch" v-model="treeSearch" placeholder="请输入标题"></el-input>
                <el-button type="primary" class="show-hide" v-show="!showAll" @click="expandAll">
                    展开全部分支
                </el-button>
                <el-button type="primary" class="show-hide" v-show="showAll" @click="expandAll">
                    收起全部分支
                </el-button>
            </el-row>
            <el-row class="tree">
                <ul :id="id" class="ztree"></ul>
            </el-row>
        </el-col>
        <el-col v-if="knowledgeDetail.knowledgeTreeId" :span="14" class="write-right">
            <el-row v-if="lab==='jichu'" class="write-text">
                <el-col :span="12" class="text-left">
                    <p>录入者 ：
                        <span v-for="item in knowledgeDetail.knowledgeEditHistoryList['2']">{{item.principalName}}</span>
                    </p>
                    <p>校对者 ：
                        <span v-for="item in knowledgeDetail.knowledgeEditHistoryList['4']">{{item.principalName}}</span>
                    </p>
                    <p>审核者 ：
                        <span v-for="item in knowledgeDetail.knowledgeEditHistoryList['6']">{{item.principalName}}</span>
                    </p>
                    <p>最后操作日期 ：{{knowledgeDetail.lastOptTime | formatTime('YYYY-MM-DD H:mm')}}</p>
                </el-col>
                <el-col :span="12" class="text-right">
                    <div>
                        <p>进程状态 ：
                            <template v-for="item in selectCondit" v-if="item.editStatus===firstStatus">
                                {{item.name}}
                            </template>
                        </p>
                        <el-row v-if="firstStatus==='3'||firstStatus==='5'" class="no-pass">
                            <p>不通过原因 ：</p>
                            <p>{{knowledgeDetail.editRemark}}</p>
                        </el-row>
                    </div>
                </el-col>
            </el-row>

            <el-row class="input-div">
                <el-col :span='4' class="b-title">
                    知识点 ：
                </el-col>
                <el-col :span='24'>
                    <el-input :disabled="!(config.knowledge_tree_item_edit&&lab==='jichu')" v-model="knowledgeDetail.name" placeholder=""></el-input>
                </el-col>
            </el-row>

            <el-row class="input-div">
                <el-col :span='24' class="b-title">
                    知识点要求 ：
                </el-col>
                <el-col :span='24'>
                    <v-editor :readonly="!(config.knowledge_tree_item_edit_requirement&&lab==='jichu')" :class="{'no-write':lab!=='jichu'}" :id="'zhishiyaoqiu'+lab" v-model="knowledgeDetail.requirement"></v-editor>
                </el-col>
            </el-row>

            <el-row class="input-div">
                <el-col :span='24' class="b-title">
                    题型描述 ：
                </el-col>
                <el-col :span='24'>
                    <v-editor :readonly="!(config.knowledge_tree_item_edit_description&&lab==='jichu')" :class="{'no-write':lab!=='jichu'}" :id="'tixingmiaoshu'+lab" v-model="knowledgeDetail.testDescription"></v-editor>
                </el-col>
            </el-row>
            <el-row class="input-div">
                <el-col :span='24' class="b-title">
                    内容 ：
                </el-col>
                <el-col :span='24'>
                    <v-editor :readonly="!(config.knowledge_tree_item_edit_content&&lab==='jichu')" :class="{'no-write':lab!=='jichu'}" :id="'neirong'+lab" v-model="knowledgeDetail.content"></v-editor>
                </el-col>
            </el-row>

            <el-row class="input-div">
                <el-col :span='4' class="b-title">
                    标签 ：
                </el-col>
                <el-col :span='24'>
                    <el-checkbox-group v-model="knowledgeDetail.tags">
                        <el-checkbox :disabled="!(lab==='jichu'&&config.knowledge_tree_item_edit_tags)" :label="0">知识讲解</el-checkbox>
                        <el-checkbox :disabled="!(lab==='jichu'&&config.knowledge_tree_item_edit_tags)" :label="1" class="left30">题型总结</el-checkbox>
                        <el-checkbox :disabled="!(lab==='jichu'&&config.knowledge_tree_item_edit_tags)" :label="2" class="left30">章节</el-checkbox>
                        <el-checkbox :disabled="!(lab==='jichu'&&config.knowledge_tree_item_edit_tags)" :label="3" class="left30">标题</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>

            <el-row v-if="lab==='jichu'" class="input-div">
                <el-col :span='4' class="b-title">
                    审核状态 ：
                </el-col>
                <el-col :span='24'>
                    <el-select v-show="hasConfig" v-model="selectedEditStatus" placeholder="请选择">
                        <el-option v-for="item in knowledgeStatus" :key="item.editStatus" :label="item.name" :value="item.editStatus">
                        </el-option>
                    </el-select>
                    <span v-show="!hasConfig">
                        <span v-for="(item,index) in selectCondit" :key="index" v-if="item.editStatus===firstStatus">
                            {{item.name}}
                        </span>
                    </span>
                </el-col>
            </el-row>

            <el-row class="input-div" v-show="selectedEditStatus==='3'||selectedEditStatus==='5'">
                <el-col :span='4' class="b-title">
                    备注 ：
                </el-col>
                <el-col :span='18'>
                    <el-input v-model="knowledgeDetail.editRemark" type="textarea" autosize placeholder=""></el-input>
                </el-col>
            </el-row>

            <el-row v-if="lab==='jichu'" class="write-btn">
                <!--<el-button
                                v-if="(firstStatus==='0'||firstStatus==='1'||firstStatus==='4')&&config.knowledge_tree_item_edit_input"
                                type="primary submit" @click="saveKnowledgeNodeForBase">保存</el-button>
                                <el-button
                                v-else-if="(firstStatus==='0'||firstStatus==='1'||firstStatus==='2'||firstStatus==='4'||firstStatus==='3'||firstStatus==='6')&&config.knowledge_tree_item_edit_check"
                                type="primary submit" @click="saveKnowledgeNodeForBase">保存</el-button>-->
                <el-button type="primary submit" :disabled="!hasConfig" @click="saveKnowledgeNodeForBase">保存</el-button>
                <el-button type="primary cancle" @click="knowledgeDetail={}">取消</el-button>
            </el-row>

        </el-col>
    </el-row>
</template>

<script>

import VEditor from '../common/Editor.vue'
import util from '../../lib/util'
import io from '../../lib/io'
import { mapGetters } from 'vuex'
var _ = require('lodash');
export default {
    name: 'write-tree',
    props: ['id', 'name', 'lab', 'index'],
    components: {
        VEditor
    },
    data() {
        return {
            module: this.$store.state.knowledgeTree.treeDetail,
            knowledgeDetail: {},
            statusCondit: '',
            selectCondit: [],
            // editStatus: '',
            showAll: false,
            tree: [],
            iTree: [],
            knowledgeStatus: [],
            firstStatus: '',
            hasConfig: true,
            selectedEditStatus: '',
            treeSearch: ''
        }
    },
    mounted() {
        this.hideHead();
        util.initReEdit();
    },
    watch: {
    },
    computed: {
        config() {
            if (!this.$store.state.global.config) {
                this.$store.dispatch('config');
            };
            return this.$store.state.global.config;
        },
        ...mapGetters([
        ]),
        editStatusList() {
            if (!this.$store.state.questionBank.editStatus.length) {
                this.$store.dispatch('editStatus');
            };
            return this.$store.state.questionBank.editStatus;
        },
    },
    created() {
        // this.allNodeOfKnowledgeTree();
        this.knowledgeEditStatus();
    },
    methods: {
        clearSearch(){
this.statusCondit='';
        },
        hideHead() {
            if (this.lab !== 'jichu') {
                $('.edui-editor-toolbarbox').css({ display: 'none' });
            }
        },
        knowledgeEditStatus() {
            io.post(io.knowledgeEditStatus, {}, (data) => {
                this.selectCondit = data;
                data[1].name = '请选择'
                if (this.config.knowledge_tree_item_edit_audit) {
                    this.knowledgeStatus = data.slice(1, 8);
                } else if (this.config.knowledge_tree_item_edit_check) {
                    this.knowledgeStatus = data.slice(1, 6);
                } else {
                    this.knowledgeStatus = data.slice(1, 4);
                }
            })
        },
        allNodeOfKnowledgeTree(cb) {
            io.post(io.allNodeOfKnowledgeTree, { knowledgeTreeId: this.id }, (data) => {
                this.tree = util.mapTree(data);
                this.iTree = util.mapTree(data);
                this.initTree();
                cb && cb();
            })
        },
        showBySearch: _.debounce(function() {
            this.allNodeOfKnowledgeTree(() => {
                var treeObj = $.fn.zTree.getZTreeObj(this.id);
                let nodeList='';
                try{
                    if(!this.treeSearch){
                        nodeList=treeObj.getNodesByParam('status', this.statusCondit);
                    }else if(!this.statusCondit){
                        nodeList=treeObj.getNodesByParamFuzzy('name', this.treeSearch)
                    }else{
                let nodeListStutus =new Set( treeObj.getNodesByParam('status', this.statusCondit));
                let nodeListName = new Set(treeObj.getNodesByParamFuzzy('name', this.treeSearch));
                nodeList = Array.from(new Set([...nodeListStutus].filter(x => nodeListName.has(x))));
                    }
                this.initTree('', nodeList);
                }catch(err){
                    console.log(err)
                }
            });
        }),
        // showByName: _.debounce(function() {
        //     this.allNodeOfKnowledgeTree();
        //     setTimeout(()=>{
        //     var treeObj = $.fn.zTree.getZTreeObj(this.id);
        //     if (this.treeSearch) {
        //         let nodeList = treeObj.getNodesByParamFuzzy('name', this.treeSearch);
        //         this.initTree('', nodeList);
        //     }
        //     },500)
        // }, 600),
        saveKnowledgeNodeForBase(rename) {
            let opt = JSON.stringify(this.knowledgeDetail);
            opt = JSON.parse(opt);
            opt.knowledgeEditHistoryList = '';
            opt.editStatus = this.selectedEditStatus;
            opt.tags = JSON.stringify(opt.tags);
            if ((!opt.editStatus || opt.editStatus === '0') && !rename) {
                this.$message('请选择审核状态');
                return;
            };
            if (opt.tags.length > 4 && JSON.parse(opt.tags).length) {
                if (!opt.content) {
                    this.$message('请输入内容');
                    return;
                }
            }
            if (opt.name.length > 50) {
                this.$message('名称字数不能超过50个');
                return;
            }
            if (opt.editRemark && opt.editRemark.length > 300) {
                this.$message('备注字数不能超过300个');
                return;
            }
            io.post(io.saveKnowledgeNodeForBase, opt, (data) => {
                this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success'
                });
                this.knowledgeDetail = {};
                var treeObj = $.fn.zTree.getZTreeObj(this.id);
                var nodes = treeObj.transformToArray(treeObj.getNodes());
                nodes.map((item) => {
                    if (item.id === opt.knowledgeNodeId) {
                        item.name = opt.name;
                        treeObj.updateNode(item);
                    }
                })

            })
        },
        knowledgeNodeDetail(opt, cb) {
            io.post(io.knowledgeNodeDetail, opt, (data) => {
                data.tags = data.tags != null && data.tags != "true" ? JSON.parse(data.tags) : [];
                data.name = data.name ? data.name : '新知识点';
                data.requirement = data.requirement ? data.requirement : ' ';
                data.testDescription = data.testDescription ? data.testDescription : ' ';
                data.content = data.content ? data.content : ' ';
                this.firstStatus = data.editStatus;
                if (this.config.knowledge_tree_item_edit_audit) {
                    this.hasConfig = true;
                } else if ((this.firstStatus === '0' || this.firstStatus === '1' || this.firstStatus === '2' || this.firstStatus === '3' || this.firstStatus === '5') && this.config.knowledge_tree_item_edit_check) {
                    this.hasConfig = true;
                } else if ((this.firstStatus === '0' || this.firstStatus === '1' || this.firstStatus === '3') && this.config.knowledge_tree_item_edit_input) {
                    this.hasConfig = true
                } else {
                    this.hasConfig = false;
                }
                this.knowledgeDetail = data;
                cb && cb();
                let hasStatus = true;
                for (var i = 0; i < this.knowledgeStatus.length; i++) {
                    if (this.knowledgeStatus[i].editStatus === data.editStatus) {
                        hasStatus = true;
                        break;
                    } else {
                        hasStatus = false;
                    }
                };
                if (!hasStatus) {
                    this.selectedEditStatus = '请选择'
                } else {
                    this.selectedEditStatus = data.editStatus;
                }
            })
        },
        createEmptyKnowledgeNode(opt, cb) {
            io.post(io.createEmptyKnowledgeNode, opt, (data) => {
                cb && cb(data);
            })
        },
        expandAll() {
            this.showAll = !this.showAll;
            let treeObj = $.fn.zTree.getZTreeObj(this.id);
            treeObj.expandAll(this.showAll);
        },
        initTree(data, markList) {
            if (data) {
                this.tree = data;
            };
            let that = this;
            function onClick(event, treeId, treeNode, clickFlag) {

        if(!treeNode.pId){
          that.knowledgeDetail={};
          return;
        }
                if (treeNode.pId || that.lab !== 'jichu') {
                    that.knowledgeNodeDetail({ knowledgeNodeId: treeNode.id });
                }
            };
            var newCount = 1;
            function addHoverDom(treeId, treeNode) {
                var sObj = $("#" + treeNode.tId + "_span");
                if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
                var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
                    + "' title='添加子节点' onfocus='this.blur();'></span>";
                sObj.after(addStr);
                var btn = $("#addBtn_" + treeNode.tId);
                if (btn) btn.bind("click", function() {
                    let zTree = $.fn.zTree.getZTreeObj(that.id);
                    let obj = {};
                    obj.parentKnowledgeNodeId = treeNode.id;
                    obj.knowledgeTreeId = treeId;
                    that.createEmptyKnowledgeNode(obj, function(data) {
                        var zTree = $.fn.zTree.getZTreeObj(that.id);
                        zTree.addNodes(treeNode, { id: data.knowledgeNodeId, pId: treeNode.id, name: "新知识点" });
                    })
                    return false;
                });
            };
            function removeHoverDom(treeId, treeNode) {
                $("#addBtn_" + treeNode.tId).unbind().remove();
            };
            function showRemoveBtn(treeId, treeNode) {
                if (treeNode.pId || that.lab !== 'jichu') {
                    if (!that.config.knowledge_tree_item_del) {
                        return false;
                    };
                    return treeNode.isHover;
                }
            }
            function showRenameBtn(treeId, treeNode) {
                if (treeNode.pId || that.lab !== 'jichu') {
                    if (!that.config.knowledge_tree_item_edit) {
                        return false;
                    };
                    return treeNode.isHover;
                }
            }
            function onRemove() {

            };
            function beforeDrop(treeId, treeNodes, targetNode, moveType) {
                if (!targetNode) {
                    that.allNodeOfKnowledgeTree()
                    return
                }
                let loading
                let to = setTimeout(() => {
                    loading = that.$loading.service({ fullscreen: true });
                }, 200)

                let treeObj = $.fn.zTree.getZTreeObj(that.id);
                var num = '';
                var parentId = '';
                let targetIndex = targetNode.getIndex();
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
                    parentId = targetNode.pId;
                } else {
                    if (targetIndex > moveIndex) {
                        num = targetIndex;
                    } else {
                        num = targetIndex + 1;
                    };
                    parentId = targetNode.pId;
                }
                io.post(io.moveKnowledgeNode, {
                    toParentKnowledgeNodeId: parentId || '',
                    knowledgeNodeId: treeNodes[0].id,
                    positionOrder: num
                }, (data) => {
                    treeObj.moveNode(targetNode, treeNodes[0], moveType);
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
                return false;
            }

            function beforeRemove(treeId, treeNode) {
                that.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    io.post(io.deleteKnowledgeNode, {
                        knowledgeTreeId: that.id,
                        knowledgeNodeId: treeNode.id
                    }, (data) => {
                        $.fn.zTree.getZTreeObj(that.id).removeNode(treeNode);
                        that.knowledgeDetail.knowledgeTreeId='';
                    });
                }).catch(() => {
                    that.$message('已取消删除');
                });
                return false;
            }
            function onRename(e, treeId, treeNode) {
                if(!treeNode.name){
                    that.$message('节点名称不能为空！');
                    return;
                };
                that.knowledgeNodeDetail({ knowledgeNodeId: treeNode.id }, function(data) {
                    that.knowledgeDetail.name = treeNode.name;
                    that.saveKnowledgeNodeForBase(1);
                });
            };
            function mark(treeNode) {
                let hasMark = false;
                for (var i = 0; i < markList.length; i++) {
                    if (markList[i].id === treeNode.id) {
                        hasMark = true;
                        break;
                    } else {
                        hasMark = false;
                    }
                };
                return hasMark;
            }
            function setFontCss(treeId, treeNode) {
                return mark(treeNode) ? { color: "red" } : {};
            };
            function reMap(pId) {
                that.tree.map((item) => {
                    if (item.id === pId) {
                        item.open = true;
                        if (item.pId) {
                            reMap(item.pId);
                        }
                    }
                })
            }
            that.tree.map((item, i) => {
                if (markList) {
                    console.log(mark(item))
                    if (mark(item)) {
                        item.open = true;
                        if (item.pId) {
                            reMap(item.pId);
                        }
                        // item.getParentNode().open=true;
                    }else{
                        item.open=false;
                    }
                }
            })
            var setting = {
                view: {
                    addHoverDom: addHoverDom,
                    removeHoverDom: removeHoverDom,
                    selectedMulti: false,
                    fontCss: markList ? setFontCss : ''
                },
                edit: {
                    enable: true,
                    editNameSelectAll: true,
                    showRemoveBtn: showRemoveBtn,
                    showRenameBtn: showRenameBtn,
                    renameTitle: '重命名',
                    removeTitle: '删除节点及子节点'
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onClick: onClick,
                    onRemove: onRemove,
                    onRename: onRename,
                    beforeRemove: beforeRemove,
                    beforeDrop: beforeDrop,
                }
            };
            if (that.lab !== 'jichu' || !that.config.knowledge_tree_item_add) {
                setting.view.addHoverDom = null;
            };
            $.fn.zTree.init($("#" + this.id), setting, this.tree);
            // $.fn.zTree.getZTreeObj(this.id).expandAll(true);

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.write-tree {
    border: 1px solid #b1e0ef;
    height: auto;
}
.search-input {
    width: 120px;
}

.write-left {
    border-right: 1px solid #b1e0ef;
    background: #f8f8f8;
    height: 1333px;
}

.write-right {
    height: 1333px;
    overflow-y: auto;
}

.condit-row {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    border-bottom: 1px solid #b1e0ef;
    background: white;
    .title {
        display: inline-block;
        height: 47px;
        line-height: 47px;
        color: #005875;
        text-align: center;
        width: 127px;
        border: 1px solid #b1e0ef;
        border-bottom: 0;
        position: relative;
        top: 1px;
        background: #f8f8f8;
    }
    .status {
        margin-left: 10px;
        height: 28px;
        width: 100px;
        margin-right: 5px;
    }
    button {
        height: 28px;
        padding: 0;
        width: 120px;
        background: #78c655;
        border: 0;
    }
}

.color-row {
    height: 50px;
    line-height: 50px;
    text-align: right;
    .color-span {
        margin-right: 20px;
        span {
            display: inline-block;
            height: 16px;
            width: 30px;
            border-radius: 4px;
            position: relative;
            top: 4px;
        }
    }
    .yellow {
        background: #ff9000;
    }
    .green {
        background: #24beda;
    }
    .blue {
        background: #2c7edc;
    }
}

.ztree {
    margin: 0px 0px 0px 60px;
    padding: 30px 0;
    max-height: 1223px;
    overflow-y: auto;
}

.write-right {
    background: white;
    padding: 0 20px;
}

.write-text {
    color: #005875;
    font-size: 14px;
    padding: 10px 0 5px;
    border-bottom: 1px dashed #b1e0ef;
    p {
        line-height: 26px;
    }
}

.no-pass {
    color: #666;
    padding: 8px 10px;
    border: 1px solid #b1e0ef;
    margin-top: 8px;
    p {
        line-height: 22px;
    }
}

.input-div {
    margin: 25px 0;
    line-height: 34px;
    .b-title {
        text-align: left;
        line-height: 34px;
        color: #333;
        font-weight: bold;
    }
    .el-input {}
    .left30 {
        margin-left: 30px;
    }
}

.write-btn {
    text-align: center;
    font-size: 16px;
    margin-bottom: 30px;
    button {
        border: 0;
        width: 90px;
        height: 38px;
        padding: 0;
    }
    .submit {
        background: #00b1d1;
        border: 1px solid #00b1d1;
        margin-left: 30px;
    }
    .cancle {
        background: white;
        color: #00b1d1;
        border: 1px solid #00b1d1;
    }
}

.add-knoledge {
    background: #00c1d1;
    margin-left: 10px;
    padding: 7px 15px;
    color: white;
    border: 0;
}

.text-left {
    span {
        margin-right: 10px;
    }
}

.show-hide {
    margin-right: 10px;
    float: right;
}
</style>
<style lang="less">
.el-dialog__title {
    display: inline-block;
    min-height: 15px;
}

.condit-row {
    .el-input__inner {
        height: 28px !important;
        line-height:28px !important;
    }
}

.add-node {
    background-image: url('../../assets/img/file.png') !important;
    margin-left: 30px;
}

.edui-default.no-write {
    .edui-editor-toolbarbox {
        display: none !important;
    }
}
</style>

