<template>
    <div class="main-view">
        <!-- 头像 -->
        <img class="title-image" :src="faceImage">
        <!-- 文字内容 -->
        <div class="content-view">
            <!-- 第一个标题 -->
            <div class="first-section">
                <!-- 名字 -->
                <div>{{item.key_name}}</div>
                <!-- 角色 -->
                <div>{{roleString}}</div>
                <!-- 空白 -->
                <div class="grow-flex"></div>
            </div>
            <!-- 第二个标题 -->
            <div class="second-section">
                <!-- 登陆账号 -->
                <div>登陆账号：</div>
                <!-- 账号 -->
                <div>{{item.login_name}}</div>
            </div>
            <!-- 第三个标题 -->
            <div class="third-section">
                <!-- 创建日期 -->
                <div>创建日期：</div>
                <!-- 日期 -->
                <div>{{item.create_time}}</div>
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
  },
  computed: {
    // 头像
    faceImage(){
        console.log('头像');
        console.log(this.item.face_image);
        //是否有头像
        if (this.isEmpty(this.item.face_image)) {
            return '/static/images/mine/default.png';
        }else{
            if (this.item.face_image.length > 0) {//数组有数据
                var imageDict = this.item.face_image[0]; 
                return imageDict.url;
            }
            else{
                return '/static/images/mine/default.png';
            }
        }
    },  
    // 角色  
    roleString(){
        // 1、遍历数组
        var tempArray = [];
        for (let index = 0; index < this.item.role_entities.length; index++) {
            var element = this.item.role_entities[index];
            tempArray.push(element.key_name);
        }
        // 2、拼接字符串
        return tempArray.join(',');
    }
  },
  methods: {
    // 判断字符串是否为空
    isEmpty(obj){
      if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
      }else{
        return false;
      }
    },
  }
}
</script>

<style scoped>
.main-view{
    background-color: white;
    display: flex;
    align-items: center;
    height: 90px;
}
.title-image{
    background-color: white;
    width: 50px;
    height: 50px;
    margin-left: 10px;
    border-radius: 25px;
}
.content-view{
    flex-grow: 1;
}
.first-section{
    display: flex;
    align-items: center;
    margin-left: 5px;
}
.first-section > div:first-child{
    color: #34383C;
    font-size: 15px;
}   
.first-section > div:nth-child(2){
    color: #1D91F2;
    border: 1px solid #1D91F2;
    font-size: 12px;
    margin-left: 5px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 5px;
}
.grow-flex{
    flex-grow: 1;
}
.second-section{
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-left: 5px;
}
.second-section > div:first-child{
    color: #939393;
    font-size: 13px;
}
.second-section > div:last-child{
    flex-grow: 1;
    color: #939393;
    font-size: 13px;
}
.third-section{
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-left: 5px;
}
.third-section > div:first-child{
    color: #939393;
    font-size: 13px;
}
.third-section > div:last-child{
    flex-grow: 1;
    color: #939393;
    font-size: 13px;
}
</style>