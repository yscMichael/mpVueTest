<template>
    <div class="main-view">
        <!--筛选界面 -->
        <div class="filter-view"
             @click="clickFilterButton">
          <img src="/static/images/drugstore/drugInit/filter.png" alt="">
        </div>
        <!-- 筛选列表 -->
        <div v-show="isShowFeedBack" class="filter-list-view">
            <div class="filter-container">
                <!-- 列表 -->
                <div class="content-list">
                  <div v-for="(item,index) in typeDataSource" :key="index" class="main-cell">
                    <div :class="['content-cell',item.isSelectCell?'select-content-cell':'']"
                         @click="clickContentCell(index)">{{item.key_name}}</div>
                  </div>
                </div>
                <!-- 底部按钮 -->
                <div class="bottom-button-view">
                  <div @click="clickResetButton">重置</div>
                  <div @click="clickDoneButton">完成</div>
                </div>
            </div>
        </div>
        <!-- 列表 -->
        <flow-cell v-for="(item,index) in dataSource" 
                   :key="index"
                   :item="item"></flow-cell>
        <!-- 无数据显示 -->
        <div :class="['noData-view',isHiddenNoData?'hiddenNoData':'']">
          <img src="/static/images/drugstore/drugInit/noData.png" alt="">
        </div>
        <!-- 上拉加载-->
        <yy-refresh :isHeader="false" :isShow="isLoadMore"></yy-refresh> 
    </div>
</template>

<script>
import flowCell from '@/pages/drugStore/drugInit/inventoryFlow/template/flowCell'
import yyRefresh from '@/components/yyRefresh/yyRefresh'
export default {
  components:{
      flowCell,
      yyRefresh
  },  
  data () {
    return {
        //类型数据源
        typeDataSource:[],
        //列表数据源
        dataSource:[],
        //是否隐藏无数据
        isHiddenNoData:false,
        //是否在下拉刷新
        isRefresh:false,
        //是否正在上拉加载
        isLoadMore:false,
        //总数
        totalCount:0,
        // 是否显示蒙层
        isShowFeedBack:false,
        //列表参数
        param:{
          op:'Page',
          cloud:'inventory_detail',
          drug_id:'',
          page:1,
          rows:10,
          type:'',
          _type:'json', 
          _password:this.globalData.password,
          _userid:this.globalData.userid
        },
        //类型参数
        typeParam:{
          op:'LoadDict',
          key_name:'LocalType',
          _type:'json',
          _password:this.globalData.password,
          _userid:this.globalData.userid
        }
    };
  },
  methods: {
    // 获取类型列表
    getTypeList(){
      this.$fly.get('/sys',this.typeParam)
        .then((response) => {
          var tempArray = [];
          tempArray = tempArray.concat(response.data.rows);
          for (let index = 0; index < tempArray.length; index++) {
            var element = tempArray[index];
            element.isSelectCell = false;
          }
          this.typeDataSource = this.typeDataSource.concat(tempArray);
        })
        .catch(function(error){
        });
    },
    //刷新列表
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
          setTimeout(() => {
            this.isRefresh = false;
            this.isLoadMore = false;
            //停止下拉刷新动画
            wx.hideLoading();
            wx.stopPullDownRefresh();
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
    },
    // 点击过滤按钮
    clickFilterButton(){
      this.isShowFeedBack = !this.isShowFeedBack;
    },
    //点击cell 
    clickContentCell(data){
      var tempItem = this.typeDataSource[data];
      tempItem.isSelectCell = !tempItem.isSelectCell; 
    },
    //点击重置按钮
    clickResetButton(){
      for (let index = 0; index < this.typeDataSource.length; index++) {
        var element = this.typeDataSource[index];
        element.isSelectCell = false;
      }
    },
    // 点击完成按钮
    clickDoneButton(){
      //1、获取选中模型type
      var array = [];
      for (let index = 0; index < this.typeDataSource.length; index++) {
        var element = this.typeDataSource[index];
        element.isSelectCell ? array.push(element.id):'';
      }
      //2、重新设置网络请求参数、刷新列表
      this.param.type = array.join(',');
      this.refreshData();
      //3、界面还原
      this.isShowFeedBack = false;
    },
    //点击背景框
    clickBackground(){
      this.isShowFeedBack = false;
    }
  },
  mounted() {
    console.log(this.$root.$mp.query.id);
    //1、参数赋值
    this.param.drug_id = this.$root.$mp.query.id;
    this.param._userid = this.globalData.userid;
    this.typeParam._userid = this.globalData.userid;
    //2、加载列表数据
    this.refreshData();
    // 3、获取类型数据
    this.getTypeList();
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
    background-color: white;
    width: 100%;
    height: 230px;
    position: relative;
  }
  .content-list{
    position: absolute;
    top:0px;
    left:0px;
    right: 0px;
    bottom: 43px;
    padding: 6px;
    overflow: scroll;
  }
  .main-cell{
    float: left;
    width: 33.3%;
    height: 53px;
    padding: 6px;
    box-sizing: border-box; 
  }
  .content-cell{
    border: #E6E6E6 solid 1px;
    background-color: white;
    color: #333333;
    font-size: 15px;
    height: 41px;
    text-align: center;
    line-height: 41px;
  }
  .select-content-cell{
    border: #1F91F2 solid 1px;
    background-color: #1F91F2 !important;
    color: white;
  }
  .bottom-button-view{
    border-top: 1px solid #E6E6E6;
    width: 100%;
    height: 43px;
    left:0px;
    right: 0px;
    bottom: 0px;
    position: absolute;
    display: flex;
    align-items: center;
  }
  .bottom-button-view > div:first-child{
    color: #333333;
    font-size: 15px;
    text-align: center;
    line-height: 43px;
    flex-grow: 1;
    height: 100%;
    border-right: 1px solid #E6E6E6;
  }
  .bottom-button-view > div:last-child{
    color: #1F91F2;
    font-size: 15px;
    font-weight: bold;
    line-height: 43px;
    flex-grow: 1;
    height: 100%;
    text-align: center;
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