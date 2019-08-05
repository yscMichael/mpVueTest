<template>
    <div class="container">
      <img src="/static/images/drugStore/yaofang_head.png" alt="">
      <h3>22222</h3>

      <yy-list-cell></yy-list-cell>
      <yy-refresh :isHeader="true"></yy-refresh>
    </div>
</template>

<script>
import yyListCell from '@/components/yyListCell/yyListCell'
import yyRefresh from '@/components/yyRefresh/yyRefresh'

export default {
  components:{
      yyRefresh,
      yyListCell
  },
  data () {
    return {
    };
  }
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
    height: 378rpx;
  }
  .list{
    border: 1px solid red;
  }
</style>