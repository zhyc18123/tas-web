<template>
    <div>
        <div>
            <div class="ds-comment-header">
                <span class="ds-highlight">操作</span>
            </div>

            <div class="am-u-sm-12 am-scrollable-horizontal">
                <table width="100%" class="am-table am-table-bordered am-table-compact am-table-striped am-text-nowrap">
                    <thead>
                    <tr>
                        <th>班级名称</th>
                        <th>年级</th>
                        <th>开课日期</th>
                        <th>上课时间</th>
                        <th>讲数</th>
                        <th>起始讲数</th>
                        <th>结束讲数</th>
                        <th>学费</th>
                        <th>优惠后金额</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in tableData.regDetailVos" :key="">
                        <td>{{item.courseClass.className}}</td>
                        <td>{{item.courseClass.gradeName}}</td>
                        <td>{{item.courseClass.startCourseTime}}</td>
                        <td>{{item.courseClass.lectureAmount}}</td>
                        <td>{{item.courseClass.lectureAmount}}</td>
                        <td>{{item.studentReg.startAmount}}</td>
                        <td>{{item.studentReg.endAmount}}</td>
                        <td>{{item.courseClass.studyingFee}}</td>
                        <td>{{0}}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
            <div class="am-g am-g-fixed">
                <div class="am-u-sm-6">
                    <div class="am-form-group">
                        <label class="am-u-sm-3 am-form-label">
                            选择优惠 ：
                        </label>
                        <div class="am-u-sm-3 am-u-end input-field">
                            <select2>
                                <option value="">请选择</option>
                                <option value="1">新生优惠98折</option>
                                <option value="2">旧生立减90</option>
                            </select2>
                        </div>
                    </div>
                </div>
                <div class="am-u-sm-6">
                    <div class="am-form-group">
                        <label class="am-u-sm-3 am-form-label">
                            优惠原因 ：
                        </label>
                        <div class="am-u-sm-3 am-u-end input-field">
                            <select2>
                                <option value="">请选择</option>
                                <option value="1">新生优惠</option>
                                <option value="2">旧生优惠</option>
                                <option value="3">无原因</option>
                            </select2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="am-u-sm-12">
                <div class="am-form-group">
                    <div class="am-form-group">
                        <span class="am-form-label">
                            原价总计 ： {{0}}元
                        </span>
                        <span class="am-form-label">
                            优惠总计 ：{{0}}元
                        </span>
                        <span class="am-form-label">
                            应缴金额 ：{{0}}元
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="am-form-group">
            <label class="am-u-sm-3 am-form-label">
                实缴金额 ：
            </label>
            <div class="am-u-sm-3 am-u-end input-field">
                <input type="text"/>
            </div>
        </div>
    </div>

    </div>

    </div>
</template>

<style>
    .ds-comment-header {
        background-color: #eee;
        text-align: left;
        font-size: 30px;
        margin-bottom: 10px;
    }

    .am-form-group {
        text-align: left;
        padding-left: 10px;
        margin: 10px 0px;
        font-weight: bold;
    }

</style>

<script>
    import io from '../../lib/io'

    import Pagination from '../base/Pagination'

    export default{
        data: function () {
            return {
                tableData: [],
            }
        },

        props: ['courseOrderId'],
        created: function () {
            if (this.courseOrderId) {
                this.loadTableData(this.courseOrderId)
            }
        },
        watch: {
            courseOrderId: function (val) {
                //这样OK啦
                this.loadTableData(val)
            }
        },
        mounted: function () {
            $(window).smoothScroll()
        },
        methods: {
            loadTableData: function (courseOrderId) {
                var _this = this
                if (courseOrderId != null) {
                    io.post(io.apiAdminCourseOrderDetail, {courseOrderId: courseOrderId},
                            function (ret) {
                                if (ret.success) {
                                    alert(JSON.stringify(ret.data));
                                    _this.tableData = ret.data;
                                } else {
                                    _this.$alert(ret.desc)
                                }
                            })
                }
            }
        }
    }


</script>
