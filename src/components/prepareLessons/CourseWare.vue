<template>
    <div class="course-ware container">
        <div class="course-title">
            <img src="../../assets/img/to-right.png" alt=""> 2018春季物理尖子班
        </div>
        <div class="times-div">
            <div class="t-title">
                <em>第1讲</em>
                <em>长度与时间</em>
            </div>
            <span class="b-line"></span>
            <div class="c-tab" v-if="optType==='read'">
                <div class="t-ware" :class="{active:sourceType==='courseWare'}" @click="$router.push('/main/prepare-lessons/'+id+'/courseWare/read')">课件</div>
                <div class="t-lecture" :class="{active:sourceType==='lecture'}" @click="$router.push('/main/prepare-lessons/'+id+'/lecture/read')">讲义</div>
            </div>
        </div>
        <div class="opt-div">
            <div class="o-body" v-if="optType==='read'">
                <span>如需调整课件，可点击该按钮！</span>
                <img src="../../assets/img/finger.png" alt="">
                <div class="write-btn" @click="$router.push('/main/prepare-lessons/'+id+'/'+sourceType+'/edit')">自定义编辑</div>
            </div>
        </div>
        <div class="source-body" v-if="sourceType==='courseWare'">
            <iframe class="office-ppt" v-show="optType==='edit'" src="http://192.168.16.130:8080/office/edit/498bf05a504247c59b659b499745b9b0?token=MDAwMTpzMVFFRHBDaFlIVXo0SjhtNlFRSGd3QTRvaWlrOW9VZm53MlE4V2F2MUMrOE1jMmlQdm1zL1JYQkNtQlFaVzFIV3pndnJXbFNQZGhpeHpaZEp3TERlVjh6bEIrYXNmZXhBcVl0aHVWUi9saDdTSTRBS09JellXL0xMSFpaMWJjTUY1czd5ZlkyMVRmUmdnOTlQck5wREE9PQ" frameborder="0"></iframe>
            <iframe class="office-ppt edit" v-show="optType==='read'" src="http://192.168.16.130:8080/office/view/498bf05a504247c59b659b499745b9b0?token=MDAwMTpzMVFFRHBDaFlIVXo0SjhtNlFRSGd6VEYzR3JQVmtMUWpuZzhpWitUWkxkMUxWNVZpYlYyWVRlaHo2Y0kwSnQ5cXRLd2NCSm9KcElPZEdpNU93NlFHbWY1WGFmaVN1ZjBZRFVVUEcwdWFSUUZKRE83Z0NGN0N5MGl0NG11dUt5OStQZG5HTHlMS2hqY3Z4VHFlcTVrcWc9PQ" frameborder="0"></iframe>
        </div>
        <div class="source-body" v-else>
            <iframe class="office-word" v-show="optType==='edit'" src="http://192.168.16.130:8080/office/edit/2e6040b0f6f3459e91cc8f038d86253a?token=MDAwMTpzMVFFRHBDaFlIVXo0SjhtNlFRSGcwVDBvamsxSUFuMTZham43OGdwOWN0a1FieW81ZHdxdXhjOWVrYXBjVEhzbXRYQngyanBVZ2tLbWIzK3llcmd1cVVkU3pJVWVsZVZtczRxdGRtM1dGVXZ5Y1pWWExkbHJGNlROak5vL2M1YS81ZFRtUGRnTXpvM1phS2gwblhDbFE9PQ" frameborder="0"></iframe>
            <iframe class="office-word" v-show="optType==='read'" src="http://192.168.16.130:8080/office/view/2e6040b0f6f3459e91cc8f038d86253a?token=MDAwMTpzMVFFRHBDaFlIVXo0SjhtNlFRSGc4MjZ5VGdKdVQyVXVHTGVTSmV0SUFXY2VVbUhMY2hlbUh6clFQMnE5SkJPUHBYRWZxR0ZzMjk3aDlmM2JZS1dLbGhxZU92R2Q5UWN5NnVxV0d6M1c5ZnU5cGtDVVQrbW9FWGRpbUZUZ2RKL21KT0pNSlVnYmljRE1WWlJIOUFEWXc9PQ" frameborder="0"></iframe>
        </div>
    </div>
</template>
<script>
export default {
    components: {

    },
    data() {
        return {
            id: this.$route.params.id,
            sourceType: this.$route.params.sourceType,
            optType: this.$route.params.optType
        }
    },
    beforeRouteUpdate(to, from, next) {
        console.log('to', to)
        this.sourceType = to.params.sourceType
        this.optType = to.params.optType
        next()
    },
    created() {
    },
    methods: {
    }
}
</script>
<style lang="stylus" scoped>
.source-body
    widows 100%
    height auto
    // border 1px solid #bbb
    min-height 300px
    padding-bottom 30px
    .office-ppt,.office-word
        width 100%
        height 760px
.opt-div
    height auto
    min-height 30px
    .o-body
        height 58px
        display flex
        align-items center
        justify-content flex-end
        color #999
        img
            margin-right 10px
        .write-btn
            width 110px
            height 30px
            background #01cabf
            border-radius 30px
            color white
            display flex
            justify-content center
            align-items center
            cursor pointer
.course-ware
    background white
    padding 0 60px
.course-title
    height 60px
    line-height 60px
    font-size 16px
    color #333
    font-style italic 
    position relative
    
    img 
        position absolute
        left -22px
        top 22px
.times-div
    display flex
    align-items flex-end
    position relative
    font-size 16px
    .t-title
        border 2px solid #23c9b3
        border-radius 20px
        height 36px
        line-height 36px
        padding 0 20px
        color #008eba
        font-weight bold
    .b-line
        height 4px
        flex 1
        background-image linear-gradient(270deg,#009fd7 0%,#01d1bb 100%)
    .c-tab
        position absolute
        right 0
        display flex
        width 172px
        div
            flex 1
            display flex
            justify-content center
            align-items center
            height 40px
            color #999
            cursor pointer
            position relative
            &.active,&:hover
                color #ff9000
                font-weight bold
                border-bottom 4px solid #ff9000
                &:before
                    border-bottom 5px solid #ff9000
                    border-left 5px solid transparent
                    border-right 5px solid transparent
                    content ''
                    width 0
                    height 0
                    position absolute
                    bottom 0
</style>
<style lang="stylus">
#application{
    top 0px !important
}
</style>


