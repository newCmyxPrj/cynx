// pages/consumerDetails/consumerDetails.js
import req from "../../utils/request.js";
import api from "../../utils/api.js";

var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      dataObj:[]
  },

  seachClick()
  {
    wx.showToast({
      title: '暂无搜索功能',
      icon:'none'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reqQueryOrderSummery();
  },
  reqQueryOrderSummery() {
    var that = this;
    let url = api.urlString.queryOrderSummery;
    wx.showLoading({
      title: 'loading'
    });
    let param = {
      "currentPage": 1,
      "pageSize": 10,
      "queryId": 1,
      "text": "",
      "userId": app.globalData.memberId
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqQueryOrderSummery  sucess res=', res);
      that.setData({
        dataObj:res.data
      });
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
})