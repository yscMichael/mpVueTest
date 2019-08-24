<template>
    <div class="main-view">
        <!-- 1、头部固定区域 -->
        <div class="head-position-view">
          <!-- 1.1、操作指引 -->
          <div class="operation-view">
            <div>操作指引</div>
            <img src="/static/images/drugstore/drugInit/question.png" alt="">
          </div>
          <!-- 1.2、规格 -->
          <div class="spec-view">
            <div>规格：</div>
            <input type="text" v-model="item.spec">
          </div>
          <!-- 1.3、规格详情 -->
          <!-- scroll-view滚动方式 -->
          <scroll-view class="spec-detail-scroll"
                      scroll-x="true">
              <div class="spec-container">   
                <div class="spec-detail-text margin-left-12 margin-right-4">每</div>
                <div :class="['spec-detail-input',selectIndex==1?'spec-slect-border':'']" @click="clickScrollButton('1')">{{item.min_name}}</div>
                <div class="spec-detail-text">有</div>
                <div :class="['spec-detail-input',selectIndex==2?'spec-slect-border':'']" @click="clickScrollButton('2')">{{item.change_count}}</div>
                <div :class="['spec-detail-input',selectIndex==3?'spec-slect-border':'']" @click="clickScrollButton('3')">{{item.rx_name}}</div>
                <div class="spec-detail-text margin-right-8">;</div>
                <div class="spec-detail-text">每</div>
                <div class="spec-detail-text max-width-67">{{item.rx_name}}</div>
                <div class="spec-detail-text margin-right-4">有</div>
                <div :class="['spec-detail-input',selectIndex==4?'spec-slect-border':'']" @click="clickScrollButton('4')">{{item.taking_count}}</div>
                <div :class="['spec-detail-input','margin-right-12',selectIndex==5?'spec-slect-border':'']" @click="clickScrollButton('5')">{{item.single_name}}</div>
                <div class="spec-detail-space"></div>
              </div>     
          </scroll-view>
        </div>
        <!-- 2、底部固定区域 -->
        <div class="bottom-position-view">
          <!-- 单位轮播界面 -->
          <swiper :current="currentIndex">
              <!-- 包装单位 -->
              <swiper-item catchtouchmove='catchTouchMove'>
                <unit-list-cell :item="minNameItem" 
                                :unitArray="minDataSource" 
                                @addNewUnit="addNewUnit"
                                @clickUpButton="clickUpButton"
                                @clickNextButton="clickNextButton"></unit-list-cell>
              </swiper-item>
              <!-- 包装与拆零单位换算 -->
              <swiper-item catchtouchmove='catchTouchMove'>
                <change-count-cell :item="changeCountItem"
                                   @clickUpButton="clickUpButton"
                                   @clickNextButton="clickNextButton"
                                   :hiddenFlag="true"></change-count-cell>              
              </swiper-item>
              <!-- 拆零单位 -->
              <swiper-item catchtouchmove='catchTouchMove'>
                <unit-list-cell :item="rxNameItem"
                                :unitArray="rxDataSource" 
                                @addNewUnit="addNewUnit"
                                @clickUpButton="clickUpButton"
                                @clickNextButton="clickNextButton"></unit-list-cell> 
              </swiper-item>
              <!-- 拆零单位与剂量单位换算 -->
              <swiper-item catchtouchmove='catchTouchMove'>
                <change-count-cell :item="takeCountItem"
                                   @clickUpButton="clickUpButton"
                                   @clickNextButton="clickNextButton"
                                   :hiddenFlag="false"></change-count-cell>              
              </swiper-item>
              <!-- 剂量单位 -->
              <swiper-item catchtouchmove='catchTouchMove'>
                <unit-list-cell :item="singleNameItem" 
                                :unitArray="singleDataSource"
                                @addNewUnit="addNewUnit"
                                @clickUpButton="clickUpButton"
                                @clickNextButton="clickNextButton"></unit-list-cell>           
              </swiper-item>
          </swiper>
        </div>
        <!-- 3、保存按钮 -->
        <div class="bottom-save-button" @click="clickSaveButton">保存</div>
    </div>
