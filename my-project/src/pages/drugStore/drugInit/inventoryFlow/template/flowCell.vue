<template>
    <div class="main-view">
        <div class="head-view">
            <img src="/static/images/drugstore/drugInit/time.png " alt="">
            <div>2018-12-28</div>
        </div>
        <div class="content margin-top-10">
            <div>仓库：</div>
            <div>默认仓库</div>
        </div>
        <div class="content margin-top-5">
            <div>供应商：</div>
            <div>默认供应商</div>
        </div>
        <div class="content margin-top-5">
            <div>入库单号：</div>
            <div>CG-897890000012</div>
        </div>
        <div class="content margin-top-5">
            <div>失效日期：</div>
            <div>2018-12-24</div>
        </div>
        <div class="content margin-top-5">
            <div>批号：</div>
            <div>2019-12-24</div>
        </div>
        <div class="content margin-top-5">
            <div>进货单价：</div>
            <div>100000</div>
        </div>
        <div class="content margin-top-5">
            <div>入库量：</div>
            <div>12元</div>
        </div>
        <div class="content margin-top-5 text-bold">
            <div>剩余量：</div>
            <div>0</div>
        </div>
        <div class="content margin-top-5 margin-bottom-10">
            <div>操作人：</div>
            <div>12.4盒</div>
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

<style scoped>
    .main-view{
        background-color: white;
        padding: 1rpx;
        /* border: 1px solid red; */
    }
    .head-view{
        background-color: #F1F2F4;
        height: 26px;
        display: flex;
        align-items: center;
    }
    .head-view > img{
        width: 12px;
        height: 12px;
        margin-left: 12px;
    }
    .head-view > div{
        margin-left: 5px;
        color: #888888;
        font-size: 12px;
    }
    .content{
        display: flex;
        align-items: center;
    }
    .content > div:first-child{
        color: #333333;
        font-size: 15px;
        margin-left: 15px;
    }
    .content > div:last-child{
        color: #888888;
        font-size: 15px;
        text-align: right;
        flex-grow: 1;
        margin-right: 15px;
        margin-left: 5px;
    }
    .margin-top-10{
        margin-top: 10px;
    }
    .margin-top-5{
        margin-top: 5px;
    }
    .margin-bottom-10{
        margin-bottom: 10px;
    }
    .text-bold{
        font-weight: bold;
    }
</style>