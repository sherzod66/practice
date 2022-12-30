"use strict"

const tablo = document.querySelector('.tablo >span')
const loos = document.querySelector('.loos')
const button = document.querySelector('.button')
const user__name = document.querySelector('.user__name')
const user__money = document.querySelector('.user__money > p')
const input = document.querySelector('.input')
const moneyError = document.querySelector('.no-money');
const dontBid = document.querySelector('.no-bid');
const userWin = document.querySelector('.win-game');
const userWinInfo = document.querySelector('.win-game__body');

//const nameUser = prompt("Введи имя: ")

const userInfo = {
	name: '',
	money: 20000
}

const rachetArray = [];

user__money.textContent = userInfo.money
let rachet = 1.00
let bid;
let randomSecond;


const gameBank = [
	{ money: 500000 }
]

button.addEventListener('click', function (event) {
	if (!event.target.closest('._js-active-bid')) {
		if (!loos.classList.contains('_js-tablo-active')) {
			if (input.value >= 1400 && userInfo.money >= input.value) {
				let random = Math.random() * 10;
				let randomRound = Math.round(random * 100) / 100;
				loos.classList.remove('_js-loos');
				console.log(randomRound);
				if (randomRound <= 0.90) {
					randomRound = 1.10
				} else if (gameBank[0].money < 200000) {
					let randomloss = Math.random() * 2;
					randomRound = Math.round(randomloss * 100) / 100;
					console.log('Я знаю ')
					if (randomRound <= 0.90) {
						randomRound = 1.10
					}
				}
				this.classList.add('_js-active-bid');
				loos.classList.add('_js-tablo-active');
				if (event.target.closest('._js-active-bid')) {
					bid = +input.value;
					gameBank[0].money += bid;
					console.log(gameBank[0].money);
					userInfo.money = userInfo.money - bid;
					user__money.textContent = userInfo.money;
					let intervalId = setInterval(e => {
						if (rachet < randomRound) {
							let c = rachet + 0.02 + Number.EPSILON;
							rachet = Math.round(c * 100) / 100;
							rachetArray.push(rachet);
							tablo.textContent = rachet;
							//console.log(rachetArray);
						} else if (rachet >= randomRound) {
							clearInterval(intervalId)
							loos.classList.add('_js-loos')
							this.classList.remove('_js-active-bid');
							rachet = 1.00;
							bid = '';
							loos.classList.remove('_js-tablo-active');
							rachetArray.length = 0;
							//console.log(rachet);
							//console.log(bid);
							//console.log(rachetArray.length);
						}
					}, 100)
				}
			} else {
				noMoney()
			}
		} else {
			gameDontStope()
		}
	} else {
		let win = bid * Math.round(rachetArray[rachetArray.length - 1] * 100) / 100;
		gameBank[0].money -= win;
		userInfo.money += win;
		gameWin()
		this.classList.remove('_js-active-bid');

		user__money.textContent = userInfo.money;
	}
});




function noMoney() {
	moneyError.classList.add('_js-money');
	setTimeout(e => moneyError.classList.remove('_js-money'), 1000);
}
function gameDontStope() {
	dontBid.classList.add('_js-stop');
	setTimeout(e => dontBid.classList.remove('_js-stop'), 1000);
}
function gameWin() {
	userWin.classList.add('_js-win');
	userWinInfo.firstElementChild.textContent = `Кэф: ${rachetArray[rachetArray.length - 1]}`;
	userWinInfo.lastElementChild.textContent = `Выиграшь: ${bid * Math.round(rachetArray[rachetArray.length - 1] * 100) / 100}`;
	setTimeout(e => userWin.classList.remove('_js-win'), 4000);
}

function animate() {
	requestAnimationFrame(animate);

}
//animate()
