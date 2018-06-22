// pages/login/login.js
var hotapp = require('../../utils/hotapp.js');
var wc = require('../../utils/wcache.js');
Page({
  yanzZhanghao:function(e){
     var username=e.detail.value;
     var regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
     var regPhone = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/;
     if (!regEmail.test(username) && !regPhone.test(username)){
       wx.showModal({
         title: '提示',
         content: '请输入正确的手机或者邮箱格式!',
         showCancel: false,
         success: function (res) {}
       });
       return false;
     }
     this.setData({
       username: username
     });
  },
  yanzMima: function (e) {
    var password = e.detail.value;
    if (password.length<6 && password>20){
      wx.showModal({
        title: '提示',
        content: '请输入6到20位任意字符！',
        showCancel: false,
        success: function (res) { }
      });
      return false;
    }
    this.setData({
      password: password
    });
  },
  loginFun:function(){
     var u=this.data.username;
     var p=this.data.password;
     var _that=this;
     if(!u || !p){
       wx.showModal({
         title: '提示',
         content: '请将账号或密码填写完整！',
         showCancel: false,
         success: function (res) { }
       });
       return false;
     }
    //  登录中心
     hotapp.request({
       useProxy: true,
       url: 'http://login.gmatonline.cn/cn/wap-api/check-login', // 需要代理请求的网址
       data: {
         userName: u,
         userPass:p
       },
       header: {
         'content-type': 'application/json'
       },
       success: function (res) {
         var data = res.data.replace("({", "").replace("})", "").split(":");
         var code=data[1].split(",")[0];     
         if(code==1){
           var uid = data[3].split(",")[0];
           var username = data[4].split(",")[0];
           var nickname = data[8];
           var password = data[5].split(",")[0];
          //  wx.setStorageSync('uid', uid.substring(1, uid.length - 1));
          // uid保存时间为3600秒 1小时
           wc.put('uid', uid.substring(1, uid.length - 1));
           wx.setStorageSync('nickname', JSON.parse(nickname));
           wx.setStorageSync('username', username);
        //  console.log(uid.substring(1,uid.length-1));
          //  托福
           var jumpPage = _that.data.jumpName;
           if (jumpPage == "ceping") {
             wx.navigateTo({
               url: '../index/index'
             })
           } else if (jumpPage == "details") {
             wx.navigateTo({
               url: '../components/recordResult/recordResult'
             })
           } else if (jumpPage == "noLogin"){
            //  wx.navigateBack();
             wx.navigateTo({
               url: '../components/backCondition/backCondition?result=show'
             });
           }else {
             wx.navigateTo({
               url: '../first/first'
             })
           }
         }else{
           var message = data[2];
          //  console.log(unescape(message.replace(/\\u/g, '%u'))) unicode码转中文
           wx.showModal({
             title: '提示',
             content: unescape(message.replace(/\\u/g, '%u')),
             showCancel: false,
             success: function (res) { }
           });
           return false;
         }
        
       }
     });
  },
  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
    jumpName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid = wx.getStorageSync('uid');
    // console.log(options.name);
    if(uid){
      wx.reLaunch({
        url: '../index/index'
      });
    }
    this.setData({
      jumpName:options.name
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})