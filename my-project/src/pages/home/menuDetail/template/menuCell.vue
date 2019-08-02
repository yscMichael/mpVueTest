<template>
    <div class="container">
        <!-- 标题部分 -->
        <div class="content">
            <!-- 主标题 -->
            <div class="title">接诊列表</div>
            <!-- 副标题 -->
            <div class="subTitle">查看历史接诊记录</div>
        </div>
        <!-- 按钮部分 -->
        <!-- <switch class="switch-button"></switch> -->
        <div class="temp">我是</div>
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

<style>
    /*  */
   .container{
       background-color: red;
       display: flex;
       align-items: center;
   } 
   .content{
       background-color: greenyellow;
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
       background-color: aqua;
   }
    .temp{
        background-color: aquamarine;
        flex: 0 0 100px;
    }
</style>