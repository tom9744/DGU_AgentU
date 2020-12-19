// pages/menu/menu.js

const CURRENCY = 0.0060; // Won-Yuan Rate 20.12.10

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

    menu: []
  },

 onLoad: function (options) {
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

        // Calculate the total amount of money.
        for(let item of data) {
          totalPrice += parseInt(item.price * item.quantity);
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
            food.food_id = item.food_id;
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

  onFilterChange({ target }) {
    this.setData({
      filterNumber: target.id
    })
  },

  addToCart({ target }) {
    const targetItem = this.data.menu[target.id];
    console.log(targetItem)
    wx.getStorage({
      key: 'Cart',
      success: ({ data }) => {
        let currentCart = data;       // 현재 카트 상태를 저장한다.
        let isAlreadyExist = false;
        let totalPrice = 0; 
        let index = 0;
        let food_id = 0;
        // Check if the selected item is already in a shopping cart.
        for (let item of currentCart) {
          if (item.name === targetItem.name) {
            isAlreadyExist = true;
            break;   
          }
          index++;
        }

        // If the selected item exists, just increase the quantity.
        if (isAlreadyExist) {
          currentCart[index].quantity++;
        }
        // If the selected item is new, 
        else {
          targetItem.quantity = 1;
          currentCart.push(targetItem); // Add a new item to the cart.
        }

        // Calculate the total amount of money.
        for(let item of currentCart) {
          totalPrice += parseInt(item.price * item.quantity);
        }

        // Save the cart status to Storage.
        wx.setStorage({
          data: currentCart,
          key: 'Cart',
        });

        // Save the cart status to Page.
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