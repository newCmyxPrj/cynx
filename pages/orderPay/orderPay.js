import api from '../../utils/api.js';
import req from '../../utils/request.js';
// pages/orderPay/orderPay.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj: {},
    projectList: [],
    totalPrice: 0
  },



  reqOrderJieSuan(employeeInfoId) {
    var that = this;
    let url = api.urlString.orderJieSuan;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      employeeInfoId: employeeInfoId
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxreqOrderJieSuan  sucess res=', res);
      that.reqPrepareOrderPay(res.data.orderId);
    });
  },

  reqPrepareOrderPay(orderId) {
    var that = this;
    let url = api.urlString.prepareOrderPay;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      appId: app.globalData.appId,
      orderId: orderId
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqPrepareOrderPay  sucess res=', res);
      that.wxRequestPay(res.data.timeStamp, res.data.nonceStr, res.data.package, res.data.paySign);
    });
  },

  //微信支付
  wxRequestPay(timeStamp, nonceStr, prepayId, sign) {
    wx.requestPayment({
      timeStamp: timeStamp,
      nonceStr: nonceStr,
      package: prepayId,
      signType: 'MD5',
      paySign: sign,
      fail: function(res) {
        console.log("xxxxxxxxxxxxxxres:", res);
        wx.showToast({
          title: '支付失败!',
          icon: "none"
        })
      },
      success: function() {
        wx.showToast({
          title: '支付成功!'
        })
        setTimeout(function() {
          wx.navigateTo({
            url: '/pages/myOrderList/myOrderList?typeIndex=0', //付款成功，进入全部订单列表
          })
        }, 1200);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.reqPreviewOrder();
    let that = this;
    wx.getStorage({
      key: 'orderPayData',
      success: function(res) {
        that.setData({
          dataObj: res.data
        });
        console.log("xxxxxxxxxxxoederPayData", that.data.dataObj);
        that.getProjectList();
        that.getTotalPrice();
        //console.log('xxxxxxxxxxxxxxxxxxorderPay',that.data.dataObj);
        wx.removeStorage({
          key: 'orderPayData',
          success: function(res) {
            console.log("remove data success!!!")
          },
        })
      },
    })
  },

  getProjectList() {
    let list = this.data.dataObj.projectCategoryDTOList;
    if (list != undefined && list != null && list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].projectInfoList.length; j++) {
          if (list[i].projectInfoList[j].quantity > 0)
            this.data.projectList.push(list[i].projectInfoList[j]);
        }
      }
    }
    this.setData({
      projectList: this.data.projectList
    });
  },
  getTotalPrice() {
    let totalPrice = 0;
    let list = this.data.dataObj.projectCategoryDTOList;
    if (list != undefined && list != null && list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].projectInfoList.length; j++) {
          if (list[i].projectInfoList[j].quantity > 0)
            totalPrice = totalPrice + list[i].projectInfoList[j].projectNowPrice * list[i].projectInfoList[j].quantity;
        }
      }
    }
    this.setData({
      totalPrice: totalPrice
    });
  },

  jieSuanBtnClick() {
    this.reqOrderJieSuan(this.data.dataObj.employeeInfoDTO.employeeId);
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  }
})