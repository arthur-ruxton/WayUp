import { useEffect, useState } from 'react'

import { collection, where, query, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebase/firebase';

import Item from './Item'

const ItemList = ({ itemList, cardId, boardId }) => {
  const [oneItemList, setOneItemList] = useState(itemList)

  useEffect(() => {
    const collectionRef = collection(db, "Items")

    const q = query(collectionRef, where("cardId", "==", cardId))

    const snap = onSnapshot(q, (querySnapshot) => {
      setOneItemList(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    });
    return snap
  }, [])

  return (
    <div>
      {oneItemList.map(item => (
        <Item
          key={item.id} 
          thisItem={item}
          cardId={cardId}
          boardId={boardId}
          />
      ))}
    </div>
  )
}

export default ItemList