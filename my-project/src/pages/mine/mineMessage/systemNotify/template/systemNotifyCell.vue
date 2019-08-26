<template>
    <div class="main-view">
        <!-- 顶部内容 -->
        <div class="top-main-view">
            <img class="icon-image" src="/static/images/drugstore/drugInit/img_default.png">
            <div class="content-view">
                <div class="top-content">
                    <div>{{item.key_name}}</div>
                    <div>{{item.create_time}}</div>
                </div>
                <div class="bottom-content">{{item.synopsis}}</div>
            </div>
        </div>
        <!-- 底部分割线 -->
        <div class="line-small"></div>
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
    },
    computed: {
        // 图片
        titleImage(){
            if (this.item.cover) {
                if (this.item.cover.length > 0) {
                var firstObject = this.item.cover[0];
                return firstObject.url + '_password' + this.globalData.password + '_userid' + this.globalData.userid;
                } else {
                    return '/static/images/drugstore/drugInit/img_default.png';  
                }
            }else{
                return '/static/images/drugstore/drugInit/img_default.png';
            }
        },
    },
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
    flex: 0 0 45px;
    margin-left: 10px;
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
    background-color: white;
    color: #080808;
    font-size: 15px;
    flex-grow: 1;
    /* 超出部分隐藏 */
    overflow: hidden;
    /* 内容不换行 */
    white-space: nowrap;
    /* 超出部分用省略号 */
    text-overflow: ellipsis;
}
.top-content > div:last-child{
    background-color: white;
    color: #080808;
    font-size: 12px;
    margin-right: 10px;
    flex: 0 0 130px;
    text-align: right;
}
.bottom-content{
    color: #080808;
    font-size: 15px;
    /* 超出部分隐藏 */
    overflow: hidden;
    /* 内容不换行 */
    white-space: nowrap;
    /* 超出部分用省略号 */
    text-overflow: ellipsis;
}
.line-small{
    background-color: #F6F6F7;
    height: 1px;
}
</style>