const svg = document.querySelector('#progress-bar');
const circle = document.querySelector('#progress-bar>#bar');

const dashArraySlider = document.querySelector('#array-range');
const dashOffsetSlider = document.querySelector('#offset-range');

const dashArrayLabel = document.querySelector('#stroke-dasharray-label');
const dashOffsetLabel = document.querySelector('#stroke-dashoffset-label');

dashArrayLabel.innerHTML = dashArraySlider.value;
dashOffsetLabel.innerHTML = dashOffsetSlider.value;

dashArraySlider.addEventListener('input', function(e){
  dashArrayLabel.innerHTML = e.target.value;
  circle.setAttribute('stroke-dasharray', e.target.value);
});

dashOffsetSlider.addEventListener('input', function(e){
  dashOffsetLabel.innerHTML = e.target.value;
  circle.setAttribute('stroke-dashoffset', e.target.value);
});

function getCircleDimensions(width){
  const gapFromEdgeInPixels = 6;    // we want 3px on each side of the edge of the circle
  const radiusInPixels = (width / 2) - gapFromEdgeInPixels;
  const circumferenceInPixels = 2 * Math.PI * radiusInPixels;
  return {  
    radiusInPixels,
    circumferenceInPixels
  }
}