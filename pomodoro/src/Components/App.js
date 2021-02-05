import React, {useState} from 'react';

import styled from 'styled-components';

import AppStyles from './AppStyles';
import Timer from './Timer';
import Logo from './Logo';
import Settings from './Settings';

// This will need to change when we add the top section and settings gear
const Main = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

// this will have to come from settings at some point
const timerSettings = {
  work: 1 * 10,
  shortBreak: .5 * 60,
  longBreak: 1 * 60
}

function onTimeExpires(){
  console.log('run onTimeExpires');
}

function App() {
  return (
    <AppStyles>
      <Main className="App">
        <Logo />
        <Timer onTimeExpires={onTimeExpires} startFrom={timerSettings.work} />
        <Settings />
      </Main>
    </AppStyles>
  );
}

export default App;
