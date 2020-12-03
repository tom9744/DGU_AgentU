// pages/purchasecomplete/purchasecomplete.js
Page({

  /**
   * Page initial data
   */
  data: {
    isSuccessful: true
  },

  onLoad (options) {
    // Save some data which has been passed down from a previous page.
    this.setData({
      isSuccessful: options.isSuccessful
    })
  },

  onClick() {
    if(this.data.isSuccess)
    {

    }
  },

  goToPurchaselog() {
    wx.switchTab({
      url: '/pages/purchaselog/purchaselog',
    })
  },

  goToBack() {
    wx.navigateBack({
      delta: '1',
    })
  }
})