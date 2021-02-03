import React from 'react'
import styled from 'styled-components';

import Svg from './Svg'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: .25rem;
`;

export default function ProgressCircle(props) {
  return (
    <Wrapper>
      <Svg {...props} />
    </Wrapper>
  )
}
