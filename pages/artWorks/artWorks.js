// pages/artWorks/artWorks.js
import req from "../../utils/request.js";
import api from "../../utils/api.js";

var that;
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.reqArtWorks();
  },
  reqArtWorks() {
    let url = api.urlString.artWorks;
    wx.showLoading({
      title: '加载中'
    });
    let that=this;
    //var param = { 1 : 1};
    req.Post(url, app.globalData.storeId, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqArtWorks  sucess res=', res);
      that.setData({
        dataList:res.data
      });
    });
  },
  goToDetail:function(e)
  {
    let index = e.currentTarget.dataset.index;
    // wx.setStorageSync('zuo_pin_detail_data',this.data.dataList[index]);
    // wx.navigateTo({
    //   url: '/pages/artDetail/artDetail',
    // })
    wx.setStorage({
      key: 'zuo_pin_detail_data',
      data: this.data.dataList[index],
      success(){
        wx.navigateTo({
           url: '/pages/artDetail/artDetail',
       })
      }
    })
  }
})