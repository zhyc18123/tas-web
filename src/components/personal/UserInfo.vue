<template>
    <div class="personal">
        <el-row class="personal-div">
            <div class="personal-cont">
                <ul class="tab-info">
                    <router-link tag="li" to="/personal/user-info" class="active">
                        <svg class="icon xiala" aria-hidden="true">
                            <use xlink:href="#icon-order-mine"></use>
                        </svg>
                        我的信息
                    </router-link>
                    <router-link tag="li" to="/personal/change-password">
                        <svg class="icon xiala" aria-hidden="true">
                            <use xlink:href="#icon-xiugaimima01"></use>
                        </svg>
                        修改密码
                    </router-link>
                </ul>
                <div class="info-cont">
                    <ul class="">
                        <li class="info-item">
                            <div slot="label" class="tow-six">
                                姓<span>名：</span>
                            </div>
                            <span>{{userInfo.username}}</span>
                        </li>
                        <li class="info-item">
                            <div slot="label" class="tow-six">
                                性<span>别：</span>
                            </div>
                            <span v-if="userInfo.sex==0">男</span>
                            <span v-else-if="userInfo.sex==1">女</span>
                            <span v-else>-</span>
                        </li>
                        <li class="info-item">
                            <div slot="label" class="tow-six">
                                账<span>号：</span>
                            </div>
                            <span>{{userInfo.account}}</span>
                        </li>
                        <li class="info-item">
                            <div slot="label" class="tow-six">
                                角<span>色：</span>
                            </div>
                            <span v-for=" item in userInfo.authRoleList" :key="item.id"> {{item.roleName}} </span>
                        </li>
                        <li class="info-item">
                            <div slot="label" class="tow-six">
                                 账号创建时间：
                            </div>
                            <span>{{userInfo.createTime | formatTime}}</span>
                        </li>
                        <li class="info-item">
                            <div slot="label" class="tow-six">
                               账号到期时间：
                            </div>
                            <span>{{userInfo.endTime | formatTime}}</span>
                        </li>
                    </ul>
                    <div class="go-back">
                        <el-button @click="$router.push('/')">返回首页</el-button>
                    </div>
                </div>
            </div>
        </el-row>
    </div>
</template>
<script>
import storage from 'lib/storage'
import io from 'lib/io'
import md5 from 'js-md5'
import {mapGetters} from 'vuex'
export default {
    components: {

    },
    computed: {

    },
    watch: {

    },
    data() {
        return {
            loginInfo:storage.getCurrentUserInfo(),
            userInfo:{}
        }
    },
    created () {
        this.authUserDetail()
    },
    methods: {
        authUserDetail(){
            let param = {
                id:this.loginInfo && this.loginInfo.userId
            }
            io.post(io.authUserDetail,param,(ret)=>{
                this.userInfo = ret
                console.log(ret)
            })
        }
       
    }
}
</script>
<style lang="stylus">

</style>
<style lang="stylus" scoped>
.tow-six
    display inline-block
    span 
        margin-left 4em
.personal
    min-height: 100%;
    height: 100%;
    .personal-div
        width: 100%;
        background-color: #f5f8f9;
        min-height: 100%;
        .personal-cont
            width 80%
            min-width 1200px
            margin 0 auto
            box-sizing: border-box;
            background #ffffff
            margin-top -156px
            border 1px solid #dadada
            display: box;               /* OLD - Android 4.4- */
            display: -webkit-box;       /* OLD - iOS 6-, Safari 3.1-6 */
            display: -moz-box;          /* OLD - Firefox 19- (buggy but mostly works) */
            display: -ms-flexbox;       /* TWEENER - IE 10 */
            display: -webkit-flex;      /* NEW - Chrome */
            display: flex;   
            // min-height 600px
            .tab-info
                width 170px
                background #f9f9f9
                border-right 1px solid #dadada
                li
                    height 80px
                    font-size 18px
                    color #999999
                    line-height 80px
                    padding-left 25px
                    border-bottom 1px solid #dadada
                    cursor pointer
                    &:last-child
                        border-bottom 0 none
                    .icon
                        font-size 24px
                        color #999999
                        margin-right 14px
                    &.active
                        background #fff
                        color #333
                        width 146px
                        // border-right 1px solid #fff 
                        .icon
                            color #2bcfbb
            .go-back
                padding-top 100px
                // padding-bottom 20px
                text-align center
                .el-button
                    height 38px
                    width 100px 
                    background #00b1d1
                    color #fff  
                    border 1px solid #00b1d1        

            .info-cont
                min-height 600px
                -webkit-box-flex: 1;              /* OLD - iOS 6-, Safari 3.1-6 */
                -moz-box-flex: 1;                 /* OLD - Firefox 19- */
                -webkit-flex: 1;                     /* Chrome */
                -ms-flex: 1;                           /* IE 10 */
                flex: 1; 
                // -ms-flex-negative: 1;
                // flex-shrink: 1;
                ul
                    margin-left 30%
                    margin-top 80px
                    li
                        font-size 14px
                        color #333333
                        margin-bottom 42px

</style>


