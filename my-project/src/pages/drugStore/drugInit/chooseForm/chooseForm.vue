<template>
    <div class="main-view">
        <div>我是标签我是标签我是标签</div>
        <div>你是谁</div>
        <div>买东西了</div>
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
    .main-view{
        background-color: bisque;
        padding: 1rpx;
        display: flex;
        flex-wrap: wrap;
    }
    .main-view > div{
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
        margin-bottom: 10px;


        padding-left: 10px;
        padding-right: 10px;
        border-radius: 20px;
        white-space: nowrap;
        
        height: 40px;
        line-height: 40px;

        border: 1px solid blue;
        background-color: #F2F3F7;
    }

</style>