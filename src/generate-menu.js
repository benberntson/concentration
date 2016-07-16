var createElement = require('./create-element'),
    removeMenu = require('./remove-menu'),
    generateGame = require('./generate-menu'),
    NUM_OF_DIFFICULTIES = 3,
    displayDeckAndDeal = require('./display-deck-and-deal'),
    DIFFICULTIES = ['easy','medium','hard']

module.exports = () => {
  insertMenuIntoApp()
}

function insertMenuIntoApp(){
  var app = document.getElementById('app')
  app.appendChild(makeMenu())
}

function makeMenu(){
  var menuDiv = createElement('div')
  menuDiv.classList.add('menu')
  var header = createElement('h4')
  header.innerHTML = "Pick a Difficulty"
  header.style.textAlign = 'center'
  menuDiv.appendChild(header)
  var options = DIFFICULTIES.map(createDifficultyOption)
  options.forEach(option => menuDiv.appendChild(option))
  var startGameButton = createElement('button')
  startGameButton.id = 'startGameButton'
  startGameButton.classList.add('inactive-start-game-button')
  var startGameText = document.createTextNode('Start Game!')
  startGameButton.appendChild(startGameText)

  startGameButton.addEventListener('click', () => {
    if(startGameButton.disabled) {
      console.log('select an option')
    } else {

      var rbuttons = document.querySelectorAll('div.menu input[type=radio]')

      Array.prototype.forEach.call(rbuttons,(button) => {
        if(button.checked){
          window.state.difficultyLevel = button.value
        }
      })

      startGame(window.state.difficultyLevel)
    }
  })

  menuDiv.appendChild(startGameButton)
  return menuDiv
}

function createDifficultyOption(difficultyLevel){
  if(DIFFICULTIES.indexOf(difficultyLevel) === -1){
    throw new error('Invalid difficulty level!')
  } else if (typeof difficultyLevel !== 'string'){
    throw new error('Invalid difficulty level!')
  }

  var difficultyButton = createElement('input')
  difficultyButton.type = 'radio'
  difficultyButton.name = 'difficulty'
  difficultyButton.value = difficultyLevel
  difficultyButton.id = difficultyLevel
  difficultyButton.checked = false
  difficultyButton.addEventListener(
    'change',
    function (){
      var rbuttons = document.querySelectorAll('div.menu input[type=radio]')
      var buttonIsChecked = false
      Array.prototype.forEach.call(rbuttons, (button) => {
        var label = document.querySelector(`label[for=${button.id}]`)
        if(button.checked) {
          label.style.textDecoration = 'underline'
          buttonIsChecked = true
        } else {
          label.style.textDecoration = 'none'
        }
      })
      if(buttonIsChecked){
        var startGameButton = document.getElementById('startGameButton')
        startGameButton.disabled = false
        startGameButton.classList.remove('inactive-start-game-button')
        startGameButton.classList.add('active-start-game-button')
      }
    }
  )
  var label = createElement('label')
  label.htmlFor = difficultyLevel
  label.appendChild(difficultyButton)
  var labelText = document.createTextNode(difficultyLevel)
  label.appendChild(labelText)

  return label
}

function startGame(gameDifficulty){
  removeMenu()
  displayDeckAndDeal('easy')
}
