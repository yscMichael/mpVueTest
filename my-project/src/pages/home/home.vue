<template>
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
                <img src="/static/images/carousel/1.jpg" alt="">
            </swiper-item>
            <swiper-item>
                <img src="/static/images/carousel/2.jpg" alt="">                    
            </swiper-item>
            <swiper-item>
                <img src="/static/images/carousel/3.jpg" alt="">
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                isShowDots: true,
                isAutoplay: true,
                interval: 2000,
                duration: 500,
                isCircular: true
            }
        }
    }
</script>

<style>
    .home-swiper-class{
        background-color: rgb(240, 16, 65)
    }
    .home-swiper-class swiper{
        width: 100%;
        height: 150px;
    } 
    .home-swiper-class swiper img{
        width: 100%;
        height: 100%;
    }
</style>
