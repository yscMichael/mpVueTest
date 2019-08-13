<template>
    <div class="main-view">
        <!-- 1、序号和名称 -->
        <div class="number-view">
            <div>1</div>
            <div>盒</div>
        </div>
        <!-- 2、副标题 -->
        <div class="subTitle-view">（包装单位）</div>
        <!-- 3、按钮区域 -->
        <div class="button-view">
            <div>上一步</div>    
            <div>下一步</div>
        </div>
        <!-- 4、列表 -->
        <div class="unit-list-view">

        </div>
        <!-- 5、新增单位 -->
        <div class="bottom-add-view">
            <!-- 输入框 -->
            <div class="bottom-input-view">
                <input type="text" placeholder="输入新增单位">
                <div>确定</div>
            </div>
            <!-- 提示语 -->
            <div class="bottom-tip-view">提示：新增的单位可在个人中心-自定义设置-药品单位模块里面删除</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    };
  }
}
</script>

<style scoped>
    .main-view{
        background-color: white;
    }
    .number-view{
        height: 28px;
        background-color: antiquewhite;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .number-view > div:first-child{
        background-color: #7885A0;
        color: white;
        font-size: 16px;
        font-weight: 500;
        width: 19px;
        height: 19px;
        line-height: 19px;
        text-align: center;
        border-radius: 50%;
    }
    .number-view > div:last-child{
        color: #7885A0;
        margin-left: 5px;
    }
    .subTitle-view{
        background-color: aqua;
        height: 18px;
        line-height: 18px;
        font-size: 13px;
        color: #999999;
        text-align: center;
    }
    .button-view{
        background-color: antiquewhite;
        height: 31px;
        position: relative;
        padding: 10px;
    }
    .button-view > div:first-child{
        border: 1px solid #7885A0;
        color: #7885A0;
        font-size: 13px;
        width: 68px;
        height: 31px;
        line-height: 31px;
        text-align: center;
        float: left;
        margin-left: 2px;
    }
    .button-view > div:last-child{
        border: 1px solid #7885A0;
        color: #7885A0;
        font-size: 13px;
        width: 68px;
        height: 31px;
        line-height: 31px;
        text-align: center;
        float: right;
        margin-right: 2px;
    }
    .unit-list-view{
        background-color: red;
    }
    .bottom-add-view{
        background-color: white;
        height: (72px + 10px + 14px + 14px);
    }
    .bottom-input-view{
        height: 44px;
        border: 1px #7885A0 solid;
        margin-left: 12px;
        margin-right: 12px;
        margin-top: 14px;
        display: flex;
        align-items: center;
    }
    .bottom-input-view > input{
        color: #7885A0;
        font-size: 16px;
        background-color: antiquewhite;
        flex-grow: 1;
        margin-left: 12px;
        margin-right: 12px;
        height: 100%;
    }
    .bottom-input-view > div{
        background-color: #7885A0;
        height: 44px;
        line-height:44px;
        text-align: center; 
        width: 84px;
        color: #FFFFFF;
        font-size: 16px;
    }
    .bottom-tip-view{
        color: #999999;
        font-size: 12px;
        margin-left: 12px;
        margin-right: 12px;
        margin-bottom: 10px;
        margin-top: 14px;
    }
</style>