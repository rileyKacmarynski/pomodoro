import React from 'react'
import styled from 'styled-components'

import { ReactComponent as Chevron } from './chevron.svg';

const Span = styled.span`
  display: block;
  font-size: .75rem;
  color: rgb(189, 188, 194);
  font-weight: bold;
  line-height: 1;
  margin-bottom: .25rem;
`;

const InputGroup = styled.div`
  position: relative;

  & span {
    position: absolute;
    right: .5em;
    cursor: pointer;
    display: grid;
    place-items: center;
  }
  
  & span.up {
    top: .25em;
    transform: rotateZ(-90deg)
  }
  
  & span.down {
    bottom: .25em;
    transform: rotateZ(90deg)
  }

  & svg {
    fill: var(--clr-dark-grey);
    width: .75em;
    height: .75em;
  }

`;

const Input = styled.input`
  font-size: 16px;
  font-size: max(16px, 1em);
  font-family: inherit;
  outline: none;
  max-width: 100px;
  padding: 0.25em 0.5em;
  background-color: var(--clr-light-grey);
  border: 2px solid var(--clr-light-grey);
  border-radius: 7px;
  transition: 180ms all ease-in-out;
  box-shadow: none;
  

  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;


  &::-webkit-inner-spin-button, 
  &::-webkit-outer-spin-button { 
    -webkit-appearance: none;
  }

  &:focus {
    border-color: ${props => props.theme.accent};
    background-color: #fff;
  }
`;

function NumberInput({label}) {
  return (
    <label>
      <Span>{label}</Span>
      <InputGroup>
        <Input type="number" min="1" step="5" value="0" />
        <span className="up"><Chevron /></span>
        <span className="down"><Chevron /></span>
      </InputGroup>
    </label>
  )
}

export default NumberInput;
