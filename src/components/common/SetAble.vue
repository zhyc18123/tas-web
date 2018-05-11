<template>
    <div>
        <el-row class="set-div">
            <el-row class="set-row head">
                <el-col :span="12">
                    教师版
                </el-col>
                <el-col :span="12">
                    学生版
                </el-col>
            </el-row>
            <el-row class="set-row head-row">
                <el-col :span="12">
                    <el-col class="item-row" v-for="(sItem,i) in item.settingWithChecked.settingOfTeacher.properties" :key="i">
                        <el-checkbox v-model="sItem.checked">{{sItem.label}}</el-checkbox>
                    </el-col>
                </el-col>
                <el-col :span="12">

                    <el-col class="item-row" v-for="(sItem,i) in item.settingWithChecked.settingOfStudent.properties" :key="i">
                        <el-checkbox v-model="sItem.checked">{{sItem.label}}</el-checkbox>
                    </el-col>

                </el-col>
            </el-row>
            <el-row class="set-row head-row fan-head">
                <el-col :span="12">
                    <el-row v-model="item.settingWithChecked.tAllCheck">范式</el-row>
                </el-col>
                <el-col :span="12">
                    <el-row v-model="item.settingWithChecked.sAllCheck">范式</el-row>
                </el-col>
            </el-row>
            <el-row class="set-row fan-row">
                <el-col :span="12">
                    <el-col class="item-row" v-for="(sItem,i) in item.settingWithChecked.settingOfTeacher.spps" :key="i">
                        <el-checkbox v-model="sItem.checked">{{sItem.subjectSppName}}</el-checkbox>
                    </el-col>
                </el-col>
                <el-col :span="12">
                    <el-col class="item-row" v-for="(sItem,i) in item.settingWithChecked.settingOfStudent.spps" :key="i">
                        <el-checkbox v-model="sItem.checked">{{sItem.subjectSppName}}</el-checkbox>
                    </el-col>
                </el-col>
            </el-row>
        </el-row>
        <el-row class="pop-btn">
            <span class="sure-btn" @click="saveSeeAble(item)">确定</span>
        </el-row>
    </div>
</template>

<script>

import io from '../../lib/io'
export default {
    name: 'set-able',
    props: ['item', 'lectureNodeId','lectureNoteId', 'type'],//type==1,代表讲义设定；0，代表题目设定
    components: {
    },
    data() {
        return {
            msg: ''
        }
    },
    created() {
    },
    methods: {
        async saveSeeAble(setCheck) {
            let url, opt;
            if (this.type === '0') {
                url = io.saveLectureNodeContentQuestionSetting;
                opt = {
                    questionId: setCheck.questionId, lectureNodeId: this.lectureNodeId, settingWithChecked: JSON.stringify(setCheck.settingWithChecked)
                };
                this.savePost(url, opt);
            } else {
                this.$confirm('你所做的操作会影响该讲义的所有题目，是否确定操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    url = io.saveLectureNoteQuestionSetting;
                    opt = {
                        lectureNoteId: this.lectureNoteId, settingWithChecked: JSON.stringify(setCheck.settingWithChecked)
                    };
                    this.savePost(url, opt);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        },
        async savePost(url, opt) {
            let { data } = await io.post6(url, opt);
            if (data.success) {
                this.$message('保存成功');
                // setCheck.showPop = false;
                this.$emit('success')
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.set-able {
    display: inline-block;
}

.q-btn {
    color: #005bc2;
    position: absolute;
    right: 5px;
    button {
        border: 0;
        background: transparent;
        color: #005bc2;
    }
}

.sure-btn {
    display: inline-block;
    width: 90px;
    height: 28px;
    line-height: 28px;
    color: white;
    background-color: #00b1d1;
    border-radius: 4px;
    margin: 10px 0 5px 0;
}

.set-div {
    border: 1px solid #cceff6;
    text-align: center;
    .set-row {
        border: 1px solid #cceff6; // height: 36px;
        // padding: 8px 0;
        text-align: left; // line-height: 36px;
        &.head {
            background: #cceff6;
            text-align: center;
            height: 36px;
            line-height: 36px;
        }
        .el-row {}
    }
    .head-row {
        padding: 0; // padding-left: 38px;
        line-height: 36px;
    }
    .fan-row {
        // padding-left: 65px;
    }
}

.pop-btn {
    text-align: center;
}

.item-row {
    height: 36px;
    line-height: 36px;
    padding-left: 38px;
    border-right: 1px solid #cceff6;
    border-bottom: 1px solid #cceff6;
}

.fan-row {
    .item-row {
        padding-left: 55px;
        border-right: 1px solid #cceff6;
    }
}

.fan-head {
    height: 36px;
    border-bottom: 0 !important;
    .el-col {
        padding-left: 38px;
        border-right: 1px solid #cceff6;
    }
}

.set-row {
    .el-col:last-child {
        .item-row {
            border-right: 0;
        }
    }
    .el-col {
        .item-row:last-child {
            border-bottom: 0;
        }
    }
}
</style>
<style lang="less">
.set-div {
    .el-checkbox__label {
        font-size: 12px;
    }
}
</style>
