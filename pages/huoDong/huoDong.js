// pages/huoDong/huoDong.js
import api from '../../utils/api.js';
import req from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleSelectIndex:0,
    spikeDataObj:{},
    pinTuanDataObj:{},
    barginDataObj:{}
  },
  title_item_click(e){
    let index= e.currentTarget.dataset.index;
    this.setData({
      titleSelectIndex:index
    });
  },

//参与秒杀活动记录
  reqSpikeJoinRecordByUserAndMerchantId() {
    var that = this;
    let url = api.urlString.spikeJoinRecordByUserAndMerchantId;
    wx.showLoading({
      title: '加载中...'
    });
    let param = {};
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      //console.log('xxxxxxxxxxxxxxxxxreqSpikeJoinRecordByUserAndMerchantId  sucess res=', res);
      that.setData({
        spikeDataObj:res.data
      });
    });
  },
  //参与拼团活动记录
  reqGroupJoinRecordByUserAndMerchantId() {
    var that = this;
    let url = api.urlString.groupJoinRecordByUserAndMerchantId;
    wx.showLoading({
      title: '加载中...'
    });
    let param = {};
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqGroupJoinRecordByUserAndMerchantId拼团  sucess res=', res);
      that.setData({
        pinTuanDataObj: res.data
      });
    });
  },

  //参与砍价活动记录
  reqBargainJoinRecordByUserAndMerchantId() {
    var that = this;
    let url = api.urlString.bargainJoinRecordByUserAndMerchantId;
    wx.showLoading({
      title: '加载中...'
    });
    let param = {};
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqBargainJoinRecordByUserAndMerchantId 砍价  sucess res=', res);
      that.setData({
        barginDataObj: res.data
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reqSpikeJoinRecordByUserAndMerchantId();
    this.reqGroupJoinRecordByUserAndMerchantId();
    this.reqBargainJoinRecordByUserAndMerchantId();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  qu_pin_tuan_btn_click() {
    wx.navigateTo({
      url: '/pages/pinTuan/pinTuan',
    })
  },
  miao_sha_btn_click() {
    wx.navigateTo({
      url: '/pages/miaoSha/miaoSha',
    })
  },
  kan_jia_btn_click() {
    wx.navigateTo({
      url: '/pages/kanJia/kanJia',
    })
  },
  spikeUseBtnClick(){
    wx.showToast({
      title: '暂无去使用功能',
      icon:"none"
    })
  }
})