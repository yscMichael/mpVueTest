<template>
    <div class="main-view">
        <!-- 1、顶部固定区域 -->
        <div class="head-position-view">
            <!-- 1.1、序号和名称 -->
            <div class="number-view">
                <div>{{item.unitType}}</div>
                <div>{{item.unitName}}</div>
            </div>
            <!-- 1.2、副标题 -->
            <div class="subTitle-view">{{item.unitTip}}</div>
            <!-- 1.3、按钮区域 -->
            <div class="button-view">
                <!-- 上一步 -->
                <div class="up-button">
                    <div class="arrow-left"></div>
                    <div>上一步</div>
                </div>
                <!-- 下一步 -->
                <div class="next-button">
                    <div>下一步</div>
                    <div class="arrow-right"></div>
                </div>
            </div>
        </div>
        <!-- 2、中间列表区域 -->
        <div class="unit-list-view">
            <div v-for="(item,index) in unitArray" :key="index"  
                 class="content-view">
                <div :class="['content-title', item.isSelect?'select-cell':'']"
                    @tap="clickUsageCell(item)">{{ item.title}}</div>
            </div>
        </div>
        <!-- 3、新增单位 -->
        <div class="bottom-add-view">
            <!--3.1、输入框 -->
            <div class="bottom-input-view">
                <input type="text" placeholder="输入新增单位" v-model="newUnit">
                <div @click="clickSureButton">确定</div>
            </div>
            <!--3.2、提示语 -->
            <div class="bottom-tip-view">提示：新增的单位可在个人中心-自定义设置-药品单位模块里面删除</div>
        </div>
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
    unitArray:{
        type: Array,
        required:true,
        default () {
            return {}
        }
    }
  },  
  data () {
    return {
        // 新增单位
        newUnit:'',
    };
  },
  computed: {

  },
  methods: {
    // 点击确定按钮
    clickSureButton(){
        console.log('点击确定按钮');
        this.$emit('addNewUnit', this.newUnit);
    }
  },
}
</script>

<style scoped>
    .main-view{
        background-color: white;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
    .head-position-view{
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        height: 80px;
    }
    .unit-list-view{
        position: absolute;
        top: 80px;
        left: 0px;
        right: 0px;
        bottom: 90px;

        background-color: white;
        padding: 6px;
        overflow: scroll;  
    }
    .content-view{
        padding: 6px;
        height: 52px;
        width: 33.3%;
        float: left;
        box-sizing: border-box;

        /* 超出部分隐藏 */
        overflow: hidden;
    }
    .content-title{
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        color: #000000;
        font-size: 16px;

        /* 超出部分隐藏 */
        overflow: hidden;
        /* 内容不换行 */
        white-space: nowrap;
        /* 超出部分用省略号 */
        text-overflow: ellipsis;
        text-align: center;
        background-color: #F2F3F7;
    }
    .select-cell{
       border: 1px #4D81EE solid; 
       background-color: white;
       color: #4D81EE;
    }
    .bottom-add-view{
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        border: 1px solid white;
        height: 90px;
    }
    .number-view{
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .number-view > div:first-child{
        color: white;
        font-size: 16px;
        font-weight: 500;
        width: 19px;
        height: 19px;
        line-height: 19px;
        text-align: center;
        border-radius: 50%;
        background-color: #7885A0;
    }
    .number-view > div:last-child{
        color: #7885A0;
        margin-left: 5px;
    }
    .subTitle-view{        
        height: 18px;
        line-height: 18px;
        font-size: 13px;
        color: #999999;
        text-align: center;
    }
    .button-view{
        height: 31px;
        position: relative;
    }
    .up-button{
        display: flex;
        align-items: center;
        justify-content: center;

        width: 68px;
        height: 31px;
        float: left;
        margin-left: 12px;
        border: 1px solid #7885A0;   
    }
    .up-button > div:last-child{
        color: #7885A0;
        font-size: 13px;
        margin-left: 5px;
    }
    .next-button{
        display: flex;
        align-items: center;
        justify-content: center;

        width: 68px;
        height: 31px;
        float: right;
        margin-right: 12px;
        border: 1px solid #7885A0;  
    }
    .next-button > div:first-child{
        color: #7885A0;
        font-size: 13px;
        margin-right: 5px;
    }
    .bottom-input-view{
        height: 44px;
        border: 1px #7885A0 solid;
        margin: 10px 12px 0px 12px;
        display: flex;
        align-items: center;
    }
    .bottom-input-view > input{
        color: #7885A0;
        font-size: 16px;
        height: 100%;
        flex-grow: 1;
        margin: 0px 12px 0px 12px;
    }
    .bottom-input-view > div{
        height: 44px;
        line-height:44px;
        text-align: center; 
        width: 84px;
        color: #FFFFFF;
        font-size: 16px;
        background-color: #7885A0;
    }
    .bottom-tip-view{
        color: #999999;
        font-size: 10px;
        margin: 10px 12px 10px 10px;
    }
    /* 向右的箭头 */
    .arrow-right {
        font-size: 0;
        line-height: 0;
        border-width: 8px;
        border-color: #7885A0;
        border-right-width: 0;
        border-style: dashed;
        border-left-style: solid;
        border-top-color: transparent;
        border-bottom-color: transparent;
    } 
    /* 向左的箭头 */
    .arrow-left {
        font-size: 0;
        line-height: 0;
        border-width: 8px;
        border-color: #7885A0;
        border-left-width: 0;
        border-style: dashed;
        border-right-style: solid;
        border-top-color: transparent;
        border-bottom-color: transparent;
    }
</style>