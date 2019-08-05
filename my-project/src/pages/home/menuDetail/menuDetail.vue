<template>  
    <div class="container">
        <!-- 门诊 -->
        <div class="section-title">门诊</div>
        <menu-cell titleText="接诊列表" subTitleText="查看历史接诊记录"></menu-cell>
        <menu-cell titleText="患者列表" subTitleText="管理患者"></menu-cell>
        <menu-cell titleText="收费列表" subTitleText="当前等待收费的患者"></menu-cell>
        <menu-cell titleText="发药列表" subTitleText="当前等待发药的患者"></menu-cell>
        <!-- 药房 -->
        <div class="section-title">药房</div>
        <menu-cell titleText="采购入库" subTitleText="扫码直接入库"></menu-cell>
        <menu-cell titleText="库存查询" subTitleText="库存流水-有效期查询"></menu-cell>
        <menu-cell titleText="药品初始化" subTitleText="初始化您的药品库"></menu-cell>
        <!-- 运营分析 -->
        <div class="section-title">运营分析</div>
        <menu-cell titleText="处方收入分析" subTitleText="门诊金额-门诊毛利统计"></menu-cell>
        <menu-cell titleText="疾病数据分析" subTitleText="疾病类型比例-高频疾病统计"></menu-cell>
        <menu-cell titleText="患者分析" subTitleText="患者年龄-性别比例统计"></menu-cell>
        <menu-cell titleText="库存分析" subTitleText="有效期预警-库存预警药品统计"></menu-cell>
        <!-- 个人中心 -->
        <div class="section-title">个人中心</div>
        <menu-cell titleText="我的消息" subTitleText="系统推送的消息"></menu-cell>
        <menu-cell titleText="资讯" subTitleText="系统推送的资讯"></menu-cell>
        <menu-cell titleText="账号设置" subTitleText="管理诊所所有账号信息"></menu-cell>
        <menu-cell titleText="初始设置" subTitleText="入库审核-赊账开关设置"></menu-cell>
    </div>
</template>

<script>
import menuCell from '@/pages/home/menuDetail/template/menuCell'

export default {
    components:{
        menuCell
    },
    data () {
        return {
        };
    }
}
</script>

<style>
    .section-title{
        background-color: #EDEDF1;
        padding: 10rpx  10rpx  10rpx  20rpx;
        font-size: 24rpx;
    }
</style>