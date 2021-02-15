import { useReducer } from 'react';
import { useAnimationFrame } from './index';


// countdown time that counts down from number of seconds passed in as parameter.
// the timeLeft is set within an animation frame so the timeLeft value
// can be sued in the useEffect hook for animation. 
// can optionally pass in a callback that gets ran when time expires.
export function useTimer(onTimeExpires = () => {}){
  
  // probably a bit overkill to use a reducer instead of regular
  // state, but it's good practice. 
  const [state, dispatch] = useReducer(reducer, {
    endTime: 0,
    isPaused: false,
    pauseStart: 0,
    started: false,
    timeLeft: 0,
  });

  const {
    endTime,
    isPaused,
    pauseStart,
    started,
    timeLeft,
  } = state;
  
  // This will update timeLeft around 60 times / second 
  // so the timeLeft can be used to animate things. 
  useAnimationFrame((_, __, stopAnimation) => {
    if(!started) return;

    if(isExpired()){
      dispatch({ type: actions.EXPIRE });
      // stopAnimation(); this will stop the timer instead of changing to next stage
      onTimeExpires();
    }

    dispatch({ type: actions.UPDATE, payload: getTimeLeft() });
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
  
  const start = (countDownFrom) => {
    const start = new Date().getTime();
    const endTime = start + countDownFrom;
    dispatch({ type: actions.START, payload: endTime })
  }

  const pause = () => {
    const pauseStart = new Date().getTime();
    dispatch({ type: actions.PAUSE, payload: pauseStart });
  }

  const resume = () => {
    const pauseLength = new Date().getTime() - pauseStart;
    const newEndTime = endTime + pauseLength;
    dispatch({ type: actions.RESUME, payload: newEndTime });
  }
  
  const reset = (startTime) => {
    dispatch({type: actions.RESET});
    start(startTime);
  }
  
  return {
    isPaused,
    start,
    pause,
    resume,
    timeLeft,
    reset
  }
}

const actions = {
  START: "START",
  PAUSE: "PAUSE",
  RESUME: "RESUME",
  UPDATE: "UPDATE",
  EXPIRE: "EXPIRE",
  RESET: "RESET",
};

function reducer(state, action) {
  switch(action.type){
    case actions.START:
      return { 
        ...state,
        endTime: action.payload,
        started: true
      };
    case actions.PAUSE:
      return { 
        ...state,
        pauseStart: action.payload,
        isPaused: true,
      };
    case actions.RESUME:
      return {
        ...state,
        endTime: action.payload,
        isPaused: false,
        pauseStart: null,
      };
    case actions.UPDATE:
      return { ...state, timeLeft: action.payload };
    case actions.EXPIRE:
      return { 
        ...state,
        timeLeft: 0,
        started: false
      };
    case actions.RESET:
      return {
        endTime: 0,
        isPaused: false,
        pauseStart: 0,
        started: false,
        timeLeft: 0,
      };
    default:
      throw new Error(`Unkown action type ${action.type}`);
  }
}