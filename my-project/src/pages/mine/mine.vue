<template>
    <div class="main-view">
        <!-- 头部信息 -->
        <div class='head-view'>
            <image src='/static/images/mine/default.png'></image>
            <div class='head-view-text'>
                <div class='head-name'>{{key_name}}</div>
                <div class='head-department'>{{department_entity}}</div>
            </div>
        </div>
        <!-- 分割线(大) -->
        <div class='line-big'></div>
        <!-- 我的消息 -->
        <div class='message'
              bindtap='clickMessage'>
            <image class='left-image'
                    src='/static/images/mine/mine_message.png'></image>
            <div class='center-title'>我的消息</div>
            <image class='right-image'
                    src='/static/images/mine/more.png'></image>
        </div>
        <!-- 分割线(大) -->
        <div class='line-big'></div>
        <!-- 资讯 -->
        <div class='message'
              bindtap='clickMessage'>
            <image class='left-image'
                    src='/static/images/mine/news.png'></image>
            <div class='center-title'>资讯</div>
            <image class='right-image'
                    src='/static/images/mine/more.png'></image>
        </div>
        <!-- 分割线(大) -->
        <div class='line-big'></div>
        <!-- 账号设置 -->
        <div class='message'
                bindtap='clickMessage'>
            <image class='left-image'
                    src='/static/images/mine/setAccount.png'></image>
            <div class='center-title'>账号设置</div>
            <image class='right-image'
                    src='/static/images/mine/more.png'></image>
        </div>

        <!-- 分割线(小) -->
        <div class='line-small'></div>
        <!-- 初始设置 -->
        <div class='message'
                bindtap='clickInitButton'>
            <image class='left-image'
                    src='/static/images/mine/init.png'></image>
            <div class='center-title'>初始设置</div>
            <image class='right-image'
                    src='/static/images/mine/more.png'></image>
        </div>
        <!-- 分割线(小) -->
        <div class='line-small'></div>
        <!-- 快捷菜单设置 -->
        <div class='message'
                bindtap='clickMessage'>
            <image class='left-image'
                    src='/static/images/mine/quick.png'></image>
            <div class='center-title'>快捷菜单设置</div>
            <image class='right-image'
                    src='/static/images/mine/more.png'></image>
        </div>
        <!-- 分割线(大) -->
        <div class='line-big'></div>
        <!-- 清除缓存 -->
        <div class='message'
                bindtap='clickMessage'>
            <image class='left-image'
                    src='/static/images/mine/clear.png'></image>
            <div class='center-title'>清除缓存</div>
            <image class='right-image'
                    src='/static/images/mine/more.png'></image>
        </div>
        <!-- 分割线(大) -->
        <div class='line-big'></div>
        <!-- 关于好医宝 -->
        <div class='message'
                bindtap='clickMessage'>
            <image class='left-image'
                    src='/static/images/mine/about.png'></image>
            <div class='center-title'>关于好医宝</div>
            <image class='right-image'
                    src='/static/images/mine/more.png'></image>
        </div>
        <!-- 客服热线 -->
        <div class='hot-line'>全国统一客服热线：0755-88694966-802</div>
        <!-- 退出登陆 -->
        <div class='logout'
                bindtap='clickLogout'>退出登录</div>
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
.head-view{
  background-color:#3E9FF2;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.head-view image{
  width: 50px;
  height: 50px;
  display: inline-block;
  margin-left: 10px;
}

.head-view-text{
  margin-left: 5px;
}

.head-name{
  font-size: 13px;
  color: white;
}

.head-department{
  font-size: 13px;
  color:#DDEBFD;
} 

.message{
  display: flex;
  align-items: center;
  position: relative;
  background-color: white;
}

.left-image{
  width: 25px;
  height: 25px;
  margin: 10px;
}

.center-title{
  color: #555555;
  font-size: 15px;
}

.right-image{
  width: 8px;
  height: 12px;
  position: absolute;
  right: 10px;
}

.hot-line{
  background-color: #F1F0F5;
  color: #A9A9AB;
  font-size: 12px;
  text-align: center;
  padding: 5px;
}

.logout{
  background-color: white;
  color: #646464;
  font-size: 15px;
  text-align: center;
  padding: 10px;
}

.line-big{
  background-color: #F1F0F5;
  width: 100%;
  height: 10px;
}

.line-small{
  background-color: #F9F9F9;
  width: 100%;
  height: 1px;
}
</style>