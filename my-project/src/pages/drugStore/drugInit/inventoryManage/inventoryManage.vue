<template>
    <div class="main-view">
        <!-- 头部信息 -->
        <div class="head-view">
            <!-- 仓库 -->
            <div class="content-view" @click="clickWarehouse">
                <div>仓库</div>
                <div>{{item.warehouse_name}}</div>
                <img src="/static/images/drugstore/drugInit/more.png" alt="">
            </div>
            <div class="line-view"></div>
            <!-- 供应商 -->
            <div class="content-view" @click="clickVendor">
                <div>供应商</div>
                <div>{{item.vendor_name}}</div>
                <img src="/static/images/drugstore/drugInit/more.png" alt="">
            </div>
            <div class="line-view"></div>
            <!-- 入库时间 -->
            <picker mode="date"
                    start="2000-01-01" 
                    end="2100-01-01" 
                    @change="inDateChange">
                <div class="content-view">
                    <div>入库时间</div>
                    <div>{{item.in_date}}</div>
                    <img src="/static/images/drugstore/drugInit/more.png" alt="">
                </div>
            </picker>    
        </div>
        <!-- 列表信息 -->
        <div class="list-view">
            <manage-stock-cell v-for="(item, index) in listArray" 
                               :key="index"
                               :item="item">
            </manage-stock-cell>
        </div>
        <!-- 添加批次 -->
        <div class="add-batch">
            <div>+</div>
            <div @click="addInventory">添加批次</div>
        </div>
    </div>
</template>

