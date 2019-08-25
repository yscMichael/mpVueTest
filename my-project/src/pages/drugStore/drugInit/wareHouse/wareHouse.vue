<template>
    <div class="container">
        <!-- 1、列表 -->
        <div class="main-view">
            <div v-for="(item,index) in dataSource" :key="index" class="content-view">
                <div :class="['content-title', item.isSelect?'select-cell':'',item.isDelete?'delete-cell':'']"
                    @tap="clickCell(item)"
                    @longpress="longTapCell(item)">{{item.title}}</div>
                <img class="delete-img"
                    @click="clickDeleteCell(item)" 
                    v-show="item.isDelete" 
                    src="/static/images/drugstore/drugInit/redDelete.png">
            </div>
        </div>
        <!-- 2、底部区域 -->
        <div class="bottom-view">
            <div class="input-view">
                <input type="text" v-model="newFormType" placeholder="输入新增仓库">
                <div @click="clickAddButton">添加</div>
            </div>
            <div class="tip-view">提示：长按标签，可删除自定义标签内容（灰色标签来自基础库，不可删除</div>
        </div>
    </div>
</template>

<script>
import notificationCenter from '@/notification'
export default {
  data () {
    return {
        flag:false,
        dataSource:[],
        param:{
            op :'List',
            cloud:'warehouse',
            _type:'json',
            _password:this.globalData.password,
            _userid:this.globalData.userid
        },
        addTypeParam:{
            op:'Add',
            cloud:'drug_form_type[clinic]',
            key_name:'',
            _type:'json',
            _password:this.globalData.password,
            _userid:this.globalData.userid
        },
        deleteTypeParam:{
            op:'Delete',
            cloud:'drug_form_type[clinic]',
            id:'',
            _type:'json',
            _password:this.globalData.password,
            _userid:this.globalData.userid
        },
        newFormType:'',//新增药品剂型
    };
  },
  methods: {
    // 点击标签
    clickCell(data){
        console.log('clickCellclickCell');
        //判断当前是不是删除状态
        if (data.isDelete) {
            data.isDelete = false;
        }else{
            //将其它选中状态取消
            for (let index = 0; index < this.dataSource.length; index++) {
                var element = this.dataSource[index];
                element.isSelect = false;
            }
            //选中当前
            data.isSelect = true;
            // 返回上一个界面并赋值
            notificationCenter.postNotification('wareHouseChange', data.title);
            // 返回上个界面
            wx.navigateBack({
                delta: 1
            });
        }   
    },
    // 长按标签
    longTapCell(data){
        console.log('longTapCell');
        data.isDelete = !data.isDelete;
    },
    // 点击删除按钮
    clickDeleteCell(data){
        console.log('点击删除按钮');
        console.log(data);
        // 参数拼接
        this.deleteTypeParam._userid = this.globalData.userid;
        this.deleteTypeParam._password = this.globalData.password;
        this.deleteTypeParam.id = data.id;
        // 发起删除网络请求
        this.$fly.get('/app',this.deleteTypeParam)
            .then((response) => {
                var code = response.data.code;
                if (parseInt(code) == 200) {
                    wx.showToast({
                        title: '删除成功',
                        icon: 'none',
                        duration: 1500,
                        mask: false
                    });
                }else{
                    var tips = '删除失败';
                    if (parseInt(code) == 331) {
                       tips = response.data.remark; 
                    }
                    wx.showToast({
                        title: tips,
                        icon: 'none',
                        duration: 1500,
                        mask: false
                    });
                }
            })
            .catch(function(error){
                wx.showToast({
                    title: '删除失败',
                    icon: 'none',
                    duration: 1500,
                    mask: false
                });
            });
    },
    //点击底部添加按钮
    clickAddButton(){
        if (this.isEmpty(this.newFormType)) {
            wx.showToast({
                title: '请输入仓库',
                icon: 'none',
                duration: 1500,
                mask: false
            });
        }else{
        // 参数拼接
        this.addTypeParam._userid = this.globalData.userid;
        this.addTypeParam._password = this.globalData.password;
        this.addTypeParam.key_name = this.newFormType;
        // 新增网络请求
        this.$fly.get('/app',this.addTypeParam)
            .then((response) => {
                var code = response.data.code;
                if (parseInt(code) == 200) {
                    // 新增成功，返回上一级，同时进行赋值
                    wx.showToast({
                        title: '新增成功',
                        icon: 'none',
                        duration: 1500,
                        mask: false
                    });
                    wx.navigateBack({
                        delta: 1
                    });
                }else{
                    wx.showToast({
                        title: '新增失败',
                        icon: 'none',
                        duration: 1500,
                        mask: false
                    });
                }
            })
            .catch(function(error){
                wx.showToast({
                    title: '新增失败',
                    icon: 'none',
                    duration: 1500,
                    mask: false
                });
            });
        }
    },
    // 判断字符串是否为空
    isEmpty(obj){
      if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
      }else{
        return false;
      }
    },
  },
  onLoad: function (options) {
    // 清除缓存  
    this.dataSource = [];
    // 1、参数赋值  
    this.param._userid = this.globalData.userid;
    this.param._password = this.globalData.password;
    // 2、网络请求
    this.$fly.get('/app',this.param)
    .then((response) => {
        console.log(response);
        var code = response.data.code;
        if (parseInt(code) == 200) {
            var array = response.data.rows;
            for (let index = 0; index < array.length; index++) {
                var element = array[index];
                var tempModel = {
                    id:'',
                    title:'',
                    isDelete:false,
                    isSelect:false
                }
                tempModel.id = element.id;
                tempModel.title = element.key_name;
                this.dataSource.push(tempModel);
            }
        }else{
            wx.showToast({
                title: '无数据',
                icon: 'none',
                duration: 1500,
                mask: false,
            });
        }
    })
    .catch(function(error){
      wx.showToast({
          title: '网络请求失败',
          icon: 'none',
          duration: 1500,
          mask: false
      });
    });
  },
}
</script>

