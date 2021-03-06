import React, {useState, useEffect, useRef} from 'react'

import styled from 'styled-components';
import {useWindowEvent } from 'hooks';


const StyledSvg = styled.svg`
  & circle {
    fill: none;
    stroke: ${props => props.theme.accent};
    stroke-width: .5rem;
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    transition: stroke 250ms linear;
  }
  `;

export default function Svg({startTime, timeLeft, setInitializing, initializing, forwards}) {
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

  useEffect(() =>{
    // for pomodoro time the circle is empty and fills up ( pct < 1 means circle is filling)
    // for breaks the circle is full and empties (pct > 1 means circle is emptying )
    const pct = forwards 
      ? timeLeft / startTime
      : (timeLeft + startTime) / startTime;
      
    const distanceComplete = initializing 
      ? 0 
      : Math.round(pct * calculateCircumference());

    setCircleAttrs(
      calculateRadius(), 
      calculateCircumference(), 
      distanceComplete,
    );
  }, [timeLeft]);
    
    
  useWindowEvent('resize', () => {
    circleEl.current.setAttribute('r', calculateRadius())
  });

  function calculateRadius(){
    return Math.round((svgEl.current && svgEl.current.clientWidth / 2)  - gapFromEdgeInPixels);
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