</template>

<script>
import notificationCenter from '@/notification'
import unitListCell from '@/pages/drugStore/drugInit/specManage/template/unitListCell'
import changeCountCell from '@/pages/drugStore/drugInit/specManage/template/changeCountCell'
export default {
  components:{
    unitListCell,
    changeCountCell
  },
  data () {
    return {
      // 滚动条选中的按钮
      selectIndex:1,
      // 当前轮播图位置
      currentIndex:0,
      // 包装单位模型
      minNameItem:{
        unitName:'盒',
        unitTip:'(包装单位)',
        type:'1'        
      },
      // 拆零单位模型
      rxNameItem:{
        unitName:'盒',
        unitTip:'(拆零单位)',
        type:'3'
      },
      // 剂量单位模型
      singleNameItem:{
        unitName:'盒',
        unitTip:'(剂量单位)',
        type:'5'
      },
      // 包装与拆零单位换算比例
      changeCountItem:{
        ratio_count:'1',
        ratioTip:'(包装与拆零单位换算)',
        type:'2'
      },
      // 拆零与剂量单位换算比例
      takeCountItem:{
        ratio_count:'1',
        ratioTip:'(拆零与剂量单位换算)',
        type:'4'
      },
      // 包装单位数据源
      minDataSource:[],
      // 拆零单位数据源
      rxDataSource:[],
      // 剂量单位数据源
      singleDataSource:[],
      // 总的模型
      item:{
        min_name:'',//包装单位
        change_count:'',//包装与拆零单位换算
        temp_change_count:'',//保存临时值
        rx_name:'',//拆零单位
        taking_count:'',//拆零与剂量单位换算
        single_name:'',//剂量单位
        spec:'',//规格,
        drugType:'',//药品类型
        local_count:'',//库存
      },
      // 列表参数
      listParam:{
        op:'List',
        cloud:'drug_unit',
        _type:'json',
        _password:this.globalData.password,
        _userid:this.globalData.userid
      },
      // 新增参数
      addUnitParam:{
        op:'Add',
        cloud:'drug_unit',
        key_name:'',
        _type:'json',
        _password:this.globalData.password,
        _userid:this.globalData.userid
      }
    };
  },
  methods: {
    // 截获滑动
    catchTouchMove(){
      return false;
    },
    // 点击滚动条按钮
    clickScrollButton(index){
      this.currentIndex = index - 1;
      this.selectIndex = index;
    },
    // 包装单位--通知
    minNameChange(unit){
      this.item.min_name = unit;
      this.appendSpec();
    },
    // 包装与拆零单位换算--通知
    changCountChange(count){
      if (count == '-1') {//删除
        // 防止不是字符串
        this.item.change_count = this.item.change_count + '';
        this.item.change_count = this.item.change_count.substring(0,this.item.change_count.length - 1); 
      }else{//增加
        this.item.change_count = this.item.change_count + count;
      }
      this.appendSpec();
    },
    // 拆零单位--通知
    rxNameChange(unit){
      this.item.rx_name = unit;
      this.appendSpec();
    },
    // 拆零与剂量单位换算--通知
    takingCountChange(count){
      if (count == '-1') {//删除
        // 防止不是字符串
        this.item.taking_count = this.item.taking_count + '';
        this.item.taking_count = this.item.taking_count.substring(0,this.item.taking_count.length - 1); 
      }else{//增加
        this.item.taking_count = this.item.taking_count + count;
      }
      this.appendSpec();
    },
    // 剂量单位--通知
    singleNameChange(unit){
      this.item.single_name = unit;
      this.appendSpec();
    },
    // 拼接规格
    appendSpec(){
      var minName = this.item.min_name?this.item.min_name:'';
      var rxName = this.item.rx_name?this.item.rx_name:'';
      var singleName = this.item.single_name?this.item.single_name:'';
      var changeCount = this.item.change_count?this.item.change_count:'';
      var takeCount = this.item.taking_count?this.item.taking_count:'';
      if (minName == rxName) 
      {// 包装单位 == 拆零单位
          if (rxName == singleName) 
          {//拆零单位 == 剂量单位
            this.item.spec = '1' + rxName; 
          }
          else
          {//拆零单位 != 剂量单位
            this.item.spec = takeCount + singleName + '/' + rxName;
          }
      }
      else
      {//包装单位 != 拆零单位
          if (rxName == singleName) 
          {//拆零单位 == 剂量单位
            this.item.spec = changeCount + rxName + '/' + minName; 
          } 
          else
          {//拆零单位 != 剂量单位
            this.item.spec = takeCount + singleName + '/' + rxName + ';' + changeCount + rxName + '/' + minName;
            var drugType = this.item.drugType;
            if (parseInt(drugType) == 4) {
              this.item.spec = changeCount + rxName + '/' + minName;
            }
          }
      }
    },
    // 点击上一步 
    clickUpButton(type){
      // 滑动底部swiper
      this.currentIndex = type - 2;
      this.selectIndex = type - 1;
    },
    // 点击下一步
    clickNextButton(type){
      // 滑动底部swiper
      this.currentIndex = type;
      this.selectIndex = parseInt(type) + 1;
    },
    // 列表数据
    refreshData(){
      // 3.1、参数赋值
      this.listParam._password = this.globalData.password;
      this.listParam._userid = this.globalData.userid;
      // 3.2、网络请求
      this.minDataSource = [];
      this.rxDataSource = [];
      this.singleDataSource = [];
      this.$fly.get('/app',this.listParam)
      .then((response) => {
        var code = response.data.code;
        if (parseInt(code) == 200) {
          var rows = response.data.rows;
          for (let index = 0; index < rows.length; index++) {
            var element = rows[index];
            // 这里会有深拷贝和浅拷贝问题，暂时按照以下方法规避
            // 初始化三个模型
            var minItem = {
              title:'',
              isSelect:false
            };
            var rxItem = {
              title:'',
              isSelect:false
            };
            var singleItem = {
              title:'',
              isSelect:false
            };
            // 模型赋值
            minItem.title = element.key_name;
            rxItem.title = element.key_name;
            singleItem.title = element.key_name;
            // 添加到数组
            this.minDataSource.push(minItem);
            this.rxDataSource.push(rxItem);
            this.singleDataSource.push(singleItem);
          }
        }
      })
      .catch(function(error){
      }); 
    },
    // 增加单位
    addNewUnit(unit){
      // 1、参数赋值
      this.addUnitParam._password = this.globalData.password;
      this.addUnitParam._userid = this.globalData.userid;
      this.addUnitParam.key_name = unit;
      // 2、网络请求
      wx.showLoading({
        title: '正在添加...',
        mask: false,
      });
      this.$fly.get('/app',this.addUnitParam)
      .then((response) => {
        wx.hideLoading();
        var code = response.data.code;
        if (parseInt(code) == 200) {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 1500,
            mask: false
          }); 
          // 重新请求数据
          this.refreshData();
        }
      })
      .catch(function(error){
        wx.hideLoading();
      }); 
    },
    // 点击保存按钮
    clickSaveButton(){
      console.log('点击保存按钮');
      // 1、判断是否有库存(有库存、判断是否确定修改change_count)
      if (parseInt(this.item.local_count) > 0) {//库存不为0
        if (this.item.change_count != this.item.temp_change_count) {//change_count被修改、要提示
          wx.showModal({
            title: '提示',
            content: '修改包装单位与拆零单位的换算比例将清空已有库存,是否继续?(APP重新录入库存请在”药房-采购入库“模块进行)',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if(result.confirm){
                // 2、判断其它条件是否满足
                this.judgeOtherCondition();
              }
            }
          });
        }
        else
        {
            this.judgeOtherCondition();
        }
      }
      else
      {
        this.judgeOtherCondition();
      }
    },
    // 判断其它条件是否满足
    judgeOtherCondition(){
      if (this.item.min_name.length == 0) {
        wx.showToast({
          title: '请先选择包装单位',
          icon: 'none',
          duration: 1500,
          mask: false
        });
        return;
      }
      if (this.item.change_count.length == 0) {
        wx.showToast({
          title: '请先填写包装与拆零单位换算比例',
          icon: 'none',
          duration: 1500,
          mask: false
        });
        return;
      }
      if (this.item.rx_name.length == 0) {
        wx.showToast({
          title: '请先选择拆零单位',
          icon: 'none',
          duration: 1500,
          mask: false
        });
        return;
      }
      // 剂量单位(非医疗器械)
      if (parseInt(this.item.drugType) != 4) {
        if (this.item.single_name.length == 0) {
          wx.showToast({
            title: '请先选择剂量单位',
            icon: 'none',
            duration: 1500,
            mask: false
          });
          return;
        }
        if (this.item.taking_count.length == 0) {
          wx.showToast({
            title: '请先填写拆零与剂量单位换算比例',
            icon: 'none',
            duration: 1500,
            mask: false
          });
          return;
        }
      }
      // 检测换算比例问题
      if (this.checkCondition()) 
      {//模型赋值(发送通知)
        notificationCenter.postNotification('spec', this.item);
        // 返回上一级
        wx.navigateBack({
          delta: 1
        });
      } 
    },
    // 检测换算比例
    checkCondition(){
      // 1、包装与拆零单位相同、change_count不等于1
      if (this.item.min_name == this.item.rx_name) {
        if (parseInt(this.item.change_count) != 1) {
          wx.showToast({
            title: '您的包装单位与拆零单位相同,换算比例应该是1,请先修改换算比例或单位.',
            icon: 'none',
            duration: 1500,
            mask: false,
          });
          return false;
        }
      }
      // 2、非医疗器械才判断
      if (parseInt(this.item.drugType) != 4) {
        // 2.1、拆零单位与剂量单位相同、taking_count不等于1
        if (this.item.rx_name == this.item.single_name) {
          if (parseInt(this.item.taking_count) != 1) {
            wx.showToast({
              title: '您的拆零单位与剂量单位相同,换算比例应该是1,请先修改换算比例或单位.',
              icon: 'none',
              duration: 1500,
              mask: false,
            });
            return false;     
          }
        }
        // 2.2、包装与剂量单位相同、拆零不同、两个换算比例不为1
        if ((this.item.min_name == this.item.single_name) && 
            (this.item.min_name != this.item.rx_name)) {
          if ((parseInt(this.item.change_count) != 1) || 
              (parseInt(this.item.taking_count) != 1)) {
              wx.showToast({
                title: '您的包装单位与剂量单位相同,换算比例应该均是1,请先修改换算比例或单位.',
                icon: 'none',
                duration: 1500,
                mask: false,
              });
              return false;
          }
        }
        // 2.3、所有单位都相同、两个换算比例不为1
        if ((this.item.min_name == this.item.single_name) && 
            (this.item.min_name == this.item.rx_name)) {
            if ((parseInt(this.item.change_count) != 1) || 
              (parseInt(this.item.taking_count) != 1)) {
              wx.showToast({
                title: '您的选择的三个单位相同,换算比例应该均是1,请先修改换算比例或单位.',
                icon: 'none',
                duration: 1500,
                mask: false,
              });
              return false;
            }
        }
      }
      return true;
    }
  },
  onLoad: function (options) {
    // 1、解析参数
    var tempModel = JSON.parse(options.item);
    // 2、模型赋值
    this.item.min_name = tempModel.min_name?tempModel.min_name:'';
    this.item.change_count = tempModel.change_count?tempModel.change_count:'';
    this.item.temp_change_count = tempModel.change_count?tempModel.change_count:'';
    this.item.rx_name = tempModel.rx_name?tempModel.rx_name:'';
    this.item.taking_count = tempModel.taking_count?tempModel.taking_count:'';
    this.item.single_name = tempModel.single_name?tempModel.single_name:'';
    this.item.spec = tempModel.spec?tempModel.spec:'';
    this.item.drugType = tempModel.drugType?tempModel.drugType:'1';
    this.item.local_count = tempModel.local_count?tempModel.local_count:'0';
    // 3、添加通知
    notificationCenter.addNotification('min_name', this.minNameChange, this);
    notificationCenter.addNotification('chang_count', this.changCountChange, this);
    notificationCenter.addNotification('rx_name', this.rxNameChange, this);
    notificationCenter.addNotification('taking_count', this.takingCountChange, this);
    notificationCenter.addNotification('single_name', this.singleNameChange, this);
    // 4、请求单位数据源
    this.refreshData();
  },
  onUnload: function () {
    notificationCenter.removeNotification('min_name', this);
    notificationCenter.removeNotification('chang_count', this);
    notificationCenter.removeNotification('rx_name', this);
    notificationCenter.removeNotification('taking_count', this);
    notificationCenter.removeNotification('single_name', this);
  },
}
</script>

