module.exports = () => {
  return(window.state.isWin = (window.state.matches
                               === window.state.deck.length / 2))
}
