// pages/userProfile/userProfile.js
Page({
  data: {
    calendarUrl: "https://www.flaticon.com/svg/static/icons/svg/2370/2370264.svg",
    listUrl : "https://www.flaticon.com/svg/static/icons/svg/2645/2645879.svg",
    moneyUrl: "https://www.flaticon.com/svg/static/icons/svg/678/678931.svg",

    purchaseHistory: [],
  },

  onLoad: function() {
    // 로딩 창 표시
    wx.showLoading({
      title: 'Loading',
      mask: true
    })

    wx.login({
      timeout: 5000,
      success: (response) => {
        // wx.login 시도 후, 토큰이 발급된 경우 다음 로직 실행
        if(response.code) {
          wx.request({
          url: `https://team1.miniform.kr:3010/log`,
          method:'GET',
          data:{
            id: response.code,
          },
          success:({ data }) => {
            let purchaseLogs = new Array();
            let tempObject= new Object();
            let logId = 0;
            let itemId = 0;

            for(let index = 0; index < data.length; index++) {
              let log = new Object();

              // tempObejct가 빈 객체가 아닌 경우 (즉, 동일 결제 내역에 대해 품목 추가 중)
              if (Object.keys(tempObject).length !== 0) {
                log = tempObject;
              }
              // 새로운 결제 항목에 대한 처리를 시작하는 경우
              else {
                const date = data[index].buy_date.substr(0, 10);
                const time = data[index].buy_date.substr(11, 8);
                log.logId = logId++;  // 임의의 ID 추가
                log.purchaseDate = `${date} ${time}`;
                log.purchasePrice = data[index].money;
                log.purchaseItems = new Array();
              }

              let item = new Object();
              item.itemId = itemId++;  // 임의의 ID 추가
              item.name = data[index].food_name;
              item.isUsedTicket = false;
              log.purchaseItems.push(item)

              // 마지막 인덱스 제외 (Overflow 방지)
              if(index < data.length - 1) {
                // 다음 구매 항목의 ID가 현재와 일치하는 경우,
                if(data[index].log_id === data[index + 1].log_id) {
                  // 처리 중이던 객체를 임시 저장
                  tempObject = log;
                }
                else {
                  // 임시 객체를 초기화하고, 결제 목록에 해당 항목 추가
                  tempObject= new Object();
                  purchaseLogs.unshift(log);
                }
              }
              // 마지막 인덱스는 바로 결제 항목에 추가
              else {
                purchaseLogs.unshift(log);
              }
            }
            this.setData({
              purchaseHistory : purchaseLogs
            });
          },
          fail: () => {
            // 결제 목록 로드 실패 시 모달 출력
            wx.showModal({
              title: '错误',
              content: '加载购买日志时出错'
            })
          },
          complete: () => {
            // 성공, 실패 여부에 상관 없이 처리 완료 시 로딩 종료
            wx.hideLoading();
          }
        })
      }}})
  },

  useTicket({ target : { dataset : { hid : logId, iid : itemId } } }) {
    const targetHistoryIdx = this.data.purchaseHistory.findIndex(object => object.logId === logId);
    const targetItemIdx = this.data.purchaseHistory[targetHistoryIdx].purchaseItems.findIndex(object => object.itemId === itemId);
    const targetItem = this.data.purchaseHistory[targetHistoryIdx].purchaseItems[targetItemIdx];
    
    if (targetItem.isUsedTicket == false) {
      wx.showModal({
        title: '您想使用餐票吗？',
        content: `[${targetItem.name}] 품목에 대한 주문접수와 해당 식당 관계자임을 확인합니다. `,
        cancelText: '取消',
        confirmText: '확인',
        success: (response) => {
          const temp = this.data.purchaseHistory;
          if (response.confirm) {
            temp[targetHistoryIdx].purchaseItems[targetItemIdx].isUsedTicket = true;
          } else if (response.cancel) {
            temp[targetHistoryIdx].purchaseItems[targetItemIdx].isUsedTicket = false;
          }
          this.setData({ purchaseHistory: temp });
        }
      });
    }
  }
})