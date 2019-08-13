<template>
     <scroll-view class="main-scroll"
                  scroll-y="true">
        <!-- 下拉刷新 -->
        <yy-refresh :isHeader="true" :isShow="isRefresh"></yy-refresh>          
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
        <yy-refresh :isHeader="false" :isShow="isLoadMore"></yy-refresh>   
     </scroll-view>
</template>

<script>
const West_Drug_URL = '/app';
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
      isHiddenNoData:true,
      isRefresh:true,
      isLoadMore:false,
      param:{
        op:'Page',
        cloud:'drug',
        dug_type:'1',
        key_word:'',
        page:1,
        rows:10,
        review_state:1,
        sort:"expire_date",
        order:"desc",
        _type:'json',
        _password:this.globalData.password,
        _userid:this.globalData.userid
      }
    };
  },
  methods: {
    clickDrugListCell(){
      console.log('??cell');
    },
    refreshData(){
      this.param.page = 1;
      this.dataSource = [];
      this.loadData();
    },
    loadMoreData(){
      this.param.page ++;
      this.loadData();
    },
    loadData(){
      this.$fly.get(West_Drug_URL,this.param)
        .then((response) => {
           console.log('西药列表');
           console.log(response.data.rows);
        })
        .catch(function(error){
          console.log(error);
          wx.showToast({
            title: "登陆失败",
          });
        });
    }
  },
  created() {
    console.log('网络请求数据');
    this.refreshData();
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