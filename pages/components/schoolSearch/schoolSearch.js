// pages/components/schoolSearch/schoolSearch.js
//app.js
var hotapp = require('../../../utils/hotapp.js');
Page({
  // 点击取消按钮，回到上一页
  tapClose: function (event) {
    wx.navigateBack();
  },
  schoolClick:function(event){
    //属性值event.target.dataset.html
    wx.setStorageSync('schoolName', event.target.dataset.html);
    wx.setStorageSync('schoolId', event.target.dataset.id);
    wx.setStorageSync('schoolCountry', event.target.dataset.country);
    wx.setStorageSync('schoolRank', event.target.dataset.rank);
    wx.removeStorageSync('majorName');
    wx.removeStorageSync('majorId');
    wx.reLaunch({
      url: '../../index/index'　
    });
  },
  searchSchool:function(event){
    // wx.request({
    //   url: 'http://schools.smartapply.cn/cn/app-api/app-select',
    //   data: {
    //     page: 1,
    //     pageSize: 30,
    //     school: event.target.dataset.html
    //   },
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // });
    var schoolName = event.detail.value;
    var _that = this;
    if (!schoolName){
      wx.showModal({
        title: '提示',
        content: '请输入关键词',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      });
      return false;
    }
    hotapp.request({
      useProxy: true,
      url: 'http://test.school.gmatonline.cn/cn/api/words-school', // 需要代理请求的网址
      data: {
        keywords: schoolName
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data.data;
        _that.setData({
           searchList:data
         });
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
     searchList:[]
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