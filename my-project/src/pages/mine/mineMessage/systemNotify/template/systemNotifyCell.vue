<template>
    <div class="main-view">
        <!-- 顶部内容 -->
        <div class="top-main-view">
            <img class="icon-image" src="/static/images/drugstore/drugInit/img_default.png">
            <div class="content-view">
                <div class="top-content">
                    <div>我是头部标题</div>
                    <div>我是时间</div>
                </div>
                <div class="bottom-content">我是底部标题</div>
            </div>
        </div>
        <!-- 底部分割线 -->
        <div class="line-small"></div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    };
  }
}
</script>

<style scoped>
.main-view{
    background-color: white;
}
.top-main-view{
    display: flex;
    align-items: center;
    height: 70px;
}
.icon-image{
    width: 45px;
    height: 45px;
}   
.content-view{
    background-color: white;
    flex-grow: 1;
    height: 100%;
    margin-left: 10px;
}
.top-content{
    background-color: white;
    display: flex;
    align-items: center;
    margin-top: 15px;
}
.top-content > div:first-child{
    background-color: antiquewhite;
    color: #080808;
    font-size: 15px;
    flex-grow: 1;
}
.top-content > div:last-child{
    background-color: white;
    color: #080808;
    font-size: 12px;
    margin-right: 10px;
}
.bottom-content{
    color: #080808;
    font-size: 15px;
}
.line-small{
    background-color: #F6F6F7;
    height: 1px;
}
</style>