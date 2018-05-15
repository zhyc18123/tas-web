<template>
    <div class="prepare container">
        <div class="p-img">
        <img src="../../assets/img/prepare-banner.png" alt="">
        </div>
        <div class="p-line"></div>
        <div class="condit">
            <el-tabs type="border-card">
  <el-tab-pane v-for="(item,i) in subjects" :label="item.subjectName">用户管理</el-tab-pane>
</el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    name:"PrepareLessons",
    components:{},
    data(){
        return{
            subjects:[{id:1,subjectName:'物理'},{id:2,subjectName:'数学'}]
        }
    },
    created(){

    }

}
</script>
<style lang="less" scoped>
.p-img{
    background: linear-gradient(to right,#00a1d6 0%,#00a1d6 50%,#09cfc0 51%,#09cfc0 100% );
    margin: 0 30px;
    height: 176px;
}
.p-img img{
    margin: auto;
    display: block;
}
.p-line{
    background: #007ba0;
    height: 20px;
    position: relative;
    &::before{
        content: '';
        width:0;
        height: 0;
        border-top: 20px solid #f5f8f9;
        border-right: 30px solid transparent;
        position: absolute;
        left: 0;
    }
    &::after{
        content: '';
        width:0;
        height: 0;
        border-top: 20px solid #f5f8f9;
        border-left: 30px solid transparent;
        position: absolute;
        right: 0;
    }
}
.prepare{
    padding-top: 34px;
}
</style>
<style lang="less">
.condit{
    .el-tabs__header{
        box-shadow:unset;
    }
    .el-tabs__item{
        height: 50px;
        line-height:50px;
    }
    .el-tabs--border-card>.el-tabs__header{
        background:#eee;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item{
        border:0;
        color:#007ba0;
        width:140px;
        box-sizing:border-box;
        text-align:center;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
        font-weight:bold;
    }
    .el-tabs__item{
        font-size:16px;
    }
}
</style>
