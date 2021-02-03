const svg = document.querySelector('#progress-bar');
const circle = document.querySelector('#progress-bar>#bar');
const time = document.querySelector('#time');
const pause = document.querySelector('#pause');
const pauseButton = document.querySelector('.pomodoro');

const countDownFrom = 1 * 60; 

let timer = createTimer(countDownFrom);

displayTime(time, timer.getCountDownFromInSeconds());

const {radiusInPixels, circumferenceInPixels} = getCircleDimensions(svg.clientWidth);

circle.setAttribute('r', radiusInPixels);
circle.setAttribute('stroke-dasharray', circumferenceInPixels);
circle.setAttribute('stroke-dashoffset', 0);

const keyframes = [
  { opacity: 0 },
  { opacity: 1, strokeDashoffset: 0, offset: .66 },
  { strokeDashoffset: circumferenceInPixels }
];

const animation = circle.animate(keyframes, {
    duration: 4000,
    easing: 'ease-in-out',
  });
  animation.onfinish = () => {
    startTimer();
  }
  
  pauseButton.addEventListener('click', function(){
    if(!timer.getIsPaused()){
      pause.innerHTML = 'Resume';
      timer.pause();
  } else {
    pause.innerHTML = 'Pause';
    timer.resume();
  }
});

function step() {
  if(timer.getIsPaused()) {
    window.requestAnimationFrame(step);
    return;
  }

  const timeLeft = timer.getTimeLeft();
  const secondsLeft = new Date(timeLeft).getSeconds();
  displayTime(time, secondsLeft);
  
  const distanceRemaining = calculateDistanceRemaining(svg.clientWidth, timeLeft, timer.getCountDownFromInSeconds() * 1000);
  circle.setAttribute('stroke-dashoffset', distanceRemaining);

  if(timeLeft > 0){
    window.requestAnimationFrame(step);
  } else {
    displayTime(time, 0);
    return;
  }
}

function startTimer() {
  timer.start();
  window.requestAnimationFrame(step);
}

function displayTime(el, time){
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (time % 60).toString()
    .padStart(2, '0');

  el.innerHTML = `${minutes}:${seconds}`;
}

function calculateDistanceRemaining(svgWidth, timeLeft, startTime){
  const {circumferenceInPixels} = getCircleDimensions(svgWidth);
  const pctComplete = timeLeft / startTime;
  
  return Math.floor(pctComplete * circumferenceInPixels);
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


function createTimer(){
  countDownFromInSeconds = countDownFrom;
  secondsLeft = countDownFrom;
  startTime = null;
  endTime = null;
  isPaused = false;
  pauseStart = null;


  const getCountDownFromInSeconds = () => countDownFromInSeconds;
  const getEndTime = () => endTime;
  const getIsPaused = () => isPaused;
  const getTimeLeft = () => endTime - new Date().getTime();

  const start = () => {
    startTime = new Date().getTime();
    endTime = startTime + countDownFromInSeconds * 1000;
  }

  const pause = () => {
    isPaused = true;
    pauseStart = new Date().getTime();
  }

  const resume = () => {
    isPaused = false;
    const pauseLength = new Date().getTime() - pauseStart;
    endTime = endTime + pauseLength;
    pauseStart = null;
  }
  
  return {
    getCountDownFromInSeconds,
    getTimeLeft,
    getEndTime,
    getIsPaused,
    start,
    pause,
    resume,
  }
}
