// pages/components/backCondition/backCondition.js
var hotapp = require('../../../utils/hotapp.js');
var wc = require('../../../utils/wcache.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'sida', value: '500强/四大实习（工作）经验' },
      { name: 'waiqi', value: '外企实习（工作）经验', checked: false },
      { name: 'guoqi', value: '国企实习（工作）经验' },
      { name: 'siqi', value: '私企实习（工作）经验' },
      { name: 'bisai', value: '相关专业项目经验' },
      { name: 'youxue', value: '海外游学经验' }, 
      { name: 'gongyi', value: '公益活动' },
      { name: 'huojiang', value: '获奖经历' }
    ],
    hideNum:'none',
    schoolName:'',
    majorName: '',
    bigFour: '',//四大
    foreignCompany: '',//外企
    enterprises: '',//国企
    privateEnterprise: '',//私企
    project: '',//项目
    study: '',//游学
    publicBenefit: '',//公益
    awards: '',//得奖
    percent:0 ,//正确率
    jibai:0 ,//已超过正确率
    nickname: wx.getStorageSync('nickname'),
    username: wx.getStorageSync('username'),
    shownickname:''
  },
  showMask:function(){
    var gpa = '';
    var gmat = '';
    var toefl = '';
    var country = wx.getStorageSync('schoolCountry');//隐藏框 申请院校国家
    var sq_name = wx.getStorageSync('schoolName');//隐藏框 申请的学校名称
    var sc_rank = wx.getStorageSync('schoolRank');//隐藏框 申请院校排名
    var education = '';//目前学历
    var school = '';//学校等级
    var school_name = '';//当前就读学校名称
    var major = wx.getStorageSync('majorId');//申请专业 ID
    var major_name = wx.getStorageSync('majorName');//申请专业 名称
    var c_major = '';//目前专业

    var bigFour = this.data.bigFour;//四大
    var foreignCompany = this.data.foreignCompany;//外企
    var enterprises = this.data.enterprises;//国企
    var privateEnterprise = this.data.privateEnterprise;//私企
    var project = this.data.project;//项目
    var study = this.data.study;//游学
    var publicBenefit = this.data.publicBenefit;//公益
    var awards = this.data.awards;//得奖

    var _that=this;
    // var uid = wx.getStorageSync('uid');
    var uid=wc.get('uid');
    if(!uid){  
      wx.showModal({
        title: '提示',
        content: '便于保存和查看结果，请立即登陆注册。',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            wx.navigateTo({
              url: '../../login/login?name=noLogin'
            });
            return false;
          }
        }
      });
    }
    // 登录回来后
    if (!bigFour && !foreignCompany && !enterprises && !privateEnterprise && !project && !study && !publicBenefit && !awards){
      wx.getStorage({
        key: "backCondition",
        success: function (res) {
          var data = res.data;
          bigFour = data.bigFour;
          foreignCompany = data.foreignCompany;
          enterprises = data.enterprises;
          privateEnterprise = data.privateEnterprise;
          project = data.project;
          study = data.study;
          publicBenefit = data.publicBenefit;
          awards = data.awards;
        }
      });
      console.log(bigFour);
    }
    wx.getStorage({
      key: 'studentInfo',
      success: function (res) {
       var data=res.data;
       gpa=data.gpa;
       gmat = data.gmatgre;
       toefl = data.toeflIel;
       education = data.currentXueli;
       school = data.academy;
       school_name = data.writeSchool;
       c_major = data.writeMajor;

       hotapp.request({
         useProxy: true,
         url: 'http://www.smartapply.cn/cn/wx-api/odds-storage', // 需要代理请求的网址
         data: {
           uid: uid,
           gpa: gpa,
           gmat: gmat,
           toefl: toefl,
           country: country,
           schoolName: sq_name,
           schoolRank: sc_rank,
           attendSchool: school_name,
           education: education,
           school: school,
           major: c_major,
           majorName: major_name,
           bigFour: bigFour,
           foreignCompany: foreignCompany,
           enterprises: enterprises,
           privateEnterprise: privateEnterprise,
           project: project,
           study: study,
           publicBenefit: publicBenefit,
           awards: awards
         },
         header: {
           'content-type': 'application/json'
         },
         success: function (res) {
           var data = res.data;
           if (data.code == 2) {
             var jibai = 0;
             var dataIn=data.data;
             if (dataIn.score <= 50) {
               jibai = 30;
             } else if (dataIn.score <= 60) {
               jibai = 40;
             } else if (dataIn.score <= 70) {
               jibai = 55;
             } else if (dataIn.score <= 80) {
               jibai = 70;
             } else if (dataIn.score <= 90) {
               jibai = 80;
             } else if (dataIn.score <= 100) {
               jibai = 85;
             } else if (dataIn.score > 100) {
               jibai = 85;
             }
             _that.setData({
               percent: dataIn.percent,
               hideNum: 'block',
               jibai: jibai
             }); 
          
           }else if(data.code==1){//有uid
             hotapp.request({
               useProxy: true,
               url: 'http://www.smartapply.cn/cn/wx-api/odds-result', // 需要代理请求的网址
               data: {
                 uid:uid
               },
               header: {
                 'content-type': 'application/json'
               },
               success: function (res) {
                 var jibai = 0;
                 var data = res.data.data;
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
                   percent: data.percent,
                   hideNum: 'block',
                   jibai: jibai,
                   schoolName:data.school,
                   majorName:data.major
                 }); 
               }
               });

           }
         }
       });

      }
    })

  },
  returnIndex:function(){
    // wx.clearStorageSync();
    wx.removeStorageSync('schoolName');
    wx.removeStorageSync('schoolId');
    wx.removeStorageSync('schoolCountry');
    wx.removeStorageSync('schoolRank');
    wx.removeStorageSync('majorName');
    wx.removeStorageSync('majorId');
    // wx.clearStorage();
    wx.removeStorage({
      key: 'studentInfo',
      success: function (res) {}
    });
    wx.removeStorage({
      key: 'backCondition',
      success: function (res) { }
    });
    wx.reLaunch({
      url: '../../first/first'
    });
  },
  checkboxChange: function (e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var str='';
    for(var i=0;i<e.detail.value.length;i++){
      str += e.detail.value[i]+",";
      if(str.indexOf("sida")!=-1){
        this.setData({
          bigFour:1
        });
      }else{
        this.setData({
          bigFour: 0
        });
      }
      if (str.indexOf("waiqi") != -1) {
        this.setData({
          foreignCompany: 1
        });
      }else{
        this.setData({
          foreignCompany: 0
        });
      }
      if (str.indexOf("guoqi") != -1) {
        this.setData({
          enterprises: 1
        });
      }else{
        this.setData({
          enterprises: 0
        });
      }
      if (str.indexOf("siqi") != -1) {
        this.setData({
          privateEnterprise: 1
        });
      }else{
        this.setData({
          privateEnterprise:0
        });
      }
      if (str.indexOf("bisai") != -1) {
        this.setData({
          project: 1
        });
      }else{
        this.setData({
          project: 0
        });
      }
      if (str.indexOf("youxue") != -1) {
        this.setData({
          study: 1
        });
      }else{
        this.setData({
          study:0
        });
      }
      if (str.indexOf("gongyi") != -1) {
        this.setData({
          publicBenefit: 1
        });
      }else{
        this.setData({
          publicBenefit:0
        });
      }
      if (str.indexOf("huojiang") != -1) {
        this.setData({
          awards: 1
        });    
      }else{
        this.setData({
          awards:0
        }); 
      }
    }

    wx.setStorage({
      key: "backCondition",
      data: {
        "bigFour": this.data.bigFour,
        "foreignCompany": this.data.foreignCompany,
        "enterprises": this.data.enterprises,
        "privateEnterprise": this.data.privateEnterprise,
        "project": this.data.project,
        "study": this.data.study,
        "publicBenefit": this.data.publicBenefit,
        "awards": this.data.awards
      }
    });


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      schoolName: options.schoolName,
      majorName: options.majorName
    });
    console.log(wx.getStorageSync('nickname'));
    if (this.data.nickname){
      this.setData({
        shownickname: this.data.nickname.substring(1, this.data.nickname.length - 1)
      });
    }else{
      this.setData({
        shownickname: this.data.username.substring(1, this.data.username.length - 1)
      });
    }
    if (options.result=="show"){
       this.showMask();
    }
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
  onShareAppMessage: function (res) {
    var comName='';
    var name = wx.getStorageSync('nickname');
    var name02 =wx.getStorageSync('username');
    if(!name){
      comName=name02;
    }else{
      comName = name;
    }
      
    return {
      title: comName.replace(/\"/g, "")+'的录取几率测评',
      path: "pages/guidePage/guidePage",
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})