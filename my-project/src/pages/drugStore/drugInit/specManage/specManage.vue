<template>
    <div class="main-view">
        <!-- 操作指引 -->
        <div class="operation-view">
          <div>操作指引</div>
          <img src="/static/images/drugstore/drugInit/question.png" alt="">
        </div>
        <!-- 规格 -->
        <div class="spec-view">
          <div>规格：</div>
          <input type="text" value="/盒">
        </div>
        <!-- 规格详情 -->
        <scroll-view class="spec-detail-scroll"
                     scroll-x="true">
            <div style="margin-left:12px;margin-right:4px" class="inline-block-view">每</div>
            <div class="spec-detail-input inline-block-view">盒</div>
            <div class="inline-block-view">有</div>
            <div class="spec-detail-input inline-block-view">12</div>
            <div class="spec-detail-input inline-block-view">颗</div>
            <div style="margin-right:8px" class="inline-block-view">;</div>
            <div class="inline-block-view">每</div>
            <div style="max-width: 67px;" class="inline-block-view">拆</div>
            <div style="margin-right:4px" class="inline-block-view">有</div>
            <div class="spec-detail-input inline-block-view last-input">剂量</div>
            <div class="last-input inline-block-view"></div>
        </scroll-view>

        <!-- <div class="spec-detail-view">
            <div style="margin-left:12px;margin-right:4px">每</div>
            <div class="spec-detail-input">盒</div>
            <div>有</div>
            <div class="spec-detail-input">12</div>
            <div class="spec-detail-input">颗</div>
            <div style="margin-right:8px">;</div>
            <div>每</div>
            <div style="max-width: 67px;">拆</div>
            <div style="margin-right:4px">有</div>
            <div class="spec-detail-input">剂量</div>
            <div class="last-input"></div>
        </div> -->
        <!-- 单位轮播界面 -->
        <div class="home-swiper-class">
            <swiper>
                <swiper-item>
                    <img src="/static/images/carousel/1.jpg" alt="">
                </swiper-item>
                <swiper-item>
                    <img src="/static/images/carousel/2.jpg" alt="">                    
                </swiper-item>
                <swiper-item>
                    <img src="/static/images/carousel/3.jpg" alt="">
                </swiper-item>
            </swiper>
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
      background-color: red;
    }
    .operation-view{
      background-color: #F1F1F4;
      height: 30px;
      display: flex;
      align-items: center;
    }
    .operation-view > div{
        color: #888888;
        font-size:14px;
        flex-grow: 1;
        text-align: right;
        margin-right: 5px;
    }
    .operation-view > img{
        width: 14px;
        height: 14px;
        margin-right: 12px;
    }
    .spec-view{
      height: 54px;
      display: flex;
      align-items: center;
      background-color: white;
    }
    .spec-view > div{
      color: #888888;
      font-size: 14px;
      margin-left: 12px;
    }
    .spec-view > input{
      color: #333333;
      font-size: 18px;
      text-align: center;
      flex-grow: 1;
      height: 100%;
    }
    .temp-scroll-view{
      width: 100%;
      height: 72px;
    }

    .spec-detail-scroll{
      border: 1px solid blue;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background-color: antiquewhite;
      white-space:nowrap;
      display: flex;
      align-items: center;
    }
    .spec-detail-scroll > div{
      display: inline-block;
    }
    .spec-detail-view{
        margin-top: 5px;
        height: 72px;
        background-color: white;
        border: 1px solid red;
        box-sizing: border-box;
        /* 水平排列 */
        display: flex;
        align-items: center;
        /* 可以滚动的条件 */
        overflow-x:scroll;
        overflow-y: hidden;
        white-space: nowrap;
    }
    .spec-detail-view > div{
      /* 防止缩放 */
      flex-shrink:0;
      flex-grow: 0;
    }
    .spec-detail-input{
        width: 67px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-left: 4px;
        margin-right: 4px;
        background-color: #F2F4F5;
        display: inline-block;
    }
    /*隐藏滚动条*/
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      color: transparent;
    }
    .last-input{
      /* margin-left: 8px; */
      margin-right: 10px;
      /* background-color: blue;
      width: 10px;
      height: 10px; */
    }
    .inline-block-view{
      display: inline-block;
    }
</style>