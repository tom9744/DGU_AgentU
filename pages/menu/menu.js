// pages/menu/menu.js

const CURRENCY = 0.0059;

Page({

  /**
   * Page initial data
   */
  data: {
    filterNumber: 0,
    filter: ["all", "gluten", "shellfish", "fish", "eggs", "peanut", "soybean", "dairy", "nuts"],

    id: "",
    title: "데이터 없음",
    location: "데이터 없음",
    operatingTime: "데이터 없음",

    cartItems: 0,
    totalPrice: 0,

    menu: [
      // { menuId: "0", name: "짬뽕", price: "300", allergy: ["gluten"] },
      // { menuId: "1", name: "짜장면", price: "250", allergy: ["gluten"] },
      // { menuId: "2", name: "계란 볶음밥", price: "250", allergy: ["egg",] },
      // { menuId: "3", name: "멘보샤", price: "250", allergy: ["milk", "egg"] },
      // { menuId: "4", name: "청경채 볶음", price: "200", allergy: [] },
      // { menuId: "5", name: "경장육슬", price: "350", allergy: [] },
      // { menuId: "6", name: "어향가지", price: "300", allergy: ["almond", "gluten"] },
      // { menuId: "7", name: "팔보채", price: "250", allergy: ["almond"] },
      // { menuId: "8", name: "토마토 계란 볶음", price: "150", allergy: ["egg"] },
      // { menuId: "9", name: "공기밥", price: "50", allergy: [] }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("options : ", options);

    // Save some data which has been passed down from a previous page.
    this.setData({
      id: options.id,
      title: options.title,
      location: options.location,
      operatingTime: options.operatingTime
    })

    // Get Data from Storage.
    wx.getStorage({
      key: 'Cart',
      success: ({ data }) => {

        let totalPrice = 0; 
        // 카트에 담긴 항목들의 금액 합을 구한다.
        for(let item of data) {
          totalPrice += parseInt(item.price);
        }

        this.setData({
          cartItems: data.length,
          totalPrice: totalPrice
        });
      }
    });

    wx.request({
      url: `https://team1.miniform.kr:3000/api/food?filter[where][facility_id]=${this.data.id}`,
      method: 'GET',
      success: ({ data }) => {
        console.log("Data from server has been successfully received!")
        
        // When the data object from server is empty.
        if (data.length == 0) {
          // Actiave a modal to print out the error message.
          wx.showModal({
            title: 'An Error has been occured!',
            content: 'There is no data to fetch.',
            showCancel: false,
      
            success (res) {
              if (res.confirm) {
                console.log('"OK" is tapped')
              }
            }
          })
        }
        // When the data object from server has contents.
        else {
          // Make a new array to contain data.
          let foods = new Array();
          let id = 0;

          // For each data content from the entire datasets,
          for (const item of data) {
            // Pasrse the Recieved Data into Proper JSON.
            let food = new Object();

            // Add Props to a JSON Object.
            food.menuId = id;
            food.name = item.food_name;
            food.price = Math.round(item.food_price * CURRENCY);
            food.allergies = new Array();
            
            if(item.allergy_list !== null) {
              const allergies = item.allergy_list.split(",");
              
              for (let code of allergies) {
                food.allergies.push(this.data.filter[code]);
              }
            }

            // Add a new array element to the JSON Object Array.
            foods.push(food);

            id += 1;
          }
          console.log(foods);

          this.setData({
            menu: foods
          })
        }
      },
      fail: ({ errMsg }) => {
        // Parse the Error Message
        errMsg = errMsg.split(":")[1].split("");
        errMsg[0] = errMsg[0].toUpperCase();
        errMsg = errMsg.join("");

        wx.showModal({
          title: 'An Error has been occured!',
          content: errMsg,
          showCancel: false,
    
          success (res) {
            if (res.confirm) {
              console.log('"OK" is tapped')
            }
          }
        })
      }
    })
  },

  onClick(event) {
    console.log(event);
    const filterId = event.target.id;

    this.setData({
      filterNumber: filterId
    })
  },

  addToCart(event) {
    console.log(event.target.id);
    
    const targetItem = this.data.menu[event.target.id];

    wx.getStorage({
      key: 'Cart',
      success: ({ data }) => {
        let currentCart = data;       // 현재 카트 상태를 저장한다.
        currentCart.push(targetItem); // 현재 카트 상태에 선택된 항목을 추가한다.

        let totalPrice = 0; 
        // 카트에 담긴 항목들의 금액 합을 구한다.
        for(let item of currentCart) {
          totalPrice += parseInt(item.price);
        }

        wx.setStorage({
          data: currentCart,
          key: 'Cart',
        });

        this.setData({
          cartItems: currentCart.length,
          totalPrice: totalPrice
        });
      }
    });
  },

  checkCart() {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  }
})