<script>
import notificationCenter from '@/notification'
import manageStockCell from '@/pages/drugStore/drugInit/inventoryManage/template/manageStockCell'
export default {
  components:{
      manageStockCell
  },  
  data () {
    return {
        item:{
            warehouse_name:'',//仓库
            vendor_name:'',//供应商
            in_date:'',//入库时间
            min_name:'',//包装单位
            rx_name:'',//拆零单位
            change_count:'',//包装与拆零单位换算
        },
        // 仓库参数
        warehouseParam:{
            op:'List',
            cloud:'warehouse',
            _type:'json',
            _password:this.globalData.password,
            _userid:this.globalData.userid
        },
        // 供应商参数
        vendorParam:{
            op:'List',
            cloud:'vendor',
            _type:'json',
            _password:this.globalData.password,
            _userid:this.globalData.userid
        },
        // 仓库数据源
        warehouseDataSource:[],   
        // 供应商数据源
        vendorDataSource:[],
        listArray:[]
    };
  },
  methods: {
    // 时间转换字符串
    dateToString(date){ 
        var year = date.getFullYear(); 
        var month =(date.getMonth() + 1).toString(); 
        var day = (date.getDate()).toString();  
        if (month.length == 1) { 
            month = "0" + month; 
        } 
        if (day.length == 1) { 
            day = "0" + day; 
        }
        var dateTime = year + "-" + month + "-" + day;
        return dateTime; 
    },
    // 字符串转时间
    stringToDate(dateStr,separator){
        if(!separator){
            separator="-";
        }
        var dateArr = dateStr.split(separator);
        var year = parseInt(dateArr[0]);
        var month;
        //处理月份为04这样的情况                         
        if(dateArr[1].indexOf("0") == 0){
            month = parseInt(dateArr[1].substring(1));
        }else{
            month = parseInt(dateArr[1]);
        }
        var day = parseInt(dateArr[2]);
        var date = new Date(year,month -1,day);
        return date;
    },
    // 仓库数据
    getWarehouseData(){
        this.warehouseDataSource = [];
        // 1、参数赋值
        this.warehouseParam._userid = this.globalData.userid;
        this.warehouseParam._password = this.globalData.password;
        // 2、网络参数
        this.$fly.get('/app',this.warehouseParam)
        .then((response) => {
            console.log('仓库数据');
            console.log(response);
            var code = response.data.code;
            if (parseInt(code) == 200) {
                var rows = response.data.rows;
                for (let index = 0; index < rows.length; index++) {
                    var element = rows[index];
                    var warehouseModel = {
                        id:'',
                        key_name:''
                    };
                    warehouseModel.id = element.id;
                    warehouseModel.key_name = element.key_name;
                    this.warehouseDataSource.push(warehouseModel);
                    // 界面赋值
                    var firstItem = this.warehouseDataSource[0];
                    this.item.warehouse_name = firstItem.key_name;
                }
            }
        })
        .catch(function(error){
        });
    },
    // 供应商数据
    getVendorData(){
        // 1、参数赋值
        this.vendorParam._userid = this.globalData.userid;
        this.vendorParam._password = this.globalData.password;
        // 2、网络参数
        this.$fly.get('/app',this.vendorParam)
        .then((response) => {
            console.log('仓库数据');
            console.log(response);
            var code = response.data.code;
            if (parseInt(code) == 200) {
                var rows = response.data.rows;
                for (let index = 0; index < rows.length; index++) {
                    var element = rows[index];
                    var vendorModel = {
                        id:'',
                        key_name:''
                    };
                    vendorModel.id = element.id;
                    vendorModel.key_name = element.key_name;
                    this.vendorDataSource.push(vendorModel);
                    // 界面赋值
                    var firstItem = this.vendorDataSource[0];
                    this.item.vendor_name = firstItem.key_name;
                }
            }
        })
        .catch(function(error){
        });
    },
    // 点击仓库
    clickWarehouse(){
        wx.navigateTo({
            url: '/pages/drugStore/drugInit/wareHouse/main',
        });
    },
    // 仓库--变化
    wareHouseChange(house_name){
        this.item.warehouse_name = house_name;
    },
    // 点击供应商
    clickVendor(){
        wx.navigateTo({
            url: '/pages/drugStore/drugInit/vendorManage/main',
        });
    },
    // 供应商--变化
    vendorChange(vendor_name){
        this.item.vendor_name = vendor_name;
    },
    // 入库时间--变化
    inDateChange(e){
        console.log('入库时间');
        console.log(e.mp.detail.value);
        this.item.in_date = e.mp.detail.value;
    },
    // 添加批次  
    addInventory(){
        console.log('添加批次-------');
        var listModel = {
            expire_date:'',//失效日期
            batch_no:'',//批号
            cost:'0',//进货单价
            count:'0',//库存总数量
            minCount:'0',//库存数量(包装单位)
            rxCount:'0',//库存数量(拆零单位)
            min_name:this.item.min_name,//包装单位
            rx_name:this.item.rx_name,//拆零单位
            chang_count:this.item.chang_count,//包装与拆零单位换算
        };
        this.listArray.push(listModel);
    }
  },
  onLoad: function (options) {
    // 1、时间转换  
    this.item.in_date = this.dateToString(new Date());
    // 模型转换
    var tempModel = JSON.parse(options.item);
    this.item.min_name = tempModel.min_name?tempModel.min_name:'';
    this.item.rx_name = tempModel.rx_name?tempModel.rx_name:'';
    this.item.change_count = tempModel.change_count?tempModel.change_count:'';
    // 2、添加通知
    notificationCenter.addNotification('wareHouseChange', this.wareHouseChange, this);
    notificationCenter.addNotification('vendorChange', this.vendorChange, this);
    // 3、添加批次模型
    var listModel = {
        expire_date:'',//失效日期
        batch_no:'',//批号
        cost:'0',//进货单价
        count:'0',//库存总数量
        minCount:'0',//库存数量(包装单位)
        rxCount:'0',//库存数量(拆零单位)
        min_name:this.item.min_name,//包装单位
        rx_name:this.item.rx_name,//拆零单位
        chang_count:this.item.chang_count,//包装与拆零单位换算
    };
    this.listArray = [];
    this.listArray.push(listModel);
    // 4、仓库数据请求
    this.getWarehouseData();
    // 5、供应商数据请求
    this.getVendorData();
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