import React, { useState } from 'react';

import styled from 'styled-components';

import AppStyles from './AppStyles';
import Timer from './Timer';
import Logo from './Logo';
import { SettingsButton, SettingsModal } from './Settings';
import { SettingsProvider } from 'hooks/settings-context';


function onTimeExpires() {
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

  return (
    <SettingsProvider>
      <AppStyles>
        <Main className={"App"}>
          <Logo />
          <Timer onTimeExpires={onTimeExpires} />
          <SettingsButton onClick={() => setModalOpen(s => !s)} />
          <SettingsModal isOpen={modalOpen} closeModal={() => setModalOpen(false)} />
        </Main>
      </AppStyles>
    </SettingsProvider>
  );
}

export default App;
