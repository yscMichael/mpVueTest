<template>
    <div class="main-view">
        <!-- 1、顶部固定区域 -->
        <div class="head-position-view">
            <!-- 1.1、序号和名称 -->
            <div class="number-view">
                <div>{{item.type}}</div>
                <div>{{item.ratio_count}}</div>
            </div>
            <!-- 1.2、副标题 -->
            <div class="subTitle-view">{{item.ratioTip}}</div>
            <!-- 1.3、按钮区域 -->
            <div class="button-view">
                <!-- 上一步 -->
                <div class="up-button" @click="clickUpBtn">
                    <div class="arrow-left"></div>
                    <div>上一步</div>
                </div>
                <!-- 下一步 -->
                <div class="next-button" @click="clickNextBtn">
                    <div>下一步</div>
                    <div class="arrow-right"></div>
                </div>
            </div>
        </div>
        <!-- 3、键盘区域 -->
        <div class="bottom-keyboard-view">
            <div class="section-view" @click="clickKeyboard('1')">
                <div>1</div>
            </div>
            <div class="section-view" @click="clickKeyboard('2')">
                <div>2</div>
            </div>
            <div class="section-view" @click="clickKeyboard('3')">
                <div>3</div>
            </div>
            <div class="section-view" @click="clickKeyboard('4')">
                <div>4</div>
            </div>
            <div class="section-view" @click="clickKeyboard('5')">
                <div>5</div>
            </div>
            <div class="section-view" @click="clickKeyboard('6')">
                <div>6</div>
            </div>
            <div class="section-view" @click="clickKeyboard('7')">
                <div>7</div>
            </div>
            <div class="section-view" @click="clickKeyboard('8')">
                <div>8</div>
            </div>
            <div class="section-view" @click="clickKeyboard('9')">
                <div>9</div>
            </div>
            <!-- 这里隐藏要特殊处理以下 -->
            <div :class="['section-view',hiddenFlag?'hidden-div':'']" @click="clickKeyboard('.')">
                <div>.</div>
            </div>
            <div :class="['section-view',!hiddenFlag?'hidden-div':'']">
            </div>
            <div class="section-view" @click="clickKeyboard('0')">
                <div>0</div>
            </div>
            <div class="section-view" @click="clickDeleteButton">
                <img class="keyboard-img" src="/static/images/drugstore/drugInit/icon_del.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import notificationCenter from '@/notification'
export default {
    props:{
        item:{
            type: Object,
            required:true,
            default () {
                return {}
            }
        },
        hiddenFlag:{
            type: Boolean,
            required:true,
            default () {
                return {}
            }
        },
    },  
    data () {
        return {
        };
    },
    methods: {
        // 点击上一步
        clickUpBtn(){
            console.log('点击上一步');
            this.$emit('clickUpButton',this.item.type);
        },
        // 点击下一步
        clickNextBtn(){
            console.log('点击下一步');
            this.$emit('clickNextButton',this.item.type);
        },
        // 点击键盘
        clickKeyboard(index){
            console.log('点击键盘');
            console.log(index);
            if (parseInt(this.item.type) == 2) {//包装与拆零单位换算
                notificationCenter.postNotification('chang_count', index);   
            }else{//拆零与剂量单位换算
                notificationCenter.postNotification('taking_count', index);   
            }
        },
        // 点击删除按钮
        clickDeleteButton(){
            console.log('点击删除按钮');
            if (parseInt(this.item.type) == 2) {//包装与拆零单位换算
                notificationCenter.postNotification('chang_count', '-1');   
            }else{//拆零与剂量单位换算
                notificationCenter.postNotification('taking_count', '-1');   
            } 
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
        height: 77px;
    }
    .bottom-keyboard-view{
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        border: 1px solid white;
        height: 216px;
        background-color: #E6E6E6;
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
    .section-view{
        width: 33.3%;
        height: 25%;
        float: left;
        padding: 3px;
        box-sizing: border-box;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .section-view > div{
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background-color: white;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .keyboard-img{
        width: 35px;
        height: 21px;
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
    .hidden-div{
        display: none !important;
    }
</style>