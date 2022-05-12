const initialItemData = {
  items: {
    "5K0y14nmiQTCdc9ZpKgg": {
      id: "5K0y14nmiQTCdc9ZpKgg", 
      boardId: "IWXYTvyrZrXXL8Gr5kZp",
      highlight: false,
      text: "cook dinner",
      img: "",
    },
    "DN2thDni4amMNoCiT35h": {
      id: "DN2thDni4amMNoCiT35h", 
      boardId: "IWXYTvyrZrXXL8Gr5kZp",
      highlight: false,
      text: "watch quality tutorials",
      img: "",
    },
    "ZAw4GXAnJ4xmBzK67dfi": {
      id: "ZAw4GXAnJ4xmBzK67dfi", 
      boardId: "IWXYTvyrZrXXL8Gr5kZp",
      highlight: false,
      text: "Charge my phone",
      img: "",
    },
    "x9rFHXYKt3Pq3gUcyXmY": {
      id: "x9rFHXYKt3Pq3gUcyXmY", 
      boardId: "IWXYTvyrZrXXL8Gr5kZp",
      highlight: false,
      text: "This item has an image, so dragging is disabled",
      img: "this item has an image attached",
    },
  }
}

const initialCardData = {
  cards: {
    "TeeMymkptKtbpYckxluW": {
      id: "TeeMymkptKtbpYckxluW",
      boardId: "IWXYTvyrZrXXL8Gr5kZp",
      highlight: false,
      text: "to do",
      itemIds: ["5K0y14nmiQTCdc9ZpKgg", "DN2thDni4amMNoCiT35h", "ZAw4GXAnJ4xmBzK67dfi", "x9rFHXYKt3Pq3gUcyXmY"]
    },
    "AcJybvQRxvW8BgHrU7WC": {
      id: "AcJybvQRxvW8BgHrU7WC",
      boardId: "IWXYTvyrZrXXL8Gr5kZp",
      highlight: false,
      text: "in progress",
      itemIds: []
    },
    "O10F7xpd1UA8Sey53oS8": {
      id: "O10F7xpd1UA8Sey53oS8",
      boardId: "IWXYTvyrZrXXL8Gr5kZp",
      highlight: false,
      text: "complete",
      itemIds: []
    },
  }
}

const initialBoardData = {
  cardsOrder: ["TeeMymkptKtbpYckxluW", "AcJybvQRxvW8BgHrU7WC", "O10F7xpd1UA8Sey53oS8"],
  email: "ae.ruxton@gmail.com",
  highlight: false,
  id: "IWXYTvyrZrXXL8Gr5kZp",
  text: "WayUp",
  timestamp: "11 May 2022",
}

export { initialItemData }
export { initialCardData }
export { initialBoardData }





// ------------ ORIGINAL DND DUMMY DATA MODEL ----------------------//
// const initialData = {
//   items: {
//     "item-1": {id: "item-1", content: "undraggable item"},
//     "item-2": {id: "item-2", content: "watch quality tutorials"},
//     "item-3": {id: "item-3", content: "Charge my phone"},
//     "item-4": {id: "item-4", content: "Cook dinner"},
//   },
//   cards: {
//     "card-1": {
//       id: "card-1",
//       title: "to do",
//       itemIds: ["item-1", "item-2", "item-3", "item-4"]
//     },
//     "card-2": {
//       id: "card-2",
//       title: "in progress",
//       itemIds: []
//     },
//     "card-3": {
//       id: "card-3",
//       title: "complete",
//       itemIds: []
//     },
//   },
  
//   cardsOrder: ['card-1', "card-2", "card-3"],
// }

// export default initialData

