// Always use the following line so ESlintwon't complain about Chai import
/* eslint-disable no-unused-vars */
import Vue from 'vue';
import { chai, expect } from 'chai';
import store from '../../app/store';
import translations from '../../app/translations';
import router from '../../app/router';
import cListEnterprises from '../../app/components/enterprises/cListEnterprises.vue';


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


describe('cListEnterprises.vue', () => {
	it('should get auth', () => {
		expect(vm.$store.state.auth.authorization).to.be.an('boolean');
	});
	it('load enterprise list', () => {
		expect(vm.$store.state.enterprises.enterprises).to.be.an('array');
	});
	it('will translate content', () => {
		expect(vm.$el.querySelector('h1').textContent).to.equal(Vue.i18n.translate('choose_enterprise'));
	});
});
