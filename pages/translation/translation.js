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
      format: 'mp3',
    }

    recorderManager.onStart(() => {
      console.log('recorder start')
    })

    console.log('녹화시작')
    voiceData = recorderManager.start(options)

  },

  voiceEnd : function(event){
    console.log('녹화끝')

    recorderManager.stop()

    recorderManager.onStop((res)=>{ 
      console.log(res.tempFilePath);

      innerAudioContext.src = res.tempFilePath
      innerAudioContext.obeyMuteSwitch = false
      
      wx.uploadFile({
        filePath: res.tempFilePath,
        name: 'image',
        url: 'https://team1.miniform.kr:3020/voice',
        formData: {
          'lang': 'Kor'
        },
        success: (res) => {
          console.log(res);
        },
        fail: (err) => {
          console.log(err);
        }
      })

      // fileManager.readFile({
      //   filePath: res.tempFilePath,
      //   encoding: 'binary',
      //   success: (({data})=>{
          // console.log(data);
          // console.log(typeof data);
          // wx.request({
          //   method: 'POST',
          //   url : 'https://team1.miniform.kr:3020/voice',
          //   header: {
          //     'content-type': 'application/octet-stream' // Default value
          //   },
          //   data:{
          //     voice : data,
          //     lang: "Kor"
          //   },
          //   success: (response) =>{
          //     console.log(response);
          //     // this.setData({
          //     //   resultText : Response.text
          //     // })
          //   },
          //   fail: (error) => {
          //     console.log(error);
          //   }
          // })
        // })
      // })
    })
  },

  onPlay() {
    innerAudioContext.play()

    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

    setTimeout(()=>{
      innerAudioContext.stop()
    },5000)
  }
})