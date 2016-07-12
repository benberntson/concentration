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
