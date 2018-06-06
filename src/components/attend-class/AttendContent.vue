<template>
    <div class="container">
        <div></div>
        <el-breadcrumb class="nav-little" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">
                <svg class="icon shouye" aria-hidden="true">
                    <use xlink:href="#icon-shouye1"></use>
                </svg>
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/main/attend-class' }">
                上课
            </el-breadcrumb-item>
            <el-breadcrumb-item>

            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="attend-cont" v-if="office.token">
            <iframe class="office-word" :src="conf.ofsUrl+'office/view/'+chapterDetail.courseUrl+'?token='+office.token" frameborder="0"></iframe>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import conf from 'lib/conf'
import io from 'lib/io'
export default {
    name: '',
    data() {
        return {
            lessonId: this.$route.params.lessonId,
            id: this.$route.params.id,
            conf,
            chapterDetail:{}
        }
    },
    computed: {
        ...mapState(['office'])
    },
    watch: {
    },
    created() {
        this.detailLesChapters()
    },
    methods: {
        ...mapActions(['view']),
        async detailLesChapters() {
            let { data } = await io.post6(io.detailLesChapters, { lessonId: this.lessonId, id: this.id })
            if (data.success) {
                this.chapterDetail = data.data
                this.view({ resourceId: data.data.courseUrl })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.container {
    background: #fff;
    padding: 0 54px 20px 54px;
    .office-word{
        height: 100%;
        width: 100%;
    }
    .attend-cont {
        width: 100%;
        height: 700px;
        background: pink;
    }
}
</style>



