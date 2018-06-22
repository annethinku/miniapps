//index.js
// const wx = require('../../utils/hotapp.js');
Page({
  data: {
  },
  // 判断是否登录
  hasUid(){
    const uid = wx.getStorageSync('uid');
    if (uid) {
      wx.navigateTo({
        url: '../index/index'
      })
    } else {
      wx.navigateTo({
        url: '../login/login?name=ceping'
      })
    }
  },
  //事件处理函数
  enterPage: function () {
    this.hasUid();
    
  },
  seeDetails:function(){
    const uid = wx.getStorageSync('uid');
    if (uid) {
      wx.navigateTo({
        url: '../components/recordResult/recordResult'
      })
    } else {
      wx.navigateTo({
        url: '../login/login?name=details'
      })
    }
  }
})
