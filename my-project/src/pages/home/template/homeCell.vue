<template>
    <div class="container">
        <!-- 图片 -->
        <img src="/static/images/home/validity_warn.png" alt="">
        <!-- 文字 -->
        <div class="title-container">
            <div>有效期预警</div>
            <div>共12条预警信息</div>
        </div>
        <!-- 数字(这里要添加一个padding类，保证圆角好用) -->
        <div class="count">1</div>
        <!-- 箭头 -->
        <img src="/static/images/home/moreButton.png" alt="">
    </div>
</template>

<script>
    export default {
        props:[
            'imageUrl',
            'title',
            'subTitle',
            'count'
        ],
        data () {
            return {
            };
        }
    }
</script>

<style>
    .container{
        border: 1rpx solid blue;
        display: flex;
        align-items: center;
    }
    .container > img:first-child{
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
    .container > img:last-child{
        width: 16rpx;
        height: 27rpx;
        margin-right: 24rpx;
    }

</style>