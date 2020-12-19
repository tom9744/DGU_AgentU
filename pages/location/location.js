// pages/location/location.js
const checkOperation = (operatingTime) => {
  // When a facility isn't running because of COVID-19.
  if (operatingTime === null) {
    return false;
  }
  else {
    const isWeekdayOnly = operatingTime.split(" ")[0] === "(平日)";

    let startTime = "";
    let endTime = "";
    let start = new Date();
    let end = new Date();
    
    const now = new Date();
    const day = now.getDay();

    // [Pre-Processing] Remove "(平日)" from the string.
    if (isWeekdayOnly) {
      operatingTime = operatingTime.split(" ")[1];
    }
    startTime = operatingTime.split("~")[0];
    endTime = operatingTime.split("~")[1];

    start.setHours(startTime.split(":")[0]);
    start.setMinutes(startTime.split(":")[1]);
    end.setHours(endTime.split(":")[0]);
    end.setMinutes(endTime.split(":")[1]);

    // When the facility runs only on weekdays and today either Saturday or Sunday.
    if (isWeekdayOnly && (day === 0 || day === 6))
    {
      return false;
    }
    
    // When the current time is inbetween opening & closing times.
    if ( start <= now && now <= end ) {
      return true;
    }
    
    // When the current time hasn't reached the opening time or has passed the closing time.
    return true;
  }
}

Page({
  data: {
    // Data related to filtering is set to Korean for developer's conveinence.
    facilityChinese: ["식당", "보건소", "ATM", "은행", "편의점", "우체국", "카페"],
    facilityEnglish: ["food", "medic", "atm", "bank", "cvs", "post", "cafe"],

    filterNumber: 0,
    filter: ["전체", "식당", "보건소", "ATM", "은행", "편의점", "우체국", "카페"],

    facility: [],
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
            facility.operatingTime = item.facility_operation != null ? item.facility_operation : "关掉";
            // facility.iconPath = `/resources/images/markers/${this.data.facilityEnglish[typeIndex - 1]}.svg`;
            facility.isOperating = checkOperation(item.facility_operation);
            // FOR DEBUGGING
            // facility.isOperating = true;
  
            // Add a new array element to the JSON Object Array.
            facilities.push(facility);
          }

          this.setData({
            facility: facilities
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
              // console.log('"OK" is tapped')
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

  gotoMenu(event) {
    const facilityId = event.target.id; 
    const facilityData = this.data.facility[facilityId - 1];

    if (facilityData.name === "教职员食堂") {
      wx.navigateTo({
        // Send Essential Facility Data to the next page. 
        url: '../../pages/floor3/floor3?id=' + facilityId + '&title=' + facilityData.name + '&location=' + facilityData.location + '&operatingTime=' + facilityData.operatingTime
      })
    }
    else {
      wx.navigateTo({
        // Send Essential Facility Data to the next page. 
        url: '../../pages/menu/menu?id=' + facilityId + '&title=' + facilityData.name + '&location=' + facilityData.location + '&operatingTime=' + facilityData.operatingTime
      })
    }
  },
})