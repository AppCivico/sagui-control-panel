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
	categories: [],
};

// actions
const actions = {
	LOAD_CATEGORIES_LIST({ commit, rootState }) {
		return new Promise((resolve) => {
			axios.get(`${config.devapi}/enterprises/${rootState.selectedEnterprise}/axis?api_key=${rootState.auth.apiKey}`).then((response) => {
				commit('SET_CATEGORIES_LIST', { list: response.data });
				resolve(response);
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
			});
		});
	},
	ADD_CATEGORY({ commit, rootState }, data) {
		axios({
			method: 'POST',
			url: `${config.devapi}/enterprises/${rootState.selectedEnterprise}/axis?api_key=${rootState.auth.apiKey}`,
			data,
			headers: { 'Content-Type': 'application/json' },
		})
		.then((response) => {
			if (response.statusText === 'Created') {
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('new-category') } }, { root: true });
				store.dispatch('LOAD_CATEGORIES_LIST');
				$('#new-category').modal('hide');
			}
		}, (err) => {
			console.error(err);
			commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
		});
	},
	DELETE_CATEGORY({ commit, rootState }, id) {
		return new Promise((resolve) => {
			axios({
				method: 'DELETE',
				url: `${config.devapi}/enterprises/${rootState.selectedEnterprise}/axis/${id}?api_key=${rootState.auth.apiKey}`,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('new-category') } }, { root: true });
				resolve(response);
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('delete-category') } }, { root: true });
			});
		});
	},
	EDIT_CATEGORY({ commit, rootState }, data) {
		axios({
			method: 'PUT',
			url: `${config.devapi}/enterprises/${rootState.selectedEnterprise}/axis/${data.id}?api_key=${rootState.auth.apiKey}`,
			data: { name: data.name, icon: data.icon },
			headers: { 'Content-Type': 'application/json' },
		})
		.then((response) => {
			if (response.statusText === 'OK') {
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('edit-category') } }, { root: true });
				store.dispatch('LOAD_CATEGORIES_LIST');
				$('#new-category').modal('hide');
			}
		}, (err) => {
			console.error(err);
			commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
		});
	},
};

// mutations
const mutations = {
	SET_CATEGORIES_LIST(state, { list }) {
		state.categories = list;
	},
};

export default {
	state,
	actions,
	mutations,
};
