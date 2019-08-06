<template>
    <scroll-view class="main-scroll"
                 scroll-y="true">
        <div class="main-view">
        </div>                 
        <initdrug-list-cell @clickCell="clickDrugListCell" 
                            v-for="(item,index) in dataSource" 
                            :key="index" 
                            :item="item">
        </initdrug-list-cell>
    </scroll-view>
</template>

<script>
import initdrugListCell from '@/pages/drugStore/drugInit/childListView/cellTemplate/initdrugListCell'
export default {
  components:{
    initdrugListCell
  },
  data () {
    return {
      dataSource:[1,2,3,4,5,6,7,8,9,10,11,12,13,14]
    };
  },
  methods: {
    clickDrugListCell(){
      console.log('点击cell');
    }
  },
}
</script>

<style scoped>
  .main-scroll{
      background-color: #eee;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
  }
</style>