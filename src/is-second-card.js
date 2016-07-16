module.exports = (card) => {
  return (card.suit === window.state.secondCard.suit &&
          card.number === window.state.secondCard.number)
}
