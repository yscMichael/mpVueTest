<template>
    <div>
        <batch-list-cell v-for="(item,index) in dataSource" :key="index"></batch-list-cell>
    </div>
</template>

<script>
import batchListCell from '@/pages/drugStore/drugInit/batchListDetail/template/batchListCell'
export default {
  components:{
    batchListCell
  },  
  data () {
    return {
        dataSource:[1,2,3,4,5,6,7,8,9,0]
    };
  }
}
</script>

<style>

</style>