/* eslint-disable no-undef, arrow-body-style, no-param-reassign, no-console */

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const api = 'http://localhost:3000';
const devapi = 'http://dev-sagui-api.eokoe.com/v1';
// const api = 'https://fakeapi.eokoe.com';

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
	state: {
		apiKey: '',
		agents: [],
		alertMessage: '',
		categories: [],
		complaints: [],
		confirm: {
			message: '',
			state: false,
		},
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
		user: {},
	},
	actions: {
		AUTHENTICATION({ commit }, user) {
			axios({
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				url: `${devapi}/auth/signin`,
				data: user,
			})
			.then((response) => {
				commit('SET_USER', { user: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Dados incorretos. Tente novamente.' } });
			});
		},
		SIGNOUT({ commit }) {
			commit('CLEAR_USER');
		},
		EDIT_APIKEY({ commit }, apiKey) {
			commit('SET_APIKEY', { apiKey });
		},
		LOAD_USER({ commit, state }) {
			axios.get(`${devapi}/user-profile?api_key=${state.apiKey}`).then((response) => {
				commit('SET_USER', { user: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		LOAD_CATEGORIES_LIST({ commit, state }) {
			axios.get(`${devapi}/enterprises/${state.selectedEnterprise}/axis?api_key=${state.apiKey}`).then((response) => {
				commit('SET_CATEGORIES_LIST', { list: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		ADD_CATEGORY({ commit, state }, data) {
			axios({
				method: 'POST',
				url: `${devapi}/enterprises/${state.selectedEnterprise}/axis?api_key=${state.apiKey}`,
				data,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'Created') {
					commit('SET_ALERT_MESSAGE', { res: { message: 'Nova categoria salva' } });
					store.dispatch('LOAD_CATEGORIES_LIST');
					$('#new-category').modal('hide');
				}
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		DELETE_CATEGORY({ commit, state }, id) {
			axios({
				method: 'DELETE',
				url: `${devapi}/enterprises/${state.selectedEnterprise}/axis/${id}?api_key=${state.apiKey}`,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'OK') {
					commit('SET_ALERT_MESSAGE', { res: { message: 'Categoria excluída' } });
				}
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		EDIT_CATEGORY({ commit, state }, data) {
			axios({
				method: 'PUT',
				url: `${devapi}/enterprises/${state.selectedEnterprise}/axis/${data.id}?api_key=${state.apiKey}`,
				data: { name: data.name },
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'OK') {
					commit('SET_ALERT_MESSAGE', { res: { message: 'Categoria alterada' } });
					store.dispatch('LOAD_CATEGORIES_LIST');
					$('#new-category').modal('hide');
				}
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		CHANGE_ALERT_MESSAGE({ commit }, message) {
			commit('SET_ALERT_MESSAGE', { res: { message } });
		},
		LOAD_ENTERPRISES_LIST({ commit, state }) {
			axios.get(`${devapi}/enterprises?api_key=${state.apiKey}`).then((response) => {
				commit('SET_ENTERPRISES_LIST', { list: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		LOAD_ENTERPRISE({ commit, state }, id) {
			axios.get(`${devapi}/enterprises/${id}?api_key=${state.apiKey}`).then((response) => {
				commit('SET_ENTERPRISE', { res: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		LOAD_SURVEYS_LIST({ commit, state }, id) {
			axios.get(`${devapi}/surveys?axis_id=${id}?api_key=${state.apiKey}`).then((response) => {
				commit('SET_SURVEYS_LIST', { list: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		LOAD_SURVEY({ commit }, id) {
			axios.get(`${api}/surveys/${id}`).then((response) => {
				commit('SET_SURVEY', { res: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		SAVE_SURVEY({ commit }, data) {
			axios({
				method: 'POST',
				url: `${api}/surveys`,
				data,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'Created') {
					commit('SET_ALERT_MESSAGE', { res: { message: 'Enquete salva', redirect: { state: true, path: '-1' } } });
				}
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		EDIT_SURVEY({ commit }, data) {
			axios({
				method: 'PUT',
				url: `${api}/surveys/${data.id}`,
				data: data.survey,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'OK') {
					commit('SET_ALERT_MESSAGE', { res: { message: 'Alterações salvas', redirect: { state: true, path: '-1' } } });
				}
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		DELETE_SURVEY({ commit }, id) {
			axios({
				method: 'DELETE',
				url: `${api}/surveys/${id}`,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'OK') {
					commit('SET_ALERT_MESSAGE', { res: { message: 'Enquete excluída' } });
				}
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
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
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		LOAD_AGENTS_LIST({ commit }, id) { // eslint-disable-line no-unused-vars
			axios.get(`${api}/agents?enterprise=${id}`).then((response) => {
				commit('SET_AGENTS_LIST', { list: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		LOAD_COMPLAINTS_LIST({ commit }, options) { // eslint-disable-line no-unused-vars
			axios.get(`${api}/complaints?status=${options.status}&enterprise=${options.enterprise}`).then((response) => {
				commit('SET_COMPLAINTS_LIST', { list: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
	},
	mutations: {
		SET_USER(state, { user }) {
			const apiKey = sessionStorage.getItem('api-key');
			state.user = user;

			if (!apiKey) {
				sessionStorage.setItem('api-key', user.api_key);
			} else {
				state.apiKey = apiKey;
			}
			if (user.api_key) {
				state.apiKey = user.api_key;
			}
		},
		SET_APIKEY(state, { apiKey }) {
			state.apiKey = apiKey;
		},
		CLEAR_USER(state) {
			state.user = {};
		},
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
	getters: {
	},
});

export default store;
