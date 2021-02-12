import React from 'react'
import styled from 'styled-components';
import { fadeOpacity } from 'Components/AppStyles';

const Header = styled.h2`
  font-size: 2rem;
  line-height: 1.1;
  font-weight: 600;
  cursor: default;
  border-radius: 100vw;
  text-shadow: 0em 0em 5em ${props => props.theme.textLight};
  animation: ${fadeOpacity} ${props => props.theme.animationDuration} forwards;
`;

function Logo() {  
  return (
    <Header>pomodoro</Header>
  )
}

export default Logo
