// pages/menu/menu.js
Page({

  /**
   * Page initial data
   */
  data: {
    filterNumber: 0,
    filter: ["all", "wheat", "almond", "egg", "milk"],

    title: null,
    location: null,
    operatingTime: null,

    menu: [
      { name: "짬뽕", price: "Y300", allergy: "almond", allergyicon: "../../resources/images/allergies/almond.png" },
      { name: "짜장면", price: "Y250", allergy: "egg", allergyicon: "../../resources/images/allergies/egg.png" },
      { name: "짬뽕", price: "Y300", allergy: "egg", allergyicon: "../../resources/images/allergies/egg.png" },
      { name: "짜장면", price: "Y250", allergy: "", allergyicon: "" },
      { name: "짬뽕", price: "Y300", allergy: "milk", allergyicon: "../../resources/images/allergies/milk.png" },
      { name: "짜장면", price: "Y250", allergy: "almond", allergyicon: "../../resources/images/allergies/almond.png" },
      { name: "짬뽕", price: "Y300", allergy: "", allergyicon: "" },
      { name: "짜장면", price: "Y250", allergy: "", allergyicon: "" }
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

    this.setData({
      filterNumber: event.target.id
    })
  }
})