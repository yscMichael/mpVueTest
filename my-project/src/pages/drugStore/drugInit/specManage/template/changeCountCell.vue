<template>
    <div class="main-view">
        <!-- 1、顶部固定区域 -->
        <div class="head-position-view">
            <!-- 1.1、序号和名称 -->
            <div class="number-view">
                <div>2</div>
                <div>12</div>
            </div>
            <!-- 1.2、副标题 -->
            <div class="subTitle-view">（包装与拆零单位换算）</div>
            <!-- 1.3、按钮区域 -->
            <div class="button-view">
                <!-- 上一步 -->
                <div class="up-button">
                    <div class="arrow-left"></div>
                    <div>上一步</div>
                </div>
                <!-- 下一步 -->
                <div class="next-button">
                    <div>下一步</div>
                    <div class="arrow-right"></div>
                </div>
            </div>
        </div>
        <!-- 3、键盘区域 -->
        <div class="bottom-keyboard-view">
            <div class="section-view">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </div>
            <div class="section-view">
                <div>4</div>
                <div>5</div>
                <div>6</div>
            </div>
            <div class="section-view">
                <div>7</div>
                <div>8</div>
                <div>9</div>
            </div>
            <div class="section-view">
                <div>.</div>
                <div>0</div>
                <img class="keyboard-img" src="/static/images/drugstore/drugInit/icon_del.png" alt="">
            </div>
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
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
    .head-position-view{
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        height: 77px;
    }
    .bottom-keyboard-view{
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        border: 1px solid white;
        height: 216px;
        background-color: #E6E6E6;
    }
    .number-view{
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .number-view > div:first-child{
        color: white;
        font-size: 16px;
        font-weight: 500;
        width: 19px;
        height: 19px;
        line-height: 19px;
        text-align: center;
        border-radius: 50%;
        background-color: #7885A0;
    }
    .number-view > div:last-child{
        color: #7885A0;
        margin-left: 5px;
    }
    .subTitle-view{        
        height: 18px;
        line-height: 18px;
        font-size: 13px;
        color: #999999;
        text-align: center;
    }
    .button-view{
        height: 31px;
        position: relative;
    }
    .up-button{
        display: flex;
        align-items: center;
        justify-content: center;

        width: 68px;
        height: 31px;
        float: left;
        margin-left: 12px;
        border: 1px solid #7885A0;   
    }
    .up-button > div:last-child{
        color: #7885A0;
        font-size: 13px;
        margin-left: 5px;
    }
    .next-button{
        display: flex;
        align-items: center;
        justify-content: center;

        width: 68px;
        height: 31px;
        float: right;
        margin-right: 12px;
        border: 1px solid #7885A0;  
    }
    .next-button > div:first-child{
        color: #7885A0;
        font-size: 13px;
        margin-right: 5px;
    }
    .bottom-keyboard-view > div{
        width: 100%;
        height: 25%;
    }
    .section-view > div{
        float: left;
        width: 33.3%;
    }
    .keyboard-img{
        width: 35px;
        height: 21px;
    }
    /* 向右的箭头 */
    .arrow-right {
        font-size: 0;
        line-height: 0;
        border-width: 8px;
        border-color: #7885A0;
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
        border-width: 8px;
        border-color: #7885A0;
        border-left-width: 0;
        border-style: dashed;
        border-right-style: solid;
        border-top-color: transparent;
        border-bottom-color: transparent;
    }
</style>