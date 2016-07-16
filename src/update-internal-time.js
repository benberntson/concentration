module.exports = () => {
  var minutes = document.getElementById('minutes')
  var seconds = document.getElementById('seconds')

  window.state.clockInterval = setInterval(()=>{
    window.state.timeElapsed = Date.now() - window.state.startTime
    window.state.timeRemaining = window.state.initialTimeRemaining - window.state.timeElapsed
    minutes.innerHTML = minutesString(window.state.timeRemaining)
    seconds.innerHTML = secondsString(window.state.timeRemaining)

    if(window.state.timeRemaining <= 0){
      clearInterval(window.state.clockInterval)
    }

  },100)
}

function doubleDigitStr(timeNumber){
  return (timeNumber < 10) ? '0' + timeNumber : timeNumber.toString()
}

function minutesElapsed(ms){
  return Math.floor(ms/60000)
}

function secondsElapsed(ms){
  return Math.floor((ms - (minutesElapsed(ms) * 60000)) / 1000)
}

function minutesString(ms){
  return doubleDigitStr(minutesElapsed(ms))
}

function secondsString(ms){
  return doubleDigitStr(secondsElapsed(ms))
}
