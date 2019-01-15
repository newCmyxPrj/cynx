import req from "../../utils/request.js";
import api from "../../utils/api.js";
// pages/yuYue/yuYue.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */

  data: {
    dataObj:[]
  },


  reqEmployeeByStoreId() {
    let url = api.urlString.queryEmployeeByStoreId;
    wx.showLoading({
      title: '加载中'
    });
    // let param = {
    //   "storeId": app.globalData.storeId
    // };
    let that = this;
    req.Post(url, app.globalData.storeId, function success(res) {
      wx.hideLoading();
      that.setData({
        dataObj: res.data
      });
    });
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
    this.reqEmployeeByStoreId();
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
  goToYuYue(e){
    let index=e.currentTarget.dataset.index;
    wx.setStorageSync("yuYueInfoData", this.data.dataObj[index])
    wx.navigateTo({
      url: '/pages/yuYueInfo/yuYueInfo',
    })
  },
  daShanBtn(e)
  {
    let index = e.currentTarget.dataset.index;
    wx.setStorageSync("daShangData", this.data.dataObj[index])

    wx.navigateTo({
      url: '/pages/daShang/daShang?employeeInfoId=' + this.data.dataObj[index].employeeInfoId,
    })
  },
  goToPersonalHome(e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/personalHome/personalHome?employeeId=' + this.data.dataObj[index].employeeInfoId,
    })
  }
})