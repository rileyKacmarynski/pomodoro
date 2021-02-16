import React from 'react'
import styled from 'styled-components';

import { fadeOpacity } from 'Components/AppStyles';
import { usePomodoroState, states } from 'hooks/pomodoroStateContext';

const Container = styled.div`
  position: relative;
  width: 65ch;
    
  & h2 {
  position: absolute;
  font-size: 2rem;
  line-height: 1.1;
  font-weight: 600;
  cursor: default;
  top: 50%;
  left: 50%;
  border-radius: 100vw;
  text-shadow: 0em 0em 5em ${props => props.theme.textLight};
  opacity: 0;
  transform: translate(-50%, -50%) scale(1.5);
  transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
}

& h2.show {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.0);
    animation: ${fadeOpacity} ${props => props.theme.animationDuration} forwards;
  }

`;

function Logo() {  
  const [state] = usePomodoroState();

  const getText = () => {
    switch(state){
      case states.pomodoro:
        return "pomodoro";
      case states.shortBreak:
        return "short break";
      case states.longBreak:
        return "long break";
    }
  }
  
  return (
    <Container>
      <h2 className={states.pomodoro === state && "show"}>pomodoro</h2>
      <h2 className={states.shortBreak === state && "show"}>short break</h2>
      <h2 className={states.longBreak === state && "show"}>long break</h2>
    </Container>
  )
}

export default Logo
