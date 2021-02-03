import { useEffect, useRef } from 'react';

export function useWindowEvent(event, handler){
  useEffect(() => {
    window.addEventListener(event, handler);

    return () => window.removeEventListener(event, handler);
  });
}


// the function defined below is only defined once with setInterval
// it closes over the old state value, which has not been updated yet
// useEffect creates a new function for each render so the function closes
// over the new state. we can't use setInterval in a useEffect hook that runs
// on every render, it will mess up the timing. What if instead of trying
// to replace the interval we have a mutable variable that points to 
// the latest callback. This callback needs to persist through renders.
// refs are good at that. 
export function useInterval(callback, delay){
  const savedCallback = useRef();

  // remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // set up an interval that only runs once
  // unless the delay in changed. 
  useEffect(() =>{
    function tick(){
      savedCallback.current();
    }

    if(delay !== null){
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useAnimationFrame(callback, animationLength, delay){
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const startTimeRef = useRef();
  const savedCallback = useRef();
  
  const animate = timestamp => {
    if(startTimeRef.current == undefined){
      startTimeRef.current = timestamp;
    }

    const elapsed =  timestamp - startTimeRef.current;
    savedCallback.current(timestamp, elapsed);

    if(animationLength != undefined && elapsed >= animationLength){
      return;
    }

    previousTimeRef.current = timestamp;
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback])
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
}

// const animLength = 1000;
// if(start == null){
//   start = timestamp;
// }
// const elapsed = timestamp - start;
// const timeLeft = animLength - elapsed;

// const pct = timeLeft / animLength;
// const distance = calculateCircumference() - Math.round(pct * calculateCircumference());
// setStrokeDashoffset(distance);

// if(elapsed < animLength){
//   requestAnimationFrame(step);
// } else {
//   setStrokeDashoffset(calculateCircumference());
//   setInitializing(false);
// }