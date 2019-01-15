import api from '../../utils/api.js';
import req from '../../utils/request.js';
import util from '../../utils/util.js';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _num: 0,
    dataObj: {},
    cutterInfo: {},
    totalPrice: 0
  },

  menuClick(e) {
    this.setData({
      _num: e.target.dataset.num
    });
  },
  reqMaiDan() {
    var that = this;
    let url = api.urlString.homeStoreList;
    wx.showLoading({
      title: 'loading'
    });
    let param = {};
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      //  console.log('xxxxxxxxxxxxxxxxxreqHomeStoreList  sucess res=', res);
    });
  },

  reqQueryAllCategoryWithProject() {
    var that = this;
    let url = api.urlString.queryAllCategoryWithProject;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      "employeeId": this.data.cutterInfo.employeeInfoId,
      "storeId": app.globalData.storeId
    }
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqQueryAllCategoryWithProject  sucess res=', res);
      //let list = res.data.projectCategoryDTOList;
      // if (list != undefined && list != null && list.length > 0) {
      //   for (let i = 0; i < list.length; i++) {
      //     for (let j = 0; j < list[i].projectInfoList.length; j++)
      //       list[i].projectInfoList[j].mySelectNum = 0;
      //   }
      // }

      that.setData({
        dataObj: res.data
      });
      console.log("dddddddddddddddataObj", that.data.dataObj);
    });
  },
  reqPreviewOrder(employeeInfoId) {
    var that = this;
    let url = api.urlString.previewOrder;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      employeeInfoId: employeeInfoId
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqPreviewOrder  sucess res=', res);
      wx.setStorage({
        key: 'orderPayData',
        data: that.data.dataObj,
        success: function () {
          wx.navigateTo({
            url: '/pages/orderPay/orderPay',
          })
        }
      })
    });
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
    // this.reqQueryCategory();
    let that = this;
    wx.getStorage({
      key: 'maiDanData',
      success: function(res) {
        console.log("xxxxxxxxxxxmaiDanData:", res.data);
        that.setData({
          cutterInfo: res.data
        });
        that.reqQueryAllCategoryWithProject();
        wx.removeStorage({
          key: 'maiDanData',
          success: function(res) {
            console.log("xxxxxxxxxxxremove maiDanData Success");
          },
        })
      },
    })
    // that.reqQueryProjectByMerchantId();

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  reqQueryProjectByMerchantId() {
    let url = api.urlString.queryProjectByMerchantId;
    wx.showLoading({
      title: 'loading'
    });
    let param = {
      "employeeId": 1,
      "storeId": 1
    };
    let that = this;
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqQueryProjectByMerchantId res=', res);
      that.setData({
        dataObj: res.data
      })
    });
  },
  
  reqAddIntoShopCart(employeeInfoId, projectId, quanity,prjIndex) {
   let url = api.urlString.addIntoShopCart;
    wx.showLoading({
      title: '加载中...'
    });
    let param = {
      "employeeInfoId": employeeInfoId,
      "projectId": projectId,
      "quanity": quanity
    };
    let that = this;
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      //console.log('xxxxxxxxxxxxxxxxxreqAddIntoShopCart res=', res);
      that.data.dataObj.projectCategoryDTOList[that.data._num].projectInfoList[prjIndex].quantity = res.data.quanity;
      that.setData({
        dataObj: that.data.dataObj
      });
      that.getTotalPrice();
    });
  },

  getTotalPrice() {
    let totalPrice = 0;
    let list = this.data.dataObj.projectCategoryDTOList;
    if (list != undefined && list != null && list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].projectInfoList.length; j++) {
          if (list[i].projectInfoList[j].quantity/*mySelectNum*/ > 0)
            totalPrice = totalPrice + list[i].projectInfoList[j].projectNowPrice * list[i].projectInfoList[j].quantity/*mySelectNum*/;
        }
      }
    }
    this.data.dataObj.costSum = totalPrice
    this.setData({
      dataObj: this.data.dataObj
    });
  },

  jianBtnTap(e) {
    let prjindex = e.currentTarget.dataset.prjindex;
    let list = this.data.dataObj.projectCategoryDTOList;
    if (list != undefined && list != null && list.length > 0) {
      // for (let i = 0; i < list.length; i++) 
      {
        for (let j = 0; j < list[this.data._num].projectInfoList.length; j++) {
          if (prjindex == j) {
            if (list[this.data._num].projectInfoList[j].quantity/*mySelectNum*/ > 0)
            {
              let tmpQuantity = list[this.data._num].projectInfoList[j].quantity/*mySelectNum*/ - 1;
            this.reqAddIntoShopCart(this.data.dataObj.employeeInfoDTO.employeeId, list[this.data._num].projectInfoList[j].id, tmpQuantity,j);
            }
            break;
          }
        }
      }
    }
    this.setData({
      dataObj: this.data.dataObj
    });
  },
  jiaBtnTap(e) {
    let prjindex = e.currentTarget.dataset.prjindex;
    let list = this.data.dataObj.projectCategoryDTOList;
    if (list != undefined && list != null && list.length > 0) {
      // for (let i = 0; i < list.length; i++) 
      {
        for (let j = 0; j < list[this.data._num].projectInfoList.length; j++) {
          if (prjindex == j) {
            let tmpQuantity = list[this.data._num].projectInfoList[j].quantity/*mySelectNum*/ + 1;
            this.reqAddIntoShopCart(this.data.dataObj.employeeInfoDTO.employeeId, list[this.data._num].projectInfoList[j].id, tmpQuantity,j);
            break;
          }
        }
      }
    }
    this.setData({
      dataObj: this.data.dataObj
    });
  },
  
  jieSuanBtnClick() {
//    this.reqPreviewOrder(this.data.cutterInfo.employeeInfoId);
    let that=this;
    wx.setStorage({
      key: 'orderPayData',
      data: that.data.dataObj,
      success: function () {
        wx.navigateTo({
          url: '/pages/orderPay/orderPay',
        })
      }
    })
  },
  reSelectBtn() {
    wx.navigateBack({
      delta: 1
    })
  }
})