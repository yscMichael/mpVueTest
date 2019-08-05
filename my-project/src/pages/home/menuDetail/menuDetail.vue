<template>  
    <div class="container">
        <menu-cell></menu-cell>

        <!-- 门诊 -->
        <!-- <div class="content"> -->
            <!-- <div class="section-title">门诊</div> -->
            <!-- <menu-cell></menu-cell> -->
            <!-- <menu-cell></menu-cell>
            <menu-cell></menu-cell>
            <menu-cell></menu-cell> -->
        <!-- </div> -->
        <!-- 药房 -->
        <!-- <div class="content">
            <menu-cell></menu-cell>
            <menu-cell></menu-cell>
            <menu-cell></menu-cell>
        </div> -->
        <!-- 运营分析 -->
        <!-- <div class="content">
            <menu-cell></menu-cell>
            <menu-cell></menu-cell>
            <menu-cell></menu-cell>
            <menu-cell></menu-cell>
        </div> -->
        <!-- 个人中心 -->
        <!-- <div class="content">
            <menu-cell></menu-cell>
            <menu-cell></menu-cell>
            <menu-cell></menu-cell>
            <menu-cell></menu-cell>
        </div> -->
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
    .container{
        background-color: white;
    }
    .section-title{
        background-color: lightgrey；
    }
</style>