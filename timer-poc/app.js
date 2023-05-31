const svg = document.querySelector('#progress-bar');
const circle = document.querySelector('#progress-bar>#bar');
const time = document.querySelector('#time');
const pause = document.querySelector('#pause');
const pauseButton = document.querySelector('.pomodoro');

const startTimeInSeconds = 1 * 60;
let timeLeft = startTimeInSeconds;
let timerAnimation;
let isPaused = false;

const {
  radiusInPixels,
  circumferenceInPixels
} = getCircleDimensions(svg.clientWidth);

circle.setAttribute('r', radiusInPixels);
circle.setAttribute('stroke-dasharray', circumferenceInPixels);
circle.setAttribute('stroke-dashoffset', 0);

displayTime(time, startTimeInSeconds);

pauseButton.addEventListener('click', function(){
  if(!isPaused){
    pause.innerHTML = 'Resume';
    timerAnimation.pause();
    isPaused = true;
  } else {
    pause.innerHTML = 'Pause';
    timerAnimation.play();
    isPaused = false;
  }
});

const keyframes = [
  { opacity: 0 },
  { opacity: 0 },
  { opacity: 1, strokeDashoffset: 0, offset: .75 },
  { strokeDashoffset: circumferenceInPixels }
];

const animation = circle.animate(keyframes, {
  duration: 4000,
  easing: 'ease-in-out',
  fill: 'forwards',
});

animation.onfinish = () => {
  timerAnimation = circle.animate([
    { strokeDashoffset: circumferenceInPixels},
    { strokeDashoffset: 0 }
  ], {
    duration: startTimeInSeconds * 1000,
    easing: 'linear',
    fill: 'forwards'
  });
  startTimer();
}

function startTimer(){
  let intervalId = setInterval(() => {
    if(timeLeft <= 0) {
      clearInterval(intervalId);
      return;
    }
    if(isPaused){
      return;
    }
    timeLeft -= 1;
    displayTime(time, timeLeft)
  }, 1000);
}

function getCircleDimensions(width){
  const gapFromEdgeInPixels = 6;    // we want 3px on each side of the edge of the circle
  const radiusInPixels = (width / 2) - gapFromEdgeInPixels;
  const circumferenceInPixels = 2 * Math.PI * radiusInPixels;
  return {  
    radiusInPixels,
    circumferenceInPixels
  }
}

function displayTime(el, time){
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (time % 60).toString()
    .padStart(2, '0');

  el.innerHTML = `${minutes}:${seconds}`;
}