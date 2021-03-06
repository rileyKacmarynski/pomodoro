import React, { useState } from 'react';

import styled from 'styled-components';

import AppStyles from './AppStyles';
import Logo from './Logo';
import Timer from './Timer';
import { SettingsButton, SettingsModal } from './Settings';
import { SettingsProvider } from 'hooks/settingsContext';
import { PomodoroStateProvider } from 'hooks/pomodoroStateContext';

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
      <PomodoroStateProvider>
        <AppStyles>
          <Main className={"App"}>
            <Logo />
            <Timer />
            <SettingsButton onClick={() => setModalOpen(s => !s)} />
            <SettingsModal isOpen={modalOpen} closeModal={() => setModalOpen(false)} />
          </Main>
        </AppStyles>
      </PomodoroStateProvider>
    </SettingsProvider>
  );
}

export default App;