<style scoped>
    .main-view{
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
    }
    .head-position-view{
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      height: 150px;
    }
    .bottom-position-view{
      position: absolute;
      top: 150px; 
      left: 0px;
      right: 0px;
      bottom: 45px;
      background-color: aqua;
    }
    .bottom-save-button{
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: 0px;
      height: 45px;
      text-align: center;
      line-height: 45px;      
      color: white;
      font-size: 16px;
      background-color: #2993EF;
    }
    .bottom-position-view swiper{
      width: 100%;
      height: 100%;
      background-color: #888888;
    }
    .operation-view{
      background-color: #F1F1F4;
      height: 30px;
      display: flex;
      align-items: center;
    }
    .operation-view > div{
        color: #888888;
        font-size:14px;
        flex-grow: 1;
        text-align: right;
        margin-right: 5px;
    }
    .operation-view > img{
        width: 14px;
        height: 14px;
        margin-right: 12px;
    }
    .spec-view{
      height: 54px;
      display: flex;
      align-items: center;
      background-color: white;
    }
    .spec-view > div{
      color: #888888;
      font-size: 14px;
      margin-left: 12px;
    }
    .spec-view > input{
      color: #333333;
      font-size: 18px;
      text-align: center;
      flex-grow: 1;
      height: 100%;
    }
    /* 以下是规格详情滚动区域 */
    .spec-detail-scroll{
      /* 这里设置100%是为了自动适应子类 */
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      white-space: nowrap;
      background-color: white;
      margin-top: 6px;
    }
    .spec-container{
      display: flex;
      align-items: center;
      height: 60px;
    }
    .spec-slect-border{
      border: 1px solid #4D81EE;
      box-sizing: border-box;
    }
    .spec-detail-text{
      /* 不放大 */
      flex-grow: 0;
      /* 不压缩 */
      flex-shrink: 0;
    }
    .spec-detail-input{
        width: 67px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-left: 4px;
        margin-right: 4px;
        background-color: #F2F4F5;
        box-sizing: border-box;
        /* 不放大 */
        flex-grow: 0;
        /* 不压缩 */
        flex-shrink: 0;

        /* 多余的显示省略号 */
        /* 超出部分隐藏 */
        overflow: hidden;
        /* 内容不换行 */
        white-space: nowrap;
        /* 超出部分用省略号 */
        text-overflow: ellipsis;
    }
    .spec-detail-space{
      width: 5px;
      height: 40px;
      /* 不放大 */
      flex-grow: 0;
      /* 不压缩 */
      flex-shrink: 0;
    }
    .margin-left-12{
      margin-left: 12px;
    }
    .margin-right-4{
        margin-right: 4px;
    } 
    .margin-right-8{
        margin-right: 8px;
    } 
    .margin-right-12{
        margin-right: 12px;
    } 
    .max-width-67{
        max-width: 67px;
    }
</style>