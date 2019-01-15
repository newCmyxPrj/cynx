//const base_Url = "http://47.93.205.72:8080"
//const base_Url = "https://api.huikegongxiang.com" //正式服务器
const base_Url = "http://bms.huikegongxiang.com" 
const key = "123456";
// 封装get请求方式
function reqGet (url,param,onSuccess,onfail){
    let appendUrl = base_Url + url;
    console.log('get url=',appendUrl);
    // let md5Str = paramOperation(param);
    var token = '';
    wx.getStorage({
        key: 'token',
        success: function(res) {
            token = res.data;
            req(appendUrl,param,token,"GET",onSuccess,onfail);  
        },fail:function(err){
           // if(url =='/wx/onLogin')
          console.log('request res error=', err);

            {
                req(appendUrl,param,token,"GET",onSuccess,onfail);  
            }
        }
    });
    // param.sign = md5Str;
    console.log(param);

};



function req(url,param,token,method,onSuccess,onfail){
    console.log(' req param:', param);
    let token2=wx.getStorageSync('token');
    // console.log('xxxxxxxxxxxxxxxxtoken2=',token2);
  //let merchantId = wx.getStorageSync('merchantId');
    wx.request({
        url:url,
        header:{
          'Content-Type':"application/json",
          'token': token2,
          'x-merchantId': 1
          //wx.getStorageSync('merchantId')
        },
        data:param,
        method:method,
        success:function(res){
         console.log('********request success',res.data);
          if (res.data.status == 0) {
              onSuccess(res.data);
          } else {
              wx.showToast(
                  {
                      title:res.data.message,
                      icon:'none'
                  })
                  if (onfail) {
                      onfail();
                  }
          }
        },
        fail:function(err){
          console.log('rrrrrrrrequest res error=', err);
            wx.showToast(
                {
                    title:'系统错误',
                    icon:'none'
                }
            )
            wx.hideLoading();
            console.log(err);
        },
    })
}
// 封装Post请求方法


const Post = function (url,param,onSuccess,onfail){
 //   var appendUrl = base_Url + url + '.htm';
    var appendUrl = base_Url + url;
    console.log(appendUrl);
    // var md5Str = paramOperation(param);
    // param.sign = md5Str;
    var token = "";
    //获取登录成功后存储的token
    var that = this;
    wx.getStorage({
        key: 'token',
        success: function(res) {
            token = res.data;
            req(appendUrl,param,token,"POST",onSuccess,onfail);
        },fail:function(err){
           // if(url =='/wx/onLogin')
           wx.hideLoading();
            {
                req(appendUrl,param,'',"POST",onSuccess,onfail);  
            }
        }
    });
    // console.log(token);

};

//md5加密等操作
var paramOperation = function(param){
    let keyArr = Object.keys(param);
    let sortKeys =  key.sort();
    var sortStr = "";
    for (let index = 0; index < sortKeys.length; index++) {
        let keyStr = sortKeys[index];
        let val = param[keyStr];
        sortStr = sortStr + keyStr + "=" +val;
        if(index == sortKeys.length - 1){
            sortStr = sortStr + "key=" + key;
        }    
    }
    if (sortStr == "" || sortStr == undefined || sortStr == null) {
        sortStr = sortStr + "key=" + key;
    }

    let paramDecode = decodeURI(sortStr);
    let md5Str = hex_md5(paramDecode);
    return md5Str;
}

module.exports ={
  reqGet,
  Post,
  base_Url
}