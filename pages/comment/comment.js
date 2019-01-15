// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starsNum:3,
    isCalful:"",
    commentStr:"",
    selectedIndex:0,
    commentArray5: [{ value: "高大上", select: true }, { value: "价格实惠", select: false }, { value: "性价比高", select: false }, { value: "技师专业", select: false }, { value: "剪发效果好", select: false }, { value: "剪发效果好", select: false }, { value: "剪发效果好", select: false }, { value: "剪发效果好", select: false}],
    commentArray4: [{ value: "还不错", select: true }, { value: "价格实惠", select: false }],
    commentArray3: [{ value: "一般", select: true }, { value: "价格贵", select: false }],
    commentArray2: [{ value: "服务态度差", select: true }, { value: "价格有点贵", select: false }],
    commentArray1: [{ value: "服务态度很差", select: true }, { value: "价格有点贵", select: false }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  touchStar(e)
  {
    let index=e.currentTarget.dataset.index;
    this.setData(
      {
        starsNum:index
      }
    )
  },

  bindInputCommentStr(e) {
    this.data.commentStr = e.detail.value;
    this.setData({
      commentStr: this.data.commentStr
    })
  },
  comment5_item_click(e)
  {
   let index=e.currentTarget.dataset.index;
   for(let i=0;i<this.data.commentArray5.length;i++)
    if (i==index)
    {
      this.data.commentArray5[index].select=true;
    }
    else
      this.data.commentArray5[i].select=false;
    this.setData({
      commentArray5:this.data.commentArray5
    })
  },
  comment4_item_click(e) {
    let index = e.currentTarget.dataset.index;
    for (let i = 0; i < this.data.commentArray4.length; i++)
      if (i == index) {
        this.data.commentArray4[index].select = true;
      }
      else
        this.data.commentArray4[i].select = false;
    this.setData({
      commentArray4: this.data.commentArray4
    })
  },
  comment3_item_click(e) {
    let index = e.currentTarget.dataset.index;
    for (let i = 0; i < this.data.commentArray3.length; i++)
      if (i == index) {
        this.data.commentArray3[index].select = true;
      }
      else
        this.data.commentArray3[i].select = false;
    this.setData({
      commentArray3: this.data.commentArray3
    })
  },
  comment2_item_click(e) {
    let index = e.currentTarget.dataset.index;
    for (let i = 0; i < this.data.commentArray2.length; i++)
      if (i == index) {
        this.data.commentArray2[index].select = true;
      }
      else
        this.data.commentArray2[i].select = false;
    this.setData({
      commentArray2: this.data.commentArray2
    })
  },
  comment1_item_click(e) {
    let index = e.currentTarget.dataset.index;
    for (let i = 0; i < this.data.commentArray1.length; i++)
      if (i == index) {
        this.data.commentArray1[index].select = true;
      }
      else
        this.data.commentArray1[i].select = false;
    this.setData({
      commentArray1: this.data.commentArray1
    })
  },
  commit_btn_click()
  {
    console.log("commit_btn_click");
    wx.showToast({
      title: '暂无此功能',
      icon:"none"
    })
  },
  cameraBtnClick()
  {
    this.myChooseImage();
  },
  myChooseImage()
  {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log('xxxxxxxxxxxxxxxxx choose photo success tempFilePaths',tempFilePaths);
        // let token = wx.getStorageSync('token');
        // console.log('test token=', token);
        // wx.uploadFile({
        //   url: url,
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   header: {
        //     'Content-Type': "application/x-www-form-urlencoded",
        //     'token': token
        //   },
        //   success: function (res) {
        //     let data = res.data
        //     //do something
        //     let obj = JSON.parse(res.data);
        //     let tmp = that.data.dataObj;
        //     that.setData({
        //       dataObj: tmp
        //     })
        //   }
        // })
      }
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})