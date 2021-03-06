import React from 'react'
import styled from 'styled-components';
import { ReactComponent as CloseSvg } from './cancel.svg';

import SettingsForm from './SettingsForm';

const Overlay = styled.div`
position: fixed;
top: 0;
right: 0;
bottom: 0;
left: 0;
display: block;
z-index: 5;
background-color: rgba(0, 0, 0, .5);
pointer-events: none;
opacity: 0;
transition: opacity 150ms linear;

&.modal-open {
  opacity: 1;
  cursor: pointer;
  pointer-events: auto;
}
`;

const Modal = styled.div`
  --clr-dark-grey: rgb(168 167 174);
  --clr-light-grey: rgb(241 241 251); 

  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 100;
  color: ${props => props.theme.textDark};
  background-color: rgba(255, 255, 255, 1);
  border-radius: 20px;
  opacity: 0;
  width: 30rem;
  transform: translate(-50%, calc(-50% + 50px));
  transition: opacity 150ms linear, transform 150ms ease-in-out;
  pointer-events: none;

  &.modal-open {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, -50%);
  }

  & .modal-header {
    border-bottom: 2px solid var(--clr-light-grey);
    line-height: 1.1;
    
    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem;

      h3 {
        color: ${props => props.theme.textDark};
        font-size: 1.5rem;
      }
  
      svg {
        --size: .75em;
        width: var(--size);
        height: var(--size);
        fill: var(--clr-dark-grey);
        cursor: pointer;
      }
    }
  }
`;


function SettingsModal({isOpen, closeModal}) {
  return (
    <>
      <Modal className={isOpen && 'modal-open'}>
        <div className="modal-header">
          <div>
            <h3>Settings</h3>
            <CloseSvg onClick={closeModal} />
          </div>
        </div>
        <SettingsForm closeModal={closeModal} />
      </Modal>
      <Overlay onClick={closeModal} className={isOpen && 'modal-open'} />
    </>
  );
}

export default SettingsModal
