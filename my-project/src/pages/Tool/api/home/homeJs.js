// 获取有效期预警数据
export function getValidityInitData(){
    var validityData = {
        imageUrl:'/static/images/home/validity_warn.png',
        title:'有效期预警',
        subTitle:'共0条预警信息',
        count:'0'
     };
     return validityData;
}

// 获取库存预警数据
export function getInventoryInitData(){
    var inventoryData = {
        imageUrl:'/static/images/home/inventory.png',
        title:'库存预警',
        subTitle:'共0条预警信息',
        count:'0'  
     };
     return inventoryData;
}

// 获取待办事项数据
export function getUndoneInitData(){
    var undoneData = {
        imageUrl:'/static/images/home/undone.png',
        title:'待办事项',
        subTitle:'-',
        count:'-1'    
     };
     return undoneData;
}

//快捷功能列表
export function getFastListData(){
    var dataList = [{
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
        }];
     return dataList;
}


export default{
    getValidityInitData,
    getInventoryInitData,
    getUndoneInitData,
    getFastListData
}