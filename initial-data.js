const initialItemData = [
  {
    id: "5K0y14nmiQTCdc9ZpKgg", 
    boardId: "IWXYTvyrZrXXL8Gr5kZp",
    highlight: false,
    text: "cook dinner",
    img: "",
  },
  {
    id: "DN2thDni4amMNoCiT35h", 
    boardId: "IWXYTvyrZrXXL8Gr5kZp",
    highlight: false,
    text: "watch quality tutorials",
    img: "",
  },
  {
    id: "ZAw4GXAnJ4xmBzK67dfi", 
    boardId: "IWXYTvyrZrXXL8Gr5kZp",
    highlight: false,
    text: "Charge my phone",
    img: "",
  },
  {
    id: "x9rFHXYKt3Pq3gUcyXmY", 
    boardId: "IWXYTvyrZrXXL8Gr5kZp",
    highlight: false,
    text: "This item has an image, so dragging is disabled",
    img: "this item has an image attached",
  },
]

const initialCardData = [
  {
    id: "TeeMymkptKtbpYckxluW",
    boardId: "IWXYTvyrZrXXL8Gr5kZp",
    highlight: false,
    text: "to do",
    itemIds: ["5K0y14nmiQTCdc9ZpKgg", "DN2thDni4amMNoCiT35h", "ZAw4GXAnJ4xmBzK67dfi", "x9rFHXYKt3Pq3gUcyXmY"]
  }, 
  {
    id: "AcJybvQRxvW8BgHrU7WC",
    boardId: "IWXYTvyrZrXXL8Gr5kZp",
    highlight: false,
    text: "in progress",
    itemIds: []
  },
    {
    id: "O10F7xpd1UA8Sey53oS8",
    boardId: "IWXYTvyrZrXXL8Gr5kZp",
    highlight: false,
    text: "complete",
    itemIds: []
  },
]

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