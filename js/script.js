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
	money: 100000
}

const rachetArray = [];
const rachetHistory = [];

user__money.textContent = userInfo.money
let rachet = 1.00
let bid;
let randomSecond;


const gameBank = [
	{ money: 500000 }
]


const lineWhite = document.querySelector('.game-reset__line');
const gameReset = document.querySelector('.game-reset');

function animate(time) {
	requestAnimationFrame(animate);
	if (userInfo.name) {
		if (!lineWhite.classList.contains('active') && !lineWhite.classList.contains('_js-active')) {
			lineWhite.classList.add('active');
			lineWhite.classList.add('_js-active');
			setTimeout(function (e) {
				lineWhite.classList.remove('active');
				gameReset.classList.add('removeRest');
				if (gameReset.closest('.removeRest')) {
					if (button.closest('._cancellation')) {
						button.classList.remove('_cancellation');
						button.classList.add('_js-active-bid');
					}
				}

				loos.classList.remove('_js-loos')


				if (!loos.classList.contains('_js-tablo-active')) {
					let random = Math.random() * 5;
					let randomRound = Math.round(random * 100) / 100;
					loos.classList.remove('_js-loos');
					console.log(randomRound);
					if (randomRound <= 0.99) {
						randomRound = 1.10
					}
					loos.classList.add('_js-tablo-active');
					let intervalId = setInterval(e => {
						if (rachet < randomRound) {
							let c = rachet + 0.01 + Number.EPSILON;
							rachet = Math.round(c * 100) / 100;
							rachetArray.push(rachet);
							tablo.textContent = rachet;
							//console.log(rachetArray);
						} else if (rachet >= randomRound) {
							clearInterval(intervalId)
							loos.classList.add('_js-loos')
							button.classList.remove('_js-active-bid');
							setTimeout(function () {
								rachet = 1.00;
								bid = '';
								loos.classList.remove('_js-tablo-active');
								lineWhite.classList.remove('_js-active');
								gameReset.classList.remove('removeRest');
								rachetHistory.push(rachetArray[rachetArray.length - 1])
								console.log(rachetHistory);
								neElement();
								rachetArray.length = 0;
								//console.log(rachet);
								//console.log(bid);
								//console.log(rachetArray.length);
							}, 1000)

						}
					}, 100)
				}
			}, 7000)

		}
	}

}
animate()


button.addEventListener('click', function (event) {
	if (!button.closest('._js-active-bid')) {
		if (!gameReset.classList.contains('removeRest')) {
			if (input.value >= 1400 && userInfo.money >= input.value) {
				button.classList.toggle('_cancellation');
				if (event.target.closest('._cancellation')) {
					bid = +input.value;
					gameBank[0].money += bid;
					console.log(gameBank[0].money);
					userInfo.money = userInfo.money - bid;
					user__money.textContent = userInfo.money;
				} else {
					bid = +input.value;
					gameBank[0].money -= bid;
					console.log(gameBank[0].money);
					userInfo.money = userInfo.money + bid;
					user__money.textContent = userInfo.money;
				}
			} else {
				if (event.target.closest('._cancellation')) {
					bid = +input.value;
					gameBank[0].money -= bid;
					console.log(gameBank[0].money);
					userInfo.money = userInfo.money + bid;
					user__money.textContent = userInfo.money;
					button.classList.remove('_cancellation');
				} else {
					noMoney()
				}

			}
		} else {

			gameDontStope()
		}

	} else {
		let win = bid * Math.round(rachetArray[rachetArray.length - 1] * 100) / 100;
		gameBank[0].money -= win;
		userInfo.money += win;
		gameWin()
		button.classList.remove('_js-active-bid');

		user__money.textContent = userInfo.money;
	}

});

const mainBid = document.forms[0];
mainBid.addEventListener('submit', event => {
	event.preventDefault();
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

const neElement = function () {
	const elemet = document.createElement('div');
	elemet.classList.add('game-history__item');
	const lastNum = rachetHistory[rachetHistory.length - 1]
	elemet.textContent = lastNum;
	if (+lastNum >= 10) {
		elemet.classList.add('yellow');

	} else if (+lastNum >= 2) {
		elemet.classList.add('purple');
	}
	else {
		elemet.classList.add('blue');
	}

	const rachetHistoryContainer = document.querySelector('.game-history__row');
	rachetHistoryContainer.prepend(elemet)
}



