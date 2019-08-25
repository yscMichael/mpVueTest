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
            <picker mode="date"
                    start="2000-01-01" 
                    end="2100-01-01" 
                    @change="expireDateChange">
                <div class="content-view">
                    <div class="red-title">失效日期</div>
                    <input class="date-input" type="text" placeholder="请选择" disabled='disabled' v-model="item.expire_date">
                    <img class="arrow-image" src="/static/images/drugstore/drugInit/more.png" alt="">
                </div> 
            </picker>  
            <div class="line-view"></div>
            <!-- 批号 -->
            <div class="content-view">
                <div class="white-title">批号</div>
                <input class="batch-input" type="text" placeholder="请输入批号" v-model="item.batch_no">
            </div> 
            <div class="line-view"></div>
            <!-- 进货单价 -->
            <div class="content-view">
                <div class="white-title">进货单价</div>
                <div class="grow-flex"></div>
                <input class="price-input" v-model="item.cost">
                <div class="last-title">盒</div>
            </div> 
            <div class="line-view"></div>
            <!-- 库存数量(包装单位) -->
            <div class="content-view">
                <div class="red-title">库存数量</div>
                <div class="grow-flex"></div>
                <div class="input-view">
                    <div class="minus-plus-view" @click="clickReduceMinCount">-</div>
                    <input class="count-view" v-model="item.minCount">
                    <div class="minus-plus-view" @click="clickAddMinCount">+</div>
                </div>
                <div>{{item.min_name}}</div>
            </div> 
            <!-- 库存数量(拆零单位) -->
            <div class="content-view">
                <div class="white-title"></div>
                <div class="grow-flex"></div>
                <div class="input-view">
                    <div class="minus-plus-view" @click="clickReduceRxCount">-</div>
                    <input class="count-view" v-model="item.rxCount">
                    <div class="minus-plus-view" @click="clickAddRxCount">+</div>
                </div>
                <div>{{item.rx_name}}</div>
            </div> 
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
    },
    data () {
        return {
            disabled:true
        };
    },
    methods: {
        expireDateChange(e){
            console.log('失效时间');
            this.$emit('expireDateChange',e.mp.detail.value);
            console.log(e.mp.detail.value);
            this.item.expire_date = e.mp.detail.value;
        },
        // 点击包装-
        clickReduceMinCount(){
            this.item.minCount = parseInt(this.item.minCount) - 1;
        },
        //点击包装+
        clickAddMinCount(){
            this.item.minCount = parseInt(this.item.minCount) + 1;
        },
        //点击拆零-
        clickReduceRxCount(){   
            this.item.rxCount = parseInt(this.item.rxCount) - 1;
        },
        //点击拆零+
        clickAddRxCount(){
            this.item.rxCount = parseInt(this.item.rxCount) + 1;
        }
    },
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
        text-align: center;
    }
    .last-title{
        color: #333333;
        font-size: 15px;
        margin-right: 12px;
    }
    .input-view{
        width: 100px;
        height: 30px;
        background-color: #E8E9EB;
        margin-right: 8px;
        display: flex;
        align-items: center;
    }
    .minus-plus-view{
        flex: 0 0 30px;
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