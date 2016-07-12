var generateMenu = require('./generate-menu')


module.exports = function() {
  removeLandingPageItems()
  generateMenu()
}

function removeLandingPageItems(){
  var landingHeader = document.getElementsByClassName('landing-header')[0]
  var headerParent = landingHeader.parentNode

  var startLink = document.getElementsByClassName('start-link')[0]
  var linkParent = startLink.parentNode

  headerParent.removeChild(landingHeader)
  linkParent.removeChild(startLink)
}
