import { doc, deleteDoc } from '@firebase/firestore'
import { ListItem, IconButton, ListItemText } from '@mui/material'

import { DeleteIcon } from '../../assets/icons'
import { db } from '../../firebase/firebase'

const Leaf = ({thisLeaf}) => {

  // deletes entire Trees (Projects)
  const onDelete = async(e) => {
    e.stopPropagation();
    const docRef = doc(db, "Trees", thisLeaf.id)
    await deleteDoc(docRef)
  }
  return (
    <ListItem
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: '#FAFAFA' }}
      secondaryAction={
        <>
          <IconButton  onClick={e => onDelete(e)}>
            <DeleteIcon/>
          </IconButton>
        </>
      }
    >
    <ListItemText
    primary={thisLeaf.content}
    /> 
    </ListItem>
  )
}

export default Leaf