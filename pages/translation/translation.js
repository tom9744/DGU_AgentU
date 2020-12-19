// pages/translation/translation.js
var voiceData = null;
const innerAudioContext = wx.createInnerAudioContext()
var recorderManager = wx.getRecorderManager();
const fileManager = wx.getFileSystemManager();

Page({
  /** 
   * Page initial data
   */
  data: {
    cnToKo : true,

    chinaUrl: 'https://www.flaticon.com/svg/static/icons/svg/197/197375.svg',
    koreaUrl: 'https://www.flaticon.com/svg/static/icons/svg/197/197582.svg',
    arrowDownUrl: 'https://www.flaticon.com/svg/static/icons/svg/248/248537.svg',
    megaPhoneUrl: '../../resources/images/megaphone.png',
    microPhoneUrl: '../../resources/images/microphone.png',

    sendText: "",
    resultText: '单击上方的箭头查看结果!' // 번역 결과가 이쪽으로 와야함
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
    console.log('inputtext : ' + inputText);
    
    let translatedText;
    if(inputText === "") {
      this.setData({
        resultText: `입력된 내용이 없습니다.`
      });
    }
    else {
      wx.request({
        url: 'https://team1.miniform.kr:3020/text',
        data: {
          's' : 'ko',
          't' : 'zh-CN',
          'q' : inputText
        },
        success: (res) => {
          translatedText = res.data;
          console.log(translatedText);
          this.setData({
            resultText : translatedText
          });
        },
      });
    }
  },

  translateTexttwo: function(event) {
    const inputText = this.data.sendText;
    console.log('inputtext : ' + inputText);
    
    let translatedText;
    if(inputText === "") {
      this.setData({
        resultText: `입력된 내용이 없습니다.`
      });
    }
    else {
      wx.request({
        url: 'https://team1.miniform.kr:3020/text',
        data: {
          's' : 'zh-CN',
          't' : 'ko',
          'q' : inputText
        },
        success: (res) => {
          translatedText = res.data;
          console.log(translatedText);
          this.setData({
            resultText : translatedText
          });
        },
      });
    }
  },

  changeTranslate : function(event) {
    this.setData({cnToKo : !this.data.cnToKo})
  }
})