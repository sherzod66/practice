const formDie = document.forms[1];
const formInput = document.querySelector('.user-name');
const die = document.querySelector('.die-user__info')

formDie.addEventListener('submit', event => {
	event.preventDefault();
	if (formInput.value) {
		userInfo.name = formInput.value;
		user__name.textContent = formInput.value;
		die.classList.add('_js-remove');
		setTimeout(function (e) {
			die.remove();
		}, 1000)

	} else {
		console.log(alert("Введи имя!"));
	}
});