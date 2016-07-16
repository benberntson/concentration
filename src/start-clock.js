var updateInternalTime = require('./update-internal-time')

module.exports = () => {
  window.state.startTime = Date.now()
  window.state.timeElapsed = 0
  window.state.initialTimeRemaining = (window.state.difficultyLevel === 'easy') ?
    (20 * 60000) : (window.state.difficultyLevel === 'medium') ?
    (40 * 60000) : (60 * 60000)
  window.state.timeRemaining = window.state.initialTimeRemaining


  var clockDiv = document.createElement('div'),
      app = document.getElementById('app')

  clockDiv.innerHTML = `<h3>Time Remaining</h3>
<p><span id="minutes"></span>:<span id="seconds"></span></p>
<p>Matches:<span id="matches"></span></p>
`
  clockDiv.classList.add('clock')
  clockDiv.style.height = '200 px'
  app.appendChild(clockDiv)
  updateInternalTime()
}
