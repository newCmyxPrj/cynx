import api from '../../utils/api.js';
import req from '../../utils/request.js';
//http://47.93.205.72:8080/swagger-ui.html#!/order-api/queryOrderSummeryUsingPOST

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  onLoad: function (options) {
  },
  
  reqTest() {
    var that = this;
    let url = api.urlString.homeStoreList;
    wx.showLoading({
      title: 'loading'
    });
    let param = {
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      //  console.log('xxxxxxxxxxxxxxxxxreqHomeStoreList  sucess res=', res);
    });
  },

  
})