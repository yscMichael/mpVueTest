<template>
    <div class="mainBackgroundView">
        <!-- 顶部栏 -->
        <div class="toolBar">
            <div :class="['toolBarItem',(selectIndex == i)?'toolBarActive':'']" 
                 v-for="(item,i) in buttonArray" 
                 :key="i"
                 @click="clickBarItem(i)">
              {{item.title}}
            </div>
        </div>
        <!-- 四个列表界面 -->
        <div class="containerListView">
            <swiper class="swiper-scrollView"
                    :current="selectIndex"
                    @change="scrollViewChange">
                <!-- 西药 -->
                <swiper-item>
                  <!-- <div>西药</div> -->
                  <west-drug-list @func="getWestTotalFromSon" 
                                  ref="westdrug"
                                  :screenWidth="screenWidth"
                                  :screenHeight="screenHeight"></west-drug-list>
                </swiper-item>
                <!-- 中成药 -->
                <swiper-item>
                  <!-- <div>中成药</div> -->
                  <special-drug-list @func="getSpecialTotalFromSon" ref="specialdrug"></special-drug-list>
                </swiper-item>
                <!-- 中药 -->
                <swiper-item>
                  <!-- <div>中药</div> -->
                  <chinese-drug-list @func="getChineseTotalFromSon" ref="chinesedrug"></chinese-drug-list>
                </swiper-item>
                <!-- 医疗器械 -->
                <swiper-item>
                  <!-- <div>医疗器械</div> -->
                  <instrument-list @func="getInstrumentTotalFromSon" ref="instrument"></instrument-list>
                </swiper-item>
            </swiper>
        </div>
        <!-- 底部添加界面 -->
        <div class="bottom-button">
            <img src="/static/images/drugstore/drugInit/shop.png" alt="">
            <div>已添加(种)：</div>
            <div>{{parentTotalCount}}</div>
            <picker mode="selector"
                    @change="bindSelectInitDrugType" 
                    :range="initDrugTypeArr">
              <div class="add-button">继续添加</div>
            </picker>
        </div>
    </div>
</template>

<script>
import westDrugList from '@/pages/drugStore/drugInit/childListView/westDrugList/westDrugList'
import specialDrugList from '@/pages/drugStore/drugInit/childListView/specialDrugList/specialDrugList'
import chineseDrugList from '@/pages/drugStore/drugInit/childListView/chineseDrugList/chineseDrugList'
import instrumentList from '@/pages/drugStore/drugInit/childListView/instrumentList/instrumentList'

export default {
  components:{
    westDrugList,
    specialDrugList,
    chineseDrugList,
    instrumentList
  },
  data () {
    return {
      selectIndex:0,
      parentTotalCount:0,
      westTotalCount:0,
      specialTotalCount:0,
      chineseTotalCount:0,
      instrumentTotalCount:0,
      screenWidth:'0',
      screenHeight:'0',
      buttonArray:[
        {id:0, title:'西药'},
        {id:1, title:'中成药'},
        {id:2, title:'中药'},
        {id:3, title:'医疗器械'}
      ],
      initDrugTypeArr:[
        '扫码添加', 
        '搜索添加', 
        '自定义添加'
      ]
    };
  },
  methods: {
    //顶部切换条
    clickBarItem(data){
      this.selectIndex = data;
      switch (data) {
        case 0:
          this.parentTotalCount = this.westTotalCount;
          break;
        case 1:
          this.parentTotalCount = this.specialTotalCount;
          break;
        case 2:
          this.parentTotalCount = this.chineseTotalCount;
          break;
        case 3:
          this.parentTotalCount = this.instrumentTotalCount;
          break;
        default:
          break;
      }
    },
    // scroll滚动事件
    scrollViewChange(e){
      this.selectIndex = e.mp.detail.current;
    },
    // 继续添加弹出框
    bindSelectInitDrugType(e){
      console.log(e.mp.detail.value);
    },
    // 西药网络请求totalCount更新
    getWestTotalFromSon(data){
      this.westTotalCount = data;
      if (this.selectIndex == 0) {
         this.parentTotalCount = this.westTotalCount;
      }
    },
    // 中成药网络请求totalCount更新
    getSpecialTotalFromSon(data){
      this.specialTotalCount = data;
      if (this.selectIndex == 1) {
         this.parentTotalCount = this.specialTotalCount;
      }
    },
    // 中药网络请求totalCount更新
    getChineseTotalFromSon(data){
      this.chineseTotalCount = data; 
      if (this.selectIndex == 2) {
         this.parentTotalCount = this.chineseTotalCount;
      }
    },
    // 医疗器械网络请求totalCount更新
    getInstrumentTotalFromSon(data){
      this.instrumentTotalCount = data;
      if (this.selectIndex == 3) {
         this.parentTotalCount = this.instrumentTotalCount;
      }
    }
  },
  created() {
    // 这个全局只执行一次(获取屏幕和宽)
    this.screenWidth = wx.getSystemInfoSync().windowWidth;
    this.screenHeight = wx.getSystemInfoSync().windowHeight;
    console.log('这个全局只执行一次(获取屏幕和宽)');
    console.log(this.screenWidth);
    console.log(this.screenHeight);
  },
  mounted() {
    // 这个每次进来会执行多次
    //首先加载西药列表
    this.$refs.westdrug.refreshData();
    this.$refs.specialdrug.refreshData();
    this.$refs.chinesedrug.refreshData();
    this.$refs.instrument.refreshData();
  }
}
</script>

<style>
  .mainBackgroundView{
    width: 100%;
    height: 100%;
    background-color:#f0f0f0;
  }
  .toolBar{
    position:fixed;
    top:0px;
    width:100%;
    height:40px;
    font-size:15px;
    z-index:9999;
    display:flex;
    background-color:white
  }
  .toolBarItem{
    flex-grow:1;
    height:40px;
    line-height:40px;
    text-align:center;
  }
  .toolBarActive{
      border-bottom: 2px solid #1F91F2;
      color: #1F91F2;
  }
  .containerListView{
      position: fixed;
      left: 0px;
      right: 0px;
      top: 40px;
      bottom: 60px;
  }
  .swiper-scrollView{
      width: 100%; 
      height: 100%;
      overflow: hidden;
  }
  .bottom-button{
      width: 100%;
      position: fixed;
      display: flex;
      height: 60px;
      bottom: 0;
      z-index: 9999;
      align-items: center;
      background-color: white;
      border-top: 1px solid #E5E5E5;
  }
  .bottom-button > img{
    width: 30rpx;
    height: 30rpx;
    margin-left: 15rpx;
  }
  .bottom-button > div:nth-child(2){
    font-size: 30rpx;
    color: #333333;
    margin-left: 15rpx;
  }
  .bottom-button > div:nth-child(3){
    flex-grow: 1;
    color: #2A94EF;
    font-weight: bold;
  }
  .add-button{
    background-color: #1DA4FC;
    flex: 0 0 200rpx;
    width: 200rpx;
    text-align: center;
    font-size: 36rpx;
    color: white;
    height: 60px;
    line-height: 60px;
  }
</style>