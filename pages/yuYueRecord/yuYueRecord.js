import req from "../../utils/request.js";
import api from "../../utils/api.js";
// pages/yuYueRecord/yuYueRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:{}
  },

  reqFindMyAppointment() {
    let url = api.urlString.findMyAppointment;
    wx.showLoading({
      title: '加载中'
    });
    let that = this;
    req.Post(url, {}, function success(res) {
      wx.hideLoading();
      that.setData({
        dataObj: res.data
      });
      console.log(that.data.dataObj);
    });
  },
  //取消预约
  reqUpdateAppointmentStatus(id) {
    let url = api.urlString.updateAppointmentStatus;
    wx.showLoading({
      title: '加载中...'
    });
    let that = this;
    let param={
      appointmentId:id
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      //that.setData({
      //  dataObj: res.data
      //});
      //console.log(that.data.dataObj);
    });
  },
  cancelYuYueBtnClick(e)
  {
    let index=e.currentTarget.dataset.index;
    console.log("xxxxxxxxxxxxxxxxxxxcancelYuYueBtnClick",index);
    let id=39;
    
    this.reqUpdateAppointmentStatus(id);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reqFindMyAppointment();
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
  phoneCallClick(){
    wx.showToast({
      title: '拨打电话',
    })
  }
 
})