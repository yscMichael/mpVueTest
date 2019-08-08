<template>
    <div class="main-view">
        <div v-for="(item,index) in dataSource" :key="index" class="content-view">
            <div :class="['content-title', item.isDelete?'margin-right-5':'']">{{ item.title}}</div>
            <img class="delete-img" 
                 v-show="item.isDelete" 
                 src="/static/images/drugstore/drugInit/redDelete.png">
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        flag:false,
        dataSource:[
            {
                title:'药品',
                isDelete: false
            },
            {
                title:'我也是药品',
                isDelete: false
            },
            {
                title:'奥美制药',
                isDelete: false
            },
            {
                title:'感冒药',
                isDelete: false
            },
            {
                title:'发烧药',
                isDelete: false
            },
            {
                title:'测试长度测试长度测试长度测试长度测试长度',
                isDelete: false
            },
            {
                title:'药品',
                isDelete: false
            },
            {
                title:'最新上架药品药品',
                isDelete: false
            },
            {
                title:'努力实现最新药品',
                isDelete: false
            },
            {
                title:'你好每一天',
                isDelete: false
            },
            {
                title:'他吞吞吐吐吞吞吐吐',
                isDelete: false
            },
            {
                title:'师傅师傅师傅师傅',
                isDelete: false
            },
            {
                title:'fsgsgsg',
                isDelete: false
            },
            {
                title:'爽肤水是山光水色',
                isDelete: false
            },
            {
                title:'发阿信阿信阿信阿信啊',
                isDelete: false
            },
            {
                title:'超舒适舒服舒服舒服',
                isDelete: false
            },
            {
                title:'吃水果水果水果水果',
                isDelete: false
            },
            {
                title:'吃水果打电话的环境',
                isDelete: false
            },
            {
                title:'阿法法法法反蒋梦婕',
                isDelete: false
            },
            {
                title:'给那你发那个北国风光',
                isDelete: false
            },
            {
                title:'擦啊是擦程序啊擦',
                isDelete: true
            },
            {
                title:'舒服舒服舒服舒服舒服',
                isDelete: false
            },
            {
                title:'第三方',
                isDelete: false
            }
        ],
    };
  }
}
</script>

<style>
    .main-view{
        background-color: white;
        padding: 1px 1px 12px 12px;
        display: flex;
        flex-wrap: wrap;
    }
    .content-view{
        padding: 0px 10px 0px 10px;
        margin: 10px 10px 0px 0px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        white-space: nowrap;
        text-align: center;
        color: #000000;
        font-size: 16px;
        background-color: #F2F3F7;

        display: flex;
        align-items: center;
        border: 1px solid red;
    }
    .content-title{
        font-size: 16px;
        background-color: antiquewhite;
    }
    .margin-right-5{
        margin-right: 5px;
    }   
    .delete-img{
        width: 30px;
        height: 30px;
    }
</style>