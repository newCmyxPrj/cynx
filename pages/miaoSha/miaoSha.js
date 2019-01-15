// pages/miaoSha/miaoSha.js
import api from '../../utils/api.js';
import req from '../../utils/request.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    dataObj:{},
    timerStampsSeconds:-1,
    day:0,
    hour:0,
    miniute:0,
    second:0,
    timerInterval:-1
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
      //console.log('xxxxxxxxxxxxxxxxxreqGetActivityById  sucess res=', res);
      that.setData({
        dataObj: res.data
      })
      let duraction = parseInt((res.data.endTimeStamp-(new Date().getTime()))/1000);
      if(duraction>0)
      {
        that.setData(
          {
            timerStampsSeconds:duraction
          }
        )
      //  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxtimerStamp:", that.data.timerStampsSeconds);
        that.data.timerInterval=setInterval(function(){
          if (that.data.timerStampsSeconds>0)
          {
            that.data.timerStampsSeconds--;
            let day=parseInt(that.data.timerStampsSeconds/(24*60*60));
            let hour=parseInt((that.data.timerStampsSeconds-day*24*60*60)/(60*60));
            let miniute = parseInt((that.data.timerStampsSeconds - day * 24 * 60 * 60-hour*60*60) /60);
            let second = parseInt((that.data.timerStampsSeconds - day * 24 * 60 * 60 - hour * 60 * 60-miniute*60) % 60);
            that.setData(
              {
                day:day,
                hour:hour,
                miniute:miniute,
                second:second
              }
            );
            console.log("xxxxxxxxxxxxxxxxxxtimer:",day,hour,miniute,second);
          }


          if (that.data.timerStampsSeconds == 0)
          {
            if (that.data.timerInterval != -1)
              clearInterval(this.data.timerInterval)
          }
        },1000);
      }
    });
  },
  reqJoinSpikeActivity(id) {
    var that = this;
    let url = api.urlString.joinSpikeActivity;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      "activityId": id
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqJoinSpikeActivity  sucess res=', res);
      // that.setData({
      //   dataObj: res.data
      // })
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    this.reqGetActivityById(options.id);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onUnload(){
    if( this.data.timerInterval!=-1)
      clearInterval(this.data.timerInterval)
  },
  miaoShaBtnClick(){
    if (this.data.timerStampsSeconds==0)
    {
      this.reqJoinSpikeActivity(this.data.id);
    }
    else
    {
      wx.showToast({
        title: '还没到秒杀时间，请耐心等待！',
        icon:"none"
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: this.data.dataObj.name,
      imageUrl: this.data.dataObj.showImages,
      path: "/pages/miaoSha/miaoSha?id=" + this.data.id
    }
  }
})