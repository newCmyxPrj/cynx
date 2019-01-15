// pages/cutterSelect/cutterSelect.js
import req from "../../utils/request.js";
import api from "../../utils/api.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:[]
  },
  okBtnClick(e)
  {
    let employeeid = e.currentTarget.dataset.employeeid;
    let index=e.currentTarget.dataset.index;
    wx.setStorageSync("maiDanData", this.data.dataObj[index]);
    wx.navigateTo({
      url: '/pages/maiDan/maiDan?employeeid=' + employeeid,
    })
  },

  reqEmployeeByStoreId(storeId) {
    let url = api.urlString.queryEmployeeByStoreId;
    wx.showLoading({
      title: '加载中'
    });
    // let param = {
    //   "storeId": storeId
    // };
    let that = this;
    req.Post(url, storeId, function success(res) {
      wx.hideLoading();
     //console.log('xxxxxxxxxxxxxxxxxreqEmployeeByStoreId  sucess res=', res);
     that.setData({
       dataObj:res.data
     });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reqEmployeeByStoreId(options.storeId);
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
  goToPersonalHome(e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/personalHome/personalHome?employeeId=' + this.data.dataObj[index].employeeInfoId,
    })
  }
})