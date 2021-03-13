import React from 'react'
import styled from 'styled-components';

const RadioInput = styled.div`
  display: grid;
  place-items: center;

  input {
    height: 0;
    width: 0;
    visibility: hidden;
    appearance: none;
  }

  label {
    cursor: pointer;
    display: block;
    position: relative;
    width: 8rem;
    height: 3rem;
    background: #f1f1f1;
    border-radius: 100vw;
    box-shadow: inset 2px 2px 3px rgba(0, 0, 0, .1),
                inset -2px -2px 3px rgba(255, 255, 255, .1);

    transition: background .15s linear;
    transition-delay: .25s;
  }

  label::after {
    content: attr(data-content);
    position: absolute;
    display: grid;
    place-items: center;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 3px;
    top: 3px;
    left: 3px;
    right: auto;
    width: 5rem;
    height: calc(3rem - 6px);
    background: #fff;
    border-radius: 100vw;
    transition: .5s ease-in-out;
  }

  input:checked + label {
    background: ${props => props.theme.accent};
  }

  input:checked + label::after {
    transform: translateX(calc(3rem - 6px));
  }

`;

function DemoSwitch({value, setValue}) {

  return (
    <RadioInput>
      <input type="checkbox" id="demoMode" name="demoMode" checked={value} onChange={e => setValue(e.target.checked)} />
      <label htmlFor="demoMode" data-content={value ? "on" : "off"} ></label>
    </RadioInput>
  )
}

export default DemoSwitch
