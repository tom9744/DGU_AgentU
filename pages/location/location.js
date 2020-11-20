// pages/location/location.js
Page({
  data: {
    filterNumber: 0,
    filter: ["전체", "식당", "보건소", "ATM", "은행", "편의점"],

    facility: [
      {
        facilityId : 0,
        name: "상록원 학생식당",
        location: "상록원",
        type_name: "식당",
        operatingTime: "09:00~17:00",
      },
      {
        facilityId : 1,
        name: "기숙사 학생식당",
        location: "신공학관",
        type_name: "식당",
        operatingTime: "09:00~17:00",
      },
      {
        facilityId : 2,
        name: "IBK ATM",
        location: "신공학관",
        type_name: "ATM",
        operatingTime: "09:00~17:00",
      },
      {
        facilityId : 3,
        name: "CU 신공학관점",
        location: "신공학관",
        type_name: "편의점",
        operatingTime: "09:00~17:00",
      }
    ],
  },
  markertap(event) {
    console.log(event);
    this.setData({
      selectedMarker: event.detail.markerId
    });
  },
  regionChange(event) {
    console.log(event);
  },
  onClick(event) {
    console.log(event.target.id);
    const filterId = event.target.id;

    this.setData({
      filterNumber: filterId
    })
  },
  gotoMenu(event) {
    const facilityId = event.target.id; 
    const facilityData = this.data.facility[facilityId];

    console.log(facilityData.title);

    wx.navigateTo({
      // url: './detail/detail?item='+item,
      url: '../../pages/menu/menu?title=' + facilityData.name + '&location=' + facilityData.location + '&operatingTime=' + facilityData.operatingTime
    })
  }
})