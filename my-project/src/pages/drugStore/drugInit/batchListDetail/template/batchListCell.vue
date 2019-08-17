<template>
    <div class="main-view">
        <div class="line-view"></div>
        <img class="flag-image-view" src="/static/images/drugstore/drugInit/expire_date.png" alt="">
        <div class="content margin-top-10">
            <div>仓库：</div>
            <div>{{item.warehouse_id.key_name}}</div>
        </div>
        <div class="content margin-top-5">
            <div>供应商：</div>
            <div>{{item.vendor_id.key_name}}</div>
        </div>
        <div class="content margin-top-5">
            <div>入库单号：</div>
            <div>{{item.pw_number}}</div>
        </div>
        <div class="content margin-top-5">
            <div>入库日期：</div>
            <div>{{item.in_date}}</div>
        </div>
        <div class="content margin-top-5">
            <div>失效日期：</div>
            <div>{{item.expire_date}}</div>
        </div>
        <div class="content margin-top-5">
            <div>批号：</div>
            <div>{{item.batch_no}}</div>
        </div>
        <div class="content margin-top-5">
            <div>进货单价：</div>
            <div>{{item.packing_price?item.packing_price:'0'}}元</div>
        </div>
        <div class="content margin-top-5 margin-bottom-10">
            <div>数量：</div>
            <div>{{item.count}}{{item.rx_unit.key_name}}</div>
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
        }
    },
    data () {
        return {
        };
    }
}
</script>

<style scoped>
    .main-view{
        background-color: white;
        border: 1rpx solid white;
        position: relative;
    }
    .line-view{
        background-color: #F1F0F5;
        height: 10px;
    }
    .flag-image-view{
        width: 60px;
        height: 55px;
        position: absolute;
        top: 0px;
        left: 80px;
    }
    .content{
        display: flex;
        align-items: center;
    }
    .content > div:first-child{
        color: #333333;
        font-size: 15px;
        margin-left: 15px;
    }
    .content > div:last-child{
        color: #888888;
        font-size: 15px;
        text-align: right;
        flex-grow: 1;
        margin-right: 15px;
        margin-left: 5px;
    }
    .margin-top-10{
        margin-top: 10px;
    }
    .margin-top-5{
        margin-top: 5px;
    }
    .margin-bottom-10{
        margin-bottom: 10px;
    }
</style>