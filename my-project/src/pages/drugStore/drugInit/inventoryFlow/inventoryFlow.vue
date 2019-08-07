<template>
    <div>
        <flow-cell v-for="(item,index) in dataSource" :key="index"></flow-cell>
    </div>
</template>

<script>
import flowCell from '@/pages/drugStore/drugInit/inventoryFlow/template/flowCell'
export default {
  components:{
      flowCell
  },  
  data () {
    return {
      dataSource:[1,2,3,4,5,6,7,8,9,0]
    };
  }
}
</script>

<style scoped>

</style>