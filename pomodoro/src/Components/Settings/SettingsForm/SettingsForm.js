import React from 'react'
import styled from 'styled-components';

import NumberInput from './NumberInput';

const StyledForm = styled.form`

  padding: 0 1.5rem 0 1.5rem;

  & > *:not(button) {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--clr-light-grey);
  }

  & .time {
    flex-direction: column;
  }
  
  & .label-lg {
    color: ${props => props.theme.textDark};
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 600;
  }
  
  & .time-inputs {
    display: flex;
    justify-content: space-between;
  }
`;

function SettingsForm() {
  return (
    <StyledForm>
      <div className="time">
        <div className="time-header">
          <p class="label-lg">Time (Minutes)</p>
        </div>
        <div className="time-inputs">
          <NumberInput label="pomodoro" />
          <NumberInput label="short break" />
          <NumberInput label="long break" />
        </div>
      </div>
      <div>
        <p class="label-lg">Color</p>
        <p>this will be radio buttons;</p>
      </div>
      <button type="Submit" onSubmit={e => e.preventDefault()}>Apply</button>
    </StyledForm>
  )
}

export default SettingsForm;
