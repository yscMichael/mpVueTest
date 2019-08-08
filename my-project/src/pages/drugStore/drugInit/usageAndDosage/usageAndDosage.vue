<template>
    <div class="main-view">
        <!-- 总 -->
        <div class="head-view">{{ headTitle }}</div>
        <!-- 用法 -->
        <div class="common-view">
            <div>用法：</div>
            <div>口服</div>
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
            <div>一日3次</div>
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
            <input class="count-input-view" type="text" value="5">
            <div>片</div>
            <div class="arrow-margin arrow-bottom"></div>
            <div class="grow-div"></div>
            <div class="frame"></div>
            <div>每次适量</div>
        </div>
        <div class="line-big"></div>
        <!-- 用药天数 -->
        <div class="day-view">
            <div>用药天数：</div>
            <input class="count-input-view" type="text" value="5">
            <div>天</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        headTitle:'口服；一日3次；每次5片；用药3天',
        usageDataSource:[
            {title:'tomato2',isSelect:false},
            {title:'beaf',isSelect:false},
            {title:'aaaa',isSelect:false},
            {title:'阿萨达',isSelect:false},
            {title:'餐前口服',isSelect:false},
            {title:'餐后口服',isSelect:false},
            {title:'睡前口服',isSelect:false},
            {title:'皮下注射',isSelect:false},
            {title:'肌肉注射',isSelect:false},
            {title:'静脉注射',isSelect:false},
            {title:'静脉滴注',isSelect:false},
            {title:'鞘内注射',isSelect:false}
        ],
        frequencyDataSource:[
            {title:'一日1次(QD)',isSelect:false},
            {title:'一日2次(BID)',isSelect:false},
            {title:'一日3次(TID)',isSelect:false},
            {title:'一日4次(QID)',isSelect:false},
            {title:'每二小时1次(Q2H)',isSelect:false},
            {title:'每四小时1次(Q4H)',isSelect:false},
            {title:'每六小时1次(Q6H)',isSelect:false},
            {title:'每八小时1次(Q8H)',isSelect:false},
            {title:'隔日1次(QOD)',isSelect:false},
            {title:'隔三日1次(Q3D)',isSelect:false},
            {title:'每晚1次(QN)',isSelect:false},
            {title:'必要时(PRN)',isSelect:false}
        ]
    };
  },
  methods: {
      clickUsageCell(data){
          console.log('clickUsageCell');
          data.isSelect = true;
      },
      clickFrequencyCell(data){
          console.log('clickFrequencyCell');
          data.isSelect = true;
      }
  },
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
        border: 1px solid red;
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
    /* 向上的箭头 */
    .arrow-top {
        font-size: 0;
        line-height: 0;
        border-width: 10px;
        border-color: red;
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
        border-width: 10px;
        border-color: red;
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
        border-width: 10px;
        border-color: red;
        border-left-width: 0;
        border-style: dashed;
        border-right-style: solid;
        border-top-color: transparent;
        border-bottom-color: transparent;
    }
</style>