<template>
    <div class="home">
        <!-- 轮播图 -->
        <div class="home-swiper-class">
            <swiper
                indicator-dots="true"
                autoplay="true"
                interval="2000"
                duration="500"
                circular="true"
                indicator-color="#FFFFFF"
                indicator-active-color="#FFA439">
                <swiper-item>
                    <img @click="clickItem" src="/static/images/carousel/1.jpg" alt="">
                </swiper-item>
                <swiper-item>
                    <img src="/static/images/carousel/2.jpg" alt="">                    
                </swiper-item>
                <swiper-item>
                    <img src="/static/images/carousel/3.jpg" alt="">
                </swiper-item>
            </swiper>
        </div>
        <!-- 分割线 -->
        <div class="line"></div>
        <!-- 有效期预警、库存预警、待办事项 -->
        <div class="warn-list">
            <home-cell :item="validity"></home-cell>
            <home-cell :item="inventory"></home-cell>
            <home-cell :item="undone"></home-cell>
        </div>
        <!-- 分割线 -->
        <div class="line"></div>
        <!-- 快捷功能 -->
        <div class="convenient-list">
            <!-- 列表 -->
            <div>
                <home-cell v-for="(item,index) in dataList" :key="index" :item="item"/>
            </div>
            <!-- 快捷功能按钮 -->
            <div class="bottom-button">
                <img src="/static/images/home/functionAddButton.png" alt="">
                <span>添加快捷功能</span>
            </div>
        </div>
    </div>
</template>

<script>
    import homeCell from './template/homeCell'
    export default{
        components:{
            homeCell
        },
        data() {
            return {
                validity:{
                   imageUrl:'/static/images/home/validity_warn.png',
                   title:'有效期预警',
                   subTitle:'共0条预警信息',
                   count:'0'
                },
                inventory:{
                   imageUrl:'/static/images/home/inventory.png',
                   title:'库存预警',
                   subTitle:'共0条预警信息',
                   count:'0'  
                },
                undone:{
                   imageUrl:'/static/images/home/undone.png',
                   title:'待办事项',
                   subTitle:'-',
                   count:'-1'  
                },
                dataList:[
                    {
                        imageUrl:'/static/images/home/receiveList.png',
                        title:'接诊列表',
                        subTitle:'查看历史接诊记录',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/patientList.png',
                        title:'患者列表',
                        subTitle:'管理患者',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/chargeList.png',
                        title:'收费列表',
                        subTitle:'当前等待收费的患者',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/sendList.png',
                        title:'发药列表',
                        subTitle:'当前等待发药的患者',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/purchaseDrug.png',
                        title:'采购入库',
                        subTitle:'扫码直接入库',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/inventoryQuery.png',
                        title:'库存查询',
                        subTitle:'库存流水、有效期查询',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/drugInit.png',
                        title:'药品初始化',
                        subTitle:'初始化您的药品库',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/drugIncome.png',
                        title:'处方收入分析',
                        subTitle:'门诊金额、门诊毛利统计',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/diseaseAnalysis.png',
                        title:'疾病数据分析',
                        subTitle:'疾病类型比例、高频疾病统计',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/patientAnalysis.png',
                        title:'患者分析',
                        subTitle:'患者年龄、性别比例统计',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/inventoryAnalysis.png',
                        title:'库存分析',
                        subTitle:'有效期预警、库存预警药品统计',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/myNews.png',
                        title:'我的消息',
                        subTitle:'系统推送的消息',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/information.png',
                        title:'资讯',
                        subTitle:'系统推送的资讯',
                        count:'-1'  
                    },
                    {
                        imageUrl:'/static/images/home/accountSetting.png',
                        title:'账号设置',
                        subTitle:'管理诊所所有账号信息',
                        count:'-1'  
                    }
                ]
            }
        },
        methods: {
            clickItem(){
                console.log('点击了item');
            }
        },
    }
</script>

<style>
    .home-swiper-class{
        background-color: rgb(240, 16, 65)
    }
    .home-swiper-class swiper{
        width: 100%;
        height: 252rpx;
    } 
    .home-swiper-class swiper img{
        width: 100%;
        height: 100%;
    }
    .line{
        background-color: #F1F2F4;
        height: 20rpx;
        width: 100%;
    }
    .warn-list{
        background-color: white;
    }
    .convenient-list{
        background-color: antiquewhite;
    }
    .bottom-button{
        background-color: #F1F2F4;
        width: 100%;
        height: 90rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .bottom-button img{
        width: 32rpx;
        height: 32rpx;
    }
    .bottom-button span{
        color: #888888;
        font-size: 28rpx;
        font-weight: 500;
        margin-left: 9rpx;
    }
</style>
