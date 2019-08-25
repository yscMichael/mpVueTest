<template>
    <div class="main-view">
      <!-- 1、内容 -->
      <div class="content-view">
        <!-- 1、国药准字(只有自定义添加才显示<drug_id=0> -->
        <div :class="['chinese-medicine',(item.id == 0) ?'show-chinese-medicine':'hide-chinese-medicine']">

        </div>
        <div class="line-big"></div>
        <!-- 2、药品图片 -->
        <div class="drug-image-view"
             @click="clickChooseImage">
          <div>药品图片</div>
          <img :src="selectImage" alt="">
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">
        </div>
        <div class="line-big"></div>
        <!-- 3、药品信息 -->
        <!-- 通用名 -->
        <div class='common-view'>
          <div class='title'>通用名</div>
          <input class='right-input'
                  placeholder='请输入药品名称'
                  @input='commonNameInput'
                  v-model.lazy="item.common_name">
        </div>
        <div class="line-small"></div>
        <!-- 商品名 -->
        <div class='common-view'>
          <div class='title-none'>商品名</div>
          <input class='right-input'
                  placeholder='请输入商品名'
                  @input='commonNameInput'
                  v-model.lazy="item.key_name">    
        </div>
        <div class="line-small"></div>
        <!-- 生产厂家 -->
        <div class='common-view'>
          <div class='title'>生产厂家</div>
          <input class='right-input'
                  placeholder='请输入生产厂家'
                  type="text"
                  @input='commonNameInput'
                  v-model.lazy="item.manufacturer_name">    
        </div>
        <div class="line-small"></div>
        <!-- 批准文号 -->
        <div class='common-view'>
          <div class='title'>批准文号</div>
          <div class="flex-grow-view">国药准字</div>
          <input class='right-input max-width-100'
                  placeholder='字母+8位数字'
                  type="text"
                  @input='commonNameInput'
                  v-model.lazy="item.drug_word">    
        </div>
        <div class="line-small"></div>
        <!-- 条形码 -->
        <div class='common-view'>
          <div class='title'>条形码</div>
          <input class='right-input'
                  placeholder='请输入或扫描药品条码'
                  type="text"
                  @input='commonNameInput'
                  v-model.lazy="item.uuid">
          <img class="scanButton" src="/static/images/drugstore/drugInit/scan.png" alt="">                      
        </div>
        <div class="line-small"></div>
        <!-- 药品类型 -->
        <div class='common-view'
            @click="clickDrugType">
            <div class='title'>药品类型</div>
            <div class="right-title">{{item.dug_type_name}}</div>
            <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-small"></div>
        <!-- 剂型 -->
        <div class='common-view' @click="clickFormCell">
          <div class='title'>剂型</div>
          <div class="right-title">{{item.drug_forms_name}}</div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-big"></div>
        <!-- 4、规格管理 -->
        <div class='common-view' @click="clickSpecButton">
          <div class='title'>规格管理</div>
          <div class="right-title">{{item.spec}}</div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-big"></div>
        <!-- 5、 -->
        <!-- 用法用量 -->
        <div class='common-view' @click="clickUsageAndFrequency">
          <div class='title-none max-width-100'>用法用量</div>
          <div class="right-title line-feed">{{usageAndFrequency}}</div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-small"></div>
        <!-- 有效期预警及库存安全范围 -->
        <div class='common-view' @click="clickWarnAndInventory">
          <div class='title-none'>有效期预警及库存安全范围</div>
          <div class="right-title"></div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-big"></div>
        <!-- 6、 -->
        <!-- 价格管理 -->
        <div class='common-view' @click="clickPriceManage">
          <div class='title-none'>价格管理</div>
          <div class="right-title"></div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <div class="line-small"></div>
        <!-- 库存管理 -->
        <div class='common-view' v-show="isAddNewDrug" @click="clickInventoryManage">
          <div class='title-none'>库存管理</div>
          <div class="right-title"></div>
          <img class="moreButton" src="/static/images/drugstore/drugInit/more.png" alt="">                      
        </div>
        <!-- 库存 -->
        <div class='common-view' v-show="!isAddNewDrug" @click="clickInventoryManage">
          <div class='title-none'>库存</div>
          <div class="right-title">{{stockCount}}</div>
        </div>
        <div class="line-big"></div>
        <!-- 7、药品状态 -->
        <div class='common-view' v-show="!isAddNewDrug">
          <div class='title-none'>药品状态</div>
          <div class="right-title"></div>
          <switch class="switch-button"
                  :checked="drugState"></switch>
        </div>  
        <div class="line-big"></div>
        <!-- 8、删除 -->
        <div class="delete-view" v-show="!isAddNewDrug">删除</div>
        <div class="line-big"></div>
      </div>    
      <!-- 9、底部弹出 -->
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
          <div class="picker-cancel">取消</div>
        </div>
      </div>
      <!-- 2、保存按钮 -->
      <div class="bottom-button"
           @click="saveDrugInfo">保存</div>
    </div>
</template>
 
<script>
const Check_Drug_URL = '/gmi/drug';
import notificationCenter from '@/notification'

export default {
  data () {
    return {
      // 模型(未防止渲染出错，层级不要太多)
      item:{
        'id':'',//药品id
        'is_basic_id':'',//是否是基础库
        'image':'',//图片
        'common_name':'',//通用名
        'key_name':'',//商品名
        'manufacturer_name':'',//生产厂家
        'drug_word':'',//国药准字
        'uuid':'',//条形码
        'dug_type_name':'',//药品类型
        'dug_type_id':'',//药品类型id
        'drug_forms_name':'',//剂型
        'spec':'',//规格
        'single_flag':'',//小单位标记
        'single_list':'',//单位列表
        'min_name':'',//包装单位
        'change_count':'',//包装单位与拆零单位换算
        'rx_name':'',//拆零单位
        'taking_count':'',//拆零单位与剂量单位换算
        'single_name':'',//剂量单位
        'instruction_zh_name':'',//中药用法名称
        'instruction_en_name':'',//西药用法名称
        'common_frequency_name':'',//频率名称
        'common_frequency_id':'',//频率id
        'common_count':'',//单次用量
        'common_days':'',//用药天数
        'warning_time':'',//有效期预警时间
        'warning_time_id':'',//有效期预警时间id
        'range_low':'',//库存安全下限
        'range_up':'',//库存安全上限
        'min_price':'',//进货价
        'cost':'',//处方价(包装单位)
        'sale_price':'',//处方价(拆零单位)
        'retail_min_price':'',//零售价(包装单位)
        'retail_sale_price':'',//处方价(拆零单位)
        'begin_json':'',//库存
        'begin_count':'',//库存
        'local_count':'',//库存
        'review_state_id':''//药品状态

      },
      // 选择照片
      selectImage:'/static/images/drugstore/drugInit/img_default.png',
      // 是否是新增药品
      isAddNewDrug:false,
      // 是否是模版数据
      isPrescriptionDrug:false,
      // 参数
      param:{
        op:'checkUse',
        _type:'json',
        _password:this.globalData.password,
        _userid:this.globalData.userid,
        drug_id:''
      },
      drugTypeArr:['西药','中成药','中药','医疗器械'],
      //是否显示picker
      showPicker:false
    };
  },
  methods: {
    // 转换模型
    changeItemModle(tempModel){
      //药品id
      this.item.id = tempModel.id;
      //是否是基础库
      this.item.is_basic_id = tempModel.is_basic?tempModel.is_basic.id:0;
      //图片
      this.item.image = tempModel.image;
      //通用名
      this.item.common_name = tempModel.common_name?tempModel.common_name:'';
      //商品名
      this.item.key_name = tempModel.key_name?tempModel.key_name:'';
      //生产厂家
      this.item.manufacturer_name = tempModel.manufacturer?tempModel.manufacturer.key_name:'';
      //国药准字
      this.item.drug_word = tempModel.drug_word?tempModel.drug_word:'';
      //条形码
      this.item.uuid  = tempModel.uuid?tempModel.uuid:'';
      //药品类型
      this.item.dug_type_name = tempModel.dug_type?tempModel.dug_type.key_name:'';
      //药品类型id
      this.item.dug_type_id = tempModel.dug_type?tempModel.dug_type.id:'0';
      //剂型
      this.item.drug_forms_name = tempModel.drug_forms?tempModel.drug_forms.key_name:'';
      //规格
      this.item.spec = tempModel.spec?tempModel.spec:'';
      // 单位标记
      this.item.single_flag = tempModel.single_flag?tempModel.single_flag:'1';
      // 单位列表
      this.item.single_list = tempModel.singleFlagList?tempModel.singleFlagList:[];
      //包装单位
      this.item.min_name = tempModel.min_unit?tempModel.min_unit.key_name:'';
      //包装单位与拆零单位换算
      this.item.change_count = tempModel.change_count?tempModel.change_count:'1';
      //拆零单位
      this.item.rx_name = tempModel.rx_unit?tempModel.rx_unit.key_name:'';
      //拆零单位与剂量单位换算
      this.item.taking_count = tempModel.taking_count?tempModel.taking_count:'1';
      //剂量单位
      this.item.single_name = tempModel.single_unit?tempModel.single_unit.key_name:'';
      //中药用法
      this.item.instruction_zh_name = tempModel.instruction_zh?tempModel.instruction_zh.key_name:'';
      //西药用法
      this.item.instruction_en_name = tempModel.instruction_en?tempModel.instruction_en.key_name:'';
      //频率
      this.item.common_frequency_name = tempModel.common_frequency?tempModel.common_frequency.key_name:'';
      //频率id
      this.item.common_frequency_id = tempModel.common_frequency?tempModel.common_frequency.id:'';
      //单次用量
      this.item.common_count = tempModel.common_count?tempModel.common_count:'0';
      //用药天数
      this.item.common_days = tempModel.common_days?tempModel.common_days:'0';
      //有效期预警时间
      this.item.warning_time = tempModel.warning_time?tempModel.warning_time.key_name:'2个月';
      //有效期预警时间id
      this.item.warning_time_id = tempModel.warning_time?tempModel.warning_time.id:'2';
      //库存安全下限
      this.item.range_low = tempModel.range_low?tempModel.range_low:'0';
      //库存安全上限
      this.item.range_up = tempModel.range_up?tempModel.range_up:'0';
      //进货价
      this.item.min_price = tempModel.min_price?tempModel.min_price:'0';
      //处方价(包装单位)
      this.item.cost = tempModel.cost?tempModel.cost:'0';
      //处方价(拆零单位)
      this.item.sale_price = tempModel.sale_price?tempModel.sale_price:'0';
      //零售价(包装单位)
      this.item.retail_min_price = tempModel.retail_min_price?tempModel.retail_min_price:'0';
      //处方价(拆零单位)
      this.item.retail_sale_price = tempModel.retail_sale_price?tempModel.retail_sale_price:'0';
      //库存
      this.item.begin_json = tempModel.begin_json;
      //库存
      this.item.begin_count = tempModel.begin_count?tempModel.begin_count:'0';
      this.item.local_count = tempModel.local_count?tempModel.local_count:'0';
      //药品状态
      this.item.review_state_id = tempModel.review_state?tempModel.review_state.id:'1';
    },
    // 选择照片
    clickChooseImage(){
      wx.chooseImage({
        count: 1,
        sizeType: ['original','compressed'],
        sourceType: ['album','camera'],
        success: (result)=>{
          //tempFilePath可以作为img标签的src属性显示图片
          var imageArray = result.tempFilePaths;
          if(imageArray.length > 0){//取出第一个
            this.selectImage = imageArray[0];
          }
        }
      });
    },
    // 点击药品类型
    clickDrugType(){
      console.log('点击药品类型');
      if (this.isPrescriptionDrug) 
      {//提示不可以修改药品类型
        wx.showToast({
          title: '药品已开处方，不可修改药品类型',
          icon: 'none',
          duration: 1500,
          mask: false,
        });
        this.showPicker = false;
      }
      else
      {//提示谨慎修改
         wx.showModal({
           title: '提示',
           content: '修改药品类型后,某些字段需要重新录入,是否修改?',
           showCancel: true,
           cancelText: '取消',
           cancelColor: '#000000',
           confirmText: '确定',
           confirmColor: '#3CC51F',
           success: (result) => {
             if(result.confirm){
               this.showPicker = true;
             }
           }
         }); 
      }
    },
    // 点击某个药品类型
    clickChooseItem(index){
      console.log('点击某个药品类型');
      console.log(index);
      // 1、关闭弹出框
      this.showPicker = false;
      // 2、药品类型赋值
      switch (index) {
        case 0:
          this.item.dug_type_name = '西药';
          this.item.dug_type_id = 1;
          break;
        case 1:
          this.item.dug_type_name = '中成药';
          this.item.dug_type_id = 2;
          break;
        case 2:
          this.item.dug_type_name = '中药';
          this.item.dug_type_id = 3;
          break;
        case 3:
          this.item.dug_type_name = '医疗器械';
          this.item.dug_type_id = 4;
          break;
        default:
          break;
      }
    },
    // 点击剂型
    clickFormCell(){
      console.log('clickFormCell');
      wx.navigateTo({
        url: '/pages/drugStore/drugInit/chooseForm/main',
      });
    },
    // 剂型界面，反向传值
    formNavBack(data){

    },
    // 点击规格管理
    clickSpecButton(){
      // 模型传递
      var tempModel = {
          min_name:this.item.min_name,//包装单位
          change_count:this.item.change_count,//包装单位与拆零单位换算
          rx_name:this.item.rx_name,//拆零单位
          taking_count:this.item.taking_count,//拆零单位与剂量单位换算
          single_name:this.item.single_name,//剂量单位
          spec:this.item.spec,//规格
          dug_type_id:this.item.dug_type_id,//药品类型
          local_count:this.item.local_count,//库存
      }
      wx.navigateTo({
        url: '/pages/drugStore/drugInit/specManage/main?item=' + JSON.stringify(tempModel),
      });
    },
    // 点击用法用量
    clickUsageAndFrequency(){
      // 传递模型
      var item = {
        // 药品类型
        dug_type_id:this.item.dug_type_id,
        // 用法名称
        instruction_en_name:this.item.instruction_en_name,
        // 频率
        common_frequency_name:this.item.common_frequency_name,
        // 单次用量
        common_count:this.item.common_count,
        // 用药天数
        common_days:this.item.common_days,
        // 拆零单位
        rx_name:this.item.rx_name,
        // 剂量单位
        single_name:this.item.single_name,
        // 单位标记
        single_flag:this.item.single_flag,
        // 单位列表
        single_list:this.item.single_list
      }
      wx.navigateTo({
        url: '/pages/drugStore/drugInit/usageAndDosage/main?item=' + JSON.stringify(item),
      });
    },
    // 点击有效期预警和库存安全范围
    clickWarnAndInventory(){
      var item = {
        range_low:this.item.range_low,
        range_up:this.item.range_up,
        warning_time:this.item.warning_time,
        warning_time_id:this.item.warning_time_id,
        single_name:this.item.single_name
      }
      wx.navigateTo({
        url: '/pages/drugStore/drugInit/validityAndInventory/main?item=' + JSON.stringify(item),
      });
    },
    // 点击价格管理
    clickPriceManage(){
      var item = {
        cost:this.item.cost,//进货价
        min_price:this.item.min_price,//处方价(包装单位)
        sale_price:this.item.sale_price,//处方价(拆零单位)
        retail_min_price:this.item.retail_min_price,//零售价(包装单位)
        retail_sale_price:this.item.retail_sale_price//零售价(拆零单位)
      };
      wx.navigateTo({
        url: '/pages/drugStore/drugInit/priceManage/main?item=' + JSON.stringify(item),
      });
    },
    // 点击库存管理
    clickInventoryManage(){
      var item = {
        min_name:this.item.min_name,//包装单位
        rx_name:this.item.rx_name,//拆零单位
        change_count:this.item.change_count,//包装与拆零单位换算
      };
      wx.navigateTo({
        url: '/pages/drugStore/drugInit/inventoryManage/main?item=' + JSON.stringify(item),
      });
    },
    // 点击保存按钮
    saveDrugInfo(){
      console.log('点击保存按钮');

      // 1、校验参数
      // if (this.judgeParamiSLegal) {
        // 2、有图片，保存图片
        // this.poatImageData()
        // 3、保存其它信息,发起网络请求
        // this.postDrugData();
      // }
    },
    // 判断字符串是否为空
    isEmpty(obj){
      if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
      }else{
        return false;
      }
    },
    // 校验参数
    judgeParamiSLegal(){
      // 1、通用名
      if (this.isEmpty(this.item.common_name)) {
        wx.showToast({
          title: '请输入药品通用名',
          duration: 1500,
          mask: false,
        });
        return false;
      }
      // 2、生产厂家
      if (this.isEmpty(this.item.manufacturer.key_name)) {
        wx.showToast({
          title: '请输入生产厂家',
          duration: 1500,
          mask: false,
        });
        return false;
      }
      // 3、国药准字和条形码------(西药和中成药)
      // 新增：国药准字必须，条形码非必须
      // 修改：二者有一个填写就可以了
      var dugType = this.item.dug_type?parseInt(this.item.dug_type.id):0;
      if (this.isAddNewDrug) 
      {//新增药品
        if ((dugType == 1) || (dugType == 2)) {
          if (this.isEmpty(this.item.drug_word)) 
          {
            wx.showToast({
              title: '请输入国药准字',
              duration: 1500,
              mask: false,
            });
            return false;
          } 
        }
      }
      else
      {//修改药品
        if ((dugType == 1) || (dugType == 2)) 
        {
          if_userid (this.isEmpty(this.item.drug_word) && this.isEmpty(this.item.uuid)) 
          {
            wx.showToast({
              title: '国药准字和条形码不能同时为空',
              duration: 1500,
              mask: false,
            });
            return false;
          }
        }
      }
      // 4、药品类型
      if (dugType == 0) {
        wx.showToast({
          title: '请选择药品类型',
          duration: 1500,
          mask: false,
        });
        return false;
      }
      // 5、剂型(医疗器械不用判断)
      if (dugType != 4) {
        if (this.isEmpty(this.item.drug_forms.key_name)) {
          wx.showToast({
            title: '请选择剂型',
            duration: 1500,
            mask: false,
          });
          return false;
        }
      }
      // 6、规格管理
      // 6.1、包装单位
      var min_name = this.item.min_unit?this.item.min_unit.key_name:'';
      if (this.isEmpty(min_name)) {
        wx.showToast({
          title: '请完善规格管理内容',
          duration: 1500,
          mask: false,
        });
        return false;
      }      
      // 6.2、包装单位与拆零单位换算
      var change_count = this.item.change_count;
      if (this.isEmpty(change_count)) {
        wx.showToast({
          title: '请完善规格管理内容',
          duration: 1500,
          mask: false,
        });
        return false;
      }
      // 6.3、拆零单位
      var rx_name = this.item.rx_unit?this.item.rx_unit.key_name:'';
      if (this.isEmpty(rx_name)) {
        wx.showToast({
          title: '请完善规格管理内容',
          duration: 1500,
          mask: false,
        });
        return false;
      }
      // 6.4、拆零单位与剂量单位换算(不能是医疗器械)
      var taking_count = this.item.taking_count;
      if (dugType != 4) {
        if (this.isEmpty(taking_count)) {
          wx.showToast({
            title: '请完善规格管理内容',
            duration: 1500,
            mask: false,
          });
          return false;
        }
      }
      // 6.5、剂量单位(不能是医疗器械)
      var single_name = this.item.single_unit?this.item.single_unit.key_name:'';
      if (dugType != 4) {
        if (this.isEmpty(single_name)) {
          wx.showToast({
            title: '请完善规格管理内容',
            duration: 1500,
            mask: false,
          });
          return false;
        }
      }
      // 7、上述条件都满足，返回true
      return true;
    },
    // 上传图片(暂定)
    poatImageData(){
      
    },
    // 发起保存网络请求
    postDrugData(){
      
    },
    // 拼接药品网络参数
    makeDrugParam(){
      // 1、图片(暂时不考虑)

      // 2、id

      // 3、名称

      // 4、厂家

      // 5、药品类型

      // 6、国药准字

      // 7、条形码

      // 8、剂型

      // 9、三个单位以及换算比例

      // 10、价格

      // 11、进货价

      // 12、零售价

      // 13、用法用量

      // 14、仓库和供应商

      // 15、入库时间

      // 16、库存批次

      // 17、是否是基础库


      // 18、规格


      // 19、库存预警时间


      // 20、库存安全范围


      // 21、启用(0:禁用，1:启用)

    },
    // 剂型选择变化
    formTypeChange(data){
      console.log('formTypeChange');
      this.item.drug_forms_name = data;
    },
    // 规格变化
    specChange(data){
      // 模型赋值
      this.item.min_name = data.min_name;
      this.item.rx_name = data.rx_name;
      this.item.single_name = data.single_name;
      this.item.change_count = data.change_count;
      this.item.taking_count = data.taking_count;
      this.item.spec = data.spec;
    }
  },
  computed: {
    //用法用量
    usageAndFrequency(){
      // 1、用法(判断是中药还是西药)
      var instruction = '';
      var dugType = parseInt(this.item.dug_type_id);
      if (dugType == 3) {//中药
        instruction = this.item.instruction_zh_name;
      }else{
        instruction = this.item.instruction_en_name;
      }
      // 2、频率
      var frequency = this.item.common_frequency_name;
      // 3、单次用量
      var single_use = '';
      if (this.item.common_count == -1) {
        single_use = '每次适量';
      }else{
        var unitName = this.item.single_name;
        single_use = (this.item.common_count == 0)?'':'每次' + this.item.common_count + unitName;
      }
      // 4、用药天数
      var common_days = '用药' + parseInt(this.item.common_days) + '天';
      // 5、总计
      var content = instruction + ';' + frequency + ';' + single_use + ';' + common_days + ';';
      return content;
    },
    // 库存数量
    stockCount(){
      // 1、包装数量和单位
      var minCount = parseFloat(this.item.local_count) / parseInt(this.item.change_count);
      var minUnit = this.item.min_name
      // 2、拆零数量和单位
      var rxCount = parseFloat(this.item.local_count) - minCount * parseInt(this.item.change_count);
      var rxUnit = this.item.rx_name;
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
    // 药品状态
    drugState(){
      return (parseInt(this.item.review_state_id) == 1)?true:false;
    }
  },

  onLoad: function (options) {
    // 1、模型转换(图片解码)
    var tempModel = JSON.parse(options.item);
    tempModel.image = decodeURIComponent(tempModel.image);
    this.changeItemModle(tempModel);
    // 2、图片赋值
    // 2.1、判断是否存在
    if (!(this.item.image == 'undefined')) {
      this.selectImage = this.item.image;
    }
    // 3、判断是不是新增(只有字符串才能用length!!!)
    var idString = this.item.id + '';
    this.isAddNewDrug = (idString.length > 0) ? false:true;
    // 4、添加通知
    notificationCenter.addNotification('drug_forms_name', this.formTypeChange, this);
    notificationCenter.addNotification('spec', this.specChange, this);
    // 5、检查是否是模版数据
    this.param.drug_id = this.item.id;
    this.param._userid = this.globalData.userid;
    this.param._password = this.globalData.password;
    // 网络请求
    this.$fly.get(Check_Drug_URL,this.param)
    .then((response) => {
      var code = parseInt(response.data.code);
      if (code == 311) {
        this.isPrescriptionDrug = true;
      }else{
        this.isPrescriptionDrug = false;
      }
    })
    .catch(function(error){
      this.isPrescriptionDrug = false;
    });
  },
  onUnload: function () {
    notificationCenter.removeNotification('drug_forms_name', this)
  },
  onShow: function () {
    // 类似于ios的viewDidAppear(可以利用vuex进行界面数据管理)
    // 缺点是不管数据是否变化，都要重新赋值
    console.log('onShowonShowonShow');
  },
  mounted() {
    // 1、参数解析(图片解码)
    // this.item = JSON.parse(this.$root.$mp.query.item);
    // this.item.image = decodeURIComponent(this.item.image);
    // 2、图片赋值
    // 2.1、判断是否存在
    // if (!(this.item.image == 'undefined')) {
      // this.selectImage = this.item.image;
    // }
    console.log('mounted');
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated(){
    console.log('updated');
  },
}
</script>

<style>
  .main-view{
    background-color: white;
    padding: 1rpx;
    width: 100%;
    height: 100%;
  }
  .content-view{
    margin-bottom: 45px;
  }
  .chinese-medicine{
    background-color: aqua;
    height: 92px;
  }
  .drug-image-view{
    width: 100%;
    height: 63px;
    display: flex;
    align-items: center;
    background-color: white;
  }
  .drug-image-view > div{
    color: #333333;
    font-size: 15px;
    margin-left: 26px;
    flex-grow: 1;
  }
  .drug-image-view > img:nth-child(2){
    width: 48px;
    height: 48px;
    margin-right: 10px;
  }
  .common-view{
    background-color: white;
    display: flex;
    align-items: center;
    height: 45px;
  }
  .title{
    color: #333333;
    font-size: 15px;
    margin-left: 12px;
  }
  .title:before{
    content:'* ';
    color: #F84848;
    font-size: 12px;
  }
  .title-none{
    color: #333333;
    font-size: 15px;
    margin-left: 12px;
  }
  .title-none:before{
    content:'* ';
    color: white;
    font-size: 12px;
  }
  .right-input{
    flex-grow: 1;
    margin-left: 5px;
    margin-right: 12px;
    text-align: right;
  }
  .right-title{
    flex-grow: 1;
    margin-left: 5px;
    margin-right: 12px;
    text-align: right;
  }
  .scanButton{
    width: 16px;
    height: 16px;
    margin-right: 12px;
  }
  .moreButton{
    width: 7px;
    height: 11px;
    margin-right: 12px;
  }
  .switch-button{
    margin-right: 12px;
  }
  .delete-view{
    color: #FF5454;
    height: 45px;
    text-align: center;
    line-height: 45px;
    background-color: white;
  }
  .line-big{
    background-color: #F1F0F5;
    width: 100%;
    height: 10px;
  }
  .line-small{
    background-color: #F1F0F5;
    width: 100%;
    height: 1px;
    margin-left: 12px;
  }
  .show-chinese-medicine{
    display: none;
  }
  .hide-chinese-medicine{
    display: none;
  }
  .max-width-100{
    width: 100px;
    flex-grow: 0 !important;
  }
  .line-feed{
    /* 超出部分隐藏 */
    overflow: hidden;
    /* 内容不换行 */
    white-space: nowrap;
    /* 超出部分用省略号 */
    text-overflow: ellipsis;
  }
  .flex-grow-view{
    flex-grow: 1;
    text-align: right;
  }
  .bottom-button{
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    background-color: #2993EF;
    color: white;
    font-size: 16px;
    z-index: 999;
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