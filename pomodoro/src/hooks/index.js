import { useEffect, useRef, useState } from 'react';

export function useWindowEvent(event, handler){
  useEffect(() => {
    window.addEventListener(event, handler);

    return () => window.removeEventListener(event, handler);
  });
}


// the function defined below is only defined once with requestAnimationFrame
// it closes over the old state value, which has not been updated yet
// useEffect creates a new function for each render so the function closes
// over the new state. we can't use requestAnimationFrame in a useEffect hook that runs
// on every render, it will mess up the timing. What if instead of trying
// to replace the animationFrame we have a mutable variable that points to 
// the latest callback. This callback needs to persist through renders.
// refs are good at that. 
export function useAnimationFrame(callback){
  const requestRef = useRef();
  const startTimeRef = useRef();
  const savedCallback = useRef();
  const stopNotification = useRef(false);

  function stopAnimation(){
    stopNotification.current = true;
  }
  
  const animate = timestamp => {
    if(startTimeRef.current === undefined){
      startTimeRef.current = timestamp;
    }

    if(stopNotification.current){
      console.log('stopping animation.');
      return;
    }
    
    const elapsed =  timestamp - startTimeRef.current;

    savedCallback.current(timestamp, elapsed, stopAnimation);

    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    savedCallback.current = callback;
  });
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
}


// countdown time that counts down from number of seconds passed in as parameter.
// the timeLeft is set within an animation frame so the timeLeft value
// can be sued in the useEffect hook for animation. 
// can optionally pass in a callback that gets ran when time expires.
export function useTimer(countDownFrom, onTimeExpires = () => {}){
  // this won't change for the life of the timer;
  const [endTime, setEndTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseStart, setPauseStart] = useState(0);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  
  // This will update timeLeft around 60 times / second 
  // so the timeLeft can be used to animate things. 
  useAnimationFrame((_, __, stopAnimation) => {
    if(!started) return;

    if(isExpired()){
      setTimeLeft(0);
      stopAnimation();
      onTimeExpires();
    }

    setTimeLeft(getTimeLeft());
  });
  
  const getTimeLeft = () => {
    if(isPaused){
      return endTime - pauseStart;
    }
    
    const timeLeft = endTime - new Date().getTime();
    return timeLeft >= 0
      ? timeLeft
      : 0;
  }

  const isExpired = () => getTimeLeft() <= 0;
  
  const start = () => {
    const start = new Date().getTime();
    // if it's 10 seconds we want the ms to actually be 1999 so it doesn't jump
    // from 10 to 9 instantly
    setEndTime(start + countDownFrom);
    setStarted(true);
  }

  const pause = () => {
    setIsPaused(true);
    setPauseStart(new Date().getTime());
  }

  const resume = () => {
    setIsPaused(false);
    const pauseLength = new Date().getTime() - pauseStart;
    setEndTime(endTime => endTime + pauseLength);
    setPauseStart(null);
  }
  
  return {
    isPaused,
    start,
    pause,
    resume,
    timeLeft,
  }
}