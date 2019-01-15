// pages/yuYueInfo/yuYueInfo.js
import req from "../../utils/request.js";
import api from "../../utils/api.js";

var myDate = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personNum: 1,
    popWindowShowFlag: false,
    yuYuePopWindwFlag: false,
    dataObj: {},
    currentDay: 0,
    dayArray: [],
    hourArray: ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
    selectedIndex: 0,
    myProjectList: [],
    beiZhuInfo: "",
    commitDayDetail: "",
    selectedDayInfo: "",
    projectName:"",
    employeeInfoId:0
  },

  getCurrentTime() {
    var weekday = new Array(7)
    weekday[0] = "星期日"
    weekday[1] = "星期一"
    weekday[2] = "星期二"
    weekday[3] = "星期三"
    weekday[4] = "星期四"
    weekday[5] = "星期五"
    weekday[6] = "星期六"
    let tmpArray = [];

    for (let i = 0; i < 30; i++) {
      var myDate1 = new Date()
      myDate1.setDate(myDate1.getDate() + i)

      let month = myDate1.getMonth() + 1;
      let tmpMonth = "";
      let day = myDate1.getDate();
      let tmpDay = "";
      if (month < 10)
        tmpMonth = "0" + month;
      else
        tmpMonth = "" + month;
      if (day < 10)
        tmpDay = "0" + day;
      else
        tmpDay = "" + day;
      tmpArray.push({
        weekDay: weekday[myDate1.getDay()],
        day: /*tmpMonth + "-" +*/ tmpDay,
        dayDetail: tmpMonth + "月" + tmpDay + "号",
        commitDetail: myDate1.getFullYear() + "-" + tmpMonth + "-" + tmpDay
      });
    }
    this.setData({
      dayArray: tmpArray
    });
    // console.log("getcurrent time3", myDate1.getDate(),myDate1.getMonth());
    // console.log("getcurrent time3", weekday[myDate1.getDay()]);
  },

  reqFindProjectCategoryList() {
    var that = this;
    let url = api.urlString.findProjectCategoryList;
    wx.showLoading({
      title: '加载中...'
    });
    let param = {
      "employeeId": this.data.employeeInfoId,
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqFindProjectCategoryList  sucess res=', res);
      if (res.data.length > 0) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].selected == false;
        }
      }
      that.setData({
        myProjectList: res.data
      });
    });
  },

  reqFindDateList() {
    var that = this;
    let url = api.urlString.findDateList;
    wx.showLoading({
      title: '加载中'
    });
    let param = {
      "employeeId": this.data.employeeInfoId,
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
      console.log('xxxxxxxxxxxxxxxxxreqFindDateList  sucess res=', res);
    });
  },


  reqMianFeiYuYue() {
    var that = this;
    let url = api.urlString.appointmentSave;
    wx.showLoading({
      title: '加载中'
    });
    let projectName = "";
    for (let i = 0; i < this.data.myProjectList.length; i++) {

      if (this.data.myProjectList[i].selected == true) {
        projectName = this.data.myProjectList[i].name;
        break;
      }
    }
   
    let param = {
      "createdBy": "crg",
      "employeeId": this.data.employeeInfoId,
      "num": this.data.personNum,
      "remark": this.data.beiZhuInfo,
      "serverType": projectName,
      "startTime": this.data.commitDayDetail //"2018-12-30 00:00:00"
    };
    req.Post(url, param, function success(res) {
      wx.hideLoading();
    //  console.log('xxxxxxxxxxxxxxxxxreqreqMianFeiYuYue  sucess res=', res);
    wx.navigateTo({
      url: '/pages/yuYueRecord/yuYueRecord',
    })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    if (options.employeeInfoId!=undefined)
    {
      this.setData({
        employeeInfoId: options.employeeInfoId
      });
    }
    wx.getStorage({
      key: 'yuYueInfoData',
      success: function(res) {
        that.setData({
          dataObj: res.data
        });
        that.setData({
          employeeInfoId: that.data.dataObj.employeeInfoId
        });
        console.log("xxxxxxxxxxxxxxxxxxxxyuYueInfoData:",that.data.dataObj);
        that.reqFindProjectCategoryList();
        wx.removeStorage({
          key: 'yuYueInfoData',
          success: function(res) {
            console.log("remove yuYueInfoData success");
          },
        })
      },
    })
    wx.getStorage({
      key: 'yuYueInfoDataFromArtDetails',
      success: function (res) {
        that.setData({
          dataObj: res.data
        });
        that.setData({
          employeeInfoId: that.data.dataObj.id
        });
        console.log("xxxxxxxxxxxxxxxxxxxxyuYueInfoDataFromArtDetails:", that.data.dataObj);
        that.reqFindProjectCategoryList();
        wx.removeStorage({
          key: 'yuYueInfoDataFromArtDetails',
          success: function (res) {
            console.log("remove yuYueInfoData success");
          },
        })
      },
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getCurrentTime();
  },
  jianBtnTap() {
    if (this.data.personNum > 0) {
      this.setData({
        personNum: this.data.personNum - 1
      });
    }
  },
  jiaBtnTap() {
    this.setData({
      personNum: this.data.personNum + 1
    });
  },
  timerItemSelect() {
    this.setData({
      popWindowShowFlag: true
    });
  },
  popwindow_dimiss() {
    this.setData({
      popWindowShowFlag: false
    });
  },
  ok_btn_click() {
    this.setData({
      yuYuePopWindwFlag: false
    });
    this.reqMianFeiYuYue();
  },
  cancel_btn_click() {
    this.setData({
      yuYuePopWindwFlag: false
    });
  },
  project_select_click(e) {
    let index = e.currentTarget.dataset.index;
    for (let i = 0; i < this.data.myProjectList.length; i++) {
      if (i == index) {
        this.data.myProjectList[i].selected = true;
      } else {
        this.data.myProjectList[i].selected = false;
      }
    }
    this.setData({
      myProjectList: this.data.myProjectList
    });
    if (this.data.selectedDayInfo=="")
    {
      this.timerItemSelect();
    }
  },
  resetSelectClick() {
    wx.switchTab({
      url: '/pages/yuYue/yuYue',
    })
  },
  closePopupTap() {
    this.setData({
      popWindowShowFlag: false
    });
  },

  closeDatePopWindow() {
    this.setData({
      popWindowShowFlag: false
    });
  },
  dateItemClick(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentDay: index
    });
  },
  hourItemClick(e) {
    let index = e.currentTarget.dataset.hourindex;
    this.setData({
      selectedIndex: index
    });
  },
  dateBtnConfirmClick(e) {
    this.data.selectedDayInfo = this.data.dayArray[this.data.currentDay].weekDay + " " + this.data.dayArray[this.data.currentDay].dayDetail + " " + this.data.hourArray[this.data.selectedIndex];

    this.setData({
      popWindowShowFlag: false,
      selectedDayInfo: this.data.selectedDayInfo,
      commitDayDetail: this.data.dayArray[this.data.currentDay].commitDetail + " " + this.data.hourArray[this.data.selectedIndex] + ":00"
    });

  },
  bindBeiZhuInfo(e) {
    this.data.beiZhuInfo = e.detail.value;
  },
  yuYueBtnClick() 
  {
    let projectName = "";
    for (let i = 0; i < this.data.myProjectList.length; i++) {

      if (this.data.myProjectList[i].selected == true) {
        projectName = this.data.myProjectList[i].name;
        break;
      }
    }
    if (this.data.selectedDayInfo == "") {
      wx.showToast({
        title: "请选择时间",
        icon: "none"
      });
      return;
    }
    if (projectName == "") {
      wx.showToast({
        title: "请选择服务项目",
        icon: "none"
      });
      return;
    }
    if (this.data.personNum == 0) {
      wx.showToast({
        title: "请选择人数",
        icon: "none"
      });
      return;
    }
    this.setData({
      projectName: projectName
    });
    this.setData({
      yuYuePopWindwFlag: true
    });
  }
})