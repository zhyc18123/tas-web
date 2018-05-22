<template>
    <div class="prepare container">
        <div class="p-img">
            <img src="../../assets/img/prepare-banner.png" alt="">
        </div>
        <div class="p-line"></div>
        <div class="condit">
            <el-tabs type="border-card" class="t-card">
                <el-tab-pane v-for="(item,i) in subjects" :label="item.subjectName">
                    <div class="g-search">
                        <ul>
                            <li>
                                <div class="search-title">
                                    <label>年级：</label>
                                </div>
                                <div class="search-list">
                                    <el-radio-group v-model="form.gradeId" size="mini">
                                        <el-radio-button v-for="(item,index) in gradelist" :label="item.id">{{item.name}}</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </li>
                            <li>
                                <div class="search-title">
                                    <label>学期：</label>
                                </div>
                                <div class="search-list">
                                    <el-radio-group v-model="form.semesterId" size="mini">
                                        <el-radio-button v-for="(item,index) in semesterlist" :label="item.id">{{item.name}}</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </li>
                            <li>
                                <div class="search-title">
                                    <label>版本：</label>
                                </div>
                                <div class="search-list">
                                    <el-radio-group v-model="form.versionId" size="mini">
                                        <el-radio-button v-for="(item,index) in versionList" :label="item.id">{{item.name}}</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </li>
                            <li class="g-course">
                                <div class="search-title">
                                    <label>课程：</label>
                                </div>
                                <div class="search-list">
                                    <el-radio-group v-model="form.courseId" size="mini">
                                        <el-radio-button v-for="(item,index) in courseList" :label="item.id">{{item.name}}</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="t-card c-body">
            <div class="c-left">
                <line-head title="能力强化班级讲次" />
                <ul class="times-ul">
                    <router-link tag="li" :to="{path:'/main/prepare-lessons/'+item.id+'/courseWare/read'}" v-for="(item,i) in timesList">第 {{i+1}} 讲{{item.name}}</router-link>
                </ul>
            </div>
            <div class="c-right">
                <div class="c-introduce">
                    <line-head title="能力强化课程说明" />
                    <div class="i-video">
                        <d-player v-if="url" :options="{video:{url:url,pic:url+'-thumbnail-2'}}"></d-player>
                    </div>
                    <div class="i-text">
                        寒暑假，通过现象化教学预习；新课春秋，通过细化考点逐个突破同步提高。
                    </div>
                </div>
                <div class="c-data">
                    <line-head title="课程资料" />
                    <ul class="data-ul">
                        <li v-for="(item,i) in dataList">
                            <img :src="item.url" alt="">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LineHead from 'common/LineHead'
import VueDPlayer from 'vue-dplayer'
import '../../../node_modules/vue-dplayer/dist/vue-dplayer.css'
import testUrl from '../../assets/img/prepare-banner.png'
export default {
    name: "PrepareLessons",
    components: {
        LineHead,
        'd-player': VueDPlayer,
    },
    data() {
        return {
            subjects: [{ id: 1, subjectName: '物理' }, { id: 2, subjectName: '数学' }],
            gradelist: [
                {
                    id: 1,
                    name: '初二',
                },
                {
                    id: 2,
                    name: '初三',
                },
                {
                    id: 3,
                    name: '高一',
                }
            ],
            semesterlist: [
                {
                    id: 1,
                    name: "春季"
                },
                {
                    id: 2,
                    name: "夏季"
                },
                {
                    id: 3,
                    name: "秋季"
                },
                {
                    id: 4,
                    name: "冬季"
                }
            ],
            versionList: [{
                id: 1,
                name: '全国版'
            }, {
                id: 2,
                name: '人教版'
            }],
            courseList: [{
                id: 1,
                name: '2018春季物理提高班'
            }, {
                id: 2,
                name: '2018春季物理尖子班'
            }],
            timesList: [{
                id: 1,
                name: '长度与时间的测量'
            }, {
                id: 2,
                name: '长度与时间的测量'
            }, {
                id: 3,
                name: '长度与时间的测量'
            }],
            dataList: [{
                url: testUrl,
                name: '教学计划'
            }, {
                url: testUrl,
                name: '教学计划'
            }],
            url: 'http://static.yuyou100.com/0010c02a020e4e0bbe9d8b8ec1fa9cd0',
            form: {
                gradeId: '',
                semesterId: '',
                versionId: '',
                courseId: ''
            }
        }
    },
    created() {

    }

}
</script>
<style lang="less" scoped>
.times-ul {
    margin-top: 30px;
    li {
        margin-top: 8px;
        height: 50px;
        line-height: 50px;
        background: #f5f9fa;
        font-size: 16px;
        color: #333;
        padding: 0 10px;
        cursor: pointer;
        &:hover {
            background: #c9efe6;
        }
    }
}

