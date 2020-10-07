// index.js
// 프로젝트의 메인 App.js를 가져온다.
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      /* 
        app.js의 globalData가 비어있고 getUserInfo 권한은 주어진 경우, callback 함수보다 
        home.js가 먼저 로드된 것이다. app.js의 App 객체에 userInfoReadyCallback 메소드를 새롭게 정의하고 home.js의 Page 객체로 데이터를 불러오도록 한다.
      */
      app.userInfoReadyCallback = res => {
        // app.js의 getUserInfo 콜백 함수로부터 유저 데이터를 받아온다.
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // open-type=getUserInfo 버전이 없는 호환 처리...(?)
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
