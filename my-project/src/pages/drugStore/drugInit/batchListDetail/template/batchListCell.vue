<template>
    <div class="main-view">
        <div class="line-view"></div>
        <div class="content margin-top-10">
            <div>仓库：</div>
            <div>默认仓库</div>
        </div>
        <div class="content margin-top-11">
            <div>供应商：</div>
            <div>默认供应商</div>
        </div>
        <div class="content margin-top-11">
            <div>入库单号：</div>
            <div>CG-897890000012</div>
        </div>
        <div class="content margin-top-11">
            <div>入库日期：</div>
            <div>2018-12-24</div>
        </div>
        <div class="content margin-top-11">
            <div>失效日期：</div>
            <div>2019-12-24</div>
        </div>
        <div class="content margin-top-11">
            <div>批号：</div>
            <div>100000</div>
        </div>
        <div class="content margin-top-11">
            <div>进货单价：</div>
            <div>12元</div>
        </div>
        <div class="content margin-top-11 margin-bottom-10">
            <div>数量：</div>
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
        border: 1rpx solid white;
    }
    .line-view{
        background-color: #F1F0F5;
        height: 10px;
    }
    .content{
        display: flex;
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
    .margin-top-11{
        margin-top: 5px;
    }
    .margin-bottom-10{
        margin-bottom: 10px;
    }
</style>