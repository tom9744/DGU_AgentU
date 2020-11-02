// pages/location/location.js
Page({
  data: {
    selectedMarker: null,

    markers: [
      {
        iconPath: "/resources/images/markers/food.png",
        id: 0,
        data: {
          title: "상록원 학생식당",
          location: "상록원",
          category: "식당",
          operatingTime: "09:00~17:00",
          description: "교내에서 가장 규모가 큰 식당입니다. 분식당, 버거킹, 학생식당 등 다양한 식당이 입정해 있습니다. "
        },
        latitude: 39.9199848772341,
        longitude: 116.46009176745122,
        name: "Marker #1",
        width: 35,
        height: 35
      },
      {
        iconPath: "/resources/images/markers/food.png",
        id: 1,
        data: {
          title: "기숙사 식당",
          location: "남산학사 1층",
          category: "식당",
          operatingTime: "09:00~17:00",
          description: "남산학사 1층에 위치한 식당입니다. 기숙사생을 위한 조식도 판매하며, 맛있는 메뉴가 많아 인기가 좋습니다."
        },
        latitude: 39.91969047821248,
        longitude: 116.46192071071277,
        name: "Marker #2",
        width: 35,
        height: 35
      },
      {
        iconPath: "/resources/images/markers/food.png",
        id: 2,
        data: {
          title: "다향관 매점",
          location: "다향관 1층",
          category: "편의점",
          operatingTime: "09:00~17:00",
          description: "다향관 1층에 위치한 매점으로, 다양한 먹거리를 구비하고 있으며, 서점도 운영하고 있습니다."
        },
        latitude: 39.9192318842,
        longitude: 116.46055276370419,
        name: "Marker #3",
        width: 35,
        height: 35
      },
      {
        iconPath: "/resources/images/markers/food.png",
        id: 3,
        data: {
          title: "사랑방 매점",
          location: "만해관 2층",
          category: "편의점",
          operatingTime: "09:00~17:00",
          description: "만해, 법학관 2층에 이용한 편의점으로, 도서관 사용 중 배고품을 달래주는 간식을 판매합니다."
        },
        latitude: 39.919192323508131,
        longitude: 116.46168474755132,
        name: "Marker #4",
        width: 35,
        height: 35
      },
      {
        iconPath: "/resources/images/markers/food.png",
        id: 4,
        data: {
          title: "남산학사 카페",
          category: "카페",
          location: "남산학사 1층",
          operatingTime: "08:30~13:00",
          description: "남산학사 1층에 위치한 카페입니다. 다양한 종류의 음료를 저렴한 가격에 구매할 수 있습니다."
        },
        latitude: 39.920332153495245,
        longitude: 116.46089914288473,
        name: "Marker #5",
        width: 35,
        height: 35
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
    const markerNumber = this.data.selectedMarker; 
    const markerData = this.data.markers[markerNumber].data;

    console.log(markerData.title);
    

    wx.navigateTo({
      // url: './detail/detail?item='+item,
      url: '../../pages/menu/menu?title=' + markerData.title + '&location=' + markerData.location + '&operatingTime=' + markerData.operatingTime
    })
  }
})