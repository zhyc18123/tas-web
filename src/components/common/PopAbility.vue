<template>
    <el-row class="pop-ability">

        <el-row v-for="(item,index) in tagList" :key="index" class="ability-row">
            <el-col :span="5" class="ability-title" @click.native="hideShow($event)">
                {{item.name}}
                <svg class="icon xiala" aria-hidden="true">
                    <use xlink:href="#icon-xiala"></use>
                </svg>
            </el-col>
            <el-col :span="19" class="ability-body">
                <el-row class="ability-item">
                    <span v-for="(itemT,i) in item.abilities" :key="i">
                        <el-col v-for="(it,iI) in itemT.tags" :key="iI" class="ability-name" :span="6">
                            <el-checkbox v-model="it.checkedStatus">{{it.tagName}}</el-checkbox>
                        </el-col>
                    </span>
                </el-row>
                <!--<template v-if="i>0">
                            <el-row class="ability-item" v-if="showMore">
                                <el-col v-for="(it,iI) in itemT" :key="iI" :span="6">
                                    <el-checkbox v-model="it.checked">{{it.name}}</el-checkbox>
                                </el-col>
                            </el-row>
                        </template>-->
            </el-col>
        </el-row>

        <!--<el-row class="ability-btn">
                <el-button type="primary cancle">取消</el-button>
                <el-button type="primary confirm">确定</el-button>
            </el-row>-->
    </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'pop-ability',
    props: ['tag', 'index'],
    components: {
    },
    data() {
        return {
            checked: true,
            showMore: true
        }
    },
    watch: {
    },
    computed: {
        ...mapGetters([
            'ability'
        ]),
        tagList() {
            return this.tag;
        }
    },
    created() {
    },
    methods: {
        hideShow(e) {
            if (this.showMore) {
                $(e.target).closest('.ability-row').css({ "height": "42px" });
            } else {
                $(e.target).closest('.ability-row').css({ "height": "auto" });
            }
            this.showMore = !this.showMore;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.pop-ability {
    // height: 100%;
    // height: 200px;
    background: white;
}

.ability-title {
    height: 100%;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    padding: 0 15px;
    .icon {
        font-size: 18px;
        color: #00b1d1;
        margin-left: 3px;
        position: relative;
        top: 12px;
        float: right;
    }
}

.ability-row {
    border-bottom: 1px solid #eaeaea;
    overflow: hidden;
    cursor: pointer;
}

.ability-item {
    height: 41px;
    line-height: 41px;
    border-bottom: 1px solid #eaeaea;
    padding-left: 15px;
    &:last-child {
        border-bottom: 0;
    }
}

.ability-body {
    border-left: 1px solid #eaeaea;
}
.ability-name{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 10px;
}
.ability-btn {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 14px;
    color: white;
    button {
        height: 28px;
        width: 90px;
        border: 1px solid #00b1d1;
        background: white;
        padding: 0;
    }
    .cancle {
        color: #00b1d1;
        margin-right: 30px;
    }
    .confirm {
        background: #00b1d1;
    }
}
</style>
