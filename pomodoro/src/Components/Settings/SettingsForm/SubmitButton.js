import React from 'react'
import styled from 'styled-components';

const StyledButton = styled.button`
  
  &[type='submit'] {
    cursor: pointer;
    padding: .75rem 1.25rem;
    background-color: ${props => props.theme.bgSecondary};
    color: ${props => props.theme.textLight};
    border: none;
    display: grid;
    place-items: center;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 3px;
    border-radius: 100vw;
    font-weight: 600;
    letter-spacing: 3px;
    display: inline-flex;
    transition: background-color .15s linear;
    
    &:hover {
      background-color: ${props => props.theme.accent};
    }
  }

`;

function SubmitButton({onSubmit}) {
  return (
    <StyledButton type="submit" onSubmit={e => onSubmit(e)}>Apply</StyledButton>
  )
}

export default SubmitButton
