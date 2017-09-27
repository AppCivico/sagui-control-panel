/* eslint-disable no-undef, arrow-body-style, no-param-reassign, no-console */

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import auth from './modules/auth';

Vue.use(Vuex);

// const api = 'http://localhost:3000';
const devapi = 'http://dev-sagui-api.eokoe.com/v1';
const api = 'https://fakeapi.eokoe.com';

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

// Add a response interceptor
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

const store = new Vuex.Store({
	modules: {
		auth,
	},
	state: {
		agents: [],
		alertMessage: '',
		categories: [],
		complaints: [],
		confirm: {
			message: '',
			state: false,
		},
		currentSurvey: '',
		currentQuestion: '',
		enterprises: [],
		enterprise: {},
		notifications: [],
		redirect: {
			state: false,
			path: '',
		},
		selectedEnterprise: '',
		surveys: [],
		survey: {},
	},
	actions: {
		LOAD_CATEGORIES_LIST({ commit, state }) {
			return new Promise((resolve) => {
				axios.get(`${devapi}/enterprises/${state.selectedEnterprise}/axis?api_key=${state.auth.apiKey}`).then((response) => {
					commit('SET_CATEGORIES_LIST', { list: response.data });
					resolve(response);
				}, (err) => {
					console.error(err);
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
				});
			});
		},
		ADD_CATEGORY({ commit, state }, data) {
			axios({
				method: 'POST',
				url: `${devapi}/enterprises/${state.selectedEnterprise}/axis?api_key=${state.auth.apiKey}`,
				data,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'Created') {
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('new-category') } });
					store.dispatch('LOAD_CATEGORIES_LIST');
					$('#new-category').modal('hide');
				}
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
			});
		},
		DELETE_CATEGORY({ commit, state }, id) {
			return new Promise((resolve) => {
				axios({
					method: 'DELETE',
					url: `${devapi}/enterprises/${state.selectedEnterprise}/axis/${id}?api_key=${state.auth.apiKey}`,
					headers: { 'Content-Type': 'application/json' },
				})
				.then((response) => {
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('new-category') } });
					resolve(response);
				}, (err) => {
					console.error(err);
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('delete-category') } });
				});
			});
		},
		EDIT_CATEGORY({ commit, state }, data) {
			axios({
				method: 'PUT',
				url: `${devapi}/enterprises/${state.selectedEnterprise}/axis/${data.id}?api_key=${state.auth.apiKey}`,
				data: { name: data.name, icon: data.icon },
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'OK') {
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('edit-category') } });
					store.dispatch('LOAD_CATEGORIES_LIST');
					$('#new-category').modal('hide');
				}
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
			});
		},
		CHANGE_ALERT_MESSAGE({ commit }, message) {
			commit('SET_ALERT_MESSAGE', { res: { message } });
		},
		LOAD_ENTERPRISES_LIST({ commit, state }) {
			return new Promise((resolve) => {
				axios.get(`${devapi}/enterprises?api_key=${state.auth.apiKey}`).then((response) => {
					commit('SET_ENTERPRISES_LIST', { list: response.data });
					resolve(response);
				}, (err) => {
					console.error(err);
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
				});
			});
		},
		LOAD_ENTERPRISE({ commit, state }, id) {
			return new Promise((resolve) => {
				axios.get(`${devapi}/enterprises/${id}?api_key=${state.auth.apiKey}`).then((response) => {
					commit('SET_ENTERPRISE', { res: response.data });
					resolve(response);
				}, (err) => {
					console.error(err);
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
				});
			});
		},
		SAVE_ENTERPRISE({ commit, state }, data) {
			return new Promise((resolve) => {
				axios({
					method: 'POST',
					url: `${devapi}/enterprises?api_key=${state.auth.apiKey}`,
					data,
					headers: { 'Content-Type': 'application/json' },
				})
				.then((res) => {
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('new-enterprise'), redirect: { state: true, path: '-1' } } });
					resolve(res);
				}, (err) => {
					console.error(err);
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
				});
			});
		},
		EDIT_ENTERPRISE({ commit, state }, data) {
			return new Promise((resolve) => {
				axios({
					method: 'PUT',
					url: `${devapi}/enterprises/${state.selectedEnterprise}?api_key=${state.auth.apiKey}`,
					data,
					headers: { 'Content-Type': 'application/json' },
				})
				.then(() => {
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('edit-enterprise'), redirect: { state: true, path: '-1' } } });
					resolve(res);
				}, (err) => {
					console.error(err);
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
				});
			});
		},
		LOAD_SURVEYS_LIST({ commit, state }, id) {
			axios.get(`${devapi}/surveys?axis_id=${id}&api_key=${state.auth.apiKey}`).then((response) => {
				commit('SET_SURVEYS_LIST', { list: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
			});
		},
		LOAD_SURVEYS_LIST_BY_ENTERPRISE({ commit, state }) {
			axios.get(`${devapi}/surveys?enterprise_id=${state.selectedEnterprise}&api_key=${state.auth.apiKey}`).then((response) => {
				commit('SET_SURVEYS_LIST', { list: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
			});
		},
		LOAD_SURVEY({ commit, state }, id) {
			return new Promise((resolve) => {
				axios.get(`${devapi}/surveys/${id}?api_key=${state.auth.apiKey}`).then((response) => {
					commit('SET_SURVEY', { res: response.data });
					resolve(response);
				}, (err) => {
					console.error(err);
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
				});
			});
		},
		SAVE_SURVEY({ commit, state }, data) {
			return new Promise((resolve) => {
				axios({
					method: 'POST',
					url: `${devapi}/surveys?api_key=${state.auth.apiKey}`,
					data,
					headers: { 'Content-Type': 'application/json' },
				})
				.then((response) => {
					commit('SET_CURRENT_SURVEY', { res: response.data });
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('new-survey') } });
					resolve(response);
				}, (err) => {
					console.error(err);
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
				});
			});
		},
		CHANGE_CURRENT_SURVEY({ commit }, data) {
			commit('SET_CURRENT_SURVEY', { res: data });
		},
		SAVE_QUESTION({ commit, state }, data) {
			console.log(data);
			return new Promise((resolve) => {
				axios({
					method: 'POST',
					url: `${devapi}/surveys/${state.currentSurvey}/questions?api_key=${state.auth.apiKey}`,
					data,
					headers: { 'Content-Type': 'application/json' },
				})
				.then((response) => {
					commit('SET_CURRENT_QUESTION', { res: response.data });
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('new-question') } });
					resolve(response);
				}, (err) => {
					console.error(err);
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
					const loading = document.querySelector('.loading');
					if (loading) {
						loading.classList.add('close');
					}
				});
			});
		},
		EDIT_QUESTION({ commit, state }, data) {
			axios({
				method: 'PUT',
				url: `${devapi}/surveys/${state.currentSurvey}/questions/${state.currentQuestion}?api_key=${state.auth.apiKey}`,
				data: data.question,
				headers: { 'Content-Type': 'application/json' },
			})
			.then(() => {
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('edit-question') } });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
				const loading = document.querySelector('.loading');
				if (loading) {
					loading.classList.add('close');
				}
			});
		},
		DELETE_QUESTION({ commit, state }, id) {
			return new Promise((resolve) => {
				axios({
					method: 'DELETE',
					url: `${devapi}/surveys/${state.currentSurvey}/questions/${id}?api_key=${state.auth.apiKey}`,
					headers: { 'Content-Type': 'application/json' },
				})
				.then((response) => {
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('delete-question') } });
					resolve(response);
				}, (err) => {
					console.error(err);
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
				});
			});
		},
		CHANGE_CURRENT_QUESTION({ commit }, data) {
			commit('SET_CURRENT_QUESTION', { res: data });
		},
		EDIT_SURVEY({ commit, state }, data) {
			axios({
				method: 'PUT',
				url: `${devapi}/surveys/${data.id}?api_key=${state.auth.apiKey}`,
				data: data.survey,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'OK') {
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('edit-survey'), redirect: { state: true, path: '-1' } } });
				}
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
			});
		},
		DELETE_SURVEY({ commit, state }, id) {
			return new Promise((resolve) => {
				axios({
					method: 'DELETE',
					url: `${devapi}/surveys/${id}?api_key=${state.auth.apiKey}`,
					headers: { 'Content-Type': 'application/json' },
				})
				.then((response) => {
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('delete-survey') } });
					resolve(response);
				}, (err) => {
					console.error(err);
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
				});
			});
		},
		CHANGE_REDIRECT({ commit }, data) {
			commit('SET_REDIRECT', { data });
		},
		CHANGE_CONFIRM_MESSAGE({ commit }, data) {
			commit('SET_CONFIRM_MESSAGE', { data });
		},
		EDIT_CONFIRM_STATE({ commit }, confirm) {
			commit('SET_CONFIRM_STATE', { res: confirm });
		},
		CHANGE_SELECTED_ENTERPRISE({ commit }, id) {
			commit('SET_SELECTED_ENTERPRISE', { id });
		},
		LOAD_NOTIFICATIONS_LIST({ commit }, id) { // eslint-disable-line no-unused-vars
			axios.get(`${api}/notifications`).then((response) => {
				commit('SET_NOTIFICATIONS_LIST', { list: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
			});
		},
		LOAD_AGENTS_LIST({ commit }, id) { // eslint-disable-line no-unused-vars
			axios.get(`${api}/agents?enterprise=${id}`).then((response) => {
				commit('SET_AGENTS_LIST', { list: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
			});
		},
		LOAD_COMPLAINTS_LIST({ commit }, options) { // eslint-disable-line no-unused-vars
			axios.get(`${api}/complaints?status=${options.status}&enterprise=${options.enterprise}`).then((response) => {
				commit('SET_COMPLAINTS_LIST', { list: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
			});
		},
		UPLOAD_IMAGE({ commit, state }, data) {
			return new Promise((resolve) => {
				axios({
					method: 'POST',
					url: `${devapi}/assets?api_key=${state.auth.apiKey}`,
					data,
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then((response) => {
					resolve(response);
				}, (err) => {
					console.error(err);
					commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } });
				});
			});
		},
	},
	mutations: {
		SET_ALERT_MESSAGE(state, { res }) {
			if (res.redirect) {
				state.redirect.state = res.redirect.state;

				state.redirect.path = res.redirect.path;
			}
			state.alertMessage = res.message;
			$('#alert').modal('show');
		},
		SET_CATEGORIES_LIST(state, { list }) {
			state.categories = list;
		},
		SET_ENTERPRISES_LIST(state, { list }) {
			state.enterprises = list;
		},
		SET_ENTERPRISE(state, { res }) {
			state.enterprise = res;
		},
		SET_REDIRECT(state, { data }) {
			state.redirect.state = data.state;
			state.redirect.path = data.path;
		},
		SET_CONFIRM_MESSAGE(state, { data }) {
			if (data.redirect) {
				store.dispatch('CHANGE_REDIRECT', data.redirect);
			}
			state.confirm.message = data.message;
			$('#confirm').modal('show');
		},
		SET_CONFIRM_STATE(state, { res }) {
			state.confirm.state = res;
		},
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
		SET_SELECTED_ENTERPRISE(state, { id }) {
			state.selectedEnterprise = id;
		},
		SET_NOTIFICATIONS_LIST(state, { list }) {
			state.notifications = list;
		},
		SET_AGENTS_LIST(state, { list }) {
			state.agents = list;
		},
		SET_COMPLAINTS_LIST(state, { list }) {
			state.complaints = list;
		},
	},
});

export default store;
