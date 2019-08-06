<template>
    <div class="main-view"> 
        <div class="list-container">
            <img class="list-img" :src="item.imageUrl" alt="">   
            <div class="list-content">
                <div class="list-title">{{item.title}}</div>
                <div class="list-subTitle">{{item.subTitle}}</div>
            </div>   
        </div> 
        <div class="line-view"></div>
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
    };
  }
}
</script>

<style scoped>
    .list-container{
        display: flex;
        align-items: center;
        background-color: white;
        border: 1rpx solid white;
        border-radius: 5px;
    }
    .list-img{
        width: 160rpx;
        height: 160rpx;
    }
    .list-content{
        flex-grow: 1;
        margin-left: 20rpx;
    }
    .list-title{
        font-size: 34rpx;
        color: #333333;
    }
    .list-subTitle{
        margin-top: 10rpx;
        font-size: 26rpx;
        color: #666666;
    }
    .line-view{
        background-color: #F1F0F5;
        height: 20rpx;
    }
</style>