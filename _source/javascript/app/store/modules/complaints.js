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
	complaints: [],
	complaint: {},
};

// actions
const actions = {
	LOAD_COMPLAINTS_LIST({ commit, rootState }, options) { // eslint-disable-line no-unused-vars
		axios.get(`${config.devapi}/enterprises/${rootState.selectedEnterprise}/complaints?api_key=${rootState.auth.apiKey}`).then((response) => {
			commit('SET_COMPLAINTS_LIST', { list: response.data });
		}, (err) => {
			console.error(err);
			commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
		});
	},
	LOAD_COMPLAINT({ commit, rootState }, id) { // eslint-disable-line no-unused-vars
		axios.get(`${config.devapi}/complaints/${id}?api_key=${rootState.auth.apiKey}`).then((response) => {
			commit('SET_COMPLAINT', { res: response.data });
		}, (err) => {
			console.error(err);
			commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
		});
	},
	SAVE_ANSWER({ commit, rootState }, info) { // eslint-disable-line no-unused-vars
		return new Promise((resolve) => {
			axios({
				method: 'POST',
				url: `${config.devapi}/complaints/${info.id}/comments?api_key=${rootState.auth.apiKey}`,
				data: info.data,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('new-answer') } }, { root: true });
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
	SET_COMPLAINTS_LIST(state, { list }) {
		state.complaints = list;
	},
	SET_COMPLAINT(state, { res }) {
		state.complaint = res;
	},
};

export default {
	state,
	actions,
	mutations,
};
