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
	enterprises: [],
	enterprise: {},
};

// actions
const actions = {
	LOAD_ENTERPRISES_LIST({ commit, rootState }) {
		return new Promise((resolve) => {
			axios.get(`${config.api}/enterprises?api_key=${rootState.auth.apiKey}`).then((response) => {
				commit('SET_ENTERPRISES_LIST', { list: response.data });
				resolve(response);
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
			});
		});
	},
	LOAD_ENTERPRISE({ commit, rootState }, id) {
		return new Promise((resolve) => {
			axios.get(`${config.api}/enterprises/${id}?api_key=${rootState.auth.apiKey}`).then((response) => {
				commit('SET_ENTERPRISE', { res: response.data });
				resolve(response);
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
			});
		});
	},
	SAVE_ENTERPRISE({ commit, rootState }, data) {
		return new Promise((resolve) => {
			axios({
				method: 'POST',
				url: `${config.api}/enterprises?api_key=${rootState.auth.apiKey}`,
				data,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((res) => {
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('new-enterprise'), redirect: { state: true, path: '-1' } } }, { root: true });
				resolve(res);
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
			});
		});
	},
	EDIT_ENTERPRISE({ commit, rootState }, data) {
		return new Promise((resolve) => {
			axios({
				method: 'PUT',
				url: `${config.api}/enterprises/${rootState.selectedEnterprise}?api_key=${rootState.auth.apiKey}`,
				data,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((res) => {
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('edit-enterprise'), redirect: { state: true, path: '-1' } } }, { root: true });
				resolve(res);
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
			});
		});
	},
};

// mutations
const mutations = {
	SET_ENTERPRISES_LIST(state, { list }) {
		state.enterprises = list;
	},
	SET_ENTERPRISE(state, { res }) {
		state.enterprise = res;
	},
};

export default {
	state,
	actions,
	mutations,
};
