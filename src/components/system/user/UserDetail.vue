<template>
  <div class="user-detail">
    <line-head-form class="head" :title="title"/>
    <div v-if="!loginInfo.isSystem">
        <div class="base-info">
            <ul>
                <li>
                    <div class="info-list">
                        <div slot="label" class="tow-four">
                           用户姓名：
                        </div>
                        <span class="info">
                            {{userInfo.username}}
                        </span>
                    </div>
                    <div class="info-list">
                        <div slot="label" class="tow-four">
                           人员类型：
                        </div>
                        <span class="info" v-if="userInfo.type==1">教师 </span>
                        <span class="info" v-if="userInfo.type==2">教研 </span>
                        <span class="info" v-if="userInfo.type==3">教务 </span>
                    </div>
                </li>
                <li>
                    <div class="info-list">
                        <div slot="label" class="tow-four">
                           账<span>户：</span>
                        </div>
                        <span class="info">
                            {{userInfo.account}}
                        </span>
                    </div>
                    <div class="info-list">
                        <div slot="label" class="tow-four">
                           人员状态：
                        </div>
                        <span class="info">
                            {{userInfo.workStatus===0?'在职':'离职'}}
                        </span>
                    </div>
                </li>
                <li>

                    <div class="info-list">
                        <div slot="label" class="tow-four">
                           性<span>别：</span>
                        </div>
                        <span v-if="userInfo.sex==0">男</span>
                        <span v-else-if="userInfo.sex==1">女</span>
                        <span v-else>-</span>
                    </div>
                    <div class="info-list">
                        <div slot="label" class="tow-four">
                           任职状态：
                        </div>
                        <span class="info">
                             {{userInfo.jobStatus===0?'全职':'兼职'}}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="full-info" >
            <ul class="">
                <li class="info-item">
                    <div slot="label" class="tow-four">
                        角<span>色：</span>
                    </div>
                    <span v-for="(item,index) in userInfo.authRoleList" :key="index">
                        <i>{{item.roleName}}</i>
                    </span>
                </li>
                <li class="info-item">
                    <div slot="label" class="tow-four">
                        学<span>科：</span>
                    </div>
                    <span v-for="(item,index) in userInfo.subjectSectionList" :key="index">{{item.subjectName}}
                        (<i v-for="(grade,index) in item.sectionList" :key="index">{{grade.sectionName}}、</i>)
                    </span>
                </li>
                <!-- <li class="info-item">
                    <div slot="label" class="tow-four">
                       教研科目：
                    </div>
                    <span></span>
                </li> -->
                <li class="info-item">
                    <div slot="label" class="tow-four">
                        账号截止：
                    </div>
                    <span>{{userInfo.endTime | formatDate}}</span>
                </li>
                <li class="info-item">
                    <div slot="label" class="tow-four">
                        创建时间：
                    </div>
                    <span>{{userInfo.endTime | formatTime}}</span>
                </li>
                <li class="info-item">
                    <div slot="label" class="tow-four">
                        编辑时间：
                    </div>
                    <span>{{userInfo.updateTime | formatTime}}</span>
                </li>
            </ul>
        </div>
    </div>
        
    <div class="full-info" v-if="loginInfo.isSystem">
        <ul class="">
            <li class="info-item">
                <div slot="label" class="tow-four">
                    用户姓名：
                </div>
                <span >
                    {{userInfo.username}}
                </span>
            </li>
            <li class="info-item">
                <div slot="label" class="tow-four">
                    账<span>户：</span>
                </div>
                <span >
                    {{userInfo.account}}
                </span>
            </li>
            <li class="info-item">
                <div slot="label" class="tow-four">
                    角<span>色：</span>
                </div>
                <span v-for="(item,index) in userInfo.authRoleList" :key="index">
                    <i>{{item.roleName}}</i>
                </span>
            </li>
            <li class="info-item">
                <div slot="label" class="tow-four">
                    账号截止：
                </div>
                <span>{{userInfo.endTime | formatDate}}</span>
            </li>
            <li class="info-item">
                <div slot="label" class="tow-four">
                    创建时间：
                </div>
                <span>{{userInfo.endTime | formatTime}}</span>
            </li>
            <li class="info-item">
                <div slot="label" class="tow-four">
                    编辑时间：
                </div>
                <span>{{userInfo.updateTime | formatTime}}</span>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import io from '../../../lib/io'
import storage from '../../../lib/storage'
import LineHeadForm from '../../common/LineHeadForm'
import md5 from 'js-md5'
import { mapState, mapActions } from 'vuex'
export default {
    components: {
        LineHeadForm,
    },
    data() {
        return {
            loginInfo:storage.getCurrentUserInfo(),
            title:'账号详情',
            userInfo:{},
        
        }
    },
    created() {
        if (this.$route.query.userId) {
        this.userId = this.$route.query.userId
        this.getUserDetail()
        }
    },
    computed:{
    },
    methods: {
        getUserDetail(){
            this.userInfo = {}
            io.post(io.authUserDetail, { id: this.userId }, (data) => {
                this.userInfo = data
                console.log(data)
            })
        }
    },
    watch:{

    }
    }
</script>

<style lang="stylus" scoped>
.user-detail
    padding-bottom 100px
    .head
        margin-top 10px
        margin-bottom 30px
    .base-info
        width 81%
        margin 0 auto
        background rgba(230, 236, 238, 0.4)
        margin-bottom 20px
        ul
            display flex
            li
                flex 1
                padding 32px 0 37px 63px
                font-size 14px
                color #333
                .info-list
                    margin-bottom 38px
                .info-list:last-child
                    margin-bottom 0
    .full-info
        width 81%
        margin 0 auto
        box-sizing border-box
        padding 31px 0 37px 63px
        background rgba(230, 236, 238, 0.4)
        margin-bottom 20px
        .info-item
            margin-bottom 38px
            i
                font-style normal
  

</style>

