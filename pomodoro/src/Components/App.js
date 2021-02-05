import React, {useState} from 'react';

import styled from 'styled-components';

import AppStyles from './AppStyles';
import Timer from './Timer';
import Logo from './Logo';
import { SettingsButton, SettingsModal } from './Settings';

// this will have to come from settings at some point
const timerSettings = {
  work: 1 * 10,
  shortBreak: .5 * 60,
  longBreak: 1 * 60
}

function onTimeExpires(){
  console.log('run onTimeExpires');
}

const Main = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
`;

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    console.log('open modal');
    setModalOpen(true);
  };
  
  const closeModal = () => {
    console.log('close modal');
    setModalOpen(false);
  }
  
  return (
    <AppStyles>
      <Main className={"App"}>
        <Logo />
        <Timer onTimeExpires={onTimeExpires} startFrom={timerSettings.work} />
        <SettingsButton onClick={() => setModalOpen(s => !s)}/>
        <SettingsModal isOpen={modalOpen} closeModal={closeModal} />
      </Main>
    </AppStyles>
  );
}

export default App;
