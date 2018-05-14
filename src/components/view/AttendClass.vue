<template>
    <div class="t-attend">
        <el-breadcrumb class="nav-little" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">
                <svg class="icon shouye" aria-hidden="true">
                    <use xlink:href="#icon-shouye1"></use>
                </svg>
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                知识树管理
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    name:"AttendClass",
    components:{},
    data(){
        return{

        }
    },
    created(){

    }

}
</script>
<style lang="less" scoped>

</style>