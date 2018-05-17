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
            <el-breadcrumb-item >
                
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="attend-cont">

        </div>
    </div>
</template>
<script>
export default {
    name:'',
    data(){
        return{

        }
    },
    created(){

    },
    methods:{

    }
}
</script>
<style lang="less" scoped>
.container{
    background:#fff;
    padding:0 54px 20px 54px;
    .attend-cont{
        width:100%;
        height:700px;
        background:pink;

    }
}
    
</style>



