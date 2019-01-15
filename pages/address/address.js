import req from "../../utils/request.js";
import api from "../../utils/api.js";
var that;
var app = getApp();

Page({
  data: {
    openType: 0,
    hasPhone: true,
    cellClass: [{
      receiverName: '小崔',
      receiverPhone: '188****8765',
      area: '江苏省苏州市姑苏区',
      address: '乐桥888号',
      isDefault: 0
    }],
    isFromGoodsDetail: false,
    disTouch: false,
    addressList: [],
    typeFrom: 0
  },

  touchAdressCell(e) {
    if (!this.data.isFromGoodsDetail) {
      var item = e.currentTarget.dataset.item;
      wx.setStorageSync('addressData', item);
      wx.navigateTo({
        url: '../addressAdd/addressAdd',
      })

    } else {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2]; //上一个页面
      let item = e.currentTarget.dataset.item;
      //console.log('xxxxxxxxxxxxxxxxx222  item=', item);
      let areas = item.area.split('/');

      prevPage.setData({
        'orderConf.defaultAddress.receiverName': item.receiverName,
        'orderConf.defaultAddress.receiverPhone': item.receiverPhone,
        'orderConf.defaultAddress.area': areas[0] + areas[1] + areas[2],
        'orderConf.defaultAddress.address': item.address
      }, () => {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
        })
      })
    }
  },
  modifyAddressButtonClick(e) {
    var item = e.currentTarget.dataset.item;
    wx.setStorageSync('addressData', item);
    wx.navigateTo({
      url: '../addressAdd/addressAdd',
    })
  },
  // 显示获取手机号界面
  getMsg(e) {
    this.setData({
      verificationPhone: true
    })
  },
  // 添加收货地址
  toAddNewAddressUI() {
    wx.navigateTo({
      url: '/pages/addressAdd/addressAdd',
    })
  },

  onLoad: function(options) {
    that = this;
    this.data.typeFrom = options.typeFrom;
    if (options.isFromGoodsDetail != undefined) {
      this.setData({
        isFromGoodsDetail: options.isFromGoodsDetail
      })
    }
  },
  onReady: function() {
    //Do some when page ready. 
  },
  onShow: function() {
    //Do some when page show.
    //?id=？
    let that = this;
    that.reqReceivingAddress(app.globalData.memberId);
    // setTimeout(function(){
    //   console.log('xxxxxxxxxxxxxxxxxxxxxmemID=', app.globalData.memberId);
    //   that.reqReceivingAddress(app.globalData.memberId);
    // },1000);
  },

  onUnload: function() {
    //Do some when page unload.

  },
  addressSelect(e) {
    var item = e.currentTarget.dataset.item;
    if (this.data.typeFrom == 1) {
      wx.setStorage({
        key: 'orderConfirmAddressData',
        data: item,
        success() {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },

  // 获取收货地址
  reqReceivingAddress(userId) {
    let url = api.urlString.queryUserAddress + userId;
    wx.showLoading({
      title: 'loading'
    });
    let param = {
      //"isDebug": "false",
    };
    let that = this;
    req.reqGet(url, param, function success(res) {
      wx.hideLoading();
      that.setData({
        addressList: res.data
      });
    });
  },
  // 删除地址
  reqDeleteAddress(addressId, userId) {
    let url = api.urlString.deleteAddress;
    wx.showLoading({
      title: 'loading'
    });
    let param = {
      //"isDebug": "false",
      "addressId": addressId,
      "userId": userId
    };
    let that = this;
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqDeleteAddress  sucess res=', res);
      that.reqReceivingAddress(app.globalData.memberId);

    });
  },
  deleteBtnClick(e) {
    console.log('xxxxxxxxxxxxxxxxxxxxdeleteBtnClick', e)
    let addressId = e.currentTarget.dataset.addressid;
    let userId = e.currentTarget.dataset.userid;
    this.reqDeleteAddress(addressId, userId);
  }

})