// pages/cardList/cardList.js
import api from '../../utils/api.js';
import req from '../../utils/request.js';
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:{}
  },

  
  reqQueryUserCard() {
    var that = this;
      let url = api.urlString.queryUserCard;
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
      that.setData({
        dataObj:res.data
      })
    });
  },
  cardItemClick(e){
    let index=e.currentTarget.dataset.index;
    wx.setStorage({
      key: 'cardChargeData',
      data: this.data.dataObj[index],
      success(){
        wx.navigateTo({
          url: '/pages/cardCharge/cardCharge',
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reqQueryUserCard();
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

  }
})