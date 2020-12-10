// pages/userProfile/userProfile.js
Page({

  /**
   * Page initial data
   */
  data: {
    calendarUrl: "https://www.flaticon.com/svg/static/icons/svg/2370/2370264.svg",
    listUrl : "https://www.flaticon.com/svg/static/icons/svg/2645/2645879.svg",
    moneyUrl: "https://www.flaticon.com/svg/static/icons/svg/678/678931.svg",

    purchaseHistory: [
      {
        purchaseDate: "2020-11-11 13:22",
        purchaseItems: [
          {
            name: "짬뽕",
            isUsedTicket: false,
          }, 
          {
            name: "탕수육",
            isUsedTicket: false,
          }],
        purchasePrice: "250"
      },
      {
        purchaseDate: "2020-11-10 11:22",
        purchaseItems: [
          {
            name: "짜장면",
            isUsedTicket: false,
          }],
        purchasePrice: "50"
      }
    ],
  },


  useTicket(event) {
    const hid = event.target.dataset.hid;
    const iid = event.target.dataset.iid;
    const tagetItem = this.data.purchaseHistory[hid].purchaseItems[iid];

    if (tagetItem.isUsedTicket == false) {
      wx.showModal({
        title: '您想使用餐票吗？',
        content: `[${tagetItem.name}] 품목에 대한 주문접수와 해당 식당 관계자임을 확인합니다. `,
        cancelText: '取消',
        confirmText: '확인',
        success: (res) => {
          if (res.confirm) {
            const temp = this.data.purchaseHistory;
            temp[hid].purchaseItems[iid].isUsedTicket = true;
            this.setData({ purchaseHistory: temp});
          } else if (res.cancel) {
            const temp = this.data.purchaseHistory;
            temp[hid].purchaseItems[iid].isUsedTicket = false;
            this.setData({ purchaseHistory: temp});
          }
        }
      });
    }
  }
})