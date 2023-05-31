const svgEl = document.querySelector('#progress-bar')
const circleEl = document.querySelector('#progress-bar>#bar')
const timeEl = document.querySelector('#time')
const pauseEl = document.querySelector('#pause')
const pauseButtonEl = document.querySelector('.pomodoro')

const countDownFrom = 1 * 60
const gapFromEdgeInPixels = 6 // we want 3px on each side of the edge of the circle

class Timer {
  constructor(countDownFrom) {
    this.countDownFromInSeconds = countDownFrom
    this.startTime = null
    this.endTime = null
    this.isPaused = false
    this.pauseStart = null
  }

  get timeLeft() {
    return this.endTime - new Date().getTime()
  }

  start = () => {
    this.startTime = new Date().getTime()
    this.endTime = this.startTime + this.countDownFromInSeconds * 1000
    this._step()
  }

  pause() {
    this.isPaused = true
    this.pauseStart = new Date().getTime()
  }

  resume() {
    this.isPaused = false
    const pauseLength = new Date().getTime() - this.pauseStart
    this.endTime = this.endTime + pauseLength
    this.pauseStart = null
  }

  _step = () => {
    if (this.isPaused) {
      window.requestAnimationFrame(this._step)
      return
    }

    // this.endTime - new Date().getTime()
    const timeLeft = this.timeLeft
    const secondsLeft = new Date(timeLeft).getSeconds()
    displayTime(timeEl, secondsLeft)

    // get circle dimensions
    const radiusInPixels = svgEl.clientWidth / 2 - gapFromEdgeInPixels
    const circumferenceInPixels = 2 * Math.PI * radiusInPixels

    const pctComplete = timeLeft / (this.countDownFromInSeconds * 1000)

    const distanceRemaining = Math.floor(pctComplete * circumferenceInPixels)

    circleEl.setAttribute('stroke-dashoffset', distanceRemaining)

    if (timeLeft > 0) {
      window.requestAnimationFrame(this._step)
    } else {
      displayTime(timeEl, 0)
      return
    }
  }
}


window.requestAnimationFrame(doSomething)

function doSomething(){
  // do some stuff

  doSomething()
}

//timer
const timer = new Timer(countDownFrom)

displayTime(timeEl, timer.countDownFromInSeconds)

const radiusInPixels = svgEl.clientWidth / 2 - gapFromEdgeInPixels
const circumferenceInPixels = 2 * Math.PI * radiusInPixels

circleEl.setAttribute('r', radiusInPixels)
circleEl.setAttribute('stroke-dasharray', circumferenceInPixels)
circleEl.setAttribute('stroke-dashoffset', 0)


const keyframes = [
  { opacity: 0 },
  { opacity: 1, strokeDashoffset: 0, offset: 0.66 },
  { strokeDashoffset: circumferenceInPixels },
]

const animation = circleEl.animate(keyframes, {
  duration: 4000,
  easing: 'ease-in-out',
})
animation.onfinish = () => {
  timer.start()
}

pauseButtonEl.addEventListener('click', function () {
  if (!timer.isPaused) {
    pauseEl.innerHTML = 'Resume'
    timer.pause()
  } else {
    pauseEl.innerHTML = 'Pause'
    timer.resume()
  }
})

function displayTime(el, time) {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (time % 60).toString().padStart(2, '0')

  el.innerHTML = `${minutes}:${seconds}`
}
