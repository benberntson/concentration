module.exports = (card) => {
  return (card.suit === window.state.firstCard.suit &&
          card.number === window.state.firstCard.number)
}
