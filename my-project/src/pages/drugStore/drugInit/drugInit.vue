<template>
    <div class="mainBackgroundView">
        <!-- 顶部栏 -->
        <div class="toolBar">
            <div :class="['toolBarItem',(selectIndex == i)?'toolBarActive':'']" 
                 v-for="(item,i) in buttonArray" 
                 :key="i"
                 @click="clickBarItem(i)">
              {{item.title}}
            </div>
        </div>
        <!-- 四个列表界面 -->
        <div class="containerListView">
            <swiper class="swiper-scrollView"
                    :current="selectIndex"
                    @change="scrollViewChange">
                <!-- 西药 -->
                <swiper-item>
                  <!-- <div>西药</div> -->
                  <west-drug-list @func="getWestTotalFromSon" 
                                  ref="westdrug"
                                  :screenWidth="screenWidth"
                                  :screenHeight="screenHeight"></west-drug-list>
                </swiper-item>
                <!-- 中成药 -->
                <swiper-item>
                  <!-- <div>中成药</div> -->
                  <special-drug-list @func="getSpecialTotalFromSon" 
                                     ref="specialdrug"
                                     :screenWidth="screenWidth"
                                     :screenHeight="screenHeight"></special-drug-list>
                </swiper-item>
                <!-- 中药 -->
                <swiper-item>
                  <!-- <div>中药</div> -->
                  <chinese-drug-list @func="getChineseTotalFromSon" 
                                     ref="chinesedrug"
                                     :screenWidth="screenWidth"
                                     :screenHeight="screenHeight"></chinese-drug-list>
                </swiper-item>
                <!-- 医疗器械 -->
                <swiper-item>
                  <!-- <div>医疗器械</div> -->
                  <instrument-list @func="getInstrumentTotalFromSon" 
                                   ref="instrument"
                                   :screenWidth="screenWidth"
                                   :screenHeight="screenHeight"></instrument-list>
                </swiper-item>
            </swiper>
        </div>
        <!-- 底部添加界面 -->
        <div class="bottom-button">
            <img src="/static/images/drugstore/drugInit/shop.png" alt="">
            <div>已添加(种)：</div>
            <div>{{parentTotalCount}}</div>
            <picker mode="selector"
                    @change="bindSelectInitDrugType" 
                    :range="initDrugTypeArr">
              <div class="add-button">继续添加</div>
            </picker>
        </div>
        <!-- 底部弹出界面 -->
        <div class="main-back-view" v-show="showPicker">
          <div class="main-picker-view">
            <!-- 标题 -->
            <div class="picker-title">选择药品类型</div>
            <!-- 选择内容 -->
            <div class="choose-view" 
                 v-for="(item,index) in drugTypeArr" 
                 :key="index"
                @click="clickChooseItem(index)">{{item}}</div>
            <!-- 底部取消按钮 -->
            <div class="picker-cancel" @click="clickCancelPicker">取消</div>
          </div>
        </div>
    </div>
</template>

<script>
import westDrugList from '@/pages/drugStore/drugInit/childListView/westDrugList/westDrugList'
import specialDrugList from '@/pages/drugStore/drugInit/childListView/specialDrugList/specialDrugList'
import chineseDrugList from '@/pages/drugStore/drugInit/childListView/chineseDrugList/chineseDrugList'
import instrumentList from '@/pages/drugStore/drugInit/childListView/instrumentList/instrumentList'
import notificationCenter from '@/notification'

