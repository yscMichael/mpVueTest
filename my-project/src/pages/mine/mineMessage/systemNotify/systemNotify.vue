<template>
    <div class="main-view">
      <!-- 列表 -->
        <system-notify-cell v-for="(item,index) in dataSource"
                            :key="index"
                            :item="item">
        </system-notify-cell>
        <!-- 无数据 -->
        <div :class="['noData-view',isHiddenNoData?'hiddenNoData':'']">
          <img src="/static/images/drugstore/drugInit/noData.png" alt="">
        </div>
        <!-- 上拉加载-->
        <yy-refresh :isHeader="false" :isShow="isLoadMore"></yy-refresh> 
    </div>
</template>

<script>
import systemNotifyCell from '@/pages/mine/mineMessage/systemNotify/template/systemNotifyCell'
export default {
  components:{
    systemNotifyCell
  },
  data () {
    return {
      // 数据源
      dataSource:[],
      //是否隐藏无数据
      isHiddenNoData:false,
      //是否刷新
      isRefresh:false,
      //是否加载更多
      isLoadMore:false,
      //总数
      totalCount:0,
      //参数
      param:{
        op:'Page',
        cloud:'notice_news',
        notice_type:'1',
        page:1,
        rows:10,
        _type:'json',
        to_entity:this.globalData.password,
        _userid:this.globalData.userid,
        _password:this.globalData.password,
      }
    };
  },
  methods: {
    // 刷新数据
    refreshData(){
      // 1.判断是否可以进行网络请求
      if (this.isRefresh || this.isLoadMore) {
          return;
      }
      // 2.提示
      wx.showLoading({
        title: '正在加载中...',
        mask: false,
      });
      //3.网络请求
      this.isRefresh = true;
      this.param.page = 1;
      this.dataSource = [];
      this.loadData();
    },
    // 加载更多数据
    loadMoreData(){
      // 1.判断是否可以进行网络请求
      if (this.isRefresh || this.isLoadMore) {
          return;
      }
      // 2.判断能否进行上拉加载
      if (this.totalCount <= this.dataSource.length) {
          wx.showToast({
            title: '无更多数据加载...',
            duration: 1500,
            mask: false,
          });
          this.isLoadMore = false;
      }else{
          // 3.上拉加载
          this.isLoadMore = true;
          this.param.page ++;
          this.loadData();
      }
    },
    loadData(){
      this.$fly.get('/app',this.param)
        .then((response) => {
          console.log('responseresponse');
          console.log(response);
          // 1.延时
          setTimeout(() => {
            this.isRefresh = false;
            this.isLoadMore = false;
            wx.hideLoading();
            wx.stopPullDownRefresh();
          }, 1000);
          // 2.更新数据源
          this.dataSource = this.dataSource.concat(response.data.rows);    
          this.totalCount = response.data.total;
          // 3.处理无数据
          this.dealNoData();
        })
        .catch(function(error){
          wx.showToast({
            title: "数据加载失败",
          });
        });
    },
    dealNoData(){
      if (this.dataSource.length == 0) {
        this.isHiddenNoData = false;
      }else{
        this.isHiddenNoData = true;
      }
    }
  },
  onLoad: function (options) {
    // 1.参数赋值
    this.param._userid = this.globalData.userid;
    this.param._password = this.globalData.password;
    // 2.网络请求
    this.refreshData();
  },
  onPullDownRefresh: function () {
    this.refreshData();
  },
  onReachBottom: function () {
    this.loadMoreData();
  },
}
</script>

<style scoped>
  .main-view{
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