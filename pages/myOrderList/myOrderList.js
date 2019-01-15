// pages/myOrderList/myOrderList.js
import api from '../../utils/api.js';
import req from '../../utils/request.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

    //订单状态筛选 ""-全部 "20"-待付款 "10"-待评论 "80"-已完成 "01"-已取消
    statusType: ["全部", "待付款", "待评论", "已完成", "已取消"],
    currentType: 0,
    tabClass: ["", "", "", "", ""],
    orderList: null,
    daiFuKuanType:"20",
    daiPingLunType:"10",
    yiWanChengType:"80",
    yiQuXiaoType:"01",

    //test : 0 待付款  1 带评论   2 已完成   3 已取消   
    allDataList: [{
      type: 0
    }, {
      type: 1
    }, {
      type: 2
    }, {
      type: 3
    }],
    daiFuKuanDataList: [{
      type: 0
    }, {
      type: 0
    }, {
      type: 0
    }, {
      type: 0
    }],
    pingLunDataList: [{
      type: 1
    }, {
      type: 1
    }, {
      type: 1
    }, {
      type: 1
    }],
    yiWanChengDataList: [{
      type: 2
    }, {
      type: 2
    }, {
      type: 2
    }, {
      type: 2
    }],
    yiQuXiaoDataList: [{
      type: 3
    }, {
      type: 3
    }, {
      type: 3
    }, {
      type: 3
    }],

    dataObj:{}
  },

  statusTap: function(e) {

    
    var curType = e.currentTarget.dataset.index;
    this.setData({
      currentType: curType
    });
    let status="";
    if (curType == 0) {
      status = "";
    }
    else if (curType == 1) {
      status = this.data.daiFuKuanType;
    }
    else if (curType == 2) {
      status = this.data.daiPingLunType;
    }
    else if (curType == 3) {
      status = this.data.yiWanChengType;
    }
    else if (curType == 4) {
      status = this.data.yiQuXiaoType;
    }
    this.reqQueryOrder(status)
 },

  reqQueryOrder(status) {
    var that = this;
    let url = api.urlString.queryMyOrder;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      "currentPage": 1,
      "pageSize": 10,
      "queryId": 0,
      "status": status
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxqueryMyOrder  sucess res=', res); 
      that.setData({
        dataObj:res.data
      });
    });
  },

  
  deleteOrder()
  {
    wx.showToast({
      title: '该功能还没实现',
      icon:"none"
    })
  },
  quPingLunClick(){
    wx.navigateTo({
      url: '../../pages/comment/comment',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // typeIndex: 0-全部订单   1-待付款 2-待评价  3-已完成
    let status="";
    this.setData({
      currentType: options.typeIndex
    })
    if (options.typeIndex==0)
    {
      status="";
    }
    else if (options.typeIndex==1)
    {
      status = this.data.daiFuKuanType;
    }
    else if (options.typeIndex==2)
    {
      status = this.data.daiPingLunType;
    }
    else if (options.typeIndex==3)
    {
      status = this.data.yiWanChengType;
    }
    this.reqQueryOrder(status)
  },
  orderDetailItemClick(e)
  {
    let index=e.currentTarget.dataset.index;
    console.log("orderDetailItemClick",index);
    let orderDetailData=this.data.dataObj.list[index];
    wx.setStorage({
      key: 'orderDetailData',
      data: orderDetailData,
      success:function(){
        wx.navigateTo({
          url: '/pages/orderDetail/orderDetail',
        })
      }
    })

  }
})