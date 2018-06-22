// pages/foundPassword/foundPassword.js
var hotapp = require('../../utils/hotapp.js');
Page({
  yanzZhanghao: function (e) {
    var username = e.detail.value;
    var regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var regPhone = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/;
    if (!regEmail.test(username) && !regPhone.test(username)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机或者邮箱格式!',
        showCancel: false,
        success: function (res) { }
      });
      return false;
    }
    this.setData({
      username: username
    });
  },
  yanzNull: function (e) {
    var yzm = e.detail.value;
    if (!yzm) {
      wx.showModal({
        title: '提示',
        content: '验证码不能为空!',
        showCancel: false,
        success: function (res) { }
      });
      return false;
    }
    this.setData({
      yzm: yzm
    });
  },
  yanzCode: function (e) {
    var reg = /^(\w){6,20}$/;
    var code = e.detail.value;
    if (!reg.test(code)) {
      wx.showModal({
        title: '提示',
        content: '密码长度为6到20位，由数字或字母组成!',
        showCancel: false,
        success: function (res) { }
      });
      return false;
    }
    this.setData({
      code: code
    });
  },
  yanzCode02: function (e) {
    var reg = /^(\w){6,20}$/;
    var code02 = e.detail.value;
    if (!reg.test(code02)) {
      wx.showModal({
        title: '提示',
        content: '密码长度为6到20位，由数字或字母组成!',
        showCancel: false,
        success: function (res) { }
      });
      return false;
    }
    if (this.data.code != code02) {
      wx.showModal({
        title: '提示',
        content: '两次输入的密码不一致!',
        showCancel: false,
        success: function (res) { }
      });
      return false;
    }
    this.setData({
      code02: code02
    });
  },
  sendYzm: function (e) {
    var _that = this;
    var username = _that.data.username;
    var selfVal = _that.data.yzmname;
    var zhType = 0;
    var diffUrl = '';
    var timeNum = 0;
    var regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var regPhone = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/;
    if (!username) {
      wx.showModal({
        title: '提示',
        content: '请输入正确格式的手机号或邮箱!',
        showCancel: false,
        success: function (res) { }
      });
      return false;
    }
    if (regEmail.test(username)) {//邮箱
      zhType = 2;
      diffUrl = 'http://login.gmatonline.cn/cn/wap-api/send-mail';
      timeNum = 120;
    }
    if (regPhone.test(username)) {//手机号
      zhType = 2;//找回密码时type传2
      diffUrl = 'http://login.gmatonline.cn/cn/wap-api/phone-code';
      timeNum = 60;
    }
    hotapp.request({
      useProxy: true,
      url: diffUrl, // 需要代理请求的网址
      data: {
        phoneNum: username,
        email: username,
        type: zhType
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var data = res.data;
        if (data.code == 0) {
          wx.showModal({
            title: '提示',
            content: data.message,
            showCancel: false,
            success: function (res) { }
          });
          return false;
        }
        _that.setData({
          yzmname: timeNum + "秒后",
          yzmbtn: true,
          phoneCode: data.phonecode,
          emailCode: data.emailCode
        });
        var timer = setInterval(function () {
          _that.setData({
            yzmname: timeNum + "秒后"
          });
          timeNum--;
          if (timeNum < -1) {
            clearInterval(timer);
            _that.setData({
              yzmname: selfVal,
              yzmbtn: false
            });
          }
        }, 1000);
      }
    });
  },
  clickFound:function(){
    var _that = this;
    var username = this.data.username;
    var yzm = this.data.yzm;
    var code = this.data.code;
    var code02 = this.data.code02;
    var typeNum = null;
    var yzmStr = '';
    var regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var regPhone = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/;
    if (!username || !yzm || !code || !code02) {
      wx.showModal({
        title: '提示',
        content: '请将信息填写完整!',
        showCancel: false,
        success: function (res) { }
      });
      return false;
    }
    if (regEmail.test(username)) {//邮箱
      typeNum = 2;
      yzmStr = _that.data.emailCode;
    }
    if (regPhone.test(username)) {//手机号
      typeNum = 1;
      yzmStr = _that.data.phoneCode;
    }
    hotapp.request({
      useProxy: true,
      url: 'http://login.gmatonline.cn/cn/wap-api/find-pass', // 需要代理请求的网址
      data: {
         registerStr: _that.data.username,
         type: typeNum,
         phoneCode: yzmStr,
         code: _that.data.yzm,
         pass: _that.data.code,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var data = res.data;
        if (data.code == 0) {
          wx.showModal({
            title: '提示',
            content: data.message,
            showCancel: false,
            success: function (res) { }
          });
          return false;
        }
        wx.navigateTo({
          url: '../login/login',
        });
      }
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    yzm: '',
    code: '',
    code02: '',
    yzmbtn: false,
    yzmname: '验证码',
    phoneCode: '',
    emailCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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