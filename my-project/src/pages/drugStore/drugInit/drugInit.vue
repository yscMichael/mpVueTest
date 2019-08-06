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
                  <west-drug-list></west-drug-list>
                </swiper-item>
                <!-- 中成药 -->
                <swiper-item>
                  <!-- <div>中成药</div> -->
                  <special-drug-list></special-drug-list>
                </swiper-item>
                <!-- 中药 -->
                <swiper-item>
                  <!-- <div>中药</div> -->
                  <chinese-drug-list></chinese-drug-list>
                </swiper-item>
                <!-- 医疗器械 -->
                <swiper-item>
                  <!-- <div>医疗器械</div> -->
                  <instrument-list></instrument-list>
                </swiper-item>
            </swiper>
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
      buttonArray:[
        {id:0, title:'西药'},
        {id:1, title:'中成药'},
        {id:0, title:'中药'},
        {id:0, title:'医疗器械'}
      ]
    };
  },
  methods: {
    clickBarItem(data){
      this.selectIndex = data;
    },
    scrollViewChange(e){
      this.selectIndex = e.mp.detail.current;
    }
  },
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
</style>