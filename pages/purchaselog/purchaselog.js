// pages/userProfile/userProfile.js
Page({

  /**
   * Page initial data
   */
  data: {
    calendarUrl: "https://www.flaticon.com/svg/static/icons/svg/2370/2370264.svg",
    listUrl : "https://www.flaticon.com/svg/static/icons/svg/2645/2645879.svg",
    moneyUrl: "https://www.flaticon.com/svg/static/icons/svg/678/678931.svg",

    purchaseHistory: [
      {
        purchaseDate: "2020-11-11 13:22",
        purchaseItems: [
          {
            name: "짬뽕",
            isUsedTicket: false,
          }, 
          {
            name: "탕수육",
            isUsedTicket: false,
          }],
        purchasePrice: "Y250"
      },
      {
        purchaseDate: "2020-11-10 11:22",
        purchaseItems: [
          {
            name: "짜장면",
            isUsedTicket: false,
          }],
        purchasePrice: "Y50"
      }
    ],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // API 콜
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

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  useTicket(event) {
    const hid = event.target.dataset.hid;
    const iid = event.target.dataset.iid;
    if (this.data.purchaseHistory[hid].purchaseItems[iid].isUsedTicket == false) {
      wx.showModal({
        title: '식당 아주머니께 보여드리세요!',
        content: '식당 아주머니만 확인 버튼을 눌러주세요!',
        cancelText: '취소',
        confirmText: '확인',
        success: (res) => {
          if (res.confirm) {
            const temp = this.data.purchaseHistory;
            temp[hid].purchaseItems[iid].isUsedTicket = true;
            this.setData({ purchaseHistory: temp});
          } else if (res.cancel) {
            const temp = this.data.purchaseHistory;
            temp[hid].purchaseItems[iid].isUsedTicket = false;
            this.setData({ purchaseHistory: temp});
          }
        }
      });
    }
  }
})