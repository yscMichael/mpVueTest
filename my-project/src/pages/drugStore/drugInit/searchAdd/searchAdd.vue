<template>
    <div class="main-view">
        <!-- 搜索框 -->
        <div class='search-box'>
            <img class="seach-icon" src="/static/images/drugstore/drugInit/head_search.png" alt="">
            <input  class='search-input'
                    placeholder='请输入' 
                    placeholder-class='home-placeholder-class'
                    type="text"
                    v-model="keyWord"
                    @input='searchInput'
                    confirm-type='search'
                    @confirm='searchBtn'>
        </div>
        <!-- 列表界面 -->
        <div class="search-list-view">
            <scroll-view class="main-scroll"
                         scroll-y="true"
                         @scrolltoupper="refreshData"
                         @scrolltolower="loadMoreData"
                         :style="{width:screenWidth + 'px',height:screenHeight + 'px'}">
                <!-- 下拉刷新 -->
                <yy-refresh :isHeader="true" :isShow="isRefresh"></yy-refresh>
                <!-- 列表界面 -->
                <search-add-cell v-for="(item,index) in dataSource" 
                                :key="index"
                                @clickSearchCell="clickSearchCell(item)"
                                :item="item">
                </search-add-cell>
                <!-- 无数据显示 -->
                <div :class="['noData-view',isHiddenNoData?'hiddenNoData':'']">
                    <img src="/static/images/drugstore/drugInit/noData.png" alt="">
                </div>
                <!-- 上拉加载-->
                <yy-refresh :isHeader="false" :isShow="isLoadMore"></yy-refresh> 
            </scroll-view>
        </div>
    </div>
</template>

<script>
import searchAddCell from '@/pages/drugStore/drugInit/searchAdd/template/searchAddCell.vue'
import yyRefresh from '@/components/yyRefresh/yyRefresh'

export default {
  components:{
    searchAddCell,
    yyRefresh
  },  
  data () {
    return {
        //数据源
        dataSource:[],
        // 关键字
        keyWord:'',
        //是否隐藏无数据
        isHiddenNoData:false,
        //是否在下拉刷新
        isRefresh:false,
        //是否正在上拉加载
        isLoadMore:false,
        //总数
        totalCount:0,
        //界面的宽
        screenWidth:0,
        //界面的高
        screenHeight:0,
        //参数
        param:{
            op:'Page',
            cloud:'drug_basis',
            key_word:'',
            page:1,
            rows:50,
            _type:'json',
            _password:this.globalData.password,
            _userid:this.globalData.userid
        }
    };
  },
  methods: {
    // 输入框输入变化  
    searchInput:function(e){
        console.log('输入搜索字符');
        console.log(e.mp.detail.value);
    },
    // 点击搜索按钮
    searchBtn:function(){
        console.log('点击开始搜索------');
        console.log(this.keyWord);
        this.refreshData();
    },
    // 点击药品cell
    clickSearchCell(item){
        console.log('点击药品cell');
        console.log(item);
        //1、这里要对image进行特殊编码(防止出现特殊字符、解析失败)
        if (!this.isEmpty(item.image)) {
            if (item.image.length > 0) {
                item.image = item.image[0].url;    
                item.image = encodeURIComponent(item.image);
            }
        }
        //2、进入药品初始化详情界面
        wx.navigateTo({
            url: '/pages/drugStore/drugInit/drugInitDetail/main?item=' + JSON.stringify(item),
        });
    },
    // 刷新数据
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
          wx.showToast({
            title: '无更多数据加载...',
            duration: 1500,
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
          // 1、处理动画(延时执行)
          this.isRefresh = false;
          this.isLoadMore = false;
          wx.hideLoading();
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
    },
    // 判断字符串是否为空
    isEmpty(obj){
      if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
      }else{
        return false;
      }
    }
  },
  //这个全局只执行一次(获取屏幕和宽) 
  created() {
    this.screenWidth = wx.getSystemInfoSync().windowWidth;
    this.screenHeight = wx.getSystemInfoSync().windowHeight - 40;
  },
  onLoad: function (options) {
    //1、参数赋值
    this.param._password = this.globalData.password;
    this.param._userid = this.globalData.userid;
    // 2、网络请求 
    this.refreshData();
  },

}
</script>

<style>
    .main-view{
        background-color: white;
    }
    .search-box{
        background-color: #F1F0F5;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 40px;
        border: 1px solid red;
        box-sizing: border-box;
        z-index: 999;

        display: flex;
        align-items: center;
    }
    .seach-icon{
        width: 30rpx;
        height: 30rpx;
        margin-left: 15rpx;
    }
    .search-input{
        width: 100%;
        height: 100%;
        margin-left:10rpx;
        font-size: 12px;
    }
    .search-list-view{
        background-color: aquamarine;
        position: absolute;
        top: 40px;
        left: 0;
        right: 0;
        bottom: 0;
    }
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