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
        <div class="spec-detail-view">
            <div style="margin-left:12px;margin-right:4px">每</div>
            <div class="spec-detail-input">盒</div>
            <div>有</div>
            <div class="spec-detail-input">12</div>
            <div class="spec-detail-input">颗</div>
            <div style="margin-right:8px">;</div>
            <div>每</div>
            <div style="max-width: 67px;">拆</div>
            <div style="margin-right:4px">有</div>
            <div class="spec-detail-input last-input">剂量</div>
            <div class="spec-detail-input last-input">剂量</div>
            <div class="spec-detail-input last-input">剂量</div>
            <div class="spec-detail-input last-input">剂量</div>
            <div class="spec-detail-input last-input">剂量</div>
            <div class="spec-detail-input last-input">剂量</div>
        </div>
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
    .spec-detail-view{
        /* background-color: white; */
        background-color: antiquewhite;
        width: 100%;
        height: 72px;
        margin-top: 5px;
        display: flex;
        align-items: center;
        overflow-x: auto;
    }
    .spec-detail-input{
        background-color: #F2F4F5;
        width: 67px;
        height: 40px;
        line-height: 40px;
        background-color: #F2F4F5;
        text-align: center;
        margin-left: 4px;
        margin-right: 4px;
    }
    .last-input{
      margin-right: 12px;
    }

</style>