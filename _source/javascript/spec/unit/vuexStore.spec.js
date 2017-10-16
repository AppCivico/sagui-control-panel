// Always use the following line so ESlintwon't complain about Chai import
/* eslint-disable no-unused-vars, arrow-body-style, no-param-reassign, no-console */
import Vue from 'vue';
import { chai, expect } from 'chai';
import axios from 'axios';

import config from '../../app/config';

describe('vuexStore.vue', () => {
	it('should login', () => {
		axios({
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			url: `${config.api}/auth/signin`,
			data: {
				email: 'test@test.com',
				password: '123456',
			},
		})
		.then((response) => {
			expect(response.data).to.be.an('object');
		}, (err) => {
			expect(err.data).to.be.an('object');
		});
	});
});
