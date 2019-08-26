<template>
    <div class="main-view">
        <!-- 时间 -->
        <div class="title-container">
            <div class="title-view">{{item.create_time}}</div>
        </div>
        <!-- 具体内容 -->
        <div class="main-content">
            <!-- 标题 -->
            <div class="content-title">{{item.key_name}}</div>
            <!-- 图片 -->
            <img class="content-image" src="/static/images/mine/mine_head.png">
            <!-- 副标题 -->
            <div class="sub-title">{{item.synopsis}}</div>
            <!-- 分割线 -->
            <div class="line-view"></div>
            <!-- 查看详情 -->
            <div class="content-detail">
                <div>查看详情</div>
                <img src="/static/images/drugstore/drugInit/more.png">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        item:{
            type: Object,
            required:true,
            default () {
                return {}
            }
        },
    },
    data () {
        return {
        };
    }
}
</script>

<style scoped>
.main-view{
    margin: 10px;
    background-color: white;
}
.title-container{
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eee;
}
.title-view{
    font-size: 12px;
    color: white;
    height: 20px;
    line-height:20px;
    text-align: center;
    width: 150px;
    padding-left: 5px;
    padding-right: 5px; 
    border-radius: 10px;
    background-color: #D6D6D6;
}
.main-content{
    margin-top: 10px;
    border: 1px solid white;
}
.content-title{
    color: #000000;
    font-size: 14px;
    margin-left: 10px;
    margin-top: 10px;
}
.content-image{
    margin: 0px 10px 0px 10px;
    height: 153px;
}
.sub-title{
    color: #000000;
    font-size: 14px;
    margin-left: 10px;
    margin-bottom: 10px;
}
.content-detail{
    height: 40px;
    display: flex;
    align-items: center;
}
.content-detail > div:first-child{
    color: #4F82BA;
    font-size: 14px;
    flex-grow: 1;
    margin-left: 10px;
    text-align: left;
}
.content-detail > img{
    width: 7px;
    height: 11px;
    margin-right: 12px;
}
.line-view{
    background-color: #F1F0F5;
    height: 1px;
}
</style>