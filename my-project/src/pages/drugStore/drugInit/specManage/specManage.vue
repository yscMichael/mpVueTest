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
              <swiper-item>
                <unit-list-cell :item="minNameItem" 
                                :unitArray="unitDataSource" 
                                @func="addNewUnit"></unit-list-cell>
              </swiper-item>
              <!-- 包装与拆零单位换算 -->
              <swiper-item>
                <change-count-cell :item="changeCountItem"></change-count-cell>              
              </swiper-item>
              <!-- 拆零单位 -->
              <swiper-item>
                <unit-list-cell :item="rxNameItem"
                                :unitArray="unitDataSource" 
                                @func="addNewUnit"></unit-list-cell> 
              </swiper-item>
              <!-- 拆零单位与剂量单位换算 -->
              <swiper-item>
                <change-count-cell :item="takeCountItem"></change-count-cell>              
              </swiper-item>
              <!-- 剂量单位 -->
              <swiper-item>
                <unit-list-cell :item="singleNameItem" 
                                :unitArray="unitDataSource"
                                @func="addNewUnit"></unit-list-cell>           
              </swiper-item>
          </swiper>
        </div>
    </div>
</template>

<script>
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
        unitType:'1'        
      },
      // 拆零单位模型
      rxNameItem:{
        unitName:'盒',
        unitTip:'(拆零单位)',
        unitType:'3'
      },
      // 剂量单位模型
      singleNameItem:{
        unitName:'盒',
        unitTip:'(剂量单位)',
        unitType:'5'
      },
      // 包装与拆零单位换算比例
      changeCountItem:{
        ratio_count:'1',
        ratioTip:'(包装与拆零单位换算)',
        ratioType:'2'
      },
      // 拆零与剂量单位换算比例
      takeCountItem:{
        ratio_count:'1',
        ratioTip:'(拆零与剂量单位换算)',
        ratioType:'4'
      },
      // 包装单位数据源
      unitDataSource:[],
      // 总的模型
      item:{
        min_name:'',//包装单位
        change_count:'',//包装与拆零单位换算
        rx_name:'',//拆零单位
        taking_count:'',//拆零与剂量单位换算
        single_name:'',//剂量单位
        spec:'',//规格
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
    // 点击滚动条按钮
    clickScrollButton(index){
      console.log('点击滚动条按钮');
      console.log(index);
      this.currentIndex = index - 1;
      this.selectIndex = index;
    },
    // 增加单位
    addNewUnit(unit){
      console.log(unit);
      // 1、参数赋值
      this.addUnitParam._password = this.globalData.password;
      this.addUnitParam._userid = this.globalData.userid;
      this.addUnitParam.key_name = unit;
      // 2、网络请求
      this.$fly.get('/app',this.param)
      .then((response) => {
        console.log('----------------');
        console.log(response);
      })
      .catch(function(error){
      }); 
    }
  },
  onLoad: function (options) {
    // 1、解析参数
    var tempModel = JSON.parse(options.item);
    // 2、模型赋值
    this.item.min_name = tempModel.min_name?tempModel.min_name:'';
    this.item.change_count = tempModel.change_count?tempModel.change_count:'';
    this.item.rx_name = tempModel.rx_name?tempModel.rx_name:'';
    this.item.taking_count = tempModel.taking_count?tempModel.taking_count:'';
    this.item.single_name = tempModel.single_name?tempModel.single_name:'';
    this.item.spec = tempModel.spec?tempModel.spec:'';
    // 3、请求单位数据源
    // 3.1、参数赋值
    this.listParam._password = this.globalData.password;
    this.listParam._userid = this.globalData.userid;
    // 3.2、网络请求
    this.unitDataSource = [];
    this.$fly.get('/app',this.listParam)
    .then((response) => {
        console.log('+++++++++++++++++');
        console.log(response);
        var code = response.data.code;
        if (parseInt(code) == 200) {
          var rows = response.data.rows;
          for (let index = 0; index < rows.length; index++) {
            var element = rows[index];
            var tempItem = {
              title:'',
              isSelect:false
            };
            tempItem.title = element.key_name;
            this.unitDataSource.push(tempItem);
          }
        }
    })
    .catch(function(error){
    }); 
  }
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
      bottom: 0px;
      background-color: aqua;
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