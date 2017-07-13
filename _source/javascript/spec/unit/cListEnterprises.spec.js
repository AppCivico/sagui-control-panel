// Always use the following line so ESlintwon't complain about Chai import
/* eslint-disable no-unused-vars */
import Vue from 'vue';
import { chai, expect } from 'chai';
import store from '../../app/store';
import translations from '../../app/translations';
import cListEnterprises from '../../app/components/cListEnterprises.vue';

describe('cListEnterprises.vue', () => {
	it('should translate content', () => {
		const vm = new Vue({
			el: document.createElement('div'),
			store,
			translations,
			render: h => h(cListEnterprises),
		});
		expect(vm.$el.querySelector('h1').textContent).to.equal('Escolha o empreendimento');
	});
	it('should load store', () => {
		const vm = new Vue({
			el: document.createElement('div'),
			store,
			translations,
			render: h => h(cListEnterprises),
		});
		expect(vm.$store.state.enterprises).to.be.an('array');
	});

	// Create test for the ajax call when real api is working
});
