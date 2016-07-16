(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var gameState        = require('./src/game-state'),
    stateMachine     = require('./src/state-machine'),
    createElement    = require('./src/create-element'),
    landingAnimation = require('./src/landing-animation')

landingAnimation()

},{"./src/create-element":4,"./src/game-state":9,"./src/landing-animation":14,"./src/state-machine":18}],2:[function(require,module,exports){
'use strict'
const CARDS_PATH = 'img/cards/'
const IMG_EXTENSION = '.svg'
const BACK_IMG = 'back.png'

function Card(suit,number){
  this.suit = suit
  this.color = (suit === 'diamonds' || suit === 'hearts') ? 'red' : 'black'
  this.number = number
  this.faceImg = imgSrc(suit,number)
  this.faceDown = true
  this.backImg = CARDS_PATH + BACK_IMG
  this.matched = false
  this.id = suit + '_' + number
}

Card.prototype.flip = function(){
  this.faceDown = !this.faceDown
}

function imgSrc(suit,cardNumber){
  var imgSrc = ''
  switch(suit){
  case 'spades':
    imgSrc = '0_'
    break;
  case 'hearts':
    imgSrc = '1_'
    break;
  case 'clubs':
    imgSrc = '2_'
    break;
  case 'diamonds':
    imgSrc = '3_'
    break
  case 'joker':
    imgSrc = '4_'
    break
  }
  return CARDS_PATH + imgSrc + cardNumber + IMG_EXTENSION
}


module.exports = Card

},{}],3:[function(require,module,exports){
var Card = require('./card'),
    VALID_OPTIONS = ['easy','medium','hard'],
    EASY_CARD_LIMIT = 10,
    MEDIUM_CARD_LIMIT = 28,
    HARD_CARD_LIMIT = 52


module.exports = function(difficultyOption){
  //make sure option passed is valid
  if(VALID_OPTIONS.indexOf(difficultyOption) === -1){
    throw new Error('invalid difficulty option')
  }
  var deck = []

  switch(difficultyOption){
  case 'easy':
    deck = generateEasyDeck()
    break;
  case 'medium':
    deck = generateMediumDeck()
    break;
  case 'hard':
    deck = generateHardDeck()
    break;
  }

  return deck
}


//the game, on easy mode, only has ten cards
function generateEasyDeck(){
  var deck = []
  for(var i = 0; i < EASY_CARD_LIMIT / 2; ++i){
    deck.push(
      new Card('spades',i + 1)
    )
    deck.push(
      new Card('clubs',i + 1)
    )
  }
  return deck
}

function generateDifficultDeck(cardLimit){
  cardLimit = cardLimit || HARD_CARD_LIMIT
  var deck = []
  for(var i = 0; i < cardLimit / 4; ++i){
    deck.push(
      new Card('hearts',i + 1)
    )
    deck.push(
      new Card('spades',i + 1)
    )
    deck.push(
      new Card('clubs',i + 1)
    )
    deck.push(
      new Card('diamonds',i + 1)
    )
  }
  return deck
}

function generateMediumDeck(){
  return generateDifficultDeck(MEDIUM_CARD_LIMIT)
}

function generateHardDeck(){
  return generateDifficultDeck(HARD_CARD_LIMIT)
}

},{"./card":2}],4:[function(require,module,exports){
module.exports = (nodeName) => document.createElement(nodeName);

},{}],5:[function(require,module,exports){
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

},{"./generate-menu":10}],6:[function(require,module,exports){
var createDeck = require('./create-deck'),
    shuffle = require('./shuffle'),
    defaultState = require('./game-state'),
    isMatch = require('./is-match'),
    isGameOver = require('./is-game-over'),
    isWin = require('./is-win'),
    flipDownUnmatchedCards = require('./flip-down-unmatched-cards'),
    startClock = require('./start-clock'),
    displayGameOver = require('./display-game-over')

const BACK_IMG = "img/cards/back.png"
window.state = defaultState

module.exports = function(){
  window.state.deck = createDeck(window.state.difficultyLevel)
  window.state.deck = shuffle(window.state.deck)
  layoutCards(window.state.deck)
}
/**
 * layoutCards
 *
 * lays out the cards on the table
 *
 */
function layoutCards(deck){
  var app = document.getElementById('app')

  /**
   * generateCardElements
   *
   * Generates a bunch of card elements and adds the appropriate
   * event listeners for the elements
   *
   */
  var generateCardElements = (card) => {
    var cardImg = document.createElement('img')
    cardImg.src = card.backImg//Switch to commented out code
    //cardImg.src = (card.faceDown) ? card.backImg : card.faceImg
    cardImg.height = '200'
    cardImg.width = '120'
    cardImg.classList.add('card')
    cardImg.id = card.suit + '_' + card.number

    /**
     * cardClickHandler
     *
     * Handles the click event of the card.
     */
    var cardClickHandler = (e) => {
      if(card.matched){ return }
      if(window.state.cardsFlipped >= 2){ return }
      if(card.faceDown){
        card.flip()
        window.state.cardsFlipped += 1
        if(window.state.firstCard){
          window.state.secondCard = card
        } else if(window.state.secondCard) {
          window.state.firstCard = card
        } else if(window.state.cardsFlipped === 1) {
          window.state.firstCard = card
        }

      } else {
        card.flip()
        //update state
        window.state.cardsFlipped -= 1


        if(window.state.cardsFlipped === 1 || window.state.cardsFlipped === 0) {
          console.log(e.target)
          if(window.state.firstCard
             && e.target.id === window.state.firstCard.id){
            console.log(e.target)
            window.state.firstCard = null
            console.log(window.state);
          } else if(window.state.secondCard
                    && e.target.id === window.state.secondCard.id){
            console.log(e.target)
            window.state.secondCard = null
            console.log(window.state);
          }
        } else {
          throw Error('number of cards flipped is less than zero')
        }
      }//end if-else block

      cardImg.classList.remove('second-half-flip')
      cardImg.classList.remove('first-half-flip')

      /**
       * flipUp
       *
       * flips the card up and changes to img src to the proper face
       *
       */
      var flipUp = () => {
        cardImg.classList.remove('second-half-flip')
        cardImg.classList.remove('first-half-flip')

        if(card.faceDown) {
          cardImg.src = card.backImg
        } else {
          cardImg.src = card.faceImg
        }

        //cardImg.addEventListener('animationend',flipDown)
        cardImg.classList.add('second-half-flip')

        var flipDown = () => setTimeout(
          () => {
            cardImg.classList.remove('second-half-flip')
            if(window.state.cardsFlipped === 2 && isMatch()){

              cardImg.removeEventListener('click',cardClickHandler)
              var otherCard = window.state.firstCard
              otherCard = document.
                querySelector(`img[src="${otherCard.faceImg}"]`)
              otherCard.removeEventListener('click',cardClickHandler)
              window.state.cardsFlipped -= 2
              window.state.firstCard.matched = true
              window.state.secondCard.matched = true
              window.state.firstCard = null
              window.state.secondCard = null
              window.state.matches += 1

              document.getElementById('matches').innerHTML =
                window.state.matches

              if(isWin()){
                alert('you win!')
                displayGameOver()
              }
            } else if(window.state.cardsFlipped === 2) {//if not a match
              setTimeout(flipDownUnmatchedCards,2000)
            }
          },
          133
        )
        cardImg.addEventListener('animationend',flipDown)
        cardImg.addEventListener('webkitAnimationEnd',flipDown)
      }
      cardImg.addEventListener('animationend',flipUp)
      cardImg.addEventListener('webkitAnimationEnd',flipUp)
      cardImg.classList.add('first-half-flip')
    }
    cardImg.addEventListener('click',cardClickHandler)
    return cardImg
  }
  //map the the deck cards to card elemtns
  var cardElements = deck.map(generateCardElements)

  //append cards
  cardElements.forEach((cardElement) => {
    app.appendChild(cardElement)
  })
  startClock()
}

},{"./create-deck":3,"./display-game-over":7,"./flip-down-unmatched-cards":8,"./game-state":9,"./is-game-over":11,"./is-match":12,"./is-win":13,"./shuffle":16,"./start-clock":17}],7:[function(require,module,exports){
module.exports = function() {
  var gameOverDisplay = document.createElement('div')
  gameOverDisplay.innerHTML = `
<h1> GAME OVER </h1>
<p>You ${window.state.isWin ? "win" : "lose"}</p>
`
  gameOverDisplay.classList.add('game-over')
  document.querySelector('body').appendChild(gameOverDisplay)
}

},{}],8:[function(require,module,exports){
const BACK_IMG_SRC = 'img/cards/back.png'

module.exports = function(){
  if(window.state.firstCard !== null){
    flipCard(window.state.firstCard)
    window.state.firstCard.faceDown = true
    window.state.firstCard = null
    window.state.cardsFlipped -= 1
  }
  if(window.state.secondCard !== null){
    flipCard(window.state.secondCard)
    window.state.secondCard.faceDown = true
    window.state.secondCard = null
    window.state.cardsFlipped -= 1
  }
}

function flipCard(card){
  var cardElement = document.getElementById(`${card.id}`)
  var flipUp = () => {
    cardElement.classList.remove('second-half-flip')
    cardElement.classList.remove('first-half-flip')
    cardElement.src = BACK_IMG_SRC
    cardElement.classList.add('second-half-flip')
  }
  cardElement.addEventListener('animationend',flipUp)
  cardElement.addEventListener('webkitAnimationEnd',flipUp)
  cardElement.classList.add('first-half-flip')
}

},{}],9:[function(require,module,exports){
var defaultState = {
  difficultyLevel: 'easy',
  deck:            [],
  cardsFlipped:    0,
  firstCard:       null,
  secondCard:      null,
  matches:         0,
  isWin:           false
}

module.exports = defaultState

},{}],10:[function(require,module,exports){
var createElement = require('./create-element'),
    removeMenu = require('./remove-menu'),
    generateGame = require('./generate-menu'),
    NUM_OF_DIFFICULTIES = 3,
    displayDeckAndDeal = require('./display-deck-and-deal'),
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
  var startGameButton = createElement('button')
  startGameButton.id = 'startGameButton'
  startGameButton.classList.add('inactive-start-game-button')
  var startGameText = document.createTextNode('Start Game!')
  startGameButton.appendChild(startGameText)

  startGameButton.addEventListener('click', () => {
    if(startGameButton.disabled) {
      console.log('select an option')
    } else {

      var rbuttons = document.querySelectorAll('div.menu input[type=radio]')

      Array.prototype.forEach.call(rbuttons,(button) => {
        if(button.checked){
          window.state.difficultyLevel = button.value
        }
      })

      startGame(window.state.difficultyLevel)
    }
  })

  menuDiv.appendChild(startGameButton)
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
  difficultyButton.checked = false
  difficultyButton.addEventListener(
    'change',
    function (){
      var rbuttons = document.querySelectorAll('div.menu input[type=radio]')
      var buttonIsChecked = false
      Array.prototype.forEach.call(rbuttons, (button) => {
        var label = document.querySelector(`label[for=${button.id}]`)
        if(button.checked) {
          label.style.textDecoration = 'underline'
          buttonIsChecked = true
        } else {
          label.style.textDecoration = 'none'
        }
      })
      if(buttonIsChecked){
        var startGameButton = document.getElementById('startGameButton')
        startGameButton.disabled = false
        startGameButton.classList.remove('inactive-start-game-button')
        startGameButton.classList.add('active-start-game-button')
      }
    }
  )
  var label = createElement('label')
  label.htmlFor = difficultyLevel
  label.appendChild(difficultyButton)
  var labelText = document.createTextNode(difficultyLevel)
  label.appendChild(labelText)

  return label
}

function startGame(gameDifficulty){
  removeMenu()
  displayDeckAndDeal('easy')
}

},{"./create-element":4,"./display-deck-and-deal":6,"./generate-menu":10,"./remove-menu":15}],11:[function(require,module,exports){
(function (global){
module.exports = () => {
  return global.state.deck.every(card => card.matched)
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(require,module,exports){
module.exports = () => {
  var firstCard = window.state.firstCard,
      secondCard = window.state.secondCard

  if(firstCard === null) return false;
  if(secondCard === null) return false;

  if(firstCard.faceDown) return false;
  if(secondCard.faceDown) return false;

  return (firstCard.number === secondCard.number &&
          firstCard.color === secondCard.color)

}

},{}],13:[function(require,module,exports){
module.exports = () => {
  return(window.state.isWin = (window.state.matches
                               === window.state.deck.length / 2))
}

},{}],14:[function(require,module,exports){
var transitionToMenu = require('./difficulty-menu-transition.js')

module.exports = function() {
  var landingHeader = document.getElementsByClassName('landing-header')[0]
  landingHeader.addEventListener('transitionend',makeStartLinkVisible)
  landingHeader.addEventListener('webkitTransitionEnd',makeStartLinkVisible)
  setTimeout(()=>{landingHeader.style.top = '450px';},100);
}

function makeStartLinkVisible() {
  var startLink = document.getElementsByClassName('start-link')[0]
  startLink.style.opacity = '1'
  startLink.style.cursor = 'pointer'
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

},{"./difficulty-menu-transition.js":5}],15:[function(require,module,exports){
module.exports = function(){
  var menu = document.querySelector('.menu')
  var removeMenu = () => {
    menu.parentNode.removeChild(menu)
  }
  menu.addEventListener('animationend',removeMenu)
  menu.addEventListener('webkitAnimationEnd', removeMenu)
  menu.classList.add('animated-exit')
}

},{}],16:[function(require,module,exports){
module.exports = (deck) => {
  for(var n = deck.length - 1; n--;){
    var cardPos = Math.floor(n * Math.random())
    var swappableCard = deck[cardPos]
    var topCard = deck[n]
    deck[n] = swappableCard
    deck[cardPos] = topCard
  }
  return deck
}

},{}],17:[function(require,module,exports){
var updateInternalTime = require('./update-internal-time')

module.exports = () => {
  window.state.startTime = Date.now()
  window.state.timeElapsed = 0
  window.state.initialTimeRemaining = (window.state.difficultyLevel === 'easy') ?
    (20 * 60000) : (window.state.difficultyLevel === 'medium') ?
    (40 * 60000) : (60 * 60000)
  window.state.timeRemaining = window.state.initialTimeRemaining


  var clockDiv = document.createElement('div'),
      app = document.getElementById('app')

  clockDiv.innerHTML = `<h3>Time Remaining</h3>
<p><span id="minutes"></span>:<span id="seconds"></span></p>
<p>Matches:<span id="matches"></span></p>
`
  clockDiv.classList.add('clock')
  clockDiv.style.height = '200 px'
  app.appendChild(clockDiv)
  updateInternalTime()
}

},{"./update-internal-time":19}],18:[function(require,module,exports){
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

},{"./game-state":9}],19:[function(require,module,exports){
module.exports = () => {
  var minutes = document.getElementById('minutes')
  var seconds = document.getElementById('seconds')

  window.state.clockInterval = setInterval(()=>{
    window.state.timeElapsed = Date.now() - window.state.startTime
    window.state.timeRemaining = window.state.initialTimeRemaining - window.state.timeElapsed
    minutes.innerHTML = minutesString(window.state.timeRemaining)
    seconds.innerHTML = secondsString(window.state.timeRemaining)

    if(window.state.timeRemaining <= 0){
      clearInterval(window.state.clockInterval)
    }

  },100)
}

function doubleDigitStr(timeNumber){
  return (timeNumber < 10) ? '0' + timeNumber : timeNumber.toString()
}

function minutesElapsed(ms){
  return Math.floor(ms/60000)
}

function secondsElapsed(ms){
  return Math.floor((ms - (minutesElapsed(ms) * 60000)) / 1000)
}

function minutesString(ms){
  return doubleDigitStr(minutesElapsed(ms))
}

function secondsString(ms){
  return doubleDigitStr(secondsElapsed(ms))
}

},{}]},{},[1]);
