<template>
    <div class="main-view">
        <!--筛选界面 -->
        <div class="filter-view">
          <img src="/static/images/drugstore/drugInit/filter.png" alt="">
        </div>
        <!-- 筛选列表 -->
        <div v-show="isShowFeedBack" class="filter-list-view">
            <div class="filter-container">

            </div>
        </div>
        <!-- 列表 -->
        <batch-list-cell v-for="(item,index) in dataSource" 
                         :key="index"
                         :item="item"></batch-list-cell>
        <!-- 无数据显示 -->
        <div :class="['noData-view',isHiddenNoData?'hiddenNoData':'']">
          <img src="/static/images/drugstore/drugInit/noData.png" alt="">
        </div>
        <!-- 上拉加载-->
        <yy-refresh :isHeader="false" :isShow="isLoadMore"></yy-refresh>   
    </div>
</template>

<script>
import batchListCell from '@/pages/drugStore/drugInit/batchListDetail/template/batchListCell'
import yyRefresh from '@/components/yyRefresh/yyRefresh'
export default {
  components:{
    batchListCell,
    yyRefresh
  },  
  data () {
    return {
        //数据源
        dataSource:[],
        //是否隐藏无数据
        isHiddenNoData:false,
        //是否在下拉刷新
        isRefresh:false,
        //是否正在上拉加载
        isLoadMore:false,
        //总数
        totalCount:0,
        //是否显示蒙层
        isShowFeedBack:true,
        //参数
        param:{
          op:'Page',
          cloud:'inventory',
          drug_id:'',
          page:1,
          rows:10,
          order:'asc',
          sort:'expire_date',
          _type:'json',
          _password:this.globalData.password,
          _userid:this.globalData.userid
        }
    };
  },
  methods: {
    refreshData(){
      // 1、判断当前是否进行下拉刷新和上拉加载、不能重复加载
      if (this.isRefresh || this.isLoadMore) {
          return;
      }
      // 2、显示加载框
      wx.showLoading({
        title: '正在拼命加载...',
        mask: false,
      });
      //3、开始网络请求(参数重置)
      this.isRefresh = true;
      this.param.page = 1;
      this.dataSource = [];
      this.loadData();
    },
    loadMoreData(){
      // 1、不能重复加载
      if (this.isRefresh || this.isLoadMore) {
          return;
      }
      // 2、显示加载框(要判断是否有更多数据)
      if (this.totalCount <= this.dataSource.length) {
          wx.showLoading({
            title: '无更多数据加载...',
            mask: false,
          });
          // 隐藏动画
          this.isLoadMore = false;
      }else{
          // 3、开始网络请求
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
          // 1、处理动画(延时执行)
          setTimeout(() => {
            this.isRefresh = false;
            this.isLoadMore = false;
            //停止下拉刷新动画
            wx.hideLoading();
            wx.stopPullDownRefresh();
            console.log('动画结束');
          }, 1000);
          // 2、数据添加到数据源、并更新底部数据
          this.dataSource = this.dataSource.concat(response.data.rows);    
          this.totalCount = response.data.total;
          // 3、处理无数据情况
          this.dealNoData();
        })
        .catch(function(error){
          wx.showToast({
            title: "请求失败",
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
  mounted() {
    console.log(this.$root.$mp.query.id);
    //参数赋值
    this.param.drug_id = this.$root.$mp.query.id;
    this.param._userid = this.globalData.userid;
    //加载数据
    this.refreshData();
  },
  onLoad: function (options) {
    //参数赋值
    //this.param.drug_id = options.id;
    //加载数据
    // this.refreshData();
  },
  onPullDownRefresh: function () {
    //下拉刷新
    console.log('下拉刷新--------');
    this.refreshData();
  },
  onReachBottom: function () {
    //加载更多数据
    console.log('上拉加载-----');
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
  .filter-view{
    background-color: #2591F8;
    position: fixed;
    top: 0px;
    right: 0px;
    width: 30px;
    height: 30px;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .filter-view > img{
    width: 18px;
    height: 18px;
  }
  .filter-list-view{
    background-color: rgba(0,0,0,.5);
    position: fixed;
    z-index: 1000;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
  .filter-container{
    
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