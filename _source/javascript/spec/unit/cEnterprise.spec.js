// Always use the following line so ESlintwon't complain about Chai import
/* eslint-disable no-unused-vars */
import Vue from 'vue';
import { chai, expect } from 'chai';
import store from '../../app/store';
import router from '../../app/router';
import translations from '../../app/translations';
import cEnterprise from '../../app/components/enterprises/cEnterprise.vue';


Vue.use(router);
Vue.filter('capitalize', function (value) { // eslint-disable-line prefer-arrow-callback, func-names
	if (!value) return '';
	return value.toString().charAt(0).toUpperCase() + value.toString().slice(1);
});
const vm = new Vue({
	el: document.createElement('div'),
	store,
	translations,
	router,
	render: h => h(cEnterprise),
});

describe('cEnterprise.vue', () => {
	it('should load store', () => {
		expect(vm.$store.state.enterprises.enterprise).to.be.a('object');
	});
});
