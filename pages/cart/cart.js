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
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    wx.getStorage({
      key: 'Cart',
      success: ({ data }) => {
        let currentCart = data; // 현재 카트 상태를 불러온다.

        let totalPrice = 0; 
        // 카트에 담긴 항목들의 금액 합을 구한다.
        for(let item of currentCart) {
          totalPrice += parseInt(item.price * item.quantity);
        }

        // Data Model 값 갱신
        this.setData({
          items: currentCart,
          totalPrice: totalPrice
        });
      }
    });
  },

  delFromCart ({target}) {
    let targetItem;

    for (let index of this.data.items) { // 삭제할 항목을 탐색
      if (index.menuId == target.id) {
        targetItem = index;
      }
    }

    wx.getStorage({
      key: 'Cart',
      success: ({ data }) => {
        let currentCart = data;  // 현재 카트 상태를 저장한다.

        for (let index = 0; index < currentCart.length; index++) 
        { 
          // 해당 항목을 찾아 삭제
          if (currentCart[index].menuId == targetItem.menuId) {
            currentCart.splice(index, 1);
            break;
          }
        }

        let totalPrice = 0; 

        // 카트에 담긴 항목들의 금액 합을 구한다.
        for(let item of currentCart) {
          totalPrice += parseInt(item.price);
        }

        wx.setStorage({ 
          // 로컬 스토리지에 변경 사항 저장
          data: currentCart,
          key: 'Cart',
        });

        this.setData({
          items: currentCart,
          totalPrice: totalPrice
        });
      }
    });
  },

  checkOut() {
    let isSuccessful = false

    wx.login({
      timeout: 5000,
      success: (response) => {
        if(response.code) {wx.request({
            method: 'GET',
            url: 'https://team1.miniform.kr:3010/user',
            header: {
              'content-type': 'application/json'
            },
            data: {
              id: response.code,
              amount: this.data.totalPrice
            },
            success: async ({data}) => {
              // 위챗 페이 결제 요청
              wx.requestPayment({
                timeStamp: data.timeStamp,
                nonceStr: data.nonceStr,
                package: data.package,
                signType: data.signType,
                paySign: data.paySign,
                success(response) {
                  isSuccessful = true;
                  console.log(response);
                },
                fail(res) {
                  isSuccessful = false;
                  console.log(res);
                },
                // 성공, 실패 여부에 관계없이 결제완료 페이지로 이동
                complete: () => {
                  console.log("Assumes that the payment was successful...");
                  
                  setTimeout(()=>{
                    // 1초간 대기 후, 결제 여부 페이지로 이동
                    wx.navigateTo({
                      url: '/pages/payment/payment?isSuccessful=' + isSuccessful
                    }, 1000)
                  })
                }
              })
            }
          })
        }
        else {
          console.log(response.errMsg);
        }
      },
      fail(error) {
        console.log("Login Failed!")
      }
    });
  },

  numUp({target}) {
    console.log(target);
    
    const itemIndex = target.id;
    let items = this.data.items;
    let totalPrice = 0;

    items[itemIndex].quantity = items[itemIndex].quantity + 1;

    for(let item of items) {
      totalPrice += parseInt(item.price * item.quantity);
    }

    wx.setStorage({ // 다시 저장
      data: items,
      key: 'Cart',
    });

    this.setData({
      items: items,
      totalPrice: totalPrice
    });
  },

  numDown({target}) {
    const itemIndex = target.id;
    let items = this.data.items;
    let totalPrice = 0;

    if ( items[itemIndex].quantity <= 1) {
      return;
    }
    items[itemIndex].quantity = items[itemIndex].quantity - 1;
  
    for(let item of items) {
      totalPrice += parseInt(item.price * item.quantity);
    }

    wx.setStorage({ // 다시 저장
      data: this.data.items,
      key: 'Cart',
    });

    this.setData({
      items: items,
      totalPrice: totalPrice
    });
  }
})