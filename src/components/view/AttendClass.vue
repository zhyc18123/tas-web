<template>
    <div class="container attend-class">
        <el-breadcrumb class="nav-little" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">
                <svg class="icon shouye" aria-hidden="true">
                    <use xlink:href="#icon-shouye1"></use>
                </svg>
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                上课
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="g-search">
            <ul>
                <li>
                    <div class="search-title">
                        <label>科目：</label>
                    </div>
                    <div class="search-list">
                        <el-radio-group v-model="form.dataSubject" size="mini">
                            <el-radio-button v-for="item in condition.subjectList" :label="item.id" :key="item.id">{{item.name}}</el-radio-button>
                        </el-radio-group>
                    </div>
                </li>
                <li>
                    <div class="search-title">
                        <label>年级：</label>
                    </div>
                    <div class="search-list">
                        <el-radio-group v-model="form.gradeId" size="mini">
                            <el-radio-button v-for="item in condition.gradeObj.list" :label="item.id" :key="item.id">{{item.name}}</el-radio-button>
                        </el-radio-group>
                    </div>
                </li>
                <li>
                    <div class="search-title">
                        <label>学期：</label>
                    </div>
                    <div class="search-list">
                        <el-radio-group v-model="form.termId" size="mini">
                            <el-radio-button v-for="item in condition.termObj.list" :label="item.id" :key="item.id">{{item.name}}</el-radio-button>
                        </el-radio-group>
                    </div>
                </li>
                <!--<li>
                    <div class="search-title">
                        <label>时段：</label>
                    </div>
                    <div class="search-list">
                        <el-radio-group v-model="form.timeId" size="mini">
                            <el-radio-button :label="null">全部</el-radio-button>
                            <el-radio-button v-for="item in timelist" :label="item.id" :key="item.id">{{item.name}}</el-radio-button>
                        </el-radio-group>
                    </div>
                </li>-->
                <li>
                    <div class="search-title">
                        <label>校区：</label>
                    </div>
                    <div class="search-list">
                        <el-radio-group v-model="form.schoolId" size="mini">
                            <el-radio-button :label="null">全部</el-radio-button>
                            <el-radio-button v-for="item in school.schoolObj.list" :label="item.id" :key="item.id">{{item.name}}</el-radio-button>
                        </el-radio-group>
                    </div>
                </li>
            </ul>
        </div>
        <div class="g-table-attend">
            <el-table class="line-table" :data="classes.classObj.list" style="width: 100%" header-align="center" @row-click="handRowClick">
                <el-table-column prop="className" label="班级名称" align="center"></el-table-column>
                <el-table-column prop="section" label="年级" align="center"></el-table-column>
                <el-table-column prop="trimester" label="学期" align="center"> </el-table-column>
                <el-table-column prop="school" label="校区" align="center"> </el-table-column>
                <el-table-column prop="curriculumTime" label="开课时间" align="center"> 
                    <template scope="scope">
                        {{scope.row.openTime | formatDate('YYYY-MM-DD H:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column prop="baseLevelName" label="层级" align="center"> </el-table-column>
            </el-table>
        </div>
        <div class="g-lessons">
            <el-dialog :title="className" :visible.sync="showClassLessons" width="39%" center>
                <ul class="g-lessons-list">
                    <li v-for="(item,i) in classes.classChapterList" @click="hideDialog(item)">
                        <div class="lessons-num">
                            第 {{i+1}} 讲
                        </div>
                        <div class="lessons-title">
                            {{item.chapterName}}
                        </div>
                    </li>
                </ul>
            </el-dialog>
        </div>

    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: "AttendClass",
    components: {},
    data() {
        return {
            form: {
                gradeId: 1,
                termId: 1,
                timeId: null,
                schoolId: null,
                dataSubject:null
            },
            showClassLessons: false,
            className:''
        }
    },
    computed: {
        ...mapState(['condition','school','classes']),
    },
    watch: {
        
      'condition.subjectList'(val){
          this.form.dataSubject=val[0]&&val[0].id
      },
      'condition.gradeObj'(val){
          this.form.gradeId=val.list[0]&&val.list[0].id
      },
      'condition.termObj'(val){
          this.form.termId=val.list[0]&&val.list[0].id
      },
      'form.gradeId'(val){
          this.getClasses()
      },
      'form.termId'(val){
          this.getClasses()
      },
      'form.schoolId'(val){
          this.getClasses()
      },
      'form.dataSubject'(val){
          this.getClasses()
      },
    },
    created() {
        this.findSubjectsData()
        this.findBaseSectionPage({ pageIndex: 1, pageSize: 1000000 })
        this.findBaseTermPage({ pageIndex: 1, pageSize: 1000000 })
        this.findBaseSchoolPage({ pageIndex: 1, pageSize: 1000000 })
        this.getClasses()
    },
    methods: {
        ...mapActions(['findSubjectsData','findBaseSectionPage', 'findBaseTermPage','findBaseSchoolPage','findClassPage','lessonClassPlanChapterList']),
        getClasses(){
        this.findClassPage({ pageIndex: 1, pageSize: 1000000,baseSectionId:this.form.gradeId,baseTrimesterId:this.form.termId,schoolId:this.form.schoolId,dataSubject:this.form.dataSubject })
        },
        changeSearch(item, index, type) {
            // item:搜索项的内容
            // index:搜索项的索引
            // type:搜索类型
            if (type === "grade") {
                this.gradeNum = index
            } else if (type === "semester") {
                this.semesterNum = index
            } else if (type === "time") {
                this.timeNum = index
            } else if (type === "school") {
                this.schoolNum = index
            }
        },
        handRowClick(row, event, cloumn) {
            this.className=row.className
            this.lessonClassPlanChapterList({id:row.id})
            this.showClassLessons = true
            console.log(row, event, cloumn)
        },
        hideDialog(item){
            this.showClassLessons = false
            this.$router.push({path:'/main/attend-content/'+item.lessonId+'/'+item.chapterId,query:{lessonClassId:item.lessonClassId}})
        }
    }

}
</script>
<style lang="less" scoped>
.container {
    .nav-little {
        width: 100%;
        background: #fff;
        padding-left: 30px;
        box-sizing: border-box;
        .el-breadcrumb-item {
            font-size: 12px;
            color: #999;
            .icon {
                color: #999;
                font-size: 14px;
            }
        }
    }
    .g-search {
        width: 100%;
        background: #fff;
        padding: 0 53px;
        box-sizing: border-box;
        ul {
            li {
                min-height: 50px;
                box-sizing: border-box; // line-height:50px;
                padding: 14px 0 4px 0;
                border-bottom: 1px dashed #e5e5e5;
                display: flex;
                &:last-child {
                    border-bottom: 0 none;
                }
                .search-title {
                    width: 64px;
                    font-size: 12px;
                    line-height: 22px;
                    color: #333;
                }
                .search-list {
                    flex: 1;
                    line-height: 22px;
                }
            }
        }
    }
    .g-table-attend {
        margin-top: 20px;
        background: #fff;
        padding: 28px 54px;
        .el-table {
            .el-table-column {
                font-size: 14px;
                color: #333;
            }
        }
    }
    .g-lessons-list {
        max-height: 590px;
        overflow-y: auto;
        li {
            min-height: 50px;
            margin-top: 10px;
            background: rgba(221, 234, 238, 0.3);
            padding: 0 23px;
            color: #333;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            .lessons-num {
                width: auto;
                height: 50px;
                line-height: 50px;
            }
            .lessons-title {
                flex: 1;
                min-height: 50px;
                box-sizing: border-box;
                padding: 15px 0;
                line-height: 20px;
                padding-left: 10px;
            }
            &:hover {
                background: rgba(75, 202, 173, 0.3);
            }
        }
    }
}
</style>
<style lang="less">
.g-lessons {
    .el-dialog {
        width: 39%;
    }
    .el-dialog--center {
        .el-dialog__body {
            padding: 0;
        }
    }
}
.attend-class{
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
    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        box-shadow: 0 0 0 0;
    }
}
}
</style>
