<template>
    <div>
        <!-- 进货价 -->
        <div class="head-title-view">
            <div></div>
            <div class="head-title">进货价</div>
            <div></div>
        </div>
        <div class="content-view">
            <div>按包装单位</div>
            <div class="grow-div"></div>
            <input type="text">
            <div>元/盒</div>
        </div>
        <!-- 处方价 -->
        <div class="head-title-view margin-top-10">
            <div></div>
            <div class="head-title">处方价</div>
            <div></div>
        </div>
        <div class="content-view">
            <div>按包装单位</div>
            <div class="grow-div"></div>
            <input type="text">
            <div>元/盒</div>
        </div>
        <div class="content-view">
            <div>按拆零单位</div>
            <div class="grow-div"></div>
            <input type="text">
            <div>元/袋</div>
        </div>
        <!-- 零售价 -->
        <div class="head-title-view margin-top-10">
            <div></div>
            <div class="head-title">零售价</div>
            <div></div>
        </div>
        <div class="content-view">
            <div>按包装单位</div>
            <div class="grow-div"></div>
            <input type="text">
            <div>元/盒</div>
        </div>
        <div class="content-view">
            <div>按拆零单位</div>
            <div class="grow-div"></div>
            <input type="text">
            <div>元/袋</div>
        </div>

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
    .head-title-view{
        height:36px;
        line-height:36px;
        color:#888888;
        font-size:17px;
        background-color: #F1F2F4;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .head-title{
        color: #888888;
        font-size:17px;
        margin-left:5px;
        margin-right:5px;
    }
    .head-title-view > div:first-child{
        background-color: #D0D0D0;
        width: 10px;
        height:1px;
    }
    .head-title-view > div:last-child{
        background-color: #D0D0D0;
        width: 10px;
        height:1px;
    }
    .content-view{
        height:45px;
        background-color: white;
        display: flex;
        align-items: center;
    }
    .content-view > div:first-child{
        color: #888888;
        font-size: 15px;
        margin-left:12px;
    }
    .content-view > div:last-child{
        color:#333333;
        font-size: 15px;
        margin-right:12px;
    }
    .content-view > input{
        width:66px;
        height:30px;
        margin-right: 5px;
        background-color: #ECECEC;
    }
    .grow-div{
        flex-grow: 1;
    }
    .margin-top-10{
        margin-top:10px;
    }
    .subTitle-view{

    }
</style>