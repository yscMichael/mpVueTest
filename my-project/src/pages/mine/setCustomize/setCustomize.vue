<template>
    <div class="main-view">
      <!-- 列表 -->
      <div class="content-view" v-for="(item,index) in dataSource"
                                :key="index"
                                :item="item">
        <div class="content-title" @click="clickCellIndex(index)">{{item.title}}</div>
        <div class="line-view"></div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 数据源
      dataSource:[
        {title:'西药用法',type:1},
        {title:'中药用法',type:2},
        {title:'药品单位',type:3},
        {title:'药品剂型',type:4},
        {title:'仓库',type:5},
        {title:'供应商',type:6}
      ],
    };
  },
  methods: {
    // 点击用法
    clickCellIndex(index){
      console.log('点击用法');
      console.log(index);
      wx.navigateTo({
        url: '/pages/mine/setCustomize/commonUsage/main',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
  },
}
</script>

<style scoped>
.main-view{
  background-color: #eee;
}
.content-view{
  background-color: white;
}
.content-title{
  color: #444444;
  height: 45px;
  font-size: 15px;
  line-height: 45px;
  margin-left: 10px;
}
.line-view{
  background-color: #eee;
  height: 1px;
}

</style>