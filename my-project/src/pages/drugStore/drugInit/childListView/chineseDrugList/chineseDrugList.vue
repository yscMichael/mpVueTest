<template>
    <scroll-view class="main-scroll"
                 scroll-y="true"
                 @scrolltoupper="refreshData"
                 @scrolltolower="loadMoreData"
                 :style="{width:screenWidth + 'px',height:screenHeight + 'px'}">
        <!-- 下拉刷新 -->
        <yy-refresh :isHeader="true" :isShow="isRefresh"></yy-refresh>
        <!-- 列表 -->
        <initdrug-list-cell @clickDrugListCell="clickDrugListCell" 
                            v-for="(item,index) in dataSource" 
                            :key="index"
                            :isShowSpec="false" 
                            :item="item">
        </initdrug-list-cell>
        <!-- 无数据 -->
        <div :class="['noData-view',isHiddenNoData?'hiddenNoData':'']">
          <img src="/static/images/drugstore/drugInit/noData.png" alt="">
        </div>
        <!-- 上拉加载-->
        <yy-refresh :isHeader="false" :isShow="isLoadMore"></yy-refresh>   
    </scroll-view>
</template>

<script>
const Chinese_Drug_URL = '/app';
import initdrugListCell from '@/pages/drugStore/drugInit/childListView/cellTemplate/initdrugListCell'
import yyRefresh from '@/components/yyRefresh/yyRefresh'
export default {
  components:{
    initdrugListCell,
    yyRefresh
  },
  props:['screenWidth','screenHeight'],
  data () {
    return {
      //数据源
      dataSource:[],
      //是否隐藏无数据
      isHiddenNoData:false,
      //是否在下拉刷新
      isRefresh:false,
      //是否正在上拉加载
      isLoadMore:false,
      //总数
      totalCount:0,
      //参数
      param:{
        op:'Page',
        cloud:'drug',
        dug_type:'3',
        key_word:'',
        page:1,
        rows:10,
        review_state:1,
        sort:"expire_date",
        order:"desc",
        _type:'json',
        _password:this.globalData.password,
        _userid:this.globalData.userid
      }
    };
  },
  methods: {
    clickDrugListCell(drugItem){
      console.log('点击cell----');
      console.log(drugItem);
      // 1、初始化模型
      var tempModel = this.initListModel();
      // 2、模型赋值
      this.changeItemModle(tempModel,drugItem);
      //3、这里要对image进行特殊编码(防止出现特殊字符、解析失败)
      if (!this.isEmpty(tempModel.image)) {
        if (tempModel.image.length > 0) {
          tempModel.image = tempModel.image[0].url;
          tempModel.image = encodeURIComponent(tempModel.image);
        }
      }
      //2、界面传值
      wx.navigateTo({
        url: '/pages/drugStore/drugInit/drugInitDetail/main?item=' + JSON.stringify(tempModel),
      });
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
    // 模型转换
    changeItemModle(tempModel,drugItem){
      //药品id
      tempModel.id = drugItem.id;
      //是否是基础库
      tempModel.is_basic_id = drugItem.is_basic?drugItem.is_basic.id:0;

      // 第一组信息
      //图片
      tempModel.image = drugItem.image?drugItem.image:'';
      //通用名
      tempModel.common_name = drugItem.common_name?drugItem.common_name:'';
      //商品名
      tempModel.key_name = drugItem.key_name?drugItem.key_name:'';
      //生产厂家
      tempModel.manufacturer_name = drugItem.manufacturer?drugItem.manufacturer.key_name:'';
      //国药准字
      tempModel.drug_word = drugItem.drug_word?drugItem.drug_word:'';
      //条形码
      tempModel.uuid  = drugItem.uuid?drugItem.uuid:'';
      //药品类型
      tempModel.dug_type_name = drugItem.dug_type?drugItem.dug_type.key_name:'';
      //药品类型id
      tempModel.dug_type_id = drugItem.dug_type?drugItem.dug_type.id:'0';
      //剂型
      tempModel.drug_forms_name = drugItem.drug_forms?drugItem.drug_forms.key_name:'';

      // 规格管理
      //包装单位
      tempModel.min_name = drugItem.min_unit?drugItem.min_unit.key_name:'';
      //包装单位与拆零单位换算
      tempModel.change_count = drugItem.change_count?drugItem.change_count:'1';
      //拆零单位
      tempModel.rx_name = drugItem.rx_unit?drugItem.rx_unit.key_name:'';
      //拆零单位与剂量单位换算
      tempModel.taking_count = drugItem.taking_count?drugItem.taking_count:'1';
      //剂量单位
      tempModel.single_name = drugItem.single_unit?drugItem.single_unit.key_name:'';
      //规格
      tempModel.spec = drugItem.spec?drugItem.spec:'';

      // 用法用量
      //中药用法
      tempModel.instruction_zh_name = drugItem.instruction_zh?drugItem.instruction_zh.key_name:'';
      //西药用法
      tempModel.instruction_en_name = drugItem.instruction_en?drugItem.instruction_en.key_name:'';
      //频率名称
      tempModel.common_frequency_name = drugItem.common_frequency?drugItem.common_frequency.key_name:'';
      //频率id
      tempModel.common_frequency_id = drugItem.common_frequency?drugItem.common_frequency.id:'';
      //单次用量
      tempModel.common_count = drugItem.common_count?drugItem.common_count:'0';
      //用药天数
      tempModel.common_days = drugItem.common_days?drugItem.common_days:'0';
      // 单位标记
      tempModel.single_flag = drugItem.single_flag?drugItem.single_flag:'1';

      // 有效期预警及库存安全范围
      //有效期预警时间
      tempModel.warning_time = drugItem.warning_time?drugItem.warning_time.key_name:'2个月';
      //有效期预警时间id
      tempModel.warning_time_id = drugItem.warning_time?drugItem.warning_time.id:'2';
      //库存安全下限
      tempModel.range_low = drugItem.range_low?drugItem.range_low:'0';
      //库存安全上限
      tempModel.range_up = drugItem.range_up?drugItem.range_up:'0';
 
      // 价格管理
      //处方价(包装单位)
      tempModel.cost = drugItem.cost?drugItem.cost:'0';
      //进货价
      tempModel.min_price = drugItem.min_price?drugItem.min_price:'0';
      //处方价(拆零单位)
      tempModel.sale_price = drugItem.sale_price?drugItem.sale_price:'0';
      //零售价(包装单位)
      tempModel.retail_min_price = drugItem.retail_min_price?drugItem.retail_min_price:'0';
      //处方价(拆零单位)
      tempModel.retail_sale_price = drugItem.retail_sale_price?drugItem.retail_sale_price:'0';

      // 库存管理
      //仓库名称
      tempModel.warehouse_name = drugItem.warehouse_id?drugItem.warehouse_id.key_name:'';
      //仓库id
      tempModel.warehouse_id = drugItem.warehouse_id?drugItem.warehouse_id.id:'';
      // 供应商名称
      tempModel.vendor_name = drugItem.vendor_id?drugItem.vendor_id.key_name : '';
      // 供应商id
      tempModel.vendor_id = drugItem.vendor_id?drugItem.vendor_id.id:'0';
      // 入库时间
      tempModel.in_date = drugItem.in_date?drugItem.in_date : '';
      //库存
      tempModel.begin_json = drugItem.begin_json? drugItem.begin_json:'';
      //库存
      tempModel.begin_count = drugItem.begin_count?drugItem.begin_count:'0';
      //药品状态
      tempModel.review_state_id = drugItem.review_state?drugItem.review_state.id:'1';

      // 原有库存
      // 库存(当前)
      tempModel.local_count = drugItem.local_count?drugItem.local_count:'0';
      // 单位列表
      tempModel.single_list = drugItem.singleFlagList?drugItem.singleFlagList:[];
    },
    refreshData(){
      // 1、判断当前是否进行下拉刷新和上拉加载、不能重复加载
      if (this.isRefresh || this.isLoadMore) {
          return;
      }
      // 2、显示加载框
      wx.showLoading({
        title: '正在拼命加载...',
        mask: false,
      });
      //3、开始网络请求(参数重置)
      this.isRefresh = true;
      this.param.page = 1;
      this.dataSource = [];
      this.loadData();
    },
    loadMoreData(){
      // 1、不能重复加载
      if (this.isRefresh || this.isLoadMore) {
          return;
      }
      // 2、显示加载框(要判断是否有更多数据)
      if (this.totalCount <= this.dataSource.length) {
          wx.showToast({
            title: '无更多数据加载...',
            duration: 1500,
            mask: false,
          });
          // 隐藏动画
          this.isLoadMore = false;
      }else{
          // 3、开始网络请求
          this.isLoadMore = true;
          this.param.page ++;
          this.loadData();
      }
    },
    loadData(){
      this.$fly.get(Chinese_Drug_URL,this.param)
        .then((response) => {
          // 1、处理动画(延时执行)
          this.isRefresh = false;
          this.isLoadMore = false;
          wx.hideLoading();
          // 2、数据添加到数据源
          this.dataSource = this.dataSource.concat(response.data.rows);    
          this.totalCount = response.data.total;
          this.$emit('func',this.totalCount);
          // 3、处理无数据情况
          this.dealNoData();
        })
        .catch(function(error){
          wx.showToast({
            title: "请求失败",
          });
        });
    },
    dealNoData(){
      if (this.dataSource.length == 0) {
        this.isHiddenNoData = false;
      }else{
        this.isHiddenNoData = true;
      }
    },
    // 判断字符串是否为空
    isEmpty(obj){
      if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
      }else{
        return false;
      }
    }

  },
}
</script>

<style scoped>
  .main-scroll{
      background-color: #eee;
      width: 100%;
      height: 100%;
      border: 2px solid red;
      box-sizing: border-box;
  }
  .noData-view{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #eee;
  }
  .noData-view img{ 
      width: 237rpx;
      height: 245rpx;
  }
  .hiddenNoData{
    display: none;
  }
</style>