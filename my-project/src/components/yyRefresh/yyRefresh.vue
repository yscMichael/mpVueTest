<template>
    <div v-show="isShow">
        <div class="refrsh-container">
            <!-- 图片 -->
            <img class="refrsh-loading" :src="srcImage" alt="">
            <!-- 文字 -->
            <div>{{ srcTitle }}</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        srcImage:'/static/images/refresh/refresh.png',
        srcTitle:'正在下拉刷新...'
    };
  },
  props:{
        isHeader:{
            type: Boolean,
            required: true,
            default () {
                    return {}
                }
        },
        isShow:{
            type: Boolean,
            required: true,
            default () {
                    return {}
                }
        },
  },
  created() {
     // 图片和文字设置  
    if (this.isHeader) {
        console.log('true');
        this.srcImage = '/static/images/refresh/refresh.png';
        this.srcTitle = '正在下拉刷新...';
    }else{
        console.log('false');
        this.srcImage = '/static/images/refresh/Loading.png';
        this.srcTitle = '正在努力加载中...';
    }
  }
}
</script>

<style scoped>
    .refrsh-container{
        background-color:#eee;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .refrsh-container > img{
        width: 25px;
        height: 25px;
    }

    .refrsh-container > div{
        font-size: 16px;
        margin-left: 10px;
    }

    .refrsh-loading{
        display: inline-block;
        animation: viewlinear 0.5s linear infinite;
    }

    @keyframes viewlinear {
        0% {transform: rotate(0deg)}
        50% {transform: rotate(180deg)}
        100% {transform: rotate(360deg)}
    }
</style>