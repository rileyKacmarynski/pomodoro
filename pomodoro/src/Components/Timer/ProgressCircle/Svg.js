import React, {useState, useEffect, useRef} from 'react'

import styled from 'styled-components';
import {useWindowEvent, useAnimationFrame} from 'hooks';

const StyledSvg = styled.svg`
  & circle {
    fill: none;
    stroke: ${props => props.theme.accent};
    stroke-width: .5rem;
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
  `;

export default function Svg({startTime, timeLeft, setInitializing, initializing, isPaused}) {
  const svgEl = useRef(null)
  const circleEl = useRef(null);
  const gapFromEdgeInPixels = 6;

  useEffect(() => {
    setCircleAttrs(
      calculateRadius(), 
      calculateCircumference(), 
      0,
    );
     
    const keyframes = [
      {opacity: 0 },
      {opacity: 1},
      {strokeDashoffset: 0, offset: .66}, 
      {strokeDashoffset: calculateCircumference()}
    ];

    const animation = circleEl.current.animate(keyframes, {
      duration: 3000,
      easing: 'ease-in-out',
      fill: 'none'
    });
    animation.onfinish = () => {

      setCircleAttrs(
        calculateRadius(), 
        calculateCircumference(), 
        calculateCircumference(), 
      );
      setInitializing(false);
    }

    return () => animation.cancel();
  }, []);

  // aaaaaahhhhhhh I can't think of how to make the sweeping motion via animation
  // and support pausing the timer
  // useAnimationFrame((timestamp, elapsed) => {
  //   // timer sweep animation
  //   // initial animation is done
  //   if(elapsed > 3000 && timeLeft !== 0 && !isPaused){
  //     const startTimeInMs = startTime * 1000;
  //     // need to add 3000 for the 3 second fade in animation
  //     const timeLeftInMs = startTimeInMs - elapsed + 3000;
  //     const pct = timeLeft / startTime;
  //     const distance = Math.round(pct * calculateCircumference());
  //     setStrokeDashoffset(distance);
  //   }
  // });
  
  useEffect(() =>{
    const pctComplete = timeLeft / startTime;
    const distanceComplete = initializing 
      ? 0 
      : Math.round(pctComplete * calculateCircumference());

    setCircleAttrs(
      calculateRadius(), 
      calculateCircumference(), 
      distanceComplete
      );
    }, [timeLeft]);
    
    
  useWindowEvent('resize', () => {
    circleEl.current.setAttribute('r', calculateRadius())
  });
  
  useEffect(() => {
    console.log('initializing')
    if(!initializing) {
      circleEl.current.style.transition = 'stroke-dashoffset 1s linear';
    }
  }, [initializing]);

  function calculateRadius(){
    return Math.round((svgEl.current.clientWidth / 2)  - gapFromEdgeInPixels);
  }

  function calculateCircumference(){
    return Math.round(2 * Math.PI * calculateRadius());
  }

  function setCircleAttrs(radius, strokeDasharray, strokeDashoffset){
    circleEl.current.setAttribute('r', radius);
    circleEl.current.setAttribute('stroke-dasharray', strokeDasharray);
    setStrokeDashoffset(strokeDashoffset);
  }

  function setStrokeDashoffset(strokeDashoffset){
    circleEl.current.setAttribute('stroke-dashoffset', strokeDashoffset);
  }

  return (
      <StyledSvg ref={svgEl} width="100%" height="100%" viewport="0 0 100 100" version="2.0" xmlns="http://www.w3.org/2000/svg">
        <circle ref={circleEl} r={0} cx="50%" cy="50%"></circle>
      </StyledSvg>
  )
}
