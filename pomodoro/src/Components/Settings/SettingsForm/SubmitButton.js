import React from 'react'
import styled from 'styled-components';

const StyledButton = styled.button`
  
  &[type='submit'] {
    overflow: hidden;
    position: relative;
    padding: .75rem 1.25rem;
    background-color: transparent;
    color: ${props => props.theme.textLight};
    border: none;
    border: none;
    border-radius: 100vw;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 3px;
    display: inline-flex;
    z-index: 999999;
  }

  &[type='submit']::before,
  &[type='submit']::after {
    content: 'APPLY';
    position: absolute;
    display: grid;
    place-items: center;
    color: ${props => props.theme.textLight};
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 3px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 100vw;
    transition: transform 300ms ease-in-out;
  }

  &[type='submit']::before {
    background-color: ${props => props.theme.accent};
    transform: translateX(-100%);
    transition-delay: 75ms;
  }

  &[type='submit']::after {
    background-color: ${props => props.theme.bgSecondary};
    transform: translateX(0%);
    transition-delay: 0ms;
  }

  &[type='submit']:hover {
    cursor: pointer;
  }

  &[type='submit']:hover::before {
    transform: translateX(0);
    transition-delay: 0ms;
  }

  &[type='submit']:hover::after {
    transform: translateX(100%);
    transition-delay: 75ms;
  }
`;

function SubmitButton({onSubmit}) {
  return (
    <StyledButton type="submit" onSubmit={e => onSubmit(e)}>Apply</StyledButton>
  )
}

export default SubmitButton
