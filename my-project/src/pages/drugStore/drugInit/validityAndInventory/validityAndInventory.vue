<template>
    <div class="main-view">
        <!-- 有效期预警 -->
        <div class="validity-title">
            <div>有效期预警</div>
            <div>{{item.warning_time}}</div>
        </div>
        <div class="validity-list">
            <div class="float-item" v-for="(item,index) in listArray" :key="index">
                <div class="float-content">
                    <div :class="['float-item-title',item.selected?'ative-item':'']"
                         @click="clickItem(item)">{{item.title}}</div>
                </div>
            </div>
        </div>
        <!-- 库存安全范围 -->
        <div class="inventory-title">
            <div>库存安全范围</div>
            <div class="grow-flex"></div>
            <input type="text" v-model="item.range_low">
            <div></div>
            <input type="text" v-model="item.range_up">
            <div>{{item.single_name}}</div>
        </div> 
        <!-- 3、保存按钮 -->
        <div class="bottom-save-button" @click="clickSaveButton">保存</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        item:{
            range_low:'',
            range_up:'',
            warning_time:'',
            warning_time_id:'',
            single_name:''
        },
        listArray:[
            {
                title:'1个月',
                selected:false,
                index:1
            },
            {
                title:'2个月',
                selected:false,
                index:2
            },
            {
                title:'3个月',
                selected:false,
                index:3
            },
            {
                title:'4个月',
                selected:false,
                index:4
            },
            {
                title:'5个月',
                selected:false,
                index:5
            },
            {
                title:'6个月',
                selected:false,
                index:6
            }
        ]
    };
  },
  methods: {
    // 处理选中
    dealChoosed(){
        for (let index = 0; index < this.listArray.length; index++) {
            var element = this.listArray[index];
            var selectIndex = this.item.warning_time_id;
            if (parseInt(element.index) == parseInt(selectIndex)) {
                element.selected = true;
            }
        }
    },
    // 点击cell
    clickItem(item){
        //将之前选中全部清除
        for (let index = 0; index < this.listArray.length; index++) {
            var element = this.listArray[index];
            element.selected = false;
        }
        //将当前的选中
        item.selected = true;
        this.item.warning_time = element.title;
        this.item.warning_time_id = element.index;
    },
    // 点击保存
    clickSaveButton(){
        console.log('点击保存');
    }
  },
  onLoad: function (options) {
    // 1、解析参数
    var tempModel = JSON.parse(options.item);
    // 2、模型赋值
    this.item.range_low = tempModel.range_low?tempModel.range_low:'';
    this.item.range_up = tempModel.range_up?tempModel.range_up:'';
    this.item.warning_time = tempModel.warning_time?tempModel.warning_time:'';
    this.item.warning_time_id = tempModel.warning_time_id?tempModel.warning_time_id:'';
    console.log(this.item.warning_time);
    // 3、处理选中
    this.dealChoosed();
  }
}
</script>

<style>
    .validity-title{
       margin-top: 10px;
       height: 45px;
       display: flex;
       align-items: center;
       background-color: white;
    }
    .validity-title > div:first-child{
        color: #333333;
        font-size: 15px;   
        margin-left: 12px;
        text-align: left;
    }
    .validity-title > div:last-child{
        color: #333333;
        font-size: 15px;
        margin-right: 12px;   
        text-align: right;
        flex-grow: 1;
    }
    .validity-list{
        margin-top: 1;
        background-color: white;
        height: 120px;
        margin-top: 1px;
    }
    .float-item{
        height: 60px;
        width: 33.3%;
        background-color: white;
        float: left;
    }
    .float-content{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .float-item-title{
        background-color: #F2F3F7;
        color: #000000;
        font-size: 16px;
        height: 39px;
        line-height: 39px;
        border-radius: 39px;
        text-align: center;
        padding-left: 20px;
        padding-right: 20px;
    }
    .ative-item{
        background-color: white;
        border: 1px #4D81EE solid;
    }
    .inventory-title{
        margin-top: 10px;
        height: 45px;
        display: flex;
        align-items: center;
        background-color: white;
    }
    .inventory-title > div:first-child{
        color: #333333;
        font-size: 15px;
        margin-left: 12px;
    }
    .grow-flex{
        flex-grow: 1;
    }
    .inventory-title > input:nth-child(3){
        width: 41px;
        height: 26px;
        text-align: center;
        background-color: #E8E9EB;    
    }   
    .inventory-title > div:nth-child(4){
        background-color: #333333;
        width: 8px;
        height: 1px;
        margin-left: 6px;
        margin-right: 6px;
    }
    .inventory-title > input:nth-child(5){
        width: 41px;
        height: 26px;
        text-align: center;
        background-color: #E8E9EB;
    }
    .inventory-title > div:last-child{
        color: #333333;
        font-size: 15px;
        margin-right: 12px;
        margin-left: 5px;
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