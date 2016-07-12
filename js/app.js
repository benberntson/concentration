(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var gameState        = require('./src/game-state'),
    stateMachine     = require('./src/state-machine'),
    createElement    = require('./src/create-element'),
    landingAnimation = require('./src/landing-animation')

landingAnimation()

console.log(gameState)

},{"./src/create-element":2,"./src/game-state":4,"./src/landing-animation":6,"./src/state-machine":7}],2:[function(require,module,exports){
module.exports = (nodeName) => document.createElement(nodeName);

},{}],3:[function(require,module,exports){
var generateMenu = require('./generate-menu')


module.exports = function() {
  removeLandingPageItems()
  generateMenu()
}

function removeLandingPageItems(){
  var landingHeader = document.getElementsByClassName('landing-header')[0]
  var headerParent = landingHeader.parentNode

  var startLink = document.getElementsByClassName('start-link')[0]
  var linkParent = startLink.parentNode

  headerParent.removeChild(landingHeader)
  linkParent.removeChild(startLink)
}

},{"./generate-menu":5}],4:[function(require,module,exports){
module.exports = {
  preStart: "the game has yet to be started",
  begOfTurn: "begining of player's turn",
  oneCardSelected: "one card had been selected",
  secondCardSelected: "second card has been selected",
  gameOver: "the game is over"
}

},{}],5:[function(require,module,exports){
var createElement = require('./create-element'),
    NUM_OF_DIFFICULTIES = 3,
    DIFFICULTIES = ['easy','medium','hard']

module.exports = () => {
  insertMenuIntoApp()
}

function insertMenuIntoApp(){
  var app = document.getElementById('app')
  app.appendChild(makeMenu())
}

function makeMenu(){
  var menuDiv = createElement('div')
  menuDiv.classList.add('menu')
  var header = createElement('h4')
  header.innerHTML = "Pick a Difficulty"
  header.style.textAlign = 'center'
  menuDiv.appendChild(header)
  var options = DIFFICULTIES.map(createDifficultyOption)
  options.forEach(option => menuDiv.appendChild(option))
  return menuDiv
}


function createDifficultyOption(difficultyLevel){
  if(DIFFICULTIES.indexOf(difficultyLevel) === -1){
    throw new error('Invalid difficulty level!')
  } else if (typeof difficultyLevel !== 'string'){
    throw new error('Invalid difficulty level!')
  }

  var difficultyButton = createElement('input')
  difficultyButton.type = 'radio'
  difficultyButton.name = 'difficulty'
  difficultyButton.value = difficultyLevel
  difficultyButton.id = difficultyLevel

  var label = createElement('label')
  label.htmlFor = difficultyLevel
  label.appendChild(difficultyButton)
  var labelText = document.createTextNode(difficultyLevel)
  label.appendChild(labelText)

  return label
}

},{"./create-element":2}],6:[function(require,module,exports){
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

},{"./difficulty-menu-transition.js":3}],7:[function(require,module,exports){
var gameState = require('./game-state')

module.exports = function(){

  switch(state){
  case gameState.preStart:
    console.log('the game has started')
    //run initializations
    state = gameState.begOfTurn;
    break;
  case gameState.begOfTurn:
    console.log('The turn has begun.')
    //flips over first card


    break;
  case gameState.oneCardSelected:
    console.log('first card selected')
    //if everything is okay, flip over second card
    //flip over second card



    break;
  case gameState.secondCardSelected:
    console.log('second card selected')
    //check to see if is a match
    //if it's a match add to the score
    //then check to see if the game has been won,
    //    and go to gameState.gameOver

    //else, goto gameState.begOfTurn

    break;
  case gameState.gameOver:
    //present user with option to continue

    console.log('game is over')
    break;
  }

}

},{"./game-state":4}]},{},[1]);
