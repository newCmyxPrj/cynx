// pages/cardCharge/cardCharge.js
import api from '../../utils/api.js';
import req from '../../utils/request.js';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moneySelectIndex: 1,
    dataObj: {}
  },
  
  reqCardRecharge() {
    var that = this;
    let url = api.urlString.cardRecharge;
    wx.showLoading({
      title: '加载中...'
    });
    let param = {
      "merchantId": app.globalData.merchantId,
      "storeId": app.globalData.storeId,
      "userId": app.globalData.memberId
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqQueryUserCard  sucess res=', res);
      // that.setData({
      //   dataObj: res.data
      // })
    });
  },

  money_item_click(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      moneySelectIndex: index
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    wx.getStorage({
      key: 'cardChargeData',
      success: function(res) {
        that.setData({
          dataObj:res.data
        });
        wx.removeStorage({
          key: 'cardChargeData',
          success: function(res) {},
        })
        // console.log('xxxxxxxxxxxxxxxxxreqQueryUserCard  sucess res=',res);
      },
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
  chargeBtnClick(){
    wx.showToast({
      title: '该功能还在调试中',
      icon:"none"
    })
  }
})