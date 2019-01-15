// pages/my/my.js
import util from '../../utils/util.js';
import req from "../../utils/request.js";
import api from "../../utils/api.js";

var  app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      usr_info:{},
      dataObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(
      {
        usr_info: app.globalData.userInfo
      }
    );

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.reqQueryMinAppUser();

  },

  reqQueryMinAppUser() {
    var that = this;
    let url = api.urlString.queryMinAppUser + app.globalData.memberId;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
    };
    req.reqGet(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqQueryMinAppUser  sucess res=', res);
      that.setData({
        dataObj:res.data
      });
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  my_order_item_click(e){
    let typeIndex=e.currentTarget.dataset.index;
    if (util.isLoginWithPhone()) {
        wx.navigateTo({
          url: '/pages/myOrderList/myOrderList?typeIndex=' + typeIndex,
      })
    }
  },
  meiyuanClick()
  {
    if (util.isLoginWithPhone()) {
      wx.navigateTo({
        url: '/pages/meiyuanMall/meiyuanMall?point='+this.data.dataObj.point,
      })
    }

  },
  consumerRecordClick()
{
    if (util.isLoginWithPhone()) {
      wx.navigateTo({
        url: '/pages/consumerDetails/consumerDetails',
      })
    }

  },
  addressManageClick()
  {
    if (util.isLoginWithPhone()) {
      wx.navigateTo({
        url: '/pages/address/address',
      })
    }
 
  },
  modify_phone()
  {
    if (util.isLoginWithPhone()) {
      wx.navigateTo({
        url: '/pages/modifyBindPhone/modifyBindPhone',
      })
    }
  },
  huoDongItemClick()
  {
      wx.navigateTo({
        url: '/pages/huoDong/huoDong',
      })

  },
  yuYueItemClick()
  {
    wx.navigateTo({
      url: '/pages/yuYueRecord/yuYueRecord',
    })
  },
  chongZhiItemClick()
  {
    wx.navigateTo({
      url: '/pages/cardList/cardList',
    })
  },

  youHuiQuanItemClick()
  {
      wx.navigateTo({
        url: '/pages/myYouHuiQuan/myYouHuiQuan',
      })
  },


  // requestAction() {
  //   wx.showLoading({
  //     title: '加载中...'
  //   });
  //   let param = {};
  //   let url = api.urlString.personalCenter;
  //   let that = this;
  //   req.Post(url, param, function success(res) {
  //      wx.hideLoading();
  //     that.data.phoneCallMsg.content = res.data.bsetPhone;
  //     that.setData({
  //       dataObj: res.data,
  //       phoneCallMsg: that.data.phoneCallMsg
  //     });
  //   });
  // },
})