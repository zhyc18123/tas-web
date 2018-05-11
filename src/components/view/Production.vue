<template>
    <div :span="20" :offset="2" class="production container">
        <el-breadcrumb class="nav-little" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">
                <svg class="icon shouye" aria-hidden="true">
                    <use xlink:href="#icon-shouye1"></use>
                </svg>
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                产品管理
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="tabs">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="讲义管理" name="teaching">
                  <teaching ref="teaching"/>
                </el-tab-pane>
                <el-tab-pane v-if="false" label="课件管理" name="kejian">
                  <div>dd</div>
                </el-tab-pane>
            </el-tabs>
        </el-row>
    </div>
</template>

<script>
import Teaching from '../production/Teaching'
import { mapGetters } from 'vuex'
import util from '../../lib/util'
import io from '../../lib/io'
import storage from '../../lib/storage'
export default {
    name: 'production',
    components: {
        Teaching
    },
    data() {
        return {
            activeName: this.$route.query.activeName || 'teaching',
        }
    },
    created() {
        window.addEventListener('keyup',(e)=>{
            console.log(e)
            if(e.keyCode===13){
                this.$refs.teaching.lectureNoteList();
            }
        })
    },
    computed: {
        config() {
            if (!this.$store.state.global.config) {
                this.$store.dispatch('config');
            };
            return this.$store.state.global.config;
        },
    },
    mounted() {
    },
    methods: {

        handleClick(tab) {
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.nav-title{
    background: white;
}
.tabs {
    position: relative;
}

.create {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    position: absolute;
    right: 20px;
    top: -1px;
    width: 130px;
    span {
        display: inline-block;
        height: 32px;
        border-radius: 32px;
        line-height: 32px;
        margin-top: 8px;
        width: 130px;
        background: white;
        font-size: 12px;
        color: #005875;
        text-align: center;
        cursor: pointer;
    }
}

</style>
<style lang="less">
.tabs {
    .el-tabs__header {
        background: #b1e0ef;
        margin: 0;
        padding-top: 12px;
        padding-left: 20px;
        padding-right: 200px;
    }
    .el-tabs__item {
        height: 38px;
        line-height: 36px;
        margin-right: 5px;
        background: #31a5cb;
        color: white;
    }
    .el-tabs__content {
        background: white;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
        background: white;
        color: #005875;
    }
}
</style>


