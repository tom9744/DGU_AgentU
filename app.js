//app.js
App({
  data: {
  },
  tabChange(e) {
      console.log('tab change', e)
  },
  onLaunch: function () {
    // WeChat 유저 정보를 가져오는 API 호출
    wx.login({
      success: res => {
        // TODO: res 객체에 포함된 code를 auth.code2Session() 함수의 매개변수로 사용해
        // 백엔드 서버에서 openID 또는 SessionKey로 변환한다.
        console.log("ws.login(): ", res.code);
      }
    })
    // getSetting : 사용자가 허가한 API에 대한 정보 반환 (ex. scope.userInfo)
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 사용자가 userInfo API 사용을 허가한 경우, 별도 팝업없이 사용자 정보 가져오기.
          wx.getUserInfo({
            success: res => {
              // res 객체를 백엔드로 넘겨, unionID 등을 받아올 수 있다.
              this.globalData.userInfo = res.userInfo

              /* 
                getUserInfo는 비동기 호출이기 때문에, home.js에서 Page.onLoad()가 호출되는
                시점에 콜백 함수가 실행될 수도 있다. 따라서, home.js에서 App.js의 globalData에
                userInfo가 없고 scope.userInfo는 참이라면, userInfoReadyCallback 메소드를
                생성하도록 한다. 즉, getUserInfo의 콜백함수가 실행될 때 userInfoReadyCallback
                메소드가 존재한다면, 콜백 함수가 index.js 로드가 시작된 후 호출된 것이다.
              */ 
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // Cart Storage를 초기화한다.
    wx.setStorage({
      key: "Cart",
      data: []
    })
  },
  // 프로젝트 전역 변수 설정
  globalData: {
    userInfo: null
  }
})