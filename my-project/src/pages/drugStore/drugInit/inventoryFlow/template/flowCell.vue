<template>
    <div class="main-view">
        <!-- 标识 -->
        <div :class="[(reviewState==2)?'flag-red-view':'flag-green-view']">
            <div :class="[(reviewState==2)?'flag-red-title':'flag-green-title',bigFontSzie?'font-size-16':'font-size-12']">{{item.type?item.type.key_name:''}}</div>
        </div>
        <!-- 内容 -->
        <div class="head-view">
            <img src="/static/images/drugstore/drugInit/time.png " alt="">
            <div>{{item.create_time?item.create_time:''}}</div>
        </div>
        <div class="content margin-top-10">
            <div>仓库：</div>
            <div>{{item.warehouse_id?item.warehouse_id.key_name:''}}</div>
        </div>
        <div class="content margin-top-5">
            <div>供应商：</div>
            <div>{{item.vendor_id?item.vendor_id.key_name:''}}</div>
        </div>
        <div class="content margin-top-5">
            <div>入库单号：</div>
            <div>{{item.pw_number}}</div>
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
        <div class="content margin-top-5">
            <div>{{item.type?item.type.key_name:''}}量：</div>
            <div>{{countString}}</div>
        </div>
        <div class="content margin-top-5 text-bold">
            <div>剩余量：</div>
            <div>{{remainString}}</div>
        </div>
        <div class="content margin-top-5 margin-bottom-10">
            <div>操作人：</div>
            <div>{{item.handle_entity?item.handle_entity.key_name:''}}</div>
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
    },
    computed: {
        // 操作量
        countString(){
            var unit = this.item.rx_unit ? this.item.rx_unit.key_name : '';
            var count = this.item.count ? this.item.count : '0';
            return count + unit;
        },
        // 剩余量(库存)
        remainString(){
            // 1、包装数量和单位
            var minCount = parseFloat(this.item.total_count?this.item.total_count:'0') / parseInt(this.item.change_count?this.item.change_count:'1');
            var minUnit = this.item.min_unit ? this.item.min_unit.key_name:'';
            // 2、拆零数量和单位
            var rxCount = parseFloat(this.item.total_count?this.item.total_count:'0') - minCount * parseInt(this.item.change_count?this.item.change_count:'1');
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
        // 状态
        reviewState(){
            return parseInt(this.item.calc_type);
        },
        bigFontSzie(){
            var typeString = this.item.type ? this.item.type.key_name : '';
            console.log(typeString);
            if (typeString.length > 2) {
                console.log('truetruetruetrue');
                return false;  
            }else{
                console.log('falsefalsefalsefalse');
                return true;
            }
        }
    },
}
</script>

<style scoped>
    .main-view{
        background-color: white;
        padding: 1rpx;
        position: relative;
    }
    .flag-green-view{
        width: 61px;
        height: 61px;
        position: absolute;
        top: 15px;
        left: 80px;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAAClCAYAAADFy8YtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA2RTVDMzk0N0I2RTExRTlBREUyRTMyNTJGNUI5NDlEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA3MTBGNjdDN0I2RTExRTlBREUyRTMyNTJGNUI5NDlEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDZFNUMzOTI3QjZFMTFFOUFERTJFMzI1MkY1Qjk0OUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDZFNUMzOTM3QjZFMTFFOUFERTJFMzI1MkY1Qjk0OUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Q09/DAAAYS0lEQVR42uxdCZgV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);
        background-repeat:no-repeat;
        background-size:100% 100%;
        transform: rotateZ(-45deg);

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .flag-red-view{
        width: 61px;
        height: 61px;
        position: absolute;
        top: 15px;
        left: 80px;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAABuCAYAAAD21zfaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA2N0MxMTVGN0I2RTExRTlBREUyRTMyNTJGNUI5NDlEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA2N0MxMTYwN0I2RTExRTlBREUyRTMyNTJGNUI5NDlEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDY3QzExNUQ3QjZFMTFFOUFERTJFMzI1MkY1Qjk0OUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDY3QzExNUU3QjZFMTFFOUFERTJFMzI1MkY1Qjk0OUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz79yMtMAAAOcklEQVR42uxdCZRU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);
        background-repeat:no-repeat;
        background-size:100% 100%;
        transform: rotateZ(-40deg);

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .flag-green-title{
        color: #1CB865;
        
    }
    .flag-red-title{
        color: #FF4E4E;
    }
    .font-size-16{
        font-size: 16px;
    }
    .font-size-12{
        font-size: 12px;
    }
    .head-view{
        background-color: #F1F2F4;
        height: 26px;
        display: flex;
        align-items: center;
    }
    .head-view > img{
        width: 12px;
        height: 12px;
        margin-left: 12px;
    }
    .head-view > div{
        margin-left: 5px;
        color: #888888;
        font-size: 12px;
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
    .text-bold{
        font-weight: bold;
    }
</style>