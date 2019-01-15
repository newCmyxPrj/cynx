// pages/cardCharge/cardCharge.js
import api from '../../utils/api.js';
import req from '../../utils/request.js';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moneySelectIndex: 0,
    defaultMoneyArray:[100,300,500,1000,3000,5000],
    dataObj: {},
    inputValue:0,
  },

  reqCardRecharge(chargeMoney) {
    var that = this;
    let url = api.urlString.cardRecharge;
    wx.showLoading({
      title: '加载中...'
    });
    let param = {
      "appId": app.globalData.appId,
      "cardId": this.data.dataObj.cardId,
      "merchantId": app.globalData.merchantId,
      "rechargeAmount": chargeMoney,
      "storeId": app.globalData.storeId,
      "userId": this.data.dataObj.userId
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqCardRecharge  sucess res=', res);
      // that.setData({
      //   dataObj: res.data
      // })
    });
  },

  money_item_click(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      moneySelectIndex: index
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    wx.getStorage({
      key: 'cardChargeData',
      success: function(res) {
        that.setData({
          dataObj:res.data
        });

        wx.removeStorage({
          key: 'cardChargeData',
          success: function(res) {},
        })
        console.log('xxxxxxxxxxxxxxxxxcardChargeData  sucess res=', that.data.dataObj);
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindInputChargeValue(e) {
    this.data.inputValue = e.detail.value;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  chargeBtnClick(){
    let chargeMoney=0;
    if (this.data.inputValue>0)
    {
      chargeMoney = this.data.inputValue;
      this.reqCardRecharge(chargeMoney);
    }
    else
    {
      this.reqCardRecharge(this.data.defaultMoneyArray[this.data.moneySelectIndex]);
    }
  }
})