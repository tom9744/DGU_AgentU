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
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  delFromCart ({target}) {
    let delItem;
    for (let index of this.data.items) { // 삭제할 항목을 탐색
      if (index.menuId == target.id) {
        delItem = index;
      }
    }
    console.log(delItem);

    wx.getStorage({
      key: 'Cart',
      success: ({ data }) => {
        let currentCart = data;       // 현재 카트 상태를 저장한다.
        for (let index = 0; index < currentCart.length; index++) { // 해당 항목을 찾아 삭제
          if (currentCart[index].menuId == delItem.menuId) {
            currentCart.splice(index, 1);
            break;
          }
        }

        let totalPrice = 0; 
        // 카트에 담긴 항목들의 금액 합을 구한다.
        for(let item of currentCart) {
          totalPrice += parseInt(item.price);
        }

        wx.setStorage({ // 다시 저장
          data: currentCart,
          key: 'Cart',
        });

        this.setData({
          items: currentCart,
          totalPrice: totalPrice
        });

        console.log(currentCart);
      }
    });
  },
  goToPurchase() {
    wx.navigateTo({
      url: '/pages/purchasecomplete/purchasecomplete',
    })
  }
})