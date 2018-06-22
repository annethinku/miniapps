//index.js
//获取应用实例
var app = getApp()
Page({
  clickSub:function(e){
    if(!this.data.schoolName){
      wx.showModal({
        title: '提示',
        content: '请选择要进行测评的学校',
        showCancel: false,
        success: function (res) {}
      });
      return false;
    }else if (!this.data.majorName){
      wx.showModal({
        title: '提示',
        content: '请选择要进行测评的专业',
        showCancel: false,
        success: function (res) {}
      });
      return false;
    }else{
      wx.navigateTo({
        url: '../components/personScore/personScore?schoolName=' + this.data.schoolName + '&majorName=' + this.data.majorName
      });
    }
  },
  data: {
    schoolName:'',
    majorName:''
  },
  onLoad: function (school) {
    // console.log(school.name);得到了页面传过来的值,再赋上新值
    var that = this;
    that.setData({
      schoolName: wx.getStorageSync('schoolName'),
      majorName: wx.getStorageSync('majorName')
    });
  }
    
})
