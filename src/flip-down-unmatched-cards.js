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
