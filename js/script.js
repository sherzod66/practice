"use strict"

const tablo = document.querySelector('.tablo')
const loos = document.querySelector('.loos')
const button = document.querySelector('.button')
const user__name = document.querySelector('.user__name')
const user__money = document.querySelector('.user__money > p')
const input = document.querySelector('.input')



const userInfo = {
	name: 'Sherzod',
	money: 20000
}

const rachetArray = [];

user__name.textContent = userInfo.name
user__money.textContent = userInfo.money
let rachet = 0.00
let bid;
button.addEventListener('click', function (event) {
	if (!event.target.closest('._js-active-bid')) {
		let random = Math.random() * 10;
		let randomRound = Math.round(random * 100) / 100;
		loos.classList.remove('_js-loos');
		if (input.value >= 1400 && userInfo.money >= input.value) {
			this.classList.add('_js-active-bid');
			if (event.target.closest('._js-active-bid')) {
				bid = +input.value
				userInfo.money = userInfo.money - bid;
				user__money.textContent = userInfo.money;
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
						this.classList.remove('_js-active-bid');
						rachet = 0.00;
						bid = '';
						rachetArray.length = 0;
						console.log(rachet);
						console.log(bid);
						console.log(rachetArray.length);
					}
				}, 10)
			}
		}
	} else {
		userInfo.money += bid * Math.round(rachetArray[rachetArray.length - 1] * 100) / 100;
		const infoWindow = alert(rachetArray[rachetArray.length - 1]);
		this.classList.remove('_js-active-bid');
		console.log(infoWindow);
		user__money.textContent = userInfo.money;
	}
});
