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
