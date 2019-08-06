<template>
    <div class="main-view">
      <!-- 药品信息 -->
       <div class="top-view">
         <img src="/static/images/drugstore/drugInit/img_default.png" alt="">
         <div class="top-content">
             <div class="first-title">注射用奥美拉唑钠</div>
             <div class="second-title">
                <div>北京悦康药业有限公司</div>
                <div>德瑞克</div>
             </div>
             <div class="third-title">
               <div>进货价¥0.0000/盒</div>
               <div>|</div>
               <div>处方价¥0.0000/盒</div>
             </div>
             <div class="forth-title">
               <div>库存：0瓶</div>
               <div>40mg/瓶,1瓶/盒</div>
             </div>
         </div>
         <img src="/static/images/drugstore/drugInit/forbidden.png" alt="">
       </div>
       <!-- 批次和库存流水 -->
       <div class="bottom-view">
            <div>批次</div>
            <div>库存流水</div>
       </div>
       <!-- 底部分割线 -->
       <div class="line-view"></div>
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
  }
  .top-view{
    border: 1rpx solid white;
    display: flex;
  }
  .bottom-view{
    border: 1px white solid;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .top-view > img:first-child{
    width: 120rpx;
    height: 120rpx;
    margin: 24rpx 12rpx 24rpx 24rpx;
  }  
  .top-content{
    flex-grow: 1;
    border: 1px white solid;
  }
  .first-title{
    color: #323232;
    font-size: 30rpx;
    font-weight: bold;
    margin-top: 20rpx;
  }
  .second-title{
    display: flex;
    align-items: center;
    margin-top: 4rpx;
  }
  .second-title > div:first-child{
    color: #1F91F2;
    font-size: 20rpx;
    background-color: #EEF6FD;
  }
  .second-title > div:last-child{
    color: #5A5A5A;
    font-size: 20rpx;
  }
  .third-title{
    display: flex;
    align-items: center;
    margin-top: 4rpx;
  }
  .third-title > div{
    color: #5A5A5A;
    font-size: 20rpx;
  }
  .forth-title{
    display: flex;
    align-items: center;
    margin-top: 2rpx;
    margin-bottom: 10rpx; 
  }
  .forth-title > div{
    color: #5A5A5A;
    font-size: 20rpx;
  }
  .top-view > img:last-child{
    width: 93rpx;
    height: 98rpx;
    align-self: flex-start;
  }
  .bottom-view > div:first-child{
    width: 115px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    border: 1px #D5D7D8 solid;
    border-radius: 14px;
    margin-right: 10px;
  }
  .bottom-view > div:last-child{
    width: 115px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    border: 1px #D5D7D8 solid;
    border-radius: 14px;
  }
  .line-view{
    background-color: #E5E5E5;
    height: 2rpx;
  }
</style>