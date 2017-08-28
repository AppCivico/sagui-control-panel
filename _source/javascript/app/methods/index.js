const methods = {
	addError(item, msg) {
		item.classList.add('has-error');
		item.insertAdjacentHTML('beforeend', `<span class="help-block">${msg}</span>`);
	},
	removeError(event) {
		const item = event.target.parentNode;
		const erro = item.querySelector('.help-block');
		if (erro) {
			item.classList.remove('has-error');
			item.removeChild(erro);
		}
	},
	cleanAllErros(form) {
		const errors = Array.from(form.querySelectorAll('.has-error'));
		errors.map((error) => {
			const helpBlock = error.querySelector('.help-block');
			error.removeChild(helpBlock);
			error.classList.remove('has-error');
		});
	},
};

export { methods as default };
