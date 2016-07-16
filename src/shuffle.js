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
