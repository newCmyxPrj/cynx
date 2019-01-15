import req from "../../utils/request.js";
import api from "../../utils/api.js";
//home.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    banner_list: ['/images/home/banner_test_pic.png', '/images/home/banner_test_pic.png', '/images/home/banner_test_pic.png', '/images/home/banner_test_pic.png'],
  //  artists:[1,2,3,4,5,6,7,8,9],
   // shops:["美罗观前店","美罗新区店"],
    shopsSelectPopShowFlag:false,
    currentSelectShopIndex:0,
    currentOkBtnSelectShopIndex:0,
    shopList:[],
    worksList:[],
    currentShopName:'',
    currentShopAddress:'',
    currentShopWorkTime:'',
    storeId:1,
  //  commentArray: [{ value: "高大上", select: true }, { value: "价格实惠", select: false }, { value: "性价比高", select: false }, { value: "技师专业", select: false }, { value: "剪发效果好", select: false }, { value: "剪发效果好", select: false }, { value: "剪发效果好", select: false }, { value: "剪发效果好", select: false }],
    joinVipPopWindowShowFlag:false,
    receiverName:"",
    phoneNum:"",
    timer:60,
    timerId:-1,
    verifyCode:"",
    groupObj:{},
    spikeObj:{},
    bargainObj:{},
    commentObj:{}
    //"group"/*"spike"*//*"bargain"*/
  },


  onLoad: function () {
    var that = this;
    // setTimeout(function () {
    //   that.reqHomeStoreList();
    // }, 1000);
    this.myWxLogin();
    console.log("home onLaunch");
  },
  onShow()
  {
    console.log("home onShow");
  },
  myWxLogin: function () {
    let that=this;
    wx.login({
      success: res => {
        console.log('login success:', res)
        app.globalData.code = res.code;

        // 获取用户信息
        wx.getSetting({
          success: res => {
            console.log(" home.js  getSetting:success");
            if (!res.authSetting['scope.userInfo']) {
              console.log("home.js    authSetting:fail");
              //  that.globalData.isDenyAuthorize = true;  // 未授权
              wx.reLaunch({
                url: '/pages/getPhone/getPhone',
              })
            }
            else {
              console.log("home page  authSetting:success");
              that.getUserBaseData();
            }
          },
          fail() {
            console.log("wx.getSetting失败")
          }
        })
      }
    })
  },

  //已获得授权
  getUserBaseData() {
    let that = this;
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo;
        console.log("..............getUserBaseData", res);
        that.requestLoginByCode(res, that.loginSuccess);
      },
      fail: res => {
        //this.requestLoginByCode();
        console.log('get usrInfo error');
      },
    })
  },

  loginSuccess(res) {
    // console.log('loginSuccess')
    let that=this;
    app.globalData.openId = res.data.openId;
    app.globalData.token = res.data.accessToken == null ? "" : res.data.accessToken;
    app.globalData.memberId = res.data.memberId;
    app.globalData.merchantId = res.data.merchantId;
    console.log("home  login res...", res);
    console.log("home  loginSuccess app.globalData", app.globalData);
    wx.setStorage({
      key: 'merchantId',
      data: res.data.merchantId,
    })
    wx.setStorage({
      key: 'phone',
      data: res.data.memberPhone,
    })

    app.globalData.memberDefaultCardId = res.data.memberDefaultCardId;
    app.globalData.memberCompanyId = res.data.memberCompanyId;  //绑定的公司id
    app.globalData.memberCompanyUserRole = res.data.memberCompanyUserRole;   //0-普通员工, 1-超级管理员，2-管理员

    app.globalData.isLogin = true;

    if (app.globalData.memberCompanyId) {
      app.globalData.ispersonal = false
    } else {
      app.globalData.ispersonal = true
    }
    wx.setStorageSync("merchantId", res.data.merchantId);

    wx.setStorageSync("token", app.globalData.token );
    if (app.globalData.token=="")
    {
      wx.showToast({
        title: 'token is null!!!',
        duration:2000
      })
      wx.reLaunch({
        url: '/pages/login/login',
      })
    }
    else
    {
      that.reqHomeStoreList();
    }
    // console.log('global data:', this.globalData)
    // wx.getStorage({
    //   key: 'token',
    //   success: function (res) {
    //     that.reqHomeStoreList();
    //   },
    //   fail() {
    //     wx.reLaunch({
    //       url: '/pages/login/login',
    //     })
    //   }
    // })
  },

  requestLoginByCode(res, loginSuccess) {
    let url = api.urlString.loginByCode;
    let that = this;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      'code': app.globalData.code,
      'rowData': res.rawData ? res.rawData : "",
      'signature': res.signature ? res.signature : "",
      'encryptedData': res.encryptedData ? res.encryptedData : "",
      'iv': res.iv ? res.iv : "",
      'openId': app.globalData.openId,
      //"isDebug": "false",
    };
    console.log('requestLoginByCode param=', param);

    req.Post(url, param, function success(res) {
      wx.hideLoading();
   //   console.timeEnd('test1');
      loginSuccess(res);
    });
  },
  bindPhone(){
    let that = this;
    let url = api.urlString.bindPhone;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      "appId": app.globalData.appId,
      "openId": app.globalData.openId,
      "phone": this.data.phoneNum,
      "storeId": this.data.storeId,
      "userName": this.data.receiverName,
      "verifyCode": this.data.verifyCode
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxbindPhone  sucess res=', res);
      that.closeJoinVipPopup();
      wx.showToast({
        title: '加入会员成功'
      })
    });
  },

  reqHomeActivityDetail(activityType) {
   //tips: activityType -> spike：秒杀，bargain：砍价，group: 拼团
    let that = this;
    let url = api.urlString.homeActivityDetail;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      "activityType": activityType,
      "currentPage": 1,
      "pageSize": 20,
      "queryId": 0
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      if (activityType =="group")
      {
       // console.log('xxxxxxxxxxxxxreqHomeActivityDetail group  sucess res=', res);
        that.setData({
          groupObj:res.data
        });
      }
      else if (activityType =="spike")
      {
    //    console.log('xxxxxxxxxxxxxreqHomeActivityDetail spike  sucess res=', res);
        that.setData({
          spikeObj:res.data
        });
      }
      else if (activityType =="bargain")
      {
      //  console.log('xxxxxxxxxxxxxreqHomeActivityDetail bargain  sucess res=', res);
        that.setData({
          bargainObj:res.data
        })
      }

      // that.closeJoinVipPopup();
    });
  },
  

  getPhoneYanZhengMa() {
    var that = this;
    let url = api.urlString.sendNewUser;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      "phone": this.data.phoneNum
    };
    if (this.data.phoneNum=="")
    {
      wx.showToast({
        title: '请输入手机号码',
        icon:"none"
      })
      return ;
    }
  
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxgetPhoneYanZhengMa  sucess res=', res);
      that.data.timerId=setInterval(function(){
        if(that.data.timer>0)
        {
          let timer=that.data.timer-1;
          that.setData({
            timer: timer
            });
        }
        else
        {
          clearInterval(that.data.timerId);
          that.data.timerId=-1;
          that.data.timer=60;
        }

      },1000);
    });
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  reqHomeStoreList() {
    var that = this;
    let url = api.urlString.homeStoreList;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
    };
    req.Post(url, param, function success(res) {
      console.log('xxxxxxxxxxxxxxxxxreqHomeStoreList  sucess shopList=', that.data.shopList);
      wx.hideLoading();
      that.setData({
        shopList: res.data
      });
      that.select_shops_ok(); // select default first shop 
    });
  },

  //获取顾客印象
  reqQueryUserEvaluateCount() {
    var that = this;
    let url = api.urlString.queryUserEvaluateCount;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
    };
    req.Post(url, param, function success(res) {
      console.log('xxxxxxxxxxxxxxxxxreqQueryUserEvaluateCount  sucess:', res);
      wx.hideLoading();
      that.setData({
        commentObj: res.data
      });
    });
  },

  

  reqHomeStoreInfo(storeId) {
    let url = api.urlString.homeStorePageInfo + storeId;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      id: storeId
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      // console.log('xxxxxxxxxxxxxxxxxreqreqHomeStoreInfo  sucess res=', res);
    });
  },

  reqQueryProjectByMerchantId() {
    let url = api.urlString.queryProjectByMerchantId;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      "employeeId": 0,
      "storeId": this.data.storeId
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqQueryProjectByMerchantId  sucess res=', res);
    });
  },

  swiper_item_click() {

  },
  jia_mu_biao_click()
  {
    wx.navigateTo({
      url: '/pages/priceTable/priceTable',
    })
  },
  artist_item_click(e)
  {
    console.log('xxxxxxxxxxxe',e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/personalHome/personalHome?employeeId=' + e.currentTarget.dataset.id,
    })
  },
  switchShopsClick()
  {
    this.setData(
      {
        shopsSelectPopShowFlag:true
      }
    );
  },
  bindShopsSelectChange(e) {
    const val = e.detail.value;
    console.log('xxxxxxxxbindShopsSelectChange', val[0]);
 //   this.data.dataObj.sex = this.data.sexs[val[0]];
    this.data.currentSelectShopIndex = val[0];

  },
  select_shops_cancel() {
    this.setData({
      shopsSelectPopShowFlag: false
    });
  },
  select_shops_ok() {
    this.data.currentOkBtnSelectShopIndex = this.data.currentSelectShopIndex;
    let index = this.data.currentOkBtnSelectShopIndex;
    this.setData({
      shopsSelectPopShowFlag: false,
      currentShopName: this.data.shopList[index].fullName,
      currentShopAddress:this.data.shopList[index].detailedAddress,
      currentShopWorkTime: this.data.shopList[index].businessStartTime + '-' + this.data.shopList[index].businessEndTime,
      storeId:this.data.shopList[index].id
   //  dataObj: this.data.dataObj,
    });
    app.globalData.storeId = this.data.storeId;
    //console.log("xxxxxxxxxxxxxxstoreId",this.data.storeId);
    this.reqHomeStoreInfo(this.data.storeId);
    this.reqHomeActivityDetail("group"/*"spike"*//*"bargain"*/);
    this.reqHomeActivityDetail("spike"/*"bargain"*/);
    this.reqHomeActivityDetail("bargain"/*"bargain"*/);
    this.reqQueryUserEvaluateCount();

    //spike：秒杀，bargain：砍价，group: 拼团
    //this.reqEmployeeByStoreId(this.data.storeId);
  },
  qu_pin_tuan_btn_click(e)
  {
    let index=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/pinTuan/pinTuan?id=' + this.data.groupObj.list[index].id,
    })
  },
  miao_sha_btn_click(e)
  {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/miaoSha/miaoSha?id=' + this.data.spikeObj.list[index].id,
    })
  },
  kan_jia_btn_click(e)
  {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/kanJia/kanJia?id=' + this.data.bargainObj.list[index].id,
    })
  },
  maiDanClick()
  {
    wx.navigateTo({
      url: '/pages/cutterSelect/cutterSelect?storeId='+this.data.storeId,
    })
 
  },
  joinVipBtnClick(){
      this.setData({
        joinVipPopWindowShowFlag:true
      })
  },
  closeJoinVipPopup()
  {
    this.setData({
      joinVipPopWindowShowFlag:false
    });
    if (this.data.timerId!=-1)
    {
      clearInterval(this.data.timerId);
      this.data.timerId = -1;
      this.setData({
        timer:60
      });
    }
  },
  bindReceiveName(e) {
    this.data.receiverName = e.detail.value;
    this.setData({
      receiverName: this.data.receiverName
    });
  },
  bindPhoneNum(e)
  {
    this.data.phoneNum = e.detail.value;
    this.setData({
      phoneNum: this.data.phoneNum
    });
  },
  bindVerifyCode(e){
    this.setData({
      verifyCode: e.detail.value
    });
  },
  getPhoneCode() //获取手机验证码
  {
    this.getPhoneYanZhengMa();
  },
  joinBtn(){
    this.bindPhone();
  },

  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
