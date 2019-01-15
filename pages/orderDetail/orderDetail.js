// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        //订单状态筛选 ""-全部 "20"-待付款 "10"-待评论 "80"-已完成 "01"-已取消

    daiFuKuanType: "20",
    daiPingLunType: "10",
    yiWanChengType: "80",
    yiQuXiaoType: "01",
    dataObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    console.log("orderdetail onLoad");
    wx.getStorage({
      key: 'orderDetailData',
      success: function(res) {
        that.setData({
          dataObj:res.data
        });
        console.log("orderdetail data:",that.data.dataObj);
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
  goToPersonalHome()
  {
    wx.navigateTo({
      url: '/pages/personalHome/personalHome?employeeId=' + this.data.dataObj.employeeId,
    })
  }
})