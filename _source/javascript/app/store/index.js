/* eslint-disable no-undef, arrow-body-style, no-param-reassign, no-console */

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const api = 'http://localhost:3000';
// const api = 'https://fakeapi.eokoe.com';

axios.interceptors.request.use((config) => {
	document.querySelector('.loading').classList.remove('close');
	return config;
}, (error) => {
	// Do something with request error
	return Promise.reject(error);
});


// Add a response interceptor
axios.interceptors.response.use((response) => {
	document.querySelector('.loading').classList.add('close');
	return response;
}, (error) => {
	// Do something with response error
	return Promise.reject(error);
});

const store = new Vuex.Store({
	state: {
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
	},
	actions: {
		LOAD_CATEGORIES_LIST({ commit }, id) {
			axios.get(`${api}/categories?enterprise=${id}`).then((response) => {
				commit('SET_CATEGORIES_LIST', { list: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		CHANGE_ALERT_MESSAGE({ commit }, message) {
			commit('SET_ALERT_MESSAGE', { res: { message } });
		},
		LOAD_ENTERPRISES_LIST({ commit }) {
			axios.get(`${api}/enterprises`).then((response) => {
				commit('SET_ENTERPRISES_LIST', { list: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		LOAD_ENTERPRISE({ commit }, id) {
			axios.get(`${api}/enterprises/${id}`).then((response) => {
				commit('SET_ENTERPRISE', { res: response.data });
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		LOAD_SURVEYS_LIST({ commit }, id) {
			axios.get(`${api}/surveys?category=${id}`).then((response) => {
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
		ADD_CATEGORY({ commit }, data) {
			axios({
				method: 'POST',
				url: `${api}/categories`,
				data,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'Created') {
					commit('SET_ALERT_MESSAGE', { res: { message: 'Nova categoria salva' } });
					store.dispatch('LOAD_CATEGORIES_LIST', data.enterprise);
					$('#new-category').modal('hide');
				}
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		DELETE_CATEGORY({ commit }, id) {
			axios({
				method: 'DELETE',
				url: `${api}/categories/${id}`,
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
		EDIT_CATEGORY({ commit }, data) {
			axios({
				method: 'PUT',
				url: `${api}/categories/${data.id}`,
				data,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'OK') {
					commit('SET_ALERT_MESSAGE', { res: { message: 'Categoria alterada' } });
					store.dispatch('LOAD_CATEGORIES_LIST', data.enterprise);
					$('#new-category').modal('hide');
				}
			}, (err) => {
				console.error(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
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
