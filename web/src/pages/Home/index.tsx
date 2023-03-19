import React from 'react'
import { 
  Container, 
  Title, 
  Image, 
  LeftContainer, 
  RightContainer, 
  Button, 
  SubTitle, 
  ButtonBox 
} from './styles'
import { Link } from 'react-router-dom'

function Home() {
  return <Container>
    <LeftContainer>
      <Title>O mapa local de sua cidade</Title>
      <SubTitle>Encontre no comércio local tudo o que precisa</SubTitle>
     
      <Link to='/new'>
        <Button>
          <ButtonBox>{'>'}</ButtonBox>
          Cadastre um ponto comercial
        </Button>
      </Link>
    </LeftContainer>

    <RightContainer>
      <Image/>
    </RightContainer>
    </Container>
}

export default Home