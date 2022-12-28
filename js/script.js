"use strict"

const tablo = document.querySelector('.tablo >span')
const loos = document.querySelector('.loos')
const button = document.querySelector('.button')
const user__name = document.querySelector('.user__name')
const user__money = document.querySelector('.user__money > p')
const input = document.querySelector('.input')

const nameUser = prompt("Введите имя: ")

const userInfo = {
	name: nameUser,
	money: 20000
}

const rachetArray = [];

user__name.textContent = userInfo.name
user__money.textContent = userInfo.money
let rachet = 1.00
let bid;
let randomSecond;
button.addEventListener('click', function (event) {
	if (!event.target.closest('._js-active-bid')) {
		if (!loos.classList.contains('_js-tablo-active')) {
			let random = Math.random() * 10;
			let randomRound = Math.round(random * 100) / 100;
			console.log(randomRound);
			loos.classList.remove('_js-loos');
			if (input.value >= 1400 && userInfo.money >= input.value) {
				this.classList.add('_js-active-bid');
				loos.classList.add('_js-tablo-active');
				if (event.target.closest('._js-active-bid')) {
					bid = +input.value
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
							console.log(rachet);
							console.log(bid);
							console.log(rachetArray.length);
						}
					}, 100)
				}
			}
		} else {
			console.log(alert('Дождитесь Окончания игры!'));
		}
	} else {
		userInfo.money += bid * Math.round(rachetArray[rachetArray.length - 1] * 100) / 100;
		const infoWindow = alert(rachetArray[rachetArray.length - 1]);
		this.classList.remove('_js-active-bid');
		console.log(infoWindow);
		user__money.textContent = userInfo.money;
	}
});


function animate() {
	requestAnimationFrame(animate);
	randomSecond = Math.random() * 10;
	console.log(randomSecond);
}
