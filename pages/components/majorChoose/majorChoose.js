// pages/components/majorChoose/majorChoose.js
var hotapp = require('../../../utils/hotapp.js');
Page({
  majorClick: function (event) {
    //属性值event.target.dataset.html
    wx.setStorageSync('majorName', event.target.dataset.html);
    wx.setStorageSync('majorId', event.target.dataset.id);
    wx.reLaunch({
      url: '../../index/index'
    });

  },
  /**
   * 页面的初始数据
   */
  data: {
    searchList: []
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
    var _that=this;
    hotapp.request({
      useProxy: true,
      url: 'http://test.school.gmatonline.cn/cn/api/id-major', // 需要代理请求的网址
      data: {
        id:wx.getStorageSync('schoolId')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data;
        _that.setData({
          searchList: data
        });
      }
    })
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