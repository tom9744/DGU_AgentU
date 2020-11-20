// pages/location/location.js
Page({
  data: {

    facilityChinese: ["식당", "보건소", "ATM", "은행", "편의점", "우체국"],
    facilityEnglish: ["food", "medic", "atm", "bank", "cvs", "post"],

    selectedMarker: null,

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
  onLoad() {
    console.log("The Page has been successfully loaded!");
    
    wx.request({
      url: 'https://team1.miniform.kr:3000/api/facilities',
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
          let facilities = new Array();

          // For each data content from the entire datasets,
          for (const item of data) {
            // Pasrse the Recieved Data into Proper JSON.
            let facility = new Object();
            const typeIndex = item.facility_type;
  
            // Add Props to a JSON Object.
            facility.id = item.facility_id;
            facility.name = item.facility_name;
            facility.location = item.facility_location;
            facility.category = this.data.facilityChinese[typeIndex - 1];
            facility.operatingTime = item.facility_operation;
            facility.iconPath = `/resources/images/markers/${this.data.facilityEnglish[typeIndex - 1]}.svg`;
  
            // Add a new array element to the JSON Object Array.
            facilities.puse(facility);
          }
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
  markertap(event) {
    console.log(event);
    this.setData({
      selectedMarker: event.detail.markerId
    });

  seeDetails(event) {
    const markerNumber = this.data.selectedMarker; 
    const markerData = this.data.markers[markerNumber].data;

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
  },
  regionChange(event) {
    console.log(event);
  }
})