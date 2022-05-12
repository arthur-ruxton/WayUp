import Container from '@mui/material/Container';

import DragDropContainer from '../../components/dnd/DragDropContainer'

import { initialBoardData } from '../../initial-data'

export default function Home() {

  return (
    <Container  sx={{display:'flex', flexDirection:"column",  maxWidth:"full"}}>
      <h1>{initialBoardData.text}</h1>
      <DragDropContainer />
    </Container>
  )
}