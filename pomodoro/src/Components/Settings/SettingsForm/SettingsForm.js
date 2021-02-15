import React, { useState } from 'react'
import styled from 'styled-components';

import NumberInput from './NumberInput';
import ColorPicker from './ColorPicker';
import SubmitButton from './SubmitButton';
import { useSettingsState, useSetSettingsState } from 'hooks/settingsContext';

const StyledForm = styled.form`

  padding: 0 1.5rem 0 1.5rem;

  & > *:not(button) {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    width: 100%;
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

function SettingsForm({closeModal}) {
  const settings = useSettingsState();
  const setSettings = useSetSettingsState();
  
  const [color, setColor] = useState(settings.color);
  const [pomodoro, setPomodoro] = useState(settings.pomodoroTime);
  const [shortBreak, setShortBreak] = useState(settings.shortBreakTime);
  const [longBreak, setLongBreak] = useState(settings.longBreakTime);
  
  const onSubmit = (e) => {    
    e.preventDefault();
    
    setSettings({
      color: color,
      pomodoroTime: pomodoro,
      shortBreakTime: shortBreak,
      longBreakTime: longBreak,
    });

    if(timeChanged()){
      console.log('need to restart timer.');
    }

    closeModal();
  }
  
  const timeChanged = () => 
    pomodoro !== settings.pomodoroTime
    || shortBreak !== settings.shortBreakTime
    || longBreak !== settings.longBreakTime;
  
  return (
    <StyledForm  onSubmit={onSubmit}>
      <div className="time">
        <div className="time-header">
          <p className="label-lg">Time (Minutes)</p>
        </div>
        <div className="time-inputs">
          <NumberInput value={pomodoro} setValue={setPomodoro} label="pomodoro" min="1" step="1" />
          <NumberInput value={shortBreak} setValue={setShortBreak} label="short break" min="1" step="1" />
          <NumberInput value={longBreak} setValue={setLongBreak} label="long break" min="1" step="1" />
        </div>
      </div>
      <div>
        <p className="label-lg">Color</p>
        <ColorPicker value={color} setValue={setColor}/>
      </div>
      <div>
        <SubmitButton />
      </div>
    </StyledForm>
  )
}

export default SettingsForm;
