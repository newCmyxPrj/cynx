// pages/artDetail/artDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj: {},
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    wx.getStorage({
      key: 'zuo_pin_detail_data',
      success: function(res) {
        that.setData({
          dataObj: res.data
        });
        wx.removeStorage({
          key: 'zuo_pin_detail_data',
          success: function(res) {
            console.log("remove zuo_pin_detail_data success");
          },
        })
      },
    })

  },

  liJiYuYueBtnClick() {
    wx.setStorage({
      key: 'yuYueInfoDataFromArtDetails',
      data: this.data.dataObj,
      success(){
        wx.navigateTo({
          url: '/pages/yuYueInfo/yuYueInfo',
        })
      }
    })
   
  }
})