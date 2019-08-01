<template>
    <div @click="goToDetail" class="container">
        <div class="content">
            <!-- 图片 -->
            <img :src="item.imageUrl" alt="">
            <!-- 文字 -->
            <div class="title-container">
                <div>{{item.title}}</div>
                <div :class="{'hideTitle':isHideSubTitle}">{{item.subTitle}}</div>
            </div>
            <!-- 数字(这里要添加一个padding类，保证圆角好用) -->
            <div :class="['count',{'hideTitle':isHideCount}]">{{item.count}}</div>
            <!-- 箭头 -->
            <img src="/static/images/home/moreButton.png" alt="">
        </div>
        <div class="bottom-line"></div>
    </div>
</template>

<script>
    export default {
        props:{
            item:{
                type: Object,
                required:true,
                default () {
                    return {}
                }
            }
        },
        data () {
            return {
                isHideSubTitle: true,
                isHideCount:true
            };
        },
        methods: {
           goToDetail(){
               console.log('进入详情界面');
               wx.navigateTo({
                   url:'/pages/menuDetail/main'
               });
           } 
        },

        // 这个会被调用、这里判断是否需要展示副标题和数目
        beforeMount(){
            // 是否隐藏副标题
            if (this.item.subTitle == '-') {
                this.isHideSubTitle = true;
            }else{
                this.isHideSubTitle = false;
            }
            // 是否隐藏数字
            if (this.item.count == '-1') {
                this.isHideCount = true;
            }else{
                this.isHideCount = false;
            }
        },
        // 刚开始加载不会被调用
        beforeUpdate(){
            console.log('beforeUpdate');
        }
    }
</script>

<style>
    .container{
        background-color: white;
    }
    .content{
        border: 1rpx solid white;
        display: flex;
        align-items: center;   
    }
    .content > img:first-child{
        width: 90rpx;
        height: 90rpx;
        margin: 20rpx;
    }
    .title-container{
        flex-grow: 1;
    }
    .title-container > div:first-child{
        font-size: 32rpx;
        font-weight: 500;
        color: #333333;
    }
    .title-container > div:last-child{
        font-size: 28rpx;
        font-weight: 400;
        color: #999999;
    }
    .count{
        background-color: #F43530;
        color: white;
        height: 36rpx;
        min-width: 36rpx;        
        line-height: 36rpx;
        text-align: center;
        margin: 0rpx 16rpx 0rpx 16rpx;
        border-radius: 18rpx;
    }
    .content > img:last-child{
        width: 16rpx;
        height: 27rpx;
        margin-right: 24rpx;
    }
    .bottom-line{
        background-color: #EEEEEE;
        width: 100%;
        height: 2rpx;
        margin-left: 24rpx;
    }
    .hideTitle{
        opacity: 0;    
    }
</style>