import React from 'react'
import {
  Button,
  ButtonContainer,
  CategoryBox,
  CategoryContainer,
  CategoryImage,
  Container,
  Form,
  FormTitle,
  MapContainer,
  Section,
} from "./styles";
import Input from '../../components/Input';
import { useState } from 'react';
import { TileLayer, Marker, Popup } from 'react-leaflet';
import { categories } from '../Home/categories';
import useGetLocation from '../../hooks/useGetLocation'
import MapEventHandler from '../../components/MapEventHandler';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function New() {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    contact: '',
    category: '',
    coords: [0, 0]
  });

  const { coords } = useGetLocation();

  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('ENTROU')

    const request = await fetch('http://localhost:3000/store', {
      method: 'POST',
      headers: {
        "Content-Type":'application/json'
      },
      body: JSON.stringify({
        ...formValues,
        latitude: formValues.coords[0],
        longitude:formValues.coords[1]
      })
    });
    if(request.ok) {
      toast('Estabelecimento gravado com sucesso! ', {
        type: 'success',
        autoClose: 2000,
        onClose: () => navigate('/')
      })
    } else {
      console.error('Error: ')
    }

  }

  if(!coords) {
    return <h1>Obtendo localização...</h1>
  }

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FormTitle>
          Cadastro do comércio local
        </FormTitle>

        <Section>
          Dados
        </Section>

        <Input
          label='Nome do local'
          name='name'
          value={formValues.name}
          onChange={setFormValues} />

        <Input
          label='Descrição'
          name='description'
          value={formValues.description}
          onChange={setFormValues} />

        <Input
          label='Contato'
          name='contact'
          value={formValues.contact}
          onChange={setFormValues} />

        <Section>Endereço</Section>

        <MapContainer 
          center={[coords[0],coords[1]]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[formValues.coords[0],formValues.coords[1]]}>
            <Popup>pretty CSS3 popup. <br /> Easily customizable.</Popup>
          </Marker>
          {/* Componente criado conforme a documentação do Leaflet v4.x: https://react-leaflet.js.org/docs/api-map/ */}
          <MapEventHandler setFormValues={setFormValues}></MapEventHandler>
          
        </MapContainer>

        <Section>Categoria</Section>

        <CategoryContainer>
            {categories.map(category => (
              <CategoryBox 
                key={category.key}
                onClick={() => {
                  setFormValues(prev => ({...prev, category: category.key}))
                }}
                isActive= {formValues.category === category.key}
              >
                <CategoryImage src={category.url} />
                {category.label}  
              </CategoryBox>
            ))}
        </CategoryContainer>

        <ButtonContainer>
          <Button type="submit">
                Salvar
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default New