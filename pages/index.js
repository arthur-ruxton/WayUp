//import styles from '../styles/Home.module.css'

import { Container } from '@mui/material'

import Trees from '../components/Trees'
import TreeForm from '../components/TreeForm'

export default function Home() {


  return (
    <Container>
      <TreeForm />
      <Trees />
    </Container>
  )
}
