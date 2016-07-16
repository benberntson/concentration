module.exports = () => {
  return global.state.deck.every(card => card.matched)
}
