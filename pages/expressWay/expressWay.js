// pages/expressWay/expressWay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expressItemSelect: 0 //0 is自提   1 is 邮寄
  },
  item_click(e) {
    let index = e.currentTarget.dataset.index;
    if (index == 0) 
    {
      this.setData({
        expressItemSelect: 0
      });
      wx.setStorage({
        key: 'orderConfirmExpressData',
        data: "自提",
        success(){
          wx.navigateBack({
            delta: 1
          })
        }
      })
      
    }
    else if (index == 1) 
    {
      this.setData({
        expressItemSelect: 1
      });
      wx.setStorage({
        key: 'orderConfirmExpressData',
        data: "快递",
        success() {
          wx.redirectTo({
            url: '/pages/address/address?typeFrom=1',
          })
        }
      })
     
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
})