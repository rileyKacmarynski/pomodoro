import React from 'react'
import styled from 'styled-components';
import { ReactComponent as SettingsGear } from './settings.svg';

import { fadeOpacity } from 'Components/AppStyles';

const StyledGear = styled(SettingsGear)`
  --size: 2rem;

  width: var(--size);
  height: var(--size);
  fill: ${ props => props.theme.textLight };
  cursor: pointer;
  filter: drop-shadow(0em 0em 2em ${props => props.theme.textLight });
  transition: fill 150ms linear, 
              transform 300ms cubic-bezier(.25,.2,.71,1.76);
  animation: ${fadeOpacity} ${props => props.theme.animationDuration} forwards;

  &:hover {
    fill: rgba(255, 255, 255, 1);
    transform: scale(1.075) rotateZ(45deg);
  }

  @media (prefers-reduced-motion) {
    &:hover {
      transform: scale(1.05)
    };  
  }
`;

function SettingsButton() {
  return (
    <StyledGear />
  )
}

export default SettingsButton;
