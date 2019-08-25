<template>
    <div class="main-view">
        <!-- 总 -->
        <div class="head-view">{{ headTitle }}</div>
        <!-- 用法 -->
        <div class="common-view">
            <div>用法：</div>
            <div>{{item.instruction_en_name}}</div>
        </div>
        <div class="usage-frequency-view">
            <div v-for="(item,index) in usageDataSource" :key="index"  
                 class="content-view">
                <div :class="['content-title', item.isSelect?'select-cell':'']"
                    @tap="clickUsageCell(item)">{{ item.title}}</div>
            </div>
        </div>
        <!-- 频率 -->
        <div class="common-view">
            <div>频率：</div>
            <div>{{item.common_frequency_name}}</div>
        </div>
        <div class="usage-frequency-view">
            <div v-for="(item,index) in frequencyDataSource" :key="index"  
                 class="content-view">
                <div :class="['content-title', item.isSelect?'select-cell':'']"
                    @tap="clickFrequencyCell(item)">{{ item.title}}</div>
            </div>
        </div>
        <div class="line-big"></div>
        <!-- 单次用量 -->
        <div class="single-view">
            <div>单次用量：</div>
            <div>每次</div>
            <input class="count-input-view" type="text" v-model="item.common_count">
            <div>{{(item.single_name == '每次适量')?'':item.single_name}}</div>
            <!-- 箭头和单位列表 -->
            <div class="arrow-container">
                <!-- 箭头 -->
                <div :class="['arrow-margin', arrowDown?'arrow-bottom':'arrow-top']"
                 @click="clickArrowButton"></div>
                <!-- 列表 -->
                <div class="arrow-list" v-show="!arrowDown">
                    <!-- 箭头 -->
                    <div class="arrow-list-top">
                        <div class="arrow-top-white"></div>    
                    </div>
                    <!-- 拆零单位列表 -->
                    <div class="arrow-list-content">
                        <div class="arrow-text" @click="clickSingleList(0)">{{item.single_list[0].key_name}}</div>
                        <div class="arrow-line"></div>
                        <div class="arrow-text" @click="clickSingleList(1)">{{item.single_list[1].key_name}}</div>
                    </div>
                </div>
            </div>
            <div class="grow-div"></div>
            <div :class="['frame',isSelected?'select-single-name':'']"
                 @click="clickSelectButton"></div>
            <div @click="clickSelectButton">每次适量</div>
        </div>
        <div class="line-big"></div>
        <!-- 用药天数 -->
        <div class="day-view">
            <div>用药天数：</div>
            <input class="count-input-view" type="text" v-model="item.common_days">
            <div>天</div>
        </div>
        <!-- 3、保存按钮 -->
        <div class="bottom-save-button" @click="clickSaveButton">保存</div>
    </div>
</template>