.c-body {
    background: white;
    margin-top: 20px;
    display: flex;
    padding: 40px 35px 20px;
}

.c-left {
    flex: 1;
}

.c-right {
    width: 323px;
    margin-left: 60px;
    .i-video {
        margin-top: 30px;
        font-size: 14px;
        line-height: 20px;
        color: #333;
    }
    .i-text {
        padding: 20px;
        margin-bottom: 35px;
    }
    .data-ul {
        margin-top: 18px;
        li {
            height: 57px;
            border-bottom: 1px dashed rgba(204, 204, 204, .3);
            line-height: 57px;
            padding: 0 20px;
            display: flex;
            align-items: center;
            &:hover{
                background: #f5f9fa;
                cursor: pointer;
            }
            img {
                width: 28px;
                height: 28px;
                margin-right: 20px;
            }
            span {
                display: inline-block;
                max-width: 250px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}

.p-img {
    background: linear-gradient(to right, #00a1d6 0%, #00a1d6 50%, #09cfc0 51%, #09cfc0 100%);
    margin: 0 30px;
    height: 176px;
}

.p-img img {
    margin: auto;
    display: block;
}

.p-line {
    background: #007ba0;
    height: 20px;
    position: relative;
    &::before {
        content: '';
        width: 0;
        height: 0;
        border-top: 20px solid #f5f8f9;
        border-right: 30px solid transparent;
        position: absolute;
        left: 0;
    }
    &::after {
        content: '';
        width: 0;
        height: 0;
        border-top: 20px solid #f5f8f9;
        border-left: 30px solid transparent;
        position: absolute;
        right: 0;
    }
}

.prepare {
    padding-top: 34px;
}

.g-search {
    width: 100%;
    background: #fff;
    padding: 0 38px;
    box-sizing: border-box;
    ul {
        li {
            min-height: 50px;
            box-sizing: border-box; // line-height:50px;
            padding: 14px 0 4px 0;
            border-bottom: 1px dashed #e5e5e5;
            display: flex;

            .search-list {
                flex: 1;
                line-height: 22px;
            }
            &:last-child {
                border-bottom: 0 none;
            }
            .search-title {
                width: 64px;
                font-size: 12px;
                line-height: 22px;
                color: #333;
            }
        }
    }
}
</style>
<style lang="less">
.g-search {
    .el-radio-button__inner,
    .el-radio-button:first-child .el-radio-button__inner,
    .el-radio-button:last-child .el-radio-button__inner {
        border: 0;
        font-size: 12px;
        height: 22px;
        color: #00b099;
        margin: 0 10px 10px 0;
        padding: 0 18px;
        border-radius: 11px;
        line-height: 22px;
        display: inline-block;
        cursor: pointer;
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner,
    .el-radio-button__orig-radio+.el-radio-button__inner:hover {
        background: #23c9b3;
        color: #fff;
    }
    .el-radio-button:focus:not(.is-focus):not(:active) {
        box-shadow: unset;
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner{
        box-shadow:0 0 0 0;
    }
}

.g-course {
    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        box-shadow: unset;
    }
    .el-radio-button__orig-radio+.el-radio-button__inner {
        border: 1px solid #fff !important;
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner,
    .el-radio-button__orig-radio+.el-radio-button__inner:hover {
        background: #fff;
        color: #ff9000;
        border: 1px solid #ff9000 !important;
    }
}

.condit {
    .el-tabs__header {
        box-shadow: unset;
    }
    .el-tabs__item {
        height: 50px;
        line-height: 50px;
    }
    .el-tabs--border-card>.el-tabs__header {
        background: #eee;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item {
        border: 0;
        color: #007ba0;
        width: 140px;
        box-sizing: border-box;
        text-align: center;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
        font-weight: bold;
    }
    .el-tabs__item {
        font-size: 16px;
    }
}
</style>
