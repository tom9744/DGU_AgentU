// pages/Shoppingcart/Shoppingcart.js
Page({
  data: {
    totalPrice: 0,
    items: []
  },

  onShow: function () {
    wx.getStorage({
      key: 'Cart',
      success: ({ data }) => {
        let currentCart = data; // 현재 카트 상태를 불러온다.
        console.log(data);
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

  changeQuantity({ target }) {
    const itemIndex = target.id;
    let items = this.data.items;
    let totalPrice = 0;

    // 버튼 종류에 따라 다른 Action을 취한다
    if (target.dataset.action === "increase") {
      items[itemIndex].quantity = items[itemIndex].quantity + 1; // 수량 추가
    } else if (target.dataset.action === "decrease") {
      if ( items[itemIndex].quantity <= 1) { 
        // 수량이 1개인 경우, 더 이상 감소하지 못하게 한다.
        return;
      }
      items[itemIndex].quantity = items[itemIndex].quantity - 1; // 수량 감소
    }

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

  removeItem({ target }) {
    let targetItem;
    // 삭제할 항목을 탐색
    for (let index of this.data.items) { 
      if (index.menuId == target.id) {
        targetItem = index;
      }
    }

    wx.getStorage({
      key: 'Cart',
      success: ({ data }) => {
        let currentCart = data;  // 현재 카트 상태를 저장한다.
        let totalPrice = 0; 

        for (let index = 0; index < currentCart.length; index++) 
        { 
          // 해당 항목을 찾아 삭제
          if (currentCart[index].menuId == targetItem.menuId) {
            currentCart.splice(index, 1);
            break;
          }
        }

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

  clearCart() {
    wx.setStorage({ 
      // 로컬 스토리지에 변경 사항 저장
      data: [],
      key: 'Cart',
    });

    // Data Model 값 초기화
    this.setData({
      items: [],
      totalPrice: 0
    });
  },

  confirmCheckout() {
    // If the cart is empty, does not proceed the payment
    if (this.data.totalPrice == 0) {
      wx.showModal({
        title: '发生错误',
        content: '您的购物车是空的。请添加项目。',
        showCancel: false,
      })
      return;
    }

    wx.showModal({
      title: '您要继续吗？',
      content: `我已经检查了购物车中的所有物品。`,
      cancelText: '取消',
      confirmText: '确认',
      confirmColor: 'green',
      success: (response) => {
        if (response.confirm) {
          this.requestPayment();
        } else if (response.cancel) {
          return;
        }
      }
    });
  },

  requestPayment() {
    let isSuccessful = false
    
    wx.login({
      timeout: 5000,
      success: (response) => {
        // wx.login 이후 발급된 토큰이 존재하는 경우,
        if(response.code) {
          // 결제를 위해 API 서버로 총 토큰과 총 금액 전송
          wx.request({
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
                complete: async () => {
                  console.log("Assumes that the payment was successful...");
                  let foodIdList = [];
                  let quantityList = [];
                  let index = 0;

                  // 장바구니 항목(음식 ID, 수량)을 배열에 저장
                  for(let item of this.data.items) {
                    foodIdList[index] = item.food_id;
                    quantityList[index] = item.quantity;
                    index += 1;
                  }

                  wx.login({
                    timeout: 5000,
                    success: (response) => {
                      console.log(                          
                        {
                          id: response.code,
                          money : this.data.totalPrice,
                          food_id : foodIdList,
                          count : quantityList
                        }
                      );
                      
                      // wx.login 이후 발급된 토큰과 함께, 구매내역을 서버로 전송 (DB 저장)
                      if(response.code) {
                        wx.request({
                          url: `https://team1.miniform.kr:3010/purchase`,
                          method:'GET',
                          data:{
                            id: response.code,
                            money : this.data.totalPrice,
                            food_id : foodIdList,
                            count : quantityList
                          },
                          success:() => {
                            // 장바구니 초기화
                            this.clearCart();
                            
                            // 0.5초간 대기 후, 결제 결과 페이지로 이동
                            wx.navigateTo({
                              url: '/pages/payment/payment?isSuccessful=' + isSuccessful
                            }, 500)
                          }
                        })
                      }
                    },
                    fail: () => {
                      // wx.login 실패시, 모달 출력
                      wx.showModal({
                        title: '错误',
                        content: '无法登录微信服务器',
                        showCancel: false,
                      })
                    },
                  });
                }
              })
            }
          })
        }
      },
      fail: () => {
        // wx.login 실패시, 모달 출력
        wx.showModal({
          title: '错误',
          content: '无法登录微信服务器',
          showCancel: false,
        })
      }
    });
  }
})