<script>
import { timeout } from 'q';
export default {
  data () {
    return {
        // 箭头
        arrowDown:true,
        // 是否适量
        isSelected:false,
        // 用法参数
        usageParam:{
            op:'List',
            cloud:'drug_usage[enclinic]',
            _type:'json',
            _password:this.globalData.password,
            _userid:this.globalData.userid
        },
        // 频率参数
        frequencyParam:{
            op:'LoadDict',
            key_name:'DayType',
            _type:'json',
            _password:this.globalData.password,
            _userid:this.globalData.userid
        },
        // 当前模型
        item:{
           instruction_en_name:'',// 用法名称
           common_frequency_name:'',//频率
           common_count:'',//单次用量
           common_days:'',//用药天数
           rx_name:'',//拆零单位
           single_name:'',//剂量单位
           single_flag:'',//单位标记
           single_list:'',//单位列表
        },
        // 用法数据源
        usageDataSource:[],
        // 频率数据源
        frequencyDataSource:[]
    };
  },
  computed: {
    // 顶部标题 
    headTitle(){
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
    }
  },
  methods: {
    // 模型转换
    changeItemModel(tempModel){
        // 用法名称
        this.item.instruction_en_name = tempModel.instruction_en_name;
        // 频率
        this.item.common_frequency_name = tempModel.common_frequency_name;
        // 单次用量
        this.item.common_count = tempModel.common_count;
        // 用药天数
        this.item.common_days = tempModel.common_days;
        // 拆零单位
        this.item.rx_name = tempModel.rx_name;
        // 剂量单位
        this.item.single_name = tempModel.single_name;
        // 单位标记
        this.item.single_flag = tempModel.single_flag; 
        // 单位列表
        this.item.single_list = tempModel.single_list;
    },
    // 点击用法  
    clickUsageCell(data){
        console.log('clickUsageCell');
        for (let index = 0; index < this.usageDataSource.length; index++) {
            var element = this.usageDataSource[index];
            element.isSelect = false;
        }
        data.isSelect = true;
        this.item.instruction_en_name = data.title;
    },
    // 点击频率
    clickFrequencyCell(data){
        console.log('clickFrequencyCell');
        for (let index = 0; index < this.frequencyDataSource.length; index++) {
            var element = this.frequencyDataSource[index];
            element.isSelect = false;
        }
        data.isSelect = true;
        this.item.common_frequency_name = data.title;
    },
    // 处理用法选中
    dealUsageChoosed(){
        for (let index = 0; index < this.usageDataSource.length; index++) {
            var element = this.usageDataSource[index];
            var elementTitle = element.title;
            if (elementTitle == this.item.instruction_en_name) {
                element.isSelect = true;
                break;
            }
        }
    },
    //处理频率选中
    dealFrequencyChoosed(){
        for (let index = 0; index < this.frequencyDataSource.length; index++) {
            var element = this.frequencyDataSource[index];
            var elementTitle = element.title;
            if (elementTitle == this.item.common_frequency_name) {
                element.isSelect = true;
                break;
            }
        }
    },
    // 点击单次用量箭头
    clickArrowButton(){
        console.log('点击单次用量箭头');
        this.arrowDown = !this.arrowDown;
    },
    // 点击单剂量列表
    clickSingleList(index){
        console.log('点击单剂量列表');
        console.log(index);
        if (this.isSelected) {//每次适量
            return;
        }
        var single_list_item = this.item.single_list[index];
        this.item.single_name = single_list_item.key_name;
        this.arrowDown = true;
    },
    // 点击每次适量
    clickSelectButton(){
        this.isSelected = !this.isSelected;
        if (this.isSelected) {
            this.item.single_name = '每次适量';
            this.item.common_count = -1;
        }
    },
    // 点击保存
    clickSaveButton(){
        console.log('点击保存');
    }
  },
  onLoad: function (options) {
    // 1、模型转换
    var tempModel = JSON.parse(options.item);
    console.log('模型转换');
    console.log(tempModel.single_list);
    this.changeItemModel(tempModel);
    console.log(this.item.single_list);
    //2、用法网络请求
    this.usageDataSource = [];
    this.usageParam._userid = this.globalData.userid;
    this.usageParam._password = this.globalData.password;
    this.$fly.get('/app',this.usageParam)
    .then((response) => {
        var code = response.data.code;
        if (parseInt(code) == 200) {
            var array = response.data.rows;
            for (let index = 0; index < array.length; index++) {
                var element = array[index];
                var tempModel = {
                    title:'',
                    isSelect:false
                };
                tempModel.title = element.key_name;
                this.usageDataSource.push(tempModel);
            }
            // 处理用法选中
            this.dealUsageChoosed();
        }
    })
    .catch(function(error){
    });
    //3、频率网络请求
    this.frequencyDataSource = [];
    this.frequencyParam._userid = this.globalData.userid;
    this.frequencyParam._password = this.globalData.password;
    this.$fly.get('/sys',this.frequencyParam)
    .then((response) => {
        var code = response.data.code;
        if (parseInt(code) == 200) {
            var array = response.data.rows;
            for (let index = 0; index < array.length; index++) {
                var element = array[index];
                var tempModel = {
                    title:'',
                    isSelect:false
                };
                tempModel.title = element.key_name;
                this.frequencyDataSource.push(tempModel);
                // 处理频率选中
                this.dealFrequencyChoosed();
            }
        }
    })
    .catch(function(error){
    });
  }
}
</script>

