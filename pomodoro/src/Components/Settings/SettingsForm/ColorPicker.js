import React from 'react'
import styled from 'styled-components';

const StyledDiv = styled.div`

  display: flex;
  gap: 1rem;

  & .radio {
    color: #000;
    display: grid;
    grid-template-columns: min-content auto;
    grid-gap: 0.5em;
  }

  & .radio__input input {
    opacity: 0;
    position: absolute;
    top: 0;
  }

  & .radio__control {
    display: grid;
    place-items: center;
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
    transform: translateY(-0.0em);
  }

  & label:first-child .radio__control {
    background-color: rgba(246, 113, 115, 1);
  }
  
  & label:nth-child(2) .radio__control {
    background-color: #71f2f7;
  }
  
  & label:last-child .radio__control {
    background-color: #d881f7;
  }
  
  & .radio__input {
    cursor: pointer;
    display: flex;
    position: relative;
  }

  & input + .radio__control svg {
    width: 1.5em;
    height: 1.5em;
    fill: ${props => props.theme.textDark};
    transform: scale(0);
    opacity 0;
    transition: all 180ms ease-in-out;
  }

  
  & input:checked + .radio__control svg {
    transform: scale(1);
    opacity: 1;
  }

  & .radio__input input:focus + .radio__control {
    border-color: ${props => props.theme.textDark};
  }

`;

function ColorPicker({value, setValue}) {

  return (
    <StyledDiv className="input-group">
      <label className="radio">
        <span className="radio__input">
          <input type="radio" name="colors" onChange={e => setValue(e.target.value)} checked={value === 'rgba(246, 113, 115, 1)'} value="rgba(246, 113, 115, 1)"></input>
          <span className="radio__control">
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
              <path fill='none' stroke='currentColor' strokeWidth='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' />
            </svg>
          </span>
        </span>
        <span className="radio__label"></span>
      </label>
      <label className="radio">
        <span className="radio__input">
          <input type="radio" name="colors" onChange={e => setValue(e.target.value)} checked={value === '#71f2f7'} value="#71f2f7"></input>
          <span className="radio__control">
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
              <path fill='none' stroke='currentColor' strokeWidth='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' />
            </svg>
          </span>
        </span>
        <span className="radio__label"></span>
      </label>
      <label className="radio">
        <span className="radio__input">
          <input type="radio" name="colors" onChange={e => setValue(e.target.value)} checked={value === '#d881f7'} value="#d881f7"></input>
          <span className="radio__control">
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
            <path fill='none' stroke='currentColor' strokeWidth='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' />
          </svg>
          </span>
        </span>
        <span className="radio__label"></span>
      </label>
    </StyledDiv>
  )
}

export default ColorPicker
