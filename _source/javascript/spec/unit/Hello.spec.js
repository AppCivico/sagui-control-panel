/* eslint-disable */
import Vue from 'vue';
import chai from 'chai';
import { expect } from 'chai';
import Hello from '../../app/components/Hello.vue';

describe('Hello.vue', () => {
	it('should render correct contents', () => {
		const vm = new Vue({
			el: document.createElement('div'),
			render: h => h(Hello),
		});
		expect(vm.$el.querySelector('h1').textContent).to.equal('Welcome to Your Vue.js App');
	});
});
