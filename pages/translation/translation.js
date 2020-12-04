// pages/translation/translation.js
var voiceData;
var recorderManager = wx.getRecorderManager();

Page({
  /** 
   * Page initial data
   */
  data: {
    chinaUrl: 'https://www.flaticon.com/svg/static/icons/svg/197/197375.svg',
    koreaUrl: 'https://www.flaticon.com/svg/static/icons/svg/197/197582.svg',
    arrowDownUrl: 'https://www.flaticon.com/svg/static/icons/svg/248/248537.svg',
    megaPhoneUrl: '../../resources/images/megaphone.png',
    microPhoneUrl: '../../resources/images/microphone.png',

    sendText: "",
    resultText: 'Click the arrow above to see the result!' // 번역 결과가 이쪽으로 와야함
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // document.getElementById("transButton").onclick = putText;
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  putText: function(event) {
    this.setData({
      sendText: event.detail.value
    })
  },

  translateText: function(event) {
    const inputText = this.data.sendText;

    if(inputText === "") {
      this.setData({
        resultText: `입력된 내용이 없습니다.`
      })
    }
    else {
      this.setData({
        resultText: `입력된 내용: ${inputText}`
      })
    }
  },

  voiceStart : function(event){  

    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50
    }
    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onStop(() =>{
      console.log('recorder stop')
    })
    console.log('녹화시작')
    voiceData = recorderManager.start(options)
  },

  voiceEnd : function(event){

    console.log('녹화끝')
    recorderManager.stop()
    /*
    wx.request({
      method: 'POST',
      url : 'https://team1.miniform.kr:3020/voice',
      data:{
        voice : voiceData
      },
      success: (response) =>{
        this.setData({
          resultText : Response.text
        })
      }
     
    })
     */
  }
})