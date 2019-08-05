<template>
    <div class="main-view">
        <div class="container">
            <!-- 标题部分 -->
            <div class="content">
                <!-- 主标题 -->
                <div class="title">接诊列表</div>
                <!-- 副标题 -->
                <div class="subTitle">查看历史接诊记录</div>
            </div>
            <!-- 按钮部分 -->
            <switch class="switch-button"></switch>
        </div>
        <div class="line-view"></div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    };
  }
}
</script>

<style scoped>
    .main-view{
        background-color: white;
        padding: 10rpx 10rpx 0rpx 10rpx;
    }
   .container{
       background-color: white;
       display: flex;
       align-items: center;
   } 
   .content{
       flex-grow: 1;
   }
   .title{
       color: #333333;
       font-size: 30rpx;
       font-weight: bold;
   }
   .subTitle{
       color: #808080;
       font-size: 24rpx;
       font-weight: 500;
   }
   .switch-button{
       background-color: white;
   }
    .line-view{
        background-color: black;
        height: 2rpx;
    }
</style>