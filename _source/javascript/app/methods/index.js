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
};

export { methods as default };
