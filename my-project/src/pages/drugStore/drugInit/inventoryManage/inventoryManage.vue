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
            <manage-stock-cell></manage-stock-cell>
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

</style>