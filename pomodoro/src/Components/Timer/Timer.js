import React, {useState, useEffect} from 'react'

import TimerStyles from './TimerStyles'; 
import ProgressCircle from './ProgressCircle';
import Time from './Time';
import ButtonText from './ButtonText';
import {useInterval} from 'hooks';


export default function Timer({startFrom, onTimeExpires}) {
  const [timer, setTimer] = useState({
    countDownFromInSeconds: countDownFrom,
    secondsLeft: countDownFrom,
    startTime: null,
    endTime: null,
    isPaused: false,
    pauseStart: null,
  });
  const [isPaused, setIsPaused] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if(initializing === true) {
      setTimer({
        secondsLeft: startFrom
      });
      return;
    };

    const start = roundDateToSeconds(new Date());
    const end = new Date(start.getTime() + startFrom * 1000);
    const secondsLeft = (end - start) / 1000;
    
    setTimer({
      startTime: start,
      endTime: end,
      secondsLeft: secondsLeft
    });

    setIsPaused(false);
  }, [initializing]);
  
  useInterval(() => {
    // don't start
    if(initializing) return;
      
    if(isExpired()) {
      setIsPaused(true);
      onTimeExpires();
      return;
    }
    
    setTimer(timer => {
      return {...timer, secondsLeft: timer.secondsLeft - 1}
    });
  }, isPaused ? null : 1000);
  
  function isExpired(){
    return timer.endTime != 0 
      && roundDateToSeconds(new Date()) > timer.endTime
      && isPaused !== true
  }
  
  function roundDateToSeconds(date){
    const coeff = 1000;
    return new Date(Math.round(date.getTime() / coeff) * coeff)
  }

  function togglePause(){
    if(isPaused){
      // reset endDate to now + remaining time
      timer.endTime = roundDateToSeconds(new Date()).getTime() + timer.secondsLeft * 1000;
    }
    setIsPaused(isPaused => !isPaused);
  }
  
  return (
    <div onClick={() => togglePause()}>
      <TimerStyles>
      <ProgressCircle 
        startTime={startFrom} 
        timeLeft={timer.secondsLeft}
        setInitializing={setInitializing}
        isPaused={isPaused} initializing={initializing}
      />
      <Time remaining={timer.secondsLeft} />
      <ButtonText text={isPaused ? "Resume" : "Pause"} />
      </TimerStyles>
    </div>
  )
}
