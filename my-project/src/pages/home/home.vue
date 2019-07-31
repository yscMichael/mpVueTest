<template>
    <div class="home">
        <!-- 轮播图 -->
        <div class="home-swiper-class">
            <swiper
                indicator-dots="true"
                autoplay="true"
                interval="2000"
                duration="500"
                circular="true"
                indicator-color="#FFFFFF"
                indicator-active-color="#FFA439">
                <swiper-item>
                    <img @click="clickItem" src="/static/images/carousel/1.jpg" alt="">
                </swiper-item>
                <swiper-item>
                    <img src="/static/images/carousel/2.jpg" alt="">                    
                </swiper-item>
                <swiper-item>
                    <img src="/static/images/carousel/3.jpg" alt="">
                </swiper-item>
            </swiper>
        </div>
        <!-- 分割线 -->
        <div class="line"></div>
        <!-- 有效期预警、库存预警、待办事项 -->
        <div class="warn-list">
            <home-cell :item="validity"></home-cell>
            <home-cell :item="inventory"></home-cell>
            <home-cell :item="undone"></home-cell>
        </div>
        <!-- 分割线 -->
        <div class="line"></div>
        <!-- 快捷功能 -->
        <div class="convenient-list">
            <!-- 列表 -->
            <div>
                <home-cell v-for="(item,index) in dataList" :key="index" :item="item"/>
            </div>
            <!-- 快捷功能按钮 -->
            <div class="bottom-button"></div>
        </div>
    </div>
</template>

<script>
    import homeCell from './template/homeCell'
    export default{
        components:{
            homeCell
        },
        data() {
            return {
                validity:{
                   imageUrl:'/static/images/home/validity_warn.png',
                   title:'有效期预警',
                   subTitle:'共0条预警信息',
                   count:'0'
                },
                inventory:{
                   imageUrl:'/static/images/home/inventory.png',
                   title:'库存预警',
                   subTitle:'共0条预警信息',
                   count:'0'  
                },
                undone:{
                   imageUrl:'/static/images/home/undone.png',
                   title:'待办事项',
                   subTitle:'-',
                   count:'-1'  
                },
                dataList:[
                    {
                        imageUrl:'/static/images/home/undone.png',
                        title:'待办事项',
                        subTitle:'-',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/undone.png',
                        title:'待办事项',
                        subTitle:'-',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/undone.png',
                        title:'待办事项',
                        subTitle:'-',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/undone.png',
                        title:'待办事项',
                        subTitle:'-',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/undone.png',
                        title:'待办事项',
                        subTitle:'-',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/undone.png',
                        title:'待办事项',
                        subTitle:'-',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/undone.png',
                        title:'待办事项',
                        subTitle:'-',
                        count:'-1'  
                    }
                ]
            }
        },
        methods: {
            clickItem(){
                console.log('??item');
            }
        },
    }
</script>

<style>
    .home-swiper-class{
        background-color: rgb(240, 16, 65)
    }
    .home-swiper-class swiper{
        width: 100%;
        height: 252rpx;
    } 
    .home-swiper-class swiper img{
        width: 100%;
        height: 100%;
    }
    .line{
        background-color: #F1F2F4;
        height: 20rpx;
        width: 100%;
    }
    .warn-list{
        background-color: white;
    }
    .convenient-list{
        background-color: antiquewhite;
    }
    .bottom-button{
        background-color: red;
        width: 100%;
        height: 90rpx;
    }
</style>
