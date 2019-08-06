<template>
    <scroll-view class="main-scroll"
                 scroll-y="true">
        <!-- 下拉刷新 -->
        <yy-refresh></yy-refresh>  
        <!-- 列表 -->
        <initdrug-list-cell @clickCell="clickDrugListCell" 
                            v-for="(item,index) in dataSource" 
                            :key="index" 
                            :item="item">
        </initdrug-list-cell>
        <!-- 无数据显示 -->
        <div :class="['noData-view',isHiddenNoData?'hiddenNoData':'']">
          <img src="/static/images/drugstore/drugInit/noData.png" alt="">
        </div>
        <!-- 上拉加载-->
        <yy-refresh></yy-refresh>   
    </scroll-view>
</template>

<script>
import initdrugListCell from '@/pages/drugStore/drugInit/childListView/cellTemplate/initdrugListCell'
import yyRefresh from '@/components/yyRefresh/yyRefresh'
export default {
  components:{
    initdrugListCell,
    yyRefresh
  },
  data () {
    return {
      dataSource:[1,2,3,4,5,6,7,8,9,10,11,12,13,14],
      isHiddenNoData:true
    };
  },
  methods: {
    clickDrugListCell(){
      console.log('点击cell');
    }
  },
}
</script>

<style scoped>
  .main-scroll{
      background-color: #eee;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
  }
  .noData-view{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #eee;
  }
  .noData-view img{ 
      width: 237rpx;
      height: 245rpx;
  }
  .hiddenNoData{
    display: none;
  }
</style>