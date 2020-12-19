// pages/purchasecomplete/purchasecomplete.js
Page({
  data: {
    isSuccessful: false
  },

  onLoad(options) {
    // Save some data which has been passed down from a previous page.
    this.setData({
      // isSuccessful: options.isSuccessful === "true" ? true : false
      isSuccessful: true  // Set this value 'true' since the payment isn't really working.
    })
  },

  onClick() {

    console.log(this.data.isSuccessful);
    
    if(this.data.isSuccessful === true) {
      wx.switchTab({
        url: '/pages/purchaselog/purchaselog',
      })
    } else {
      wx.navigateBack({
        delta: '1',
      })
    }
  }
})