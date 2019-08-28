<template>
    <div class="main-view" @click="clickSearchCell">
      <!-- 药品信息 -->
       <div class="top-view">
         <img src="/static/images/drugstore/drugInit/img_default.png" alt="">
         <div class="top-content">
             <div class="first-title">{{item.common_name}}</div>
             <div class="second-title">
                <div>{{item.manufacturer?item.manufacturer.key_name:''}}</div>
                <div>{{item.key_name}}</div>
             </div>
             <div class="third-title">{{item.spec}}</div>
         </div>
       </div>
       <!-- 底部分割线 -->
       <div class="line-view"></div>
    </div>
</template>

<script>
export default {
  props:{
    item:{
      type: Object,
      required:true,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
    };
  },
  methods: {
    clickSearchCell(){
      this.$emit('clickSearchCell',this.item);
    }
  },
}
</script>

<style scoped>
  .main-view{
    background-color: white;
  }
  .top-view{
    border: 1rpx solid white;
    display: flex;
  }
  .bottom-view{
    border: 1px white solid;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .top-view > img:first-child{
    width: 120rpx;
    height: 120rpx;
    margin: 24rpx 12rpx 24rpx 24rpx;
  }  
  .top-content{
    flex-grow: 1;
    border: 1px white solid;
  }
  .first-title{
    color: #323232;
    font-size: 30rpx;
    font-weight: bold;
    margin-top: 20rpx;
  }
  .second-title{
    display: flex;
    align-items: center;
    margin-top: 4rpx;
  }
  .second-title > div:first-child{
    color: #1F91F2;
    font-size: 20rpx;
    background-color: #EEF6FD;
    border: 1rpx solid #1F91F2;
  }
  .second-title > div:last-child{
    color: #5A5A5A;
    font-size: 20rpx;
    margin-left: 5px;
  }
  .third-title{
    color: #5A5A5A;
    font-size: 20rpx;
  }
  .top-view > img:last-child{
    width: 93rpx;
    height: 98rpx;
    align-self: flex-start;
  }
  .line-view{
    background-color: #E5E5E5;
    height: 2rpx;
  }
</style>