export default {
  components:{
    westDrugList,
    specialDrugList,
    chineseDrugList,
    instrumentList
  },
  data () {
    return {
      showPicker:false,//不显示底部弹出框
      drugTypeArr:['西药','中成药','中药','医疗器械'],//药品类型
      selectIndex:0,
      parentTotalCount:0,
      westTotalCount:0,
      specialTotalCount:0,
      chineseTotalCount:0,
      instrumentTotalCount:0,
      screenWidth:'0',
      screenHeight:'0',
      buttonArray:[
        {id:0, title:'西药'},
        {id:1, title:'中成药'},
        {id:2, title:'中药'},
        {id:3, title:'医疗器械'}
      ],
      initDrugTypeArr:[
        '扫码添加', 
        '搜索添加', 
        '自定义添加'
      ]
    };
  },
  methods: {
    //顶部切换条
    clickBarItem(data){
      this.selectIndex = data;
      switch (data) {
        case 0:
          this.parentTotalCount = this.westTotalCount;
          break;
        case 1:
          this.parentTotalCount = this.specialTotalCount;
          break;
        case 2:
          this.parentTotalCount = this.chineseTotalCount;
          break;
        case 3:
          this.parentTotalCount = this.instrumentTotalCount;
          break;
        default:
          break;
      }
    },
    // scroll滚动事件
    scrollViewChange(e){
      this.selectIndex = e.mp.detail.current;
    },
    // 继续添加弹出框
    bindSelectInitDrugType(e){
      console.log(e.mp.detail.value);
      var value = parseInt(e.mp.detail.value);
      if (value == 0) {//扫码添加
        this.addDrugByScan();
      }else if(value == 1){//搜索添加
        this.addFromSearch();
      }else if(value == 2){//自定义添加
        this.addFromCustomize();
      }else{//自定义添加
        this.addFromCustomize();
      }
    },
    // 扫码添加
    addDrugByScan(){
      console.log('扫码添加');
      wx.scanCode({
        onlyFromCamera: false,
        scanType: ['barCode'],
        success: (result)=>{
          console.log(result.result);
          var code = result.result;
          this.checkMedicineisInit(code);
        },
        fail: ()=>{
          wx.showToast({
            title: '扫码失败',
            icon: 'none',
            duration: 1500,
            mask: false
          });
        },
      });
    },
    // 搜索添加
    addFromSearch(){
      console.log('搜索添加');
      // 当前药品类型
      wx.navigateTo({
        url: '/pages/drugStore/drugInit/searchAdd/main',
      });
    },
    // 自定义添加
    addFromCustomize(){
      console.log('自定义添加');
      // 显示弹出框
      this.showPicker = true;
    },
    // 点击某个药品类型(自定义添加)
    clickChooseItem(index){
      console.log('点击某个药品类型');
      console.log(index);
      // 1、关闭弹出框
      this.showPicker = false;
      // 2、初始化模型
      var tempModel = this.initListModel();
      // 3、药品类型赋值
      switch (index) {
        case 0:
          tempModel.dug_type_name = '西药';
          tempModel.dug_type_id = 1;
          break;
        case 1:
          tempModel.dug_type_name = '中成药';
          tempModel.dug_type_id = 2;
          break;
        case 2:
          tempModel.dug_type_name = '中药';
          tempModel.dug_type_id = 3;
          break;
        case 3:
          tempModel.dug_type_name = '医疗器械';
          tempModel.dug_type_id = 4;
          break;
        default:
          break;
      }
      console.log('点击某个药品类型--------自定义添加');
      console.log(tempModel.dug_type_id);
      // 4、进入详情界面、可编辑
      wx.navigateTo({
        url: '/pages/drugStore/drugInit/drugInitDetail/main?item=' + JSON.stringify(tempModel),
      });
    },
    // 点击picker取消按钮
    clickCancelPicker(){
      this.showPicker = false;
    },
    // 扫码添加
    //1、根据code码查询药品是否已经初始化过
    checkMedicineisInit(uuid){
      var codeParam = {
        _userid:this.globalData.userid,
        _password:this.globalData.password,
        uuid:uuid
      };
      this.$fly.get('/cloud/prj/gmi/base/api/BaseApi?op=DrugFromBasic',codeParam)
        .then((response) => {
          console.log('根据code码查询药品是否已经初始化过');
          console.log(response);
          var code = response.data.code;
          if (parseInt(code) == 202) {//已经初始化过、接着根据code查询药品信息
            console.log('已经初始化过、接着根据code查询药品信息');
            this.loadDrugInformation(uuid);
          }
          else if(parseInt(code) == 200){//未初始化过、接着查询基础库里面有没有
            console.log('未初始化过、接着查询基础库里面有没有');
            this.checkDrugInBase(uuid);
          }
          else{//暂时不处理
            wx.showToast({
              title: '查询失败',
              icon: 'none',
              duration: 1500,
              mask: false
            });
          }
        })
        .catch(function(error){
          wx.showToast({
            title: "数据加载失败",
          });
        });
    },
    // 2.1、根据条形码获取药品信息
    loadDrugInformation(code){
      var drugParams = {
        _userid: this.globalData.userid,
        _password: this.globalData.password,
        key_word: code,
        page:1,
        rows:10
      };
      this.$fly.get('/app?op=Page&cloud=drug',drugParams)
        .then((response) => {
          console.log('根据条形码获取药品信息');
          console.log(response);
          var rows = response.data.rows;
          if (rows.length > 0) {
            // 判断review_state
            var model = rows[0];
            var review_state = model.review_state?model.review_state.id : 0;
            if (parseInt(review_state) == 0) {//已经禁用了
                wx.showToast({
                  title: '该药品已禁用,如需启用,请在电脑端-基础设置菜单修改',
                  icon: 'none',
                  duration: 1500,
                  mask: false
                });
            }else{//进入药品初始化详情
              console.log('进入药品初始化详情');
              console.log(model);
              //1、这里先进行提示，是否修改已经初始化过的
              wx.showModal({
                title: '提示',
                content: '该药品已初始化，是否修改？',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (result) => {
                  if(result.confirm){
                    // 进入到详情界面
                    this.goToEditDetailByScan(model);
                  }else if(result.cancel){
                    // 继续扫码添加
                    this.addDrugByScan();
                  }
                }
              });
            }
          }else{//药品已经禁用
            wx.showToast({
              title: '该药品已禁用,如需启用,请在电脑端-基础设置菜单修改',
              icon: 'none',
              duration: 1500,
              mask: false
            });
          }
        })
        .catch(function(error){
          wx.showToast({
            title: "数据加载失败",
          });
        });
    },
    // 2.2、根据code查询药品是否在基础库
    checkDrugInBase(uuid){
      console.log('查询基础库');
      var drugParam = {
        _userid: this.globalData.userid,
        _password: this.globalData.password,
        page: 1,
        rows:50,
        key_word:uuid
      };
      this.$fly.get('/app?op=Page&cloud=drug_basis',drugParam)
        .then((response) => {
          console.log('根据code查询药品是否在基础库');
          console.log(response);
          var rows = response.data.rows;
          if (rows.length > 0) {//基础库里面有、进入详情界面、不可编辑
              var model = rows[0];
              this.goToNoEditDetailByScan(model);
          }else{//基础库中没有、直接查询第三方接口
            this.loadDrugFromNetAPI(uuid);
          }
        })
        .catch(function(error){
          wx.showToast({
            title: "数据加载失败",
          });
        });
    },
    // 进入到详情界面
    goToEditDetailByScan(model){
      //1、这里要对image进行特殊编码(防止出现特殊字符、解析失败)
      if (model.image) {//编码
        model.image = model.image[0].url;
        model.image = encodeURIComponent(model.image);
      }
      //2、界面传值
      wx.navigateTo({
        url: '/pages/drugStore/drugInit/drugInitDetail/main?item=' + JSON.stringify(model),
      });
    },
    // 从第三方接口查询药品信息
    loadDrugFromNetAPI(uuid){
      console.log('从第三方接口查询药品信息');
      wx.showLoading({
        title: '第三方数据加载中...',
      });
      var tempURl = '/barcode/barcode?barcode=' + uuid;
      this.$otherFly.get(tempURl)
        .then((response) => {
          wx.hideLoading();
          // 初始化模型
          var tempModel = this.initListModel();
          // 根据第三方信息进行赋值
          var result = response.data;
          // 条形码
          tempModel.uuid = uuid;
          // 通用名
          tempModel.common_name = result.name ? result.name : '';
          // 商品名
          tempModel.key_name = result.name ? result.name : '';
          // 生产厂商
          tempModel.manufacturer_name = result.company ? result.company : '';
          // 规格
          tempModel.spec = result.spec ? result.spec : '';
          // 进入不可编辑界面
          this.goToNoEditDetailByScan(tempModel);
        })
        .catch((error) => {//暂不处理
          wx.hideLoading();
        });
    },
    // 进入非编辑界面(扫码)
    goToNoEditDetailByScan(model){
      console.log('进入非编辑界面(扫码)');
      //1、这里要对image进行特殊编码(防止出现特殊字符、解析失败)
      // if (model.image) {//编码
      //   model.image = model.image[0].url;
      //   model.image = encodeURIComponent(model.image);
      // }
      //2、界面传值
      wx.navigateTo({
        url: '/pages/drugStore/drugInit/drugInitDetail/main?item=' + JSON.stringify(model),
      });
      // wx.navigateTo({
      //   url: '/pages/drugStore/drugInit/drugInitDetail/main?item=' + JSON.stringify(model) + '&isEdit=0',
      // });
    },
    // 初始化模型
    initListModel:function(){
      var item = {
        'id':'',//药品id
        'is_basic_id':'',//是否是基础库
        
        //第一组信息
        'image':'',//图片
        'common_name':'',//通用名
        'key_name':'',//商品名
        'manufacturer_name':'',//生产厂家
        'drug_word':'',//国药准字
        'uuid':'',//条形码
        'dug_type_name':'',//药品类型
        'dug_type_id':'',//药品类型id
        'drug_forms_name':'',//剂型

        //规格管理
        'min_name':'',//包装单位
        'change_count':'',//包装单位与拆零单位换算
        'rx_name':'',//拆零单位
        'taking_count':'',//拆零单位与剂量单位换算
        'single_name':'',//剂量单位
        'spec':'',//规格

        //用法用量
        'instruction_zh_name':'',//中药用法名称
        'instruction_en_name':'',//西药用法名称
        'common_frequency_name':'',//频率名称
        'common_frequency_id':'',//频率id
        'common_count':'',//单次用量
        'common_days':'',//用药天数
        'single_flag':'',//小单位标记

        //有效期预警及库存安全范围
        'warning_time':'',//有效期预警时间
        'warning_time_id':'',//有效期预警时间id
        'range_low':'',//库存安全下限
        'range_up':'',//库存安全上限

        //价格管理
        'cost':'',//处方价(包装单位)
        'min_price':'',//进货价(包装单位)
        'sale_price':'',//处方价(拆零单位)
        'retail_min_price':'',//零售价(包装单位)
        'retail_sale_price':'',//处方价(拆零单位)

        //库存管理
        "warehouse_name":'',//仓库名称
        "warehouse_id":'',//仓库id
        "vendor_name":'',//供应商名称
        "vendor_id":'',//供应商名称id
        "in_date":'',//入库时间
        'begin_json':'',//库存json
        'begin_count':'',//库存数量
        'review_state_id':'',//药品状态

        //原有库存
        'local_count':'',//库存(当前)
        // 单位选择列表
        'single_list':'',//单位列表
      }
      return item;
    },
    // 西药网络请求totalCount更新
    getWestTotalFromSon(data){
      this.westTotalCount = data;
      if (this.selectIndex == 0) {
         this.parentTotalCount = this.westTotalCount;
      }
    },
    // 中成药网络请求totalCount更新
    getSpecialTotalFromSon(data){
      this.specialTotalCount = data;
      if (this.selectIndex == 1) {
         this.parentTotalCount = this.specialTotalCount;
      }
    },
    // 中药网络请求totalCount更新
    getChineseTotalFromSon(data){
      this.chineseTotalCount = data; 
      if (this.selectIndex == 2) {
         this.parentTotalCount = this.chineseTotalCount;
      }
    },
    // 医疗器械网络请求totalCount更新
    getInstrumentTotalFromSon(data){
      this.instrumentTotalCount = data;
      if (this.selectIndex == 3) {
         this.parentTotalCount = this.instrumentTotalCount;
      }
    },
    // 刷新列表
    refreshAllData(){
      this.$refs.westdrug.refreshData();
      this.$refs.specialdrug.refreshData();
      this.$refs.chinesedrug.refreshData();
      this.$refs.instrument.refreshData();
    }
  },
  created() {
    // 这个全局只执行一次(获取屏幕和宽)
    this.screenWidth = wx.getSystemInfoSync().windowWidth;
    this.screenHeight = wx.getSystemInfoSync().windowHeight - 100;
    console.log('这个全局只执行一次(获取屏幕和宽)');
    console.log(this.screenWidth);
    console.log(this.screenHeight);
  },
  mounted() {
    // 这个每次进来会执行多次
    //1、 添加通知
    notificationCenter.addNotification('refreshAllData', this.refreshAllData, this);
    //2、首先加载西药列表
    this.refreshAllData();
  }
}
</script>

