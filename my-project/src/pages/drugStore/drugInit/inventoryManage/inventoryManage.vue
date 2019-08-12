<template>
    <div class="main-view">
        <!-- 头部信息 -->
        <div class="head-view">
            <!-- 仓库 -->
            <div class="content-view">
                <div>仓库</div>
                <div>仓库1</div>
                <img src="/static/images/drugstore/drugInit/more.png" alt="">
            </div>
            <div class="line-view"></div>
            <!-- 供应商 -->
            <div class="content-view">
                <div>供应商</div>
                <div>澳美制药</div>
                <img src="/static/images/drugstore/drugInit/more.png" alt="">
            </div>
            <div class="line-view"></div>
            <!-- 入库时间 -->
            <div class="content-view">
                <div>入库时间</div>
                <div>2018-08-12</div>
                <img src="/static/images/drugstore/drugInit/more.png" alt="">
            </div>
        </div>
        <!-- 列表信息 -->
        <div class="list-view">
            <manage-stock-cell v-for="(item, index) in listArray" :key="index"></manage-stock-cell>
        </div>
        <!-- 添加批次 -->
        <div class="add-batch">
            <div>+</div>
            <div>添加批次</div>
        </div>
    </div>
</template>

<script>
import manageStockCell from '@/pages/drugStore/drugInit/inventoryManage/template/manageStockCell'
export default {
  components:{
      manageStockCell
  },  
  data () {
    return {
        listArray:[1,2,3,4,5,6,7,8,9,0]
    };
  }
}
</script>

<style scoped>
    .main-view{
        background-color: #eee;
    }
    .head-view{
        background-color: white;
    }
    .content-view{
        height: 45px;
        display: flex;
        align-items: center;
    }
    .content-view > div:first-child{
        color: #333333;
        font-size: 15px;
        margin-left: 12px;
    }
    .content-view > div:first-child::before{
        content: '* ';
        font-size: 15px;
        color: #F84848;
    }
    .content-view > div:nth-child(2){
        color: #333333;
        font-size: 15px;
        flex-grow: 1;
        text-align: right;
        margin-right: 9px;
    }
    .content-view > img{
        width: 6px;
        height: 11px;
        margin-right: 12px;
    }
    .line-view{
        background-color: #ECECEC;
        height: 1px;
        margin-left: 12px;
    }
    .list-view{
        margin-bottom: 44px;
    }
    .add-batch{
        background-color: #1F91F2;
        height: 44px;
        position: fixed;
        left: 0px;
        right: 0px;
        bottom: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .add-batch > div{
        color: #FFFFFF;
        font-size: 18px;
    }
    .add-batch > div:first-child{
        margin-right: 8px;
    }
</style>