<style>
    .container{
        background-color: white;
    }
    .main-view{
        background-color: white;
        padding: 1px 1px 12px 12px;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 100px;
    }
    .bottom-view{
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
        height: 100px;
        z-index: 999;
        background-color: white;
    }
    .content-view{
        margin: 10px 10px 0px 0px;
        display: flex;
        align-items: center;
        border: 1px solid red;
        /* 超出部分隐藏 */
        overflow: hidden;
    }
    .content-title{
        padding: 0px 10px 0px 10px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        color: #000000;
        font-size: 16px;

        /* 超出部分隐藏 */
        overflow: hidden;
        /* 内容不换行 */
        white-space: nowrap;
        /* 超出部分用省略号 */
        text-overflow: ellipsis;
        text-align: center;
        background-color: #F2F3F7;
    }
    .delete-cell{
        margin-right: 5px;
        color: white !important;
        background-color: #4D81EE !important;
    }   
    .select-cell{
       border: 1px #4D81EE solid; 
       background-color: white;
       color: #4D81EE;
    }
    .delete-img{
        width: 30px;
        min-width: 30px;
        height: 30px;
    }
    .input-view{
        height: 44px;
        border: 1px #909398 solid;
        display: flex;
        align-items: center;
        margin-left: 12px;
        margin-right: 12px;
        margin-top: 10px;
    }
    .input-view > input{
        flex-grow: 1;
        margin-left: 15px;
        height: 44px;
    }
    .input-view > div{
        background-color: #909398;
        color: white;
        font-size: 16px;
        font-weight:bold;
        width: 84px;
        height: 44px;
        line-height:44px;
        text-align: center;
    }
    .tip-view{
        color: #999999;
        font-size: 12px;
        margin-left: 12px;
        margin-right: 12px;
        margin-top: 10px;
    }
</style>