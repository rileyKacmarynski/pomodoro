import * as React from 'react';

const PomodoroStateContext = React.createContext();
const PomodoroDispatchContext = React.createContext();

export const states = Object.freeze({
  "pomodoro": 1,
  "shortBreak": 2,
  "longBreak": 3
});

function PomodoroStateProvider({children}){
  const [breakCount, setBreakCount] = React.useState(0);
  const [currentState, setCurrentState] = React.useState(states.pomodoro);
  
  function moveNextState(){
    if(currentState === states.pomodoro){
      if(breakCount === 3){
        // time for a long break
        setCurrentState(states.longBreak);
      } else {
        setCurrentState(states.shortBreak);
      }
      setBreakCount(c => c + 1);
    } else {
      setCurrentState(states.pomodoro);
    }

  }
  
  return(
    <PomodoroStateContext.Provider value={currentState}>
      <PomodoroDispatchContext.Provider value={moveNextState}>
        {children}
      </PomodoroDispatchContext.Provider>
    </PomodoroStateContext.Provider>
  )
}

function usePomodoroStateData(){
  const context = React.useContext(PomodoroStateContext);
  if(context === undefined){
    throw new Error('PomodoroState must be used within PomodoroProvider.');
  }
  return context;
}

function useSetPomodoroState(){
  const context = React.useContext(PomodoroDispatchContext);
  if(context === undefined){
    throw new Error('PomodoroDispatchContext must be used within PomodoroProvider.');
  }
  return context;
}

function usePomodoroState(){
  return [usePomodoroStateData(), useSetPomodoroState()]
}

export {
  PomodoroStateProvider,
  usePomodoroState
}