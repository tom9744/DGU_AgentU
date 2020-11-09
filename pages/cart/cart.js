// pages/Shoppingcart/Shoppingcart.js
Page({

  /**
   * Page initial data
   */
  data: {
    totalPrice: 0,

    cartList: [
      {
        itemName: "짬뽕",
        itemNum: 2,
        itemPrice: 5000
      },
      {
        itemName: "짜장면",
        itemNum: 1,
        itemPrice: 4000
      },
      {
        itemName: "탕수육",
        itemNum: 1,
        itemPrice: 15000
      },
      {
        itemName: "간짜장",
        itemNum: 2,
        itemPrice: 7000
      },
      {
        itemName: "양장피",
        itemNum: 1,
        itemPrice: 25000
      },
      {
        itemName: "소주",
        itemNum: 1,
        itemPrice: 4000
      }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
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
    let total = 0;

    // 장바구니 총액 계산
    for (let i = 0; i < this.data.cartList.length; i++) 
    { 
      total += this.data.cartList[i].itemPrice * this.data.cartList[i].itemNum;
    }

    // totalPrice 데이터 변경
    this.setData(
      { 
        totalPrice: total 
      }
    );
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