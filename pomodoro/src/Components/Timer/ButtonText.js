import React from 'react'
import styled from 'styled-components';

import {flyIn} from './Time';

const StyledDiv = styled.div`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -70%);
  text-transform: uppercase;
  letter-spacing: 8px;
  font-weight: 500;
  opacity: 0;
  animation: ${flyIn} ${props => props.theme.animationDuration} forwards;
  animation-delay: calc(1.5 * ${props => props.theme.animationDuration});
`;

export default function ButtonText({text}) {
  return <StyledDiv>{text}</StyledDiv>
}
