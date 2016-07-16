module.exports = function(){
  var menu = document.querySelector('.menu')
  var removeMenu = () => {
    menu.parentNode.removeChild(menu)
  }
  menu.addEventListener('animationend',removeMenu)
  menu.addEventListener('webkitAnimationEnd', removeMenu)
  menu.classList.add('animated-exit')
}
