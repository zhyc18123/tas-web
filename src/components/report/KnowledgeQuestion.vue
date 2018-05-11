<template>
    <el-row class="knowledge-question">
        <div class="tree-div">
            <div class="tree-head">
                知识点名称
                <span class="head-span">录入完成</span>
                <span class="head-span">重新录入</span>
                <span class="head-span">解析完成</span>
                <span class="head-span">重新解析</span>
                <span class="head-span">审核完成</span>
                <span class="head-span">重新审核</span>
                <span class="head-span">入库完成</span>
                <span class="head-span">不入库</span>
                <span class="head-span">总数</span>
            </div>
        </div>
        <el-row class="tree">
            <ul id="tree" class="ztree kq-tree"></ul>
        </el-row>
    </el-row>
</template>

<script>
import io from 'lib/io'
import storage from 'lib/storage'
import util from 'lib/util'
import { mapGetters } from 'vuex'
export default {
    name: 'knowledge-question',
    components: {
    },
    data() {
        return {
            msg: ''
        }
    },
    created() {
        this.$parent.activeName = '知识点题目分布表';
    },
  computed: {
    ...mapGetters(['config']),
  },
    mounted() {
        let $treeHead = $('.tree-head');
        $(window).scroll(function(event) {
            let headWidth = window.innerWidth * 0.8;
            if (headWidth < 1200) {
                headWidth = 1200
            }else{
                headWidth = headWidth-14
            };
            if ($(window).scrollTop() > 250) {
                $treeHead.css({ position: 'fixed', width: (headWidth - 51) + 'px' });
            } else {
                $treeHead.css({ position: 'relative', width: 'auto' });
            }
        });
        this.getTree();
    },
    methods: {
        async getTree() {
            let { data } = await io.post6(io.questionOfKnowledgeNode, { subjectId: storage.getSubjectId(), type: 1 });
            if (data.success) {
                this.initTree(util.mapReportTree(data.data))
            }
        },
        initTree(data) {
            console.log(data)
            let that = this;

            function addDiyDom(treeId, treeNode) {
                var aObj = $("#" + treeNode.tId + "_a");
                if ($("#diy_" + treeNode.id).length > 0) return;
                var editStr = `<div class='table-div'>
    </span><span class='diySpan' id='diy_${treeNode.id}'>${treeNode.inputCompleted}</span>
    </span><span class='diySpan' id='diy_${treeNode.id}'>${treeNode.reInput}</span>
    </span><span class='diySpan' id='diy_${treeNode.id}'>${treeNode.analyseCompleted}</span>
    </span><span class='diySpan' id='diy_${treeNode.id}'>${treeNode.reAnalyse}</span>
    </span><span class='diySpan' id='diy_${treeNode.id}'>${treeNode.auditCompleted}</span>
    </span><span class='diySpan' id='diy_${treeNode.id}'>${treeNode.reAudit}</span>
    </span><span class='diySpan' id='diy_${treeNode.id}'>${treeNode.storage}</span>
    </span><span class='diySpan' id='diy_${treeNode.id}'>${treeNode.notStorage}</span>
    </span><span class='diySpan' id='diy_${treeNode.id}'>${treeNode.total}</span>
    </div>`;
                aObj.append(editStr);
                // var btn = $("#diyBtn_"+treeNode.id);
                // if (btn) btn.bind("click", function(){alert("diy Button for " + treeNode.name);});
            };
            function onClick(e,treeId, treeNode) {
var zTree = $.fn.zTree.getZTreeObj("tree");
zTree.expandNode(treeNode);
}
            var setting = {
                view: {
                    addDiyDom: addDiyDom,
                    dblClickExpand: false
                },
                edit: {
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onClick:onClick
                }
            };
            $.fn.zTree.init($("#tree"), setting, data);

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.knowledge-question {
    // height: 100%;
    // height: 200px;
    background: white;
    margin-top: 20px;
    color: #005875;
}

.tree-div {
    height: 62px;
}
.tree-head {
    top: 0;
    z-index: 1;
    background: white; //   width: 1100px;
    height: 60px;
    line-height: 60px;
    border: 1px solid #b1e0ef;
    padding-left: 10px;
    .head-span {
        float: right;
        display: inline-block;
        width: 69px;
        height: 100%;
        text-align: center;
        border-left: 1px solid #b1e0ef;
    }
}

.kq-tree {
    // width: 1100px;
    // overflow-x: auto;
    // height: 500px;
    position: relative;
    border: 1px solid #b1e0ef;
    border-top: 0;
    background: #f8f8f8;
}
</style>
<style>

.table-div{
    position: absolute;
    right: 0;
    width: 100%;
    top: 0px;
}
.kq-tree a {
    width: calc(100% - 15px);
    padding-right: 20px;
}
.kq-tree li a:hover{
    background: rgba(0,177,209,.3);
    height: 21px;
}

.diySpan {
    float: right;
    display: inline-block;
    width: 70px;
    text-align: center;
    margin: 0 !important;
    color: #005875;
}
</style>

