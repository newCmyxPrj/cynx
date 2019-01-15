// pages/daShang/daShang.js
import api from '../../utils/api.js';
import req from '../../utils/request.js';

const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     moneySelectIndex:1,
     dataObj: {},
     employeeInfoId:0,
     amount:2
    //daShangObj:{}
  },

// 打赏（当前只是插入表 无支付）
  reqDaShangAdd(amount, appId,employeeId) 
  {
    var that = this;
    let url = api.urlString.daShangAdd;
    wx.showLoading({
      title: '加载中...'
    });
    let param ={
      "amount": amount,
      "appId":appId,
      "employeeId": employeeId
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqDaShangAdd  sucess res=', res);
      that.wxRequestPay(res.data.timeStamp, res.data.nonceStr, res.data.package, res.data.paySign);
      // wx.showToast({
      //   title: '打赏成功!'
      // })
    });
  },

  //微信支付
  wxRequestPay(timeStamp, nonceStr, prepayId, sign) {
    wx.requestPayment({
      timeStamp: timeStamp,
      nonceStr: nonceStr,
      package: prepayId,
      signType: 'MD5',
      paySign: sign,
      fail: function (res) {
        console.log("xxxxxxxxxxxxxxres:", res);
        wx.showToast({
          title: '支付失败!',
          icon: "none"
        })
      },
      success: function () {
        wx.showToast({
          title: '支付成功!'
        })
        // setTimeout(function () {
        //   wx.navigateTo({
        //     url: '/pages/myOrderList/myOrderList?typeIndex=0', //付款成功，进入全部订单列表
        //   })
        // }, 1200);
      }
    })
  },

  //获取打赏页面信息
  reqQueryRewards() 
  {
    var that = this;
    let url = api.urlString.queryRewards;
    wx.showLoading({
      title: '加载中...'
    });
    let param = {
      "employeeInfoId": this.data.employeeInfoId
    };
    req.reqGet(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqQueryRewards  sucess res=', res);
      that.setData({
        dataObj:res.data
      });
    });
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    this.setData({
      employeeInfoId:options.employeeInfoId
    });
    // wx.getStorage({
    //   key: 'daShangData',
    //   success: function (res) {
    //     that.setData({
    //       dataObj: res.data
    //     });
    //     console.log(".....................dashang data", that.data.dataObj);
    //     that.reqQueryRewards();
    //     wx.removeStorage({
    //       key: 'daShangData',
    //       success: function (res) {
    //         console.log("remove daShangData success");
    //       },
    //     })
    //   },
    // })
    
    this.reqQueryRewards();//获取打赏详细信息
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
  money_item_click(e)
  {
    let index=e.currentTarget.dataset.index;
    this.setData({
      moneySelectIndex:index
    });
    if(index==1)
    {
      this.setData({
        amount:2
      });
    }
    else if(index==2)
    {
      this.setData({
        amount: 5
      });
    }
    else if(index==3)
    {
      this.setData({
        amount: 10
      });
    }
    else if(index==4)
    {
      this.setData({
        amount: 50
      });
    }
    else if(index==5)
    {
      this.setData({
        amount: 100
      });
    }
    else if(index==6)
    {
      this.setData({
        amount: 200
      });
    }

  },
  bindMoneyChange(e) {
    const val = e.detail.value;
    this.setData({
      moneySelectIndex: -1,
      amount:val
    });
    //console.log("xxxxxxxxxxxxxxxxxxxxxbindMoneyChange:",val);
  },
  daShangBtnClick(){
    this.reqDaShangAdd(this.data.amount, app.globalData.appId,this.data.employeeInfoId);
  }
})