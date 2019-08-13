<template>
    <div class="main-view">
        <!-- 1、头部固定区域 -->
        <div class="head-position-view">
          <!-- 1.1、操作指引 -->
          <div class="operation-view">
            <div>操作指引</div>
            <img src="/static/images/drugstore/drugInit/question.png" alt="">
          </div>
          <!-- 1.2、规格 -->
          <div class="spec-view">
            <div>规格：</div>
            <input type="text" value="/盒">
          </div>
          <!-- 1.3、规格详情 -->
          <!-- scroll-view滚动方式 -->
          <scroll-view class="spec-detail-scroll"
                      scroll-x="true">
              <div class="spec-detail-text margin-left-12 margin-right-4">每</div>
              <div class="spec-detail-input">盒</div>
              <div class="spec-detail-text">有</div>
              <div class="spec-detail-input">12</div>
              <div class="spec-detail-input">颗</div>
              <div class="spec-detail-text margin-right-8">;</div>
              <div class="spec-detail-text">每</div>
              <div class="spec-detail-text max-width-67">拆</div>
              <div class="spec-detail-text margin-right-4">有</div>
              <div class="spec-detail-input margin-right-12">剂量</div>
          </scroll-view>
        </div>
        <!-- 2、底部固定区域 -->
        <div class="bottom-position-view">
          <!-- 单位轮播界面 -->
          <swiper>
              <!-- 包装单位 -->
              <swiper-item>
                <unit-list-cell></unit-list-cell>
              </swiper-item>
              <!-- 包装与拆零单位换算 -->
              <swiper-item>
                <change-count-cell></change-count-cell>              
              </swiper-item>
              <!-- 拆零单位 -->
              <swiper-item>
                <unit-list-cell></unit-list-cell> 
              </swiper-item>
              <!-- 拆零单位与剂量单位换算 -->
              <swiper-item>
                <change-count-cell></change-count-cell>              
              </swiper-item>
              <!-- 剂量单位 -->
              <swiper-item>
                <unit-list-cell></unit-list-cell>           
              </swiper-item>
          </swiper>
        </div>
    </div>
</template>

<script>
import unitListCell from '@/pages/drugStore/drugInit/specManage/template/unitListCell'
import changeCountCell from '@/pages/drugStore/drugInit/specManage/template/changeCountCell'
export default {
  components:{
    unitListCell,
    changeCountCell
  },
  data () {
    return {
    };
  }
}
</script>

<style scoped>
    .main-view{
      background-color: red;
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
      height: 124px;
    }
    .bottom-position-view{
      position: absolute;
      top: 124px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background-color: aqua;
    }
    .bottom-position-view swiper{
      width: 100%;
      height: 100%;
      background-color: #888888;
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
    /* 以下是规格详情滚动区域 */
    .spec-detail-scroll{
      /* 这里设置100%是为了自动适应子类 */
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      border: 1px solid blue;
      white-space: nowrap;
      background-color: white;
    }
    .spec-detail-text{
      display: inline-block;
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
    .spec-swiper-class{
        border: 1px solid green;
        box-sizing: border-box;
    }
    .margin-left-12{
        margin-left: 12px;
    }
    .margin-right-4{
        margin-right: 4px;
    } 
    .margin-right-8{
        margin-right: 8px;
    } 
    .margin-right-12{
        margin-right: 12px;
    } 
    .max-width-67{
        max-width: 67px;
    }
</style>