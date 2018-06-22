// pages/components/recordResult/recordResult.js
var hotapp = require('../../../utils/hotapp.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList:[],
    hideNum: 'none',
    schoolName:'',
    majorName:'',
    percent:0,
    jibai:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    var uid = wx.getStorageSync('uid');
    hotapp.request({
      useProxy: true,
      url: 'http://www.smartapply.cn/cn/wx-api/assessment-record', // 需要代理请求的网址
      data: {
        uid: uid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var data = res.data.data;
        //时间戳的处理  
        for (var i = 0; i < res.data.data.length; i++) {
          data[i].createTime = _that.formatDate(parseInt(data[i].createTime) * 1000)
        } 
        if (data[0]){
          _that.setData({
            recordList: data
          });
        }else{
          wx.showModal({
            title: '提示',
            content: '暂时还没有数据，请先去参加测评!',
            showCancel: false,
            success: function (res) { 
              if (res.confirm) {
                // console.log('用户点击确定')
                wx.navigateTo({
                  url: '../../index/index',
                })
              }
            }
          });
          return false;
        }
      
      }
    })
  },
  //时间戳转换时间  
   add0(m){return m< 10 ? '0' + m : m }, 
   formatDate(needTime) {
    //needTime是整数，否则要parseInt转换  
    var time = new Date(needTime);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
  } ,
 showResult:function(event){
   var _that=this;
   var uid = wx.getStorageSync('uid');
     //属性值event.target.dataset.id
   var id = event.target.dataset.id;
   hotapp.request({
     useProxy: true,
     url: 'http://www.smartapply.cn/cn/wx-api/odds-result', // 需要代理请求的网址
     data: {
       uid:uid,
       id: id
     },
     header: {
       'content-type': 'application/json'
     },
     success: function (res) {
        var data=res.data.data;
        var jibai = 0;
        if (data.score <= 50) {
          jibai = 30;
        } else if (data.score <= 60) {
          jibai = 40;
        } else if (data.score <= 70) {
          jibai = 55;
        } else if (data.score <= 80) {
          jibai = 70;
        } else if (data.score <= 90) {
          jibai = 80;
        } else if (data.score <= 100) {
          jibai = 85;
        } else if (data.score > 100) {
          jibai = 85;
        }
        _that.setData({
          schoolName: data.school,
          majorName: data.major,
          percent: data.percent,
          jibai: jibai,
          hideNum:'block'
        });
     }
   });
 },
 returnIndex:function(){
   this.setData({
     hideNum: 'none'
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