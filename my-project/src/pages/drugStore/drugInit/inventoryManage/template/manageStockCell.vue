<template>
    <div class="main-view">
        <!-- 序号 -->
        <div class="index-view">
            <div>(1)</div>
            <div class="grow-flex"></div>
            <div>删除</div>
        </div>
        <!-- 内容 -->
        <div class="main-list-view">
            <!-- 失效日期 -->
            <div class="content-view">
                <div class="red-title">失效日期</div>
                <input class="date-input" type="text" placeholder="请选择">
                <img class="arrow-image" src="/static/images/drugstore/drugInit/more.png" alt="">
            </div> 
            <div class="line-view"></div>
            <!-- 批号 -->
            <div class="content-view">
                <div class="white-title">批号</div>
                <input class="batch-input" type="text" placeholder="请输入批号">
            </div> 
            <div class="line-view"></div>
            <!-- 进货单价 -->
            <div class="content-view">
                <div class="white-title">进货单价</div>
                <div class="grow-flex"></div>
                <input class="price-input" type="text">
                <div class="last-title">盒</div>
            </div> 
            <div class="line-view"></div>
            <!-- 库存数量 -->
            <div class="content-view">
                <div class="red-title">库存数量</div>
                <div class="grow-flex"></div>
                <div class="input-view">
                    <div class="minus-plus-view">-</div>
                    <div class="count-view">120</div>
                    <div class="minus-plus-view">+</div>
                </div>
                <div>盒</div>
            </div> 
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
        border: 1px solid #eee;
    }  
    .index-view{
        height: 46px;
        display: flex;
        align-items: center;
    }
    .index-view > div:first-child{
        color: #333333;
        font-size: 15px;
        margin-left: 15px;
    }
    .grow-flex{
        flex-grow: 1;
    }
    .index-view > div:last-child{
        margin-right: 12px;
        background-color: #FF5454;
        color: #FFFFFF;
        font-size: 15px;
        padding-left: 10px;
        padding-right: 10px;
        height: 28px;
        border-radius: 14px;
        line-height: 28px;
    }
    .main-list-view{
        background-color: white;
        border: 1px solid white;
        margin-left: 12px;
        margin-right:12px;
        border-radius: 10px;
    }
    .content-view{
        height: 45px;
        display: flex;
        align-items: center;
    }
    .red-title{
        color: #333333;
        font-size: 15px;
        margin-left: 12px;
    }
    .red-title::before{
        content: '* ';
        font-size: 15px;
        color: #F84848;
    }
    .white-title{
        color: #333333;
        font-size: 15px;
        margin-left: 12px;
    }
    .white-title::before{
        content: '* ';
        font-size: 15px;
        color: white;
    }
    .date-input{
        flex-grow: 1;
        text-align: right;
        color: #BFBFBF;
        font-size: 15px;
        margin-right: 6px;
    }
    .batch-input{
        flex-grow: 1;
        text-align: right;
        color: #BFBFBF;
        font-size: 15px;
        margin-right: 12px;
    }
    .price-input{
        background-color: #E8E9EB;
        width: 41px;
        height: 26px;
        margin-right: 8px;
    }
    .last-title{
        color: #333333;
        font-size: 15px;
        margin-right: 12px;
    }
    .input-view{
        width: 90px;
        height: 30px;
        background-color: #E8E9EB;
        margin-right: 8px;
        display: flex;
        align-items: center;
    }
    .minus-plus-view{
        width: 25px;
        height: 30px;
        line-height:30px;
        color: #9C9C9C;
        text-align: center;
    }
    .count-view{
        flex-grow: 1;
        height: 30px;
        text-align: center;
        line-height:30px;
    }
    .arrow-image{
        width: 6px;
        height: 11px;
        margin-right: 12px;
    }
    .line-view{
        background-color: #ECECEC;
        height: 1px;
    }
</style>