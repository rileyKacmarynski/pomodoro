import React, {useState, useEffect} from 'react'

import TimerStyles from './TimerStyles'; 
import ProgressCircle from './ProgressCircle';
import Time from './Time';
import ButtonText from './ButtonText';
import {useTimer} from 'hooks';
import {useSettingsState} from 'hooks/settings-context';

export default function Timer({onTimeExpires}) {
  const settings = useSettingsState();
  const startFromInMs = settings.pomodoroTime * 1000;

  const {
    isPaused,
    timeLeft,
    start,
    pause,
    resume,
  } = useTimer(startFromInMs, onTimeExpires);

  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if(initializing) return;

    start();

  }, [initializing]);

  function togglePause(){
    if(!isPaused){
      pause();
    } else {
      resume();
    }
  }
  
  function getSeconds(time){
    // ceil will make it so the time spends a second on 
    // the start number rather than a second on "0". 
    return  Math.ceil(time / 1000);
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