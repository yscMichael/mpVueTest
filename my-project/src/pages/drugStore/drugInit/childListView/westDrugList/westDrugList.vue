<template>
     <scroll-view class="main-scroll"
                  scroll-y="true">
        <!-- ???? -->
        <yy-refresh></yy-refresh>          
        <!-- ?? -->
        <initdrug-list-cell @clickCell="clickDrugListCell" 
                            v-for="(item,index) in dataSource" 
                            :key="index" 
                            :item="item">
        </initdrug-list-cell>
        <!-- ????? -->
        <div class="noData-view">
          <img src="/static/images/drugstore/drugInit/noData.png" alt="">
        </div>
        <!-- ????-->
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
      dataSource:[1,2,3,4,5,6,7,8,9,10,11,12,13,14]
    };
  },
  methods: {
    clickDrugListCell(){
      console.log('??cell');
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
</style>