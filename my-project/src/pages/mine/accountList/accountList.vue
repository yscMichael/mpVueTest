<template>
  <div class="main-view">
    <!-- 列表 -->
    <div class="content" v-for="(item,index) in dataSource"
                         :key="index">
      <account-cell :item="item"></account-cell>
      <div class="line-view"></div>
    </div>
    <!-- 无数据 -->
    <div :class="['noData-view',isHiddenNoData?'hiddenNoData':'']">
          <img src="/static/images/drugstore/drugInit/noData.png" alt="">
    </div>
  </div>
</template>

<script>
import accountCell from '@/pages/mine/accountList/template/accountCell'
export default {
  components:{
    accountCell
  },
  data () {
    return {
        // 数据源
        dataSource:[],
        //是否隐藏无数据
        isHiddenNoData:false,
        // 参数
        param:{
          op:'List',
          cloud:'user',
          _type:'json',
          _password:this.globalData.password,
          _userid:this.globalData.userid
        }
    };
  },
  methods: {
    // 刷新数据
    refreshData(){
      // 1.提示
      wx.showLoading({
        title: '正在加载中...',
        mask: false,
      });
      //2.网络请求
      this.dataSource = [];
      this.loadData();
    },
    // 网络请求
    loadData(){
      this.$fly.get('/app',this.param)
        .then((response) => {
          console.log('responseresponse');
          console.log(response);
          // 1.延时
          setTimeout(() => {
            wx.hideLoading();
            wx.stopPullDownRefresh();
          }, 1000);
          // 2.更新数据源
          this.dataSource = this.dataSource.concat(response.data.rows);    
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
    this.param._password = this.globalData.password;
    this.param._userid = this.globalData.userid;
    // 2.网络请求
    this.refreshData();
  }
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
.line-view{
  background-color: #F1F0F5;
  height: 1px;
}
</style>