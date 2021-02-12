import React, { useState } from 'react'
import styled from 'styled-components';

import NumberInput from './NumberInput';
import ColorPicker from './ColorPicker';
import SubmitButton from './SubmitButton';

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

  & > div:last-child {
    display: flex;
    justify-content: center;
    padding: 0;
    border: none;
    margin-top: 1.5rem;
    // font is 1.5rem - half of the .75rem padding gives us the middle
    margin-bottom: calc(-1 * (1.5rem - 0.375rem));
  }
`;

function SettingsForm() {
  const [color, setColor] = useState();
  
  const onSubmit = (e) => {
    e.preventDefault();
  }
  
  return (
    <StyledForm>
      <div className="time">
        <div className="time-header">
          <p class="label-lg">Time (Minutes)</p>
        </div>
        <div className="time-inputs">
          <NumberInput label="pomodoro" min="1" step="5" initialValue="25" />
          <NumberInput label="short break" min="1" step="1" initialValue="5" />
          <NumberInput label="long break" min="1" step="1" initialValue="15" />
        </div>
      </div>
      <div>
        <p class="label-lg">Color</p>
        <ColorPicker />
      </div>
      <div>
        <SubmitButton onSubmit={onSubmit} />        
      </div>
    </StyledForm>
  )
}

export default SettingsForm;
