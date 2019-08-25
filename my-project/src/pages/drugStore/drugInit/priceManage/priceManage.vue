<template>
    <div>
        <!-- 进货价 -->
        <div class="head-title-view">
            <div></div>
            <div class="head-title">进货价</div>
            <div></div>
        </div>
        <div class="content-view">
            <div>按包装单位</div>
            <div class="grow-div"></div>
            <input type="text" v-model="item.cost">
            <div>元/盒</div>
        </div>
        <!-- 处方价 -->
        <div class="head-title-view margin-top-10">
            <div></div>
            <div class="head-title">处方价</div>
            <div></div>
        </div>
        <div class="content-view">
            <div>按包装单位</div>
            <div class="grow-div"></div>
            <input type="text" v-model="item.min_price">
            <div>元/盒</div>
        </div>
        <div class="content-view">
            <div>按拆零单位</div>
            <div class="grow-div"></div>
            <input type="text" v-model="item.sale_price">
            <div>元/袋</div>
        </div>
        <!-- 提示信息 -->
        <div class="subTitle-view">
            <div>用于</div>
            <div>门诊-新增接诊</div>
            <div>模块的药品价格</div>
        </div>
        <!-- 零售价 -->
        <div class="head-title-view margin-top-10">
            <div></div>
            <div class="head-title">零售价</div>
            <div></div>
        </div>
        <div class="content-view">
            <div>按包装单位</div>
            <div class="grow-div"></div>
            <input type="text" v-model="item.retail_min_price">
            <div>元/盒</div>
        </div>
        <div class="content-view">
            <div>按拆零单位</div>
            <div class="grow-div"></div>
            <input type="text" v-model="item.retail_sale_price">
            <div>元/袋</div>
        </div>
        <!-- 提示信息 -->
        <div class="subTitle-view">
            <div>用于</div>
            <div>药房-零售卖药</div>
            <div>模块的药品价格</div>
        </div>
        <!-- 3、保存按钮 -->
        <div class="bottom-save-button" @click="clickSaveButton">保存</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        item : {
            cost:'',//进货价
            min_price:'',//处方价(包装单位)
            sale_price:'',//处方价(拆零单位)
            retail_min_price:'',//零售价(包装单位)
            retail_sale_price:''//零售价(拆零单位)
      },
    };
  },
  methods: {
    // 点击保存  
    clickSaveButton(){
        console.log('点击保存---------');

    }
  },
  onLoad: function (options) {
    // 1、模型解析  
    var tempModel = JSON.parse(options.item);
    console.log('模型解析');
    console.log(tempModel);
    // 2、模型赋值
    this.item.cost = tempModel.cost?tempModel.cost:'0';
    this.item.min_price = tempModel.min_price?tempModel.min_price:'0';
    this.item.sale_price = tempModel.sale_price?tempModel.sale_price:'0';
    this.item.retail_min_price = tempModel.retail_min_price?tempModel.retail_min_price:'0';
    this.item.retail_sale_price = tempModel.retail_sale_price?tempModel.retail_sale_price:'0';
  }
}
</script>

<style>
    page{
        background-color: #F1F2F4;
    }       
    .head-title-view{
        height:36px;
        line-height:36px;
        color:#888888;
        font-size:17px;
        background-color: #F1F2F4;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .head-title{
        color: #888888;
        font-size:17px;
        margin-left:5px;
        margin-right:5px;
    }
    .head-title-view > div:first-child{
        background-color: #D0D0D0;
        width: 10px;
        height:1px;
    }
    .head-title-view > div:last-child{
        background-color: #D0D0D0;
        width: 10px;
        height:1px;
    }
    .content-view{
        height:45px;
        background-color: white;
        display: flex;
        align-items: center;
    }
    .content-view > div:first-child{
        color: #888888;
        font-size: 15px;
        margin-left:12px;
    }
    .content-view > div:last-child{
        color:#333333;
        font-size: 15px;
        margin-right:12px;
    }
    .content-view > input{
        width:66px;
        height:30px;
        margin-right: 5px;
        background-color: #ECECEC;
        text-align: center;
    }
    .grow-div{
        flex-grow: 1;
    }
    .margin-top-10{
        margin-top:10px;
    }
    .subTitle-view{
        margin-left:12px;
        margin-top:6px;
        display: flex;
        align-items: center;
    }
    .subTitle-view > div:first-child, .subTitle-view > div:last-child{
        color: #888888;
        font-size:12px;
    }
    .subTitle-view > div:nth-child(2){
        color:#22438A;
        font-size:12px;
    }
    .subTitle-view > div:first-child::before{
        content:'*';
        color: #888888;
        font-size:12px;
    }
    .bottom-save-button{
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: 0px;
      height: 45px;
      text-align: center;
      line-height: 45px;      
      color: white;
      font-size: 16px;
      background-color: #2993EF;
    }
</style>