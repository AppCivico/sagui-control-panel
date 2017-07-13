// Always use the following line so ESlintwon't complain about Chai import
/* eslint-disable no-unused-vars */
import Vue from 'vue';
import { chai, expect } from 'chai';
import store from '../../app/store';
import router from '../../app/router';
import translations from '../../app/translations';
import cEnterprise from '../../app/components/cEnterprise.vue';

describe('cEnterprise.vue', () => {
	it('should translate content', () => {
		Vue.use(router);
		const vm = new Vue({
			el: document.createElement('div'),
			store,
			translations,
			router,
			render: h => h(cEnterprise),
		});
		expect(vm.$el.querySelector('.breadcrumb li:first-of-type').textContent).to.equal('Empreendimentos');
	});
	it('should load store', () => {
		Vue.use(router);
		const vm = new Vue({
			el: document.createElement('div'),
			store,
			translations,
			router,
			render: h => h(cEnterprise),
		});
		expect(vm.$store.state.enterprise).to.be.a('object');
	});

	// Create test for the ajax call when real api is working
});
