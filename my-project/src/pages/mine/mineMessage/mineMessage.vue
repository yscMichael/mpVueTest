<template>
    <div class="main-view"> 
      <!-- 系统通知 -->
      <div class="message-cell" @click="clickSystemNotify">
        <img src="/static/images/mine/system_notify.png">
        <div>系统通知</div>
        <img src="/static/images/home/moreButton.png">
      </div>
      <!-- 分割线 -->
      <div class="line-small"></div>
      <!-- 转诊通知 -->
      <div class="message-cell" @click="clickTransferNotify">
        <img src="/static/images/mine/transfer_notify.png">
        <div>转诊通知</div>
        <img src="/static/images/home/moreButton.png">
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  methods: {
    // 点击系统通知
    clickSystemNotify(){
      console.log('点击系统通知');
      wx.navigateTo({
        url: '/pages/mine/mineMessage/systemNotify/main',
      });
    },
    // 点击转诊通知
    clickTransferNotify(){
      console.log('点击转诊通知');
      wx.navigateTo({
        url: '/pages/mine/mineMessage/transferNotify/main',
      });
    }
  },
}
</script>

<style scoped>
  .message-cell{
    background-color: white;
    display: flex;
    align-items: center;
    height: 60px;
  }
  .message-cell > img:first-child{
    width: 43px;
    height: 43px;
    margin-left:10px;
  }
  .message-cell > div{
    color: #000000;
    font-size: 16px;
    flex-grow: 1;
    margin-left: 5px;
  }
  .message-cell > img:last-child{
    width: 8px;
    height: 12px;
    margin-right:10px;
  }
  .line-small{
    background-color: #F6F6F7;
    height: 1px;
  }
</style>