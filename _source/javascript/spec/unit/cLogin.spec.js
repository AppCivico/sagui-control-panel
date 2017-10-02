// Always use the following line so ESlintwon't complain about Chai import
/* eslint-disable no-unused-vars */
import Vue from 'vue';
import { chai, expect } from 'chai';
import store from '../../app/store';
import translations from '../../app/translations';
import router from '../../app/router';
import cListEnterprises from '../../app/components/login/cLogin.vue';


Vue.filter('capitalize', function (value) { // eslint-disable-line prefer-arrow-callback, func-names
	if (!value) return '';
	return value.toString().charAt(0).toUpperCase() + value.toString().slice(1);
});
const vm = new Vue({
	el: document.createElement('div'),
	store,
	router,
	translations,
	render: h => h(cListEnterprises),
});


describe('cLogin.vue', () => {
	it('will translate content', () => {
		let loginText = Vue.i18n.translate('login');
		loginText = loginText.toString().charAt(0).toUpperCase() + loginText.toString().slice(1);
		expect(vm.$el.querySelector('.btn-primary').textContent).to.equal(loginText);
	});
	it('should get user', () => {
		expect(vm.$store.state.auth.user).to.be.an('object');
	});
});
