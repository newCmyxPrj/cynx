const urlString = {
  loginByCode: '/app/user/loginByCode', //登录
  bindPhone: "/app/user/bindPhone", //加入会员 新的接口
  parseAndBindPhone: '/app/user/parseAndBindPhone',
  queryUserAddress: '/app/user/queryUserAddress/',
  deleteAddress: '/app/user/deleteAddress',
  saveAddress: '/app/user/saveAddress',
  updateAddressInfo: '/app/user/updateAddressInfo',
  homeStoreList: '/app/store/list',
  homeStorePageInfo: '/app/store/',

  cateGory: "/app/project/queryCategory",
  cateGoryProject: "/app/project/queryByProjectCategoryId",
  artWorks: "/app/worksInfo/queryWorksByStoreId",
  queryProjectByMerchantId: "/app/project/queryProjectByMerchantId", // 根据员工获取项目  
  queryEmployeeByStoreId: "/app/employInfo/queryEmployeeByStoreId", //获取门店下手艺人列表
  queryEmployeeById: "/app/employInfo/queryEmployeeById", //获取手艺人详情
  queryProjectByMerchantId: "/app/project/queryProjectByMerchantId", //根据员工获取项目 j价目表
  queryMyOrder: "/app/order/queryMyOrder", //我的订单列表
  queryOrderSummery: "/app/order/queryOrderSummery", // 用户消费记录
  userEvaluate: "/app/order/userEvaluate", // 用户评价
  queryMinAppUser: "/app/user/queryMinAppUser/", //个人中心获取用户信息
  queryCommodityList: "/app/user/queryCommodityList", //获取商品列表
  queryExchangeRecordList: "/app/user/queryExchangeRecordList", //获取兑换记录  
  queryAllCategoryWithProject: "/app/bill/queryAllCategoryWithProject", //预约模块获取所有分类和项目
  addIntoShopCart: "/app/bill/addIntoShopCart", //添加或更新项目到购物车
  previewOrder: "/app/bill/previewOrder", //购物车结算后 跳转订单页面
  daShangAdd: "/app/reward/add", //打赏(当前只是插入表，无支付)
  queryRewards: "/app/reward/queryRewards", //get方法  获取打赏页面信息
  sendNewUser: "/common/sendNewUser", //发送新用户手机验证码
  homeActivityDetail: "/app/activity/queryValidActivityByMerchantId", //获取商户活动列表

  //预约模块
  findDateList: "/app/appointment/findDateList", //已预约时间列表
  findMyAppointment: "/app/appointment/findMyAppointment", //我的预约
  findProjectCategoryList: "/app/appointment/findProjectCategoryList", //服务列表
  appointmentSave: "/app/appointment/save", //提交预约
  prepareOrderPay: "/app/trade/prepareOrderPay", //创建订单支付流水
  orderJieSuan: "/app/bill/addIntoOrder", //订单结算
  queryUserEvaluateCount: "/app/user/queryUserEvaluateCount", //首页页面 获取客户印象

  getActivityById: "/app/activity/getActivityById", //获取活动页面详情
  joinSpikeActivity: "/app/activity/joinSpikeActivity", //参与秒杀活动
  spikeJoinRecordByUserAndMerchantId: "/app/activity/spikeJoinRecordByUserAndMerchantId", //参与秒杀记录   

  joinGroup: "/app/activity/joinGroup", //参与拼团
  groupJoinRecordByUserAndMerchantId: "/app/activity/groupJoinRecordByUserAndMerchantId", //参与拼团记录 
  startGroup: "/app/activity/startGroup", //发起拼团

  helpBargainActivity: "/app/activity/helpBargainActivity", //帮助砍价
  joinBargainActivity: "/app/activity/joinBargainActivity", //参与砍价活动
  bargainJoinRecordByUserAndMerchantId: "/app/activity/bargainJoinRecordByUserAndMerchantId", //参与砍价记录

  queryUserCard: "/app/user/queryUserCard", //获取会员的会员卡列表 
  cardRecharge: "/app/user/cardRecharge", //会员卡充值(管理端)
  updateAppointmentStatus: "/app/appointment/updateAppointmentStatus", //取消预约
  exchangeGoods: "/app/user/exchange", //兑换商品
  queryUserCoupon:"/app/order/queryUserCoupon",//获取用户优惠券
}


module.exports = {
  urlString
}