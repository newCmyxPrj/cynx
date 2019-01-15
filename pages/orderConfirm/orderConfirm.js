// pages/orderConfirm/orderConfirm.js
import api from '../../utils/api.js';
import req from '../../utils/request.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj: {},
    addressDataObj: {},
    expressWay: ""
  },

  dui_huan_click() {
    // wx.showToast({
    //   title: '未完待续',
    //   icon:'none'
    // })
    this.reqDuiHuan();
  },

  reqDuiHuan() {
    var that = this;
    let url = api.urlString.exchangeGoods;
    wx.showLoading({
      title: '加载中...'
    });
    if (this.data.expressWay == "")
    {
      wx.showToast({
        title: '请选择邮寄或者自提!',
        icon:"none"
      })
      return ;
    }
    let picktype = 1;
    if (this.data.expressWay == "快递") {
      picktype = 2;
    }
    let param = {
      "addressId": this.data.addressDataObj.id,
      "commodityId": this.data.dataObj.id,
      "pickType": picktype, //取货方式 1-自提 2-邮寄 ,
      "userId": app.globalData.memberId

    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqDuiHuan  sucess res=', res);
      wx.showToast({
        title: '兑换成功！',
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.getStorage({
      key: 'orderConfirmData',
      success: function(res) {
        that.setData({
          dataObj: res.data
        });
        console.log("oooooooooooooooorderConfirmData Obj", that.data.dataObj);
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    wx.getStorage({
      key: 'orderConfirmAddressData',
      success: function(res) {
        that.setData({
          addressDataObj: res.data
        });
        console.log("addressDataObj", that.data.addressDataObj);
        wx.removeStorage({
          key: 'orderConfirmAddressData',
          success: function(res) {

          },
        })
      },
    });
    wx.getStorage({
      key: 'orderConfirmExpressData',
      success: function(res) {
        that.setData({
          expressWay: res.data
        });
        wx.removeStorage({
          key: 'orderConfirmExpressData',
          success: function(res) {

          },
        })
      },
    })

  },
  expressWayItemClick() {
    wx.navigateTo({
      url: '/pages/expressWay/expressWay',
    })
  }


})