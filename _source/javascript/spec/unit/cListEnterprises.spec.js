// Always use the following line so ESlintwon't complain about Chai import
/* eslint-disable no-unused-vars */
import Vue from 'vue';
import { chai, expect } from 'chai';
import store from '../../app/store';
import translations from '../../app/translations';
import router from '../../app/router';
import cListEnterprises from '../../app/components/enterprises/cListEnterprises.vue';

describe('cListEnterprises.vue', () => {
	it('should translate content', () => {
		Vue.filter('capitalize', function (value) { // eslint-disable-line prefer-arrow-callback, func-names
			if (!value) return '';
			return value.toString().charAt(0).toUpperCase() + value.toString().slice(1);
		});
		const vm = new Vue({
			el: document.createElement('div'),
			store,
			translations,
			router,
			render: h => h(cListEnterprises),
		});
		expect(vm.$el.querySelector('h1').textContent).to.equal('Escolha o empreendimento');
	});
	it('should load store', () => {
		Vue.filter('capitalize', function (value) { // eslint-disable-line prefer-arrow-callback, func-names
			if (!value) return '';
			return value.toString().charAt(0).toUpperCase() + value.toString().slice(1);
		});
		const vm = new Vue({
			el: document.createElement('div'),
			store,
			translations,
			router,
			render: h => h(cListEnterprises),
		});
		expect(vm.$store.state.enterprises).to.be.an('array');
	});

	// Create test for the ajax call when real api is working
});
