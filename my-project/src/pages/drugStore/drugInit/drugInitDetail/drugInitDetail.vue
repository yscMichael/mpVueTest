<template>
    <div class="main-view">
        <!-- 1、国药准字 -->
        <div class="chinese-medicine"></div>
        <div class="line-big"></div>
        <!-- 2、药品图片 -->
        <div class="drug-image-view">
          <div>药品图片</div>
          <img src="/static/images/drugstore/drugInit/img_default.png" alt="">
          <img src="/static/images/drugstore/drugInit/more.png" alt="">
        </div>
        <div class="line-big"></div>
        <!-- 3、药品信息 -->
        <!-- 通用名 -->
        
        <!-- 商品名 -->

        <!-- 生产厂家 -->

        <!-- 批准文号 -->

        <!-- 条形码 -->

        <!-- 药品类型 -->

        <!-- 剂型 -->

        <!-- 4、规格管理 -->

        <!-- 5、 -->
        <!-- 用法用量 -->

        <!-- 有效期预警及库存安全范围 -->

        <!-- 6、 -->
        <!-- 价格管理 -->

        <!-- 库存管理 -->

        <!-- 7、药品状态 -->

        <!-- 8、删除 -->

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
  .main-view{
    background-color: #F1F0F5;
  }
  .chinese-medicine{
    background-color: aqua;
    height: 92px;
  }
  .drug-image-view{
    width: 100%;
    height: 63px;
    display: flex;
    align-items: center;
    background-color: lightblue;
  }
  .drug-image-view > div{
    color: #333333;
    font-size: 15px;
    margin-left: 26px;
    flex-grow: 1;
  }
  .drug-image-view > img:nth-child(2){
    width: 48px;
    height: 48px;
    margin-right: 10px;
  }
  .drug-image-view > img:last-child{
    width: 7px;
    height: 11px;
    margin-right: 12px;
  }
  .line-big{
    background-color: #F1F0F5;
    width: 100%;
    height: 10px;
  }
  .line-small{
    background-color: #F1F0F5;
    width: 100%;
    height: 1px;
  }
</style>