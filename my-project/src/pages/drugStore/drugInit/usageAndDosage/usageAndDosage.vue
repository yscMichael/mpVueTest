<template>
    <div class="main-view">
        <!-- 总 -->
        <div class="head-view">{{ headTitle }}</div>
        <!-- 用法 -->
        <div class="common-view">
            <div>用法：</div>
            <div>口服</div>
        </div>
        <div class="usage-frequency-view">

        </div>
        <!-- 频率 -->
        <div class="common-view">
            <div>频率：</div>
            <div>一日3次</div>
        </div>
        <div class="usage-frequency-view">

        </div>
        <div class="line-big"></div>
        <!-- 单次用量 -->
        <div class="single-view">
            <div>单次用量：</div>
            <div>每次</div>
            <input class="count-input-view" type="text" value="5">
            <div>片</div>
            <div class="arrow-margin arrow-bottom"></div>
            <div class="grow-div"></div>
            <div class="frame"></div>
            <div>每次适量</div>
        </div>
        <div class="line-big"></div>
        <!-- 用药天数 -->
        <div class="day-view">
            <div>用药天数：</div>
            <input class="count-input-view" type="text" value="5">
            <div>天</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        headTitle:'口服；一日3次；每次5片；用药3天',
        usageDataSource:[],
        frequencyDataSource:[]
    };
  }
}
</script>

<style>
    .main-view{
        background-color: white;
    }
    .head-view{
        height: 60px;
        line-height: 60px;
        color: #333333;
        font-size: 18px;
        font-weight:bold;
        text-align: center;
        background-color: white;
    }
    .common-view{
        height: 41px;
        background-color: #F1F2F4;
        display: flex;
        align-items: center;
    }
    .common-view > div:first-child{
        margin-left: 12px;
        color: #888888;
        font-size: 18px;
    }
    .common-view > div:last-child{
        margin-left: 5px;
        color: #333333;
        font-size: 18px;
        font-weight:bold;
    }
    .usage-frequency-view{
        background-color: white;
        height: 170px;
    }
    .single-view{
        height: 66px;
        display: flex;
        align-items: center;
    }
    .single-view > div:first-child{
        color: #888888;
        font-size:18px;
        margin-left:12px;
    }
    .count-input-view{
        background-color: #F2F2F2;
        width: 71px;
        height: 40px;
        text-align: center;
        color: #333333;
        font-size: 18px;
        font-weight:bold;
        margin-left:5px;
        margin-right:5px;
    }
    .single-view > div:nth-child(2){
        color: #333333;
        font-size: 18px;
        font-weight:bold;
    }
    .single-view > div:nth-child(4){
        color: #333333;
        font-size: 18px;
        font-weight:bold;
    }
    .single-view > div:nth-child(8){
        color: #333333;
        font-size: 13px;
        margin-right:12px;
    }
    .day-view{
        height: 66px;
        display: flex;
        align-items: center;  
    }
    .day-view > div:first-child{
        color: #888888;
        font-size:18px;
        margin-left:12px;
    }
    .day-view > div:last-child{
        color: #333333;
        font-size: 18px;
        font-weight:bold;
    }
    .line-big{
        height: 10px;
        background-color: #F2F2F2;
    }
    .arrow-margin{
        margin-left:5px;
        margin-right:5px;
    }
    .grow-div{
        flex-grow:1;
    }
    .frame{
        width: 13px;
        height: 13px;
        border: 1px #8E8E8E solid;
        margin-right:6px;
    }
    /* 向上的箭头 */
    .arrow-top {
        font-size: 0;
        line-height: 0;
        border-width: 10px;
        border-color: red;
        border-top-width: 0;
        border-style: dashed;
        border-bottom-style: solid;
        border-left-color: transparent;
        border-right-color: transparent;
    }
    /* 向下箭头 */
    .arrow-bottom {
        font-size: 0;
        line-height: 0;
        border-width: 8px;
        border-color: #121212;
        border-bottom-width: 0;
        border-style: dashed;
        border-top-style: solid;
        border-left-color: transparent;
        border-right-color: transparent;
    } 
    /* 向右的箭头 */
    .arrow-right {
        font-size: 0;
        line-height: 0;
        border-width: 10px;
        border-color: red;
        border-right-width: 0;
        border-style: dashed;
        border-left-style: solid;
        border-top-color: transparent;
        border-bottom-color: transparent;
    } 
    /* 向左的箭头 */
    .arrow-left {
        font-size: 0;
        line-height: 0;
        border-width: 10px;
        border-color: red;
        border-left-width: 0;
        border-style: dashed;
        border-right-style: solid;
        border-top-color: transparent;
        border-bottom-color: transparent;
    }
</style>