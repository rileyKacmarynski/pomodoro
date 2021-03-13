import * as React from 'react';

import { useStickyState } from './index';

const SettingsStateContext = React.createContext();
const SettingsSetStateContext = React.createContext();

// rgba(246, 113, 115, 1)
// blue: #71f2f7
// purple: #d881f7

const initialState = {
  color: 'rgba(246, 113, 115, 1)',
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  demoMode: false,
};

function SettingsProvider({children}){
  const [state, setState] = useStickyState(initialState, 'settings');

  return(
    <SettingsStateContext.Provider value={state}>
      <SettingsSetStateContext.Provider value={setState}>
        {children}
      </SettingsSetStateContext.Provider>
    </SettingsStateContext.Provider>
  )
}

function useSettingsState(){
  const context = React.useContext(SettingsStateContext);
  if(context === undefined){
    throw new Error('useSettingsState must be used within SettingsProvider.');
  }
  return context;
}

function useSetSettingsState(){
  const context = React.useContext(SettingsSetStateContext);
  if(context === undefined){
    throw new Error('useSetSettingsState must be used within SettingsProvider.');
  }
  return context;
}

export {SettingsProvider, useSettingsState, useSetSettingsState};