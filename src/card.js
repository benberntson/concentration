'use strict'
const CARDS_PATH = 'img/cards/'
const IMG_EXTENSION = '.svg'
const BACK_IMG = 'back.png'

function Card(suit,number){
  this.suit = suit
  this.color = (suit === 'diamonds' || suit === 'hearts') ? 'red' : 'black'
  this.number = number
  this.faceImg = imgSrc(suit,number)
  this.faceDown = true
  this.backImg = CARDS_PATH + BACK_IMG
  this.matched = false
  this.id = suit + '_' + number
}

Card.prototype.flip = function(){
  this.faceDown = !this.faceDown
}

function imgSrc(suit,cardNumber){
  var imgSrc = ''
  switch(suit){
  case 'spades':
    imgSrc = '0_'
    break;
  case 'hearts':
    imgSrc = '1_'
    break;
  case 'clubs':
    imgSrc = '2_'
    break;
  case 'diamonds':
    imgSrc = '3_'
    break
  case 'joker':
    imgSrc = '4_'
    break
  }
  return CARDS_PATH + imgSrc + cardNumber + IMG_EXTENSION
}


module.exports = Card
