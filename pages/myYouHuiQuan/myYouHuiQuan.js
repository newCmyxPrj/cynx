// pages/myYouHuiQuan/myYouHuiQuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftPartSelectFlag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  my_you_hui_quan_no_die_jia_click: function () {
    this.setData({
      leftPartSelectFlag: true
    });
  },
  my_you_hui_quan_die_jia_click: function () {
    this.setData({
      leftPartSelectFlag: false
    });
  },
})