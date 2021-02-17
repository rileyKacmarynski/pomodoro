import { useEffect, useRef, useState } from 'react';
import { useTimer } from './useTimer.js';

export { useTimer };

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

  const stopAnimation = () => { stopNotification.current = true; }
  
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

// https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
export function useStickyState(defaultValue, key){
  const keyPrefix = 'pomodoro-';

  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(keyPrefix + key);

    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(keyPrefix + key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}