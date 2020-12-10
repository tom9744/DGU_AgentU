// pages/menu/menu.js

const CURRENCY = 0.0059;

Page({
  data: {
    possibleAllergies: ["none", "gluten", "shellfish", "fish", "eggs", "peanut", "soybean", "dairy", "nuts"],
    containedAllergies: [],
    menu: [],

    id: "",
    title: "데이터 없음",
    location: "데이터 없음",
    operatingTime: "데이터 없음",

    cartItems: 0,
    totalPrice: 0
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
      url: `https://team1.miniform.kr:3000/api/floor3s`,
      method: 'GET',
      success: ({ data }) => {
        console.log("Data from server has been successfully received!")

        const menuInfo = data.pop();
        console.log(menuInfo);

        const foodList = menuInfo.food_name.split("、");
        const allergyList = menuInfo.allergy_list.substring(1, menuInfo.allergy_list.length - 1).split(", ")

        let containedAllergies = new Array(); 

        for (let item of allergyList) {
          containedAllergies.push(this.data.possibleAllergies[Number(item.substring(1, item.length - 1))])
        }

        this.setData({
          menu: foodList,
          containedAllergies: containedAllergies
        })
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

  addToCart({ target }) {
    // 기존 메뉴 데이터와 동일한 형식으로 JSON 생성
    const targetItem = {
      menuId: 9999999999,
      name: "今天的菜单",
      price: 36,
      allergies: this.data.containedAllergies,
    }

    wx.getStorage({
      key: 'Cart',
      success: ({ data }) => {
        let currentCart = data;       // 현재 카트 상태를 불러온다.
        let isAlreadyExist = false;
        let totalPrice = 0; 
        let index = 0;

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