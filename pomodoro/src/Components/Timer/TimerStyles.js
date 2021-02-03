import styled, { keyframes } from 'styled-components';

const getFadeColor = (props) => keyframes`
  from {
    background-color: ${props.theme.bgPrimary};
  }
  to {
    background-color: ${props.theme.primary};
  }
`;
const fadeOpacity = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Styles = styled.div`
  --circle-size: clamp(15rem, 50vw, 25rem);
  
  position: relative;
  border-radius: 50%;
  width: var(--circle-size);
  height: var(--circle-size);
  background-color: ${ props => props.theme.primary };
  transition: transform 150ms ease-in-out, background-color 150ms ease-in-out;
  
  &:hover {
    cursor: pointer;
  }
  
  &:before {
    position: absolute;
    content: '';

    --border-width: 1rem;
    border-radius: 50%;
    /* size of parent element plus 2 * border-width to add border on both sides */
    height: calc(100% + 2 * var(--border-width));
    width: calc(100% + 2 * var(--border-width));
    
    /* position the border circle in the center */
    transform: translate(
      calc(-1 * var(--border-width)),
      calc(-1 * var(--border-width)));
    
    z-index: -1;
    background-image: linear-gradient(135deg, 
    ${ props => props.theme.primary } 25%, 
    ${ props => props.theme.primary } 25%,  
    ${ props => props.theme.bgSecondary } 75%);
    opacity: 0;
    box-shadow: -3em -3em 5em ${props => props.theme.bgSecondary}, 
    3em 3em 5em ${props => props.theme.primary};
    transition: box-shadow .15s linear;
    transition-delay: .1s;
    animation: ${fadeOpacity} ${props => props.theme.animationDuration} forwards;
  }

  &:hover:before {
  
    box-shadow: 0em 0em 5em -2em ${ props => props.theme.accent },
                0em 0em 5em -2em ${ props => props.theme.accent };
  }
`;

export default function TimerStyles({children}) {
  return (
    <Styles>
      {children}
    </Styles>
  )
}