<template>
    <div class="main-view" @click="goToDetail">
      <!-- 药品信息 -->
       <div class="top-view">
         <img :src="titleImage"
              @error="loadimage">
         <div class="top-content">
             <div class="first-title">{{item.common_name?item.common_name:''}}</div>
             <div class="second-title">
                <div>{{item.manufacturer?item.manufacturer.key_name:'暂无厂商信息'}}</div>
                <div>{{item.key_name?item.key_name:''}}</div>
             </div>
             <div class="third-title">
               <div>进货价¥{{item.cost?item.cost:'0'}}/{{item.min_unit?item.min_unit.key_name:''}}</div>
               <div>|</div>
               <div>处方价¥{{item.min_price?item.min_price:'0'}}/{{item.min_unit?item.min_unit.key_name:''}}</div>
             </div>
             <div class="forth-title">
               <div>库存：{{item.local_count?item.local_count:'0'}}{{item.rx_unit.key_name}}</div>
               <div v-show="isShowSpec">{{item.spec}}</div>
             </div>
         </div>
         <img src="/static/images/drugstore/drugInit/forbidden.png" alt="">
       </div>
       <!-- 批次和库存流水 -->
       <div class="bottom-view">
            <div @click.stop="clickBatchButton">批次</div>
            <div @click.stop="clickInventoryButton">库存流水</div>
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
      },
      isShowSpec:{
          type: Boolean,
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
    goToDetail(){
      this.$emit('clickDrugListCell', this.item.id);
    },
    clickBatchButton(){
      this.$emit('clickBatchDetail',this.item.id);
    },
    clickInventoryButton(){
      this.$emit('clickInventoryFlow',this.item.id);
    }
  },
  computed: {
    titleImage(){
      if (this.item.image) {
        if (this.item.image.length > 0) {
          var firstObject = this.item.image[0];
          console.log('--------');
          console.log(firstObject);
          return firstObject.url;
        } else {
          return '/static/images/drugstore/drugInit/img_default.png';  
        }
      }else{
        return '/static/images/drugstore/drugInit/img_default.png';
      }
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
    min-width: 50px;
    text-align: center;
  }
  .second-title > div:last-child{
    color: #5A5A5A;
    font-size: 20rpx;
    margin-left: 5px;
  }
  .third-title{
    display: flex;
    align-items: center;
    margin-top: 4rpx;
  }
  .third-title > div{
    color: #5A5A5A;
    font-size: 20rpx;
    margin-right: 2px;
  }
  .forth-title{
    display: flex;
    align-items: center;
    margin-top: 2rpx;
    margin-bottom: 10rpx; 
  }
  .forth-title > div{
    color: #5A5A5A;
    font-size: 20rpx;
  }
  .forth-title > div:last-child{
    color: #5A5A5A;
    font-size: 20rpx;
    flex-grow: 1;
    text-align: center;
  }
  .top-view > img:last-child{
    width: 93rpx;
    height: 98rpx;
    align-self: flex-start;
  }
  .bottom-view > div:first-child{
    width: 115px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    border: 1px #D5D7D8 solid;
    border-radius: 14px;
    margin-right: 10px;
  }
  .bottom-view > div:last-child{
    width: 115px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    border: 1px #D5D7D8 solid;
    border-radius: 14px;
  }
  .line-view{
    background-color: #E5E5E5;
    height: 2rpx;
  }
</style>