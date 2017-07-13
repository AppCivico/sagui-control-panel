// Always use the following line so ESlintwon't complain about Chai import
/* eslint-disable no-unused-vars */
import Vue from 'vue';
import { chai, expect } from 'chai';
import store from '../../app/store';
import translations from '../../app/translations';
import cListEnterprises from '../../app/components/cListEnterprises.vue';

describe('Hello.vue', () => {
	it('should translate correctly', () => {
		const vm = new Vue({
			el: document.createElement('div'),
			store,
			translations,
			render: h => h(cListEnterprises),
		});
		expect(vm.$el.querySelector('h1').textContent).to.equal('Empreendimentos');
	});
});
