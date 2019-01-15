// pages/meiyuanMall/meiyuanMall.js
import api from '../../utils/api.js';
import req from '../../utils/request.js';
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item_select_index:0,
    point:'',
    goodsDataList:[],
    recordDataObj:[]
  },
  meiyuan_dui_huan_click()
  {
    this.setData(
      {
        item_select_index:0
      }
    );
  },
  goods_item_click(e)
  {
    let index=e.currentTarget.dataset.index;
    console.log("goods_item_click index=",index);
    
    wx.setStorage({
      key: 'jiFenGoodsDetailData',
      data: this.data.goodsDataList[index],
      success:function(){
        wx.navigateTo({
          url: '/pages/jiFenGoodsDetail/jiFenGoodsDetail',
        })
      }
    })
  
  },
  meiyuan_dui_huan_record_click()
  {
    this.setData(
      {
        item_select_index:1
      }
    );
  },

  //获取美元商城商品列表
  reqQueryCommodityList() {
    var that = this;
    let url = api.urlString.queryCommodityList;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxqueryCommodityList  sucess res=', res);
      that.setData({
        goodsDataList:res.data
      });
    });
  },

  reqQueryExchangeRecordList() {
    var that = this;
    let url = api.urlString.queryExchangeRecordList + "/" + app.globalData.memberId;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
    };
    req.reqGet(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqQueryExchangeRecordList  sucess res=', res);
      that.setData({
        recordDataObj:res.data        
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(' meiyuan shangcheng options',options);
    this.setData({
      point:options.point
    });
   
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
    this.reqQueryCommodityList();
    this.reqQueryExchangeRecordList();
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

  }
})