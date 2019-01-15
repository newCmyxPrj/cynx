// pages/pinTuan/pinTuan.js
import api from '../../utils/api.js';
import req from '../../utils/request.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
      dataObj:{},
    timerStampsSeconds: 0,
    day: 0,
    hour: 0,
    miniute: 0,
    second: 0,
    timerInterval: -1
  },

  reqGetActivityById(id) {
    var that = this;
    let url = api.urlString.getActivityById;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      "id": id
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqGetActivityById  sucess res=', res);
      that.setData({
        dataObj:res.data
      })

      let duraction = parseInt((res.data.endTimeStamp - (new Date().getTime())) / 1000);
      if (duraction > 0) {
        that.setData(
          {
            timerStampsSeconds: duraction
          }
        )
        //  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxtimerStamp:", that.data.timerStampsSeconds);
        that.data.timerInterval = setInterval(function () {
          if (that.data.timerStampsSeconds > 0) {
            that.data.timerStampsSeconds--;
            let day = parseInt(that.data.timerStampsSeconds / (24 * 60 * 60));
            let hour = parseInt((that.data.timerStampsSeconds - day * 24 * 60 * 60) / (60 * 60));
            let miniute = parseInt((that.data.timerStampsSeconds - day * 24 * 60 * 60 - hour * 60 * 60) / 60);
            let second = parseInt((that.data.timerStampsSeconds - day * 24 * 60 * 60 - hour * 60 * 60 - miniute * 60) % 60);
            that.setData(
              {
                day: day,
                hour: hour,
                miniute: miniute,
                second: second
              }
            );
            console.log("xxxxxxxxxxxxxxxxxxtimer:", day, hour, miniute, second);
          }
        }, 1000);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reqGetActivityById(options.id);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onUnload() {
    if (this.data.timerInterval != -1)
      clearInterval(this.data.timerInterval)
  },

  //参与拼团接口
  reqJoinGroup() {
    var that = this;
    let url = api.urlString.homeStoreList;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqJoinGroup sucess res=', res);
      wx.showToast({
        title: '参与拼团成功！',
      })
    });
  },

  startPinTuanClick(){
    this.reqJoinGroup();
  },
  onShareAppMessage: function () {
    return {
      title: this.data.dataObj.name,
      imageUrl: this.data.dataObj.showImages,
      path: "/pages/pinTuan/pinTuan?id=" + this.data.id
    }
  }
})