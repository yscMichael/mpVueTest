<template>
    <div class="main-view">
        <!-- 1、国药准字(只有自定义添加才显示<drug_id=0> -->
        <div :class="['chinese-medicine',(itemModel.id == 0) ?'show-chinese-medicine':'hide-chinese-medicine']">

        </div>
        <div class="line-big"></div>
        <!-- 2、药品图片 -->
        <div class="drug-image-view"
             @click="clickChooseImage">
          <div>药品图片</div>
          <img :src="selectImage" alt="">
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">
        </div>
        <div class="line-big"></div>
        <!-- 3、药品信息 -->
        <!-- 通用名 -->
        <div class='common-view'>
          <div class='title'>通用名</div>
          <input class='right-input'
                  placeholder='请输入药品名称'
                  type="text"
                  @input='commonNameInput'
                  value='我是通用名'>
        </div>
        <div class="line-small"></div>
        <!-- 商品名 -->
        <div class='common-view'>
          <div class='title-none'>商品名</div>
          <input class='right-input'
                  placeholder='请输入商品名'
                  type="text"
                  @input='commonNameInput'
                  value='商品名'>    
        </div>
        <div class="line-small"></div>
        <!-- 生产厂家 -->
        <div class='common-view'>
          <div class='title'>生产厂家</div>
          <input class='right-input'
                  placeholder='请输入生产厂家'
                  type="text"
                  @input='commonNameInput'
                  value='我是生产厂家'>    
        </div>
        <div class="line-small"></div>
        <!-- 批准文号 -->
        <div class='common-view'>
          <div class='title'>批准文号</div>
          <input class='right-input'
                  placeholder='请输入生产厂家'
                  type="text"
                  @input='commonNameInput'
                  value='待定'>    
        </div>
        <div class="line-small"></div>
        <!-- 条形码 -->
        <div class='common-view'>
          <div class='title-none'>条形码</div>
          <input class='right-input'
                  placeholder='请输入或扫描药品条码'
                  type="text"
                  @input='commonNameInput'
                  value='我是条形码'>
          <img class="scanButton" src="/static/images/drugstore/drugInit/scan.png" alt="">                      
        </div>
        <div class="line-small"></div>
        <!-- 药品类型 -->
        <div class='common-view'>
          <div class='title'>药品类型</div>
          <div class="right-title">西药</div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-small"></div>
        <!-- 剂型 -->
        <div class='common-view' @click="clickFormCell">
          <div class='title'>剂型</div>
          <div class="right-title">我是剂型</div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-big"></div>
        <!-- 4、规格管理 -->
        <div class='common-view'>
          <div class='title'>规格管理</div>
          <div class="right-title"></div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-big"></div>
        <!-- 5、 -->
        <!-- 用法用量 -->
        <div class='common-view'>
          <div class='title-none'>用法用量</div>
          <div class="right-title">我是用法用量</div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-small"></div>
        <!-- 有效期预警及库存安全范围 -->
        <div class='common-view'>
          <div class='title-none'>有效期预警及库存安全范围</div>
          <div class="right-title"></div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-big"></div>
        <!-- 6、 -->
        <!-- 价格管理 -->
        <div class='common-view'>
          <div class='title-none'>价格管理</div>
          <div class="right-title"></div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-small"></div>
        <!-- 库存管理 -->
        <div class='common-view'>
          <div class='title-none'>库存管理</div>
          <div class="right-title"></div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-big"></div>
        <!-- 7、药品状态 -->
        <div class='common-view'>
          <div class='title-none'>药品状态</div>
          <div class="right-title"></div>
          <switch class="switch-button"></switch>
        </div>  
        <div class="line-big"></div>
        <!-- 8、删除 -->
        <div class="delete-view">删除</div>
        <div class="line-big"></div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 模型
      itemModel:'',
      // 选择照片
      selectImage:'/static/images/drugstore/drugInit/img_default.png'
    };
  },
  methods: {
    // 选择照片
    clickChooseImage(){
      wx.chooseImage({
        count: 1,
        sizeType: ['original','compressed'],
        sourceType: ['album','camera'],
        success: (result)=>{
          //tempFilePath可以作为img标签的src属性显示图片
          var imageArray = result.tempFilePaths;
          if(imageArray.length > 0){//取出第一个
            this.selectImage = imageArray[0];
          }
        }
      });
    },
    clickFormCell(){
      console.log('clickFormCell');
      wx.navigateTo({
        url: '/pages/drugStore/drugInit/chooseForm/main',
      });
    }
  },
  mounted() {
    // 1、参数解析(图片解码)
    this.itemModel = JSON.parse(this.$root.$mp.query.item);
    this.itemModel.image = decodeURIComponent(this.itemModel.image);
    // 2、图片赋值
    // 2.1、判断是否存在
    if (!(this.itemModel.image == 'undefined')) {
      this.selectImage = this.itemModel.image;
    }
  }
}
</script>

<style>
  .main-view{
    background-color: white;
    padding: 1rpx;
  }
  .chinese-medicine{
    background-color: aqua;
    height: 92px;
  }
  .drug-image-view{
    width: 100%;
    height: 63px;
    display: flex;
    align-items: center;
    background-color: white;
  }
  .drug-image-view > div{
    color: #333333;
    font-size: 15px;
    margin-left: 26px;
    flex-grow: 1;
  }
  .drug-image-view > img:nth-child(2){
    width: 48px;
    height: 48px;
    margin-right: 10px;
  }
  .common-view{
    background-color: white;
    display: flex;
    align-items: center;
    height: 45px;
  }
  .title{
    color: #333333;
    font-size: 15px;
    margin-left: 12px;
  }
  .title:before{
    content:'* ';
    color: #F84848;
    font-size: 12px;
  }
  .title-none{
    color: #333333;
    font-size: 15px;
    margin-left: 12px;
  }
  .title-none:before{
    content:'* ';
    color: white;
    font-size: 12px;
  }
  .right-input{
    flex-grow: 1;
    margin-left: 5px;
    margin-right: 12px;
    text-align: right;
  }
  .right-title{
    flex-grow: 1;
    margin-left: 5px;
    margin-right: 12px;
    text-align: right;
  }
  .scanButton{
    width: 16px;
    height: 16px;
    margin-right: 12px;
  }
  .moreButton{
    width: 7px;
    height: 11px;
    margin-right: 12px;
  }
  .switch-button{
    margin-right: 12px;
  }
  .delete-view{
    color: #FF5454;
    height: 45px;
    text-align: center;
    line-height: 45px;
  }
  .line-big{
    background-color: #F1F0F5;
    width: 100%;
    height: 10px;
  }
  .line-small{
    background-color: #F1F0F5;
    width: 100%;
    height: 1px;
    margin-left: 12px;
  }
  .show-chinese-medicine{
    display: none;
  }
  .hide-chinese-medicine{
    display: none;
  }
</style>