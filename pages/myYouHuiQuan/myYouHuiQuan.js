// pages/myYouHuiQuan/myYouHuiQuan.js
import api from '../../utils/api.js';
import req from '../../utils/request.js';

var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftPartSelectFlag:true,
    useCouponsDataObj:{},
    notUseCouponsDataObj:{}
  },

  // type (integer, optional): 查询type 1-可使用 2-不可使用 ,userId(string, optional): 会员id
  reqQueryUserCouponCanUse() {
    var that = this;
    let url = api.urlString.queryUserCoupon;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      "type": 1,
      "userId": app.globalData.memberId
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqQueryUserCoupon  sucess res=', res);
      that.setData({
        useCouponsDataObj:res.data
      });
    });
  },

  // type (integer, optional): 查询type 1-可使用 2-不可使用 ,userId(string, optional): 会员id
  reqQueryUserCouponCanNotUse() {
    var that = this;
    let url = api.urlString.queryUserCoupon;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      "type": 2,
      "userId": app.globalData.memberId
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqQueryUserCouponCanNotUse  sucess res=', res);
      that.setData({
        notUseCouponsDataObj: res.data
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reqQueryUserCouponCanUse();
    this.reqQueryUserCouponCanNotUse();
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