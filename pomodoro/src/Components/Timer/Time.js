import React from 'react'
import styled, { keyframes } from 'styled-components';

// if this happens a lot move it to a shared class
export const flyIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -70%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const StyledDiv = styled.div`
  position: absolute;
  top: 50%;
  font-family: 'Rubik Mono One', 'Courier New', monospace;
  left: 50%;
  transform: translate(-50%, -70%);
  font-size: 3.5rem;
  opacity: 0;
  animation: ${flyIn} ${props => props.theme.animationDuration} forwards;
  animation-delay: ${props => props.theme.animationDuration};
`;

function displayTime(time){
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (time % 60).toString()
    .padStart(2, '0');

  return `${minutes}:${seconds}`;
}

export default function Time({remaining}) {
  return (
    <StyledDiv>{displayTime(remaining)}</StyledDiv>
  )
}