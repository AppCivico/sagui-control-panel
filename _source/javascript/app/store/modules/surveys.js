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
	currentSurvey: '',
	currentQuestion: '',
	surveys: [],
	survey: {},
};

// actions
const actions = {
	LOAD_SURVEYS_LIST({ commit, rootState }, id) {
		axios.get(`${config.api}/surveys?axis_id=${id}&api_key=${rootState.auth.apiKey}`).then((response) => {
			commit('SET_SURVEYS_LIST', { list: response.data });
		}, (err) => {
			console.error(err);
			commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
		});
	},
	LOAD_SURVEYS_LIST_BY_ENTERPRISE({ commit, rootState }) {
		axios.get(`${config.api}/surveys?enterprise_id=${rootState.selectedEnterprise}&api_key=${rootState.auth.apiKey}`).then((response) => {
			commit('SET_SURVEYS_LIST', { list: response.data });
		}, (err) => {
			console.error(err);
			commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
		});
	},
	LOAD_SURVEY({ commit, rootState }, id) {
		return new Promise((resolve) => {
			axios.get(`${config.api}/surveys/${id}?api_key=${rootState.auth.apiKey}`).then((response) => {
				commit('SET_SURVEY', { res: response.data });
				resolve(response);
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
			});
		});
	},
	SAVE_SURVEY({ commit, rootState }, data) {
		return new Promise((resolve) => {
			axios({
				method: 'POST',
				url: `${config.api}/surveys?api_key=${rootState.auth.apiKey}`,
				data,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				commit('SET_CURRENT_SURVEY', { res: response.data });
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('new-survey') } }, { root: true });
				resolve(response);
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
			});
		});
	},
	EDIT_SURVEY({ commit, rootState }, data) {
		axios({
			method: 'PUT',
			url: `${config.api}/surveys/${data.id}?api_key=${rootState.auth.apiKey}`,
			data: data.survey,
			headers: { 'Content-Type': 'application/json' },
		})
		.then((response) => {
			if (response.statusText === 'OK') {
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('edit-survey'), redirect: { state: true, path: '-1' } } }, { root: true });
			}
		}, (err) => {
			console.error(err);
			commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
		});
	},
	DELETE_SURVEY({ commit, rootState }, id) {
		return new Promise((resolve) => {
			axios({
				method: 'DELETE',
				url: `${config.api}/surveys/${id}?api_key=${rootState.auth.apiKey}`,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('delete-survey') } }, { root: true });
				resolve(response);
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
			});
		});
	},
	CHANGE_CURRENT_SURVEY({ commit }, data) {
		commit('SET_CURRENT_SURVEY', { res: data });
	},
	SAVE_QUESTION({ commit, rootState }, data) {
		return new Promise((resolve) => {
			axios({
				method: 'POST',
				url: `${config.api}/surveys/${state.currentSurvey}/questions?api_key=${rootState.auth.apiKey}`,
				data,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				commit('SET_CURRENT_QUESTION', { res: response.data });
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('new-question') } }, { root: true });
				resolve(response);
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
				const loading = document.querySelector('.loading');
				if (loading) {
					loading.classList.add('close');
				}
			});
		});
	},
	EDIT_QUESTION({ commit, state, rootState }, data) {
		axios({
			method: 'PUT',
			url: `${config.api}/surveys/${state.currentSurvey}/questions/${state.currentQuestion}?api_key=${rootState.auth.apiKey}`,
			data: data.question,
			headers: { 'Content-Type': 'application/json' },
		})
		.then(() => {
			commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('edit-question') } }, { root: true });
		}, (err) => {
			console.error(err);
			commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
			const loading = document.querySelector('.loading');
			if (loading) {
				loading.classList.add('close');
			}
		});
	},
	DELETE_QUESTION({ commit, state, rootState }, id) {
		return new Promise((resolve) => {
			axios({
				method: 'DELETE',
				url: `${config.api}/surveys/${state.currentSurvey}/questions/${id}?api_key=${rootState.auth.apiKey}`,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('delete-question') } }, { root: true });
				resolve(response);
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
			});
		});
	},
	CHANGE_CURRENT_QUESTION({ commit }, data) {
		commit('SET_CURRENT_QUESTION', { res: data });
	},
};

// mutations
const mutations = {
	SET_SURVEYS_LIST(state, { list }) {
		state.surveys = list;
	},
	SET_SURVEY(state, { res }) {
		state.survey = res;
	},
	SET_CURRENT_SURVEY(state, { res }) {
		state.currentSurvey = res.id;
	},
	SET_CURRENT_QUESTION(state, { res }) {
		state.currentQuestion = res.id;
	},
};

export default {
	state,
	actions,
	mutations,
};
