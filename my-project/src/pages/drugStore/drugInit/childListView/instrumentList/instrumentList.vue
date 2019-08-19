<template>
    <scroll-view class="main-scroll"
                 scroll-y="true"
                 @scrolltoupper="refreshData"
                 @scrolltolower="loadMoreData"
                 :style="{width:screenWidth + 'px',height:screenHeight + 'px'}">
        <!-- 下拉刷新 -->
        <yy-refresh :isHeader="true" :isShow="isRefresh"></yy-refresh>
        <!-- 列表 -->
        <initdrug-list-cell @clickCell="clickDrugListCell" 
                            v-for="(item,index) in dataSource" 
                            :key="index" 
                            :isShowSpec="true"
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
const Instrument_Drug_URL = '/app';
import initdrugListCell from '@/pages/drugStore/drugInit/childListView/cellTemplate/initdrugListCell'
import yyRefresh from '@/components/yyRefresh/yyRefresh'
export default {
  components:{
    initdrugListCell,
    yyRefresh
  },
  props:['screenWidth','screenHeight'],
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
      //参数
      param:{
        op:'Page',
        cloud:'drug',
        dug_type:'4',
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
    },
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
      this.$fly.get(Instrument_Drug_URL,this.param)
        .then((response) => {
          // 1、处理动画(延时执行)
          setTimeout(() => {
            this.isRefresh = false;
            this.isLoadMore = false;
             wx.hideLoading();
          }, 1000);
          // 2、数据添加到数据源
          this.dataSource = this.dataSource.concat(response.data.rows);    
          this.totalCount = response.data.total;
          this.$emit('func',this.totalCount);
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
}
</script>

<style scoped>
  .main-scroll{
      background-color: #eee;
      width: 100%;
      height: 100%;
      border: 2px solid red;
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