<style>
  .mainBackgroundView{
    width: 100%;
    height: 100%;
    background-color:#f0f0f0;
  }
  .toolBar{
    position:fixed;
    top:0px;
    width:100%;
    height:40px;
    font-size:15px;
    z-index:9999;
    display:flex;
    background-color:white
  }
  .toolBarItem{
    flex-grow:1;
    height:40px;
    line-height:40px;
    text-align:center;
  }
  .toolBarActive{
      border-bottom: 2px solid #1F91F2;
      color: #1F91F2;
  }
  .containerListView{
      position: fixed;
      left: 0px;
      right: 0px;
      top: 40px;
      bottom: 60px;
  }
  .swiper-scrollView{
      width: 100%; 
      height: 100%;
      overflow: hidden;
  }
  .bottom-button{
      width: 100%;
      position: fixed;
      display: flex;
      height: 60px;
      bottom: 0;
      z-index: 9999;
      align-items: center;
      background-color: white;
      border-top: 1px solid #E5E5E5;
  }
  .bottom-button > img{
    width: 30rpx;
    height: 30rpx;
    margin-left: 15rpx;
  }
  .bottom-button > div:nth-child(2){
    font-size: 30rpx;
    color: #333333;
    margin-left: 15rpx;
  }
  .bottom-button > div:nth-child(3){
    flex-grow: 1;
    color: #2A94EF;
    font-weight: bold;
  }
  .add-button{
    background-color: #1DA4FC;
    flex: 0 0 200rpx;
    width: 200rpx;
    text-align: center;
    font-size: 36rpx;
    color: white;
    height: 60px;
    line-height: 60px;
  }
  .main-back-view{
    background-color: rgba(0,0,0,.5);
    position: fixed;
    top:0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 9999;
  }
  .main-picker-view{
    background-color: #F2F4F6;
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
  .picker-title{
    color: #7B7B7C;
    font-size: 12px;
    background-color: #F2F4F6;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .choose-view{
    color: #343434;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-bottom: 1px;
    background-color: white;
  }
  .picker-cancel{
    color: #343434;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: white;
    margin-top: 5px;
  }
</style>