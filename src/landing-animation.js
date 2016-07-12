var transitionToMenu = require('./difficulty-menu-transition.js')

module.exports = function() {
  var landingHeader = document.getElementsByClassName('landing-header')[0]
  landingHeader.addEventListener('transitionend',makeStartLinkVisible)
  landingHeader.addEventListener('webkitTransitionEnd',makeStartLinkVisible)
  landingHeader.style.top = '450px'
}

function makeStartLinkVisible() {
  var startLink = document.getElementsByClassName('start-link')[0]
  startLink.style.opacity = '1'
  startLink.addEventListener('click',transitionToMenu)
  startLink.addEventListener('transitionend',pulseStartLink)
  startLink.addEventListener('webkitTransitionEnd',pulseStartLink)
}

function pulseStartLink() {
  var startLink = document.getElementsByClassName('start-link')[0]
  var currentOpacity = startLink.style.opacity

  if(currentOpacity === '1'){
    startLink.style.opacity = '0'
  } else {
    startLink.style.opacity = '1'
  }

}
