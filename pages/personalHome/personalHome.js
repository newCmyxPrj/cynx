// pages/personalHome/personalHome.js
import req from "../../utils/request.js";
import api from "../../utils/api.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:4,
    item_select_index:0,
    dataObj:{}
  },


  jiamubiaoClick()
  {
      this.setData(
        {
          item_select_index:0
        }
      );
  },
  pinglunClick()
  {
      this.setData(
        {
          item_select_index:1
        }
      )
  },
  zhanshiClick()
  {
      this.setData(
        {
          item_select_index:2
        }
      );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('personalHome options=', options);
    this.reqQueryEmployeeById(options.employeeId);
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  reqQueryEmployeeById(employeeId) {
    let url = api.urlString.queryEmployeeById;
    wx.showLoading({
      title: 'loading'
    });
    // let param = {
    //   employeeId: employeeId
    // };
    let that=this;
    req.Post(url, /*param*/employeeId, function success(res) {
      wx.hideLoading();
      that.setData(
        {
          dataObj:res.data
        }
      );
      console.log('xxxxxxxxxxxqueryEmployeeById  sucess res=', res);
    });
  },

})