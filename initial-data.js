
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


const initialItemData = {
  items: {
    "item-1": {id: "item-1", content: "undraggable item"},
    "item-2": {id: "item-2", content: "watch quality tutorials"},
    "item-3": {id: "item-3", content: "Charge my phone"},
    "item-4": {id: "item-4", content: "Cook dinner"},
    "item-5": {id: "item-5", content: "foo"},
    "item-6": {id: "item-6", content: "bar"},
    "item-7": {id: "item-7", content: "baz"},
  }
}

const initialCardData = {
  cards: {
    "card-1": {
      id: "card-1",
      title: "to do",
      itemIds: ["item-1", "item-2", "item-3", "item-4"]
    },
    "card-2": {
      id: "card-2",
      title: "in progress",
      itemIds: ["item-5", "item-6"]
    },
    "card-3": {
      id: "card-3",
      title: "complete",
      itemIds: ["item-7"]
    },
  }
}

const initialBoardData = {
  title: "wayup",
  cardsOrder: ['card-1', "card-2", "card-3"],
}

export { initialItemData }
export { initialCardData }
export { initialBoardData }