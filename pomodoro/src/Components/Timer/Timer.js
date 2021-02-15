import React, {useState, useEffect} from 'react'

import TimerStyles from './TimerStyles'; 
import ProgressCircle from './ProgressCircle';
import Time from './Time';
import ButtonText from './ButtonText';
import {useSettingsState} from 'hooks/settings-context';
import { useTimer } from 'hooks';


const states = Object.freeze({
  "pomodoro": 1,
  "shortBreak": 2,
  "longBreak": 3
});
  
export default function Timer() {
  const [initializing, setInitializing] = useState(true);
  const [startFromInMs, setStartFromInMs] = useState();

  
  const [breakCount, setBreakCount] = useState(0);
  const [currentState, setCurrentState] = useState(states.pomodoro);
  
  function onTimeExpires() {
    reset();
    
    if(currentState === states.pomodoro){
      if(breakCount === 3){
        // time for a long break
        setCurrentState(states.longBreak);
        restartTimer(longBreakTime);
      } else {
        setCurrentState(states.shortBreak);
        restartTimer(longBreakTime);
      }
      setBreakCount(c => c + 1);
    } else {
      setCurrentState(states.pomodoro);
      restartTimer(longBreakTime);
    }
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

  
  // so how do we keep track of current state of pomodoro and move to the next one?
  useEffect(() => {
    if(initializing) return;
    console.log('time has changed. Restart timer');
    reset();
    restartTimer(pomodoroTime);

  }, [pomodoroTime, shortBreakTime, longBreakTime]);
  
  
  useEffect(() => {
    if(initializing) {
      setStartFromInMs(inMs(pomodoroTime));
      return;
    }
    start(startFromInMs);
    
  }, [initializing, startFromInMs]);
  
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
    return time * 1000;
  }
  
  return (
    <div onClick={() => togglePause()}>
      <TimerStyles>
      <ProgressCircle 
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