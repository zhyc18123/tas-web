<template>
    <div class="personal">
        <el-row class="personal-div">
            <v-nav ref="nav" :noTab='true' />
            <div class="p-bg">
                <!-- <img src="../../assets/img/p-bg.png" alt=""> -->
            </div>
            <div>
                <router-view></router-view>
            </div>
            <v-footer></v-footer>
        </el-row>
    </div>
</template>
<script>
import VNav from '../common/Nav.vue'
import VFooter from '../common/Footer.vue'
import storage from 'lib/storage'
import io from 'lib/io'
import md5 from 'js-md5'
import {mapGetters} from 'vuex'
export default {
    components: {
        VNav,
        VFooter
    },
    computed: {

    },
    watch: {

    },
    data() {
        return {
            msg:'',
        }
    },
    created () {

    },
    methods: {

    }
}
</script>
<style lang="stylus">

</style>
<style lang="stylus" scoped>
.personal
    min-height: 100%;
    height: 100%;
    .personal-div
        width: 100%;
        background-color: #f5f8f9;
        min-height: 100%;
        .p-bg
            height 216px
            background url('../../assets/img/p-bg.png') 
        .personal-cont
            width 80%
            min-width 1200px
            margin 0 auto
            box-sizing: border-box;
            background #ffffff
            margin-top -156px
            border 1px solid #dadada
            display:  box;               /* OLD - Android 4.4- */
            display: -webkit-box;       /* OLD - iOS 6-, Safari 3.1-6 */
            display: -moz-box;          /* OLD - Firefox 19- (buggy but mostly works) */
            display: -ms-flexbox;       /* TWEENER - IE 10 */
            display: -webkit-flex;     /* NEW - Chrome */
            display: flex;
            min-height 600px
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
                        

            .info-cont
                -webkit-box-flex: 1;              /* OLD - iOS 6-, Safari 3.1-6 */
                -moz-box-flex: 1;                 /* OLD - Firefox 19- */
                -webkit-flex: 1;                     /* Chrome */
                -ms-flex: 1;                           /* IE 10 */
                flex: 1;

</style>


