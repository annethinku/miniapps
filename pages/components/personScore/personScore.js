// pages/components/personScore/personScore.js
var hotapp = require('../../../utils/hotapp.js');
Page({
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      currentXueli: this.data.array[e.detail.value]
    })
  },
  bindPickerChange02: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index02: e.detail.value,
      academy: parseInt(e.detail.value) + 1
    })
  },
  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    this.setData({
      multiIndex: e.detail.value,
      writeMajor: that.data.multiArray[0][that.data.multiIndex[0]] + '-' + that.data.multiArray[1][that.data.multiIndex[0]]
    })
    // console.log(this.data.writeMajor);

  },
  bindMultiPickerColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;//二位数组值;
    console.log(data.multiIndex)
    switch (e.detail.column) {
      case 0:
        this.test(e.detail.value);
        data.multiIndex[1] = 0; //第一列滑动后第二列默认置顶
        break;
    }
    this.setData({
      multiIndex: data.multiIndex
    });

  },
  clickNext01: function (e) {
    var gpa = this.data.gpa;
    var gmat = this.data.gmatgre;
    var toefl = this.data.toeflIel;
    if (!gpa || !toefl) {
      wx.showModal({
        title: '提示',
        content: '注意必填项！',
        showCancel: false,
        success: function (res) { }
      });
      return false;
    }
    if (isNaN(gpa) || isNaN(gmat) || isNaN(toefl)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的科目分数！',
        showCancel: false,
        success: function (res) { }
      });
      return false;
    }
    if (gpa) {
      if ((gpa < 2.5) || (gpa > 100) || ((gpa > 4) && (gpa < 50))) {
        wx.showModal({
          title: '提示',
          content: 'gpa数值填写范围为2.5-4.0或者50-100！',
          showCancel: false,
          success: function (res) { }
        });
        return false;
      }
    } else {
      wx.showModal({
        title: '提示',
        content: 'GPA为必填项！',
        showCancel: false,
        success: function (res) { }
      });
      return false;
    }
    if (gmat) {
      if ((gmat < 200)) {
        wx.showModal({
          title: '提示',
          content: 'gre数值填写范围为200-340，gmat数值填写范围为400-800',
          showCancel: false,
          success: function (res) { }
        });
        return false;
      }
      if ((gmat > 340) && (gmat < 400)) {
        wx.showModal({
          title: '提示',
          content: 'gre数值填写范围为200-340，gmat数值填写范围为400-800',
          showCancel: false,
          success: function (res) { }
        });
        return false;
      }
      if ((gmat > 800)) {
        wx.showModal({
          title: '提示',
          content: 'gre数值填写范围为200-340，gmat数值填写范围为400-800',
          showCancel: false,
          success: function (res) { }
        });
        return false;
      }
    }
    if (toefl) {
      if ((toefl < 5)) {
        wx.showModal({
          title: '提示',
          content: 'toefl数值填写范围为60-120！,ielts数值填写范围为5.0-9.0！',
          showCancel: false,
          success: function (res) { }
        });
        return false;
      }
      if ((toefl > 120)) {
        wx.showModal({
          title: '提示',
          content: 'toefl数值填写范围为60-120！,ielts数值填写范围为5.0-9.0！',
          showCancel: false,
          success: function (res) { }
        });
        return false;
      }
      if ((toefl < 60) && (toefl > 9)) {
        wx.showModal({
          title: '提示',
          content: 'toefl数值填写范围为60-120！,ielts数值填写范围为5.0-9.0！',
          showCancel: false,
          success: function (res) { }
        });
        return false;
      }
    } else {
      wx.showModal({
        title: '提示',
        content: 'TOEFL/IELTS为必填项！',
        showCancel: false,
        success: function (res) { }
      });
      return false;
    }
    this.setData({
      showOrHide: 'none',
      showOrHide02: 'block'
    });
  },
  clickPrev01: function (e) {
    this.setData({
      showOrHide: 'block',
      showOrHide02: 'none'
    })
  },
  clickNext02: function () {
    var education = this.data.currentXueli;//目前学历
    var school = this.data.academy;//学校等级
    var school_name = this.data.writeSchool;//当前就读学校名称
    var c_major = this.data.writeMajor;//目前专业
    if ((!education) || (school == 0) || (!school_name) || (!c_major) || c_major == "请选择-请选择") {
      wx.showModal({
        title: '提示',
        content: '请注意必填项！',
        showCancel: false,
        success: function (res) { }
      });
      return false;
    }
    wx.setStorage({
      key: "studentInfo",
      data: {
        "gpa": this.data.gpa,
        "gmatgre": this.data.gmatgre,
        "toeflIel": this.data.toeflIel,
        "currentXueli": this.data.currentXueli,
        "academy": this.data.academy,
        "writeSchool": this.data.writeSchool,
        "writeMajor": this.data.writeMajor
      }
    });
    wx.navigateTo({
      url: '../../components/backCondition/backCondition?schoolName=' + this.data.schoolName + '&majorName=' + this.data.majorName
    });
  },
  gpaChange: function (e) {
    this.setData({
      gpa: e.detail.value
    });
  },
  gmatgreChange: function (e) {
    this.setData({
      gmatgre: e.detail.value
    });
  },
  toeflIelChange: function (e) {
    this.setData({
      toeflIel: e.detail.value
    });
  },
  wirteSchool: function (e) {
    this.setData({
      writeSchool: e.detail.value
    });
  },
  // wirteMajor: function (e) {
  //   this.setData({
  //     writeMajor: e.detail.value
  //   });
  // },
  /**
   * 页面的初始数据
   */
  data: {
    array: ['本科','博士', '硕士',  '专科', '高中', '初中'],
    index: '',
    array02: ['清北复交浙大', '985', '211', '非211本科', '专科'],
    index02: '',
    showOrHide: 'block',
    showOrHide02: 'none',
    schoolName: '',
    majorName: '',
    gpa: 0,
    gmatgre: 0,
    toeflIel: 0,
    currentXueli: '',
    academy: 0,
    writeSchool: '',
    writeMajor: '',
    multiIndex: [0, 0],
    multiArray: '',
    curData: '',
    major_A: '',
    majorXL01: '',
    majorXL02: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    hotapp.request({
      useProxy: true,
      url: 'http://test.school.gmatonline.cn/cn/api/major-country', // 需要代理请求的网址
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var major_A = res.data.major;
        var majorA_arry = major_A.map(itemA => {　　　　// 此方法将专业名称区分到一个新数组中
          return itemA.name;
        });
       
        const test = { "id": "0", 'name': '请选择', 'child': [{ "id": '0', "name": '请选择' }] };
        const test_b = majorA_arry.unshift('请选择');
        const test_c = major_A.unshift(test);
        // console.log(majorA_arry,major_A)
        that.setData({
          multiArray: [majorA_arry, ['请选择']],
          major_A: majorA_arry,//一级专业名称数组
          curData: major_A,//接口返回的数据
        })
        // that.test(0);
        that.setData({
          schoolName: options.schoolName,
          majorName: options.majorName,
          writeMajor: that.data.multiArray[0][that.data.multiIndex[0]] + '-' + that.data.multiArray[1][that.data.multiIndex[0]]
        });
        // console.log(that.data.writeMajor);
      }
    });
  },
  test(index) { //一级菜单下标 取 数据对应下标子菜单
    var item = this.data.curData[index].child; //取下标子菜单
    var major_A = this.data.major_A;
    var major_B = item.map(itemB => { //子菜单name
      return itemB.name;
    })
    // major_B.unshift("请选择");
    this.setData({
      multiArray: [major_A, major_B]  //更新data元素
    })

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