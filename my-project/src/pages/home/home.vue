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
        <!-- 分割线 -->
        <div class="line"></div>
        <!-- 有效期预警、库存预警、待办事项 -->
        <div class="warn-list">
            <home-cell @click="testClick" :item="validity"></home-cell>
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
            <div class="bottom-button">
                <img src="/static/images/home/functionAddButton.png" alt="">
                <span>添加快捷功能</span>
            </div>
        </div>
    </div>
</template>

<script>
    import homeCell from '@/pages/home/template/homeCell'
    import yyRefresh from '@/components/yyRefresh/yyRefresh'
    import homeJs from '@/pages/Tool/api/home/homeJs'

    export default{
        components:{
            homeCell,
            yyRefresh
        },
        data() {
            return {
                validity:{},
                inventory:{},
                undone:{},
                dataList:[]
            }
        },
        methods: {
            showTitle(){
                console.log('2秒以后');
                wx.showToast({
                    title: "网络请求失败",
                });
            },
            testClick(){
                console.log('点击testClick');
            }
        },
        created() {
            console.log('created');
            // 初始化数据
            this.validity = homeJs.getValidityInitData();
            this.inventory = homeJs.getInventoryInitData();
            this.undone = homeJs.getUndoneInitData();
            this.dataList = homeJs.getFastListData();
        },
        beforeMount(){
            // console.log('beforeMount');
            // wx.showLoading({
            //      title: '正在登陆中....',
            //  });
            // setTimeout(this.showTitle,2000);

            // wx.showLoading({
            //     title: '正在登陆中....',
            // });
            // setTimeout(this.showTitle,2000);

            // this.$fly.get(Login_URL)
            // .then(function(response){
            //     console.log(response.data);
            // })
            // .catch(function(error){
            //     console.log(error);
            // });
            // 测试外部方法
            // test();
            // loginRequest.loginRequest();
        },
        mounted() {
          console.log('mounted')  
        }
    }
</script>

<style>
    .home{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }

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
        background-color: #F1F2F4;
        width: 100%;
        height: 90rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .bottom-button img{
        width: 32rpx;
        height: 32rpx;
    }
    .bottom-button span{
        color: #888888;
        font-size: 28rpx;
        font-weight: 500;
        margin-left: 9rpx;
    }
</style>
