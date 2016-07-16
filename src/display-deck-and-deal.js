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