<style>
    .main-view{
        background-color: white;
    }
    .head-view{
        height: 60px;
        line-height: 60px;
        color: #333333;
        font-size: 18px;
        font-weight:bold;
        text-align: center;
        background-color: white;
    }
    .common-view{
        height: 41px;
        background-color: #F1F2F4;
        display: flex;
        align-items: center;
    }
    .common-view > div:first-child{
        margin-left: 12px;
        color: #888888;
        font-size: 18px;
    }
    .common-view > div:last-child{
        margin-left: 5px;
        color: #333333;
        font-size: 18px;
        font-weight:bold;
    }
    .usage-frequency-view{
        height: 170px;

        background-color: white;
        padding: 1px 1px 12px 12px;
        display: flex;
        flex-wrap: wrap;
        overflow: scroll;  
    }
    .single-view{
        height: 66px;
        display: flex;
        align-items: center;
    }
    .single-view > div:first-child{
        color: #888888;
        font-size:18px;
        margin-left:12px;
    }
    .count-input-view{
        background-color: #F2F2F2;
        width: 71px;
        height: 40px;
        text-align: center;
        color: #333333;
        font-size: 18px;
        font-weight:bold;
        margin-left:5px;
        margin-right:5px;
    }
    .single-view > div:nth-child(2){
        color: #333333;
        font-size: 18px;
        font-weight:bold;
    }
    .single-view > div:nth-child(4){
        color: #333333;
        font-size: 18px;
        font-weight:bold;
    }
    .single-view > div:nth-child(8){
        color: #333333;
        font-size: 13px;
        margin-right:12px;
    }
    .day-view{
        height: 66px;
        display: flex;
        align-items: center;  
        margin-bottom: 45px;
    }
    .day-view > div:first-child{
        color: #888888;
        font-size:18px;
        margin-left:12px;
    }
    .day-view > div:last-child{
        color: #333333;
        font-size: 18px;
        font-weight:bold;
    }
    .line-big{
        height: 10px;
        background-color: #F2F2F2;
    }
    .arrow-margin{
        margin-left:5px;
        margin-right:5px;
    }
    .grow-div{
        flex-grow:1;
    }
    .frame{
        width: 13px;
        height: 13px;
        border: 1px #8E8E8E solid;
        margin-right:6px;
    }
    .content-view{
        margin: 10px 10px 0px 0px;
        display: flex;
        align-items: center;
        /* 超出部分隐藏 */
        overflow: hidden;
    }
    .content-title{
        padding: 0px 10px 0px 10px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        color: #000000;
        font-size: 16px;

        /* 超出部分隐藏 */
        overflow: hidden;
        /* 内容不换行 */
        white-space: nowrap;
        /* 超出部分用省略号 */
        text-overflow: ellipsis;
        text-align: center;
        background-color: #F2F3F7;
    }
    .select-cell{
       border: 1px #4D81EE solid; 
       background-color: white;
       color: #4D81EE;
    }
    .bottom-save-button{
        position: fixed;
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
    .arrow-container{
        background-color: white;
        position: relative;
    }
    .arrow-list{
        background-color: white;
        position: absolute;
        width: 50px;
        height: 60px;
        top: 15px;
        left: -32px;
    }
    .arrow-list-top{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .arrow-top-white{
        width: 2px;
        height: 1px;
        border-color: #121212;
        font-size: 0;
        line-height: 0;
        border-width: 8px;
        border-top-width: 0;
        border-style: dashed;
        border-bottom-style: solid;
        border-left-color: transparent;
        border-right-color: transparent;
    }
    .arrow-list-content{
        border: 1px solid #F8F7FA;
        box-shadow: -2px -2px 2px #888888;
    }
    .arrow-text{
        color: #474747;
        font-size: 12px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .arrow-line{
        background-color: #F8F7FA;
        height: 1px;
    }
    .select-single-name{
        background-color: #81C8FA;
        border: 1px solid #81C8FA;
    }
    /* 向上的箭头 */
    .arrow-top {
        font-size: 0;
        line-height: 0;
        border-width: 8px;
        border-color: #121212;
        border-top-width: 0;
        border-style: dashed;
        border-bottom-style: solid;
        border-left-color: transparent;
        border-right-color: transparent;
    }
    /* 向下箭头 */
    .arrow-bottom {
        font-size: 0;
        line-height: 0;
        border-width: 8px;
        border-color: #121212;
        border-bottom-width: 0;
        border-style: dashed;
        border-top-style: solid;
        border-left-color: transparent;
        border-right-color: transparent;
    } 
    /* 向右的箭头 */
    .arrow-right {
        font-size: 0;
        line-height: 0;
        border-width: 8px;
        border-color: #121212;
        border-right-width: 0;
        border-style: dashed;
        border-left-style: solid;
        border-top-color: transparent;
        border-bottom-color: transparent;
    } 
    /* 向左的箭头 */
    .arrow-left {
        font-size: 0;
        line-height: 0;
        border-width: 8px;
        border-color: #121212;
        border-left-width: 0;
        border-style: dashed;
        border-right-style: solid;
        border-top-color: transparent;
        border-bottom-color: transparent;
    }
</style>