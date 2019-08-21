<template>
    <div class="main-view">
      <!-- 1、内容 -->
      <div class="content-view">
        <!-- 1、国药准字(只有自定义添加才显示<drug_id=0> -->
        <div :class="['chinese-medicine',(item.id == 0) ?'show-chinese-medicine':'hide-chinese-medicine']">

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
                  :value="item.common_name">
        </div>
        <div class="line-small"></div>
        <!-- 商品名 -->
        <div class='common-view'>
          <div class='title-none'>商品名</div>
          <input class='right-input'
                  placeholder='请输入商品名'
                  type="text"
                  @input='commonNameInput'
                  :value="item.key_name">    
        </div>
        <div class="line-small"></div>
        <!-- 生产厂家 -->
        <div class='common-view'>
          <div class='title'>生产厂家</div>
          <input class='right-input'
                  placeholder='请输入生产厂家'
                  type="text"
                  @input='commonNameInput'
                  :value="item.manufacturer?item.manufacturer.key_name:''">    
        </div>
        <div class="line-small"></div>
        <!-- 批准文号 -->
        <div class='common-view'>
          <div class='title'>批准文号</div>
          <div class="flex-grow-view">国药准字</div>
          <input class='right-input max-width-100'
                  placeholder='字母+8位数字'
                  type="text"
                  @input='commonNameInput'
                  :value="item.drug_word">    
        </div>
        <div class="line-small"></div>
        <!-- 条形码 -->
        <div class='common-view'>
          <div class='title'>条形码</div>
          <input class='right-input'
                  placeholder='请输入或扫描药品条码'
                  type="text"
                  @input='commonNameInput'
                  :value="item.uuid">
          <img class="scanButton" src="/static/images/drugstore/drugInit/scan.png" alt="">                      
        </div>
        <div class="line-small"></div>
        <!-- 药品类型 -->
        <div class='common-view'>
          <div class='title'>药品类型</div>
          <div class="right-title">{{item.dug_type?item.dug_type.key_name:''}}</div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-small"></div>
        <!-- 剂型 -->
        <div class='common-view' @click="clickFormCell">
          <div class='title'>剂型</div>
          <div class="right-title">{{item.drug_forms?item.drug_forms.key_name:''}}</div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-big"></div>
        <!-- 4、规格管理 -->
        <div class='common-view'>
          <div class='title'>规格管理</div>
          <div class="right-title">{{item.spec}}</div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-big"></div>
        <!-- 5、 -->
        <!-- 用法用量 -->
        <div class='common-view'>
          <div class='title-none max-width-100'>用法用量</div>
          <div class="right-title line-feed">{{usageAndFrequency}}</div>
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
        <div class='common-view' v-show="isAddNewDrug">
          <div class='title-none'>库存管理</div>
          <div class="right-title"></div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <!-- 库存 -->
        <div class='common-view' v-show="!isAddNewDrug">
          <div class='title-none'>库存</div>
          <div class="right-title">{{stockCount}}</div>
        </div>
        <div class="line-big"></div>
        <!-- 7、药品状态 -->
        <div class='common-view' v-show="!isAddNewDrug">
          <div class='title-none'>药品状态</div>
          <div class="right-title"></div>
          <switch class="switch-button"
                  :checked="drugState"></switch>
        </div>  
        <div class="line-big"></div>
        <!-- 8、删除 -->
        <div class="delete-view" v-show="!isAddNewDrug">删除</div>
        <div class="line-big"></div>
      </div>    
      <!-- 2、保存按钮 -->
      <div class="bottom-button"
           @click="saveDrugInfo">保存</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 模型
      item:'',
      // 选择照片
      selectImage:'/static/images/drugstore/drugInit/img_default.png',
      // 是否是新增药品
      isAddNewDrug:false
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
    // 点击剂型
    clickFormCell(){
      console.log('clickFormCell');
      wx.navigateTo({
        url: '/pages/drugStore/drugInit/chooseForm/main',
      });
    },
    // 判断字符串是否为空
    isEmpty(obj){
      if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
      }else{
        return false;
      }
    },
    // 点击保存按钮
    saveDrugInfo(){
      console.log('点击保存按钮');
      // 1、校验参数
      if (this.judgeParamiSLegal) {
        // 2、有图片，保存图片

        // 3、保存其它信息        
      }
    },
    // 校验参数
    judgeParamiSLegal(){
      // 1、通用名
      if (this.isEmpty(this.item.common_name)) {
        wx.showToast({
          title: '请输入药品通用名',
          duration: 1500,
          mask: false,
        });
        return false;
      }
      // 2、生产厂家
      if (this.isEmpty(this.item.manufacturer.key_name)) {
        wx.showToast({
          title: '请输入生产厂家',
          duration: 1500,
          mask: false,
        });
        return false;
      }
      // 3、国药准字和条形码------(西药和中成药)
      // 新增：国药准字必须，条形码非必须
      // 修改：二者有一个填写就可以了
      var dugType = this.item.dug_type?parseInt(this.item.dug_type.id):0;
      if (this.isAddNewDrug) 
      {//新增药品
        if ((dugType == 1) || (dugType == 2)) {
          if (this.isEmpty(this.item.drug_word)) 
          {
            wx.showToast({
              title: '请输入国药准字',
              duration: 1500,
              mask: false,
            });
            return false;
          } 
        }
      }
      else
      {//修改药品
        if ((dugType == 1) || (dugType == 2)) 
        {
          if (this.isEmpty(this.item.drug_word) && this.isEmpty(this.item.uuid)) 
          {
            wx.showToast({
              title: '国药准字和条形码不能同时为空',
              duration: 1500,
              mask: false,
            });
            return false;
          }
        }
      }
      // 4、药品类型
      if (dugType == 0) {
        wx.showToast({
          title: '请选择药品类型',
          duration: 1500,
          mask: false,
        });
        return false;
      }
      // 5、剂型(医疗器械不用判断)
      if (dugType != 4) {
        if (this.isEmpty(this.item.drug_forms.key_name)) {
          wx.showToast({
            title: '请选择剂型',
            duration: 1500,
            mask: false,
          });
          return false;
        }
      }
      // 6、规格管理
      // 6.1、包装单位

      // 6.2、包装单位与拆零单位换算

      // 6.3、拆零单位

      // 6.4、拆零单位与剂量单位换算(不能是医疗器械)

      // 6.5、剂量单位(不能是医疗器械)
      

    },
    // 上传图片
    poatImageData(){

    },
    // 拼接药品网络参数
    makeDrugParam(){

    }
  },
  computed: {
    //用法用量
    usageAndFrequency(){
      // 1、用法(判断是中药还是西药)
      var instruction = '';
      var dugType = parseInt(this.item.dug_type.id);
      if (dugType == 3) {//中药
        instruction = this.item.instruction_zh?this.item.instruction_zh.key_name:'';
      }else{
        instruction = this.item.instruction_en?this.item.instruction_en.key_name:'';
      }
      // 2、频率
      var frequency = this.item.common_frequency?this.item.common_frequency.key_name:'';
      // 3、单次用量
      var single_use = '';
      if (this.item.common_count == -1) {
        single_use = '每次适量';
      }else{
        var unitName = this.item.single_unit?this.item.single_unit.key_name:'';
        single_use = (this.item.common_count == 0)?'':'每次' + this.item.common_count + unitName;
      }
      // 4、用药天数
      var common_days = '用药' + parseInt(this.item.common_days?this.item.common_days:'0') + '天';
      // 5、总计
      var content = instruction + ';' + frequency + ';' + single_use + ';' + common_days + ';';
      return content;
    },
    // 库存数量
    stockCount(){
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
    // 药品状态
    drugState(){
      var review_state = this.item.review_state;
      if (this.isEmpty(review_state)) {//为空
          review_state = {"id":"1","key_name":"启用"}; 
          return true;
      }else{
        return (parseInt(review_state.id) == 1)?true:false;
      }
    }
  },

  onLoad: function (options) {
    console.log('optionsoptionsoptions');
    // 1、参数解析(图片解码)
    this.item = JSON.parse(options.item);
    this.item.image = decodeURIComponent(this.item.image);
    // 2、图片赋值
    // 2.1、判断是否存在
    if (!(this.item.image == 'undefined')) {
      this.selectImage = this.item.image;
    }
    // 3、判断是不是新增(只有字符串才能用length!!!)
    var idString = this.item.id + '';
    this.isAddNewDrug = (idString.length > 0) ? false:true;
    console.log(this.isAddNewDrug);
  },
  mounted() {
    // 1、参数解析(图片解码)
    // this.item = JSON.parse(this.$root.$mp.query.item);
    // this.item.image = decodeURIComponent(this.item.image);
    // 2、图片赋值
    // 2.1、判断是否存在
    // if (!(this.item.image == 'undefined')) {
      // this.selectImage = this.item.image;
    // }
  }
}
</script>

<style>
  .test-input{
    background-color: red;
    width: 100%;
    height: 50px;
  }
  .main-view{
    background-color: white;
    padding: 1rpx;
    width: 100%;
    height: 100%;
  }
  .content-view{
    margin-bottom: 45px;
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
    background-color: white;
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
  .max-width-100{
    width: 100px;
    flex-grow: 0 !important;
  }
  .line-feed{
    /* 超出部分隐藏 */
    overflow: hidden;
    /* 内容不换行 */
    white-space: nowrap;
    /* 超出部分用省略号 */
    text-overflow: ellipsis;
  }
  .flex-grow-view{
    flex-grow: 1;
    text-align: right;
  }
  .bottom-button{
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    background-color: #2993EF;
    color: white;
    font-size: 16px;
    z-index: 999;
  }
</style>