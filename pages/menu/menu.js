// pages/menu/menu.js
Page({

  /**
   * Page initial data
   */
  data: {
    filterNumber: 0,
    filter: ["all", "gluten", "almond", "egg", "milk"],

    title: null,
    location: null,
    operatingTime: null,

    menu: [
      { menuId: "0", name: "짬뽕", price: "300", allergy: ["gluten"] },
      { menuId: "1", name: "짜장면", price: "250", allergy: ["gluten"] },
      { menuId: "2", name: "계란 볶음밥", price: "250", allergy: ["egg",] },
      { menuId: "3", name: "멘보샤", price: "250", allergy: ["milk", "egg"] },
      { menuId: "4", name: "청경채 볶음", price: "200", allergy: [] },
      { menuId: "5", name: "경장육슬", price: "350", allergy: [] },
      { menuId: "6", name: "어향가지", price: "300", allergy: ["almond", "gluten"] },
      { menuId: "7", name: "팔보채", price: "250", allergy: ["almond"] },
      { menuId: "8", name: "토마토 계란 볶음", price: "150", allergy: ["egg"] },
      { menuId: "9", name: "공기밥", price: "50", allergy: [] },
      { menuId: "10", name: "어향가지", price: "300", allergy: ["almond", "gluten"] },
      { menuId: "11", name: "팔보채", price: "250", allergy: ["almond"] },
      { menuId: "12", name: "토마토 계란 볶음", price: "150", allergy: ["egg"] },
      { menuId: "13", name: "공기밥", price: "50", allergy: [] }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("options : ", options);

    this.setData({
      title: options.title,
      location: options.location,
      operatingTime: options.operatingTime
    })
  },

  onClick(event) {
    console.log(event);
    const filterId = event.target.id;

    this.setData({
      filterNumber: filterId
    })
  }
})