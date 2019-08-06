<template>
    <div class="west-main">
        <initdrug-list-cell></initdrug-list-cell>
    </div>
</template>

<script>
import initdrugListCell from '@/pages/drugStore/drugInit/childListView/cellTemplate/initdrugListCell'
export default {
  components:{
    initdrugListCell
  },
  data () {
    return {
      westDataSource:[

      ]
    };
  }
}
</script>

<style scoped>
  .west-main{
    background-color: white;
  }
</style>