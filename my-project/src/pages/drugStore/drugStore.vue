<template>
    <div class="container">
      <img src="/static/images/drugStore/yaofang_head.png" alt="">
      <div class="content-list">
        <yy-list-cell :item="purchase"></yy-list-cell>
        <yy-list-cell :item="inventory"></yy-list-cell>
        <yy-list-cell :item="drugInit"></yy-list-cell>
      </div>
    </div>
</template>

<script>
import yyListCell from '@/components/yyListCell/yyListCell'

export default {
  components:{
      yyListCell
  },
  data () {
    return {
        purchase:{
          title:'采购入库',
          subTitle:'扫码直接入库',
          imageUrl:'/static/images/drugstore/purchase.png'
        },
        inventory:{
          title:'库存盘点',
          subTitle:'盘点药品库存',
          imageUrl:'/static/images/drugstore/inventory.png'
        },
        drugInit:{
          title:'药品初始化',
          subTitle:'初始化您的药品库',
          imageUrl:'/static/images/drugstore/drugInit.png'
        },
    };
  },

}
</script>

<style>
  .container{
    background-color: #F1F0F5;
    width: 100%;
    height: 100%;
  }
  .container > img{
    width: 100%;
    display:block;
  }
  .content-list{
    padding: 0rpx 20rpx 0rpx 20rpx;
  }
</style>