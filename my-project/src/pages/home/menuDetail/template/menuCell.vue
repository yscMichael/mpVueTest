<template>
    <div class="main-view">
        <div class="container">
            <!-- 标题部分 -->
            <div class="content">
                <!-- 主标题 -->
                <div class="title">{{ titleText }}</div>
                <!-- 副标题 -->
                <div class="subTitle">{{ subTitleText }}</div>
            </div>
            <!-- 按钮部分 -->
            <switch></switch>
        </div>
        <div class="line-view"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    props:{
        titleText:{
            type: String,
            required:true,
            default () {
                return {}
            }
        },
        subTitleText:{
            type: String,
            required:true,
            default () {
                return {}
            }
        }
    },
}
</script>

<style scoped>
    .main-view{
        background-color: white;
    }
   .container{
       background-color: white;
       padding: 15rpx 15rpx 0rpx 15rpx;
       display: flex;
       align-items: center;
   } 
   .content{
       flex-grow: 1;
   }
   .title{
       color: #333333;
       font-size: 32rpx;
       font-weight: bold;
   }
   .subTitle{
       margin-top: 10rpx;
       color: #808080;
       font-size: 24rpx;
       font-weight: 500;
   }
    .line-view{
        background-color: #DDDDDD;
        height: 2rpx;
        margin-top: 15rpx;
        margin-left: 15rpx;
    }
</style>