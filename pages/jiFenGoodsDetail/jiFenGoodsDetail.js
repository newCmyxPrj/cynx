// pages/jiFenGoodsDetail/jiFenGoodsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner_list: ['/images/goodsDetail/banner_test.png', '/images/goodsDetail/banner_test.png', '/images/goodsDetail/banner_test.png', '/images/goodsDetail/banner_test.png'],
    banner_index:1,
    banner_total:0,
    dataObj:{},
    goodsNum:1
  },
  bindSwiperChange(e)
  {
    this.setData({
      banner_index:e.detail.current+1
    });
  },
  lijiduihuanClick()
  {
    let obj = this.data.dataObj;
    obj.goodsNum=this.data.goodsNum;
    wx.setStorage({
      key: 'orderConfirmData',
      data: obj,
      success(){
        wx.navigateTo({
          url: '/pages/orderConfirm/orderConfirm',
        })
      }
    })

      // wx.showToast({
      //   title: '暂时不支持',
      //   icon:'none'
      // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData(
        {
          banner_total: this.data.banner_list.length
        }
      )
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
    let that=this;
    wx.getStorage({
      key: 'jiFenGoodsDetailData',
      success: function(res) {
        that.setData(
          {
            dataObj:res.data
          }
        );
        console.log("xxxxxxxxxxxxxdata=",that.data.dataObj);
        wx.removeStorage({
          key: 'jiFenGoodsDetailData',
          success: function(res) {},
        })
      },
    })
  },
  jianBtnTap() {
    if (this.data.goodsNum > 1) {
      this.setData({
        goodsNum: this.data.goodsNum - 1
      });
    }
  },
  jiaBtnTap() {
    this.setData({
      goodsNum: this.data.goodsNum + 1
    });
  },

})