var createElement = require('./create-element'),
    NUM_OF_DIFFICULTIES = 3,
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

  var label = createElement('label')
  label.htmlFor = difficultyLevel
  label.appendChild(difficultyButton)
  var labelText = document.createTextNode(difficultyLevel)
  label.appendChild(labelText)

  return label
}
