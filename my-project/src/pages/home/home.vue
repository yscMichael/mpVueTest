<template>
    <div class="home">
        <!-- ????? -->
        <div class="home-swiper-class">
            <swiper
                :indicator-dots="isShowDots"
                :autoplay="isAutoplay"
                :interval="interval"
                :duration="duration"
                :circular="isCircular"
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
        <!-- ??? -->
        <div class="line"></div>
        <!-- ??????????????? -->
        <div class="warn-list">
            <home-cell></home-cell>
        </div>
        <!-- ??? -->
        <div class="line"></div>
        <!-- ?????? + ?? -->
        <div class="convenient-list">

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
                isShowDots: true,
                isAutoplay: true,
                interval: 2000,
                duration: 500,
                isCircular: true
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
    .warn-list 

    .convenient-list{
        background-color: antiquewhite;
    }
</style>
