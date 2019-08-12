<template>
    <div class="main-view">
        <!-- 有效期预警 -->
        <div class="validity-title">
            <div>有效期预警</div>
            <div>5个月</div>
        </div>
        <div class="validity-list">
            <div class="flex-item">
                <div class="grow-flex"></div>
                <div class="flex-item-title">1个月</div>
                <div class="grow-flex"></div>
                <div class="flex-item-title">2个月</div>
                <div class="grow-flex"></div>
                <div class="flex-item-title">3个月</div>
                <div class="grow-flex"></div>
            </div>
            <div class="flex-item">
                <div class="grow-flex"></div>
                <div class="flex-item-title">4个月</div>
                <div class="grow-flex"></div>
                <div class="flex-item-title">5个月</div>
                <div class="grow-flex"></div>
                <div class="flex-item-title">6个月</div>
                <div class="grow-flex"></div>     
            </div>
        </div>
        <!-- 库存安全范围 -->
        <div class="inventory-title">
            <div>库存安全范围</div>
            <div class="grow-flex"></div>
            <input type="text">
            <div></div>
            <input type="text">
            <div>盒</div>
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
    .flex-item{
        height: 60px;
        background-color: white;
        display: flex;
        align-items: center;
    }
    .flex-item-title{
        background-color: #F2F3F7;
        color: #000000;
        font-size: 16px;
        height: 39px;
        line-height: 39px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 39px;
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
        background-color: #E8E9EB;
    }
    .inventory-title > div:last-child{
        color: #333333;
        font-size: 15px;
        margin-right: 12px;
        margin-left: 5px;
    }
</style>