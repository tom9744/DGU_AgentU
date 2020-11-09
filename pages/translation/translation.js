// pages/translation/translation.js
Page({

  /**
   * Page initial data
   */
  data: {
    chinaUrl: 'https://www.flaticon.com/svg/static/icons/svg/197/197375.svg',
    koreaUrl: 'https://www.flaticon.com/svg/static/icons/svg/197/197582.svg',
    arrowDownUrl: 'https://www.flaticon.com/svg/static/icons/svg/248/248537.svg',

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
  }
})