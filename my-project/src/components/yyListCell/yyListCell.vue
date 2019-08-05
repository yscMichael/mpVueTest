<template>
    <div class="list-container">
        <img class="list-img" src="/static/images/drugstore/drugInit.png" alt="">   
        <!-- <img class="list-img" src="/static/images/drugstore/drugInit.png" alt="">   
        <div class="list-content">
            <div class="list-title">主标题</div>
            <div class="list-subTitle">副标题</div>
        </div> -->
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
    .list-container{
        display: flex;
        align-items: center;
        border: 1rpx solid white;
        width: 100%;
        height: 100rpx;
    }
    .list-img{
        width: 80rpx;
        height: 80rpx;
    }
    .list-content{
        flex-grow: 1;
    }
    .list-title{
        background-color: green;
    }
    .list-subTitle{
        background-color: blue;
    }
</style>