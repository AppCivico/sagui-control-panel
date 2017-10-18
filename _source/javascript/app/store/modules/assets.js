/* eslint-disable no-undef, arrow-body-style, no-param-reassign, no-console, no-shadow */

import axios from 'axios';
import Vue from 'vue';
import config from '../../config';

// Add a response interceptor
axios.interceptors.request.use((config) => {
	const loading = document.querySelector('.loading');
	if (loading) {
		loading.classList.remove('close');
	}
	return config;
}, (error) => {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor; remove after modularization
axios.interceptors.response.use((response) => {
	const loading = document.querySelector('.loading');
	if (loading) {
		loading.classList.add('close');
	}
	return response;
}, (error) => {
	// Do something with response error
	return Promise.reject(error);
});

const state = {
	agents: [],
};

// actions
const actions = {
	UPLOAD_IMAGE({ commit, rootState }, data) {
		return new Promise((resolve) => {
			axios({
				method: 'POST',
				url: `${config.api}/assets?api_key=${rootState.auth.apiKey}`,
				data,
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then((response) => {
				resolve(response);
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
			});
		});
	},
	DELETE_IMAGE({ commit, rootState }, id) {
		return new Promise((resolve) => {
			axios({
				method: 'DELETE',
				url: `${config.api}/assets/${id}?api_key=${rootState.auth.apiKey}`,
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then((response) => {
				resolve(response);
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
			});
		});
	},
};

export default {
	state,
	actions,
};
