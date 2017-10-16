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
	notifications: [],
};

// actions
const actions = {
	LOAD_NOTIFICATIONS_LIST({ commit, rootState }, id) { // eslint-disable-line no-unused-vars
		axios.get(`${config.api}/activities?api_key=${rootState.auth.apiKey}&`).then((response) => {
			commit('SET_NOTIFICATIONS_LIST', { list: response.data });
		}, (err) => {
			console.error(err);
			commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
		});
	},
	UPDATE_NOTIFICATIONS({ commit, rootState }, id) { // eslint-disable-line no-unused-vars
		return new Promise((resolve) => {
			axios({
				method: 'POST',
				url: `${config.api}/activities?api_key=${rootState.auth.apiKey}`,
				headers: { 'Content-Type': 'application/json' },
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

// mutations
const mutations = {
	SET_NOTIFICATIONS_LIST(state, { list }) {
		state.notifications = list;
	},
};

export default {
	state,
	actions,
	mutations,
};
