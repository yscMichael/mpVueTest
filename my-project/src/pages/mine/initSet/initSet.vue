<template>  
    <div class="container">
        <!-- 门诊 -->
        <div class="section-title">门诊</div>
        <menu-cell titleText="使用库存" subTitleText="开启后,开处方将扣减库存,库存不足需采购入库"></menu-cell>
        <menu-cell titleText="使用药品价格" subTitleText="开启后,将自动计算药品价格"></menu-cell>
        <menu-cell titleText="打印处方总价" subTitleText="开启后,处方单将会展示处方总价(实收金额)"></menu-cell>
        <menu-cell titleText="打印附加费" subTitleText="开启后,处方单将会展示附加费用"></menu-cell>
        <!-- 药房 -->
        <div class="section-title">药房</div>
        <menu-cell titleText="入库审核" subTitleText="开启后,入库将会增加审核模块"></menu-cell>
        <menu-cell titleText="打印售药单总价" subTitleText="开启后,售药单将会展示零售总价(实收金额)"></menu-cell>
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