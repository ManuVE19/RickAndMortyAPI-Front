import React, {useState} from 'react';
import Personaje from './components/Personaje';
import { ApolloClient, InMemoryCache,ApolloProvider} from '@apollo/client';
import styled from 'styled-components';


const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background-color: transparent; // Establecer el color de fondo como transparente
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const ModalButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  align-self: center;
`;


function App() {

  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  });

  const [showModal, setShowModal] = useState(true);
  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <ApolloProvider client={client}>
      <div>
      
        <Personaje />
        {showModal && (
          <Modal>
            <ModalBox>
              <ModalMessage>No se ha generado ningún personaje</ModalMessage>
              <ModalButton onClick={closeModal}>Cerrar</ModalButton>
            </ModalBox>
          </Modal>
        )}
      </div>

    </ApolloProvider>
  );
}
export default App;
  

