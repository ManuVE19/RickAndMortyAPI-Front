import {gql, useLazyQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { useState , useEffect} from 'react';

//estilos para el contenedor de imagen 
const StyledImageContainer = styled.div`
  padding: 30px;
  width: fit-content;
  border-radius: 10px;
  background-color: #DDD6CC;
`;


//Estilos para el boton
const BotonGenerar = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  align-self: center;
  margin-left: auto;
`;

//Query que recibe como parametro un numero para buscar el personaje con la API
const QUERY_BY_ID = gql `
query getCharacterById($characterID: ID!){
  character(id: $characterID){
      id
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      created
    }
  }
`;


//estilos para los contenedores de informacion de personaje:
const Container = styled.div`
  display: flex;
  background-color: #19222B;
  padding: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 5px;
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const Image = styled.img`
  width: 200px;
  height: auto;
  border: 1px solid gray;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const TableHeader = styled.h3`
  color: #fff;
  margin: 0;
`;

const TableContent = styled.p`
  color: #fff;
  margin: 0;
`;

const InfoContainer = styled.div`
  display: flex;
  
`;

const InfoLabel = styled(TableHeader)`
  width: 120px;
  text-align: right;
  margin-right: 10px;
`;

const InfoValue = styled(TableContent)`
  flex: 1;
`;

const NothingToShow = styled.h1`
  color: #fff;
`;

//estilos para la lista

const ContainerLista = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
`;

const Lista = styled.li`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 5px 0;
  padding: 5px;

  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
`;

function Personaje() {
//constante para el id que se va a generar
  //Constante que almacena solo la "data" del resultado del query
  const [getCharacter, { data, error, loading }] = useLazyQuery(QUERY_BY_ID);

  const [historial, setMiLista] = useState([]);
  const [dataAux, setDataAux] = useState(null);
  
  //funcion para generar un numero aleatorio, primero revisa que el id no exista en el historial, si existe vuelve a ejecutar el random, si no, guarda el registro
  //selecciona el nuevo character
  const generarIdAleatorio = () =>  {
    const idRandom = Math.floor(Math.random()*826);
    getCharacter({ variables: { characterID: idRandom } });
    if (data && !loading && !error) {
      setMiLista([...historial, data.character]);
      console.log(historial)
    }
  }

  useEffect(() => {
    if (data && !loading && !error) {
      setDataAux(data);
    }
  }, [data, loading, error]);

//Funcion para seleccionar el personaje desde la lista historial se usa nuevamente la estructura del character porque item, y data tienen estructuras diferentes
//al actualizar dataAux con el contenido del item es como si las propiedades no existieran entonces hay que setearlas manualmente 
const handleClick = (item) => {
  setDataAux({
    character: {
      id: item.id,
      name: item.name,
      status: item.status,
      species: item.species,
      image: item.image,
      type: "",
      gender: "",
      origin: {
        name: item.origin.name
      },
      location: {
        name: item.location.name
      },
      created: item.created
    }
  });
};
  return(
    <div className='Principal'>
      
      <h1>Rick And Morthy Characters Page</h1>
      <Container>
      {dataAux ? (
        <ImageContainer>
          <Image src={dataAux.character.image} alt="Nothing to show" />
        </ImageContainer>
      ) : (
        <NothingToShow>nothing to show</NothingToShow>
      )}
      <TableContainer>
        {dataAux ? (
          <>
            <InfoContainer>
              <InfoLabel>ID:</InfoLabel>
              <InfoValue>{dataAux.character.id}</InfoValue>
            </InfoContainer>
            <InfoContainer>
              <InfoLabel>Name:</InfoLabel>
              <InfoValue>{dataAux.character.name}</InfoValue>
            </InfoContainer>
            <InfoContainer>
              <InfoLabel>Status:</InfoLabel>
              <InfoValue>{dataAux.character.status}</InfoValue>
            </InfoContainer>
            <InfoContainer>
              <InfoLabel>Species:</InfoLabel>
              <InfoValue>{dataAux.character.species}</InfoValue>
            </InfoContainer>
            <InfoContainer>
              <InfoLabel>Type:</InfoLabel>
              <InfoValue>{dataAux.character.type || 'N/A'}</InfoValue>
            </InfoContainer>
            <InfoContainer>
              <InfoLabel>Gender:</InfoLabel>
              <InfoValue>{dataAux.character.gender}</InfoValue>
            </InfoContainer>
            <InfoContainer>
              <InfoLabel>Origin:</InfoLabel>
              <InfoValue>{dataAux.character.origin.name}</InfoValue>
            </InfoContainer>
            <InfoContainer>
              <InfoLabel>Location:</InfoLabel>
              <InfoValue>{dataAux.character.location.name}</InfoValue>
            </InfoContainer>
            <InfoContainer>
              <InfoLabel>Created:</InfoLabel>
              <InfoValue>{dataAux.character.created}</InfoValue>
            </InfoContainer>
           
          </>
        ) : (
          null
        )}

      </TableContainer>
      <BotonGenerar onClick={generarIdAleatorio}>Generar Personaje</BotonGenerar>
    </Container>




        <ContainerLista>
      <Title>historial</Title>
      <ul>
        {historial.map((item) => (
          <Lista key={item.id} onClick={() => handleClick(item)}>
            <img src={item.image} alt="Imagen de personaje" />
            {item.name}
          </Lista>
        ))}
      </ul>
    </ContainerLista>
    </div>
    
  )
}

export default Personaje;