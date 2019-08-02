<template>
  <div class="container">
    <!-- 文字 -->
    <div class="title">您好,</div>
    <div class="sub-title">欢迎来到好医宝智慧云诊所</div>

    <!-- 用户名和密码 -->
    <input class="name-input" 
           placeholder-class="name-placeholder"
           placeholder='请输入用户名/手机号/邮箱'
           value="lxr001"
           type="text">
    <div class="line"></div>
    <input class="password-input" 
           placeholder-class="password-placeholder" 
           placeholder='请输入密码'
           value="123456" 
           type="password">
    <div class="line"></div>

    <!-- 登陆按钮 -->
    <div class="login-button" @click="clickLoginButton">点击登陆</div>

    <!-- 背景图片 -->
    <img class="background-image" src="/static/images/login/login_bottom.png" alt="">
  </div>
</template>

<script>
  import loginJs from '@/pages/Tool/api/login/loginJs.js'
  const Login_URL = '/sys';

  export default {
    data () {
      return {
        loginParam:{
            op: "Login",
            subname: "gmi",
            username: this.globalData.username,
            password: this.globalData.password,
            push_channel: "",
            appos: "4",
        }
      }
    },
    methods: {
      clickLoginButton(){
          wx.showLoading({
            title: '正在登陆...',
          });
          this.$fly.get(Login_URL,this.loginParam)
            .then((response) => {
                console.log(response.data);
                var data = response.data;
                if (data.code == '200') {
                    wx.hideLoading();
                    wx.switchTab({ url: '/pages/home/main'});
                }else{
                    wx.showToast({
                      title: "登陆失败",
                    });
                }
            })
            .catch(function(error){
                console.log(error);
                wx.showToast({
                  title: "登陆失败",
                });
            });
      },
      dealData:function(){
        console.log('处理函数');
      }
    },
  }
</script>

<style>
  Page{
    width: 100%;
    height: 100%;
  }

  .container{
    background-color: #fff;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .title{
    color: #333333;
    font-size: 36px;
    margin-left: 32px;
    margin-top: 60px;
  }

  .sub-title{
    color: #333333;
    font-size: 18px;
    margin-left: 32px;
    margin-top: 17px;
  }

  .name-input{
    color: #333333;
    font-size: 18px;
    height: 34px;
    margin-left: 32px;
    margin-right: 32px;
    margin-top: 50px;
  }

  .name-placeholder{
    color: #DDDDDD;
    font-size: 18px;
  }

  .password-input{
    color: #333333;
    font-size: 18px;
    height: 34px;
    
    margin-left: 32px;
    margin-right: 32px;
    margin-top: 21px;
  }

  .password-placeholder{
    color: #DDDDDD;
    font-size: 18px;
  }

  .line{
    background-color:#EEEEEE;
    height: 1px;
    margin-left: 32px;
    margin-right: 32px;
    margin-top: 5px;
  }

  .login-button{
    background-color: #1F91F2;
    color: #FFFFFF;
    font-size: 18px;
    height: 44px;
    text-align: center;
    line-height: 44px;

    margin-left: 32px;
    margin-right: 32px;
    margin-top: 32px;
    border-radius: 5px;
  }

  .background-image{
    width: 100%;
    height: 130px;

    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
</style>
