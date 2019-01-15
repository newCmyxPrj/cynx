import req from "/utils/request.js";
import api from "/utils/api.js";
var that;
  //wx1d09378c5ebca84d---old   wxc2503319be876349--new

App({
  onLaunch: function () {
    that = this;
    console.log("app.js onLaunch");
    console.time('test1');
   // if (!this.globalData.isLogin) 
    { 
      // 本次没有登录
    //  this.myWxLogin();
    }
  },
  onShow: function (options) {
    console.log("app.js onShow");
  },

  
  globalData: {
    token:'',
    isLogin: false,
    shareUrl: '',
    sacnCardId: '',
    sacnGroupId: '',
    userInfo: null,
    code:'',
    memberId:'',
    themeColor: '#4e394a',
    ispersonal: true, //个人
    myBusinessCard:'',//名片信息
    merchantId:0,
    memberDefaultCardId:'',//名片id
    memberCompanyId: '',//绑定的公司id
    memberCompanyUserRole: '', //0-普通员工, 1-超级管理员，2-管理员
    storeId:0,
    appId:'wxc2503319be876349'
  }
})