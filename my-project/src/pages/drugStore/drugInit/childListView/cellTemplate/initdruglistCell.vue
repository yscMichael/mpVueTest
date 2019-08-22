<template>
    <div :class="['main-view',hiddenImage?'':'main-background-color']" @click="goToDetail">
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
               <div>库存：{{stockString}}</div>
               <div v-show="isShowSpec">{{item.spec}}</div>
             </div>
         </div>
         <img :class="[hiddenImage?'hiddenForbiddenImage':'']" src="/static/images/drugstore/drugInit/forbidden.png">
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
      this.$emit('clickDrugListCell', this.item);
    },
    clickBatchButton(){
      this.$emit('clickBatchDetail',this.item.id);
    },
    clickInventoryButton(){
      this.$emit('clickInventoryFlow',this.item.id);
    }
  },
  computed: {
    // 图片
    titleImage(){
      if (this.item.image) {
        if (this.item.image.length > 0) {
          var firstObject = this.item.image[0];
          return firstObject.url;
        } else {
          return '/static/images/drugstore/drugInit/img_default.png';  
        }
      }else{
        return '/static/images/drugstore/drugInit/img_default.png';
      }
    },
    // 库存
    stockString(){
      // 1、包装数量和单位
      var minCount = parseFloat(this.item.local_count?this.item.local_count:'0') / parseInt(this.item.change_count?this.item.change_count:'1');
      var minUnit = this.item.min_unit ? this.item.min_unit.key_name:'';
      // 2、拆零数量和单位
      var rxCount = parseFloat(this.item.local_count?this.item.local_count:'0') - minCount * parseInt(this.item.change_count?this.item.change_count:'1');
      var rxUnit = this.item.rx_unit ? this.item.rx_unit.key_name:'';
      // 3、判断库存是否为0
      var tempStockString = '';
      if ((minCount == 0) && (rxCount == 0)) {//都为0
        tempStockString = rxCount + rxUnit;
      }else if(minCount == 0){//包装单位为0
        tempStockString = rxCount + rxUnit;
      }else if(rxCount == 0){//拆零单位为0
        tempStockString = minCount + minUnit;
      }else{
        tempStockString = minCount + minUnit + rxCount + rxUnit;
      }
      //4、判断单位是否相同
      if (minUnit == rxUnit) {
        tempStockString = rxCount + rxUnit;
      } 
      return tempStockString;
    },
    hiddenImage(){
      var review_state = this.item.review_state ? parseInt(this.item.review_state.id) : 0;
      if (review_state == 0) {
        console.log('false');
        // 显示 禁用图片
        return false;
      }else{
        console.log('true');
        // 不显示 禁用图片
        return true;
      }
    }
  },
}
</script>

<style scoped>
  .main-view{
    background-color: white;
  }
  .main-background-color{
    background-color: #F1F0F5 !important;
  }
  .top-view{
    display: flex;
  }
  .bottom-view{
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
  .hiddenForbiddenImage{
    display: none;
  }
</style>