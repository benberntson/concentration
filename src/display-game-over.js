module.exports = function() {
  var gameOverDisplay = document.createElement('div')
  gameOverDisplay.innerHTML = `
<h1> GAME OVER </h1>
<p>You ${window.state.isWin ? "win" : "lose"}</p>
`
  gameOverDisplay.classList.add('game-over')
  document.querySelector('body').appendChild(gameOverDisplay)
}
