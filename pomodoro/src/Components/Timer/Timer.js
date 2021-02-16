import React, {useState, useEffect} from 'react'

import TimerStyles from './TimerStyles'; 
import ProgressCircle from './ProgressCircle';
import Time from './Time';
import ButtonText from './ButtonText';
import {useSettingsState} from 'hooks/settingsContext';
import {usePomodoroState, states} from 'hooks/pomodoroStateContext';
import { useTimer } from 'hooks';


  
export default function Timer() {
  const [initializing, setInitializing] = useState(true);
  const [startFromInMs, setStartFromInMs] = useState();
  const [state, moveNext] = usePomodoroState();
  
  function onTimeExpires() {
    reset();
    moveNext();
  }

  const {
    pomodoroTime,
    shortBreakTime,
    longBreakTime 
  } = useSettingsState();
  
  const {
    isPaused,
    timeLeft,
    start,
    pause,
    resume,
    reset,
  } = useTimer(onTimeExpires);
  
  
  // restart timer when settings change. 
  useEffect(() => {
    if(initializing) return;

    reset();
    restartTimer(pomodoroTime);

  }, [pomodoroTime, shortBreakTime, longBreakTime]);
  
  // start when done initializing
  useEffect(() => {
    if(initializing) {
      setStartFromInMs(inMs(pomodoroTime));
      return;
    }
    start(startFromInMs);
    
  }, [initializing, startFromInMs]);
  
  // restart when state changes
  useEffect(() => {
    if(initializing) return;
    
    switch(state){
      case states.pomodoro:
        restartTimer(pomodoroTime);
        break;
      case states.shortBreak:
        restartTimer(shortBreakTime);
        break;
      case states.longBreak:
        restartTimer(longBreakTime);
        break;
    }
  }, [state])
  
  function togglePause(){
    if(!isPaused){
      pause();
    } else {
      resume();
    }
  }
  
  function restartTimer(time){
    setStartFromInMs(inMs(time));
    start(inMs(time));
  }
  
  function getSeconds(time){
    // ceil will make it so the time spends a second on 
    // the start number rather than a second on "0". 
    return  Math.ceil(time / 1000);
  }

  function inMs(time) {
    return time * 1000 * 60;
  }
  
  return (
    <div onClick={() => togglePause()}>
      <TimerStyles>
      <ProgressCircle
        forwards={state === states.pomodoro}
        startTime={startFromInMs} 
        timeLeft={timeLeft}
        setInitializing={setInitializing}
        isPaused={isPaused} initializing={initializing}
      />
      <Time remaining={getSeconds(timeLeft)} />
      <ButtonText text={isPaused ? "Resume" : "Pause"} />
      </TimerStyles>
    </div>
  )
}