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
