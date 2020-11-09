// pages/Shoppingcart/Shoppingcart.js
Page({

  /**
   * Page initial data
   */
  data: {
    totalPrice: 0,
    items: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'Cart',
      success: ({ data }) => {
        let currentCart = data; // 현재 카트 상태를 저장한다.

        let totalPrice = 0; 
        // 카트에 담긴 항목들의 금액 합을 구한다.
        for(let item of currentCart) {
          totalPrice += parseInt(item.price);
        }

        this.setData({
          items: currentCart,
          totalPrice: totalPrice
        });

        console.log(currentCart);
      }
    });
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

})