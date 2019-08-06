<template>
    <div class="mainBackgroundView">
        <!-- 顶部栏 -->
        <div class="toolBar">
            <div :class="['toolBarItem',(selectIndex == i)?'toolBarActive':'']" 
                 v-for="(item,i) in buttonArray" 
                 :key="i">
              {{item.title}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      selectIndex:0,
      buttonArray:[
        {id:0, title:'西药'},
        {id:1, title:'中成药'},
        {id:0, title:'中药'},
        {id:0, title:'医疗器械'}
      ]
    };
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
</style>