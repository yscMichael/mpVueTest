<template>
    <div class="main-view">
        <!-- 搜索框 -->
        <div class='search-box'>
            <img class="seach-icon" src="/static/images/drugstore/drugInit/head_search.png" alt="">
            <input  class='search-input'
                    placeholder='请输入' 
                    placeholder-class='home-placeholder-class'
                    type="text"
                    @input='searchInput'
                    confirm-type='search'
                    @confirm='searchBtn'>
        </div>
        <!-- 列表界面 -->
        <div class="search-list-view">
            <scroll-view class="main-scroll"
                         scroll-y="true">
                <!-- 下拉刷新 -->
                <yy-refresh></yy-refresh>
                <!-- 列表界面 -->
                <search-add-cell v-for="(item,index) in dataSource" :key="index"></search-add-cell>
                <!-- 无数据显示 -->
                <div :class="['noData-view',isHiddenNoData?'hiddenNoData':'']">
                    <img src="/static/images/drugstore/drugInit/noData.png" alt="">
                </div>
                <!-- 上拉加载-->
                <yy-refresh></yy-refresh> 
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
        dataSource:[1,2,3,4,5,6,7,8,9,0],
        isHiddenNoData:true
    };
  },
  methods: {
    searchInput:function(e){
        console.log('输入搜索字符');
        console.log(e);
        // var value = e.detail.value;
        // this.data.keyword = value;
    },
    searchBtn:function(){
        console.log('点击开始搜索------');
        // this.refreshData();
    },
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
        top: 42px;
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